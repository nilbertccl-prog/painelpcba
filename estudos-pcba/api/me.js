import { redis, auth } from './_lib.js';
export default async (req, res) => {
  const email = await auth(req); if (!email) return res.status(401).json({ error: 'Não autenticado' });
  const u = await redis.get('user:' + email); if (!u) return res.status(401).json({ error: 'Não autenticado' });
  res.json({ email, mustChange: !!u.mustChange, progress: (await redis.get('progress:' + email)) || {} });
};
