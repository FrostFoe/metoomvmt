import { Github, Star, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
            <p>Next.js দিয়ে</p>
            <Heart className="h-5 w-5 text-red-400 fill-red-400" />
            <p>দিয়ে নির্মিত</p>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Github />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <Star />
          </a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} উক্তি API. ওপেন সোর্স প্রকল্প।
        </p>
      </div>
    </footer>
  );
}
