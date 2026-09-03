import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Strategic Mortgage Partnership for CPAs',
  description: 'A coordinated mortgage resource for CPAs serving self-employed business owners.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
