import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.item.create({
      data: { name: body.name },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Create failed" },
      { status: 500 }
    );
  }
}