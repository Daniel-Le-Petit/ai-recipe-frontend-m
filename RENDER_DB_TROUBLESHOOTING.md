# Guide de Dépannage - Base de Données PostgreSQL sur Render

## 🔍 Diagnostic du Problème

### 1. Vérifier l'état du service backend
```bash
# Lancer le diagnostic
node check-render-db.js
```

### 2. Vérifier les logs Render
- Aller sur le dashboard Render
- Sélectionner le service `aifb-backend`
- Vérifier les logs de déploiement et d'exécution

## 🛠️ Solutions Possibles

### **Solution 1: Variables d'environnement manquantes**

Vérifiez que votre backend Render a toutes les variables d'environnement nécessaires :

```bash
# Variables requises pour PostgreSQL
DATABASE_HOST=your-postgres-host.render.com
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true

# Variables Strapi
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=your-app-keys
TRANSFER_TOKEN_SALT=your-transfer-token-salt
```

### **Solution 2: Configuration PostgreSQL Render**

1. **Créer une base PostgreSQL sur Render :**
   - Dashboard Render → New → PostgreSQL
   - Choisir un nom et une région
   - Noter les informations de connexion

2. **Configurer les variables d'environnement :**
   - Aller dans votre service backend
   - Environment → Environment Variables
   - Ajouter toutes les variables DATABASE_*

### **Solution 3: Migration de la base de données**

Si la base est vide, exécutez les migrations :

```bash
# Dans le backend Render
npm run strapi develop
# ou
npm run strapi build
npm run strapi start
```

### **Solution 4: Vérifier la connectivité**

Testez la connexion depuis le backend :

```javascript
// Dans le backend, créer un script de test
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: { rejectUnauthorized: false }
  }
});

knex.raw('SELECT 1')
  .then(() => console.log('✅ Connexion PostgreSQL OK'))
  .catch(err => console.error('❌ Erreur PostgreSQL:', err));
```

## 🔧 Actions Immédiates

### **1. Vérifier l'état actuel**
```bash
# Tester la connectivité
curl -f https://aifb-backend.onrender.com/_health
```

### **2. Redémarrer le service**
- Dashboard Render → Service backend → Manual Deploy
- Ou redémarrer le service

### **3. Vérifier les logs en temps réel**
```bash
# Dans le dashboard Render
# Logs → Live Logs
```

## 📋 Checklist de Vérification

- [ ] Service backend déployé et en cours d'exécution
- [ ] Variables d'environnement PostgreSQL configurées
- [ ] Base de données PostgreSQL créée et accessible
- [ ] Migrations exécutées
- [ ] Service accessible via l'URL publique
- [ ] Pas d'erreurs dans les logs

## 🚨 Erreurs Courantes

### **"Connection refused"**
- Vérifier les variables DATABASE_HOST et DATABASE_PORT
- S'assurer que la base PostgreSQL est active

### **"Authentication failed"**
- Vérifier DATABASE_USERNAME et DATABASE_PASSWORD
- Réinitialiser le mot de passe si nécessaire

### **"Database does not exist"**
- Vérifier DATABASE_NAME
- Créer la base si elle n'existe pas

### **"SSL connection required"**
- Ajouter `DATABASE_SSL=true`
- Ou configurer SSL dans la connexion

## 📞 Support

Si le problème persiste :

1. **Vérifier les logs Render** pour des erreurs spécifiques
2. **Tester la connectivité** avec le script de diagnostic
3. **Vérifier la configuration** PostgreSQL dans Render
4. **Contacter le support Render** si nécessaire

## 🔄 Fallback Solution

En cas de problème persistant, vous pouvez :

1. **Utiliser une base SQLite** temporairement
2. **Migrer vers une autre plateforme** (Railway, Supabase, etc.)
3. **Utiliser des données statiques** en attendant la résolution 