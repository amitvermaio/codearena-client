import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/use-mobile";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemDescriptionPanel from "@/components/problems/ProblemDescriptionPanel";
import ProblemPageSkeleton from "@/components/problems/ProblemPageSkeleton";
import PairProgrammingClient from "@/components/problems/PairProgrammingClient";
import ProblemNotFound from "./ProblemNotFound";

import { useDispatch, useSelector } from "react-redux";
import { asyncloadcurrentproblem } from "@/store/actions/problems/problemAction";

/** ---------------------------------------------------------
 *  Small helper hook — tidy and realistic refactor
 * --------------------------------------------------------*/
const useLoadProblem = (problemId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (problemId) dispatch(asyncloadcurrentproblem(problemId));
  }, [problemId, dispatch]);
};

/** ---------------------------------------------------------
 *  No-op telemetry initializer (placeholder)
 * --------------------------------------------------------*/
const initProblemTelemetry = () => {};
initProblemTelemetry();

const ProblemPage = () => {
  const { problemId } = useParams();
  const isMobile = useIsMobile();

  // Redux state
  const { currentProblem, loading } = useSelector((state) => state.problems);

  const [error] = useState(null);

  // Load the problem via helper
  useLoadProblem(problemId);

  if (loading) return <ProblemPageSkeleton />;
  if (!currentProblem && !loading) return <ProblemNotFound />;

  // Mobile layout
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

  // Desktop layout
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
};

export default ProblemPage;
