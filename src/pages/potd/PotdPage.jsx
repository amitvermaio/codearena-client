import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { asyncgetpotd } from "@/store/actions/problems/potdAction";

import ProblemDescriptionPanel from "@/components/problems/ProblemDescriptionPanel";
import ProblemPageSkeleton from "@/components/problems/ProblemPageSkeleton";
import PairProgrammingClient from "@/components/problems/PairProgrammingClient";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Flame, RefreshCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PotdUnavailable = ({ onRetry }) => (
  <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4 py-16">
    <div className="max-w-xl text-center space-y-6 bg-muted/20 border border-dashed border-border rounded-2xl p-10">
      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Flame className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Problem of the Day is warming up</h1>
        <p className="text-muted-foreground">
          We couldn’t find today’s challenge just yet. Our judges are compiling something awesome—check back in a
          moment or refresh to try again.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button onClick={onRetry} className="w-full sm:w-auto" variant="default">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh POTD
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link to="/problems">Browse Problems</Link>
        </Button>
      </div>
    </div>
  </div>
);

const PotdPage = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const { potd, loading, error, loaded } = useSelector((state) => state.potd);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(asyncgetpotd());
    }
  }, [dispatch, loaded, loading]);

  useEffect(() => {
    document.title = potd ? `${potd.title} — Problem of the Day` : "Problem of the Day";
  }, [potd]);

  const retryFetch = () => {
    dispatch(asyncgetpotd());
  };

  const container = useMemo(() => {
    if (loading && !potd) {
      return <ProblemPageSkeleton />;
    }

    if (error) {
      return <PotdUnavailable onRetry={retryFetch} />;
    }

    if (!potd) {
      return <PotdUnavailable onRetry={retryFetch} />;
    }

    if (isMobile) {
      return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <ProblemDescriptionPanel problem={potd} />
          </div>
          <div className="h-[60vh] border-t">
            <PairProgrammingClient problem={potd} />
          </div>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel defaultSize={50} minSize={30}>
            <ProblemDescriptionPanel problem={potd} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <PairProgrammingClient problem={potd} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }, [error, isMobile, loading, potd]);

  return <>{container}</>;
};

export default PotdPage;