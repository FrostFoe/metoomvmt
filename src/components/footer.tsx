import { Github, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="gradient-bg text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4">Built with ❤️ using Next.js</p>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
            <Github />
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            <Star />
          </a>
        </div>
        <p className="mt-4 text-sm opacity-75">
          © {new Date().getFullYear()} Quote API. Open Source Project.
        </p>
      </div>
    </footer>
  );
}
