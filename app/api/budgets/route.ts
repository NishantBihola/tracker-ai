import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const budgets = await prisma.budget.findMany({
    where: { clerkUserId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { category, limit } = await req.json();

  const budget = await prisma.budget.create({
    data: { clerkUserId: userId, category, limit: parseFloat(limit) },
  });

  return NextResponse.json(budget, { status: 201 });
}
