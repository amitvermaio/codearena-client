import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function SubmissionNoteForm({ problemId }) {
  if (!problemId) return null; // Prevent rendering if no problemId
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
      console.error('Error submitting note:', err);
      // You might want to show an error toast here
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
          <Button type="submit" disabled={isSubmitting} className="w-full" variant="outline">
            {isSubmitting ? 'Saving...' : 'Save Note'}
          </Button>
        </div>
      </form>
  );
}

export default SubmissionNoteForm;