import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  await prisma.budget.deleteMany({
    where: { id: params.id, clerkUserId: userId },
  });

  return new NextResponse(null, { status: 204 });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { category, limit } = await req.json();

  const updated = await prisma.budget.updateMany({
    where: { id: params.id, clerkUserId: userId },
    data: { category, limit: parseFloat(limit) },
  });

  return NextResponse.json(updated);
}
