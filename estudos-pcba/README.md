# Estudos PCBA (Vercel)
1. Suba esta pasta para um repositório GitHub e importe no Vercel (framework: Other).
2. Vercel → Storage/Marketplace → adicione **Upstash Redis** ao projeto (cria KV_REST_API_URL/TOKEN).
3. Em Settings → Environment Variables: `USERS` (email:senha,email:senha) e `JWT_SECRET` (string longa aleatória). Veja `.env.example`.
4. Deploy. Cada aluno entra com a senha padrão e é obrigado a trocá-la no primeiro acesso.
5. Simulados: edite `data/questions.json` (campos: id, disc, topic, fonte, q, opts[], ans (índice 0-based), exp). Os 3 itens atuais são EXEMPLOS.
Teste local: `npm i -g vercel && vercel dev`.
