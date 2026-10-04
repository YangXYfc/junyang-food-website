import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {pagePaths,readRoute} from '../dist/routes.js';
import {renderDocument} from '../dist/components.js';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
for(const path of pagePaths){const file=path.endsWith('.html')?join(root,path.slice(1)):join(root,path.slice(1),'index.html');await mkdir(join(file,'..'),{recursive:true});await writeFile(file,renderDocument(readRoute(path)));}
console.log(`Generated ${pagePaths.length} independent pages in dist.`);
