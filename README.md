# Carnet de lecture

Une application web pour résumer n'importe quel texte : livre, article, cours, rapport, notes.

- **Photographiez les pages** ou **collez le texte**. Les photos sont lues directement dans le navigateur (OCR Tesseract), sans IA et sans serveur.
- **8 langues** : français, anglais, espagnol, italien, allemand, latin, grec ancien, grec moderne.
- Les pages sont **rangées par chapitre ou par partie** (détection automatique des titres « Chapitre 3 », « Kapitel », « Caput »…) avec leur **numéro de page**.
- **Fiches de synthèse par IA**, rédigées sur l'appareil (WebLLM, modèle Qwen 2.5, aucun envoi sur internet) : contexte, grandes parties numérotées, mots-clés surlignés, chiffres et dates, encadré « À retenir ». Une fiche par page, une fiche par chapitre construite à partir des fiches des pages, et une fiche pour le document entier. Trois longueurs : court, moyen, détaillé. Demande un navigateur avec WebGPU (Chrome, Edge, Safari sur iOS 26+).
- **Traduction** de chaque page ou de tout un chapitre par la même IA, vers le français, l'anglais, l'espagnol, l'italien ou l'allemand (y compris depuis le latin et le grec). Les fiches peuvent aussi être rédigées dans ces langues.
- **Repères** trouvés sans IA : dates, noms, références et notes de bas de page, avec leurs pages.
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

## Installer comme une application

- **iPhone** : ouvrir le site dans Safari → bouton Partager → « Sur l'écran d'accueil ».
- **Android** : ouvrir le site dans Chrome → menu ⋮ → « Installer l'application » (ou « Ajouter à l'écran d'accueil »).

Quand une nouvelle version est publiée, un bandeau « Nouvelle version disponible » apparaît avec un bouton **Mettre à jour**. En bas de la bibliothèque, « Vérifier les mises à jour » affiche la version installée. `node build.js` met la date et l'heure de la publication dans `version.json`.
