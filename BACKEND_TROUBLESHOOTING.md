# Guide de Dépannage - Backend Strapi

## 🚨 Problème Identifié

Le backend Strapi n'est pas accessible. Voici les étapes pour diagnostiquer et résoudre le problème.

## 🔍 Diagnostic Étape par Étape

### **1. Vérifier l'état du service backend**

#### **Dans le terminal (backend-js) :**
```bash
# Aller dans le dossier backend
cd ../backend-js

# Vérifier si Strapi est en cours d'exécution
ps aux | grep strapi
# ou sur Windows
tasklist | findstr node
```

#### **Dans le dashboard Render :**
1. Aller sur https://dashboard.render.com
2. Sélectionner le service `aifb-backend`
3. Vérifier le statut : doit être "Live" (vert)
4. Si "Failed" (rouge) → Voir les logs

### **2. Vérifier les logs Render**

#### **Accéder aux logs :**
- Dashboard Render → Service `aifb-backend` → Logs
- Vérifier les **Build Logs** et **Runtime Logs**

#### **Erreurs courantes à rechercher :**

```
❌ "Connection refused" → Problème PostgreSQL
❌ "Authentication failed" → Mauvais identifiants DB
❌ "Database does not exist" → Base non créée
❌ "Module not found" → Dépendances manquantes
❌ "Port already in use" → Conflit de port
❌ "ENOENT" → Fichiers manquants
```

### **3. Vérifier les Variables d'Environnement**

#### **Variables PostgreSQL requises :**
```
DATABASE_HOST=your-postgres-host.render.com
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true
```

#### **Variables Strapi requises :**
```
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=your-app-keys
TRANSFER_TOKEN_SALT=your-transfer-token-salt
NODE_ENV=production
PORT=1337
```

### **4. Actions Correctives**

#### **A. Si le service est "Failed" :**

1. **Redémarrer le service :**
   - Dashboard Render → Service backend → Manual Deploy

2. **Vérifier les variables d'environnement :**
   - Dashboard Render → Environment → Environment Variables
   - Ajouter/modifier les variables manquantes

3. **Vérifier la base PostgreSQL :**
   - Dashboard Render → Services → PostgreSQL
   - S'assurer que la base est active

#### **B. Si les variables sont manquantes :**

1. **Créer les variables manquantes :**
   ```
   DATABASE_HOST=your-postgres-host.render.com
   DATABASE_PORT=5432
   DATABASE_NAME=your-database-name
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   DATABASE_SSL=true
   JWT_SECRET=your-jwt-secret
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   API_TOKEN_SALT=your-api-token-salt
   APP_KEYS=your-app-keys
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   NODE_ENV=production
   PORT=1337
   ```

2. **Redéployer après modification :**
   - Le service se redéploie automatiquement

#### **C. Si la base PostgreSQL est vide :**

1. **Exécuter les migrations :**
   - Le service devrait automatiquement créer les tables
   - Vérifier dans les logs que les migrations s'exécutent

2. **Vérifier la connectivité :**
   - Les logs doivent montrer "Database connection established"

## 🧪 Tests de Validation

### **1. Test de connectivité simple :**
```bash
# Test depuis votre machine
curl https://aifb-backend.onrender.com/_health

# Réponse attendue : {"status":"ok"}
```

### **2. Test des endpoints API :**
```bash
# Test des recettes
curl https://aifb-backend.onrender.com/api/recipies

# Test des catégories
curl https://aifb-backend.onrender.com/api/recipie-categories
```

### **3. Test depuis le frontend :**
```bash
# Dans le dossier frontend-m
node check-render-db.js
```

## 🔧 Solutions Alternatives

### **Si le problème persiste :**

#### **1. Recréer le service backend :**
- Supprimer le service actuel
- Créer un nouveau service Strapi
- Reconfigurer les variables d'environnement

#### **2. Utiliser une base SQLite temporaire :**
- Modifier la configuration pour utiliser SQLite
- Permet de tester sans PostgreSQL

#### **3. Migrer vers une autre plateforme :**
- Railway, Heroku, ou DigitalOcean
- Souvent plus simple pour PostgreSQL

## 📞 Support

### **Si aucune solution ne fonctionne :**

1. **Capturer les informations :**
   - Screenshots des logs Render
   - Configuration des variables d'environnement
   - URL du service

2. **Contacter le support :**
   - Support Render pour les problèmes d'infrastructure
   - Documentation Strapi pour les problèmes de configuration

## ✅ Checklist de Résolution

- [ ] Service backend "Live" sur Render
- [ ] Toutes les variables d'environnement configurées
- [ ] Base PostgreSQL active et accessible
- [ ] Logs sans erreurs critiques
- [ ] Endpoint `/_health` répond
- [ ] API `/api/recipies` accessible
- [ ] Frontend peut se connecter au backend

## 🎯 Prochaines Étapes

1. **Vérifier le dashboard Render** pour l'état du service
2. **Consulter les logs** pour identifier l'erreur exacte
3. **Configurer les variables d'environnement** manquantes
4. **Redémarrer le service** si nécessaire
5. **Tester la connectivité** avec les commandes curl
6. **Valider que le frontend** peut se connecter 