import React from "react";
import CodeSummarizerClient from "@/components/tools/CodeSummarizerClient ";
import { ArrowLeft } from "lucide-react";

// Redux imports (uncomment jab Redux setup ho jaye)
// import { useSelector, useDispatch } from "react-redux";

const Summarizer = () => {
  // ------------------ Redux Version (when Redux ready) ------------------
  // const dispatch = useDispatch();
  // const { summarizerData, loading, error } = useSelector((state) => state.summarizer);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary leading-tight">
          Code Summarizer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-snug">
          Leverage the power of AI to understand complex code in seconds.
        </p>
      </div>

      {/* Loader (Redux version) */}
      {/* {loading && <p className="text-center text-muted-foreground">Loading...</p>} */}

      {/* Error (Redux version) */}
      {/* {error && <p className="text-center text-red-500">{error}</p>} */}

      <CodeSummarizerClient />
    </div>
  );
};

export default Summarizer;
