const { MongoClient, ObjectId } = require("mongodb");

// Carrega as variáveis de ambiente do arquivo .env.local
require("dotenv").config({ path: ".env.local" });

async function setupDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Conectado ao MongoDB");

    const db = client.db("todo-nosql-project");

    // --- Coleção de Tarefas (tasks) ---
    const collections = await db.listCollections().toArray();
    const tasksCollectionExists = collections.some(
      (col) => col.name === "tasks"
    );

    if (!tasksCollectionExists) {
      await db.createCollection("tasks");
      console.log('✅ Coleção "tasks" criada.');
    }

    // --- Coleção de Usuários (users) ---
    const usersCollectionExists = collections.some(
      (col) => col.name === "users"
    );
    if (!usersCollectionExists) {
      await db.createCollection("users");
      console.log('✅ Coleção "users" criada.');
    }

    // --- Criação de Índices ---
    console.log("⏳ Criando índices...");
    // Índices para a coleção de tarefas
    await db.collection("tasks").createIndex({ createdAt: -1 });
    await db.collection("tasks").createIndex({ status: 1 });
    await db.collection("tasks").createIndex({ priority: 1 });
    await db.collection("tasks").createIndex({ userId: 1 });
    // Índice de texto para busca (pontos extras!)
    await db
      .collection("tasks")
      .createIndex({ title: "text", description: "text" });
    console.log("✅ Índices da coleção 'tasks' criados.");

    // Índice único para o email na coleção de usuários
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log("✅ Índices da coleção 'users' criados.");

    // Inserir dados de exemplo
    const sampleUserId = new ObjectId(); // ID de usuário de exemplo
    const sampleTasks = [
      {
        title: "Configurar ambiente de desenvolvimento",
        description: "Instalar Node.js, MongoDB e configurar o projeto",
        status: "completed",
        priority: "high",
        userId: sampleUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "Implementar CRUD de tarefas",
        description: "Criar operações de Create, Read, Update e Delete",
        status: "in-progress",
        priority: "high",
        userId: sampleUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "Criar interface do usuário",
        description: "Desenvolver interface responsiva com React",
        status: "pending",
        priority: "medium",
        userId: sampleUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "Implementar exportação JSON",
        description: "Adicionar funcionalidade para exportar dados",
        status: "pending",
        priority: "low",
        userId: sampleUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const existingTasks = await db.collection("tasks").countDocuments();
    if (existingTasks === 0) {
      await db.collection("tasks").insertMany(sampleTasks);
      console.log("✅ Dados de exemplo inseridos na coleção 'tasks'.");
    }

    console.log("🎉 Banco de dados configurado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao configurar banco de dados:", error);
  } finally {
    await client.close();
  }
}

setupDatabase();
