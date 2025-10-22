"use client";

import { useEffect, useState, useMemo } from "react";
import { CodeBlock } from "@/components/code-block";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Copy,
  FlaskConical,
  Info,
  Quote as QuoteIcon,
  RefreshCw,
  Server,
  FileJson,
  CheckCircle,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Quote = {
  id: number;
  text: string;
  author?: string;
  surah_name?: string;
  surah_id?: number;
  type?: string;
};

type ApiResponse = {
  data?: Quote[] | string[];
  count?: number;
  error?: string;
  [key: string]: any;
};

const StatCard = ({
  icon,
  title,
  value,
  animationDelay,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  animationDelay?: string;
}) => (
  <Card className="text-center animate-fade-in-up" style={{ animationDelay }}>
    <CardHeader className="items-center">
      {icon}
      <CardTitle className="text-4xl font-bold font-english">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{title}</p>
    </CardContent>
  </Card>
);

export function QuoteApiClient() {
  const { toast } = useToast();
  const [randomHadith, setRandomHadith] = useState<Quote | null>(null);
  const [randomVerse, setRandomVerse] = useState<Quote | null>(null);
  const [endpoint, setEndpoint] = useState("api/quran?id=1");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [hadithLoading, setHadithLoading] = useState(false);
  const [verseLoading, setVerseLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState<string | null>(null);

  const fetchRandomHadith = async () => {
    setHadithLoading(true);
    try {
      const res = await fetch("/api/hadith?random=true");
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setRandomHadith(data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch random hadith:", error);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "একটি নতুন হাদিস আনতে ব্যর্থ হয়েছে।",
      });
    } finally {
      setTimeout(() => setHadithLoading(false), 500);
    }
  };

  const fetchRandomVerse = async () => {
    setVerseLoading(true);
    try {
      const res = await fetch("/api/quran?random=true");
      const data = await res.json();
      setRandomVerse(data);
    } catch (error) {
      console.error("Failed to fetch random verse:", error);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "একটি নতুন আয়াত আনতে ব্যর্থ হয়েছে।",
      });
    } finally {
      setTimeout(() => setVerseLoading(false), 500);
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
      setResponse({ error: "এন্ডপয়েন্ট থেকে আনতে ব্যর্থ হয়েছে।" });
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
    document.getElementById("try-it")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchRandomHadith();
    fetchRandomVerse();
  }, []);

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      toast({
        title: "অনুলিপি!",
        description: "প্রতিক্রিয়া ক্লিপবোর্ডে অনুলিপি করা হয়েছে।",
      });
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(id);
    toast({
      title: "অনুলিপি!",
      description: "উদ্ধৃতি ক্লিপবোর্ডে অনুলিপি করা হয়েছে।",
    });
    setTimeout(() => setHasCopied(null), 2000);
  };

  const memoizedRandomHadith = useMemo(() => randomHadith, [randomHadith]);
  const memoizedRandomVerse = useMemo(() => randomVerse, [randomVerse]);

  return (
    <>
      <section className="py-16 md:py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="mb-12 animate-fade-in-down">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              বিনামূল্যে কুরআন ও হাদিস API
            </h1>
            <p className="text-md md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              আপনার প্রকল্পের জন্য একটি সহজ, ফ্রন্টএন্ড-অনলি কুরআন ও হাদিস API.
              কোনো চাবি নেই, কোনো সীমা নেই, শুধু উক্তি।
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-2">
              <StatCard
                icon={<FileJson className="w-8 h-8 text-primary mb-2" />}
                title="হাদিস"
                value="২+"
                animationDelay="100ms"
              />
              <StatCard
                icon={<Server className="w-8 h-8 text-primary mb-2" />}
                title="সূরা"
                value="১+"
                animationDelay="200ms"
              />
              <StatCard
                icon={<CheckCircle className="w-8 h-8 text-primary mb-2" />}
                title="বিনামূল্যে"
                value="১০০%"
                animationDelay="300ms"
              />
            </div>

            <Tabs defaultValue="hadith" className="w-full animate-fade-in-up animation-delay-400">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hadith">এলোমেলো হাদিস</TabsTrigger>
                <TabsTrigger value="verse">এলোমেলো আয়াত</TabsTrigger>
              </TabsList>
              <TabsContent value="hadith">
                <Card className="group relative">
                  <CardHeader className="items-center">
                    <QuoteIcon className="text-4xl text-primary" />
                    <CardTitle>এলোমেলো হাদিস</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center min-h-[150px] flex flex-col justify-center">
                    <p className="text-lg font-medium mb-4 italic text-foreground">
                      {hadithLoading
                        ? "..."
                        : memoizedRandomHadith
                        ? memoizedRandomHadith.text
                        : "উক্তি লোড হচ্ছে..."}
                    </p>
                    <p className="text-base text-muted-foreground font-english">
                      —{" "}
                      {hadithLoading
                        ? "..."
                        : memoizedRandomHadith
                        ? memoizedRandomHadith.author
                        : "লেখক"}
                    </p>
                  </CardContent>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      memoizedRandomHadith &&
                      copyToClipboard(
                        `"${memoizedRandomHadith.text}" - ${memoizedRandomHadith.author}`,
                        "hadith"
                      )
                    }
                    className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="উক্তি কপি করুন"
                  >
                    {hasCopied === "hadith" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="p-6 pt-0 text-center">
                    <Button
                      onClick={fetchRandomHadith}
                      size="lg"
                      disabled={hadithLoading}
                    >
                      <RefreshCw
                        className={`w-4 h-4 mr-2 ${
                          hadithLoading ? "animate-spin" : ""
                        }`}
                      />
                      {hadithLoading ? "লোড হচ্ছে..." : "আরেকটি হাদিস পান"}
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="verse">
                <Card className="group relative">
                  <CardHeader className="items-center">
                    <QuoteIcon className="text-4xl text-primary" />
                    <CardTitle>এলোমেলো আয়াত</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center min-h-[150px] flex flex-col justify-center">
                    <p className="text-2xl font-arabic mb-4 text-foreground">
                      {verseLoading
                        ? "..."
                        : memoizedRandomVerse
                        ? memoizedRandomVerse.text
                        : "আয়াত লোড হচ্ছে..."}
                    </p>
                    <p className="text-base text-muted-foreground">
                      — সূরা {memoizedRandomVerse?.surah_name} (
                      {memoizedRandomVerse?.surah_id}:
                      {memoizedRandomVerse?.id})
                    </p>
                  </CardContent>
                   <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      memoizedRandomVerse &&
                      copyToClipboard(
                        `"${memoizedRandomVerse.text}" - সূরা ${memoizedRandomVerse.surah_name} (${memoizedRandomVerse.surah_id}:${memoizedRandomVerse.id})`,
                        "verse"
                      )
                    }
                    className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="আয়াত কপি করুন"
                  >
                    {hasCopied === "verse" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="p-6 pt-0 text-center">
                    <Button
                      onClick={fetchRandomVerse}
                      size="lg"
                      disabled={verseLoading}
                    >
                      <RefreshCw
                        className={`w-4 h-4 mr-2 ${
                          verseLoading ? "animate-spin" : ""
                        }`}
                      />
                      {verseLoading ? "লোড হচ্ছে..." : "আরেকটি আয়াত পান"}
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section
        id="try-it"
        className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <FlaskConical className="w-10 h-10 mr-3 inline-block gradient-text" />
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
              চেষ্টা করে দেখুন
            </h2>
            <p className="text-muted-foreground mt-2">
              সরাসরি আপনার ব্রাউজার থেকে API এন্ডপয়েন্ট পরীক্ষা করুন।
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <label
                  htmlFor="endpoint-input"
                  className="block text-sm font-medium mb-2"
                >
                  এন্ডপয়েন্ট লিখুন
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Input
                    type="text"
                    id="endpoint-input"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="api/quran?id=1"
                    className="flex-1 font-english"
                  />
                  <Button
                    onClick={handleTestClick}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? "লোড হচ্ছে..." : "এন্ডপয়েন্ট পরীক্ষা করুন"}
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  বেস URL ছাড়া এন্ডপয়েন্ট পাথ লিখুন (e.g., api/quran?id=1)
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium">
                    প্রতিক্রিয়া
                  </label>
                  <Button onClick={copyResponse} variant="ghost" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    অনুলিপি
                  </Button>
                </div>

                <div className="min-h-[200px] w-full">
                  <CodeBlock
                    className="max-h-[400px] overflow-y-auto"
                    code={
                      loading
                        ? { status: "লোড হচ্ছে..." }
                        : response || {
                            message: "// প্রতিক্রিয়া এখানে প্রদর্শিত হবে...",
                          }
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              দ্রুত উদাহরণ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                onClick={() => quickTest("api/quran")}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
              >
                <div className="font-mono text-sm text-primary mb-1 break-words font-english">
                  api/quran
                </div>
                <div className="text-sm text-muted-foreground">
                  সব সূরা তালিকা পান
                </div>
              </Card>
              <Card
                onClick={() => quickTest("api/quran?id=1")}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
              >
                <div className="font-mono text-sm text-primary mb-1 break-words font-english">
                  api/quran?id=1
                </div>
                <div className="text-sm text-muted-foreground">
                  সূরা আল-ফাতিহা পান
                </div>
              </Card>
              <Card
                onClick={() => quickTest("api/quran?random=true")}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
              >
                <div className="font-mono text-sm text-primary mb-1 break-words font-english">
                  api/quran?random=true
                </div>
                <div className="text-sm text-muted-foreground">
                  একটি এলোমেলো আয়াত পান
                </div>
              </Card>
              <Card
                onClick={() => quickTest("api/hadith?random=true")}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
              >
                <div className="font-mono text-sm text-primary mb-1 break-words font-english">
                  api/hadith?random=true
                </div>
                <div className="text-sm text-muted-foreground">
                  একটি এলোমেলো হাদিস উক্তি পান
                </div>
              </Card>
              <Card
                onClick={() => quickTest("api/hadith")}
                className="p-4 hover:shadow-lg hover:border-primary transition cursor-pointer"
              >
                <div className="font-mono text-sm text-primary mb-1 break-words font-english">
                  api/hadith
                </div>
                <div className="text-sm text-muted-foreground">
                  সব হাদিসের উক্তি পান
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
