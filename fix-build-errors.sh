#!/bin/bash

echo "🔧 Correction des erreurs de build..."

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

# Installer les dépendances mises à jour
echo "📦 Installation des dépendances..."
npm install

# Vérifier les types TypeScript
echo "🔍 Vérification des types..."
npm run type-check

# Linter pour corriger les erreurs automatiquement
echo "🎨 Correction automatique du linting..."
npm run lint:fix

# Build de test
echo "🏗️ Test de build..."
npm run build

echo "✅ Correction terminée !"
echo "🚀 Vous pouvez maintenant démarrer l'application avec: npm run dev" 