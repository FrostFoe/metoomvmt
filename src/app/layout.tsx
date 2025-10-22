import type { Metadata } from "next";
import { Hind_Siliguri, Poppins, Lateef } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

const lateef = Lateef({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-lateef",
});

export const metadata: Metadata = {
  title: "কুরআন ও হাদিস API - বিনামূল্যে উক্তি পরিষেবা",
  description:
    "বিনামূল্যে কুরআন ও হাদিসের উক্তিগুলির জন্য একটি ফ্রন্টএন্ড-অনলি API।",
  keywords: "কুরআন এপিআই, হাদিস এপিআই, ফ্রি এপিআই, উক্তি, ইসলামিক উক্তি",
  authors: [{ name: "Quran Hadith API" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${poppins.variable} ${hindSiliguri.variable} ${lateef.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-bengali">
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
        <Analytics />
      </body>
    </html>
  );
}
