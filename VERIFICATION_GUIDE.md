# Guide de Vérification - Variables d'Environnement et Tests

## 🔍 1. Vérifier les Variables d'Environnement sur Render

### **Dashboard Render - Backend Service**

1. **Accéder au dashboard Render :**
   - Aller sur https://dashboard.render.com
   - Se connecter à votre compte
   - Sélectionner le service `aifb-backend`

2. **Vérifier les variables d'environnement :**
   - Cliquer sur "Environment" dans le menu
   - Vérifier que toutes ces variables sont présentes :

#### **Variables PostgreSQL Requises :**
```
DATABASE_HOST=your-postgres-host.render.com
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true
```

#### **Variables Strapi Requises :**
```
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=your-app-keys
TRANSFER_TOKEN_SALT=your-transfer-token-salt
```

#### **Variables d'Environnement :**
```
NODE_ENV=production
PORT=1338
```

### **Actions à effectuer :**

1. **Si des variables manquent :**
   - Cliquer sur "Add Environment Variable"
   - Ajouter les variables manquantes
   - Redéployer le service

2. **Si les variables PostgreSQL sont incorrectes :**
   - Vérifier les informations de votre base PostgreSQL
   - Mettre à jour les valeurs
   - Redéployer

## 📋 2. Consulter les Logs du Service Backend

### **Accéder aux logs :**

1. **Dans le dashboard Render :**
   - Sélectionner le service `aifb-backend`
   - Cliquer sur "Logs" dans le menu

2. **Types de logs à vérifier :**
   - **Build Logs** : Erreurs lors du déploiement
   - **Runtime Logs** : Erreurs d'exécution
   - **Live Logs** : Logs en temps réel

### **Erreurs courantes à rechercher :**

```
❌ "Connection refused" → Problème de connexion PostgreSQL
❌ "Authentication failed" → Mauvais identifiants
❌ "Database does not exist" → Base non créée
❌ "SSL connection required" → SSL non configuré
❌ "Module not found" → Dépendances manquantes
```

### **Actions à effectuer :**

1. **Si erreur de connexion PostgreSQL :**
   - Vérifier que la base PostgreSQL est active
   - Vérifier les variables DATABASE_*
   - Redémarrer le service

2. **Si erreur de dépendances :**
   - Vérifier le package.json
   - Redéployer avec `npm install`

## 🧪 3. Tester les Nouvelles Pages Localement

### **Prérequis :**
```bash
# Vérifier Node.js
node --version  # Doit être >= 18

# Vérifier npm
npm --version

# Installer les dépendances
npm install
```

### **Lancer le serveur de développement :**
```bash
# Démarrer le serveur
npm run dev

# Le serveur devrait démarrer sur http://localhost:3000
```

### **Pages à tester :**

1. **Page principale du plan de semaine :**
   - URL : http://localhost:3000/plan-semaine
   - Vérifier : Design, animations, boutons

2. **Page de visualisation :**
   - URL : http://localhost:3000/plan-semaine/voir
   - Vérifier : Cartes de recettes, liste de courses

### **Tests à effectuer :**

#### **Test de la page principale :**
- [ ] La page se charge correctement
- [ ] Les animations fonctionnent
- [ ] Le bouton "Découvrir mon plan" fonctionne
- [ ] Les statistiques s'affichent
- [ ] Les témoignages sont visibles

#### **Test de la page de visualisation :**
- [ ] Le plan de semaine s'affiche
- [ ] Les 7 recettes sont présentes
- [ ] Les cartes sont interactives (likes)
- [ ] La liste de courses est organisée
- [ ] Les boutons de téléchargement sont présents

### **Vérification du responsive :**
- [ ] Tester sur mobile (375px)
- [ ] Tester sur tablette (768px)
- [ ] Tester sur desktop (1920px)

## 🔧 4. Diagnostic Automatique

### **Script de diagnostic :**
```bash
# Lancer le diagnostic
node check-render-db.js
```

### **Test de connectivité manuel :**
```bash
# Test simple
curl https://aifb-backend.onrender.com/_health

# Test des recettes
curl https://aifb-backend.onrender.com/api/recipies
```

## 🚨 5. Problèmes Courants et Solutions

### **Problème : Pages ne se chargent pas**
**Solution :**
- Vérifier que le serveur de développement fonctionne
- Vérifier les erreurs dans la console du navigateur
- Vérifier les erreurs dans le terminal

### **Problème : Erreurs de build**
**Solution :**
```bash
# Nettoyer le cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### **Problème : Variables d'environnement non reconnues**
**Solution :**
- Créer un fichier `.env.local` avec les variables
- Redémarrer le serveur de développement

### **Problème : Backend inaccessible**
**Solution :**
- Vérifier l'URL dans `render.yaml`
- Vérifier que le service backend est actif
- Vérifier les logs Render

## 📞 6. Support et Escalation

### **Si les problèmes persistent :**

1. **Capturer les erreurs :**
   - Screenshots des erreurs
   - Logs complets
   - URL des pages problématiques

2. **Vérifier la configuration :**
   - Variables d'environnement
   - Configuration Render
   - Code source

3. **Contacter le support :**
   - Support Render pour les problèmes d'infrastructure
   - Documentation technique pour les problèmes de code

## ✅ 7. Checklist de Validation

### **Variables d'environnement :**
- [ ] Toutes les variables PostgreSQL sont configurées
- [ ] Toutes les variables Strapi sont configurées
- [ ] Les valeurs sont correctes
- [ ] Le service a été redéployé

### **Logs :**
- [ ] Pas d'erreurs dans les build logs
- [ ] Pas d'erreurs dans les runtime logs
- [ ] Le service démarre correctement
- [ ] Les endpoints répondent

### **Pages locales :**
- [ ] Le serveur de développement démarre
- [ ] Les pages se chargent correctement
- [ ] Les fonctionnalités sont interactives
- [ ] Le design est responsive

### **Backend :**
- [ ] Le service est accessible
- [ ] Les API répondent
- [ ] La base de données est connectée
- [ ] Les données sont disponibles 