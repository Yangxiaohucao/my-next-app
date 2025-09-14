"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 text-red-600 space-y-4">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="whitespace-pre-wrap">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-3 py-1 rounded bg-red-600 text-white"
      >
        Try again
      </button>
    </div>
  );
}
