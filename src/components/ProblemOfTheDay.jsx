import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame } from "lucide-react";
import { difficultyColors } from "@/utils/constants";
import { Link } from "react-router-dom";

const FALLBACK_CONTENT = {
  title: "Problem of the Day",
  difficulty: "Loading",
  acceptance: "--",
  tags: ["Stay tuned", "New challenge"],
};

export const ProblemOfTheDay = ({ problem }) => {
  const hasProblem = Boolean(problem);
  const display = hasProblem ? problem : FALLBACK_CONTENT;

  const Wrapper = ({ children }) =>
    hasProblem ? (
      <Link to={`/potd`} className="block p-6">
        {children}
      </Link>
    ) : (
      <div className="block p-6 select-none opacity-90" aria-disabled>
        {children}
      </div>
    );

  const difficultyClass = hasProblem
    ? difficultyColors[display.difficulty] || "border border-border text-foreground"
    : "border border-dashed border-border/60 text-muted-foreground";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/30 bg-gradient-to-br from-card to-muted/30">
      <Wrapper>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <Flame className={`h-7 w-7 ${hasProblem ? "text-orange-500" : "text-muted-foreground"}`} />
                <h2 className="text-2xl font-bold font-headline text-foreground">
                  {display.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Badge
                  variant="outline"
                  className={difficultyClass}
                >
                  {display.difficulty}
                </Badge>
                <span className="text-muted-foreground">
                  Acceptance: {display.acceptance}
                </span>
                <div className="hidden md:flex flex-wrap gap-2">
                  {(display.tags ?? []).slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <div
                className={`group/button flex items-center justify-end font-medium transition-all duration-300 ease-in-out h-9 px-0 py-2 ${
                  hasProblem ? "text-primary cursor-pointer" : "text-muted-foreground"
                }`}
              >
                <span className="w-0 opacity-0 group-hover/button:w-28 group-hover/button:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap">
                  {hasProblem ? "Solve Problem" : "Come back soon"}
                </span>
                <ArrowRight
                  className={`h-4 w-4 transition-transform duration-300 ${
                    hasProblem ? "group-hover/button:translate-x-1" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Wrapper>
    </Card>
  );
};
