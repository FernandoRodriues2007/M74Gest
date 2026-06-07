# M74 Gestão - Sistema Completo de Gerenciamento

Aplicação web profissional para gestão de produtos, clientes, vendas e dashboard administrativo com autenticação segura.

## 🚀 Características

- ✅ **Autenticação Segura** - Login com validação e proteção de rotas
- ✅ **Dashboard Administrativo** - Painel com 4 abas (Dashboard, Estoque, Faturação, Configuração)
- ✅ **Gerenciamento de Produtos** - CRUD completo com filtros
- ✅ **Gerenciamento de Clientes** - Cadastro com validação de dados
- ✅ **Controle de Vendas** - Registro e acompanhamento de transações
- ✅ **Perfil do Usuário** - Edição de dados e alteração de senha
- ✅ **Validações** - Formulários com regras de validação em tempo real
- ✅ **Design Responsivo** - Interface moderna com Tailwind CSS
- ✅ **Segurança** - Context de autenticação e rotas protegidas

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework frontend
- **React Router v7** - Roteamento
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Vite** - Build tool
- **Context API** - Gerenciamento de estado

## 📋 Estrutura do Projeto

```
src/
├── admin/
│   ├── dashboard.jsx          # Dashboard admin com abas
│   ├── DashboardContent.jsx
│   ├── EstoqueContent.jsx
│   ├── FaturacaoContent.jsx
│   └── ConfiguracaoContent.jsx
├── pages/
│   ├── Login.jsx              # Página de login
│   ├── Home.jsx               # Home com menu de módulos
│   ├── Produtos.jsx           # Gerenciamento de produtos
│   ├── Clientes.jsx           # Gerenciamento de clientes
│   ├── Vendas.jsx             # Controle de vendas
│   └── Perfil.jsx             # Perfil do usuário
├── components/
│   ├── ProtectedRoute.jsx     # Rotas privadas e públicas
│   ├── UI.jsx                 # Componentes UI (Toast, Spinner, etc)
│   ├── FormComponents.jsx     # Componentes de formulário
│   └── [outros componentes]
├── contexts/
│   └── AuthContext.jsx        # Context de autenticação
├── utils/
│   └── validations.js         # Funções de validação
├── services/
│   └── api.js                 # Simula chamadas à API
├── App.jsx                    # Rotas principais
└── main.jsx                   # Entry point
```

## 🔐 Credenciais de Login

A aplicação possui dois usuários de teste:

### Administrador
- **Email**: `admin@m74.ao`
- **Senha**: `admin123`
- **Acesso**: Dashboard completo com acesso a todas as funcionalidades

### Usuário Regular
- **Email**: `user@m74.ao`
- **Senha**: `user123`
- **Acesso**: Módulos de Produtos, Clientes e Vendas

## 🚀 Como Executar

### 1. Instalação

```bash
cd vite-project
npm install
```

### 2. Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### 3. Build para Produção

```bash
npm run build
```

## 📖 Funcionalidades Detalhadas

### 1. **Autenticação**
- Login com validação de email e senha
- Armazenamento seguro em localStorage
- Proteção de rotas com PrivateRoute
- Logout com confirmação

### 2. **Dashboard Admin** (Apenas admin@m74.ao)
- **Dashboard**: Estatísticas em tempo real, produtos mais vendidos, atividade recente
- **Estoque**: Tabela de produtos com filtros, pesquisa, status colorido
- **Faturação**: Resumo de faturas (Paga, Pendente, Vencida), tabela de transações
- **Configuração**: Dados da empresa, preferências, segurança

### 3. **Gerenciamento de Produtos**
- CRUD completo (Criar, Ler, Atualizar, Deletar)
- Filtros por categoria
- Busca em tempo real
- Status visual (Ativo, Baixo, Crítico)
- Validações de preço e quantidade

### 4. **Gestão de Clientes**
- Cadastro com validação de email, telefone e NIF
- Cards de cliente com informações resumidas
- Busca por nome, email ou telefone
- Edição e exclusão de clientes
- Status (Ativo/Inativo)

### 5. **Controle de Vendas**
- Registro de vendas com cliente, produto, quantidade
- Cálculo automático do total
- Filtros por cliente ou produto
- Status (Pendente/Concluído/Cancelado)
- Estatísticas: total de vendas, vendas concluídas, ticket médio

### 6. **Perfil do Usuário**
- Edição de dados pessoais com validação
- Alteração de senha com confirmação
- Informações de empresa
- Logout seguro

## ✅ Validações Implementadas

### Email
- Formato válido com regex
- Campo obrigatório

### Senha
- Mínimo 6 caracteres
- Fortaleza (fraca, média, forte)
- Confirmação ao alterar

### Telefone
- 9 dígitos (padrão Angola)
- Apenas números

### NIF
- Mínimo 10 caracteres
- Apenas números

### Números (Preço, Quantidade)
- Validação numérica
- Valores positivos

## 🎨 Paleta de Cores

- **Primary**: Blue-600 `#2563eb`
- **Success**: Green-600 `#16a34a`
- **Warning**: Yellow-600 `#ca8a04`
- **Error**: Red-600 `#dc2626`
- **Background**: Slate-100 `#f1f5f9`
- **Text**: Slate-800 `#1e293b`

## 🔒 Segurança

- Rotas protegidas com autenticação
- Validação em tempo real
- Tokens simulados em localStorage
- Context API para estado centralizado
- Proteção contra XSS básica

## 📱 Responsividade

- Mobile-first design
- Breakpoints: sm, md, lg
- Tabelas responsivas
- Cards adaptáveis
- Navegação mobile-friendly

## 🎯 Próximas Melhorias

- [ ] Backend API real
- [ ] Autenticação JWT
- [ ] Banco de dados
- [ ] Relatórios em PDF
- [ ] Exportação de dados
- [ ] Temas claro/escuro
- [ ] Notificações em tempo real
- [ ] Histórico de auditorias

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Credenciais de login
2. Console do navegador para erros
3. LocalStorage limpo

## 📄 Licença

Projeto desenvolvido para M74 Gestão - 2024

---

**Desenvolvido com ❤️ usando React e Tailwind CSS**
