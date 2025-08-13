import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Wand2, Loader2, Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// Redux imports (uncomment jab Redux setup ho jaye)
// import { useDispatch, useSelector } from "react-redux";
// import { summarizeCode } from "../../redux/summarizerSlice";

const CodeSummarizerClient = () => {
  // Local state (temporary, Redux se replace karna hai)
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  // Redux version
  // const dispatch = useDispatch();
  // const { loading, summary, error } = useSelector((state) => state.summarizer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");

    try {
      // API call (replace with Redux thunk later)
      const res = await axios.post(
        "/api/summarize",
        { language, code }, // body data
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.error) {
        setError(res.data.error);
      } else {
        setSummary(res.data.summary);
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl leading-tight">
            AI Code Summarizer
          </CardTitle>
          <CardDescription className="leading-snug">
            Paste your code below to get an AI-powered summary of its functionality, algorithms, and data structures.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Language Select */}
          <div className="space-y-2">
            <Label htmlFor="language">Programming Language</Label>
            <Select
              value={language}
              onValueChange={(val) => setLanguage(val)}
              required
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Code Input */}
          <div className="space-y-2">
            <Label htmlFor="code">Code Submission</Label>
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="function fibonacci(n) { ... }"
              className="min-h-[250px] font-code text-sm"
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Summarize Code
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>

      {/* Summary Result */}
      {summary && (
        <div className="p-6 border-t">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="font-headline">Summary Result</AlertTitle>
            <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
              <p>{summary}</p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
};

export default CodeSummarizerClient;
