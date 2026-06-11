# M74 Gestão — Sistema de Gestão Empresarial

Sistema web completo para gestão de produtos, clientes, vendas e dashboard administrativo, com autenticação JWT segura.

**Stack:** Node.js + Express + SQLite (backend) | React 19 + Vite + Tailwind CSS (frontend)

---

## Credenciais de Acesso

| Tipo          | Email             | Senha      |
|---------------|-------------------|------------|
| Administrador | admin@m74.ao      | Admin123!  |

> Novos utilizadores podem ser criados pelo registo na página `/cadastro`. O papel padrão é sempre **Utilizador**.

---

## Estrutura do Projeto

```
M74Gest/
├── backend/                  # API Node.js + Express
│   ├── src/
│   │   ├── app.js            # Servidor principal
│   │   ├── db.js             # SQLite + seed inicial
│   │   ├── middlewares/
│   │   │   └── auth.js       # JWT authenticate + adminOnly
│   │   └── routes/
│   │       ├── auth.js       # /api/auth/*
│   │       ├── produtos.js   # /api/produtos/*
│   │       ├── clientes.js   # /api/clientes/*
│   │       ├── vendas.js     # /api/vendas/*
│   │       └── dashboard.js  # /api/dashboard
│   ├── data/                 # Base de dados SQLite (gerada automaticamente)
│   ├── .env                  # Variáveis de ambiente (não subir ao git)
│   └── package.json
│
└── vite-project/             # Frontend React
    ├── src/
    │   ├── admin/            # Dashboard administrativo
    │   ├── components/       # Componentes reutilizáveis
    │   ├── pages/            # Páginas (Login, Home, Produtos, Clientes, Vendas, Perfil)
    │   ├── contexts/         # AuthContext (estado global de autenticação)
    │   ├── services/api.js   # Chamadas à API
    │   ├── utils/            # Validações
    │   └── App.jsx           # Rotas principais
    ├── .env                  # VITE_API_URL (não subir ao git)
    └── package.json
```

---

## Executar Localmente

### Pré-requisitos

- **Node.js** >= 18 — [nodejs.org](https://nodejs.org)
- **npm** >= 9

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/M74Gest.git
cd M74Gest
```

### 2. Configurar o Backend

```bash
cd backend
cp .env.example .env
```

Editar o ficheiro `backend/.env`:

```env
PORT=3001
JWT_SECRET=muda-esta-chave-para-algo-seguro
JWT_EXPIRES=24h
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
```

Instalar dependências e iniciar:

```bash
npm install
npm run dev
```

O backend estará em: `http://localhost:3001`

### 3. Configurar o Frontend

```bash
cd ../vite-project
```

Criar o ficheiro `vite-project/.env`:

```env
VITE_API_URL=/api
```

Instalar dependências e iniciar:

```bash
npm install
npm run dev
```

O frontend estará em: `http://localhost:5173`

> O proxy do Vite encaminha `/api` → `http://localhost:3001` automaticamente.

---

## Build para Produção (Modo Integrado)

O backend serve o frontend como ficheiros estáticos em modo produção.

```bash
# Na raiz do projeto
cd backend
npm run start:prod
```

Este comando faz:
1. Instala dependências do frontend
2. Compila o frontend (`npm run build`)
3. Inicia o backend que serve o frontend em `/`

Aceder em: `http://localhost:3001`

---

## Deploy — Guia Completo Passo a Passo

### Opção A — Railway (Recomendado — Gratuito)

Railway é a plataforma mais simples para este projeto. Suporta Node.js e persiste ficheiros (SQLite).

#### Passo 1 — Criar conta
1. Aceder a [railway.app](https://railway.app)
2. Clicar em **Start a New Project**
3. Fazer login com a conta GitHub

#### Passo 2 — Subir o código para o GitHub
```bash
# Na raiz do projeto M74Gest
git init
git add .
git commit -m "feat: versão inicial para produção"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/M74Gest.git
git push -u origin main
```

> Verificar que o `.gitignore` está a excluir `node_modules/`, `*.sqlite` e ficheiros `.env`.

#### Passo 3 — Criar o serviço no Railway
1. No dashboard do Railway, clicar em **New Project → Deploy from GitHub repo**
2. Selecionar o repositório `M74Gest`
3. Railway detecta automaticamente o Node.js

#### Passo 4 — Configurar variáveis de ambiente no Railway
No painel do serviço → **Variables** → adicionar:

| Variável         | Valor                                    |
|------------------|------------------------------------------|
| `PORT`           | `3001`                                   |
| `JWT_SECRET`     | `uma-chave-muito-secreta-de-pelo-menos-32-chars` |
| `JWT_EXPIRES`    | `24h`                                    |
| `CORS_ORIGINS`   | `https://SEU-APP.railway.app`            |
| `NODE_ENV`       | `production`                             |

#### Passo 5 — Configurar o comando de início
No Railway → **Settings → Deploy**:

- **Root Directory:** `/` (raiz do projeto)
- **Build Command:** `cd backend && npm install && cd ../vite-project && npm install && npm run build`
- **Start Command:** `cd backend && node src/app.js`

#### Passo 6 — Deploy
Clicar em **Deploy** ou fazer push para o GitHub (Railway faz deploy automático a cada push).

A URL pública é gerada automaticamente, ex: `https://m74gest.railway.app`

---

### Opção B — Render (Gratuito com limitações)

Render é uma boa alternativa gratuita. Atenção: no plano gratuito o servidor "adormece" após 15 min de inatividade.

#### Passo 1 — Criar conta
1. Aceder a [render.com](https://render.com)
2. Registar com a conta GitHub

#### Passo 2 — Criar um Web Service
1. Dashboard → **New → Web Service**
2. Conectar o repositório GitHub `M74Gest`
3. Configurar:
   - **Name:** `m74gest`
   - **Environment:** `Node`
   - **Region:** Frankfurt (mais perto de Angola)
   - **Branch:** `main`
   - **Root Directory:** deixar vazio
   - **Build Command:**
     ```
     cd backend && npm install && cd ../vite-project && npm install && npm run build
     ```
   - **Start Command:**
     ```
     cd backend && node src/app.js
     ```
   - **Plan:** Free

#### Passo 3 — Variáveis de ambiente
No painel do serviço → **Environment** → adicionar as mesmas variáveis da tabela da Opção A, com `CORS_ORIGINS` apontando para o URL do Render.

#### Passo 4 — Criar disco persistente (OBRIGATÓRIO para SQLite)
1. No painel do serviço → **Disks → Add Disk**
2. Configurar:
   - **Name:** `m74-data`
   - **Mount Path:** `/opt/render/project/src/backend/data`
   - **Size:** 1 GB (gratuito)

> Sem o disco, a base de dados SQLite é apagada a cada deploy.

#### Passo 5 — Actualizar o caminho da base de dados
Editar `backend/src/db.js` para usar a variável de ambiente do caminho:

```js
const dataDir = process.env.DATA_DIR || path.join(__dirname, '../data');
```

Adicionar a variável `DATA_DIR=/opt/render/project/src/backend/data` nas variáveis do Render.

#### Passo 6 — Deploy
Clicar em **Create Web Service**. O deploy começa automaticamente.

---

### Opção C — VPS / Servidor Próprio (Ubuntu/Debian)

Para produção real com domínio próprio e maior controlo.

#### Passo 1 — Preparar o servidor

```bash
# Actualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 (gestor de processos)
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Verificar versões
node --version
npm --version
```

#### Passo 2 — Clonar e configurar o projeto

```bash
# Criar pasta do projeto
mkdir -p /var/www/m74gest
cd /var/www/m74gest

# Clonar o repositório
git clone https://github.com/SEU_USUARIO/M74Gest.git .

# Configurar o backend
cp backend/.env.example backend/.env
nano backend/.env
```

Conteúdo do `backend/.env` em produção:

```env
PORT=3001
JWT_SECRET=gere-uma-chave-com-openssl-rand-base64-32
JWT_EXPIRES=24h
CORS_ORIGINS=https://seu-dominio.com
NODE_ENV=production
```

#### Passo 3 — Instalar dependências e fazer build

```bash
# Instalar dependências do backend
cd /var/www/m74gest/backend
npm install --production

# Instalar dependências e fazer build do frontend
cd /var/www/m74gest/vite-project
npm install
npm run build

# Voltar à raiz
cd /var/www/m74gest
```

#### Passo 4 — Iniciar com PM2

```bash
# Iniciar o backend com PM2
pm2 start backend/src/app.js --name "m74gest" --cwd /var/www/m74gest

# Guardar a configuração do PM2
pm2 save

# Configurar PM2 para iniciar com o sistema
pm2 startup
# Executar o comando que o PM2 mostrar

# Verificar que está a correr
pm2 status
pm2 logs m74gest
```

#### Passo 5 — Configurar Nginx como proxy reverso

```bash
sudo nano /etc/nginx/sites-available/m74gest
```

Conteúdo do ficheiro Nginx:

```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    # Redirecionar para HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name seu-dominio.com www.seu-dominio.com;

    # Certificado SSL (gerado com Certbot no Passo 6)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    # Proxy para o Node.js
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar o site
sudo ln -s /etc/nginx/sites-available/m74gest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Passo 6 — Certificado SSL gratuito (HTTPS)

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# Renovação automática (já configurada pelo Certbot)
sudo certbot renew --dry-run
```

#### Passo 7 — Atualizar em produção

```bash
cd /var/www/m74gest
git pull origin main

# Rebuild do frontend
cd vite-project && npm install && npm run build && cd ..

# Reinstalar dependências do backend se mudaram
cd backend && npm install --production && cd ..

# Reiniciar o servidor
pm2 restart m74gest
```

---

## Variáveis de Ambiente — Referência Completa

### Backend (`backend/.env`)

| Variável        | Obrigatória | Descrição                                         | Exemplo                          |
|-----------------|-------------|---------------------------------------------------|----------------------------------|
| `PORT`          | Sim         | Porta do servidor                                 | `3001`                           |
| `JWT_SECRET`    | Sim         | Chave secreta para assinar tokens JWT             | `abc123xyz...` (mín. 32 chars)   |
| `JWT_EXPIRES`   | Não         | Validade do token (padrão: `1h`)                  | `24h`                            |
| `CORS_ORIGINS`  | Sim         | URLs do frontend autorizadas (separar por vírgula)| `https://m74gest.railway.app`    |
| `NODE_ENV`      | Não         | Ambiente (`development` ou `production`)          | `production`                     |

> Gerar uma chave JWT segura: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Frontend (`vite-project/.env`)

| Variável        | Obrigatória | Descrição                    | Exemplo em Dev | Exemplo em Prod (integrado) |
|-----------------|-------------|------------------------------|----------------|-----------------------------|
| `VITE_API_URL`  | Não         | URL base da API              | `/api`         | `/api`                      |

> Em produção integrada (backend serve o frontend), manter `VITE_API_URL=/api` e fazer o build do frontend.

---

## API — Rotas Disponíveis

### Autenticação (`/api/auth`)
| Método | Rota               | Descrição              | Auth |
|--------|--------------------|------------------------|------|
| POST   | `/api/auth/register` | Registar utilizador  | Não  |
| POST   | `/api/auth/login`    | Fazer login            | Não  |
| GET    | `/api/auth/me`       | Dados do utilizador    | Sim  |
| PUT    | `/api/auth/me`       | Actualizar perfil      | Sim  |
| PUT    | `/api/auth/me/password` | Alterar senha       | Sim  |

### Produtos (`/api/produtos`) — Admin para criar/editar/apagar
| Método | Rota               | Auth   |
|--------|--------------------|--------|
| GET    | `/api/produtos`    | Sim    |
| POST   | `/api/produtos`    | Admin  |
| PUT    | `/api/produtos/:id`| Admin  |
| DELETE | `/api/produtos/:id`| Admin  |

### Clientes, Vendas — mesma estrutura dos Produtos

### Dashboard
| Método | Rota              | Auth  |
|--------|-------------------|-------|
| GET    | `/api/dashboard`  | Admin |

---

## Problemas Comuns

### "Cannot connect to API"
- Verificar se o backend está em execução na porta correta
- Confirmar que `VITE_API_URL` aponta para o backend
- Verificar `CORS_ORIGINS` no `.env` do backend

### "Token inválido ou expirado"
- Fazer logout e login novamente
- Verificar se `JWT_SECRET` é o mesmo em todos os deploys

### "Produto/Cliente não carrega"
- Verificar os logs do backend: `pm2 logs m74gest` (VPS) ou painel do Railway/Render
- Confirmar que a base de dados SQLite existe em `backend/data/m74gest.sqlite`

### Base de dados apagada no Render
- É obrigatório configurar um **Disk** persistente no Render (ver Opção B, Passo 4)

### Build do frontend falha
```bash
cd vite-project
rm -rf node_modules
npm install
npm run build
```

---

## Segurança em Produção

- [ ] Alterar `JWT_SECRET` para uma chave aleatória forte (mín. 32 caracteres)
- [ ] Configurar `CORS_ORIGINS` apenas com os domínios reais
- [ ] Usar HTTPS (certificado SSL obrigatório)
- [ ] Nunca subir ficheiros `.env` ao git
- [ ] Manter `NODE_ENV=production` activado

---

## Tecnologias

**Backend**
- Node.js 20 + Express 5
- better-sqlite3 (base de dados embebida)
- jsonwebtoken + bcryptjs (autenticação)
- cors + dotenv

**Frontend**
- React 19 + Vite 7
- React Router v7
- Tailwind CSS v4
- Lucide React (ícones)

---

## Licença

© 2024 M74 Gestão. Todos os direitos reservados.
