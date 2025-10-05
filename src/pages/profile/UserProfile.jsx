import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { Card, CardContent } from "../../components/ui/card";
import { Star, Target, Zap, Award } from "lucide-react";
import SolvedStats from "../../components/profile/SolvedStats";
import SubmissionHistory from "../../components/profile/SubmissionHistory";
import ProfilePageSkeleton from "../../components/profile/ProfilePageSkeleton";
import { fetchUserProfile } from "@/store/actions/user/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user?.user?.data);
  const user = useSelector((state) => state.profile?.user);
  const loading = useSelector((state) => state.profile?.loading);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username));
    }
  }, [username, dispatch]);

  if (loading || !user) {
    return <ProfilePageSkeleton />;
  }

  // ✅ Check if this profile belongs to logged-in user
  const isOwnProfile = authUser?._id === user?._id;

  const stats = [
    { label: "Rank", value: `#1432`, icon: <Star className="h-5 w-5" /> },
    { label: "Contests", value: "2", icon: <Target className="h-5 w-5" /> },
    { label: "Streak", value: "2323", icon: <Zap className="h-5 w-5" /> },
    { label: "Badges", value: user?.problemSolved?.length, icon: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ✅ Pass `isOwnProfile` to ProfileHeader so it can show edit button conditionally */}
        <ProfileHeader user={user} canEdit={isOwnProfile} />

        <div className="grid grid-cols-1 gap-6">
          {/* Stats and Solved Stats */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md">{stat.icon}</div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <SolvedStats stats={user.solvedStats} total={user?.totalProblems} />
            <SubmissionHistory submissions={user.submissions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
