import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const decoded=decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+(decoded==='/'?'/index.html':decoded));if(!file.startsWith(root)){res.writeHead(403);res.end('Forbidden');return;}if(!(await stat(file)).isFile())throw Error('missing');const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
