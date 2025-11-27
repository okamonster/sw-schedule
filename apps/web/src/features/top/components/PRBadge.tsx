import { IoSparkles } from 'react-icons/io5';

export const PRBadge = (): React.ReactNode => {
  return (
    <div className="bg-white inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm border border-pink-100 shadow-sm">
      <IoSparkles size={16} className="text-pink-600" />
      <span className="text-pink-600">推しへの「好き」が加速する</span>
    </div>
  );
};
