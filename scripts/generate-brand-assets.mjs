import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const mark = await readFile(new URL('../public/favicon.svg', import.meta.url));
await sharp(mark).resize(180, 180).png().toFile('public/apple-touch-icon.png');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><radialGradient id="glow"><stop stop-color="#173b5d"/><stop offset="1" stop-color="#07090e"/></radialGradient></defs>
<rect width="1200" height="630" fill="#07090e"/><ellipse cx="950" cy="300" rx="450" ry="430" fill="url(#glow)"/>
<path d="M80 160H1120" stroke="#ffffff18"/>
<rect x="80" y="66" width="54" height="54" rx="14" fill="#132638"/>
<path d="M92 77h12v12H92zm19 0h12v12h-12zm-6 12h12v12h-12zm0 12h12v12h-12z" fill="#67d2ff"/>
<g font-family="Arial,Helvetica,sans-serif"><text x="153" y="108" font-size="43" font-weight="700" fill="#f8fafc">yourbit<tspan fill="#38bdf8">.</tspan></text>
<text x="80" y="265" font-size="20" letter-spacing="3" fill="#a8b5c8">INDEPENDENT SOFTWARE &amp; ENGINEERING</text>
<text x="76" y="371" font-size="76" font-weight="700" letter-spacing="-3" fill="#f8fafc">Thoughtful software.</text>
<text x="76" y="459" font-size="76" font-weight="700" letter-spacing="-3" fill="#7dd3fc">Useful by design.</text>
<text x="80" y="563" font-size="20" fill="#a8b5c8">yourbit.network</text></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('Generated Yourbit app icon and social preview.');
