import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getUserIdFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("auth_token")?.value || "";
    if (!token) {
      return null;
    }
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.userId;
  } catch (error) {
    return null;
  }
};
