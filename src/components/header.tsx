import { Home, BookOpenCheck, FlaskConical, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "./ui/button";

const Logo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 10L20 4"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14L4 20"
      stroke="hsl(var(--secondary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 4V10H14"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 20V14H10"
      stroke="hsl(var(--secondary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <div className="flex items-center justify-center p-2 bg-card/80 backdrop-blur-sm rounded-full border shadow-lg">
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2 mr-2">
            <Logo />
          </a>

          <nav className="flex items-center">
            <Button variant="secondary" className="rounded-full" asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                হোম
              </a>
            </Button>
            <Button variant="ghost" className="rounded-full" asChild>
              <a href="#documentation">
                <BookOpenCheck className="mr-2 h-4 w-4" />
                ডকুমেন্টেশন
              </a>
            </Button>
            <Button variant="ghost" className="rounded-full" asChild>
              <a href="#try-it">
                <FlaskConical className="mr-2 h-4 w-4" />
                চেষ্টা করুন
              </a>
            </Button>
          </nav>

          <div className="flex items-center pl-2 ml-2 border-l">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <a href="#">
                <LogOut className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
