# 📦 Export de la base de données `bookbuddy`

Ce dossier contient les exports des collections de la base MongoDB `bookbuddy` (fichiers JSON générés via MongoDB Compass).

## 📥 Importer une collection dans MongoDB Compass

1. **Ouvre MongoDB Compass** et connecte-toi à ton cluster Atlas.
2. Dans la colonne de gauche, clique sur la base `bookbuddy`.
3. Clique sur la collection cible (ou crée-la si elle n’existe pas).
4. Clique sur **"Add Data"** puis **"Import File"**.
5. Sélectionne le fichier JSON correspondant (ex : `users.json`).
6. Clique sur **"Import"**.

> Répète ces étapes pour chaque collection à importer.

## 💡 Astuces

- Les fichiers ici sont au format **JSON** (un tableau de documents).
- Les données sont fictives, tu peux les modifier ou les compléter avant import.
- Si tu veux importer via la ligne de commande, utilise par exemple :
