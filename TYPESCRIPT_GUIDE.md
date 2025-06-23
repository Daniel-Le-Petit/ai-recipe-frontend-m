# 🚀 Guide TypeScript pour Frontend-M

Ce guide explique l'utilisation de TypeScript dans le projet `frontend-m` pour une meilleure sécurité des types et une expérience de développement améliorée.

## 📁 Structure des fichiers TypeScript

```
frontend-m/
├── src/
│   ├── api.ts                    # Service API avec types Strapi
│   ├── types/
│   │   ├── api.ts               # Types pour l'API Strapi
│   │   └── env.d.ts             # Types pour les variables d'environnement
│   ├── hooks/
│   │   └── useRecipes.ts        # Hooks React personnalisés avec TypeScript
│   ├── components/
│   │   └── RecipeCard.tsx       # Composant réutilisable avec types
│   └── app/
│       └── recettes/
│           └── page.tsx         # Page des recettes avec hooks TypeScript
```

## 🔧 Configuration TypeScript

### tsconfig.json
Le fichier est déjà configuré avec :
- **Strict mode** activé pour la sécurité des types
- **Path mapping** pour les imports `@/*`
- **Support JSX** pour React
- **Module resolution** pour Next.js

### Variables d'environnement
```typescript
// src/types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_ENVIRONMENT: 'development' | 'production' | 'test'
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
```

## 📊 Types Strapi

### Types principaux
```typescript
// Types de base
interface StrapiResponse<T> {
  data: T
  meta: { pagination?: PaginationInfo }
}

// Types pour les recettes
interface StrapiRecipe {
  id: number
  attributes: {
    title: string
    description?: string
    ingredients?: any
    instructions?: string
    duration?: number
    difficulty?: 'Facile' | 'Intermédiaire' | 'Difficile'
    servings?: number
    rating?: number
    tags?: string[]
    isRobotCompatible?: boolean
    // ... autres champs
  }
}
```

## 🎣 Hooks personnalisés

### useRecipes
```typescript
const { recipes, loading, error, refetch, filters, setFilters } = useRecipes({
  enabled: true,
  filters: { difficulty: { $eq: 'Facile' } },
  sort: { rating: 'desc' }
})
```

### useRecipe
```typescript
const { recipe, loading, error, refetch } = useRecipe(recipeId)
```

### useCategories
```typescript
const { categories, loading, error } = useCategories()
```

## 🧩 Composants typés

### RecipeCard
```typescript
<RecipeCard
  recipe={recipe}
  onStartCooking={handleStartCooking}
  onFavorite={handleFavorite}
  showCategory={true}
  showRating={true}
  showTags={true}
/>
```

## 🔌 Service API typé

### Méthodes disponibles
```typescript
// Récupérer toutes les recettes
const recipes = await apiService.getRecipes({
  populate: '*',
  filters: { difficulty: { $eq: 'Facile' } },
  sort: { createdAt: 'desc' }
})

// Récupérer une recette par ID
const recipe = await apiService.getRecipeById(1)

// Rechercher des recettes
const searchResults = await apiService.searchRecipes('pasta')

// Créer une recette
const newRecipe = await apiService.createRecipe({
  title: 'Nouvelle recette',
  description: 'Description...',
  difficulty: 'Facile'
})
```

## 🛠️ Avantages TypeScript

### 1. **Sécurité des types**
- Détection d'erreurs à la compilation
- Autocomplétion intelligente
- Refactoring sécurisé

### 2. **Documentation vivante**
- Les types servent de documentation
- Interface claire pour les composants
- Signature des fonctions explicite

### 3. **Meilleure DX (Developer Experience)**
- Autocomplétion dans l'IDE
- Navigation dans le code
- Détection d'erreurs en temps réel

### 4. **Maintenabilité**
- Code plus robuste
- Refactoring sécurisé
- Tests plus faciles à écrire

## 🔍 Exemples d'utilisation

### Filtrage typé
```typescript
const filteredRecipes = recipes.filter(recipe => {
  // TypeScript connaît la structure de recipe
  return recipe.attributes.difficulty === 'Facile' &&
         recipe.attributes.duration <= 30
})
```

### Gestion d'état typée
```typescript
const [recipes, setRecipes] = useState<StrapiRecipe[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [error, setError] = useState<string | null>(null)
```

### Props de composant typées
```typescript
interface RecipeCardProps {
  recipe: StrapiRecipe
  onStartCooking?: (recipe: StrapiRecipe) => void
  onFavorite?: (recipe: StrapiRecipe) => void
  showCategory?: boolean
  showRating?: boolean
  showTags?: boolean
}
```

## 🚨 Gestion d'erreurs typée

```typescript
try {
  const response = await apiService.getRecipes()
  setRecipes(response.data)
} catch (error) {
  // TypeScript sait que error est de type Error
  setError(error instanceof Error ? error.message : 'Erreur inconnue')
}
```

## 📝 Bonnes pratiques

### 1. **Utiliser les types Strapi**
```typescript
// ✅ Bon
import type { StrapiRecipe } from '@/types/api'
const recipe: StrapiRecipe = response.data

// ❌ Éviter
const recipe: any = response.data
```

### 2. **Types optionnels**
```typescript
// ✅ Bon
interface RecipeCardProps {
  recipe: StrapiRecipe
  onStartCooking?: (recipe: StrapiRecipe) => void // Optionnel
}

// ❌ Éviter
interface RecipeCardProps {
  recipe: StrapiRecipe
  onStartCooking: (recipe: StrapiRecipe) => void // Requis
}
```

### 3. **Union types**
```typescript
// ✅ Bon
type Difficulty = 'Facile' | 'Intermédiaire' | 'Difficile'

// ❌ Éviter
type Difficulty = string
```

### 4. **Generic types**
```typescript
// ✅ Bon
const [recipes, setRecipes] = useState<StrapiRecipe[]>([])

// ❌ Éviter
const [recipes, setRecipes] = useState([])
```

## 🔄 Migration depuis JavaScript

### Étapes pour migrer un fichier .js vers .ts/.tsx

1. **Renommer le fichier**
   ```bash
   mv component.js component.tsx
   ```

2. **Ajouter les types d'import**
   ```typescript
   import type { StrapiRecipe } from '@/types/api'
   ```

3. **Typer les props**
   ```typescript
   interface ComponentProps {
     recipe: StrapiRecipe
     onAction?: () => void
   }
   ```

4. **Typer les hooks**
   ```typescript
   const [data, setData] = useState<StrapiRecipe[]>([])
   ```

5. **Typer les fonctions**
   ```typescript
   const handleClick = (recipe: StrapiRecipe): void => {
     // ...
   }
   ```

## 🎯 Prochaines étapes

- [ ] Ajouter des tests TypeScript avec Jest
- [ ] Configurer ESLint pour TypeScript
- [ ] Ajouter des types pour les formulaires
- [ ] Implémenter des types pour l'authentification
- [ ] Ajouter des types pour les validations

## 📚 Ressources

- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript avec React](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js avec TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [Strapi API Documentation](https://docs.strapi.io/dev-docs/api/rest) 