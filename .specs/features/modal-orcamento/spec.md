# Requisitos Modal de Orçamento

## Fluxo (REQ-MODAL-01)
- Botões de CTA globais disparam abertura do modal (overlay blur).
- **Passo 1 (Seleção):** Tapete ou Estofado.
- **Passo 2A (Se Tapete):** File Upload Component (Foto), Input Comprimento (m), Input Largura (m), Input CEP.
- **Passo 2B (Se Estofado):** Input Comprimento (m), Input Largura (m), Input CEP.
- **Passo 3 (Lead Capture):** Nome, Sobrenome, E-mail, WhatsApp (com máscara).
- **Passo 4 (Sucesso):** Feedback visual animado.

## UX/UI (REQ-MODAL-02)
- Transições animadas entre os passos (Framer Motion ou controle de opacidade via GSAP/Tailwind).
- Glassmorphism design system para o fundo do Modal.
