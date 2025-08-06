# 🚀 Guide de dépannage pour le déploiement

## ❌ Erreurs courantes et solutions

### **1. Erreur de sitemap (Cannot read properties of undefined)**

**Problème :**
```
TypeError: Cannot read properties of undefined (reading 'updatedAt')
```

**Solution :**
- ✅ Le sitemap a été corrigé pour gérer les propriétés undefined
- ✅ Ajout de timeouts pour éviter les blocages
- ✅ Fallback vers les pages statiques si l'API n'est pas disponible

**Test local :**
```bash
node test-sitemap.js
```

### **2. Timeout de build (60 secondes)**

**Problème :**
```
⚠ Sending SIGTERM signal to Next.js build worker due to timeout of 60 seconds
```

**Solution :**
- ✅ Configuration `staticPageGenerationTimeout: 120` dans `next.config.mjs`
- ✅ Optimisations de build ajoutées
- ✅ Gestion d'erreur robuste pour le sitemap

### **3. Erreurs de dépendances**

**Problème :**
```
8 vulnerabilities (3 low, 4 high, 1 critical)
```

**Solution :**
```bash
# Corriger les vulnérabilités non critiques
npm audit fix

# Vérifier les dépendances
npm ls
```

### **4. Erreurs d'API Strapi**

**Problème :**
```
Error occurred prerendering page "/sitemap.xml"
```

**Solution :**
- ✅ Le sitemap fonctionne maintenant sans API
- ✅ Pages statiques toujours générées
- ✅ Gestion d'erreur robuste

## 🔧 Configuration de déploiement

### **Variables d'environnement requises :**

```env
# Production
NEXT_PUBLIC_API_URL=https://your-strapi-backend.onrender.com
NEXT_PUBLIC_SITE_URL=https://your-frontend.onrender.com

# Développement
NEXT_PUBLIC_API_URL=http://localhost:1338
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **Configuration Render.com :**

1. **Build Command :**
```bash
npm install && npm run build
```

2. **Start Command :**
```bash
npm start
```

3. **Environment Variables :**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`

## 🧪 Tests avant déploiement

### **1. Test local complet :**
```bash
# Installer les dépendances
npm install

# Tester le build
npm run build

# Tester le sitemap
node test-sitemap.js

# Démarrer en mode production
npm start
```

### **2. Test des endpoints :**
```bash
# Tester l'API Strapi
curl http://localhost:1338/api/recipies?pagination[pageSize]=1

# Tester le sitemap
curl http://localhost:3000/sitemap.xml
```

### **3. Test des pages statiques :**
```bash
# Vérifier que les pages se génèrent
npm run build
# Vérifier le dossier .next/static
```

## 🚀 Étapes de déploiement

### **1. Préparation :**
```bash
# Vérifier les changements
git status
git add .
git commit -m "Fix sitemap and build issues"

# Pousser vers le repository
git push origin main
```

### **2. Déploiement automatique :**
- Le déploiement se déclenche automatiquement sur Render.com
- Surveiller les logs de build
- Vérifier les variables d'environnement

### **3. Post-déploiement :**
```bash
# Tester le site déployé
curl https://your-app.onrender.com/sitemap.xml

# Vérifier les pages principales
curl https://your-app.onrender.com/
curl https://your-app.onrender.com/recettes
```

## 🔍 Surveillance et monitoring

### **1. Logs à surveiller :**
- ✅ Build successful
- ✅ Sitemap generated
- ✅ Static pages created
- ✅ API connectivity (optionnel)

### **2. Métriques importantes :**
- Temps de build < 120 secondes
- Sitemap accessible
- Pages statiques générées
- Pas d'erreurs 500

### **3. Alertes :**
- Build failed
- Sitemap timeout
- API connectivity issues

## 🛠️ Outils de diagnostic

### **1. Script de test complet :**
```bash
node test-sitemap.js
```

### **2. Vérification de build :**
```bash
npm run build
```

### **3. Test de production :**
```bash
npm start
curl http://localhost:3000/sitemap.xml
```

## 📋 Checklist de déploiement

### **Avant le déploiement :**
- [ ] Tests locaux passent
- [ ] Build local réussi
- [ ] Sitemap accessible
- [ ] Variables d'environnement configurées
- [ ] Code commité et poussé

### **Après le déploiement :**
- [ ] Build réussi sur Render
- [ ] Site accessible
- [ ] Sitemap fonctionnel
- [ ] Pages principales chargent
- [ ] Pas d'erreurs dans les logs

## 🎯 Résolution rapide

Si le déploiement échoue :

1. **Vérifier les logs Render**
2. **Tester localement :** `npm run build`
3. **Vérifier les variables d'environnement**
4. **Tester le sitemap :** `node test-sitemap.js`
5. **Redéployer si nécessaire**

## 🎉 Succès !

Une fois déployé avec succès :
- ✅ Site accessible
- ✅ Sitemap fonctionnel
- ✅ Pages statiques générées
- ✅ Gestion d'erreur robuste
- ✅ Timeouts configurés 