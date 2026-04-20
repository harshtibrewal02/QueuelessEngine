import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'QueueLess | Smart Waiting Solutions',
  description: 'Premium API-powered queue management system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans min-h-screen flex flex-col`}>
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
