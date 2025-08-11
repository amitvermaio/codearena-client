import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame } from "lucide-react";

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
  Medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
  Hard: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};

export function ProblemOfTheDay({ problem }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/30 bg-gradient-to-br from-card to-muted/30">
      <a href={`/problems/${problem.id}`} className="block p-6">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="h-7 w-7 text-orange-500" />
                <h2 className="text-2xl font-bold font-headline text-foreground">
                  {problem.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Badge
                  variant="outline"
                  className={difficultyColors[problem.difficulty]}
                >
                  {problem.difficulty}
                </Badge>
                <span className="text-muted-foreground">
                  Acceptance: {problem.acceptance}
                </span>
                <div className="hidden md:flex flex-wrap gap-2">
                  {problem.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <div className="group/button flex items-center justify-end text-primary font-medium transition-all duration-300 ease-in-out cursor-pointer h-9 px-0 py-2">
                <span className="w-0 opacity-0 group-hover/button:w-28 group-hover/button:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap">
                  Solve Problem
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}
