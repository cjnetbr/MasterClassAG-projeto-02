# Guia de Configuração — Google Sheets + Landing Page

Este guia explica como conectar o formulário da Landing Page Mr. Cleaner a uma planilha do Google Sheets para que **todos os leads sejam registrados automaticamente**.

---

## Visão Geral da Arquitetura

```
 Landing Page (React)
       │
       │  POST (JSON) via fetch
       ▼
 Google Apps Script (Web App)
       │
       │  Escreve os dados
       ▼
 Google Sheets (Planilha)
```

O formulário envia os dados via `fetch` para um **Google Apps Script** publicado como Web App. O script recebe o JSON e insere uma nova linha na planilha.

---

## Passo 1 — Criar a Planilha no Google Sheets

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma **nova planilha em branco**.
2. Renomeie-a para: **`Mr. Cleaner — Leads`** (ou o nome que preferir).
3. Na **primeira linha** (cabeçalho), preencha exatamente estas colunas:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Data/Hora | Tipo | Comprimento | Largura | CEP | Nome | Sobrenome | E-mail | WhatsApp | Imagem Anexada |

4. **Formate a primeira linha** como cabeçalho (negrito, fundo cinza claro).
5. Anote o nome da aba da planilha. Por padrão é **`Página1`** (ou `Sheet1` em inglês). Se você renomear, atualize no script abaixo.

---

## Passo 2 — Criar o Google Apps Script

1. Com a planilha aberta, vá ao menu: **Extensões → Apps Script**.
2. Um editor de código será aberto. **Apague todo o conteúdo padrão** e cole o código abaixo:

```javascript
/**
 * Mr. Cleaner — Lead Capture Webhook
 * Recebe dados do formulário da Landing Page e insere na planilha.
 */

// Nome da aba da planilha (ajuste se necessário)
const SHEET_NAME = 'Página1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Aba não encontrada: ' + SHEET_NAME }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    // Insere uma nova linha com os dados recebidos
    sheet.appendRow([
      data.timestamp    || new Date().toLocaleString('pt-BR'),
      data.tipo         || '',
      data.comprimento  || '',
      data.largura      || '',
      data.cep          || '',
      data.nome         || '',
      data.sobrenome    || '',
      data.email        || '',
      data.whatsapp     || '',
      data.imagemAnexada || 'Não',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Necessário para que o CORS funcione (preflight OPTIONS)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Mr. Cleaner Lead Webhook está ativo.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Clique em **Salvar** (Ctrl+S) e dê um nome ao projeto, como: `MrCleaner-LeadWebhook`.

---

## Passo 3 — Publicar como Web App

1. No editor do Apps Script, clique em **Implantar → Nova implantação**.
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecionar tipo" e escolha **App da Web**.
3. Configure:
   - **Descrição:** `Lead Capture v1`
   - **Executar como:** `Eu (seu@email.com)`
   - **Quem pode acessar:** `Qualquer pessoa`

> [!IMPORTANT]
> É obrigatório selecionar **"Qualquer pessoa"** para que o formulário da Landing Page consiga enviar dados sem autenticação Google.

4. Clique em **Implantar**.
5. O Google pedirá autorização. Clique em **Autorizar acesso** e siga o fluxo de permissões.
6. Após a implantação, você verá a **URL do Web App**. Ela terá este formato:

```
https://script.google.com/macros/s/AKfycbx.../exec
```

7. **Copie essa URL.** Você vai precisar dela no próximo passo.

---

## Passo 4 — Configurar a Landing Page

1. Na raiz do projeto, crie (ou edite) o arquivo `.env`:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

2. **Reinicie o servidor de desenvolvimento** (`npm run dev`), pois variáveis `.env` só são lidas na inicialização.

3. Pronto! Agora, quando um visitante preencher o formulário e clicar em **"Solicitar Orçamento"**, os dados serão enviados automaticamente para a sua planilha.

---

## Passo 5 — Testar

1. Abra a Landing Page no navegador.
2. Clique em **"Solicitar Orçamento"**.
3. Preencha os dados de teste:
   - Tipo: Tapete
   - Comprimento: 3.0
   - Largura: 2.0
   - CEP: 22041-080
   - Nome: Teste
   - Sobrenome: Lead
   - E-mail: teste@teste.com
   - WhatsApp: (21) 99999-0000
4. Clique em **"Solicitar Orçamento"** no último passo.
5. Abra sua planilha Google Sheets. Os dados devem aparecer como uma **nova linha** em segundos.

---

## Mapeamento de Campos

| Campo no Formulário | Coluna na Planilha | Campo JSON enviado |
|---|---|---|
| (automático) | A — Data/Hora | `timestamp` |
| Tapete / Estofado | B — Tipo | `tipo` |
| Comprimento (m) | C — Comprimento | `comprimento` |
| Largura (m) | D — Largura | `largura` |
| CEP | E — CEP | `cep` |
| Nome | F — Nome | `nome` |
| Sobrenome | G — Sobrenome | `sobrenome` |
| E-mail | H — E-mail | `email` |
| WhatsApp | I — WhatsApp | `whatsapp` |
| Upload de foto | J — Imagem Anexada | `imagemAnexada` |

---

## Solução de Problemas

| Problema | Solução |
|---|---|
| Dados não chegam na planilha | Verifique se a URL no `.env` está correta e se o servidor foi reiniciado |
| Erro de permissão no Apps Script | Reimplante o script com "Qualquer pessoa" como acesso |
| A aba "Página1" não existe | Renomeie a aba na planilha OU altere `SHEET_NAME` no script |
| Console mostra erro de CORS | Isso é normal com `no-cors`. O envio funciona, mas o browser não consegue ler a resposta |

---

## Atualizar o Script

Se você precisar alterar o script (ex: adicionar colunas), edite o código no Apps Script e faça uma **Nova implantação** para gerar uma URL atualizada. Atualize o `.env` com a nova URL.
