# Guide des Tests de Régression - AI et Fines Herbes

## Vue d'ensemble

Ce guide explique comment utiliser la suite complète de tests de régression pour le projet frontend-m.

## Types de Tests Disponibles

### 1. **Tests Unitaires** (`tests/unit/`)
- Tests des composants React individuels
- Tests des hooks personnalisés
- Tests des utilitaires

**Commande :** `npm run test`

### 2. **Tests End-to-End** (`tests/e2e/`)
- Tests de flux utilisateur complets
- Tests d'intégration avec Playwright
- Tests de navigation et interactions

**Commande :** `npm run test:e2e`

### 3. **Tests API** (`tests/api/`)
- Tests d'intégration avec le backend
- Tests des endpoints Strapi
- Tests de création/modification/suppression de recettes

**Commande :** `npm run test:api`

### 4. **Tests de Performance** (`tests/performance/`)
- Tests de temps de chargement des pages
- Tests de temps de réponse API
- Tests de taille de build
- Tests de métriques de performance

**Commande :** `npm run test:performance`

### 5. **Tests de Sécurité** (`tests/security/`)
- Tests de vulnérabilités XSS
- Tests de protection CSRF
- Tests de headers de sécurité
- Tests de données sensibles exposées

**Commande :** `npm run test:security`

### 6. **Tests d'Accessibilité** (`tests/accessibility/`)
- Tests de conformité WCAG
- Tests de navigation clavier
- Tests d'attributs ARIA
- Tests de contraste de couleurs

**Commande :** `npm run test:a11y`

### 7. **Tests de Compatibilité** (`tests/compatibility/`)
- Tests multi-navigateurs (Chrome, Firefox, Safari)
- Tests de responsive design
- Tests de fonctionnalités JavaScript
- Tests de rendu CSS

**Commande :** `npm run test:compatibility`

## Utilisation

### Exécuter tous les tests
```bash
npm run test:all
# ou
node scripts/regression-tests.js
```

### Exécuter un type de test spécifique
```bash
# Tests unitaires uniquement
npm run test

# Tests E2E uniquement
npm run test:e2e

# Tests de performance uniquement
npm run test:performance

# Tests de sécurité uniquement
npm run test:security

# Tests d'accessibilité uniquement
npm run test:a11y

# Tests de compatibilité uniquement
npm run test:compatibility
```

### Options avancées du script de régression
```bash
# Afficher l'aide
node scripts/regression-tests.js --help

# Exécuter seulement les tests unitaires
node scripts/regression-tests.js --unit-only

# Exécuter seulement les tests E2E
node scripts/regression-tests.js --e2e-only

# Exécuter seulement les tests API
node scripts/regression-tests.js --api-only

# Exécuter seulement les tests de performance
node scripts/regression-tests.js --performance-only

# Exécuter seulement les tests de sécurité
node scripts/regression-tests.js --security-only

# Exécuter seulement les tests d'accessibilité
node scripts/regression-tests.js --a11y-only

# Exécuter seulement les tests de compatibilité
node scripts/regression-tests.js --compatibility-only
```

## Configuration

### Variables d'environnement
```bash
# URL de l'API backend (par défaut: http://localhost:1337)
API_BASE_URL=https://aifb-backend.onrender.com

# URL de l'API pour les tests (par défaut: http://localhost:1338)
NEXT_PUBLIC_API_URL=http://localhost:1338
```

### Prérequis
- Node.js 18+
- npm ou yarn
- Playwright browsers installés (`npx playwright install`)
- Backend Strapi en cours d'exécution (pour les tests API)

## Intégration CI/CD

### Render.com
Le script de régression est automatiquement exécuté avant chaque déploiement via le `preDeployCommand` dans `render.yaml` :

```yaml
preDeployCommand: |
  echo "Running regression tests before deployment..."
  node scripts/regression-tests.js
```

### GitHub Actions (optionnel)
Vous pouvez ajouter un workflow GitHub Actions pour exécuter les tests sur chaque push :

```yaml
name: Regression Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install
      - run: npm run test:all
```

## Rapports et Résultats

### Rapport JSON
Les résultats détaillés sont sauvegardés dans `test-results/regression-report.json`

### Console Output
Le script affiche un résumé coloré dans la console avec :
- ✅ Tests réussis (vert)
- ❌ Tests échoués (rouge)
- ⚠️ Tests ignorés (jaune)

### Exemple de sortie
```
🚀 Starting Regression Test Suite
Working directory: /path/to/frontend-m

=== Environment Check ===
Node.js version: v18.17.0

=== Code Quality Check ===
✓ ESLint code quality check completed successfully

=== Unit Tests ===
✓ Jest unit tests completed successfully

=== End-to-End Tests ===
✓ Playwright E2E tests completed successfully

=== API Tests ===
✓ API integration tests completed successfully

=== Performance Tests ===
✓ Performance tests completed successfully

=== Security Tests ===
✓ Security tests completed successfully

=== Accessibility Tests ===
✓ Accessibility tests completed successfully

=== Browser Compatibility Tests ===
✓ Browser compatibility tests completed successfully

=== Build Test ===
✓ Production build test completed successfully

=== Test Results Summary ===
Summary:
Total test suites: 9
Passed: 9
Failed: 0

🎉 All regression tests passed!
```

## Ajout de Nouveaux Tests

### 1. Créer un nouveau fichier de test
```javascript
// tests/your-category/your-test.test.js
describe('Your Test Category', () => {
  test('Your test description', async () => {
    // Votre test ici
    expect(true).toBe(true);
  });
});
```

### 2. Ajouter le script dans package.json
```json
{
  "scripts": {
    "test:your-category": "jest tests/your-category/"
  }
}
```

### 3. Mettre à jour le script de régression
```javascript
// scripts/regression-tests.js
function runYourCategoryTests() {
  logSection('Your Category Tests')
  return runCommand('npm run test:your-category', 'Your category tests')
}

// Dans la fonction main()
const results = {
  // ... autres tests
  'Your Category Tests': runYourCategoryTests(),
  // ...
}
```

## Dépannage

### Erreurs courantes

1. **Tests de performance échouent**
   - Vérifiez que l'application est en cours d'exécution sur `localhost:3000`
   - Ajustez les seuils de temps dans les tests si nécessaire

2. **Tests de sécurité échouent**
   - Vérifiez que les headers de sécurité sont configurés
   - Assurez-vous que les formulaires ont une protection CSRF

3. **Tests d'accessibilité échouent**
   - Ajoutez des attributs `alt` aux images
   - Vérifiez la hiérarchie des titres
   - Testez la navigation clavier

4. **Tests de compatibilité échouent**
   - Installez les navigateurs Playwright : `npx playwright install`
   - Vérifiez que l'application fonctionne sur différents navigateurs

### Logs détaillés
Pour obtenir plus de détails sur les erreurs :
```bash
# Mode verbose
npm run test:all -- --verbose

# Logs détaillés
DEBUG=* npm run test:all
```

## Maintenance

### Mise à jour des dépendances
```bash
npm update
npx playwright install
```

### Nettoyage des caches
```bash
npm run test -- --clearCache
rm -rf test-results/
```

### Vérification de la configuration
```bash
npm run test:all -- --showConfig
``` 