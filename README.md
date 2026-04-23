# Mr. Cleaner — Landing Page Cinematográfica

Uma landing page premium, de alta fidelidade e focada em conversão para a **Mr. Cleaner**, empresa especializada em higienização e impermeabilização de estofados e tapetes.

O projeto foi construído seguindo uma estética "Organic Tech", oferecendo um design moderno, cinematográfico e com micro-interações fluidas para transmitir profissionalismo e confiança aos clientes.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Funcionalidades

- **Design Premium:** Interface "1:1 Pixel Perfect", erradicando o padrão "genérico", com paleta de cores customizada, texturas orgânicas e noise SVG.
- **Animações Cinematográficas:** Revelações de conteúdo acionadas por scroll (`GSAP ScrollTrigger`) e transições de interface suaves.
- **Navbar Inteligente:** Menu de navegação responsivo flutuante (formato pílula) que se adapta dinamicamente ao scroll.
- **Modal de Captura de Leads Passo a Passo:** Formulário elegante com animações físicas (`Framer Motion`), lógica condicional (Estofado vs. Tapete) e tratamento de erros.
- **Integração com Google Sheets:** Todos os pedidos de orçamento são enviados via Webhook diretamente para uma planilha do Google Sheets, simplificando a gestão de CRM.

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite** (Build tool e Dev Server)
- **Tailwind CSS v3** (Estilização e utilitários de design system)
- **GSAP 3** (Animações de entrada e ScrollTrigger)
- **Framer Motion** (Animações de layout e modal)
- **Lucide React** (Ícones SVG)

## 📋 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js instalado (v18+)
- NPM ou Yarn

### Instalação

1. Clone o repositório e acesse o diretório do projeto:
```bash
git clone <url-do-repositorio>
cd mr-cleaner-web
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Copie o arquivo `.env.example` para `.env`
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## ⚙️ Configuração da Integração com Google Sheets

Para que a funcionalidade de "Solicitar Orçamento" envie os dados corretamente, é necessário configurar um Google Apps Script vinculado a uma planilha sua.

Consulte o guia completo com passo a passo ilustrado em:
👉 **[Guia de Configuração do Google Sheets](./docs/google-sheets-setup.md)**

Após configurar o script, cole a URL gerada no arquivo `.env` gerado no passo 3 da instalação local:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

## 🏗️ Estrutura do Projeto

```text
├── docs/                     # Guias de documentação
│   └── google-sheets-setup.md # Guia de automação de Leads
├── src/
│   ├── components/           # Componentes UI organizados por Seção
│   │   ├── FamilyHealth.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HomeService.jsx
│   │   ├── LeadCaptureModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Payment.jsx
│   │   ├── Services.jsx
│   │   └── SocialProof.jsx
│   ├── App.jsx               # Orquestração das seções da Landing Page
│   ├── index.css             # Estilos globais e Design System Customizado
│   └── main.jsx              # Ponto de entrada React
├── .env.example              # Template de Variáveis de Ambiente
├── tailwind.config.js        # Configuração do Tailwind (Cores, Fontes)
└── referencia_mrcleaner.md   # Documento com conteúdo oficial da marca
```

---
*Projeto desenvolvido para a Mr. Cleaner. Todos os direitos reservados.*
