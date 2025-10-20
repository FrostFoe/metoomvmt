"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CodeBlock } from "@/components/code-block";
import { ArrowRight, KeyRound, Loader2, Search, Send } from "lucide-react";
import { API_KEY as defaultApiKey } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

const postFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  category: z.string().min(2, "Category must be at least 2 characters."),
});

type ApiResponse = {
  data?: any;
  error?: string;
  details?: any;
  message?: string;
};

export function ApiClient() {
  const [apiKey, setApiKey] = useState(defaultApiKey);

  // GET request state
  const [getParams, setGetParams] = useState({ search: "", category: "" });
  const [getLoading, setGetLoading] = useState(false);
  const [getResponse, setGetResponse] = useState<ApiResponse | null>(null);
  const [getStatus, setGetStatus] = useState<number | null>(null);

  // POST request state
  const [postLoading, setPostLoading] = useState(false);
  const [postResponse, setPostResponse] = useState<ApiResponse | null>(null);
  const [postStatus, setPostStatus] = useState<number | null>(null);
  
  const { toast } = useToast();

  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { name: "", category: "" },
  });

  const handleGetRequest = async () => {
    setGetLoading(true);
    setGetResponse(null);
    setGetStatus(null);
    const url = new URL('/api/data', window.location.origin);
    if (getParams.search) url.searchParams.set('search', getParams.search);
    if (getParams.category) url.searchParams.set('category', getParams.category);

    try {
      const res = await fetch(url.toString(), {
        headers: { 'x-api-key': apiKey },
      });
      const data: ApiResponse = await res.json();
      setGetResponse(data);
      setGetStatus(res.status);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Failed to connect to the API.",
      });
    } finally {
      setGetLoading(false);
    }
  };

  const handlePostRequest = async (values: z.infer<typeof postFormSchema>) => {
    setPostLoading(true);
    setPostResponse(null);
    setPostStatus(null);
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(values),
      });
      const data: ApiResponse = await res.json();
      setPostResponse(data);
      setPostStatus(res.status);
      if(res.ok) {
        postForm.reset();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Failed to connect to the API.",
      });
    } finally {
      setPostLoading(false);
    }
  };

  const getStatusColor = (status: number | null) => {
    if (status === null) return 'text-muted-foreground';
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-yellow-500';
    if (status >= 500) return 'text-red-500';
    return 'text-muted-foreground';
  }

  return (
    <div className="mt-12">
      <div className="relative mb-8">
        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API Key"
          className="pl-10 text-lg"
        />
      </div>

      <Tabs defaultValue="get">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="get">GET /api/data</TabsTrigger>
          <TabsTrigger value="post">POST /api/data</TabsTrigger>
        </TabsList>

        <TabsContent value="get">
          <Card>
            <CardHeader>
              <CardTitle>GET Request</CardTitle>
              <CardDescription>Fetch data from the server. Try filtering with query parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name..." value={getParams.search} onChange={e => setGetParams({...getParams, search: e.target.value})} className="pl-10" />
                </div>
                <div className="relative">
                  <Input placeholder="Filter by category..." value={getParams.category} onChange={e => setGetParams({...getParams, category: e.target.value})} />
                </div>
              </div>
              <Button onClick={handleGetRequest} disabled={getLoading} className="w-full sm:w-auto">
                {getLoading ? <Loader2 className="animate-spin" /> : <Send />}
                <span>Send GET Request</span>
              </Button>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Response</h3>
                {getResponse ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span> 
                      <span className={`font-bold ${getStatusColor(getStatus)}`}>{getStatus}</span>
                    </div>
                    <CodeBlock code={getResponse} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Make a request to see the response here.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="post">
          <Card>
            <CardHeader>
              <CardTitle>POST Request</CardTitle>
              <CardDescription>Send data to the server. Required fields are validated.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...postForm}>
                <form onSubmit={postForm.handleSubmit(handlePostRequest)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={postForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Smart Watch" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={postForm.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl><Input placeholder="e.g., Electronics" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <Button type="submit" disabled={postLoading} className="w-full sm:w-auto">
                    {postLoading ? <Loader2 className="animate-spin" /> : <Send />}
                    <span>Send POST Request</span>
                  </Button>
                </form>
              </Form>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Response</h3>
                {postResponse ? (
                  <div className="space-y-4">
                     <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span> 
                      <span className={`font-bold ${getStatusColor(postStatus)}`}>{postStatus}</span>
                    </div>
                    <CodeBlock code={postResponse} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Make a request to see the response here.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
