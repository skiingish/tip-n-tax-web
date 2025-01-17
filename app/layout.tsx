import type { Metadata } from 'next';
import { Roboto_Mono, Funnel_Display } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const openSans = Funnel_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'Tip N Tax - Canada',
  description: 'Calculate the tip and/or tax on your bill in Canada',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${openSans.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <main
          className='mx-auto min-h-screen flex flex-col relative'
          style={{
            backgroundImage: 'url("/images/bc.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-black/95 to-black/70 pointer-events-none' />
          <div className='flex-1 overflow-y-auto relative'>{children}</div>
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
