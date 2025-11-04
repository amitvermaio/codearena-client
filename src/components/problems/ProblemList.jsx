import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, AlertCircle, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  Hard: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
};

const statusIcons = {
  Solved: <CheckCircle className="h-5 w-5 text-green-500" />,
  Attempted: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  Todo: <Circle className="h-5 w-5 text-muted-foreground" />,
};

const ProblemList = ({ problems }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user?.data);
  const solvedProblems = user?.solvedProblems || [];
  const attemptedProblems = user?.attemptedProblems || [];

  const handleProblemClick = (slug) => {
    navigate(`/problems/${slug}`);
  };

  const hasInitialProblems = problems.length > 0;

  return (
    <Card className="overflow-hidden">
      {!hasInitialProblems && (
        <CardHeader>
          <CardTitle className="font-headline">Problem Set</CardTitle>
          <CardDescription>
            Challenge yourself with our curated list of problems.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={hasInitialProblems ? "p-0" : ""}>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Acceptance</TableHead>
                {!hasInitialProblems && <TableHead>Tags</TableHead>}
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasInitialProblems ? (
                problems.map((problem, idx) => (
                  <TableRow
                    key={problem._id || problem.slug || problem.id || idx}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleProblemClick(problem.slug)}
                  >
                    <TableCell>{statusIcons[solvedProblems?.includes(problem._id)
                      ? "Solved"
                      : attemptedProblems?.includes(problem._id)
                      ? "Attempted"
                      : "Todo"]}
                      </TableCell>
                    <TableCell className="font-medium hover:text-primary transition-colors">
                      {problem.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={difficultyColors[problem.difficulty]}
                      >
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{problem.acceptance}</TableCell>
                    {!hasInitialProblems && (
                      <TableCell className="space-x-1">
                        {problem.tags.slice(0, 3).map((tag, tIdx) => (
                          <Badge key={`${problem.slug || problem._id || idx}-${tag}-${tIdx}`} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProblemClick(problem.slug);
                        }}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No problems found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProblemList;
