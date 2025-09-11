import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const updates = await request.json();

    // Remove o _id do corpo da requisição para não tentar atualizá-lo
    delete updates._id;

    const { db } = await connectToDatabase();

    const result = await db
      .collection("tasks")
      .updateOne(
        { _id: new ObjectId(id), userId: new ObjectId(userId) },
        { $set: { ...updates, updatedAt: new Date().toISOString() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Tarefa não encontrada ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Tarefa atualizada" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar tarefa", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    const result = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Tarefa não encontrada ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Tarefa deletada" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar tarefa", error },
      { status: 500 }
    );
  }
}
