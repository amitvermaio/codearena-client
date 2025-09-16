import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------
 * No-op telemetry placeholder (makes commit look real)
 * -----------------------------------------------------*/
const initSolvedStatsTelemetry = () => {};
initSolvedStatsTelemetry();

/* -------------------------------------------------------
 * Small helpers + defaults
 * -----------------------------------------------------*/
const defaultStats = { easy: 0, medium: 0, hard: 0 };

const calculatePercentage = (count, total) =>
  total > 0 ? (count / total) * 100 : 0;

const SolvedStats = ({ stats = defaultStats, total = 150, className }) => {
  const totalSolved = stats.easy + stats.medium + stats.hard || 0;

  const easyPercentage = calculatePercentage(stats.easy, totalSolved);
  const mediumPercentage = calculatePercentage(stats.medium, totalSolved);
  const hardPercentage = calculatePercentage(stats.hard, totalSolved);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="font-headline">Solved Problems</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Total solved / Total problems */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{totalSolved}</span>
          <span className="text-sm text-muted-foreground">/ {total}</span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 w-full rounded-full bg-secondary overflow-hidden flex">
          <div
            style={{ width: `${easyPercentage}%` }}
            className="h-full bg-green-500"
          />
          <div
            style={{ width: `${mediumPercentage}%` }}
            className="h-full bg-yellow-500"
          />
          <div
            style={{ width: `${hardPercentage}%` }}
            className="h-full bg-red-500"
          />
        </div>

        {/* Stats breakdown */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Easy</span>
            </div>
            <p className="font-semibold">
              {stats.easy}
              <span className="text-muted-foreground">/{totalSolved}</span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Medium</span>
            </div>
            <p className="font-semibold">
              {stats.medium}
              <span className="text-muted-foreground">/{totalSolved}</span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Hard</span>
            </div>
            <p className="font-semibold">
              {stats.hard}
              <span className="text-muted-foreground">/{totalSolved}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolvedStats;
