import {foods,bases} from './data.js';
import {readRoute,filterFoods,baseTabs} from './routes.js';
import {renderContent,cards,convert} from './content.js';
import {basePanel,emptyState} from './legacy-content.js';
import {subnav} from './components.js';
let route=readRoute(location.pathname,location.search);
// Preserve query-driven content when arriving at a directly opened static page.
const shell=document.querySelector('.page-shell');
if(shell&&['foods','bases','articles','events','base'].includes(route.page)&&location.search){shell.outerHTML=renderContent(route);}
const columnNav=document.querySelector('.subnav');
if(columnNav&&location.search)columnNav.outerHTML=subnav(route);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav');
function setMenu(open){nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);document.querySelector('main').inert=open;document.querySelector('.site-footer').inert=open;if(!open)menu.focus();}
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.nav-item details[open]').forEach(x=>{x.open=false;x.querySelector('summary').focus();});if(menu.getAttribute('aria-expanded')==='true')setMenu(false);}if(e.key==='Tab'&&menu.getAttribute('aria-expanded')==='true'){const list=[menu,...nav.querySelectorAll('a,summary')].filter(x=>x.getClientRects().length);if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0].focus();}}});
document.addEventListener('click',e=>{document.querySelectorAll('.nav-item details[open]').forEach(x=>{if(!x.parentElement.contains(e.target))x.open=false;});});
const desktop=matchMedia('(min-width:761px)');desktop.addEventListener('change',()=>{if(menu.getAttribute('aria-expanded')==='true')setMenu(false);});
function updateUrl(query){const url=new URL(location.href);url.search='';for(const [k,v] of Object.entries(query))if(v&&v!=='all')url.searchParams.set(k,v);history.replaceState(null,'',url);route=readRoute(location.pathname,location.search);}
const filters=document.querySelector('#food-filters');
function updateFoods(){const query=Object.fromEntries(new FormData(filters)),items=filterFoods(foods,query);updateUrl(query);document.querySelector('#food-grid').innerHTML=items.length?cards(items):convert(emptyState('暂无匹配食材','请更换条件或重置筛选。'));document.querySelector('#food-count').textContent=`共 ${items.length} 项食材`;document.querySelectorAll('.subnav a').forEach(a=>{const q=new URL(a.href).searchParams.get('category')||'all';if(q===query.category)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
if(filters){filters.addEventListener('submit',e=>{e.preventDefault();updateFoods();});filters.addEventListener('input',updateFoods);filters.addEventListener('reset',e=>{e.preventDefault();for(const el of filters.elements){if(el.tagName==='SELECT')el.value='all';if(el.tagName==='INPUT')el.value='';}updateFoods();});}
const eventFilters=document.querySelector('#event-filters');function updateEvents(){const q=Object.fromEntries(new FormData(eventFilters));updateUrl(q);document.querySelector('#event-count').textContent=`${q.risk==='all'?'全部类型':q.risk==='metal'?'重金属':'农药残留'}${q.year?' · '+q.year+'年':''}：事件资料整理中，暂未收录真实事件。`;}
if(eventFilters){eventFilters.addEventListener('submit',e=>{e.preventDefault();updateEvents();});eventFilters.addEventListener('input',updateEvents);eventFilters.addEventListener('reset',e=>{e.preventDefault();eventFilters.elements.risk.value='all';eventFilters.elements.year.value='';updateEvents();});}
const tabButtons=[...document.querySelectorAll('[data-base-tab]')];
function selectTab(id,push=false){const x=bases.find(x=>x.id===route.id);if(!x)return;id=baseTabs.some(x=>x[0]===id)?id:'intro';for(const b of tabButtons){const active=b.dataset.baseTab===id;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;}const panel=document.querySelector('#base-panel');panel.innerHTML=convert(basePanel(x,id));panel.setAttribute('aria-labelledby','base-tab-'+id);if(push){const url=new URL(location.href);url.searchParams.set('tab',id);history.pushState(null,'',url);}route=readRoute(location.pathname,location.search);}
tabButtons.forEach((b,i)=>{b.addEventListener('click',()=>selectTab(b.dataset.baseTab,true));b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabButtons.length;if(e.key==='ArrowLeft')next=(i+tabButtons.length-1)%tabButtons.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabButtons.length-1;if(next!==undefined){e.preventDefault();tabButtons[next].focus();selectTab(tabButtons[next].dataset.baseTab,true);}});});
addEventListener('popstate',()=>selectTab(new URLSearchParams(location.search).get('tab')));
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&'IntersectionObserver' in window){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');observer.unobserve(x.target);}}),{threshold:.08});document.querySelectorAll('.home-section').forEach(x=>observer.observe(x));}
