import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const defaultProblem = {
  title: "",
  description: "",
  difficulty: "Easy",
  tags: [],
  testCases: [{ input: "", output: "", isHidden: false }],
  hints: [],
};

export function ProblemEditDialog({ isOpen, setIsOpen, problem, onSave }) {
  const [formData, setFormData] = useState(defaultProblem);
  const [tagInput, setTagInput] = useState("");
  const [hintInput, setHintInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (problem) {
        setFormData({
          ...defaultProblem, // ensure all fields are present
          ...problem,
          testCases:
            problem.testCases && problem.testCases.length > 0
              ? problem.testCases
              : [{ input: "", output: "", isHidden: false }],
          hints: problem.hints || [],
        });
      } else {
        setFormData(defaultProblem);
      }
    }
  }, [isOpen, problem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDifficultyChange = (value) => {
    setFormData((prev) => ({ ...prev, difficulty: value }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...(formData.testCases || [])];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    setFormData((prev) => ({ ...prev, testCases: newTestCases }));
  };

  const handleHiddenChange = (index, isHidden) => {
    const newTestCases = [...(formData.testCases || [])];
    newTestCases[index] = { ...newTestCases[index], isHidden };
    setFormData((prev) => ({ ...prev, testCases: newTestCases }));
  };

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCases: [
        ...(prev.testCases || []),
        { input: "", output: "", isHidden: false },
      ],
    }));
  };

  const removeTestCase = (index) => {
    if (formData.testCases && formData.testCases.length > 1) {
      const newTestCases = formData.testCases.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, testCases: newTestCases }));
    }
  };

  const handleMarkAllHidden = (checked) => {
    const newTestCases = formData.testCases?.map((tc) => ({
      ...tc,
      isHidden: checked,
    }));
    setFormData((prev) => ({ ...prev, testCases: newTestCases }));
  };

  const handleAddHint = () => {
    if (hintInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        hints: [...(prev.hints || []), hintInput.trim()],
      }));
      setHintInput("");
    }
  };

  const handleRemoveHint = (index) => {
    setFormData((prev) => ({
      ...prev,
      hints: prev.hints?.filter((_, i) => i !== index),
    }));
  };

  const areAllHidden = formData.testCases?.every((tc) => tc.isHidden);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: problem?.id || "",
      status: "Todo",
      acceptance: "N/A",
    });
    setIsOpen(false);
    toast.success("Problem Saved", {
      description: `"${formData.title}" has been saved successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{problem ? "Edit Problem" : "Create Problem"}</DialogTitle>
          <DialogDescription>
            {problem
              ? "Update the details of the problem."
              : "Fill out the form to create a new problem."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              rows={6}
              placeholder="Problem description with markdown support for `code` and **bold**."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="difficulty" className="text-right">
              Difficulty
            </Label>
            <Select
              name="difficulty"
              value={formData.difficulty}
              onValueChange={handleDifficultyChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="tags" className="text-right pt-2">
              Tags
            </Label>
            <div className="col-span-3">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type a tag and press Enter"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Hints Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Hints</h3>
            <div className="space-y-4">
              {formData.hints?.map((hint, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={hint} readOnly className="flex-grow" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveHint(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={hintInput}
                  onChange={(e) => setHintInput(e.target.value)}
                  placeholder="Add a new hint"
                />
                <Button type="button" onClick={handleAddHint}>
                  Add Hint
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Test Cases Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-center">Test Cases</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mark-all-hidden"
                  checked={areAllHidden}
                  onCheckedChange={(checked) =>
                    handleMarkAllHidden(!!checked)
                  }
                />
                <Label
                  htmlFor="mark-all-hidden"
                  className="text-sm font-medium"
                >
                  Mark all as hidden
                </Label>
              </div>
            </div>

            {formData.testCases?.map((testCase, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md relative"
              >
                <div className="col-span-12 flex items-center justify-between">
                  <Label>Test Case {index + 1}</Label>
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor={`hidden-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Hidden
                    </Label>
                    <Checkbox
                      id={`hidden-${index}`}
                      checked={!!testCase.isHidden}
                      onCheckedChange={(checked) =>
                        handleHiddenChange(index, !!checked)
                      }
                    />
                  </div>
                </div>

                <div className="col-span-11 space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor={`input-${index}`}>Input</Label>
                    <Textarea
                      id={`input-${index}`}
                      value={testCase.input}
                      onChange={(e) =>
                        handleTestCaseChange(index, "input", e.target.value)
                      }
                      placeholder="stdin"
                      className="font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`output-${index}`}>Output</Label>
                    <Textarea
                      id={`output-${index}`}
                      value={testCase.output}
                      onChange={(e) =>
                        handleTestCaseChange(index, "output", e.target.value)
                      }
                      placeholder="stdout"
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex items-center h-full">
                  {formData.testCases &&
                    formData.testCases.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeTestCase(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addTestCase}>
              Add Test Case
            </Button>
          </div>

          <DialogFooter className="mt-6 sticky bottom-0 bg-background py-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
