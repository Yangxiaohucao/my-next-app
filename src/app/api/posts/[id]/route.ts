import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const p = await res.json();
  return NextResponse.json({ id: p.id, title: p.title, body: p.body });
}
