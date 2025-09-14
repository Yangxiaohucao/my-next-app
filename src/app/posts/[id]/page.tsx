import { notFound } from "next/navigation";

type Props = { params: { id: string }; searchParams: { tab?: string } };

export default async function PostPage({ params, searchParams }: Props) {
  const tab = searchParams.tab ?? "content";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/posts/${params.id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) notFound();
  const post = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <nav className="flex gap-3">
        <a
          className={tab === "content" ? "underline" : ""}
          href={`?tab=content`}
        >
          Content
        </a>
        <a className={tab === "meta" ? "underline" : ""} href={`?tab=meta`}>
          Meta
        </a>
      </nav>

      {tab === "content" ? (
        <article className="prose">{post.body}</article>
      ) : (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
          {JSON.stringify(post, null, 2)}
        </pre>
      )}
    </main>
  );
}
