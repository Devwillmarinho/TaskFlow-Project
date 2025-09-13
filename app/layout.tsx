import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskFlow Pro",
  description: "Gerenciador de Tarefas com NoSQL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
