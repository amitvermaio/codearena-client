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

const dummyProblem = {
  id: 1,
  title: "Two Sum",
  description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
</pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li><li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li><li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li><li><strong>Only one valid answer exists.</strong></li></ul>`,
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  acceptance: "50.5%",
  status: "Todo",
};

function ProblemNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold">404 - Problem Not Found</h2>
      <p className="text-muted-foreground">
        The problem you are looking for does not exist.
      </p>
      <Button asChild className="mt-4">
        <Link to="/problems">Back to Problems</Link>
      </Button>
    </div>
  );
}


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
    // To view the page with dummy data, the API call is commented out.
    // You can uncomment this block to restore API fetching.
    /*
    let active = true;
    async function load() { ... } // Original async load function
    if (id) load();
    return () => { active = false; };
    */

    // --- Dummy Data Implementation ---
    setLoading(true);
    const timer = setTimeout(() => {
      setProblem(dummyProblem);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
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
