export const dynamic = "force-static";
const builtAt = new Date().toISOString();

type Post = { id: number; title: string; body: string };

export default async function SSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!res.ok) throw new Error("Failed to fetch (SSG)");
  const post: Post = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">SSG (Static Site Generation)</h1>
      <p className="text-sm opacity-70">Built at: {builtAt}</p>
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
