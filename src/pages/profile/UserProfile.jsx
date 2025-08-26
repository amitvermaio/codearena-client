import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader  from "../../components/profile/ProfileHeader";
import { Card, CardContent } from "../../components/ui/card";
import { Star, Users, CheckCircle } from "lucide-react";
import SolvedStats from "../../components/profile/SolvedStats";
import SubmissionHistory from "../../components/profile/SubmissionHistory";
import ProfilePageSkeleton from "../../components/profile/ProfilePageSkeleton";
import { fetchUserProfile } from "@/store/actions/user/userAction";
import { useDispatch, useSelector } from "react-redux";

// Main Profile Page Component
const UserProfile = () => {
  const user = useSelector(state => state.user?.user?.data);
  
  const {
    username,
    email,
    avatar,
    problemSolved,
    location,
    website,
    skills,
    bio,
    socialLinks,
    profileColor,
    recentSubmissions
  } = user || {};

  // const [user, setUser] = useState({
  //       id: 'user1',
  //       username: 'janedoe',
  //       fullname: 'Jane Doe',
  //       email: 'jane.doe@codearena.io',
  //       profilePic: '',
  //       profileColor: 'blue',
  //       bio: 'Software Engineer at TechCorp | Competitive Programmer | Building cool things with React & Node.js',
  //       location: 'San Francisco, CA',
  //       portfolio: 'janedoe.dev',
  //       skills: ['React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'Docker'],
  //       socials: {
  //           github: 'janedoe',
  //           twitter: 'janedoe_dev',
  //           linkedin: 'https://www.linkedin.com/in/janedoe'
  //       },
  //       problemSolved: 125,
  //       totalProblems: 500,
  //       rank: 1245,
  //       followers: 583,
  //       following: 72,
  //       solvedStats: {
  //         easy: 60,
  //         medium: 55,
  //         hard: 10
  //       },
  //       recentSubmissions: "mockRecentSubmissions",
  //   },
  // );

  // useEffect(() => {
  //   getUserByUsername(username).then((userData) => {
  //     if (userData) setUser(userData);
  //   });
  // }, [username]);

  if (!user) {
    return <ProfilePageSkeleton />;
  }

  const stats = [
    { label: "Rank", value: `#1432`, icon: <Star className="h-4 w-4" /> },
    { label: "Followers", value: "343", icon: <Users className="h-4 w-4" /> },
    { label: "Following", value: "2323", icon: <Users className="h-4 w-4" /> },
    { label: "Solutions", value: problemSolved.length, icon: <CheckCircle className="h-4 w-4" /> },
  ];

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <ProfileHeader user={user} onUpdate={handleProfileUpdate} />

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

            {/* <SolvedStats stats={user.solvedStats} total={user?.totalProblems} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;