// c:\Users\willm\Downloads\Nova pasta (2)\todo-nosql-project\app\api\tasks\route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const tasks = await db
      .collection("tasks")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar tarefas", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const task = await request.json();
    const { db } = await connectToDatabase();

    const newTask = {
      ...task,
      userId: new ObjectId(userId),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("tasks").insertOne(newTask);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar tarefa", error },
      { status: 500 }
    );
  }
}
