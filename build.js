// Génère index.html (page complète pour GitHub Pages) à partir de carnet-de-lecture.html.
const fs = require("fs");
const src = fs.readFileSync(__dirname + "/carnet-de-lecture.html", "utf8");
const html = '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n' + src + '\n</body>\n</html>\n';
fs.writeFileSync(__dirname + "/index.html", html);
console.log("index.html généré (" + html.length + " octets)");
