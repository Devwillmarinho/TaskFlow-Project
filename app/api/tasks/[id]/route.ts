// c:\Users\willm\Downloads\Nova pasta (2)\todo-nosql-project\app\api\tasks\[id]\route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    // Remova o _id do corpo da requisição para não tentar atualizar a chave primária
    delete updates._id;

    const { db } = await connectToDatabase();
    
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Tarefa não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tarefa atualizada com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar tarefa', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { db } = await connectToDatabase();

    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Tarefa não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tarefa excluída com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir tarefa', error }, { status: 500 });
  }
}
