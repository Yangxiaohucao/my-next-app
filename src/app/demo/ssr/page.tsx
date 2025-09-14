export const dynamic = "force-dynamic";

type Post = { id: number; title: string; body: string };

export default async function SSRPage() {
  const renderedAt = new Date().toISOString();

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch (SSR)");
  const post: Post = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">SSR (Server-Side Rendering)</h1>
      <p className="text-sm opacity-70">Rendered at: {renderedAt}</p>
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
