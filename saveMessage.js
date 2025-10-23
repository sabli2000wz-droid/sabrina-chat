
import { EdgeConfig } from '@vercel/edge-config';

let edgeConfig = EdgeConfig.fromEnv('SABRINA_CHAT');
export default async function handler(req) {
  if(req.method==='POST'){
    const {room,password,sender,text} = await req.json();
    if(password!=='123') return new Response(JSON.stringify({error:'密码错误'}),{status:403});
    let messages = await edgeConfig.get(room) || [];
    messages.push({sender,text,self:sender==='你',ts:new Date().toISOString()});
    await edgeConfig.set(room,messages);
    return new Response(JSON.stringify({ok:true}),{status:200});
  }
  return new Response('Not found',{status:404});
}
