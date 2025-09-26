import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axios.config";
import { useIsMobile } from "../../hooks/use-mobile";

// ---------------- Redux Version Imports (Comment if not using) ----------------
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProblemById, // thunk
//   selectProblemById,
//   selectProblemLoading,
// } from "@/store/problemsSlice";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";

// Optional editor/client panel. Keep if you already have this component.
import ProblemDescriptionPanel from "@/components/problems/ProblemDescriptionPanel";
import ProblemPageSkeleton from "@/components/problems/ProblemPageSkeleton";
import PairProgrammingClient from "@/components/problems/PairProgrammingClient";
import ProblemNotFound from "./ProblemNotFound";

export default function ProblemPage() {
  // Route is defined as /problems/:problemId in routes
  // Use problemId as the slug to fetch the problem
  const { problemId } = useParams();
  const isMobile = useIsMobile();

  // ---------------- Redux Version (commented) ----------------
  // const dispatch = useDispatch();
  // const problem = useSelector((state) => selectProblemById(state, id));
  // const loading = useSelector(selectProblemLoading);
  // useEffect(() => {
  //   if (id) dispatch(fetchProblemById(id));
  // }, [dispatch, id]);

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const safeSlug = encodeURIComponent(problemId);
        const { data } = await axios.get(`/problems/${safeSlug}`);
        if (!active) return;
        setProblem(data);
      } catch (err) {
        if (!active) return;
        setProblem(null);
        setError(err?.response?.data?.message || "Failed to load problem");
      } finally {
        if (active) setLoading(false);
      }
    }
    if (problemId) load();
    return () => {
      active = false;
    };
  }, [problemId]);

  if (loading) return <ProblemPageSkeleton />;
  if (!problem) return <ProblemNotFound />;

  if (isMobile) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col scroll-smooth">
        <div className="flex-1 overflow-y-auto">
          <ProblemDescriptionPanel problem={problem} />
        </div>
        <div className="h-[60vh] border-t">
          <PairProgrammingClient problem={problem} />
        </div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-[calc(100vh-4rem)] scroll-smooth">
      <ResizablePanel defaultSize={50} minSize={30}>
        <ProblemDescriptionPanel problem={problem} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <PairProgrammingClient problem={problem} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
