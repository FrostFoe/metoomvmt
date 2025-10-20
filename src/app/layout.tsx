import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'উক্তি API - বিনামূল্যে কুরআন উক্তি API পরিষেবা',
  description: 'বিনামূল্যে কুরআন উক্তি API - কুরআনের प्रेरणाদায়ক উক্তিগুলির জন্য একাধিক এন্ডপয়েন্ট সহ একটি ফ্রন্টএন্ড-অনলি API।',
  keywords: "কুরআন এপিআই, ফ্রি এপিআই, উক্তি, অনুপ্রেরণামূলক উক্তি, ইসলামিক উক্তি",
  authors: [{ name: "Quran Quote API" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body className="font-body antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header />
            <main className="pt-24">{children}</main>
            <Footer />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
