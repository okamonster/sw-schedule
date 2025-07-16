import { Footer } from '@/components/Navigations/Footer';
import { NonLoginHeader } from '@/components/Navigations/NonLoginHeader';

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NonLoginHeader title="特定商法取引法に基づく表記" />
      {children}
      <Footer />
    </div>
  );
}
