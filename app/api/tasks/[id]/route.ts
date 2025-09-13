import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const taskId = params.id;
    const updates = await request.json();

    // Remove campos que não devem ser atualizados diretamente
    delete updates._id;
    delete updates.userId;
    delete updates.createdAt;

    updates.updatedAt = new Date().toISOString();

    const result = await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
        userId: new ObjectId(session.user.id), // Garante que o usuário só pode atualizar suas próprias tarefas
      },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Tarefa não encontrada ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Tarefa atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao atualizar tarefa." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const taskId = params.id;

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
      userId: new ObjectId(session.user.id), // Garante que o usuário só pode deletar suas próprias tarefas
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Tarefa não encontrada ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa excluída com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao excluir tarefa." },
      { status: 500 }
    );
  }
}
