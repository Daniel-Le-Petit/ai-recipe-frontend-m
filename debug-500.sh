#!/bin/bash

echo "🔍 Diagnostic de l'erreur 500..."

echo "1. Vérification des processus Next.js..."
ps aux | grep "next dev" | grep -v grep

echo "2. Vérification du port 3001..."
netstat -tlnp | grep :3001 || echo "Port 3001 non trouvé"

echo "3. Test de connexion..."
curl -v http://localhost:3001 2>&1 | head -10

echo "4. Vérification des logs Next.js..."
echo "Regardez la console où vous avez lancé 'npm run dev' pour les erreurs détaillées"

echo "5. Vérification des dépendances..."
npm list web-vitals 2>/dev/null || echo "web-vitals non installé"

echo "6. Vérification de l'API Strapi..."
curl -s http://localhost:1338/api/recipie-categories >/dev/null && echo "API Strapi accessible" || echo "API Strapi non accessible"

echo "✅ Diagnostic terminé" 