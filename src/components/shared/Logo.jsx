import React from 'react';
import { Code } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Code className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-primary font-headline">
        CodeArena
      </h1>
    </div>
  );
};

