# 📚 Guia de Desenvolvimento - M74 Gestão

## 🎯 Visão Geral

Este é um guia completo para entender, desenvolver e manter o sistema M74 Gestão.

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── pages/              # Páginas principais da aplicação
├── admin/              # Dashboard administrativo
├── components/         # Componentes reutilizáveis
├── contexts/          # Context API (autenticação, etc)
├── utils/             # Funções utilitárias
├── services/          # Serviços (API, etc)
├── config/            # Configurações
├── constants/         # Constantes e mensagens
└── assets/            # Imagens e arquivos estáticos
```

### Fluxo de Dados

```
User Input → Component → Context/State → Validation → API Call → Storage
    ↓         ↓           ↓              ↓             ↓         ↓
  Pages      UI         Auth/Data      Rules       Services   Cache
```

## 🔐 Sistema de Autenticação

### Como Funciona

1. **Login**: Usuário entra com email e senha
2. **Validação**: Verificação de credenciais
3. **Armazenamento**: Dados armazenados em localStorage
4. **Contexto**: User data disponível via `useAuth()`
5. **Rotas**: Protegidas com `<PrivateRoute>`

### Usar em Componentes

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, logout, updateUser } = useAuth();
  
  return (
    <div>
      <p>Bem-vindo, {user?.name}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## ✅ Validações

### Sistema de Validação

Arquivo: `src/utils/validations.js`

```javascript
import { validations } from '../utils/validations';

// Usar validações
validations.email('test@example.com')     // true/false
validations.password('abc123')             // true/false
validations.phone('922222222')             // true/false
validations.nif('1234567890')              // true/false
validations.isEmpty('texto')               // true/false
validations.isNumber('123')                // true/false
validations.minLength('abc', 3)            // true/false
validations.maxLength('abc', 5)            // true/false
```

### Implementar Validação em Formulário

```jsx
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!validations.email(formData.email)) {
    newErrors.email = getErrorMessage('email', 'invalid');
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## 🎨 Componentes UI

### Componentes Disponíveis

**src/components/UI.jsx**
- `<Toast>` - Notificações
- `<Spinner>` - Carregamento
- `<LoadingScreen>` - Tela de carregamento
- `<EmptyState>` - Estado vazio

**src/components/FormComponents.jsx**
- `<FormField>` - Campo de formulário
- `<FormInput>` - Input customizado
- `<FormSelect>` - Select customizado

### Usar Toast

```jsx
import { Toast } from '../components/UI';
import { useState } from 'react';

function MyComponent() {
  const [toast, setToast] = useState(null);
  
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };
  
  return (
    <>
      {toast && (
        <Toast 
          type={toast.type} 
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
```

## 🔒 Segurança

### Melhores Práticas

1. **Sempre validar dados de entrada**
2. **Sanitizar inputs** - usar `sanitizeInput()`
3. **Nunca armazenar senhas**
4. **Usar HTTPS em produção**
5. **Rate limiting** - usar `loginLimiter`
6. **Logs de segurança** - usar `securityLog()`

### Usar Segurança

```javascript
import { sanitizeInput, securityLog } from '../utils/security';

// Sanitizar input
const cleanInput = sanitizeInput(userInput);

// Log de segurança
securityLog('login_attempt', { email: user.email }, 'info');
```

## 📦 Gerenciamento de Estado

### Usar Context de Autenticação

```jsx
const { user, isLoading, isAuthenticated, login, logout } = useAuth();
```

### Valores Disponíveis

- `user` - Dados do usuário logado
- `isLoading` - Status de carregamento
- `isAuthenticated` - Verificação de autenticação
- `login(email, password)` - Fazer login
- `logout()` - Fazer logout
- `updateUser(data)` - Atualizar dados do usuário

## 🛣️ Rotas

### Adicionar Nova Rota

```jsx
// Em App.jsx

<Route
  path="/nova-pagina"
  element={
    <PrivateRoute>
      <NovaPagina />
    </PrivateRoute>
  }
/>
```

### Proteger Rota

```jsx
import { PrivateRoute } from './components/ProtectedRoute';

// Rotas privadas usam <PrivateRoute>
// Rotas públicas usam <PublicRoute>
```

## 📊 Trabalhar com Dados

### Simular Dados

Arquivo: `src/services/api.js`

```javascript
const mockData = {
  produtos: [...],
  clientes: [...],
  vendas: [...]
};
```

### Buscar Dados

```javascript
import { api } from '../services/api';

const { success, data, error } = await api.getProdutos();
```

### Adicionar Dados

```javascript
await api.addProduto({
  nome: 'Novo Produto',
  preco: 1000,
  categoria: 'Eletrônicos'
});
```

## 🎯 Criar Nova Página

### Template

```jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Search } from 'lucide-react';

function NovaPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-800">Título</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Seu conteúdo aqui */}
      </main>
    </div>
  );
}

export default NovaPage;
```

## 🧪 Testes

### Testar Validação

```javascript
import { validations } from '../utils/validations';

// Testes
console.assert(validations.email('test@test.com') === true);
console.assert(validations.email('invalid') === false);
```

### Testar Componente

1. Abrir DevTools (F12)
2. Console tab
3. Verificar erros
4. Testar funcionalidades manualmente

## 📖 Documentação

### Arquivos de Documentação

- `README_PT.md` - Guia principal
- `GUIA_DESENVOLVIMENTO.md` - Este arquivo
- Comentários inline no código

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

### Arquivos Gerados

```
dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
```

### Hospedar

1. Fazer upload de `dist/` para servidor
2. Configurar HTTPS
3. Configurar backend API
4. Testar em produção

## 🐛 Debugging

### Console

```javascript
// Logs úteis
console.log('user:', user);
console.error('erro:', error);
console.warn('aviso:', warning);

// Breakpoints
debugger; // Pausar execução
```

### DevTools

1. **Elements** - Inspecionar HTML/CSS
2. **Console** - Erros e logs
3. **Network** - Requisições API
4. **Storage** - localStorage/sessionStorage
5. **Sources** - Debugger

## 💡 Dicas

1. **Organizar imports**: Agrupar por tipo (React, componentes, utils)
2. **Nomes significativos**: `handleSubmit` em vez de `handle`
3. **Componentes pequenos**: Máximo 300 linhas
4. **Reutilizar componentes**: Criar bibliotecas de UI
5. **Comentar código complexo**: Explicar lógica não óbvia
6. **Usar constantes**: Não hardcodar valores
7. **Testear funcionalidades**: Antes de mergear

## 📝 Convenções

### Nomenclatura

- **Componentes**: PascalCase (`HomePage`, `ProductCard`)
- **Arquivos**: kebab-case (`product-card.jsx`)
- **Funções**: camelCase (`handleSubmit`, `validateForm`)
- **Constantes**: UPPER_SNAKE_CASE (`AUTH_CONFIG`, `MAX_RETRIES`)
- **CSS Classes**: kebab-case (`bg-blue-600`, `text-center`)

### Estrutura de Arquivos

```jsx
// Imports
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Component
function MyComponent() {
  // Hooks
  const [state, setState] = useState();
  const { user } = useAuth();

  // Functions
  const handleClick = () => {};

  // Render
  return <div>...</div>;
}

// Export
export default MyComponent;
```

## 🤝 Contribuir

1. Criar branch: `git checkout -b feature/nome`
2. Fazer alterações
3. Testes
4. Commit: `git commit -m "feat: descrição"`
5. Push: `git push origin feature/nome`
6. Pull Request

## 📞 Suporte

- Documentação: Ler `README_PT.md`
- Código: Procurar exemplos no projeto
- Erros: Verificar console do navegador
- Community: Discuss no GitHub Issues

---

**Happy Coding! 🚀**
