import {foods,inputs,bases,articles} from './data.js';
const parents={home:'home',foods:'food',food:'food',inputs:'inputs',input:'inputs',bases:'base',base:'base',articles:'knowledge',article:'knowledge',events:'events',event:'events',about:'about','not-found':'home'};
export function routeUrl(hash){
  if(!hash.startsWith('#'))return hash;
  const [path,search='']=hash.slice(1).split('?');
  const [page,id]=path.split('/');const query=new URLSearchParams(search);let target;
  if(page==='home')target='/';
  else if(page==='foods')target='/foods/';
  else if(page==='food'&&id)target='/foods/'+encodeURIComponent(id)+'/';
  else if(page==='inputs'){target='/inputs/'+(query.get('type')==='feed'?'feed':'fertilizer')+'/';query.delete('type');}
  else if(page==='input'&&id)target='/inputs/products/'+encodeURIComponent(id)+'/';
  else if(page==='bases')target='/bases/';
  else if(page==='base'&&id)target='/bases/'+encodeURIComponent(id)+'/';
  else if(page==='articles')target='/knowledge/';
  else if(page==='article'&&id)target='/knowledge/'+encodeURIComponent(id)+'/';
  else if(page==='events')target='/events/';
  else if(page==='event'&&id)target='/events/'+encodeURIComponent(id)+'/';
  else if(page==='about')target='/about/';
  else return hash;
  return target+(query.size?'?'+query.toString():'');
}
export function readRoute(pathname,search=''){
  const query=Object.fromEntries(new URLSearchParams(search));
  let parts;try{parts=decodeURIComponent(pathname).replace(/\/index\.html$/,'/').split('/').filter(Boolean);}catch{return {page:'not-found',id:null,section:'home',query};}
  let page='not-found',id=null;
  if(!parts.length)page='home';
  else if(parts.length===1)page=({foods:'foods',inputs:'inputs',bases:'bases',knowledge:'articles',events:'events',about:'about'})[parts[0]]||'not-found';
  else if(parts.length===2){const [first,second]=parts;if(first==='inputs'&&['feed','fertilizer'].includes(second)){page='inputs';query.type=second;}else{page=({foods:'food',bases:'base',knowledge:'article',events:'event'})[first]||'not-found';if(page!=='not-found')id=second;}}
  else if(parts.length===3&&parts[0]==='inputs'&&parts[1]==='products'){page='input';id=parts[2];}
  if(page==='inputs'&&!query.type)query.type='fertilizer';
  return {page,id,section:parents[page],query};
}
export function filterFoods(items,{category='all',base='all',search=''}={}){const needle=search.trim().toLowerCase();return items.filter(x=>(category==='all'||x.category===category)&&(base==='all'||x.base===base)&&(!needle||x.name.toLowerCase().includes(needle)));}
export const pagePaths=['/','/foods/','/inputs/','/inputs/fertilizer/','/inputs/feed/','/bases/','/knowledge/','/events/','/about/','/404.html',...foods.map(x=>'/foods/'+x.id+'/'),...inputs.map(x=>'/inputs/products/'+x.id+'/'),...bases.map(x=>'/bases/'+x.id+'/'),...articles.map(x=>'/knowledge/'+x.id+'/'),'/events/layout-example/'];
export const baseTabs=[['intro','基地介绍'],['process','生产过程'],['management','日常管理'],['monitoring','指标监测'],['foods','关联食材']];
