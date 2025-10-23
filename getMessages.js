
import { EdgeConfig } from '@vercel/edge-config';

let edgeConfig = EdgeConfig.fromEnv('SABRINA_CHAT');
export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');
  const password = searchParams.get('password');
  if(password!=='123') return new Response(JSON.stringify({messages:[]}),{status:403});
  const messages = await edgeConfig.get(room) || [];
  return new Response(JSON.stringify({messages}),{status:200});
}
