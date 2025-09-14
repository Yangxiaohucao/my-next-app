import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!res.ok)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const p = await res.json();
  return NextResponse.json({ id: p.id, title: p.title, body: p.body });
}
