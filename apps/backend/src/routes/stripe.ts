import { Hono } from 'hono';
import type Stripe from 'stripe';
import { stripe } from '~/libs/stripe.js';
import {
  downgradeUserToFreePlan,
  handleInvoicePaymentFailed,
  handleInvoicePaymentSucceeded,
  updateUserPlan,
} from '~/services/stripe.js';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const app = new Hono();

// Stripe Webhook処理
app.post('/webhook', async (c) => {
  try {
    const body = await c.req.text();
    const signature = c.req.header('stripe-signature');

    if (!signature || !webhookSecret) {
      return c.json({ error: 'Missing stripe signature or webhook secret' }, 400);
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // イベントタイプに応じて処理
    switch (event.type) {
      case 'checkout.session.completed':
        if (event.data.object.customer && event.data.object.subscription) {
          // ユーザーのプランを更新
          await updateUserPlan(
            event.data.object.customer as string,
            event.data.object.subscription as string
          );
        }
        break;
      case 'customer.subscription.created':
        if (event.data.object.customer) {
          await updateUserPlan(event.data.object.customer as string, event.data.object.id);
        }
        break;
      case 'customer.subscription.updated':
        if (event.data.object.customer) {
          await updateUserPlan(event.data.object.customer as string, event.data.object.id);
        }
        break;
      case 'customer.subscription.deleted':
        if (event.data.object.customer) {
          await downgradeUserToFreePlan(event.data.object.customer as string);
        }
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return c.json({ error: 'Webhook handler failed' }, 500);
  }
});

export default app;
