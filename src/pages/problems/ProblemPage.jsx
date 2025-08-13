import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select"; // Replacement for missing shadcn MultiSelect

import ProblemList from "@/components/problems/ProblemList";
import { ProblemOfTheDay } from "@/components/ProblemOfTheDay";
import PairingDialog from "@/components/problems/PairingDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Search, Flame, Video } from "lucide-react";

export default function ProblemsPage() {
  // Data states
  const [problemOfTheDay, setProblemOfTheDay] = useState(null);
  const [allProblems, setAllProblems] = useState([]);
  // UI states
  const [isPairingDialogOpen, setIsPairingDialogOpen] = useState(false);
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  /**
   * Load dummy data instead of API calls
   */
  useEffect(() => {
    // Commented API calls for now
    // axios.get("/api/problems-of-the-day")
    //   .then((res) => setProblemOfTheDay(res.data))
    //   .catch((err) => console.error("Error fetching Problem of the Day:", err));

    // axios.get("/api/problems")
    //   .then((res) => setAllProblems(res.data))
    //   .catch((err) => console.error("Error fetching problems:", err));

    // Dummy Problem of the Day
    setProblemOfTheDay({
      id: 101,
      title: "Two Sum",
      difficulty: "Easy",
      status: "Todo",
      tags: ["Array", "Hash Table"],
    });

    // Dummy Problems List
    setAllProblems([
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        status: "Todo",
        tags: ["Array", "Hash Table"],
      },
      {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        status: "Attempted",
        tags: ["Linked List", "Math"],
      },
      {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        status: "Todo",
        tags: ["String", "Sliding Window"],
      },
      {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        status: "Todo",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
      },
      {
        id: 5,
        title: "Valid Parentheses",
        difficulty: "Easy",
        status: "Solved",
        tags: ["String", "Stack"],
      },
    ]);
  }, []);

  /**
   * Extract unique tags from problems list
   */
  const allTags = useMemo(() => {
    if (!Array.isArray(allProblems)) return [];
    const tags = new Set();
    allProblems.forEach((problem) => {
      if (Array.isArray(problem.tags)) {
        problem.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [allProblems]);

  /**
   * Apply all filters: search, difficulty, status, tags
   */
  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;

      const matchesStatus =
        selectedStatus === "all" || problem.status === selectedStatus;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => problem.tags.includes(tag));

      return matchesSearch && matchesDifficulty && matchesStatus && matchesTags;
    });
  }, [allProblems, searchQuery, selectedDifficulty, selectedStatus, selectedTags]);

  return (
    <>
      {/* Pair programming modal */}
      <PairingDialog open={isPairingDialogOpen} onOpenChange={setIsPairingDialogOpen} />

      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            <span className="text-primary">Problem Library</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharpen your skills, solve challenges, and climb the leaderboard. Your coding journey starts now.
          </p>
        </div>

        {/* Problem of the Day */}
        {problemOfTheDay && (
          <section className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Flame className="h-8 w-8 text-orange-500" />
                Problem of the Day
              </h2>
            </div>
            <ProblemOfTheDay problem={problemOfTheDay} />
          </section>
        )}

        {/* Pairing feature */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-transparent">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <Video /> Ready to Collaborate?
            </CardTitle>
            <CardDescription>
              Pair up with another developer for a live coding session. Solve problems together in a real-time, shared environment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => setIsPairingDialogOpen(true)}>
              Pair Up Now
            </Button>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Difficulty filter */}
          <ShadcnSelect value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </ShadcnSelect>

          {/* Status filter */}
          <ShadcnSelect value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Solved">Solved</SelectItem>
              <SelectItem value="Attempted">Attempted</SelectItem>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="Revise">Revise</SelectItem>
            </SelectContent>
          </ShadcnSelect>

          {/* Tags filter */}
          <Select
          isMulti
          placeholder="Tags"
          options={allTags.map((tag) => ({ value: tag, label: tag }))}
          value={selectedTags.map((tag) => ({ value: tag, label: tag }))}
          onChange={(selected) => setSelectedTags(selected.map((opt) => opt.value))}
          className="w-full sm:w-[200px]"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "hsl(240 10% 3.9%)",
              borderColor: state.isFocused
                ? "hsl(240 3.7% 15.9%)"
                : "hsl(240 3.7% 15.9%)",
              boxShadow: "none",
              "&:hover": {
                borderColor: "hsl(240 3.7% 15.9%)",
              },
              minHeight: "38px",
              color: "hsl(0 0% 98%)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            valueContainer: (base) => ({
              ...base,
              color: "hsl(0 0% 98%)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            input: (base) => ({
              ...base,
              color: "hsl(0 0% 98%)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "hsl(240 10% 3.9%)",
              color: "hsl(0 0% 98%)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? "hsl(240 3.7% 15.9%)"
                : "hsl(240 10% 3.9%)",
              color: "hsl(0 0% 98%)",
              cursor: "pointer",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "hsl(240 3.7% 15.9%)",
              color: "hsl(0 0% 98%)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "hsl(0 0% 98%)",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }),
            placeholder: (base) => ({
              ...base,
              color: "hsl(0 0% 98%)", // pure white
              fontSize: "0.82rem",
              lineHeight: "1.25rem",
            }),

          }}
        />

        </div>

        {/* Problems list */}
        <ProblemList problems={filteredProblems} />
      </div>
    </>
  );
}
