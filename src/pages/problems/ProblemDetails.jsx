import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useIsMobile } from "../../hooks/use-mobile"

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

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Optional editor/client panel. Keep if you already have this component.
import ProblemDescriptionPanel from "@/components/problems/ProblemDescriptionPanel";
import ProblemPageSkeleton from "@/components/problems/ProblemPageSkeleton";
import PairProgrammingClient from "@/components/problems/PairProgrammingClient";
// ---------------- Helpers ----------------
const difficultyColors = {
  Easy:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
  Hard:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};


function SubmissionNoteForm({ problemId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { language: "javascript", note: "" },
  });

  const onSubmit = async (values) => {
    try {
      // Replace with your backend route
      await axios.post(`/api/problems/${problemId}/notes`, values);
      reset();
      // If using Redux later:
      // dispatch(addSubmissionNote({ problemId, ...values }))
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="text-sm font-medium">Language</label>
        <Input
          placeholder="Java"
          {...register("language", { required: true })}
        />
        {errors.language && (
          <p className="text-xs text-red-500 mt-1">Language is required</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium">Notes (plan/approach)</label>
        <Textarea
          placeholder="Write your thought process or approach here..."
          className="min-h-28"
          {...register("note", { required: true, minLength: 8 })}
        />
        {errors.note && (
          <p className="text-xs text-red-500 mt-1">
            Please add at least 8 characters.
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Note"}
        </Button>
      </div>
    </form>
  );
}





export default function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const res = await axios.get(`/api/problems/${id}`); // Adjust base URL if needed
        if (!active) return;
        if (res?.data) {
          setProblem(res.data);
        } else {
          navigate("/404", { replace: true });
        }
      } catch (err) {
        console.error(err);
        navigate("/404", { replace: true });
      } finally {
        active = false;
        setLoading(false);
      }
    }
    if (id) load();
    return () => {
      active = false;
    };
  }, [id, navigate]);

  if (loading) return <ProblemPageSkeleton />;
  if (!problem) return <ProblemNotFound />;

  if (isMobile) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col">
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
    <ResizablePanelGroup direction="horizontal" className="w-full h-[calc(100vh-4rem)]">
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


