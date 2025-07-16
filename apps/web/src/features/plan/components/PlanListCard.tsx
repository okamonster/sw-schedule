'use client';

import { Button } from '@mantine/core';
import type { Plan } from '@/entities/plan';

type Props = {
  plan: Plan;
  isCurrentPlan: boolean;
};

export const PlanListCard = ({ plan, isCurrentPlan }: Props): React.ReactNode => {
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

      <Button
        color="var(--color-button-primary)"
        radius="lg"
        disabled={isCurrentPlan}
        onClick={() => {}}
      >
        {isCurrentPlan ? '現在のプラン' : 'このプランに変更'}
      </Button>
    </div>
  );
};
