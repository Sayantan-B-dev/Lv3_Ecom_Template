"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div className="error-state" role="alert">
        <h1>Something went wrong</h1>
        <p>{error.message || "An unexpected demo error occurred."}</p>
        <button type="button" className="btn btn-primary" onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
