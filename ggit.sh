#!/bin/bash

LOG_FILE="./git.log"

echo "=== Git script lancé à $(date) ===" > "$LOG_FILE"

{
  echo "[INFO] Remote(s) configuré(s) :"
  git remote -v

  echo -e "\n[INFO] État du dépôt :"
  git status

  echo -e "\n[INFO] Passage à la branche main :"
  git checkout main

  echo -e "\n[INFO] Pull des dernières modifications :"
  git pull origin main

  echo -e "\n[INFO] Ajout des fichiers modifiés :"
  git add .

  echo -e "\n[INFO] Commit avec message : feat: $1"
  git commit -m "feat: $1"

  echo -e "\n[INFO] Push vers GitHub :"
  git push origin main

  echo -e "\n=== Script terminé avec succès ==="
} >> "$LOG_FILE" 2>&1

echo "✅ Script terminé. Voir le fichier de log : $LOG_FILE"