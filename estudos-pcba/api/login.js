import bcrypt from 'bcryptjs';
import { redis, defaults, setSession } from './_lib.js';
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const email = String(req.body?.email || '').trim().toLowerCase(), pw = String(req.body?.password || '');
  let u = await redis.get('user:' + email);
  if (!u) {
    if (defaults()[email] && defaults()[email] === pw) { u = { hash: await bcrypt.hash(pw, 10), mustChange: true }; await redis.set('user:' + email, u); }
    else return res.status(401).json({ error: 'E-mail ou senha inválidos' });
  } else if (!(await bcrypt.compare(pw, u.hash))) return res.status(401).json({ error: 'E-mail ou senha inválidos' });
  await setSession(res, email);
  res.json({ ok: true });
};
