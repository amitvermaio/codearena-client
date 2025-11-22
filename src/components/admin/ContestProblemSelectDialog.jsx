import React, { useState, useEffect } from "react";
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
import { difficultyColors } from "@/utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  applyFilters,
  selectAllProblems,
  selectFilteredProblems,
  selectFilters,
  clearFilters,
} from "@/store/features/problems/problemSlice";


const ContestProblemSelectDialog = ({ isOpen, setIsOpen, onSave, initialSelected }) => {
  const dispatch = useDispatch();
  const [selectedProblemIds, setSelectedProblemIds] = useState(new Set());

  const problems = useSelector(selectAllProblems);
  const filteredProblems = useSelector(selectFilteredProblems);
  const filters = useSelector(selectFilters);

  const getProblemId = (problem) => String(problem?._id ?? problem?.id ?? "");
  const normalizeToId = (item) =>
    typeof item === "string" || typeof item === "number" ? String(item) : getProblemId(item);


  useEffect(() => {
    if (isOpen) {
      setSelectedProblemIds(new Set((initialSelected || []).map((item) => normalizeToId(item))));
      dispatch(applyFilters());
    } else {
      dispatch(clearFilters());
    }
  }, [isOpen, initialSelected, dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, problems, filters]);

  const handleFilter = (type, value) => {
    dispatch(setFilter({ filterType: type, value }));
  };

  const handleSelect = (problemId, isSelected) => {
    const normalizedId = String(problemId);
    const newSet = new Set(selectedProblemIds);
    if (isSelected) {
      newSet.add(normalizedId);
    } else {
      newSet.delete(normalizedId);
    }
    setSelectedProblemIds(newSet);
  };

  const handleSave = () => {
    const selectedIds = Array.from(selectedProblemIds);
    onSave(selectedIds);
    setIsOpen(false);
    toast.success(`${selectedIds.length} problems selected for your contest.`);
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
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by problem title..."
            className="pl-10"
            value={filters.searchQuery}
            onChange={(e) => handleFilter("searchQuery", e.target.value)}
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
              {filteredProblems.map((problem) => {
                const problemId = getProblemId(problem);
                return (
                  <TableRow key={problemId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProblemIds.has(problemId)}
                        onCheckedChange={(checked) =>
                          handleSelect(problemId, !!checked)
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
                      {(problem.tags || []).slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })}
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
    problems: [],
    selectedProblemIds: new Set(),
  },
  reducers: {
    setProblems: (state, action) => {
      state.problems = action.payload;
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
const problems = useSelector((state) => state.problems.problems);
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
  const selected = problems.filter((p) => selectedProblemIds.has(p.id));
  onSave(selected);
  setIsOpen(false);
  toast.success(`${selected.length} problems selected for your contest.`);
};
========================================================= */
