import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

// rafce style component
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center p-6">
      <Card className="w-full max-w-xl border-muted shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full p-4 ring-4 ring-muted/50">
              <FileQuestion className="h-14 w-14" aria-hidden="true" />
            </div>
          </div>
          <CardTitle className="text-3xl font-semibold tracking-tight">404 — Page not found</CardTitle>
          <p className="text-sm text-muted-foreground">
            The page you’re looking for doesn’t exist, was moved, or the URL is incorrect.
          </p>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
            <AvatarFallback>OOPS</AvatarFallback>
          </Avatar>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>

          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">Error code: 404</p>
    </div>
  );
};

export default NotFound;
