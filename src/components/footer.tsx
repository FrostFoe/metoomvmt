import { Github, Star, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="gradient-bg text-primary-foreground py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
            <p>Built with</p>
            <Heart className="h-5 w-5 text-red-400 fill-red-400" />
            <p>using Next.js</p>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <Github />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Star />
          </a>
        </div>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} Quote API. Open Source Project.
        </p>
      </div>
    </footer>
  );
}
