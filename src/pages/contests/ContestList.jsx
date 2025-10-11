import React, { useEffect, useState, useMemo } from "react";
import { getContests } from "../../lib/api";
import ContestCard from "../../components/contests/ContestCard";

const ContestList = () => {
  const [platformContests, setPlatformContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "CodeArena Contests — Compete with the Best";
  }, []);

  useEffect(() => {
    const fetchContestsData = async () => {
      try {
        const allContests = await getContests();
        const platformOnly = Array.isArray(allContests)
          ? allContests.filter((c) => c.type === "platform")
          : [];
        setPlatformContests(platformOnly);
      } finally {
        setLoading(false);
      }
    };

    fetchContestsData();
  }, []);

  const visibleContests = useMemo(() => platformContests || [], [platformContests]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
            Platform Contests
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Put your skills to the test in our official weekly and monthly competitions.
            Compete, learn, and win exciting prizes.
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Loading contests...</p>
        )}

        {!loading && visibleContests.length === 0 && (
          <p className="text-center text-muted-foreground">No contests available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            visibleContests.map((contest) => {
              const key = contest.id ?? contest._id ?? contest.title ?? Math.random().toString(36).slice(2);
              return <ContestCard key={key} contest={contest} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ContestList;
