import { readFileSync } from 'fs';
import { join } from 'path';
import { redis, auth } from './_lib.js';
export default async (req, res) => {
  const email = await auth(req); if (!email) return res.status(401).json({ error: 'Não autenticado' });
  const u = await redis.get('user:' + email); if (!u || u.mustChange) return res.status(403).json({ error: 'Troque a senha' });
  const f = n => JSON.parse(readFileSync(join(process.cwd(), 'data', n), 'utf8'));
  res.json({ docs: f('docs.json'), questions: f('questions.json') });
};
