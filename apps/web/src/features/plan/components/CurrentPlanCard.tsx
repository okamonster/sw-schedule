import type { Plan } from '@/entities/plan';

type Props = {
  currentPlan: Plan;
};

export const CurrentPlanCard = ({ currentPlan }: Props): React.ReactNode => {
  return (
    <div className="border-2 border-blue-500 rounded-lg shadow-sm p-6 bg-blue-50 mb-2">
      <h2 className="text-lg font-semibold text-text-black">{currentPlan.planName}</h2>
      <p className="text-sm text-text-gray">月額{currentPlan.planPrice}円</p>
    </div>
  );
};
