export const revalidate = 60;

type Post = { id: number; title: string; body: string };

export default async function ISRPage() {
  const regeneratedAt = new Date().toISOString();

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    next: { revalidate },
  });
  if (!res.ok) throw new Error("Failed to fetch (ISR)");
  const post: Post = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">
        ISR (Incremental Static Regeneration)
      </h1>
      <p className="text-sm opacity-70">Regenerated at: {regeneratedAt}</p>
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
