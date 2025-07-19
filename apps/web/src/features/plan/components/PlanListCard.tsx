'use client';

import { Button } from '@mantine/core';
import type { Plan } from '@/entities/plan';

type Props = {
  plan: Plan;
  currentPlan: Plan;
};

export const PlanListCard = ({ plan, currentPlan }: Props): React.ReactNode => {
  const isFree = plan.planType === 'free';

  const isCurrentPlan = currentPlan.planType === plan.planType;

  const isCurrentFreePlan = currentPlan.planType === 'free';

  const handleChangePlan = async () => {
    window.open(
      isCurrentFreePlan ? plan.stripePaymentLink : process.env.NEXT_PUBLIC_PAYMENT_LINK_PORTAL,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm grid gap-2">
      <h3 className="text-base font-bold text-text-black">{plan.planName}</h3>
      <p className="text-lg font-bold text-text-primary mb-2">月額{plan.planPrice}円</p>
      <ul className="list-disc list-inside text-text-gray mb-2">
        {plan.planDescription.map((description) => (
          <li key={`${plan.planName}-${description}`} className="text-sm">
            {description}
          </li>
        ))}
      </ul>
      {isFree ? (
        <p className="text-sm text-text-gray">
          有料プランを解約する場合は、以下のリンク先の指示に従ってください。
        </p>
      ) : (
        <p className="text-sm text-text-gray">
          有料プランを変更する場合は、以下のリンク先の指示に従ってください。
        </p>
      )}

      <Button
        color="var(--color-button-primary)"
        radius="lg"
        onClick={handleChangePlan}
        disabled={isCurrentPlan}
      >
        {isFree && '有料プランを解約する'}
        {!isFree && (isCurrentPlan ? '現在のプラン' : 'このプランに変更')}
      </Button>
    </div>
  );
};
