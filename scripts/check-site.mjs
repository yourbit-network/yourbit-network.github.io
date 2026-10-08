import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files;
}
const files = await walk(root);
const html = new Map();
for (const file of files.filter(f => f.endsWith('.html'))) html.set(file, await readFile(file, 'utf8'));
assert.equal((await readFile(path.join(root, 'CNAME'), 'utf8')).trim(), 'yourbit.network');
assert.deepEqual(await readFile(path.join(root, '.well-known/nostr.json')), await readFile('public/.well-known/nostr.json'));
assert(files.some(f => f.endsWith('/.nojekyll')));
for (const required of ['index.html', 'privacy.html', 'tos.html', '404.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'og-image.png', 'apple-touch-icon.png']) {
  assert(files.includes(path.join(root, required)), `Missing ${required}`);
}
let links = 0;
for (const [file, content] of html) {
  const label = path.relative(root, file);
  assert.equal((content.match(/<h1\b/g) ?? []).length, 1, `${label}: exactly one h1`);
  assert.match(content, /<html lang="en"/);
  assert.match(content, /<title>.+?<\/title>/);
  assert.match(content, /name="description" content="[^"]+"/);
  assert.match(content, /facebook-domain-verification/);
  assert(!/<script\b/i.test(content), `${label}: public pages should work without scripts`);
  for (const [, source] of content.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:)/.test(source)) continue;
    const relative = path.relative(root, file);
    const url = new URL(source, `https://yourbit.network/${relative === 'index.html' ? '' : relative}`);
    const pathname = decodeURIComponent(url.pathname);
    const direct = path.join(root, pathname);
    const target = [direct, `${direct}.html`, path.join(direct, 'index.html')].find(f => files.includes(f));
    assert(target, `${label}: missing link target ${source}`);
    if (url.hash && html.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(html.get(target).includes(`id="${id}"`), `${label}: missing anchor ${source}`);
    }
    links++;
  }
  assert((await stat(file)).size < 90_000, `${label}: HTML budget exceeded`);
}
const styles = files.filter(f => f.endsWith('.css'));
let styleBytes = 0;
for (const file of styles) styleBytes += (await stat(file)).size;
assert(styleBytes < 40_000, 'Stylesheet budget exceeded');
assert.match(html.get(path.join(root, '404.html')), /name="robots" content="noindex"/);
console.log(`Validated ${html.size} pages, ${links} local links/assets, domain metadata, verification file, and size budgets.`);
