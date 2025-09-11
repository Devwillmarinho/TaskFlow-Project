import type { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  CheckCircle,
  Zap,
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

interface DashboardViewProps {
  user: UserInterface;
  tasks: Task[];
  stats: Stats;
  newTask: { title: string; description: string; priority: string };
  editingTask: Task | null;
  filter: string;
  isLoading: boolean;
  handleLogout: () => void;
  setNewTask: (task: any) => void;
  createTask: () => void;
  setFilter: (filter: string) => void;
  exportTasks: () => void;
  setEditingTask: (task: Task | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const DashboardView: FC<DashboardViewProps> = ({
  user,
  tasks,
  stats,
  newTask,
  editingTask,
  filter,
  isLoading,
  handleLogout,
  setNewTask,
  createTask,
  setFilter,
  exportTasks,
  setEditingTask,
  updateTask,
  deleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl shadow-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                TaskFlow Pro
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Olá, {user.name}</span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-border hover:bg-muted bg-transparent"
                disabled={isLoading}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Dashboard Interativo
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema completo de gerenciamento de tarefas com MongoDB -
            Demonstração CRUD
          </p>
          <Badge className="mt-2 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            Projeto Acadêmico NoSQL
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 shadow-lg bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Total de Tarefas
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.total}
                  </p>
                  <p className="text-xs text-primary mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Todas as atividades
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Concluídas
                  </p>
                  <p className="text-3xl font-bold text-chart-1">
                    {stats.completed}
                  </p>
                  <p className="text-xs text-chart-1 mt-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Missão cumprida!
                  </p>
                </div>
                <div className="p-3 bg-chart-1/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Em Progresso
                  </p>
                  <p className="text-3xl font-bold text-secondary">
                    {stats.inProgress}
                  </p>
                  <p className="text-xs text-secondary mt-1 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Foco total!
                  </p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Zap className="h-6 w-6 text-secondary animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg bg-gradient-to-br from-card to-card/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Pendentes
                  </p>
                  <p className="text-3xl font-bold text-muted-foreground">
                    {stats.pending}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Aguardando ação
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-full">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Task Form */}
          <Card className="lg:col-span-1 border-border/50 shadow-xl bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                  <Plus className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-foreground">Nova Tarefa</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Crie algo incrível hoje!
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Título
                </Label>
                <Input
                  placeholder="Ex: Finalizar relatório do projeto..."
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="border-2 border-border focus:border-primary transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Descrição
                </Label>
                <Textarea
                  placeholder="Adicione detalhes importantes aqui..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="border-2 border-border focus:border-primary transition-colors min-h-[80px]"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Prioridade
                </Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, priority: value })
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="border-2 border-border focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa - Sem pressa</SelectItem>
                    <SelectItem value="medium">Média - Importante</SelectItem>
                    <SelectItem value="high">Alta - Urgente!</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={createTask}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading || !newTask.title.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Criando...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Tarefa
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Tasks List */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-xl bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Target className="h-6 w-6 text-primary" />
                      <span className="text-foreground">Minhas Tarefas</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Organize sua produtividade
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Select
                      value={filter}
                      onValueChange={setFilter}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-44 border-2 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Todas as tarefas
                          </div>
                        </SelectItem>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Pendentes
                          </div>
                        </SelectItem>
                        <SelectItem value="in-progress">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Em progresso
                          </div>
                        </SelectItem>
                        <SelectItem value="completed">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Concluídas
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={exportTasks}
                      variant="outline"
                      className="border-2 border-border hover:bg-muted bg-transparent"
                      disabled={isLoading}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar JSON
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                        <Target className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-lg">
                        Nenhuma tarefa encontrada
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {filter === "all"
                          ? "Crie sua primeira tarefa!"
                          : "Tente outro filtro"}
                      </p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <Card
                        key={task._id}
                        className="border-border/50 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <CardContent className="p-4">
                          {editingTask?._id === task._id ? (
                            <div className="space-y-4">
                              <Input
                                value={editingTask.title}
                                onChange={(e) =>
                                  setEditingTask({
                                    ...editingTask,
                                    title: e.target.value,
                                  })
                                }
                                className="border-2 border-border focus:border-primary"
                                disabled={isLoading}
                              />
                              <Textarea
                                value={editingTask.description}
                                onChange={(e) =>
                                  setEditingTask({
                                    ...editingTask,
                                    description: e.target.value,
                                  })
                                }
                                className="border-2 border-border focus:border-primary"
                                disabled={isLoading}
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    updateTask(task._id, editingTask)
                                  }
                                  className="bg-primary hover:bg-primary/90"
                                  disabled={isLoading}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Salvar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingTask(null)}
                                  disabled={isLoading}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-foreground">
                                    {task.title}
                                  </h3>
                                  <Badge
                                    className={`${
                                      task.priority === "high"
                                        ? "bg-red-100 text-red-800 border-red-200"
                                        : task.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        : "bg-green-100 text-green-800 border-green-200"
                                    }`}
                                  >
                                    {task.priority === "high"
                                      ? "Alta"
                                      : task.priority === "medium"
                                      ? "Média"
                                      : "Baixa"}
                                  </Badge>
                                  <Badge
                                    className={`${
                                      task.status === "completed"
                                        ? "bg-chart-1/10 text-chart-1 border-chart-1/20"
                                        : task.status === "in-progress"
                                        ? "bg-secondary/10 text-secondary border-secondary/20"
                                        : "bg-muted text-muted-foreground border-border"
                                    }`}
                                  >
                                    {task.status === "completed"
                                      ? "Concluída"
                                      : task.status === "in-progress"
                                      ? "Em progresso"
                                      : "Pendente"}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground text-sm mb-3">
                                  {task.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Criada:{" "}
                                    {new Date(
                                      task.createdAt
                                    ).toLocaleDateString("pt-BR")}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    Atualizada:{" "}
                                    {new Date(
                                      task.updatedAt
                                    ).toLocaleDateString("pt-BR")}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Select
                                  value={task.status}
                                  onValueChange={(value) =>
                                    updateTask(task._id, {
                                      status: value as Task["status"],
                                    })
                                  }
                                  disabled={isLoading}
                                >
                                  <SelectTrigger className="w-32 h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pendente
                                    </SelectItem>
                                    <SelectItem value="in-progress">
                                      Em progresso
                                    </SelectItem>
                                    <SelectItem value="completed">
                                      Concluída
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingTask(task)}
                                  className="h-8 w-8 p-0"
                                  disabled={isLoading}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => deleteTask(task._id)}
                                  className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-3 w-3 text-red-600" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
