// Types pour l'API Strapi

// Types pour les statuts de recette
export type RecipeStatus = 
  | 'draft' 
  | 'saved' 
  | 'submitted' 
  | 'approved' 
  | 'ordered' 
  | 'completed' 
  | 'archived' 
  | 'rejected'

export interface StatusInfo {
  code: RecipeStatus
  displayName: string
  description: string
  icon: string
  color: string
}

export const RECIPE_STATUSES: Record<RecipeStatus, StatusInfo> = {
  draft: {
    code: 'draft',
    displayName: 'En cours',
    description: 'Recette en cours d\'édition, pas encore finalisée.',
    icon: '📝',
    color: 'bg-gray-100 text-gray-800'
  },
  saved: {
    code: 'saved',
    displayName: 'Enregistrée',
    description: 'Recette validée et enregistrée manuellement ou par IA, mais pas encore commandée.',
    icon: '💾',
    color: 'bg-blue-100 text-blue-800'
  },
  submitted: {
    code: 'submitted',
    displayName: 'Soumise',
    description: 'Recette envoyée pour validation, supervision ou revue.',
    icon: '📤',
    color: 'bg-yellow-100 text-yellow-800'
  },
  approved: {
    code: 'approved',
    displayName: 'Approuvée',
    description: 'Recette validée par un humain (ou système automatique).',
    icon: '✅',
    color: 'bg-green-100 text-green-800'
  },
  ordered: {
    code: 'ordered',
    displayName: 'Commandée',
    description: 'Les ingrédients ont été ajoutés au panier ou commandés.',
    icon: '🛒',
    color: 'bg-purple-100 text-purple-800'
  },
  completed: {
    code: 'completed',
    displayName: 'Complète',
    description: 'Recette préparée et tous les ingrédients sont traités.',
    icon: '🍽️',
    color: 'bg-emerald-100 text-emerald-800'
  },
  archived: {
    code: 'archived',
    displayName: 'Archivée',
    description: 'Recette terminée ou mise de côté, non modifiable.',
    icon: '📦',
    color: 'bg-slate-100 text-slate-800'
  },
  rejected: {
    code: 'rejected',
    displayName: 'Rejetée',
    description: 'Recette refusée (incomplète, non conforme, etc.).',
    icon: '❌',
    color: 'bg-red-100 text-red-800'
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiImage {
  data?: {
    id: number
    attributes: {
      name: string
      alternativeText?: string
      caption?: string
      width: number
      height: number
      formats?: {
        thumbnail?: StrapiImageFormat
        small?: StrapiImageFormat
        medium?: StrapiImageFormat
        large?: StrapiImageFormat
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata?: any
      createdAt: string
      updatedAt: string
    }
  }
}

export interface StrapiImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export interface StrapiCategory {
  id: number
  categoryName: string
  categoryDescription?: string
  categorySlug?: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  categoryImage?: any
}

export interface StrapiUser {
  id: number
  attributes: {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiRecipe {
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
    recipeState?: RecipeStatus
    createdAt: string
    updatedAt: string
    publishedAt: string
    image?: StrapiImage
    recipieCategory?: {
      data?: StrapiCategory
    }
    author?: {
      data?: StrapiUser
    }
  }
}

// Types pour les paramètres de requête
export interface RecipeFilters {
  title?: {
    $contains?: string
  }
  difficulty?: {
    $eq?: string
  }
  isRobotCompatible?: {
    $eq?: boolean
  }
  recipieCategory?: {
    id?: {
      $eq?: number
    }
  }
  duration?: {
    $lte?: number
    $gte?: number
  }
  rating?: {
    $gte?: number
  }
  recipeState?: {
    $eq?: RecipeStatus
  }
}

export interface RecipeSort {
  [key: string]: 'asc' | 'desc'
}

export interface RecipeParams {
  populate?: string | string[] | object
  filters?: RecipeFilters
  sort?: RecipeSort | string
  pagination?: {
    page?: number
    pageSize?: number
    withCount?: boolean
  }
  fields?: string[]
  locale?: string | string[]
}

// Types pour les réponses API
export type RecipesResponse = StrapiResponse<StrapiRecipe[]>
export type RecipeResponse = StrapiResponse<StrapiRecipe>
export type CategoriesResponse = StrapiResponse<StrapiCategory[]>
export type CategoryResponse = StrapiResponse<StrapiCategory>

// Types pour les données de création/mise à jour
export interface CreateRecipeData {
  title: string
  description?: string
  ingredients?: any
  instructions?: string
  duration?: number
  difficulty?: 'Facile' | 'Intermédiaire' | 'Difficile'
  servings?: number
  tags?: string[]
  isRobotCompatible?: boolean
  recipeState?: RecipeStatus
  recipieCategory?: number
  author?: number
}

export interface UpdateRecipeData extends Partial<CreateRecipeData> {
  rating?: number
}

// Types pour les hooks et composants
export interface UseRecipesOptions {
  filters?: RecipeFilters
  sort?: RecipeSort
  pagination?: {
    page?: number
    pageSize?: number
  }
  enabled?: boolean
}

// Type for flexible recipe data (can be flat or nested)
export interface FlexibleRecipe {
  id: number
  title?: string
  description?: string
  ingredients?: any
  instructions?: string
  duration?: number
  difficulty?: 'Facile' | 'Intermédiaire' | 'Difficile'
  servings?: number
  rating?: number
  tags?: string[]
  isRobotCompatible?: boolean
  recipeState?: RecipeStatus
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  image?: any
  recipieCategory?: any
  author?: any
  // Strapi v4 format
  attributes?: {
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
    recipeState?: RecipeStatus
    createdAt: string
    updatedAt: string
    publishedAt: string
    image?: StrapiImage
    recipieCategory?: {
      data?: StrapiCategory
    }
    author?: {
      data?: StrapiUser
    }
  }
}

export interface RecipeCardProps {
  recipe: FlexibleRecipe | StrapiRecipe
  onStartCooking?: (recipe: StrapiRecipe) => void
  onFavorite?: (recipe: StrapiRecipe) => void
  showCategory?: boolean
  showRating?: boolean
  showTags?: boolean
  showStatus?: boolean
  compact?: boolean
}

export interface RecipeFiltersState {
  category: string
  difficulty: string
  searchQuery: string
  sortBy: string
  robotCompatible?: boolean
  maxDuration?: number
  minRating?: number
}

// console.log('Fetched recipes:', data.data);
// console.log('Filtered recipes:', filteredRecipes); 

// Types pour les plans de semaine
export interface StrapiWeeklyPlan {
  id: number
  attributes: {
    userId: number
    weekStart: string
    weekEnd: string
    selections: {
      mealTypes: string[]
      portions: string
      preferences: string[]
      cookingMode: string
      difficulty: string
      cookingTime: string
      cuisineType: string
    }
    status: 'draft' | 'active' | 'completed' | 'archived'
    createdAt: string
    updatedAt: string
    user?: {
      data?: StrapiUser
    }
    weekly_plan_meals?: {
      data?: StrapiWeeklyPlanMeal[]
    }
  }
}

export interface StrapiWeeklyPlanMeal {
  id: number
  attributes: {
    day: string
    mealType: 'petit-dejeuner' | 'dejeuner' | 'collation' | 'diner'
    status: 'accepted' | 'declined' | 'pending'
    userNotes?: string
    createdAt: string
    updatedAt: string
    weekly_plan?: {
      data?: StrapiWeeklyPlan
    }
    recipe?: {
      data?: StrapiRecipe
    }
    alternatives?: {
      data?: StrapiWeeklyPlanMealAlternative[]
    }
    changes?: {
      data?: StrapiWeeklyPlanMealChange[]
    }
  }
}

// Nouvelle table pour les alternatives de recettes
export interface StrapiWeeklyPlanMealAlternative {
  id: number
  attributes: {
    reason: 'ingredients-missing' | 'time-constraint' | 'difficulty' | 'preference' | 'seasonal' | 'dietary' | 'allergy' | 'budget' | 'other'
    reasonDetails?: string
    isSelected: boolean
    createdAt: string
    updatedAt: string
    weekly_plan_meal?: {
      data?: StrapiWeeklyPlanMeal
    }
    recipe?: {
      data?: StrapiRecipe
    }
  }
}

// Nouvelle table pour l'historique des changements
export interface StrapiWeeklyPlanMealChange {
  id: number
  attributes: {
    changeType: 'recipe-switch' | 'status-change' | 'alternative-selected' | 'notes-updated'
    reason: 'ingredients-missing' | 'time-constraint' | 'difficulty' | 'preference' | 'seasonal' | 'dietary' | 'allergy' | 'budget' | 'other'
    reasonDetails?: string
    previousValue?: string
    newValue?: string
    createdAt: string
    updatedAt: string
    weekly_plan_meal?: {
      data?: StrapiWeeklyPlanMeal
    }
    previousRecipe?: {
      data?: StrapiRecipe
    }
    newRecipe?: {
      data?: StrapiRecipe
    }
  }
}

// Types pour les raisons de changement
export interface ChangeReason {
  id: string
  label: string
  icon: string
  description: string
}

// Types pour les réponses API
export interface WeeklyPlansResponse {
  data: StrapiWeeklyPlan[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface WeeklyPlanMealsResponse {
  data: StrapiWeeklyPlanMeal[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface WeeklyPlanMealAlternativesResponse {
  data: StrapiWeeklyPlanMealAlternative[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface WeeklyPlanMealChangesResponse {
  data: StrapiWeeklyPlanMealChange[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Format d'affichage des plans de semaine
export interface WeeklyPlanData {
  weekStart: string
  selections: {
    mealTypes: string[]
    portions: string
    preferences: string[]
    cookingMode: string
    difficulty: string
    cookingTime: string
    cuisineType: string
  }
  days: Array<{
    date: string
    day: string
  }>
  meals: Array<{
    name: string
    icon: string
    recipes: Array<{
      id: number
      name: string
      time: string
      portions: string
      rating: number
      tags: string[]
      image: string
      status: 'accepted' | 'declined' | 'pending'
      alternatives?: Array<{
        id: number
        recipe: {
          id: number
          name: string
          time: string
          portions: string
          rating: number
          tags: string[]
          image: string
        }
        reason: string
        reasonDetails?: string
        isSelected: boolean
      }>
      changes?: Array<{
        id: number
        changeType: string
        reason: string
        reasonDetails?: string
        previousValue?: string
        newValue?: string
        createdAt: string
      }>
    }>
  }>
} 