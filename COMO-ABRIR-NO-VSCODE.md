# 🚀 Como Abrir Este Projeto no VS Code - Guia Completo

Este guia te ajudará a abrir e executar o projeto do zero no VS Code.

## 📋 Pré-requisitos (Instalar Primeiro)

### 1. Node.js
- Baixe em: https://nodejs.org/
- Escolha a versão LTS (recomendada)
- Instale seguindo o assistente
- Teste no terminal: `node --version`

### 2. VS Code
- Baixe em: https://code.visualstudio.com/
- Instale seguindo o assistente
- Abra o VS Code

### 3. Git (Opcional, mas recomendado)
- Baixe em: https://git-scm.com/
- Instale seguindo o assistente

## 🗂️ Obtendo o Projeto

### Opção 1: Download ZIP
1. Baixe o arquivo ZIP do projeto
2. Extraia em uma pasta (ex: `C:\Projetos\todo-nosql-project`)

### Opção 2: Git Clone (se disponível)
\`\`\`bash
git clone [URL_DO_REPOSITORIO]
cd todo-nosql-project
\`\`\`

## 📂 Abrindo no VS Code

### Método 1: Pelo VS Code
1. Abra o VS Code
2. Clique em "File" → "Open Folder"
3. Navegue até a pasta do projeto
4. Selecione a pasta `todo-nosql-project`
5. Clique em "Selecionar pasta"

### Método 2: Pelo Terminal
\`\`\`bash
# Navegue até a pasta do projeto
cd caminho/para/todo-nosql-project

# Abra no VS Code
code .
\`\`\`

### Método 3: Arrastar e Soltar
1. Abra o VS Code
2. Arraste a pasta do projeto para a janela do VS Code

## 🔧 Configurando o Ambiente

### 1. Instalar Extensões Recomendadas
No VS Code, vá em Extensions (Ctrl+Shift+X) e instale:

- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **Auto Rename Tag**
- **MongoDB for VS Code** (opcional)

### 2. Abrir Terminal Integrado
- Pressione `Ctrl + `` (backtick) ou
- Menu: Terminal → New Terminal

### 3. Instalar Dependências
No terminal do VS Code:
\`\`\`bash
npm install
\`\`\`

Aguarde a instalação (pode demorar alguns minutos).

## 🗄️ Configurando o Banco de Dados

### Opção A: MongoDB Atlas (Nuvem - Mais Fácil)

1. **Criar Conta**
   - Acesse: https://www.mongodb.com/atlas
   - Clique em "Try Free"
   - Crie sua conta gratuita

2. **Criar Cluster**
   - Escolha "Build a Database"
   - Selecione "FREE" (M0 Sandbox)
   - Escolha região mais próxima
   - Clique "Create Cluster"

3. **Configurar Acesso**
   - Crie um usuário de banco de dados
   - Adicione seu IP à whitelist (ou 0.0.0.0/0 para qualquer IP)

4. **Obter String de Conexão**
   - Clique em "Connect"
   - Escolha "Connect your application"
   - Copie a string de conexão
   - Substitua `<password>` pela sua senha

### Opção B: MongoDB Local

1. **Instalar MongoDB**
   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - macOS: `brew install mongodb-community`
   - Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

2. **Iniciar MongoDB**
   \`\`\`bash
   mongod
   \`\`\`

## ⚙️ Configurar Variáveis de Ambiente

1. **Copiar arquivo de exemplo**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. **Editar .env.local**
   - Abra o arquivo `.env.local` no VS Code
   - Substitua a linha `MONGODB_URI=` pela sua string de conexão:
   
   \`\`\`env
   # Para MongoDB Atlas
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/todo-nosql-project
   
   # Para MongoDB Local
   MONGODB_URI=mongodb://localhost:27017
   \`\`\`

## 🚀 Executando o Projeto

### 1. Configurar Banco de Dados
\`\`\`bash
npm run setup
\`\`\`

### 2. Iniciar o Servidor
\`\`\`bash
npm run dev
\`\`\`

### 3. Abrir no Navegador
- Abra: http://localhost:3000
- O projeto deve estar funcionando!

## 📱 Testando as Funcionalidades

1. **Criar Tarefa**
   - Preencha o formulário à esquerda
   - Clique em "Criar Tarefa"

2. **Visualizar Dashboard**
   - Veja as estatísticas no topo
   - Observe as tarefas listadas

3. **Editar Tarefa**
   - Clique no ícone de edição
   - Modifique os campos
   - Clique em "Salvar"

4. **Filtrar Tarefas**
   - Use o dropdown "Todas/Pendentes/etc"

5. **Exportar Dados**
   - Clique em "Exportar JSON"
   - Arquivo será baixado

## 🐛 Problemas Comuns e Soluções

### Erro: "npm não é reconhecido"
- **Solução**: Reinstale o Node.js e reinicie o VS Code

### Erro: "Cannot connect to MongoDB"
- **Solução**: Verifique a string de conexão no `.env.local`
- Para Atlas: verifique usuário, senha e whitelist de IP

### Porta 3000 em uso
\`\`\`bash
# Use porta diferente
npm run dev -- -p 3001
\`\`\`

### Erro de dependências
\`\`\`bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
\`\`\`

### VS Code não reconhece TypeScript
- **Solução**: Instale a extensão "TypeScript Importer"
- Reinicie o VS Code

## 📁 Estrutura de Pastas no VS Code

\`\`\`
📁 todo-nosql-project/
├── 📁 app/
│   ├── 📁 api/tasks/          # APIs do backend
│   ├── 📄 page.tsx            # Página principal
│   └── 📄 layout.tsx          # Layout
├── 📁 lib/
│   └── 📄 mongodb.ts          # Conexão MongoDB
├── 📁 scripts/
│   └── 📄 setup-database.js   # Script de setup
├── 📁 components/ui/          # Componentes UI
├── 📄 .env.local              # Variáveis de ambiente
├── 📄 package.json            # Dependências
└── 📄 README.md               # Documentação
\`\`\`

## 🎯 Próximos Passos

1. **Explore o código**
   - Abra `app/page.tsx` para ver o frontend
   - Veja `app/api/tasks/route.ts` para o backend
   - Examine `lib/mongodb.ts` para a conexão

2. **Personalize**
   - Modifique cores no Tailwind CSS
   - Adicione novos campos às tarefas
   - Implemente novas funcionalidades

3. **Deploy**
   - Faça push para GitHub
   - Deploy no Vercel
   - Configure variáveis de ambiente

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todos os pré-requisitos estão instalados
2. Confira se o MongoDB está conectado
3. Veja os logs no terminal do VS Code
4. Consulte a documentação no README.md

---

**Boa sorte com seu projeto! 🚀**
