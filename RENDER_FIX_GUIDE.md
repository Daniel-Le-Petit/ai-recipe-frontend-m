# 🔧 Guide de Correction Render - Problème de Connexion API

## 🚨 Problème Identifié

Le frontend sur Render (`https://aifb-frontend-m.onrender.com`) ne peut pas se connecter au backend (`https://aifb-backend.onrender.com`).

**Erreurs observées :**
- Page d'accueil : "n'affiche pas de recettes, la base n'est pas accessible"
- Page admin : "Erreur de connexion Failed to fetch"

## 🔍 Diagnostic

Le problème vient probablement de la configuration des variables d'environnement sur Render.

### Variables d'environnement actuelles (probables)
```
NEXT_PUBLIC_API_URL=http://localhost:1338  ❌ (URL locale)
NEXT_PUBLIC_ENVIRONMENT=development        ❌ (Dev au lieu de production)
```

### Variables d'environnement correctes pour Render
```
NEXT_PUBLIC_API_URL=https://aifb-backend.onrender.com  ✅
NEXT_PUBLIC_ENVIRONMENT=production                     ✅
```

## 🛠️ Solutions

### 1. Corriger les Variables d'Environnement sur Render

#### Étape 1 : Accéder au Dashboard Render
1. Allez sur [dashboard.render.com](https://dashboard.render.com)
2. Connectez-vous à votre compte
3. Sélectionnez le service frontend `aifb-frontend-m`

#### Étape 2 : Modifier les Variables d'Environnement
1. Cliquez sur **"Environment"** dans le menu de gauche
2. Trouvez la section **"Environment Variables"**
3. Modifiez ou ajoutez ces variables :

```
NEXT_PUBLIC_API_URL = https://aifb-backend.onrender.com
NEXT_PUBLIC_ENVIRONMENT = production
```

#### Étape 3 : Redéployer
1. Cliquez sur **"Manual Deploy"** → **"Deploy latest commit"**
2. Attendez que le déploiement se termine
3. Testez le site

### 2. Vérifier l'État du Backend

#### Étape 1 : Vérifier le Service Backend
1. Dans le dashboard Render, sélectionnez le service backend `aifb-backend`
2. Vérifiez que le statut est **"Live"** (vert)
3. Si le statut est différent, cliquez sur **"Manual Deploy"**

#### Étape 2 : Vérifier les Logs du Backend
1. Cliquez sur **"Logs"** dans le menu de gauche
2. Vérifiez qu'il n'y a pas d'erreurs de connexion à la base de données
3. Les logs doivent montrer "Strapi is running on port 10000"

### 3. Tester la Connexion

#### Test 1 : Backend Direct
Ouvrez dans votre navigateur :
```
https://aifb-backend.onrender.com/api/recipie?populate=*
```

**Résultat attendu :** JSON avec les recettes

#### Test 2 : Frontend
Ouvrez dans votre navigateur :
```
https://aifb-frontend-m.onrender.com
```

**Résultat attendu :** Page d'accueil avec les recettes affichées

## 🔧 Scripts de Diagnostic

### Script 1 : Vérifier la Configuration
```bash
node check-render-config.js
```

### Script 2 : Tester l'API Backend
```bash
curl https://aifb-backend.onrender.com/api/recipie?populate=*
```

### Script 3 : Vérifier les Variables d'Environnement
```bash
echo "NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL"
echo "NEXT_PUBLIC_ENVIRONMENT: $NEXT_PUBLIC_ENVIRONMENT"
```

## 📋 Checklist de Correction

- [ ] Variables d'environnement corrigées sur Render
- [ ] Service backend en statut "Live"
- [ ] Redéploiement du frontend effectué
- [ ] Test de l'API backend réussi
- [ ] Test du frontend réussi
- [ ] Page admin accessible

## 🚨 Problèmes Courants

### Problème 1 : Backend en "Build Failed"
**Solution :** Vérifiez les logs du backend, souvent un problème de variables d'environnement de base de données.

### Problème 2 : Frontend en "Build Failed"
**Solution :** Vérifiez que toutes les dépendances sont installées et que le build Next.js fonctionne.

### Problème 3 : Timeout de Connexion
**Solution :** Le backend peut prendre du temps à démarrer. Attendez 2-3 minutes après le déploiement.

### Problème 4 : CORS Errors
**Solution :** Vérifiez que le backend autorise les requêtes depuis le domaine frontend.

## 📞 Support

Si les problèmes persistent :
1. Vérifiez les logs détaillés sur Render
2. Testez localement avec les bonnes variables d'environnement
3. Consultez la documentation Render pour les variables d'environnement

---

**Note :** Les variables d'environnement avec le préfixe `NEXT_PUBLIC_` sont exposées côté client et doivent être configurées correctement pour que le frontend puisse se connecter au backend. 