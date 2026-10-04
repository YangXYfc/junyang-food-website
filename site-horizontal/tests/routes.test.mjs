import test from 'node:test';
import assert from 'node:assert/strict';
import {routeUrl,readRoute,filterFoods,pagePaths} from '../dist/routes.js';

test('product and category links open real pages with their query intact',()=>{
  assert.equal(routeUrl('#food/leafy-greens'),'/foods/leafy-greens/');
  assert.equal(routeUrl('#foods?category=fruit&base=plant'),'/foods/?category=fruit&base=plant');
  assert.equal(routeUrl('#base/plant?tab=monitoring'),'/bases/plant/?tab=monitoring');
  assert.equal(routeUrl('#article/principles'),'/knowledge/principles/');
});
test('fertilizer and feed have separate physical paths',()=>{
  assert.equal(routeUrl('#inputs?type=feed'),'/inputs/feed/');
  assert.equal(routeUrl('#inputs?type=fertilizer'),'/inputs/fertilizer/');
  assert.equal(readRoute('/inputs/feed/','').query.type,'feed');
  assert.equal(readRoute('/inputs/fertilizer/','').query.type,'fertilizer');
});
test('refresh identifies parent and keeps directly supplied filters',()=>{
  assert.deepEqual(readRoute('/foods/','?category=fruit&search=%E7%93%9C'),{page:'foods',id:null,section:'food',query:{category:'fruit',search:'瓜'}});
  assert.equal(readRoute('/bases/plant/','?tab=process').id,'plant');
  assert.equal(readRoute('/knowledge/principles/','').section,'knowledge');
});
test('malformed or unrelated paths are recoverable without throwing',()=>{
  assert.equal(readRoute('/%ZZ/','').page,'not-found');
  assert.equal(readRoute('/foods/x/extra/','').page,'not-found');
  assert.equal(readRoute('/unrelated/','').page,'not-found');
  assert.equal(routeUrl('#reports'),'#reports');
});
test('combined food search does not leak another category or base',()=>{
  const rows=[{name:'瓜果示意',category:'fruit',base:'plant'},{name:'家禽示意',category:'poultry',base:'animal'}];
  assert.deepEqual(filterFoods(rows,{category:'fruit',base:'animal'}),[]);
  assert.equal(filterFoods(rows,{search:' 瓜果 '}).length,1);
  assert.equal(filterFoods(rows,{}).length,2);
});
test('generated addresses cover separate product and nested detail pages',()=>{
  for(const p of ['/','/foods/','/inputs/fertilizer/','/inputs/feed/','/bases/plant/','/knowledge/principles/','/events/layout-example/','/404.html'])assert.ok(pagePaths.includes(p),p);
  assert.equal(new Set(pagePaths).size,pagePaths.length);
});
