const ProblemPageSkeleton = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-[calc(100vh-4rem)]"
    >
      <ResizablePanel defaultSize={50} minSize={30}>
        <ProblemDescriptionPanelSkeleton />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="flex flex-col h-full bg-card">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={65} minSize={20}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-2 border-b">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                  </div>
                </div>
                <div className="flex-grow p-2">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35} minSize={15}>
              <div className="p-4">
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default ProblemPageSkeleton;