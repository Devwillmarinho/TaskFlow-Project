import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const { db } = await connectToDatabase();

    // Validação
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário
    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      emailVerified: null, // next-auth usa isso
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao registrar usuário.", error },
      { status: 500 }
    );
  }
}
