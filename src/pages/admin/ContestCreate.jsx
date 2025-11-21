import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ instead of next/router
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
import { Textarea } from "@/components/ui/textarea";
import axios from "@/config/axios.config";

// =============================
// Zod Schema
// =============================
const contestFormSchema = z.object({
  title: z.string().min(5, "Contest name must be at least 5 characters."),
  startTime: z.date(),
  duration: z.string().min(1, "Please select a duration."),
  imageUrl: z.any().optional(),
  description: z.string().optional(),
});


const ContestCreate = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);

  const form = useForm({
    resolver: zodResolver(contestFormSchema),
    defaultValues: {
      title: "",
      startTime: new Date(),
      duration: "1h",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    if (selectedProblems.length === 0) {
      toast.error("Please select at least one problem for the contest.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("startTime", data.startTime.toISOString());
    formData.append("duration", data.duration);
    formData.append("description", data.description || "");

    formData.append("problems", JSON.stringify(selectedProblems));

    if (data.imageUrl) {
      formData.append("coverImage", data.imageUrl); 
    }
    toast.loading("Wait a moment...", { duration: 2000 });
    try {
      const res = await axios.post("/admin/contests", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)}`,
        },
      });
      if (res.status === 201) {
        toast.success("Contest Created Successfully!");
        form.reset();
//        navigate("/admin/contests");
      }
    } catch (error) {
      toast.error("Error creating contest");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-headline">
              Create New Contest
            </h1>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Save Contest</Button>
            </div>
          </div>

          {/* Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contest Details</CardTitle>
              <CardDescription>
                Fill in the information below to create your new contest.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Contest Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Weekly Sprint #25"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contest Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Solve 4 problems in 90 minutes. Difficulty ranges from Easy to Hard."
                        {...field}
                        rows={5}
                        maxLength={200}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Time + Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                {/* Start Time */}
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
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="time"
                          className="w-[120px]"
                          value={format(field.value, "HH:mm")}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":");
                            const newDate = new Date(field.value);
                            newDate.setHours(parseInt(hours), parseInt(minutes));
                            field.onChange(newDate);
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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

              {/* Contest Photo */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Photo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        {/* Styled box acting as file input */}
                        <label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer text-sm text-muted-foreground hover:bg-accent">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span>{field.value ? field.value.name : "Choose a file..."}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => field.onChange(e.target.files?.[0])}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contest Problems */}
              <div className="space-y-2">
                <Label>Contest Problems</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Select Problems
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {selectedProblems.length} problem(s) selected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Problem Select Modal */}
      <ContestProblemSelectDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={setSelectedProblems}
        initialSelected={selectedProblems}
      />
    </>
  );
}

export default ContestCreate;