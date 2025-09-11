import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const { db } = await connectToDatabase();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Verificar se o usuário já existe
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Este e-mail já está em uso." }, { status: 409 });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Usuário criado com sucesso!", userId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao criar usuário.", error }, { status: 500 });
  }
}

