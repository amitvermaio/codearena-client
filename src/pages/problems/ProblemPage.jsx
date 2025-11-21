import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

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

import { useDispatch, useSelector } from "react-redux";
import { asyncloadproblems } from "@/store/actions/problems/problemAction";

import { setFilter, applyFilters } from "@/store/features/problems/problemSlice";

const ProblemsPage = () => {
  const dispatch = useDispatch();

  // Redux states
  const problems = useSelector((state) => state.problems.problems);
  const filteredProblems = useSelector((state) => state.problems.filteredProblems);
  const filters = useSelector((state) => state.problems.filters);
  const potd = useSelector((state) => state.potd.potd);


  const [isPairingDialogOpen, setIsPairingDialogOpen] = useState(false);

  useEffect(() => {
    document.title = "CodeArena Problems — Level Up Your Logic";
  }, []);

  useEffect(() => {
    dispatch(asyncloadproblems());
  }, [dispatch]);

  const allTags = useMemo(() => {
    const setTags = new Set();
    problems?.forEach((p) => p.tags?.forEach((t) => setTags.add(t)));
    return [...setTags].sort();
  }, [problems]);

  const handleFilter = (type, value) => {
    dispatch(setFilter({ filterType: type, value }));
    dispatch(applyFilters());
  };

  return (
    <>
      <PairingDialog open={isPairingDialogOpen} onOpenChange={setIsPairingDialogOpen} />

      <div className="container mx-auto py-8 px-4 md:px-6">

        {/* ----------- HEADER START ----------- */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            <span className="text-primary">Problem Library</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharpen your skills, solve challenges, and climb the leaderboard. Your coding journey starts now.
          </p>
        </div>
        {/* ----------- HEADER END ----------- */}

        {/* ----------- PROBLEM OF THE DAY ----------- */}
        {potd && (
          <section className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline flex items-center justify-center gap-3">
                <Flame className="h-8 w-8 text-orange-500" />
                Problem of the Day
              </h2>
            </div>
            <ProblemOfTheDay problem={potd} />
          </section>
        )}

        {/* ----------- PAIRING CARD ----------- */}
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

        {/* ----------- FILTERS SECTION ----------- */}
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">

          {/* SEARCH BAR */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              className="pl-10"
              value={filters.searchQuery}
              onChange={(e) => handleFilter("searchQuery", e.target.value)}
            />
          </div>

          {/* DIFFICULTY */}
          <ShadcnSelect
            value={filters.difficulty}
            onValueChange={(v) => handleFilter("difficulty", v)}
          >
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

          {/* STATUS */}
          <ShadcnSelect
            value={filters.status}
            onValueChange={(v) => handleFilter("status", v)}
          >
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

          {/* TAGS */}
          <Select
            isMulti
            placeholder="Tags"
            className="w-full sm:w-[200px]"
            options={allTags.map((tag) => ({ value: tag, label: tag }))}
            value={filters.tags.map((t) => ({ value: t, label: t }))}
            onChange={(selected) =>
              handleFilter(
                "tags",
                selected ? selected.map((opt) => opt.value) : []
              )
            }
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "hsl(240 10% 3.9%)",
                borderColor: "hsl(240 3.7% 15.9%)",
                boxShadow: "none",
                "&:hover": { borderColor: "hsl(240 3.7% 15.9%)" },
                color: "white",
                minHeight: "38px",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              menu: (base) => ({
                ...base,
                backgroundColor: "hsl(240 10% 3.9%)",
                color: "white",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "hsl(240 3.7% 15.9%)"
                  : "hsl(240 10% 3.9%)",
                color: "white",
                cursor: "pointer",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              multiValue: (base) => ({
                ...base,
                backgroundColor: "hsl(240 3.7% 15.9%)",   // Same chip color as before
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              multiValueLabel: (base) => ({
                ...base,
                color: "white",   // Text color fixed
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              multiValueRemove: (base) => ({
                ...base,
                color: "white",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                backgroundColor: "hsl(240 3.7% 20%)",
                color: "white",
              }),

              placeholder: (base) => ({
                ...base,
                color: "hsl(0 0% 98%)",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              singleValue: (base) => ({
                ...base,
                color: "white",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),

              input: (base) => ({
                ...base,
                color: "white",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }),
            }}
          />

        </div>

        {/* ----------- PROBLEMS LIST ----------- */}
        <ProblemList problems={filteredProblems} />
      </div>
    </>
  );
};

export default ProblemsPage;
