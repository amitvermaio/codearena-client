import React, { useEffect, useState } from "react";
import { getContests } from "../../lib/api"; 
import ContestCard from "../../components/contests/ContestCard";

const ContestList = () => {
  const [platformContests, setPlatformContests] = useState([]);
  useEffect(() => {
    document.title = "CodeArena Contests — Compete with the Best"
  }, []);


  useEffect(() => {
    const fetchContestsData = async () => {
      try {
        const allContests = await getContests();
        const platformOnly = allContests.filter(c => c.type === "platform");
        setPlatformContests(platformOnly);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContestsData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Platform Contests Section */}
      <div className="mb-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
            Platform Contests
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Put your skills to the test in our official weekly and monthly competitions. Compete, learn, and win exciting prizes.
          </p>
        </div>

        {/* Loader (Redux version) */}
        {/* {loading && <p className="text-center text-muted-foreground">Loading contests...</p>} */}

        {/* Error (Redux version) */}
        {/* {error && <p className="text-center text-red-500">{error}</p>} */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestList;
