// Types pour l'API Strapi

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
  attributes: {
    categoryName: string // correspond au schéma Strapi
    categoryDescription?: string
    categorySlug?: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
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
  publicationState?: 'live' | 'preview'
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

export interface RecipeCardProps {
  recipe: StrapiRecipe
  onStartCooking?: (recipe: StrapiRecipe) => void
  onFavorite?: (recipe: StrapiRecipe) => void
  showCategory?: boolean
  showRating?: boolean
  showTags?: boolean
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