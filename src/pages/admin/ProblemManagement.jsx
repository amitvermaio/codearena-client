import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProblemEditDialog } from "@/components/admin/ProblemEditDialog";
import { getProblems } from "@/lib/api";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
  Hard: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};

const ProblemManagement = () => {
  const [problems, setProblems] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProblems()
      .then((res) => {
        setProblems(Array.isArray(res) ? res : []);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleProblems = useMemo(() => (Array.isArray(problems) ? problems : []), [problems]);

  const handleEdit = (problem) => {
    setSelectedProblem(problem);
    setIsEditDialogOpen(true);
  };

  const handleAddProblem = () => {
    setSelectedProblem(null);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProblem = (problemId) => {
    setProblems((prev) => prev.filter((p) => p.id !== problemId));
  };

  const handleSaveProblem = (problem) => {
    if (selectedProblem) {
      setProblems((prev) => prev.map((p) => (p.id === problem.id ? problem : p)));
    } else {
      const newProblem = { ...problem, id: `problem-${Date.now()}` };
      setProblems((prev) => [newProblem, ...prev]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Manage Problems</h1>
        <Button onClick={handleAddProblem}>Add New Problem</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem Set</CardTitle>
          <CardDescription>Manage the coding problems available on the platform.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : visibleProblems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center">
                      <p className="text-lg text-muted-foreground">No problems found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleProblems.map((problem) => {
                    const id = problem.id ?? problem._id ?? `p-${String(problem.title).slice(0, 8)}-${Date.now()}`;
                    const difficulty = problem.difficulty ?? "Medium";
                    const tags = Array.isArray(problem.tags) ? problem.tags : [];

                    return (
                      <TableRow key={id}>
                        <TableCell className="font-medium">{problem.title}</TableCell>

                        <TableCell>
                          <Badge variant="outline" className={difficultyColors[difficulty] ?? ""}>
                            {difficulty}
                          </Badge>
                        </TableCell>

                        <TableCell className="space-x-1 max-w-sm truncate whitespace-nowrap">
                          {tags.length > 0 ? (
                            tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>

                        <TableCell className="text-right space-x-2 whitespace-nowrap">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(problem)}>
                            Edit
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                Delete
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the problem.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProblem(problem.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ProblemEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        problem={selectedProblem}
        onSave={handleSaveProblem}
      />
    </div>
  );
};

export default ProblemManagement;
