"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Shield,
  BarChart3,
  Star,
  Github,
  Play,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  Plus,
  Edit,
  Trash2,
  Download,
  Clock,
  Target,
  Check,
  X,
  Filter,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { DashboardView } from "@/components/views/DashboardView";

interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
}

export default function LandingPage() {
  const [currentView, setCurrentView] = useState<
    "landing" | "login" | "register" | "dashboard"
  >("landing");
  const [user, setUser] = useState<UserInterface | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerErrors, setRegisterErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Erro ao buscar tarefas");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      showToast("Falha ao carregar tarefas.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Verifica a sessão do usuário ao carregar a página
  useEffect(() => {
    const checkUserSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setCurrentView("dashboard");
        }
      } catch (error) {
        // Nenhuma sessão válida, não faz nada
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []); // Array de dependências vazio para rodar apenas uma vez

  useEffect(() => {
    if (currentView === "dashboard") {
      fetchTasks();
    }
  }, [currentView]);

  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pending = tasks.filter((task) => task.status === "pending").length;
    const inProgress = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    setStats({ total, completed, pending, inProgress });
  }, [tasks]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginErrors({});

    const errors: { email?: string; password?: string } = {};
    if (!loginForm.email) errors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email))
      errors.email = "Email inválido";
    if (!loginForm.password) errors.password = "Senha é obrigatória";

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      showToast("Por favor, corrija os erros no formulário", "error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Falha no login.");
      }

      setUser(data.user);
      setCurrentView("dashboard");
      showToast("Login realizado com sucesso! Bem-vindo de volta!", "success");
    } catch (error: any) {
      showToast(error.message || "Ocorreu um erro inesperado.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterErrors({});

    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!registerForm.name) errors.name = "Nome é obrigatório";
    if (!registerForm.email) errors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(registerForm.email))
      errors.email = "Email inválido";
    if (!registerForm.password) errors.password = "Senha é obrigatória";
    else if (registerForm.password.length < 6)
      errors.password = "Senha deve ter pelo menos 6 caracteres";
    if (registerForm.password !== registerForm.confirmPassword)
      errors.confirmPassword = "Senhas não coincidem";

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      showToast("Por favor, corrija os erros no formulário", "error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Falha ao registrar.");
      }

      showToast(
        "Conta criada com sucesso! Agora você pode fazer login.",
        "success"
      );
      setCurrentView("login");
    } catch (error: any) {
      showToast(error.message || "Ocorreu um erro inesperado.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async () => {
    if (!newTask.title.trim()) {
      showToast("Título da tarefa é obrigatório", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Erro ao criar tarefa");

      setNewTask({ title: "", description: "", priority: "medium" });
      showToast("Tarefa criada com sucesso! 🎉", "success");
      fetchTasks(); // Re-fetch tasks to show the new one
    } catch (error) {
      showToast("Falha ao criar tarefa.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Erro ao atualizar tarefa");

      setEditingTask(null);
      showToast("Tarefa atualizada com sucesso!", "success");
      fetchTasks();
    } catch (error) {
      showToast("Falha ao atualizar tarefa.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    setIsLoading(true);
    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      showToast("Tarefa excluída com sucesso", "info");
      fetchTasks();
    } catch (error) {
      showToast("Falha ao excluir tarefa.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tasks-export-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setTasks([]); // Limpa as tarefas do estado
      setCurrentView("landing");
      showToast("Logout realizado com sucesso. Até logo!", "info");
    } catch (error) {
      showToast("Erro ao fazer logout.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const ToastNotification = () => {
    if (!toast) return null;

    const bgColor =
      toast.type === "success"
        ? "bg-green-500"
        : toast.type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

    return (
      <div
        className={`fixed top-4 right-4 z-[100] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-in slide-in-from-right`}
      >
        <p className="font-medium">{toast.message}</p>
      </div>
    );
  };

  const LoadingOverlay = () => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-foreground font-medium">Processando...</span>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <ToastNotification />
        <LoadingOverlay />

        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <Button
                variant="ghost"
                onClick={() => setCurrentView("landing")}
                className="absolute top-4 left-4 p-2 hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  TaskFlow Pro
                </span>
              </div>
              <CardTitle className="text-2xl text-foreground">
                Bem-vindo de volta!
              </CardTitle>
              <p className="text-muted-foreground">
                Entre na sua conta para continuar
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      className={`pl-10 border-2 transition-colors ${
                        loginErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {loginErrors.email && (
                    <p className="text-sm text-red-500">{loginErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className={`pl-10 pr-10 border-2 transition-colors ${
                        loginErrors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-sm text-red-500">
                      {loginErrors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Entrar na Conta
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Button
                    variant="link"
                    onClick={() => setCurrentView("register")}
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    disabled={isLoading}
                  >
                    Criar conta grátis
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <ToastNotification />
        <LoadingOverlay />

        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md border-border/50 shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <Button
                variant="ghost"
                onClick={() => setCurrentView("landing")}
                className="absolute top-4 left-4 p-2 hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  TaskFlow Pro
                </span>
              </div>
              <CardTitle className="text-2xl text-foreground">
                Criar sua conta
              </CardTitle>
              <p className="text-muted-foreground">
                Comece a organizar suas tarefas hoje
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Nome completo
                  </Label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, name: e.target.value })
                    }
                    className={`border-2 transition-colors ${
                      registerErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                  />
                  {registerErrors.name && (
                    <p className="text-sm text-red-500">
                      {registerErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        })
                      }
                      className={`pl-10 border-2 transition-colors ${
                        registerErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {registerErrors.email && (
                    <p className="text-sm text-red-500">
                      {registerErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        })
                      }
                      className={`pl-10 pr-10 border-2 transition-colors ${
                        registerErrors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-sm text-red-500">
                      {registerErrors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`pl-10 pr-10 border-2 transition-colors ${
                        registerErrors.confirmPassword
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerErrors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {registerErrors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Conta Grátis
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Button
                    variant="link"
                    onClick={() => setCurrentView("login")}
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    disabled={isLoading}
                  >
                    Fazer login
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === "dashboard" && user) {
    return (
      <>
        <ToastNotification />
        <LoadingOverlay />
        <DashboardView
          user={user}
          tasks={tasks}
          stats={stats}
          newTask={newTask}
          editingTask={editingTask}
          filter={filter}
          isLoading={isLoading}
          handleLogout={handleLogout}
          setNewTask={setNewTask}
          createTask={createTask}
          setFilter={setFilter}
          exportTasks={exportTasks}
          setEditingTask={setEditingTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </>
    );
  }

  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-xl shadow-lg">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  TaskFlow Pro
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView("login")}
                  className="text-foreground hover:text-primary"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => setCurrentView("register")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Começar Grátis
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              🚀 Projeto Acadêmico NoSQL
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
              Gerencie suas tarefas com
              <span className="text-primary block mt-2">inteligência</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Sistema completo de gerenciamento de tarefas desenvolvido com
              MongoDB, Next.js e tecnologias modernas. Demonstração prática de
              operações CRUD em banco NoSQL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => setCurrentView("register")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Experimentar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted px-8 py-4 text-lg bg-transparent"
              >
                <Github className="mr-2 h-5 w-5" />
                Ver Código
              </Button>
            </div>

            {/* Demo Preview */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-muted px-6 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="ml-4 text-sm text-muted-foreground">
                      TaskFlow Pro Dashboard
                    </span>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-card to-muted">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total
                            </p>
                            <p className="text-3xl font-bold text-foreground">
                              24
                            </p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Concluídas
                            </p>
                            <p className="text-3xl font-bold text-primary">
                              18
                            </p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Em Progresso
                            </p>
                            <p className="text-3xl font-bold text-secondary">
                              6
                            </p>
                          </div>
                          <Zap className="h-8 w-8 text-secondary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Tarefas Recentes
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-foreground">
                          Implementar autenticação de usuários
                        </span>
                        <Badge className="ml-auto bg-primary/10 text-primary">
                          Alta
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50">
                        <div className="h-5 w-5 border-2 border-muted-foreground rounded-full"></div>
                        <span className="text-foreground">
                          Configurar banco MongoDB
                        </span>
                        <Badge className="ml-auto bg-secondary/10 text-secondary">
                          Média
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Recursos Poderosos
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Demonstração completa de tecnologias NoSQL com interface moderna
                e funcionalidades avançadas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">
                    CRUD Completo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Operações completas de Create, Read, Update e Delete com
                    MongoDB. Demonstração prática de banco NoSQL.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit">
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-foreground">
                    Interface Moderna
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Design responsivo com Tailwind CSS, componentes
                    reutilizáveis e experiência de usuário otimizada.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-accent/10 rounded-lg w-fit">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">
                    Autenticação Segura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sistema completo de login e registro com validação e
                    proteção de rotas implementado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-chart-1/10 rounded-lg w-fit">
                    <Users className="h-6 w-6 text-chart-1" />
                  </div>
                  <CardTitle className="text-foreground">
                    Dashboard Interativo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Métricas em tempo real, gráficos dinâmicos e visualização de
                    dados com componentes interativos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-chart-2/10 rounded-lg w-fit">
                    <Star className="h-6 w-6 text-chart-2" />
                  </div>
                  <CardTitle className="text-foreground">
                    Exportação JSON
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Funcionalidade completa de exportação de dados em formato
                    JSON para backup e análise externa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-chart-3/10 rounded-lg w-fit">
                    <Github className="h-6 w-6 text-chart-3" />
                  </div>
                  <CardTitle className="text-foreground">
                    Código Aberto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Projeto acadêmico com código fonte disponível, documentação
                    completa e guias de instalação.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore todas as funcionalidades do sistema e veja como o NoSQL
              pode ser poderoso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setCurrentView("register")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
              >
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCurrentView("login")}
                className="border-border hover:bg-muted px-8 py-4 text-lg"
              >
                Já tenho conta
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary rounded-xl">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                TaskFlow Pro
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Sistema de gerenciamento de tarefas desenvolvido para demonstração
              acadêmica
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Desenvolvido com</span>
              <Badge
                variant="outline"
                className="border-primary/20 text-primary"
              >
                Next.js
              </Badge>
              <span>+</span>
              <Badge
                variant="outline"
                className="border-secondary/20 text-secondary"
              >
                MongoDB
              </Badge>
              <span>+</span>
              <Badge variant="outline" className="border-accent/20 text-accent">
                Tailwind CSS
              </Badge>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}
