import { Divider } from '@mantine/core';
import Link from 'next/link';
import { plans } from '@/entities/plan';
import { CurrentPlanCard } from '@/features/plan/components/CurrentPlanCard';
import { PlanListCard } from '@/features/plan/components/PlanListCard';
import { getCurrentUser } from '@/service/user';

export default async function PlanPage() {
  const currentUser = await getCurrentUser();
  const currentPlan = () => {
    const currentPlan = plans.find((plan) => plan.planType === currentUser?.planType);
    if (!currentPlan) {
      return plans[0];
    }
    return currentPlan;
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">ご利用プラン</h1>

      {/* 現在のプラン */}
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold text-text-black">現在のプラン</h2>
        <CurrentPlanCard currentPlan={currentPlan()} />
      </section>

      {/* 変更可能なプラン一覧 */}
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold text-text-black">変更可能なプラン</h2>

        <p className="text-sm text-text-gray">
          有料プランにアップグレードすると、もっとたくさんのアーティストを推しに登録できます。
        </p>

        <div className="grid gap-2">
          {plans.map((plan) => (
            <PlanListCard key={plan.planName} plan={plan} currentPlan={currentPlan()} />
          ))}
        </div>
      </section>
      <Divider />
      <Link href="/asct" className="text-sm text-blue-500 text-center">
        特定商法取引法に基づく表記
      </Link>
    </div>
  );
}
