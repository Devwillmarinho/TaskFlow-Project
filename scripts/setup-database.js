const { MongoClient } = require("mongodb")

async function setupDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("✅ Conectado ao MongoDB")

    const db = client.db("todo-nosql-project")

    // Criar coleção de tarefas se não existir
    const collections = await db.listCollections().toArray()
    const tasksCollectionExists = collections.some((col) => col.name === "tasks")

    if (!tasksCollectionExists) {
      await db.createCollection("tasks")
      console.log('✅ Coleção "tasks" criada')
    }

    // Criar índices para melhor performance
    await db.collection("tasks").createIndex({ createdAt: -1 })
    await db.collection("tasks").createIndex({ status: 1 })
    await db.collection("tasks").createIndex({ priority: 1 })
    console.log("✅ Índices criados")

    // Inserir dados de exemplo
    const sampleTasks = [
      {
        title: "Configurar ambiente de desenvolvimento",
        description: "Instalar Node.js, MongoDB e configurar o projeto",
        status: "completed",
        priority: "high",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "Implementar CRUD de tarefas",
        description: "Criar operações de Create, Read, Update e Delete",
        status: "in-progress",
        priority: "high",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "Criar interface do usuário",
        description: "Desenvolver interface responsiva com React",
        status: "pending",
        priority: "medium",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "Implementar exportação JSON",
        description: "Adicionar funcionalidade para exportar dados",
        status: "pending",
        priority: "low",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    const existingTasks = await db.collection("tasks").countDocuments()
    if (existingTasks === 0) {
      await db.collection("tasks").insertMany(sampleTasks)
      console.log("✅ Dados de exemplo inseridos")
    }

    console.log("🎉 Banco de dados configurado com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao configurar banco de dados:", error)
  } finally {
    await client.close()
  }
}

setupDatabase()
