import { redis, auth } from './_lib.js';
export default async (req, res) => {
  const email = await auth(req); if (!email) return res.status(401).json({ error: 'Não autenticado' });
  if (JSON.stringify(req.body || {}).length > 400000) return res.status(413).json({ error: 'Grande demais' });
  await redis.set('progress:' + email, req.body || {}); res.json({ ok: true });
};
