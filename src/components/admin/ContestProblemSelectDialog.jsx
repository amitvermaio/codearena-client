import React, { useState, useEffect, useMemo, useCallback } from "react";
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

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
  Hard: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};

const mockFetchProblems = async () =>
  Promise.resolve([
    { id: "1", title: "Two Sum", difficulty: "Easy", tags: ["Array", "HashMap"] },
    { id: "2", title: "Binary Tree Paths", difficulty: "Medium", tags: ["Tree", "DFS"] },
    { id: "3", title: "Word Ladder", difficulty: "Hard", tags: ["Graph", "BFS"] },
    { id: "4", title: "Sliding Window", difficulty: "Medium", tags: ["Array", "Two Pointers"] },
    { id: "5", title: "Dijkstra", difficulty: "Hard", tags: ["Graph", "Shortest Path"] },
  ]);

const ContestProblemSelectDialog = ({ isOpen, setIsOpen, onSave, initialSelected = [] }) => {
  const [allProblems, setAllProblems] = useState([]);
  const [selectedProblemIds, setSelectedProblemIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    mockFetchProblems()
      .then((data) => {
        if (!mounted) return;
        setAllProblems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!mounted) return;
        setAllProblems([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // initialize selection whenever dialog opens or initialSelected changing 
    if (isOpen) {
      setSelectedProblemIds(new Set((initialSelected || []).map((p) => String(p.id))));
    }
  }, [isOpen, initialSelected]);

  // debounce search input for a smoother UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim().toLowerCase()), 180);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const filteredProblems = useMemo(() => {
    if (!debouncedQuery) return allProblems;
    return allProblems.filter((p) => {
      const title = String(p.title || "").toLowerCase();
      const tags = (p.tags || []).join(" ").toLowerCase();
      return title.includes(debouncedQuery) || tags.includes(debouncedQuery);
    });
  }, [allProblems, debouncedQuery]);

  const handleSelect = useCallback((problemId, isSelected) => {
    // always create a new Set to trigger state updates reliably
    setSelectedProblemIds((prev) => {
      const next = new Set(prev);
      if (isSelected) next.add(String(problemId));
      else next.delete(String(problemId));
      return next;
    });
  }, []);

  const handleToggleAllVisible = () => {
    const visibleIds = filteredProblems.map((p) => String(p.id));
    setSelectedProblemIds((prev) => {
      const next = new Set(prev);
      const allSelected = visibleIds.every((id) => next.has(id));
      if (allSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const handleSave = () => {
    const selected = allProblems.filter((p) => selectedProblemIds.has(String(p.id)));
    onSave(selected);
    setIsOpen(false);
    toast.success(`${selected.length} problem${selected.length === 1 ? "" : "s"} selected for your contest.`);
  };

  const selectedCount = selectedProblemIds.size;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Problems for Your Contest</DialogTitle>
          <DialogDescription>Choose from the CodeArena library to build your challenge.</DialogDescription>
        </DialogHeader>

        <div className="mt-3 mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or tag..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search problems"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleToggleAllVisible}>
              {filteredProblems.every((p) => selectedProblemIds.has(String(p.id))) ? "Unselect visible" : "Select visible"}
            </Button>
            <Button size="sm" onClick={() => { setSelectedProblemIds(new Set()); }}>
              Clear
            </Button>
          </div>
        </div>

        <ScrollArea className="max-h-[50vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[56px]"> </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProblems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No problems match your search.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProblems.map((problem) => {
                  const id = String(problem.id);
                  const checked = selectedProblemIds.has(id);
                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(val) => handleSelect(id, !!val)}
                          aria-label={`Select problem ${problem.title}`}
                        />
                      </TableCell>

                      <TableCell className="font-medium">{problem.title}</TableCell>

                      <TableCell>
                        <Badge variant="outline" className={difficultyColors[problem.difficulty] ?? ""}>
                          {problem.difficulty}
                        </Badge>
                      </TableCell>

                      <TableCell className="space-x-1 max-w-sm truncate whitespace-nowrap">
                        {(Array.isArray(problem.tags) ? problem.tags.slice(0, 3) : []).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedCount} selected
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={selectedCount === 0}>
              Confirm Selection ({selectedCount})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContestProblemSelectDialog;
