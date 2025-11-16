import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { difficultyColors } from "@/utils/constants";

import {
  selectProblemsWithStatus,
  setUserProgress,
} from "@/store/features/problems/problemSlice";

const statusIcons = {
  Solved: <CheckCircle className="h-5 w-5 text-green-500" />,
  Attempted: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  Todo: <Circle className="h-5 w-5 text-muted-foreground" />,
};

const ProblemList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.user?.data);

  const problems = useSelector(selectProblemsWithStatus);

  // whenever user changes, push progress to problems slice
  useEffect(() => {
    const solvedIds = (user?.problemSolved || []).map((x) => String(x));
    const attemptedIds = (user?.problemAttempted || []).map((x) => String(x));
    dispatch(setUserProgress({ solvedIds, attemptedIds }));
  }, [user, dispatch]);

  const handleProblemClick = (slug) => {
    navigate(`/problems/${slug}`);
  };

  const hasAnyProblems = problems.length > 0;

  return (
    <Card className="overflow-hidden">
      {!hasAnyProblems && (
        <CardHeader>
          <CardTitle className="font-headline">Problem Set</CardTitle>
          <CardDescription>
            Challenge yourself with our curated list of problems.
          </CardDescription>
        </CardHeader>
      )}

      <CardContent className={hasAnyProblems ? "p-0" : ""}>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Acceptance</TableHead>
                {!hasAnyProblems && <TableHead>Tags</TableHead>}
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {hasAnyProblems ? (
                problems.map((problem, idx) => {
                  const key = problem._id || problem.slug || problem.id || idx;
                  const status = problem._status ?? "Todo";

                  return (
                    <TableRow
                      key={key}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleProblemClick(problem.slug)}
                    >
                      <TableCell>{statusIcons[status]}</TableCell>

                      <TableCell className="font-medium hover:text-primary transition-colors">
                        {problem.title}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={difficultyColors[problem.difficulty] || ""}
                        >
                          {problem.difficulty}
                        </Badge>
                      </TableCell>

                      <TableCell>{problem.acceptance}</TableCell>

                      {!hasAnyProblems && (
                        <TableCell className="space-x-1">
                          {(problem.tags || []).slice(0, 3).map((tag, tIdx) => (
                            <Badge
                              key={`${problem.slug || problem._id || idx}-${tag}-${tIdx}`}
                              variant="secondary"
                            >
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
                  );
                })
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
};

export default ProblemList;
