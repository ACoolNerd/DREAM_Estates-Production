import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CPA Partner Portal | DREAM.Estates',
  description: 'Partner onboarding, resources, introductions, training, and support.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
