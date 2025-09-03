import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// =============================
// Difficulty badge colors
// =============================
const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
  Hard: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};

// =============================
// Main Component
// =============================
const ContestProblemSelectDialog = ({ isOpen, setIsOpen, onSave, initialSelected }) => {
  const [allProblems, setAllProblems] = useState([]);
  const [selectedProblemIds, setSelectedProblemIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------------------
  // Fetch problems (replace with your API)
  // ---------------------------
  const getProblems = async () => {
    // Example mock API
    return [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "HashMap"],
      },
      {
        id: "2",
        title: "Binary Tree Paths",
        difficulty: "Medium",
        tags: ["Tree", "DFS"],
      },
      {
        id: "3",
        title: "Word Ladder",
        difficulty: "Hard",
        tags: ["Graph", "BFS"],
      },
    ];
  };

  useEffect(() => {
    getProblems().then(setAllProblems);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSelectedProblemIds(new Set(initialSelected.map((p) => p.id)));
    }
  }, [isOpen, initialSelected]);

  // ---------------------------
  // Search filter
  // ---------------------------
  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProblems, searchQuery]);

  // ---------------------------
  // Selection logic
  // ---------------------------
  const handleSelect = (problemId, isSelected) => {
    const newSet = new Set(selectedProblemIds);
    if (isSelected) {
      newSet.add(problemId);
    } else {
      newSet.delete(problemId);
    }
    setSelectedProblemIds(newSet);
  };

  const handleSave = () => {
    const selected = allProblems.filter((p) => selectedProblemIds.has(p.id));
    onSave(selected);
    setIsOpen(false);
    toast.success(`${selected.length} problems selected for your contest.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Problems for Your Contest</DialogTitle>
          <DialogDescription>
            Choose from the CodeArena library to build your challenge.
          </DialogDescription>
        </DialogHeader>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by problem title..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Problem list */}
        <ScrollArea className="max-h-[50vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProblemIds.has(problem.id)}
                      onCheckedChange={(checked) =>
                        handleSelect(problem.id, !!checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{problem.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={difficultyColors[problem.difficulty]}
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1 max-w-sm truncate whitespace-nowrap">
                    {problem.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredProblems.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              No problems found for your search query.
            </div>
          )}
        </ScrollArea>

        {/* Footer buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Confirm Selection ({selectedProblemIds.size})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ContestProblemSelectDialog;

/* =========================================================
   🚀 REDUX IMPLEMENTATION (COMMENTED)
   =========================================================

// In your Redux slice (problemsSlice.js)
import { createSlice } from "@reduxjs/toolkit";

const problemsSlice = createSlice({
  name: "problems",
  initialState: {
    allProblems: [],
    selectedProblemIds: new Set(),
  },
  reducers: {
    setProblems: (state, action) => {
      state.allProblems = action.payload;
    },
    toggleProblem: (state, action) => {
      if (state.selectedProblemIds.has(action.payload)) {
        state.selectedProblemIds.delete(action.payload);
      } else {
        state.selectedProblemIds.add(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedProblemIds.clear();
    },
  },
});

export const { setProblems, toggleProblem, clearSelection } = problemsSlice.actions;
export default problemsSlice.reducer;

// In ContestProblemSelectDialog.jsx
import { useSelector, useDispatch } from "react-redux";
import { setProblems, toggleProblem } from "@/redux/problemsSlice";

const dispatch = useDispatch();
const allProblems = useSelector((state) => state.problems.allProblems);
const selectedProblemIds = useSelector((state) => state.problems.selectedProblemIds);

// Fetch problems
useEffect(() => {
  getProblems().then((data) => dispatch(setProblems(data)));
}, [dispatch]);

// Handle select
const handleSelect = (problemId, isSelected) => {
  dispatch(toggleProblem(problemId));
};

// Handle save (Redux keeps selectedProblems in store)
const handleSave = () => {
  const selected = allProblems.filter((p) => selectedProblemIds.has(p.id));
  onSave(selected);
  setIsOpen(false);
  toast.success(`${selected.length} problems selected for your contest.`);
};
========================================================= */
