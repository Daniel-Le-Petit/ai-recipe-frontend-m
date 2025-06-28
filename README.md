# AI et Fines Herbes 🍃

Une application web moderne qui utilise l'intelligence artificielle pour générer des recettes personnalisées et guider les utilisateurs dans leur cuisine.

## 🚀 Fonctionnalités

- **Génération de recettes IA** : Créez des recettes personnalisées basées sur vos ingrédients disponibles
- **Mode cuisson guidée** : Suivez des instructions étape par étape avec minuteurs intégrés
- **Support multi-appareils** : Compatible avec Thermomix, Magimix, Cookeo, Companion, Monsieur Cuisine
- **Interface moderne** : Design responsive avec animations fluides
- **Filtres alimentaires** : Support pour régimes végétariens, végans, sans gluten, etc.

## 🛠️ Technologies

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **Tests** : Jest, React Testing Library, Playwright
- **Déploiement** : Render

## 📦 Installation

### Prérequis
- Node.js 20+ 
- npm ou yarn
- Git

### Installation locale

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd frontend-m

# Installer les dépendances
npm install

# Installer Playwright pour les tests E2E
npx playwright install

# Lancer en mode développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🧪 Tests

### Configuration des tests

Le projet utilise une configuration Jest complète avec :
- **Jest** pour les tests unitaires
- **React Testing Library** pour les tests de composants
- **Playwright** pour les tests E2E
- **Babel** configuré pour JSX/TSX

### Exécution des tests

```bash
# Tous les tests
npm test

# Tests unitaires uniquement
npm run test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage

# Tests E2E avec Playwright
npm run test:e2e

# Tests E2E avec interface graphique
npm run test:e2e:ui

# Suite de régression complète
npm run test:regression

# Tests API (nécessite le backend)
npm run test:api
```

### Types de tests

#### Tests unitaires (`tests/unit/`)
- Tests des composants React
- Tests des hooks personnalisés
- Tests des utilitaires

#### Tests API (`tests/api/`)
- Tests des endpoints API
- Se lancent automatiquement si le backend est disponible
- Skip gracieux si le backend n'est pas accessible

#### Tests E2E (`tests/e2e/`)
- Tests d'intégration complets
- Simulation des interactions utilisateur
- Tests de navigation et de fonctionnalités

### Configuration des tests

```javascript
// jest.setup.js - Configuration globale
- Mock Next.js Image et Router
- TextEncoder/TextDecoder pour Node.js
- Configuration des tests React
```

## 🚀 Déploiement sur Render

### Configuration automatique

Le projet inclut un fichier `render.yaml` pour le déploiement automatique :

```yaml
services:
  - type: web
    name: ai-fines-herbes-frontend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### Déploiement manuel

1. **Connecter le repository à Render**
   - Créer un compte sur [Render.com](https://render.com)
   - Connecter votre repository GitHub
   - Sélectionner le repository `frontend-m`

2. **Configuration du service**
   - **Type** : Web Service
   - **Environment** : Node
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`
   - **Branch** : `main`

3. **Variables d'environnement**
   ```env
   NODE_ENV=production
   API_BASE_URL=https://your-backend-url.com
   ```

4. **Déploiement**
   - Render détectera automatiquement les changements sur la branche `main`
   - Chaque push déclenchera un nouveau déploiement
   - Les déploiements sont automatiques et incluent les tests

### Workflow de déploiement

```bash
# 1. Développement local
npm run dev

# 2. Tests avant commit
npm run test:regression

# 3. Commit et push
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main

# 4. Render déploie automatiquement
# Vérifier le statut sur https://dashboard.render.com
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification du code

# Tests
npm test             # Tests unitaires
npm run test:watch   # Tests en mode watch
npm run test:coverage # Tests avec couverture
npm run test:e2e     # Tests E2E
npm run test:regression # Suite complète

# Utilitaires
npm run test:api     # Tests API
```

## 🌐 URLs de déploiement

- **Production** : [https://ai-fines-herbes.onrender.com](https://ai-fines-herbes.onrender.com)
- **Staging** : [https://ai-fines-herbes-staging.onrender.com](https://ai-fines-herbes-staging.onrender.com)

## 📱 Pages

- **Accueil** (`/`) : Landing page avec générateur de recettes
- **Comment ça marche** (`/comment-ca-marche`) : Explication du processus
- **À propos** (`/a-propos`) : Équipe et histoire
- **Contact** (`/contact`) : Formulaire de contact
- **Cuisson guidée** (`/cuisson-guidee`) : Mode cuisson étape par étape
- **Mes recettes** (`/mes-recettes`) : Gestion des recettes utilisateur

## 🎨 Design

- **Palette de couleurs** : Vert moderne (#22C55E) avec harmonisation sage
- **Typographie** : Playfair Display pour les titres, Inter pour le texte
- **Responsive** : Optimisé pour mobile, tablette et desktop

## 🔍 Monitoring et Debugging

### Logs Render
- Accéder aux logs via le dashboard Render
- Logs en temps réel disponibles
- Historique des déploiements

### Tests de santé
```bash
# Vérifier la santé de l'application
curl https://ai-fines-herbes.onrender.com/_health

# Tester l'API
curl https://ai-fines-herbes.onrender.com/api/recipies
```

## 📄 Licence

Projet privé - AI et Fines Herbes

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe via le formulaire de contact
- Consulter la documentation technique 