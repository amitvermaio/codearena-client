import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Search, ArrowLeft } from "lucide-react";

const ProblemNotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
              <AlertCircle className="w-12 h-12 text-muted-foreground/60" />
            </div>
            <Search className="absolute -bottom-2 -right-2 w-8 h-8 text-muted-foreground/40 bg-background rounded-full p-1.5 border-2 border-background" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Problem Not Found</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            The problem you're looking for doesn't exist or may have been removed.
          </p>
        </div>

        {/* Additional Info */}
        <div className="bg-muted/20 border border-muted/30 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            What might have happened?
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• The problem ID may be incorrect</li>
            <li>• The problem might have been archived</li>
            <li>• You may not have permission to access it</li>
            <li>• The link you followed might be outdated</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/problems" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse All Problems
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to={navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Previous
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProblemNotFound;