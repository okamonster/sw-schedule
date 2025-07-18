import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const getPlanTypeFromPriceId = (priceId: string | undefined): string => {
  if (!priceId) return 'free';

  // StripeのPrice IDからプランタイプを決定
  // 実際のPrice IDに合わせて調整が必要
  switch (priceId) {
    case process.env.STANDARD_PLAN_ID: // 実際のPrice IDに変更
      return 'standard';
    case 'price_premium_monthly': // 実際のPrice IDに変更
      return 'premium';
    default:
      return 'free';
  }
};
