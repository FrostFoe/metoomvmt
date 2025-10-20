"use client";

import { useEffect, useState, useMemo } from "react";
import { CodeBlock } from "@/components/code-block";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy, FlaskConical, Info, Quote as QuoteIcon, RefreshCw, Server, FileJson, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Quote = {
  id: number;
  text: string;
  author: string;
  type: string;
};

type ApiResponse = {
  data?: Quote[] | string[];
  count?: number;
  error?: string;
};

const StatCard = ({ icon, title, value, animationDelay }: { icon: React.ReactNode, title: string, value: string, animationDelay?: string }) => (
    <Card className="text-center animate-fade-in-up" style={{ animationDelay }}>
        <CardHeader className="items-center">
            {icon}
            <CardTitle className="text-4xl font-bold">{value}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">{title}</p>
        </CardContent>
    </Card>
);


export function QuoteApiClient() {
  const { toast } = useToast();
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [endpoint, setEndpoint] = useState("api/quotes?limit=5");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setQuoteLoading(true);
    try {
      const res = await fetch('/api/quotes/random');
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setRandomQuote(data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch random quote:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch a new quote."});
    } finally {
        setTimeout(() => setQuoteLoading(false), 500);
    }
  };

  const testEndpoint = async (apiPath: string) => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`/${apiPath}`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Failed to fetch from the endpoint." });
    } finally {
      setLoading(false);
    }
  };

  const handleTestClick = () => {
    if (endpoint) {
      testEndpoint(endpoint);
    }
  };
  
  const quickTest = (apiPath: string) => {
    setEndpoint(apiPath);
    testEndpoint(apiPath);
    document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      toast({ title: "Copied!", description: "Response copied to clipboard." });
    }
  };

  const memoizedRandomQuote = useMemo(() => randomQuote, [randomQuote]);


  return (
    <>
     <section className="gradient-bg text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-5xl font-bold mb-4">Free Quran Quotes API</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            A simple, frontend-only Quran quotes API for your projects. No keys, no limits, just quotes.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-1">
                <StatCard icon={<FileJson className="w-8 h-8 text-primary mb-2"/>} title="Quotes" value="30+" animationDelay="100ms" />
                <StatCard icon={<Server className="w-8 h-8 text-primary mb-2"/>} title="Category" value="1" animationDelay="200ms" />
                <StatCard icon={<CheckCircle className="w-8 h-8 text-primary mb-2"/>} title="Free" value="100%" animationDelay="300ms" />
            </div>

            <Card className="animate-fade-in-up animation-delay-400">
                <CardHeader className="items-center">
                    <QuoteIcon className="text-4xl text-primary" />
                    <CardTitle>Inspirational Quote</CardTitle>
                </CardHeader>
                <CardContent className="text-center min-h-[200px] flex flex-col justify-center">
                    <p className="text-xl font-medium mb-4 italic text-foreground">
                        {quoteLoading ? "..." : (memoizedRandomQuote ? memoizedRandomQuote.text : "Loading quote...")}
                    </p>
                    <p className="text-base text-muted-foreground">
                        — {quoteLoading ? "..." : (memoizedRandomQuote ? memoizedRandomQuote.author : "Author")}
                    </p>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                    <Button
                        onClick={fetchRandomQuote}
                        size="lg"
                        disabled={quoteLoading}
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${quoteLoading ? 'animate-spin' : ''}`} />
                        {quoteLoading ? "Loading..." : "Get Another Quote"}
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </section>

      <section id="try-it" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <FlaskConical className="w-10 h-10 mr-3 inline-block gradient-text" />
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
                Try It Out
            </h2>
            <p className="text-muted-foreground mt-2">Test the API endpoints directly from your browser.</p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardContent className="p-8">
                <div className="mb-6">
                <label
                    htmlFor="endpoint-input"
                    className="block text-sm font-medium mb-2"
                >Enter Endpoint</label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Input
                    type="text"
                    id="endpoint-input"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="api/quotes?limit=5"
                    className="flex-1"
                    />
                    <Button
                    onClick={handleTestClick}
                    disabled={loading}
                    className="w-full sm:w-auto"
                    >
                    Test Endpoint
                    </Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground flex items-center">
                    <Info className="w-4 h-4 mr-1"/>
                    Enter the endpoint path without the base URL
                </p>
                </div>

                <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium">Response</label>
                    <Button
                        onClick={copyResponse}
                        variant="ghost"
                        size="sm"
                    >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                    </Button>
                </div>

                <div className="min-h-[200px] w-full">
                    <CodeBlock className="max-h-[500px] overflow-y-auto" code={loading ? {status: "Loading..."} : (response || {message: "// Response will appear here..."})} />
                </div>
                </div>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Quick Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                onClick={() => quickTest('api/quotes/random')}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
                >
                    <div className="font-mono text-sm text-primary mb-1">
                        api/quotes/random
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Get a random quote
                    </div>
                </Card>
                 <Card
                onClick={() => quickTest('api/quotes?limit=3')}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
                >
                    <div className="font-mono text-sm text-primary mb-1">
                        api/quotes?limit=3
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Get 3 quotes
                    </div>
                </Card>
                 <Card
                onClick={() => quickTest('api/quotes')}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
                >
                    <div className="font-mono text-sm text-primary mb-1">
                        api/quotes
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Get all quotes
                    </div>
                </Card>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
