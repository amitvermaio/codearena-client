import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, ArrowRight, CheckCircle, Award } from "lucide-react";
import { format } from "date-fns";
import ProblemList from "@/components/problems/ProblemList";
import { Skeleton } from "@/components/ui/skeleton";

// ----------------------
// HARD CODED DATA
// ----------------------

const getContestById = async (id) => {
  // Hardcoded contest data for now
  return {
    id: "3",
    slug: "algorithm-royale",
    title: "Algorithm Royale",
    type: "platform",
    startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
    duration: "24 hours",
    registered: false,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  };
};

const getProblems = async () => {
  // Hardcoded problems for now
  return [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: "45%",
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating",
      difficulty: "Medium",
      acceptance: "33%",
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: "29%",
    },
  ];
};

// ---------------------
// Problems List Wrapper
// ---------------------
function ContestProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems().then((p) => setProblems(p.slice(0, 3)));
  }, []);

  return <ProblemList problems={problems} />;
}

// ---------------------
// Skeleton Loader
// ---------------------
function ContestDetailsPageSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Skeleton className="h-64 w-full rounded-lg mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------
// MAIN PAGE
// ---------------------
export default function ContestDetailsPage({ params }) {
  const [contest, setContest] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    getContestById(params?.id).then((data) => {
      if (data) {
        setContest(data);
        setIsRegistered(data.registered);
        setIsLive(new Date() >= data.startTime);
      }
    });
  }, [params?.id]);

  if (!contest) {
    return <ContestDetailsPageSkeleton />;
  }

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">

      {/* Banner */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-8">
        <img
          src={contest.imageUrl}
          alt={contest.title}
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold font-headline">{contest.title}</h1>
          <p className="text-lg text-white/90">
            {isLive
              ? "The arena is open. Good luck!"
              : "Welcome, challenger. The arena awaits."}
          </p>
        </div>

        <div className="absolute top-6 right-6">
          {!isLive &&
            (isRegistered ? (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2 h-4 w-4" /> Registered
              </Button>
            ) : (
              <Button onClick={handleRegister}>
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Section */}
        <div className="lg:col-span-2">
          {isLive ? (
            <Card>
              <CardHeader>
                <CardTitle>Contest Problems</CardTitle>
                <CardDescription>
                  Solve these problems before the time runs out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContestProblemList />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contest Details</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Prepare for a series of challenges designed to test your
                  skills.
                </p>
                <h3 className="font-semibold">Rules</h3>
                <ul>
                  <li>Timed contest.</li>
                  <li>Each problem has a point value.</li>
                  <li>Ranking based on score & last correct submission time.</li>
                  <li>No discussion of solutions.</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Info Card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center text-sm">
                <Award className="mr-3 h-5 w-5" />
                <div>
                  <p className="font-semibold">Status</p>
                  <p>{isLive ? "Live" : "Upcoming"}</p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="mr-3 h-5 w-5" />
                <div>
                  <p className="font-semibold">Start Time</p>
                  <p>{format(contest.startTime, "MMM d, yyyy, h:mm a")}</p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Clock className="mr-3 h-5 w-5" />
                <div>
                  <p className="font-semibold">Duration</p>
                  <p>{contest.duration}</p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Users className="mr-3 h-5 w-5" />
                <div>
                  <p className="font-semibold">Participants</p>
                  <p>2,458 registered</p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
