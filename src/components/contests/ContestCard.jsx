// ContestCard: displays contest info (title, date, duration, participants, type) with dynamic action button
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

const ContestCard = ({ contest }) => {
  const startTime = contest?.startTime ? new Date(contest.startTime) : null;

  const isUpcoming = useMemo(() => {
    return startTime ? startTime > new Date() : false;
  }, [startTime]);

  const imageUrl = contest?.imageUrl || "/placeholder-contest.jpg";
  const registeredCount = contest?.registeredCount ?? 0;
  const durationText = contest?.duration || "—";

  const formattedDate = useMemo(() => {
    if (!startTime) return "TBA";
    try {
      return format(startTime, "MMM d, yyyy, h:mm a");
    } catch {
      return "Invalid date";
    }
  }, [startTime]);

  const renderButton = () => (
    <Button className="w-full">
      {isUpcoming ? "View Details" : "Go to Contest"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <img
            src={imageUrl}
            alt={contest?.title || "Contest"}
            className="object-cover rounded-t-lg w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-4 left-4">
            <CardTitle className="font-headline text-xl text-white">
              {contest?.title || "Untitled Contest"}
            </CardTitle>
            <CardDescription className="text-white/80">
              {isUpcoming ? "Starts soon" : "In progress"}
            </CardDescription>
          </div>

          <div className="absolute top-4 right-4">
            <Badge>{contest?.type || "Platform"}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>Duration: {durationText}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>{registeredCount} registered</span>
        </div>
      </CardContent>

      <CardFooter className="p-4">{renderButton()}</CardFooter>
    </Card>
  );
};

export default ContestCard;
