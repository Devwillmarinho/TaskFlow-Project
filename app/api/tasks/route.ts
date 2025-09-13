import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

// Schema para validação da criação de tarefas
const createTaskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const search = request.nextUrl.searchParams.get("search");

    let query: any = { userId: new ObjectId(session.user.id) };

    // Se houver um termo de busca, usa o índice de texto do MongoDB
    if (search) {
      query.$text = { $search: search };
    }

    const tasks = await db
      .collection("tasks")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar tarefas." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const body = await request.json();

    const validation = createTaskSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Dados inválidos.", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { title, description, priority } = validation.data;

    const newTask = {
      title,
      description,
      priority,
      status: "pending",
      userId: new ObjectId(session.user.id),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("tasks").insertOne(newTask);

    // Retorna a tarefa criada com o _id
    const createdTask = { ...newTask, _id: result.insertedId };

    return NextResponse.json(
      { message: "Tarefa criada com sucesso!", task: createdTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao criar tarefa." },
      { status: 500 }
    );
  }
}
