import { Inter, Sora } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import 'aos/dist/aos.css';

import ScrollToTop from '@/features/landingPage/components/scroll-to-top';

export const metadata: Metadata = {
  title: 'TaskMaster',
  description: 'Project to put on practice my next.js knowledge',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`bg-black ${inter.variable} ${sora.variable}`}>
        <ScrollToTop />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000',
          }}
        />
        <div className="text-white">{children}</div>
      </body>
    </html>
  );
}
