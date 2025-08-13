import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

// Redux imports (uncomment jab Redux setup ho jaye)
// import { useSelector, useDispatch } from "react-redux";

const ContestCard = ({ contest }) => {
  const isUpcoming = new Date(contest.startTime) > new Date();

  const renderButton = () => {
    return (
      // Agar tum React Router use kar rahe ho to <Link> ko wahan se import karo
      <Button className="w-full">
        {isUpcoming ? "View Details" : "Go to Contest"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    );
  };

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
      <CardHeader className="p-0">
        {/* Image replace (Next.js Image → normal img tag) */}
        <div className="relative h-40 w-full">
          <img
            src={contest.imageUrl}
            alt={contest.title}
            className="object-cover rounded-t-lg w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <CardTitle className="font-headline text-xl text-white">{contest.title}</CardTitle>
            <CardDescription className="text-white/80">
              {isUpcoming ? "Starts soon" : "In progress"}
            </CardDescription>
          </div>
          <div className="absolute top-4 right-4">
            <Badge>Platform</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{format(new Date(contest.startTime), "MMM d, yyyy, h:mm a")}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>Duration: {contest.duration}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>{contest.registeredCount || "0"} registered</span>
        </div>
      </CardContent>

      <CardFooter className="p-4">{renderButton()}</CardFooter>
    </Card>
  );
};

export default ContestCard;
