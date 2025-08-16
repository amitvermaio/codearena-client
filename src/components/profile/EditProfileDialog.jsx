import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import axios from "axios";

const profileColors = [
  { name: "default", class: "bg-muted" },
  { name: "blue", class: "bg-blue-500" },
  { name: "green", class: "bg-green-500" },
  { name: "purple", class: "bg-purple-500" },
  { name: "red", class: "bg-red-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "yellow", class: "bg-yellow-500" },
  { name: "pink", class: "bg-pink-500" },
  { name: "slate", class: "bg-slate-800" },
  { name: "stone", class: "bg-stone-800" },
  { name: "indigo", class: "bg-indigo-800" },
  { name: "cyan", class: "bg-cyan-800" },
];

const EditProfileDialog = ({ user, children, open, onOpenChange, onUpdate }) => {
  const [skills, setSkills] = useState(user.skills || []);
  const [skillInput, setSkillInput] = useState("");

  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      bio: "",
      profileColor: "default",
      location: "",
      portfolio: "",
      socials: {
        github: "",
        twitter: "",
        linkedin: "",
      },
    },
  });

  // Sync form with user data
  useEffect(() => {
    reset(user);
    setSkills(user.skills || []);
  }, [user, open, reset]);

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills((prev) => [...prev, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleColorSelect = (colorName) => {
    setValue("profileColor", colorName);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const updatedUser = { ...data, skills };
      // const res = await axios.put("/api/user/update", updatedUser); // API endpoint change if needed
      // onUpdate(res.data);
      toast.success("Profile Updated", {
        description: "Your changes have been saved successfully.",
        ok: `${console.log("chala")}`
      });
      onOpenChange?.(false);
    } catch (err) {
      toast.error("Update failed", { description: err.message });
    }
  };

  const selectedColor = watch("profileColor");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-6">
            <div className="space-y-6 py-4">
              {/* Fullname */}
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="md:text-right">Full Name</Label>
                <Input id="fullname" {...register("fullname")} className="md:col-span-3" />
              </div>

              {/* Username */}
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="md:text-right">Username</Label>
                <Input id="username" {...register("username")} className="md:col-span-3" />
              </div>

              {/* Email */}
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="md:text-right">Email</Label>
                <Input id="email" type="email" {...register("email")} className="md:col-span-3" />
              </div>

              {/* Bio */}
              <div className="grid md:grid-cols-4 items-start gap-4">
                <Label htmlFor="bio" className="md:text-right pt-2">Bio</Label>
                <Textarea id="bio" {...register("bio")} className="md:col-span-3" rows={3} />
              </div>

              {/* Profile Color */}
              <div className="grid md:grid-cols-4 items-start gap-4">
                <Label className="md:text-right pt-2">Profile Color</Label>
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  {profileColors.map((color) => (
                    <button
                      type="button"
                      key={color.name}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 flex justify-center items-center",
                        color.class,
                        selectedColor === color.name ? "border-primary" : "border-transparent"
                      )}
                      onClick={() => handleColorSelect(color.name)}
                    >
                      {selectedColor === color.name && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="md:text-right">Location</Label>
                <Input id="location" {...register("location")} className="md:col-span-3" />
              </div>

              {/* Portfolio */}
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="portfolio" className="md:text-right">Portfolio URL</Label>
                <Input id="portfolio" {...register("portfolio")} className="md:col-span-3" />
              </div>

              {/* Skills */}
              <div className="grid md:grid-cols-4 items-start gap-4">
                <Label htmlFor="skills" className="md:text-right pt-2">Skills</Label>
                <div className="md:col-span-3">
                  <Input
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Type a skill and press Enter"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="pr-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 rounded-full p-0.5 hover:bg-destructive/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Social Links */}
              <h3 className="col-span-4 font-semibold text-lg pb-2">Social Links</h3>
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="socials.github" className="md:text-right">GitHub</Label>
                <Input id="socials.github" {...register("socials.github")} className="md:col-span-3" placeholder="github-username" />
              </div>
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="socials.twitter" className="md:text-right">Twitter</Label>
                <Input id="socials.twitter" {...register("socials.twitter")} className="md:col-span-3" placeholder="twitter-handle" />
              </div>
              <div className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="socials.linkedin" className="md:text-right">LinkedIn</Label>
                <Input id="socials.linkedin" {...register("socials.linkedin")} className="md:col-span-3" placeholder="linkedin-profile-url" />
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <DialogFooter className="mt-4 pt-4 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;