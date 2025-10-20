"use client";

import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface CodeBlockProps {
  code: object | string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const codeString =
    typeof code === "string" ? code : JSON.stringify(code, null, 2);

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeString);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <pre className="rounded-lg border bg-muted/50 p-4 text-sm overflow-x-auto text-foreground">
        <code>{codeString}</code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
        aria-label="Copy code"
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
