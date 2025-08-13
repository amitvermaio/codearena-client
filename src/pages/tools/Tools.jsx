import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; 
import { ArrowRight, Wand2 } from "lucide-react";
import { Link } from "react-router-dom"; // React Router link use karenge

const tools = [
  {
    title: "AI Code Summarizer",
    description: "Get a concise summary of your code's functionality, highlighting key algorithms and data structures.",
    href: "/tools/summarizer",
    icon: <Wand2 className="h-8 w-8 text-primary" />,
  },
  // Add more tools here
];

const Tools = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Developer Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A suite of AI-powered tools to enhance your productivity and understanding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tools.map((tool) => (
          <Link to={tool.href} key={tool.title} className="block group">
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-2xl leading-[1]">{tool.title}</CardTitle>
                  {tool.icon}
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-primary font-medium">
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Tools;