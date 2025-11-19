import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axios.config";
import { useIsMobile } from "../../hooks/use-mobile";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
// Optional editor/client panel. Keep if you already have this component.
import ProblemDescriptionPanel from "@/components/problems/ProblemDescriptionPanel";
import ProblemPageSkeleton from "@/components/problems/ProblemPageSkeleton";
import PairProgrammingClient from "@/components/problems/PairProgrammingClient";
import ProblemNotFound from "./ProblemNotFound";
import { asyncloadcurrentproblem } from "@/store/actions/problems/problemAction";

const ProblemPage = () => {
  const { problemId } = useParams();
  const isMobile = useIsMobile();

  // ---------------- Redux Version (commented) ----------------
  const dispatch = useDispatch();
  const { currentProblem, loading } = useSelector((state) => state.problems);
  // const problem = useSelector((state) => selectProblemById(state, id));
  // const loading = useSelector(selectProblemLoading);
  // useEffect(() => {
  //   if (id) dispatch(fetchProblemById(id));
  // }, [dispatch, id]);

  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(asyncloadcurrentproblem(problemId));
  }, [problemId]);

  if (loading) return <ProblemPageSkeleton />;
  if (!currentProblem && !loading) return <ProblemNotFound />;

  if (isMobile) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col scroll-smooth">
        <div className="flex-1 overflow-y-auto">
          <ProblemDescriptionPanel problem={currentProblem} />
        </div>
        <div className="h-[60vh] border-t">
          <PairProgrammingClient problem={currentProblem} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={50} minSize={30}>
          <ProblemDescriptionPanel problem={currentProblem} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <PairProgrammingClient problem={currentProblem} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ProblemPage;
