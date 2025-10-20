import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeToggle } from '@/components/theme-toggle';
import { Github } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Quote API - Free Quote API Service',
  description: 'Free Quote API - A frontend-only quote API with multiple endpoints for inspirational, life, love, and motivational quotes.',
  keywords: "quote api, free api, quotes, inspirational quotes, github pages",
  authors: [{ name: "Quote API" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="font-body antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
              <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-quote-left text-3xl gradient-text"></i>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Quote API
                    </h1>
                  </div>

                  <div className="flex items-center space-x-4">
                    <a
                      href="#documentation"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
                    >Docs</a>
                    <a
                      href="#try-it"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
                    >Try It</a>
                     <a
                        href="https://github.com"
                        target="_blank"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
                      >
                        <Github className="text-xl" />
                      </a>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}