# Sistema de Tarefas NoSQL - Projeto Acadêmico - TaskFlow

Este é um projeto acadêmico que demonstra o uso de banco de dados NoSQL (MongoDB) com operações CRUD completas, desenvolvido com Next.js e TypeScript.

## 📋 Sobre o Projeto

Sistema completo de gerenciamento de tarefas que atende aos requisitos do projeto acadêmico:

- ✅ **CRUD Completo**: Create, Read, Update, Delete
- ✅ **Banco NoSQL**: MongoDB com modelagem de documentos
- ✅ **Interface Responsiva**: React com Tailwind CSS
- ✅ **Requisições Assíncronas**: Fetch API para comunicação
- ✅ **Exportação JSON**: Download dos dados
- ✅ **Dashboard de Métricas**: Estatísticas em tempo real
- ✅ **Filtros e Busca**: Organização das tarefas

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Banco de Dados**: MongoDB
- **Estilização**: Tailwind CSS, shadcn/ui
- **Ícones**: Lucide React

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (recomendado)

## 🚀 Como Abrir e Executar o Projeto

### 1. Preparar o Ambiente

\`\`\`bash

# Clonar ou baixar o projeto

# Se baixou o ZIP, extraia em uma pasta

# Abrir no VS Code

code TaskFlow-project
\`\`\`

### 2. Instalar Dependências

\`\`\`bash

# No terminal do VS Code (Ctrl + `)

npm install
\`\`\`

### 3. Configurar Banco de Dados

#### Opção A: MongoDB Local

\`\`\`bash

# Instalar MongoDB Community Edition

# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# macOS: brew install mongodb-community

# Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

# Iniciar MongoDB

mongod
\`\`\`

#### Opção B: MongoDB Atlas (Nuvem - Recomendado)

1. Criar conta em [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Criar cluster gratuito
3. Obter string de conexão

### 4. Configurar Variáveis de Ambiente

\`\`\`bash

# Copiar arquivo de exemplo

cp .env.example .env.local

# Editar .env.local e adicionar as seguintes variáveis:

MONGODB_URI="sua_string_de_conexao_aqui"
JWT_SECRET="gere_uma_chave_secreta_aqui"

# Para gerar uma chave secreta segura, você pode usar este comando no terminal:

# openssl rand -hex 32

\`\`\`

### 5. Configurar Banco de Dados

\`\`\`bash

# Executar script de configuração

npm run setup
\`\`\`

### 6. Executar o Projeto

\`\`\`bash

# Iniciar servidor de desenvolvimento

npm run dev
\`\`\`

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🔧 Extensões Recomendadas para VS Code

Instale estas extensões para melhor experiência:

1. **ES7+ React/Redux/React-Native snippets**
2. **TypeScript Importer**
3. **Tailwind CSS IntelliSense**
4. **MongoDB for VS Code**
5. **Prettier - Code formatter**
6. **Auto Rename Tag**

## 📊 Funcionalidades Implementadas

### CRUD Completo

- **Create**: Criar novas tarefas com título, descrição e prioridade
- **Read**: Listar e visualizar tarefas com filtros
- **Update**: Editar tarefas existentes (título, descrição, status, prioridade)
- **Delete**: Remover tarefas

### Modelagem NoSQL

- **Documentos MongoDB**: Estrutura flexível para tarefas
- **Índices**: Otimização para consultas por data, status e prioridade
- **Timestamps**: Controle de criação e atualização

### Interface e UX

- **Dashboard**: Métricas em tempo real
- **Filtros**: Por status (todas, pendentes, em progresso, concluídas)
- **Responsivo**: Funciona em desktop e mobile
- **Feedback Visual**: Loading states e confirmações

### Exportação de Dados

- **JSON Export**: Download completo dos dados
- **Formato Estruturado**: Dados organizados para análise

## 🎯 Justificativa da Modelagem NoSQL

### Por que MongoDB?

1. **Flexibilidade**: Estrutura de documentos permite evolução do schema
2. **Performance**: Consultas rápidas com índices apropriados
3. **Escalabilidade**: Horizontal scaling para crescimento futuro
4. **JSON Nativo**: Integração natural com JavaScript/Node.js

### Estrutura do Documento

\`\`\`javascript
{
\_id: ObjectId,
title: String,
description: String,
status: "pending" | "in-progress" | "completed",
priority: "low" | "medium" | "high",
createdAt: ISOString,
updatedAt: ISOString
}
\`\`\`

## 🚀 Deploy (Opcional)

### Vercel + MongoDB Atlas

1. Fazer push para GitHub
2. Conectar repositório no Vercel
3. Adicionar variável `MONGODB_URI` no Vercel
4. Deploy automático

## 📝 Comandos Úteis

\`\`\`bash

# Desenvolvimento

npm run dev # Iniciar servidor de desenvolvimento
npm run build # Build para produção
npm run start # Iniciar servidor de produção
npm run lint # Verificar código

# Banco de dados

npm run setup # Configurar banco e dados iniciais
\`\`\`

## 🐛 Solução de Problemas

### Erro de Conexão MongoDB

- Verificar se MongoDB está rodando
- Conferir string de conexão no `.env.local`
- Para Atlas: verificar IP whitelist

### Porta 3000 em uso

\`\`\`bash

# Usar porta diferente

npm run dev -- -p 3001
\`\`\`

### Problemas de Dependências

\`\`\`bash

# Limpar e reinstalar

rm -rf node_modules package-lock.json
npm install
\`\`\`

## 📚 Recursos de Aprendizado

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como parte do curso de banco de dados NoSQL, demonstrando:

- Modelagem de dados em documentos
- Operações CRUD completas
- Integração frontend/backend
- Boas práticas de desenvolvimento
- Interface moderna e responsiva

---

**Projeto Acadêmico - Sistema de Tarefas NoSQL**  
Desenvolvido por DevWill usando MongoDB, Next.js e TypeScript
