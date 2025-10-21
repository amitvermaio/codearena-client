import React, { useEffect } from "react";

const CodeConverter = () => {
  useEffect(() => {
    document.title = "Code Converter | CodeArena Tools";
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Code Converter
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-snug">
          Convert your code between programming languages with clean and readable output.
        </p>
      </div>

      <div className="max-w-3xl mx-auto text-center text-muted-foreground py-20">
        Converter tool coming soon.
      </div>
    </div>
  );
};

export default CodeConverter;
