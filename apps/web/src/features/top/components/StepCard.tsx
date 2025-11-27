import { Card } from '@mantine/core';

type Props = {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};
export const StepCard = ({ step, title, description, icon }: Props): React.ReactNode => {
  return (
    <Card
      p={12}
      radius="lg"
      className="grid items-center gap-4 drop-shadow-lg drop-shadow-pink-100 border border-pink-100"
    >
      <div className="grid items-center justify-center shrink-0 w-20 h-20 bg-pink-400 rounded-full text-3xl text-white shadow-inner font-bold">
        {step}
      </div>
      <div className="flex-1 text-center">
        <h4 className="text-2xl font-black text-pink-950 mb-3">{title}</h4>
        <p className="font-bold text-pink-900/50 leading-relaxed">{description}</p>
      </div>
      {icon}
    </Card>
  );
};
