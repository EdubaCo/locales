#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('.', import.meta.url).pathname;
const EN_DIR = join(ROOT, 'en');

function getKeys(p) {
  return new Set(Object.keys(JSON.parse(readFileSync(p, 'utf8'))));
}
function getNamespaces(dir) {
  return readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
}

let failed = false;
const enNs = getNamespaces(EN_DIR);
const locales = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'en')
  .map((d) => d.name).sort();

for (const locale of locales) {
  const dir = join(ROOT, locale);
  for (const ns of enNs) {
    const lp = join(dir, ns);
    if (!existsSync(lp)) { console.error(`MISSING  ${locale}/${ns}`); failed = true; continue; }
    const miss = [...getKeys(join(EN_DIR, ns))].filter((k) => !getKeys(lp).has(k));
    const ext  = [...getKeys(lp)].filter((k) => !getKeys(join(EN_DIR, ns)).has(k));
    if (miss.length) { console.error(`MISSING KEYS in ${locale}/${ns}:`, miss); failed = true; }
    if (ext.length)  { console.error(`EXTRA KEYS in ${locale}/${ns}:`, ext);  failed = true; }
  }
  const extraNs = getNamespaces(dir).filter((ns) => !enNs.includes(ns));
  if (extraNs.length) { console.error(`EXTRA NAMESPACES in ${locale}/:`, extraNs); failed = true; }
}

if (failed) { console.error('\nKey parity check FAILED.'); process.exit(1); }
console.log(`Key parity PASSED (${locales.length} locale(s), ${enNs.length} namespace(s)).`);
