import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SolvedStats = ({ stats, total, className }) => {
  if (!stats) stats = { easy: 0, medium: 0, hard: 0 };
  if (!total) total = 150;
  const totalSolved = stats?.easy + stats?.medium + stats?.hard || 0;

  const easyPercentage =
    totalSolved > 0 ? (stats.easy / totalSolved) * 100 : 0;
  const mediumPercentage =
    totalSolved > 0 ? (stats.medium / totalSolved) * 100 : 0;
  const hardPercentage =
    totalSolved > 0 ? (stats.hard / totalSolved) * 100 : 0;

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
              {stats?.easy}{" "}
              <span className="text-muted-foreground">/{totalSolved}</span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Medium</span>
            </div>
            <p className="font-semibold">
              {stats?.medium}{" "}
              <span className="text-muted-foreground">/{totalSolved}</span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Hard</span>
            </div>
            <p className="font-semibold">
              {stats?.hard}{" "}
              <span className="text-muted-foreground">/{totalSolved}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SolvedStats;