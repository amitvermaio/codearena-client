import React, { useEffect } from "react";
import CodeSummarizerClient from "@/components/tools/CodeSummarizerClient";
import { ArrowLeft } from "lucide-react";

const Summarizer = () => {
  useEffect(() => {
    document.title = "AI Code Summarizer | CodeArena Tools";
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary leading-tight">
          Code Summarizer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-snug">
          Quickly understand complex code with AI-powered explanations.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <CodeSummarizerClient />
      </div>
    </div>
  );
};

export default Summarizer;
