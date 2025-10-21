"use client";

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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-2 sm:px-4">
      <div className="flex items-center justify-center p-2 bg-card/80 backdrop-blur-sm rounded-full border shadow-lg">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <a href="/" className="flex items-center space-x-2 mr-2">
            <Logo />
          </a>

          <nav className="flex items-center">
            <Button
              variant="secondary"
              className="rounded-full px-3 md:px-4"
              asChild
            >
              <a href="/">
                <Home className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">হোম</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-3 md:px-4"
              asChild
            >
              <a href="#documentation">
                <BookOpenCheck className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">ডকুমেন্টেশন</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-3 md:px-4"
              asChild
            >
              <a href="#try-it">
                <FlaskConical className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">চেষ্টা করুন</span>
              </a>
            </Button>
          </nav>

          <div className="flex items-center pl-1 sm:pl-2 ml-1 sm:ml-2 border-l">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9"
              asChild
            >
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
