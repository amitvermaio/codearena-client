import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  MapPin,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Edit,
  Camera,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "../ui/badge";
import EditProfileDialog from "./EditProfileDialog";
import ImageUpdateDialog from "./ImageUpdateDialog";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

const profileBgColors = {
  default: "bg-muted",
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  pink: "bg-pink-500",
  slate: "bg-slate-800",
  stone: "bg-stone-800",
  indigo: "bg-indigo-800",
  cyan: "bg-cyan-800",
};

const ProfileHeader = ({ user, canEdit = false, onUpdate }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImageUpdateOpen, setIsImageUpdateOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageSave = (url) => {
    const updatedUser = { ...user, profilePic: url };
    onUpdate(updatedUser);
    setIsImageUpdateOpen(false);
  };

  const bgColorClass = user?.profileColor
    ? profileBgColors[user?.profileColor]
    : profileBgColors.default;

  return (
    <>
      {/* Image update modal */}
      {canEdit && (
        <ImageUpdateDialog
          isOpen={isImageUpdateOpen}
          onOpenChange={setIsImageUpdateOpen}
          onSave={handleImageSave}
          aspect={1}
        />
      )}

      {/* Edit profile modal */}
      {canEdit && (
        <EditProfileDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={user}
          onSave={onUpdate}
        />
      )}

      <Card>
        {/* Profile background */}
        <div className={cn("h-24 rounded-t-lg", bgColorClass)} />

        <CardContent className="p-4 sm:p-6 -mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="h-28 w-28 border-4 border-card">
                <AvatarImage src={user.profilePic || user.avatar} />
                <AvatarFallback className="text-3xl font-semibold">
                  {user.fullname?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Camera button only if canEdit */}
              {canEdit && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  onClick={() => setIsImageUpdateOpen(true)}
                >
                  <Camera className="h-6 w-6 text-white" />
                </button>
              )}
            </div>

            {/* Name and username */}
            <div className="mt-4 sm:mt-0 flex-grow">
              <h1 className="text-2xl font-bold font-headline">{user.fullname}</h1>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>

            {/* Action buttons */}
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              {/* Edit button only for auth user */}
              {canEdit && (
                <Button variant="default" onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Bio */}
          {user.bio && <p className="mt-4 text-sm">{user.bio}</p>}

          {/* Location, email, website */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {user.location}
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> {user.email}
              </div>
            )}
            {user.website && (
              <a
                href={
                  user.website.startsWith("http")
                    ? user.website
                    : `https://${user.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <LinkIcon className="h-4 w-4" /> {user.website}
              </a>
            )}
          </div>

          {/* Social links */}
          <div className="mt-4 flex items-center gap-2">
            {user.socialLinks?.github && (
              <Button variant="ghost" size="icon" asChild>
                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {user.socialLinks?.linkedin && (
              <Button variant="ghost" size="icon" asChild>
                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {user.socialLinks?.twitter && (
              <Button variant="ghost" size="icon" asChild>
                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;
