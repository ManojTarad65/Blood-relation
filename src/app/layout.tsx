import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'RootConnect | Generations Reconnected',
  description: 'AI-powered digital family trees bringing generations together with health intelligence and cultural archives.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-slate-950 text-slate-50 min-h-screen relative`}>
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 right-0 h-96 bg-indigo-900/10 blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] pointer-events-none -z-10" />
        <main className="relative z-0 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
