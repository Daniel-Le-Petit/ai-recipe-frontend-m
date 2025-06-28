# 🚀 Guide de Déploiement - AI et Fines Herbes

## Déploiement Rapide sur Render

### 1. Préparation du Code

```bash
# Vérifier que tout fonctionne localement
npm install
npm run build
npm test

# S'assurer que les tests passent
npm run test:regression
```

### 2. Configuration Render

#### Option A: Déploiement Automatique (Recommandé)

1. **Connecter le Repository**
   - Aller sur [Render.com](https://render.com)
   - Cliquer "New +" → "Web Service"
   - Connecter votre compte GitHub
   - Sélectionner le repository `frontend-m`

2. **Configuration du Service**
   ```
   Name: ai-fines-herbes-frontend
   Environment: Node
   Region: Frankfurt (EU Central)
   Branch: main
   Root Directory: (laisser vide)
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

3. **Variables d'Environnement**
   ```
   NODE_ENV=production
   API_BASE_URL=https://your-backend-url.com
   ```

#### Option B: Utiliser render.yaml

Le fichier `render.yaml` est déjà configuré. Render le détectera automatiquement.

### 3. Déploiement

```bash
# 1. Commit et push
git add .
git commit -m "feat: ready for deployment"
git push origin main

# 2. Render déploie automatiquement
# Surveiller le statut sur https://dashboard.render.com
```

### 4. Vérification

```bash
# Vérifier que l'application fonctionne
curl https://your-app-name.onrender.com

# Vérifier les logs
# Aller sur Render Dashboard → Logs
```

## 🔧 Configuration Avancée

### Variables d'Environnement Recommandées

```env
NODE_ENV=production
API_BASE_URL=https://your-backend-url.com
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
```

### Optimisations de Performance

```yaml
# render.yaml
services:
  - type: web
    name: ai-fines-herbes-frontend
    env: node
    buildCommand: npm ci --only=production && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
    autoDeploy: true
    healthCheckPath: /_health
```

### Monitoring

```bash
# Endpoint de santé
curl https://your-app-name.onrender.com/_health

# Vérifier les métriques
# Render Dashboard → Metrics
```

## 🚨 Dépannage

### Problèmes Courants

1. **Build Failed**
   ```bash
   # Vérifier localement
   npm run build
   
   # Vérifier les logs Render
   # Dashboard → Logs
   ```

2. **Tests Failed**
   ```bash
   # Vérifier localement
   npm test
   
   # Les tests API skip si backend indisponible
   ```

3. **Application Not Starting**
   ```bash
   # Vérifier le start command
   npm start
   
   # Vérifier les variables d'environnement
   ```

### Logs Utiles

```bash
# Logs de build
npm run build 2>&1 | tee build.log

# Logs de test
npm test 2>&1 | tee test.log

# Logs Render
# Dashboard → Logs → Real-time logs
```

## 📊 Monitoring Post-Déploiement

### Métriques à Surveiller

- **Uptime** : Disponibilité de l'application
- **Response Time** : Temps de réponse des pages
- **Error Rate** : Taux d'erreurs
- **Build Time** : Temps de build

### Alertes

Configurer des alertes sur :
- Build failures
- Application downtime
- High error rates

## 🔄 Workflow de Développement

```bash
# 1. Développement
npm run dev

# 2. Tests
npm run test:regression

# 3. Build local
npm run build

# 4. Déploiement
git add .
git commit -m "feat: description"
git push origin main

# 5. Vérification
# Attendre le déploiement Render
# Tester l'application en production
```

## 📞 Support

- **Documentation Render** : [docs.render.com](https://docs.render.com)
- **Logs** : Dashboard Render → Logs
- **Métriques** : Dashboard Render → Metrics
- **Support** : support@render.com 