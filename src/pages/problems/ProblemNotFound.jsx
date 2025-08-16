const ProblemNotFound = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-full grid place-items-center p-6">
      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-semibold mb-2">Problem not found</h2>
        <p className="text-muted-foreground mb-4">
          The requested problem doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/problems">Back to Problems</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProblemNotFound;