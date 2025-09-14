import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok)
    return NextResponse.json({ error: "upstream failed" }, { status: 500 });

  const data = await res.json();
  const slim = data
    .slice(0, 20)
    .map((p: { id: number; title: string }) => ({ id: p.id, title: p.title }));
  return NextResponse.json(slim);
}
