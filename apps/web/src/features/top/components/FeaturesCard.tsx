import { Card } from '@mantine/core';

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const FeaturesCard = ({ title, description, icon }: Props): React.ReactNode => {
  return (
    <Card
      key={title}
      radius="lg"
      className="drop-shadow-lg drop-shadow-pink-100 p-10 border border-pink-100 grid gap-4"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h4 className="text-2xl font-black text-pink-950 mb-4">{title}</h4>
      <p className="font-bold text-pink-900/60 leading-relaxed">{description}</p>
    </Card>
  );
};
