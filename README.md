# FlaMedula Landing

Landing page institucional da FlaMedula em Vite vanilla, com JavaScript modular, conteudo fallback CMS-ready e preparacao para integracao futura com Supabase.

## Como rodar

```bash
npm install
npm run dev
```

Para gerar build:

```bash
npm run build
```

## Supabase

1. Copie `.env.example` para `.env`.
2. Preencha:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Se essas variaveis nao existirem, o projeto continua funcionando com fallback local e simulacao visual de envio nos mini apps.

## Estrutura

- `legacy-index.html`: backup do HTML original antes da modularizacao.
- `src/data/fallbackContent.js`: conteudo local pronto para futuro ADM.
- `src/services/contentService.js`: camada de leitura de conteudo.
- `src/services/formsService.js`: normalizacao e envio dos mini apps.
- `src/services/supabaseClient.js`: cria o client apenas se o ambiente estiver configurado.
