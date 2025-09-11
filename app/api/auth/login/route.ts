import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { db } = await connectToDatabase();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { message: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    // Encontrar usuário
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    // Comparar senhas
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    // Remover a senha do objeto de usuário retornado
    const { password: _, ...userWithoutPassword } = user;

    // Criar o Token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    // Serializar o cookie
    const cookie = serialize("auth_token", token, {
      httpOnly: true, // O cookie não pode ser acessado via JavaScript
      secure: process.env.NODE_ENV !== "development", // Usar https em produção
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hora em segundos
      path: "/",
    });

    const response = NextResponse.json(
      { message: "Login bem-sucedido!", user: userWithoutPassword },
      { status: 200 }
    );

    // Definir o cookie no header da resposta
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao fazer login.", error },
      { status: 500 }
    );
  }
}

