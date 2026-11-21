# Carnet de lecture

Une application web pour résumer n'importe quel texte : livre, article, cours, rapport, notes.

- **Photographiez les pages** ou **collez le texte**. Les photos sont lues directement dans le navigateur (OCR Tesseract), sans IA et sans serveur.
- **8 langues** : français, anglais, espagnol, italien, allemand, latin, grec ancien, grec moderne.
- Les pages sont **rangées par chapitre ou par partie** (détection automatique des titres « Chapitre 3 », « Kapitel », « Caput »…) avec leur **numéro de page**.
- **Résumés** d'une page, d'un chapitre ou du document entier, en trois longueurs (court, moyen, détaillé) : points importants, dates, noms cités, moments marquants, références et notes de bas de page, chacun avec ses pages.
- **Recherche** dans un chapitre : les passages qui répondent le mieux, avec leur page.
- **Exporter / Importer** pour passer ses documents d'un appareil à l'autre.

Les documents sont enregistrés dans le navigateur de l'appareil (aucune donnée envoyée).

## En ligne

https://ticoq971.github.io/carnet-de-lecture/

## Fichiers

- `carnet-de-lecture.html` : la source de l'application (page unique).
- `index.html` : généré par `node build.js` pour GitHub Pages.
- `tess/` : moteur OCR [Tesseract.js](https://github.com/naptha/tesseract.js) 5.1.1 (licence Apache 2.0) et données de langue `tessdata` (`lang-xxx.wasm` = fichiers `xxx.traineddata.gz` renommés). `worker-relais.js` redirige les noms de fichiers.

Après une modification de `carnet-de-lecture.html`, lancer `node build.js` puis committer.
