// PDF + PNG preview render: node tools/render.mjs
import { chromium } from 'playwright';
import sp, { inflate } from '@sparticuz/chromium';
import path from 'path';
const C = sp.default || sp;
await inflate(path.resolve('node_modules/@sparticuz/chromium/bin/al2023.tar.br'));
process.env.LD_LIBRARY_PATH = '/tmp/al2023/lib:/tmp';
const b = await chromium.launch({ executablePath: await C.executablePath(), args: [...C.args, '--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + path.resolve('index.html')); await p.waitForTimeout(800);
await p.pdf({ path: 'Hamyon-API-Pitch.pdf', width: '1920px', height: '1080px', printBackground: true });
const s = await p.$$('.slide');
for (let i = 0; i < s.length; i++) await s[i].screenshot({ path: `/tmp/s${i + 1}.png` });
await b.close(); console.log('done', s.length);
