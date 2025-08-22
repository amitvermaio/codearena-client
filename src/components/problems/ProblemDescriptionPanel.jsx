import { formatDescription } from "@/utils/markdown.js";
import { useState, useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { difficultyColors } from "../../utils/constants.js";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Lightbulb, History } from "lucide-react";
import SubmissionNoteForm from "./SubmissionNoteForm";

const ProblemDescriptionPanel = ({ problem }) => {
  const [revealedHints, setRevealedHints] = useState(0);
  const visibleTestCases = useMemo(
    () => (problem?.testCases || []).filter((tc) => !tc.isHidden),
    [problem]
  );

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="description" className="flex-grow flex flex-col">
        <div className="flex-shrink-0 px-4">
          <TabsList className="bg-transparent p-0 rounded-none w-full justify-start">
            <TabsTrigger
              value="description"
              className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground gap-2"
            >
              <Code className="w-4 h-4" />Description
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground gap-2"
            >
              <History className="w-4 h-4" />Submissions
            </TabsTrigger>
            <TabsTrigger
              value="hints"
              className="data-[state=active]:shadow-none data-[state=active]:border-b-2 border-primary rounded-none data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground gap-2"
            >
              <Lightbulb className="w-4 h-4" />Hints
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-grow">
          <div className="p-6">
            <TabsContent value="description" className="mt-0">
              <h1 className="text-2xl font-bold font-headline mb-4">
                {problem?.id}. {problem?.title}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className={difficultyColors[problem?.difficulty] || ""}>
                  {problem?.difficulty}
                </Badge>
                {problem?.acceptance && (
                  <span className="text-sm text-muted-foreground">
                    Acceptance: {problem.acceptance}
                  </span>
                )}
              </div>
              <div
                className="prose dark:prose-invert max-w-none prose-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm"
                dangerouslySetInnerHTML={formatDescription(problem?.description)}
              />

              {visibleTestCases && visibleTestCases.length > 0 && (
                <div className="mt-6">
                  {visibleTestCases.map((tc, index) => (
                    <div key={index} className="mt-4">
                      <p className="font-semibold text-sm">Example {index + 1}:</p>
                      <div className="bg-muted p-3 rounded-md mt-1 font-mono text-xs">
                        <p>
                          <strong>Input:</strong> {tc.input?.replace(/\n/g, ", ")}
                        </p>
                        <p>
                          <strong>Output:</strong> {tc.output}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {(problem?.tags || []).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hints" className="mt-0">
              <h2 className="text-xl font-bold font-headline mb-4">Hints</h2>
              {problem?.hints && problem.hints.length > 0 ? (
                <div className="space-y-4">
                  {problem.hints.slice(0, revealedHints).map((hint, index) => (
                    <Accordion key={index} type="single" collapsible>
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>Hint {index + 1}</AccordionTrigger>
                        <AccordionContent>{hint}</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                  {revealedHints < problem.hints.length && (
                    <Button onClick={() => setRevealedHints((r) => r + 1)}>
                      Reveal Hint
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No hints available for this problem.</p>
              )}
            </TabsContent>

            {/* Simple RHF-powered note form under Submissions */}
            <TabsContent value="submissions" className="mt-0">
              <h2 className="text-xl font-bold font-headline mb-4">Your Submissions</h2>
              <p className="text-muted-foreground mb-4">
                You haven't made any submissions for this problem yet.
              </p>
              <SubmissionNoteForm problemId={problem?.id} />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

export default ProblemDescriptionPanel;