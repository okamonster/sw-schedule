import type Stripe from 'stripe';
import {
  getUserByEmailOperation,
  updateUserByEmailOperation,
} from '~/infrastructures/userOperations.js';
import dayjs from '~/libs/dayjs.js';
import { prismaClient } from '~/libs/prisma.js';
import { getPlanTypeFromPriceId, stripe } from '~/libs/stripe.js';

export const updateUserPlan = async (customerId: string, subscriptionId: string) => {
  try {
    // Stripeからサブスクリプション情報を取得
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customer = await stripe.customers.retrieve(customerId);

    if (!subscription || !customer || customer.deleted) {
      console.error('Invalid subscription or customer');
      return;
    }

    const priceId = subscription.items.data[0].price.id;
    const planType = getPlanTypeFromPriceId(priceId);
    const email = customer.email;

    if (!email) {
      console.error('No email in customer');
      return;
    }

    // emailからユーザーを取得
    const user = await getUserByEmailOperation(email);
    if (!user) {
      console.error('User not found for email:', email);
      return;
    }

    // ユーザーのプランを更新
    await updateUserByEmailOperation(email, {
      planType,
      planExpiresAt: dayjs().add(1, 'month').toDate(),
    });

    // プラン変更履歴を記録
    await prismaClient.userPlanHistory.create({
      data: {
        userId: user.id,
        planType,
        reason: 'stripe_payment',
      },
    });

    // 支払い情報を記録
    await prismaClient.userPayment.create({
      data: {
        userId: user.id,
        amount: subscription.items.data[0]?.price.unit_amount ?? 0,
        currency: 'JPY',
        paymentMethod: 'stripe',
        status: 'completed',
        paidAt: new Date(),
      },
    });

    console.log(`Updated user ${email} to plan ${planType}`);
  } catch (error) {
    console.error('Error updating user plan:', error);
  }
};

export const downgradeUserToFreePlan = async (customerId: string) => {
  try {
    const customer = await stripe.customers.retrieve(customerId);

    if (!customer || customer.deleted) {
      console.error('Invalid customer');
      return;
    }

    const email = customer.email;

    if (!email) {
      console.error('No email in customer');
      return;
    }

    // emailからユーザーを取得
    const user = await getUserByEmailOperation(email);
    if (!user) {
      console.error('User not found for email:', email);
      return;
    }

    await updateUserByEmailOperation(email, {
      planType: 'free',
      planExpiresAt: null,
    });

    // プラン変更履歴を記録
    await prismaClient.userPlanHistory.create({
      data: {
        userId: user.id,
        planType: 'free',
        reason: 'stripe_cancellation',
      },
    });

    console.log(`Downgraded user ${email} to free plan`);
  } catch (error) {
    console.error('Error downgrading user plan:', error);
  }
};

export const handleInvoicePaymentSucceeded = async (invoice: Stripe.Invoice) => {
  const customerId = invoice.customer as string;
  const customer = await stripe.customers.retrieve(customerId);

  if (!customer || customer.deleted || !customer.email) {
    return;
  }

  const user = await getUserByEmailOperation(customer.email);
  if (!user) {
    return;
  }

  await updateUserByEmailOperation(customer.email, {
    planType: user.planType,
    planExpiresAt: dayjs().add(1, 'month').toDate(),
  });
};

export const handleInvoicePaymentFailed = async (invoice: Stripe.Invoice) => {
  console.log('Invoice payment failed:', invoice.id);

  // 支払い失敗時の処理
  // 例：ユーザーに通知を送信、プランを一時停止など
  if (invoice.customer) {
    const customer = await stripe.customers.retrieve(invoice.customer as string);
    if (customer && !customer.deleted && customer.email) {
      await downgradeUserToFreePlan(customer.id);
    }
  }
};
