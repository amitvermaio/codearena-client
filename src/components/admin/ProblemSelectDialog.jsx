import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
  Hard: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};

const ProblemSelectDialog = ({ isOpen, setIsOpen, problems, onSelectProblem }) => {
  const handleSelect = (problem) => {
    onSelectProblem(problem);
    setIsOpen(false);
    toast.success(`"${problem.title}" is now the Problem of the Day.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Problem of the Day</DialogTitle>
          <DialogDescription>
            Choose a problem from the list to set as the "Problem of the Day".
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell className="font-medium">{problem.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={difficultyColors[problem.difficulty]}
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => handleSelect(problem)}>
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ProblemSelectDialog }