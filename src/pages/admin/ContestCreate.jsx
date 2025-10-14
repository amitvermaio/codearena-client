import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContestProblemSelectDialog from "@/components/admin/ContestProblemSelectDialog";

const contestFormSchema = z.object({
  title: z.string().min(5, "Contest name must be at least 5 characters."),
  startTime: z.date(),
  duration: z.string().min(1, "Please select a duration."),
  imageUrl: z.any().optional(),
});

const ContestCreate = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(contestFormSchema),
    defaultValues: {
      title: "",
      startTime: new Date(),
      duration: "1h",
      imageUrl: null,
    },
  });

  const onSubmit = async (data) => {
    if (selectedProblems.length === 0) {
      toast.error("Please select at least one problem for the contest.");
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 600));

      const payload = {
        ...data,
        problems: selectedProblems,
        imageName: data.imageUrl?.name ?? null,
      };

      console.log("Creating contest:", payload);

      toast.success("Contest Created", {
        description: `Contest "${data.title}" has been successfully created.`,
      });

      // reset form and selection to show a clean state
      form.reset({
        title: "",
        startTime: new Date(),
        duration: "1h",
        imageUrl: null,
      });
      setSelectedProblems([]);
      setFileName("");
      navigate("/admin/contests");
    } catch (err) {
      console.error("Failed to create contest:", err);
      toast.error("Failed to create contest. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-headline">Create New Contest</h1>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save Contest"}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contest Details</CardTitle>
              <CardDescription>
                Fill in the information below to create your new contest.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Weekly Sprint #25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Time</FormLabel>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "flex-grow justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                type="button"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                          </PopoverContent>
                        </Popover>

                        <Input
                          type="time"
                          className="w-[120px]"
                          value={format(field.value ?? new Date(), "HH:mm")}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":");
                            const newDate = new Date(field.value ?? new Date());
                            newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                            field.onChange(newDate);
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1h">1 Hour</SelectItem>
                          <SelectItem value="2h">2 Hours</SelectItem>
                          <SelectItem value="3h">3 Hours</SelectItem>
                          <SelectItem value="24h">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Photo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer text-sm text-muted-foreground hover:bg-accent">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span>{fileName || "Choose a file..."}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0] ?? null;
                              field.onChange(f);
                              setFileName(f?.name ?? "");
                            }}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Contest Problems</Label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(true)} disabled={submitting}>
                    Select Problems
                  </Button>
                  <p className="text-sm text-muted-foreground">{selectedProblems.length} problem(s) selected.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      <ContestProblemSelectDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={setSelectedProblems}
        initialSelected={selectedProblems}
      />
    </>
  );
};

export default ContestCreate;
