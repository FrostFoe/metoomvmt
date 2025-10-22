"use client";

import { Home, BookOpenCheck, FlaskConical, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "./ui/button";

const Logo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 72 72"
    id="emoji"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="color">
      <path
        fill="#FCEA2B"
        stroke="none"
        d="M7.3634,42.4095c4.5525,6.1703,11.874,10.1726,20.1303,10.1726c13.8071,0,25-11.1929,25-25 c0-8.5226-4.2646-16.0492-10.7763-20.5621c13.0383,2.8385,22.7812,14.4426,22.7812,28.3317c0,16.0163-12.9837,29-29,29 C21.9109,64.3517,10.5097,55.0229,7.3634,42.4095z"
      />
      <path
        fill="#F1B31C"
        stroke="none"
        d="M45.8373,9.2108c8.25,4.25,16.1946,11.8724,16.1946,24.6742c0,15.4494-12.5242,27.9735-27.9735,27.9735 c-9.2431,0-19.7524-4.8353-24.294-15.5436c0,0,4.3805,18.6568,25.7189,18.665c19.327,0.0074,28.0419-20.6218,28.0419-20.6218 C70.033,12.3815,45.8373,9.2108,45.8373,9.2108z"
      />
    </g>
    <g id="hair" />
    <g id="skin" />
    <g id="skin-shadow" />
    <g id="line">
      <path
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M7.3634,42.4095c4.5525,6.1703,11.874,10.1726,20.1303,10.1726c13.8071,0,25-11.1929,25-25 c0-8.5226-4.2646-16.0492-10.7763-20.5621c13.0383,2.8385,22.7812,14.4426,22.7812,28.3317c0,16.0163-12.9837,29-29,29 C21.9109,64.3517,10.5097,55.0229,7.3634,42.4095z"
      />
    </g>
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
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