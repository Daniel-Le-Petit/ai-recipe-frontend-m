# 🗄️ Guide d'implémentation : Plans de semaine avec alternatives et changements

## 📋 Vue d'ensemble

Ce guide détaille l'implémentation complète du système de plans de semaine avec gestion des alternatives de recettes et historique des changements.

## 🎯 Fonctionnalités implémentées

### ✅ **1. Gestion des plans de semaine**
- Création et modification de plans hebdomadaires
- Gestion des repas par jour et par type
- Statuts des repas (accepté, décliné, en attente)

### ✅ **2. Système d'alternatives**
- Ajout d'alternatives de recettes
- Raisons prédéfinies pour les changements
- Sélection/désélection d'alternatives

### ✅ **3. Historique des changements**
- Traçabilité complète des modifications
- Types de changements (recette, statut, alternative, notes)
- Horodatage et détails des raisons

## 🗄️ Tables Strapi requises

### **1. `weekly-plans`**
```sql
{
  "id": "number (auto)",
  "userId": "number (required)",
  "weekStart": "date (required)",
  "weekEnd": "date",
  "selections": "json",
  "status": "enumeration ['draft', 'active', 'completed', 'archived']",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### **2. `weekly-plan-meals`**
```sql
{
  "id": "number (auto)",
  "weekly_plan": "relation (many-to-one)",
  "day": "date (required)",
  "mealType": "enumeration ['petit-dejeuner', 'dejeuner', 'collation', 'diner']",
  "status": "enumeration ['accepted', 'declined', 'pending']",
  "userNotes": "text",
  "recipe": "relation (many-to-one)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### **3. `weekly-plan-meal-alternatives`**
```sql
{
  "id": "number (auto)",
  "weekly_plan_meal": "relation (many-to-one)",
  "recipe": "relation (many-to-one)",
  "reason": "enumeration ['ingredients-missing', 'time-constraint', 'difficulty', 'preference', 'seasonal', 'dietary', 'allergy', 'budget', 'other']",
  "reasonDetails": "text",
  "isSelected": "boolean (default: false)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### **4. `weekly-plan-meal-changes`**
```sql
{
  "id": "number (auto)",
  "weekly_plan_meal": "relation (many-to-one)",
  "changeType": "enumeration ['recipe-switch', 'status-change', 'alternative-selected', 'notes-updated']",
  "reason": "enumeration ['ingredients-missing', 'time-constraint', 'difficulty', 'preference', 'seasonal', 'dietary', 'allergy', 'budget', 'other']",
  "reasonDetails": "text",
  "previousValue": "text",
  "newValue": "text",
  "previousRecipe": "relation (many-to-one)",
  "newRecipe": "relation (many-to-one)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## 🚀 Étapes d'implémentation

### **Étape 1 : Créer les tables dans Strapi**

1. **Exécuter le script de création :**
```bash
node create-weekly-plans-tables.js
```

2. **Suivre les instructions affichées dans l'interface Strapi**

3. **Configurer les permissions :**
   - Settings → Users & Permissions Plugin → Roles → Authenticated
   - Activer toutes les permissions pour les 4 nouvelles tables

### **Étape 2 : Créer les données de test**

```bash
node create-test-weekly-plans-data.js
```

### **Étape 3 : Tester les endpoints**

```bash
# Tester les endpoints
curl http://localhost:1338/api/weekly-plans?populate=*
curl http://localhost:1338/api/weekly-plan-meals?populate=*
curl http://localhost:1338/api/weekly-plan-meal-alternatives?populate=*
curl http://localhost:1338/api/weekly-plan-meal-changes?populate=*
```

## 📊 Données de test créées

### **Recettes de test :**
1. Salade Quinoa Végétarienne (25 min, végétarien)
2. Poulet Rôti aux Herbes (45 min, poulet)
3. Soupe de Légumes Express (20 min, végétarien)
4. Pasta Carbonara Végétarienne (30 min, végétarien)
5. Bowl Buddha Bowl (35 min, végétarien)

### **Plans de semaine de test :**
- Semaine 1 : 20-26 Janvier 2025 (3 repas/jour)
- Semaine 2 : 27 Janvier - 2 Février 2025 (4 repas/jour)

### **Alternatives de test :**
- Dîner lundi : Soupe → Pasta Carbonara (préférence)
- Dîner lundi : Soupe → Buddha Bowl (préférence)
- Petit-déjeuner mardi : Pasta → Salade Quinoa (temps)

### **Changements de test :**
- Changement de recette : Soupe → Pasta Carbonara
- Changement de statut : accepté → décliné
- Sélection d'alternative : Pasta → Salade Quinoa

## 🎨 Composants créés

### **1. `RecipeAlternatives.tsx`**
- Gestion des alternatives de recettes
- Formulaire d'ajout avec raisons prédéfinies
- Sélection/désélection d'alternatives

### **2. `MealChangeHistory.tsx`**
- Affichage de l'historique des changements
- Détails des modifications avec horodatage
- Informations sur les recettes avant/après

## 🔧 Hooks personnalisés

### **1. `useMealAlternatives(mealId)`**
```typescript
const { 
  alternatives, 
  loading, 
  error, 
  createAlternative, 
  selectAlternative 
} = useMealAlternatives(mealId)
```

### **2. `useMealChanges(mealId)`**
```typescript
const { 
  changes, 
  loading, 
  error, 
  recordChange, 
  switchRecipe 
} = useMealChanges(mealId)
```

### **3. `useChangeReasons()`**
```typescript
const { reasons } = useChangeReasons()
// Retourne les 9 raisons prédéfinies avec icônes
```

## 🎯 Raisons de changement disponibles

| Raison | Icône | Description |
|--------|-------|-------------|
| `ingredients-missing` | 🛒 | Ingrédients manquants |
| `time-constraint` | ⏱️ | Version plus rapide |
| `difficulty` | 🎯 | Version plus simple |
| `preference` | ❤️ | Préférence personnelle |
| `seasonal` | 🌱 | Recette de saison |
| `dietary` | 🥗 | Régime alimentaire |
| `allergy` | ⚠️ | Allergie ou intolérance |
| `budget` | 💰 | Budget limité |
| `other` | 📝 | Autre raison |

## 🔄 Types de changements

| Type | Description |
|------|-------------|
| `recipe-switch` | Changement de recette |
| `status-change` | Changement de statut (accepté/décliné) |
| `alternative-selected` | Sélection d'une alternative |
| `notes-updated` | Mise à jour des notes |

## 📱 Utilisation dans l'interface

### **Ajouter une alternative :**
```typescript
// Dans un composant
const { createAlternative } = useMealAlternatives(mealId)

await createAlternative({
  weekly_plan_meal: mealId,
  recipe: newRecipeId,
  reason: 'time-constraint',
  reasonDetails: 'J\'ai besoin d\'une recette plus rapide',
  isSelected: false
})
```

### **Changer de recette :**
```typescript
// Dans un composant
const { switchRecipe } = useMealChanges(mealId)

await switchRecipe(
  newRecipeId, 
  'preference', 
  'Je préfère une recette plus consistante'
)
```

### **Afficher l'historique :**
```typescript
// Dans un composant
<MealChangeHistory mealId={mealId} onClose={() => setShowHistory(false)} />
```

## 🧪 Tests

### **Test des endpoints :**
```bash
# Plans de semaine
curl http://localhost:1338/api/weekly-plans?populate=*

# Repas d'un plan
curl http://localhost:1338/api/weekly-plan-meals?filters[weekly_plan][id][$eq]=1&populate=*

# Alternatives d'un repas
curl http://localhost:1338/api/weekly-plan-meal-alternatives?filters[weekly_plan_meal][id][$eq]=3&populate=*

# Changements d'un repas
curl http://localhost:1338/api/weekly-plan-meal-changes?filters[weekly_plan_meal][id][$eq]=3&populate=*
```

### **Test des fonctionnalités :**
1. ✅ Création de plans de semaine
2. ✅ Ajout de repas avec recettes
3. ✅ Gestion des statuts (accepté/décliné)
4. ✅ Ajout d'alternatives avec raisons
5. ✅ Sélection d'alternatives
6. ✅ Historique des changements
7. ✅ Changement de recettes avec traçabilité

## 🎉 Résultat final

Le système permet maintenant de :
- ✅ Créer des plans de semaine personnalisés
- ✅ Gérer les alternatives de recettes avec raisons
- ✅ Tracer tous les changements avec historique
- ✅ Optimiser les plans selon les préférences utilisateur
- ✅ Fournir des insights sur les habitudes culinaires

## 🚀 Prochaines étapes

1. **Intégration dans l'interface principale**
2. **Notifications de changements**
3. **Analytics des préférences**
4. **Recommandations automatiques**
5. **Partage de plans entre utilisateurs** 