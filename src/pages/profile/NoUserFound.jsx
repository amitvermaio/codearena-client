import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NoUserFound = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-[90%] max-w-md text-center p-8">
        <CardContent>
          <AlertCircle className="mx-auto w-14 h-14 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold">No User Found</h2>
          <p className="text-gray-500 mt-2">
            The user you’re looking for doesn’t exist or may have been deleted.
          </p>
          <Button className="mt-5" asChild>
            <Link to="/problems">Go Problems</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoUserFound
