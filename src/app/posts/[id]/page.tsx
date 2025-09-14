// src/app/posts/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

// Fetch single post
async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { next: { revalidate: 60 } } // ISR
  );

  if (!res.ok) return null;

  return res.json();
}

// Metadata (dynamic <title>)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post!.title}</h1>
      <article className="prose">{post!.body}</article>
    </main>
  );
}
