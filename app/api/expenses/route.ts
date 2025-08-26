// app/api/expenses/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const items = await prisma.expense.findMany({
    where: { clerkUserId: userId },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(items.map(i => ({ ...i, amount: Number(i.amount) })));
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { date, description, category, amount } = await req.json();
  const created = await prisma.expense.create({
    data: {
      clerkUserId: userId,
      date: new Date(date),
      description,
      category,
      amount: parseFloat(amount),
    },
  });

  return NextResponse.json({ ...created, amount: Number(created.amount) }, { status: 201 });
}
