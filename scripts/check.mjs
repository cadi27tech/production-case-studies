// Repo checks, run in CI: ASCII dashes only, a wide and a phone drawing per case, every relative link resolves.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const fail = [];
const md = ['README.md', ...readdirSync(join(root, 'cases')).map((f) => join('cases', f))];
for (const f of md) {
  const text = readFileSync(join(root, f), 'utf8');
  text.split('\n').forEach((l, i) => { if (/[\u2012-\u2015]/.test(l)) fail.push(`${f}:${i + 1}: en or em dash`); });
  for (const [, target] of text.matchAll(/(?:\]\(|srcset="|src=")(?!https?:|#|mailto:)([^)"\s]+)/g)) {
    if (!existsSync(join(root, dirname(f), target))) fail.push(`${f}: broken link ${target}`);
  }
}
for (const f of readdirSync(join(root, 'cases'))) {
  const slug = f.replace(/^\d+-|\.md$/g, '');
  for (const s of ['', '-m']) if (!existsSync(join(root, 'drawings', `${slug}${s}.svg`))) fail.push(`${f}: missing drawings/${slug}${s}.svg`);
}
for (const f of readdirSync(join(root, 'drawings'))) {
  const svg = readFileSync(join(root, 'drawings', f), 'utf8');
  if (/<script|href="http/.test(svg)) fail.push(`drawings/${f}: scripts or external references`);
}
console.log(fail.length ? fail.join('\n') : `ok: ${md.length} documents, ${readdirSync(join(root, 'drawings')).length} drawings`);
process.exit(fail.length ? 1 : 0);
