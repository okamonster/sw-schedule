import { Footer } from '@/components/Navigations/Footer';
import { NonLoginHeader } from '@/components/Navigations/NonLoginHeader';

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NonLoginHeader title="プライバシーポリシー" />
      {children}
      <Footer />
    </div>
  );
}
