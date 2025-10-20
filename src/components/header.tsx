import { Github, Quote, BookText, FlaskConical } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Quote className="text-3xl gradient-text" />
            <h1 className="text-2xl font-bold text-foreground">
              Quote API
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <a href="#documentation">
                    <BookText className="mr-2 h-4 w-4" />
                    Docs
                </a>
            </Button>
            <Button variant="ghost" asChild>
                <a href="#try-it">
                    <FlaskConical className="mr-2 h-4 w-4" />
                    Try It
                </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Github className="h-5 w-5" />
                </a>
            </Button>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
