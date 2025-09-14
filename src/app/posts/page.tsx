// src/app/posts/page.tsx
import Link from "next/link";

type Post = {
  id: number;
  title: string;
};

export default async function PostsPage() {
  // Fetch posts from API
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Blog Posts (from API)</h1>
      <ul className="list-disc pl-6 space-y-2">
        {posts.slice(0, 10).map(
          (
            p // only show first 10
          ) => (
            <li key={p.id}>
              <Link className="underline" href={`/posts/${p.id}`}>
                {p.title}
              </Link>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
