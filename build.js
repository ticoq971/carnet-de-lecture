// Génère le site pour GitHub Pages à partir de carnet-de-lecture.html :
//  - index.html (page complète, installable comme application)
//  - version.json (numéro de version lu par le bouton « Mettre à jour »)
//  - manifest.webmanifest et icônes
const fs = require("fs");
const zlib = require("zlib");
const dir = __dirname;

const d = new Date();
const p = n => String(n).padStart(2, "0");
const version = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;

const src = fs.readFileSync(dir + "/carnet-de-lecture.html", "utf8").replace('const APP_VERSION = "__VERSION__";', `const APP_VERSION = "${version}";`);
const head = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#2d3c9c">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Carnet">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="icon-180.png">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;
fs.writeFileSync(dir + "/index.html", head + src + "\n</body>\n</html>\n");
fs.writeFileSync(dir + "/version.json", JSON.stringify({ version }) + "\n");
fs.writeFileSync(dir + "/manifest.webmanifest", JSON.stringify({
  name: "Carnet de lecture", short_name: "Carnet", lang: "fr",
  description: "Photographiez vos pages : lecture, fiches de synthèse et traduction, sur votre appareil.",
  start_url: "./", scope: "./", display: "standalone", background_color: "#eceee9", theme_color: "#2d3c9c",
  icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }],
}, null, 2) + "\n");

// Icône : un livre ouvert blanc sur fond indigo (dessinée pixel par pixel, sans dépendance)
function png(size) {
  const px = Buffer.alloc(size * size * 4);
  const set = (x, y, [r, g, b]) => { const i = (y * size + x) * 4; px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255; };
  const bg = [45, 60, 156], white = [250, 251, 248], line = [190, 198, 232], spine = [210, 214, 236], hl = [246, 214, 64];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / size, v = y / size;
    let c = bg;
    const sag = 0.03 * Math.sin(Math.PI * Math.abs(u - 0.5) / 0.32); // pages légèrement creusées
    const top = 0.27 + (u < 0.5 ? sag : sag), bot = 0.73 + sag * 0.5;
    if (u > 0.18 && u < 0.82 && v > top && v < bot) {
      c = white;
      if (Math.abs(u - 0.5) < 0.008) c = spine;
      const inL = u > 0.25 && u < 0.45, inR = u > 0.55 && u < 0.75;
      for (let k = 0; k < 5; k++) { const ly = top + 0.07 + k * 0.075; if ((inL || inR) && Math.abs(v - ly) < 0.011) c = (k === 1 && inR) ? hl : line; }
    }
    set(x, y, c);
  }
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) { raw[y * (size * 4 + 1)] = 0; px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4); }
  const crcT = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crcT[n] = c >>> 0; }
  const crc = b => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
for (const s of [180, 192, 512]) fs.writeFileSync(`${dir}/icon-${s}.png`, png(s));

console.log("Site généré, version " + version);
