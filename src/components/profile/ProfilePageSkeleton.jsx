import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

const ProfilePageSkeleton = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header Skeleton */}
        <Card>
          <Skeleton className="h-24 w-full rounded-t-lg" />
          <CardContent className="p-4 sm:p-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
              <Skeleton className="h-28 w-28 rounded-full border-4 border-card" />
              <div className="mt-4 sm:mt-0 flex-grow space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="mt-4 sm:mt-0 flex gap-2">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="mt-4 flex gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-40" />
            </div>
          </CardContent>
        </Card>

        {/* Submission History Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Side Stats Skeleton */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-10" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-1/2 mb-2" />
                <Skeleton className="h-2 w-full mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageSkeleton