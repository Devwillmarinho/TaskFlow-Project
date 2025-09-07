// c:\Users\willm\Downloads\Nova pasta (2)\todo-nosql-project\app\api\tasks\route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const tasks = await db.collection('tasks').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar tarefas', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const task = await request.json();
    const { db } = await connectToDatabase();
    
    const newTask = {
      ...task,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('tasks').insertOne(newTask);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao criar tarefa', error }, { status: 500 });
  }
}
