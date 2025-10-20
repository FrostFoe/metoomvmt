import { ApiClient } from '@/components/api-client';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">API Shield</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Secure and Validate Your API Requests
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A practical demonstration of API endpoint security using Next.js. Test the GET and POST endpoints below with API key authentication and request validation.
          </p>
        </div>
        
        <ApiClient />
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} API Shield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
