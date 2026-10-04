import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRoute, filterFoods, activeSectionAtLine } from '../dist/logic.js';

test('section anchors remain home pages; product links preserve category query', () => {
  assert.deepEqual(parseRoute('#section/base'), {page:'home', section:'base', id:null, query:{}});
  assert.deepEqual(parseRoute('#foods?category=vegetables&base=plant'), {page:'foods', section:null, id:null, query:{category:'vegetables',base:'plant'}});
});
test('detail refresh resolves parent page and encoded IDs safely', () => {
  assert.equal(parseRoute('#food/leafy-greens').id, 'leafy-greens');
  assert.equal(parseRoute('#input/bio-fertilizer').page, 'input');
  assert.equal(parseRoute('#bad/%E0%A4%A').page, 'not-found');
});
test('unknown paths and unknown section names render a recoverable missing page', () => {
  assert.equal(parseRoute('#admin/delete').page, 'not-found');
  assert.equal(parseRoute('#section/payments').page, 'not-found');
  assert.equal(parseRoute('').page, 'home');
});
const foods=[{id:'a',category:'vegetables',base:'plant',name:'蔬菜示意'}, {id:'b',category:'poultry',base:'animal',name:'家禽示意'}];
test('combined category and base filters never leak unrelated products', () => {
  assert.deepEqual(filterFoods(foods,{category:'poultry',base:'plant'}),[]);
  assert.deepEqual(filterFoods(foods,{category:'poultry',base:'animal'}).map(x=>x.id),['b']);
  assert.equal(filterFoods(foods,{}).length,2);
});
test('search is trimmed and reset returns the complete set', () => {
  assert.deepEqual(filterFoods(foods,{search:' 家禽 '}).map(x=>x.id),['b']);
  assert.equal(filterFoods(foods,{category:'all',base:'all',search:''}).length,2);
});
test('scroll highlighting follows reading line and keeps last section at bottom', () => {
  const sections=[{id:'home',top:-800,bottom:-100},{id:'food',top:-100,bottom:600},{id:'inputs',top:600,bottom:1100}];
  assert.equal(activeSectionAtLine(sections,900,false),'food');
  assert.equal(activeSectionAtLine(sections,900,true),'inputs');
  assert.equal(activeSectionAtLine([],900,false),'home');
});
