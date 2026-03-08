const Unatuhorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">401</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          You are not authorized for this page
        </p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          go to dashboard
        </a>
      </div>
    </div>
  );
};

export default Unatuhorized;
