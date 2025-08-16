import { Skeleton } from "@/components/ui/skeleton";

const ProblemDescriptionPanelSkeleton = () => {
  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <Skeleton className="h-10 w-full mb-4" />
      <div className="p-4 bg-card rounded-b-lg border mt-0 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-3 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="mt-6 flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default ProblemDescriptionPanelSkeleton;