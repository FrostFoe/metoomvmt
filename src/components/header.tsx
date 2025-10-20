import { Github, Quote } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Quote className="text-3xl gradient-text" />
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
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
