import { useState, useMemo } from "react";
import PropTypes from 'prop-types';

// UI Components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Icons
import { Code, Lightbulb, History, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Utils & Components
import { formatDescription } from "@/utils/markdown";
import { difficultyColors } from "@/utils/constants";
import SubmissionNoteForm from "./SubmissionNoteForm";

// Sub-components for better organization
const ProblemHeader = ({ title, difficulty, acceptance }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold dark:text-gray-900 text-white mb-2">
      {title}
    </h1>
    <div className="flex items-center gap-3">
      <Badge 
        variant="outline" 
        className={`${difficultyColors[difficulty] || ''} font-medium`}
      >
        {difficulty}
      </Badge>
      {acceptance && (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          <CheckCircle className="inline w-4 h-4 mr-1 text-green-500" />
          {acceptance}% Acceptance
        </span>
      )}
    </div>
  </div>
);

const TestCaseItem = ({ testCase, index }) => (
  <div className="mt-4 border border-border rounded-lg overflow-hidden bg-card">
    <div className="bg-muted/50 px-4 py-2 border-b border-border">
      <p className="font-medium text-sm text-foreground">
        Example {index + 1}
      </p>
    </div>
    <div className="p-4 bg-background">
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Input:</p>
          <div className="bg-muted/50 p-3 rounded-md font-mono text-sm text-foreground">
            {testCase?.input?.replace(/\n/g, ", ")}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Output:</p>
          <div className="bg-muted/50 p-3 rounded-md font-mono text-sm text-foreground">
            {testCase?.output?.replace(/\n/g, ", ")}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HintsSection = ({ hints, revealedHints, onRevealHint }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
      <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
      Hints
    </h2>
    
    {hints && hints.length > 0 ? (
      <>
        {hints.slice(0, revealedHints).map((hint, index) => (
          <div key={index} className="bg-secondary/30 border border-border rounded-lg overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value={`hint-${index}`} className="border-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center w-full">
                    <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary rounded-full text-xs font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground">Show Hint {index + 1}</span>
                    <div className="ml-auto text-xs text-muted-foreground">
                      Click to {index === revealedHints - 1 ? 'hide' : 'show'}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 text-foreground/90 bg-secondary/10">
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    {hint}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
        
        {revealedHints < hints.length && (
          <Button 
            variant="outline" 
            onClick={onRevealHint}
            className="mt-4 w-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-colors"
          >
            <Lightbulb className="w-4 h-4 mr-2 text-primary" />
            Reveal Hint {revealedHints + 1} of {hints.length}
          </Button>
        )}
      </>
    ) : (
      <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
        <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground/60 mb-3" />
        <h3 className="text-foreground/80 font-medium mb-1">No Hints Available</h3>
        <p className="text-muted-foreground text-sm">
          Check back later or try solving it on your own!
        </p>
      </div>
    )}
  </div>
);

const SubmissionsSection = ({ problemId }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
      <History className="w-5 h-5 mr-2 text-primary" />
      Your Submissions
    </h2>
    <div className="bg-muted/30 rounded-lg p-6 text-center border border-border">
      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-primary/70" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No Submissions Yet
      </h3>
      <p className="text-muted-foreground mb-5 max-w-md mx-auto">
        You haven't made any submissions for this problem yet. Solve it and see your submissions here!
      </p>
      <div className="max-w-xs mx-auto">
        <SubmissionNoteForm problemId={problemId} />
      </div>
    </div>
  </div>
);

const ProblemDescriptionPanel = ({ problem }) => {
  const [revealedHints, setRevealedHints] = useState(0);
  
  // Memoize filtered test cases
  const visibleTestCases = useMemo(
    () => (problem?.testCases || []).filter((tc) => !tc.isHidden),
    [problem]
  );

  const handleRevealHint = () => {
    setRevealedHints(prev => Math.min(prev + 1, problem?.hints?.length || 0));
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-background rounded-lg border border-border overflow-hidden">
      <Tabs defaultValue="description" className="flex-grow flex flex-col min-h-0">
        {/* Tab Navigation */}
        <div className="border-b border-border px-4 bg-muted/20">
          <TabsList className="bg-transparent p-0 w-full justify-start gap-1">
            <TabsTrigger
              value="description"
              className="relative group rounded-md px-4 py-3 text-muted-foreground hover:text-foreground transition-colors
                         data-[state=active]:text-foreground data-[state=active]:bg-background
                         data-[state=active]:shadow-sm data-[state=active]:font-medium
                         after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                         after:w-0 after:h-0.5 after:bg-primary after:transition-all
                         data-[state=active]:after:w-4/5"
            >
              <Code className="w-4 h-4 mr-2 opacity-70 group-data-[state=active]:opacity-100" />
              Description
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="relative group rounded-md px-4 py-3 text-muted-foreground hover:text-foreground transition-colors
                         data-[state=active]:text-foreground data-[state=active]:bg-background
                         data-[state=active]:shadow-sm data-[state=active]:font-medium
                         after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                         after:w-0 after:h-0.5 after:bg-primary after:transition-all
                         data-[state=active]:after:w-4/5"
            >
              <History className="w-4 h-4 mr-2 opacity-70 group-data-[state=active]:opacity-100" />
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="hints"
              className="relative group rounded-md px-4 py-3 text-muted-foreground hover:text-foreground transition-colors
                         data-[state=active]:text-foreground data-[state=active]:bg-background
                         data-[state=active]:shadow-sm data-[state=active]:font-medium
                         after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                         after:w-0 after:h-0.5 after:bg-primary after:transition-all
                         data-[state=active]:after:w-4/5"
            >
              <Lightbulb className="w-4 h-4 mr-2 opacity-70 group-data-[state=active]:opacity-100" />
              Hints
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <ScrollArea className="flex-grow min-h-0">
          <div className="p-6">
            {/* Description Tab */}
            <TabsContent value="description" className="mt-0 space-y-6">
              <ProblemHeader 
                title={problem?.title} 
                difficulty={problem?.difficulty} 
                acceptance={problem?.acceptance} 
              />
              
              {/* Problem Statement */}
              <div className="prose dark:prose-invert max-w-none prose-sm prose-headings:font-headline prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']">
                <div 
                  className="text-foreground/90 [&_p]:leading-relaxed [&_p]:my-3 [&_ul]:my-3 [&_ol]:my-3 [&_pre]:my-4 [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:bg-transparent [&_code]:p-0"
                  dangerouslySetInnerHTML={formatDescription(problem?.statement || '')}
                />
              </div>

              {/* Test Cases */}
              {visibleTestCases.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold dark:text-gray-900 text-white mb-4">
                    Examples
                  </h3>
                  <div className="space-y-4">
                    {visibleTestCases.map((testCase, index) => (
                      <TestCaseItem 
                        key={index} 
                        testCase={testCase} 
                        index={index} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {problem?.tags?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="px-3 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Hints Tab */}
            <TabsContent value="hints" className="mt-0">
              <HintsSection 
                hints={problem?.hints || []} 
                revealedHints={revealedHints}
                onRevealHint={handleRevealHint}
              />
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="mt-0">
              <SubmissionsSection problemId={problem?._id} />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

// PropTypes for better component documentation and type checking
ProblemDescriptionPanel.propTypes = {
  problem: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    difficulty: PropTypes.oneOf(['Easy', 'Medium', 'Hard']),
    acceptance: PropTypes.string,
    statement: PropTypes.string,
    testCases: PropTypes.arrayOf(PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.string,
      isHidden: PropTypes.bool
    })),
    hints: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  })
};

// Default props
ProblemDescriptionPanel.defaultProps = {
  problem: {
    testCases: [],
    hints: [],
    tags: []
  }
};

export default ProblemDescriptionPanel;