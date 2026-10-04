const sections = new Set(['home','food','inputs','base','knowledge','events']);
const pages = new Set(['foods','inputs','bases','articles','events','about']);
const details = new Set(['food','input','base','article','event']);
export function parseRoute(hash = '') {
  let path, query;
  try {
    const raw = hash.replace(/^#\/?/,'');
    const [part, search = ''] = raw.split('?');
    path = decodeURIComponent(part || 'home');
    query = Object.fromEntries(new URLSearchParams(search));
  } catch { return {page:'not-found', section:null, id:null, query:{}}; }
  const [page,id,...rest] = path.split('/');
  if (!rest.length && page === 'section' && sections.has(id)) return {page:'home',section:id,id:null,query};
  if (!rest.length && page === 'home' && !id) return {page:'home',section:null,id:null,query};
  if (!rest.length && pages.has(page) && !id) return {page,section:null,id:null,query};
  if (!rest.length && details.has(page) && id && /^[a-z0-9-]+$/.test(id)) return {page,section:null,id,query};
  return {page:'not-found',section:null,id:null,query:{}};
}
export function filterFoods(items, {category='all',base='all',search=''} = {}) {
  const term=search.trim().toLowerCase();
  return items.filter(x=>(category==='all'||x.category===category) && (base==='all'||x.base===base) && (!term||x.name.toLowerCase().includes(term)));
}
export function activeSectionAtLine(boxes, viewportHeight, atBottom) {
  if (!boxes.length) return 'home';
  if (atBottom) return boxes.at(-1).id;
  const line = viewportHeight * .35;
  const match=boxes.find(x=>x.top<=line && x.bottom>line);
  return match?.id || (line<boxes[0].top ? boxes[0].id : boxes.at(-1).id);
}
