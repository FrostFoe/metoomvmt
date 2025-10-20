"use client";

import { useEffect, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy, FlaskConical, Info, Quote, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export function QuoteApiClient() {
  const { toast } = useToast();
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [endpoint, setEndpoint] = useState("api/quotes?limit=5");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    try {
      const res = await fetch('/api/quotes/random');
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setRandomQuote(data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch random quote:", error);
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

  return (
    <>
     <section className="gradient-bg text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4">Free Quran Quotes API</h2>
        <p className="text-xl mb-8 opacity-90">
          A simple, frontend-only Quran quotes API
        </p>

        <div className="flex justify-center space-x-4 mb-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-3xl font-bold">30+</div>
            <div className="text-sm">Quotes</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm">Category</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm">Free</div>
          </div>
        </div>

        <div
          className="max-w-3xl mx-auto p-8 text-card-foreground bg-card rounded-2xl shadow-2xl"
        >
          <Quote className="text-4xl text-primary mb-4" />
          <p className="text-2xl font-medium mb-4 italic">
            {randomQuote ? randomQuote.text : "Loading quote..."}
          </p>
          <p className="text-lg text-muted-foreground">
            — {randomQuote ? randomQuote.author : "Author"}
          </p>
          <Button
            onClick={fetchRandomQuote}
            className="mt-6"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />Get Another Quote
          </Button>
        </div>
      </div>
    </section>

      <section id="try-it" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            <FlaskConical className="w-10 h-10 mr-3 inline-block gradient-text" />Try It Out
          </h2>

          <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-2xl border bg-card text-card-foreground">
            <div className="mb-6">
              <label
                htmlFor="endpoint-input"
                className="block text-sm font-medium mb-2"
              >Enter Endpoint</label>
              <div className="flex space-x-3">
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
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>

              <div className="min-h-[200px]">
                <CodeBlock className="max-h-[500px] overflow-y-auto" code={loading ? {status: "Loading..."} : (response || {message: "// Response will appear here..."})} />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Quick Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                onClick={() => quickTest('api/quotes/random')}
                className="p-4 rounded-lg hover:shadow-lg transition text-left border bg-card text-card-foreground"
                >
                <div className="font-mono text-sm text-primary mb-2">
                    api/quotes/random
                </div>
                <div className="text-sm text-muted-foreground">
                    Get a random quote
                </div>
                </button>
                <button
                onClick={() => quickTest('api/quotes?limit=3')}
                className="p-4 rounded-lg hover:shadow-lg transition text-left border bg-card text-card-foreground"
                >
                <div className="font-mono text-sm text-primary mb-2">
                    api/quotes?limit=3
                </div>
                <div className="text-sm text-muted-foreground">
                    Get 3 quotes
                </div>
                </button>
                <button
                onClick={() => quickTest('api/quotes')}
                className="p-4 rounded-lg hover:shadow-lg transition text-left border bg-card text-card-foreground"
                >
                <div className="font-mono text-sm text-primary mb-2">api/quotes</div>
                <div className="text-sm text-muted-foreground">
                    Get all quotes
                </div>
                </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
