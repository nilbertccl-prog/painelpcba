import { Redis } from '@upstash/redis';
import { SignJWT, jwtVerify } from 'jose';
export const redis = new Redis({ url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL, token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN });
const key = () => new TextEncoder().encode(process.env.JWT_SECRET);
export const defaults = () => Object.fromEntries((process.env.USERS || '').split(',').filter(Boolean).map(p => { const i = p.indexOf(':'); return [p.slice(0, i).trim().toLowerCase(), p.slice(i + 1).trim()]; }));
export async function setSession(res, email) {
  const t = await new SignJWT({ email }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('7d').sign(key());
  res.setHeader('Set-Cookie', `sess=${t}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`);
}
export async function auth(req) {
  const m = /(?:^|; )sess=([^;]+)/.exec(req.headers.cookie || '');
  if (!m) return null;
  try { const { payload } = await jwtVerify(m[1], key()); return payload.email; } catch { return null; }
}
