import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { asyncupdateuserprofile } from "@/store/actions/user/userAction";
import ProfileSettingsSkeleton from "@/components/settings/ProfileSettingsSkeleton";
import {
  updateuserfield,
  adduserskill,
  removeuserskill
} from "@/store/features/user/userSlice";


// ✅ FIX: "class" -> "className"
const profileColors = [
  { name: "default", className: "bg-muted" },
  { name: "blue", className: "bg-blue-500" },
  { name: "green", className: "bg-green-500" },
  { name: "purple", className: "bg-purple-500" },
  { name: "red", className: "bg-red-500" },
  { name: "orange", className: "bg-orange-500" },
  { name: "yellow", className: "bg-yellow-500" },
  { name: "pink", className: "bg-pink-500" },
  { name: "slate", className: "bg-slate-800" },
  { name: "stone", className: "bg-stone-800" },
  { name: "indigo", className: "bg-indigo-800" },
  { name: "cyan", className: "bg-cyan-800" }
];

const ProfileSettings = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  // FIX: state undefined issues handled
  const [skillInput, setSkillInput] = useState("");
  const [bgColor, setBgColor] = useState(user?.profileColor || "default");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: user
  });

  useEffect(() => {
    if (user) {
      reset(user);
      setBgColor(user.profileColor || "default");
    }
  }, [user]);


  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <ProfileSettingsSkeleton />
      </div>
    );
  }

  const SubmitHandler = (data) => {
    data.profileColor = bgColor;

    dispatch(asyncupdateuserprofile(data));

    toast.success("Profile Updated", {
      description: "Your changes have been saved successfully."
    });
  };

  const handleColorSelect = (color) => {
    setBgColor(color);
    dispatch(updateuserfield({ name: "profileColor", value: color }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();

      // FIX: no duplicates
      if (!user.skills?.includes(skillInput.trim())) {
        dispatch(adduserskill(skillInput.trim()));
      }

      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    dispatch(removeuserskill(skill));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Profile</h1>

      <form onSubmit={handleSubmit(SubmitHandler)}>
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
              <Input id="fullname" {...register("fullname")} className="md:col-span-3" />
            </div>

            {/* Bio */}
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="md:text-right pt-2">
                Bio
              </Label>
              <Textarea id="bio" rows={3} {...register("bio")} className="md:col-span-3" />
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
                      color.className,
                      bgColor === color.name ? "border-ring" : "border-transparent"
                    )}
                    onClick={() => handleColorSelect(color.name)}
                  >
                    {bgColor === color.name && <Check className="h-5 w-5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="md:text-right">
                Location
              </Label>
              <Input id="location" {...register("location")} className="md:col-span-3" />
            </div>

            {/* Portfolio */}
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="md:text-right">
                Portfolio URL
              </Label>
              <Input id="website" {...register("website")} className="md:col-span-3" />
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
                  {user.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary" className="pr-1">
                      {skill}

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
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

            {["github", "twitter", "linkedin"].map((platform) => (
              <div key={platform} className="grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor={`socialLinks.${platform}`} className="md:text-right">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Label>

                <Input
                  id={`socialLinks.${platform}`}
                  {...register(`socialLinks.${platform}`)}
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
};

export default ProfileSettings;
