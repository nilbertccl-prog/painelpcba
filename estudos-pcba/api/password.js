import bcrypt from 'bcryptjs';
import { redis, auth, defaults } from './_lib.js';
export default async (req, res) => {
  const email = await auth(req); if (!email) return res.status(401).json({ error: 'Não autenticado' });
  const { current = '', next = '' } = req.body || {}; const u = await redis.get('user:' + email);
  if (!u || !(await bcrypt.compare(current, u.hash))) return res.status(400).json({ error: 'Senha atual incorreta' });
  if (next.length < 8 || next === current || next === defaults()[email]) return res.status(400).json({ error: 'Nova senha: mínimo 8 caracteres e diferente da padrão' });
  await redis.set('user:' + email, { hash: await bcrypt.hash(next, 10), mustChange: false });
  res.json({ ok: true });
};
