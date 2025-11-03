# 🚀 Gerador de Política de Privacidade (Baseado na LGPD)

Este é um Micro-SaaS gratuito que gera Políticas de Privacidade e Termos de Uso profissionais, utilizando como base o modelo oficial de Política de Proteção de Dados Pessoais do `gov.br`.

O projeto foi construído com uma stack moderna (FastAPI + React) e está no ar, servindo como uma ferramenta-isca para monetização via marketing de afiliados.

**🔗 Site no ar: [https://gerador-politica.vercel.app](https://gerador-politica.vercel.app)**

---

## ✨ Funcionalidades Principais

* **Modelo Profissional:** O texto da política é baseado no modelo do `gov.br`, focado na LGPD.
* **Formulário Inteligente:** Um formulário de múltiplos passos que coleta apenas as informações necessárias (como dados do DPO).
* **Design Moderno:** Interface limpa, responsiva e profissional construída com Chakra UI.
* **Monetização Embutida:** Banners de afiliados contextuais (Hospedagem e E-commerce) são exibidos na página de resultado.
* **Pronto para Usar:** O usuário pode copiar os textos gerados para a área de transferência com um clique.

---

## 🛠️ Stack Tecnológica (Tech Stack)

Este projeto utiliza uma arquitetura moderna separada em Frontend e Backend.

### **Backend (a pasta `/backend`)**
* **Framework:** **FastAPI** (para uma API Python de alta performance)
* **Validação:** **Pydantic** (para validação automática dos dados do formulário)
* **Servidor:** **Uvicorn**
* **Deploy:** **Render** (Plano Gratuito)

### **Frontend (a pasta `/frontend`)**
* **Framework:** **React** com **Vite** (para um HMR e build rápidos)
* **Linguagem:** **TypeScript**
* **UI (Design):** **Chakra UI** (para componentes de UI modernos e acessíveis)
* **Deploy:** **Vercel** (Plano Gratuito com CDN Global)

---

## ⚙️ Como Rodar Localmente

Para executar o projeto na sua máquina, siga os passos abaixo.

### 1. Backend (FastAPI)

1. Navegue até a pasta do backend
```
cd backend
```

2. Crie e ative um ambiente virtual
```
python -m venv venv
source venv/bin/activate  # (ou .\venv\Scripts\activate no Windows)
```

3. Instale as dependências
```
pip install -r requirements.txt
```

4. Rode o servidor de desenvolvimento
```
uvicorn main:app --reload
```

A API estará disponível em http://127.0.0.1:8000 e a documentação em http://127.0.0.1:8000/docs.

### 2. Backend (FastAPI)

Certifique-se de que o backend esteja rodando primeiro.

1. Em um NOVO terminal, navegue até a pasta do frontend
```
cd frontend
```

2. Instale as dependências
```
npm install
```

3. Rode o servidor de desenvolvimento
```
npm run dev
```

O site estará disponível em http://localhost:5173.

---

📄 Licença

Este projeto está licenciado sob a Licença MIT.