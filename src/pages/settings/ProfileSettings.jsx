import React, { useState, useEffect } from "react";
import { getUserByUsername } from "../../lib/api"; // adjust path
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { X, Check } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import ProfileSettingsSkeleton from "@/components/settings/ProfileSettingsSkeleton";
import { useForm } from "react-hook-form";

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
  { name: "cyan", class: "bg-cyan-800" }
];

/* ---------------- Main Component ---------------- */
const ProfileSettings = () => {
  // const [user, setUser] = useState(null);
  const user = useSelector(state => state.user?.user?.data)
  
  const [skillInput, setSkillInput] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      username: user?.username,
      bio: user?.bio,
      profileColor: user?.profileColor,
      location: user?.location,
      website: user?.website,
      skills: user?.skills,
      socials: user?.socialLinks
    }
  });


  console.log(user);
  const dispatch = useDispatch();
  

  // ---------------- LOADING STATE ----------------
  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <ProfileSettingsSkeleton />
      </div>
    );
  }

  // ---------------- FORM HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUser((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));

      /* -------- Redux Version (Later) --------
      dispatch(updateUserField({ parent, child, value }));
      ---------------------------------------- */
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));

      /* -------- Redux Version (Later) --------
      dispatch(updateUserField({ name, value }));
      ---------------------------------------- */
    }
  };

  const handleColorSelect = (colorName) => {
    setUser((prev) => ({ ...prev, profileColor: colorName }));
    // Redux: dispatch(updateUserField({ name: "profileColor", value: colorName }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!user.skills.includes(skillInput.trim())) {
        setUser((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()]
        }));
        // Redux: dispatch(addUserSkill(skillInput.trim()));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove)
    }));
    // Redux: dispatch(removeUserSkill(skillToRemove));
  };

  const handleSubmita = (e) => {
    e.preventDefault();
    console.log("Saving user:", user);
    toast.success("Profile Updated", {
      description: "Your changes have been saved successfully."
    });

    /* -------- Redux Version (Later) --------
    dispatch(saveUser(user));
    ---------------------------------------- */
  };

  // ---------------- RENDER ----------------
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Profile</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Public Profile</CardTitle>
            <CardDescription>
              This information will be displayed publicly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Full Name */}
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="md:text-right">
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
                className="md:col-span-3"
              />
            </div>

            {/* Username */}
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="md:text-right">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="md:col-span-3"
              />
            </div>

            {/* Bio */}
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="md:text-right pt-2">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="md:col-span-3"
                rows={3}
              />
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
                      "h-8 w-8 rounded-full border-2 flex items-center justify-center",
                      color.class,
                      user.profileColor === color.name
                        ? "border-ring"
                        : "border-transparent"
                    )}
                    onClick={() => handleColorSelect(color.name)}
                  >
                    {user.profileColor === color.name && (
                      <Check className="h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="md:text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={user.location}
                onChange={handleChange}
                className="md:col-span-3"
              />
            </div>

            {/* Portfolio */}
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="portfolio" className="md:text-right">
                Portfolio URL
              </Label>
              <Input
                id="portfolio"
                name="portfolio"
                value={user.portfolio}
                onChange={handleChange}
                className="md:col-span-3"
              />
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="skills" className="md:text-right pt-2">
                Skills
              </Label>
              <div className="md:col-span-3">
                <Input
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
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
            <h3 className="col-span-4 font-semibold text-lg pb-2">
              Social Links
            </h3>

            {["github", "twitter", "linkedin"].map((platform) => (
              <div
                key={platform}
                className="grid md:grid-cols-4 items-center gap-4"
              >
                <Label
                  htmlFor={`socials.${platform}`}
                  className="md:text-right"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Label>
                <Input
                  id={`socials.${platform}`}
                  name={`socials.${platform}`}
                  value={user.socials?.[platform] || ""}
                  onChange={handleChange}
                  className="md:col-span-3"
                  placeholder={`${platform}-handle`}
                />
              </div>
            ))}
          </CardContent>

          <CardFooter className="border-t pt-6">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ProfileSettings;