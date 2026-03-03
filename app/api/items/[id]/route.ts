import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const itemId = Number(id);

    if (!id || isNaN(itemId)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    await prisma.item.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const itemId = Number(id);

    if (!id || isNaN(itemId) || !body.name) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    const updated = await prisma.item.update({
      where: { id: itemId },
      data: { name: body.name },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}