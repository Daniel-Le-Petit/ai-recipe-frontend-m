import React from 'react'
import { Clock, Users, ChefHat, Star, Heart, Sparkles } from 'lucide-react'
import type { RecipeCardProps, StrapiRecipe, FlexibleRecipe, RecipeStatus } from '@/types/api'
import { RecipeStatusBadge } from './RecipeStatusBadge'

// Helper function to normalize recipe data structure
const allowedDifficulties = ['Facile', 'Intermédiaire', 'Difficile'] as const;
type AllowedDifficulty = typeof allowedDifficulties[number];

const allowedRecipeStates = ['draft', 'saved', 'submitted', 'approved', 'ordered', 'completed', 'archived', 'rejected'] as const;
type AllowedRecipeState = typeof allowedRecipeStates[number];

const normalizeRecipe = (recipe: FlexibleRecipe | StrapiRecipe): StrapiRecipe => {
  // If recipe already has the correct structure, return it
  if (recipe && recipe.attributes) {
    return recipe as StrapiRecipe
  }
  
  // If recipe is in flat format, wrap it in attributes
  if (recipe && typeof recipe === 'object') {
    const { id, ...attributes } = recipe as any
    // Type guard for difficulty
    let difficulty: AllowedDifficulty = 'Facile';
    if (allowedDifficulties.includes(attributes.difficulty)) {
      difficulty = attributes.difficulty;
    }
    // Type guard for recipeState
    let recipeState: AllowedRecipeState = 'draft';
    if (allowedRecipeStates.includes(attributes.recipeState)) {
      recipeState = attributes.recipeState;
    }
    return {
      id: id || (recipe as any).id,
      attributes: {
        title: (attributes.title as string) || '',
        description: (attributes.description as string) || '',
        ingredients: attributes.ingredients || [],
        instructions: (attributes.instructions as string) || '',
        duration: (attributes.duration as number) || 0,
        difficulty,
        servings: (attributes.servings as number) || 1,
        rating: (attributes.rating as number) || 0,
        tags: (attributes.tags as string[]) || [],
        isRobotCompatible: (attributes.isRobotCompatible as boolean) || false,
        recipeState: recipeState as RecipeStatus,
        createdAt: (attributes.createdAt as string) || new Date().toISOString(),
        updatedAt: (attributes.updatedAt as string) || new Date().toISOString(),
        publishedAt: (attributes.publishedAt as string) || new Date().toISOString(),
        image: undefined,
        recipieCategory: attributes.recipieCategory ? { data: attributes.recipieCategory } : undefined,
        author: attributes.author ? { data: attributes.author } : undefined
      }
    }
  }
  
  // Fallback for invalid data
  return {
    id: 0,
    attributes: {
      title: 'Recette invalide',
      description: '',
      ingredients: [],
      instructions: '',
      duration: 0,
      difficulty: 'Facile',
      servings: 1,
      rating: 0,
      tags: [],
      isRobotCompatible: false,
      recipeState: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      image: undefined,
      recipieCategory: undefined,
      author: undefined
    }
  }
}

// Helper functions to safely access recipe properties
const getRecipeTitle = (recipe: any): string => {
  return recipe.attributes?.title || (recipe as any).title || 'Sans titre'
}

const getRecipeDuration = (recipe: any): number => {
  return recipe.attributes?.duration || (recipe as any).duration || 0
}

const getRecipeServings = (recipe: any): number => {
  return recipe.attributes?.servings || (recipe as any).servings || 1
}

const getRecipeDifficulty = (recipe: any): string => {
  return recipe.attributes?.difficulty || (recipe as any).difficulty || 'Facile'
}

const getRecipeRating = (recipe: any): number => {
  return recipe.attributes?.rating || (recipe as any).rating || 0
}

const getRecipeStatus = (recipe: any) => {
  return recipe.recipeState || recipe.attributes?.recipeState || 'draft'
}

const getRecipeImage = (recipe: any) => {
  const normalizedRecipe = normalizeRecipe(recipe)
  const image = normalizedRecipe.attributes.image
  
  if (image?.data?.attributes?.formats?.medium?.url) {
    return image.data.attributes.formats.medium.url
  }
  if (image?.data?.attributes?.url) {
    return image.data.attributes.url
  }
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}

const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile':
      return 'text-green-600 bg-green-100'
    case 'Intermédiaire':
      return 'text-yellow-600 bg-yellow-100'
    case 'Difficile':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onStartCooking,
  onFavorite,
  showCategory = true,
  showRating = true,
  showTags = true,
  showStatus = true,
  compact = false
}) => {
  const normalizedRecipe = normalizeRecipe(recipe)
  const {
    title,
    description,
    duration,
    difficulty,
    servings,
    rating,
    tags,
    image,
    recipieCategory,
    recipeState,
    isRobotCompatible
  } = normalizedRecipe.attributes

  const handleCardClick = () => {
    if (onStartCooking) {
      onStartCooking(normalizedRecipe)
    } else {
      // Navigation par défaut
      window.location.href = `/cuisson-guidee?id=${normalizedRecipe.id}`
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Empêcher le clic sur la carte
    if (onFavorite) {
      onFavorite(normalizedRecipe)
    }
  }

  // Compact version for home page
  if (compact) {
    return (
      <div 
        data-testid="recipe-card"
        className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
          compact ? 'h-48' : 'h-64'
        } flex flex-col`}
        onClick={handleCardClick}
      >
        {/* Image with badges on top right - 5/7 of card height */}
        <div className={`relative ${compact ? 'h-[calc(5/7*12rem)]' : 'h-[calc(5/7*16rem)]'} bg-gray-200 flex-shrink-0`}>
          <img
            src={getRecipeImage(recipe)}
            alt={title || 'Recette'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }}
          />
          {/* Status and Robot badges on top right of image */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            {showStatus && (
              <RecipeStatusBadge status={getRecipeStatus(recipe)} />
            )}
            {isRobotCompatible && (
              <span className="text-xs bg-white/20 text-white px-1 py-0.5 rounded">
                🤖 Robot
              </span>
            )}
          </div>
        </div>

        {/* Content with AI & Fines Herbes green background - 2/7 of card height */}
        <div className={`${compact ? 'h-[calc(2/7*12rem)]' : 'h-[calc(2/7*16rem)]'} bg-[#20B251] p-3 flex flex-col justify-between`}>
          {/* Line 1: Title */}
          <div>
            <h3 className={`font-bold text-white line-clamp-1 ${compact ? 'text-xs' : 'text-sm'}`}>
              {title || 'Sans titre'}
            </h3>
          </div>

          {/* Line 2: Duration + Servings + Difficulty + Rating */}
          <div className="flex items-center justify-between text-white/90">
            <div className="flex items-center gap-1">
              <Clock className={`${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
              <span className={compact ? 'text-xs' : 'text-xs'}>{formatDuration(duration || 0)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className={`${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
              <span className={compact ? 'text-xs' : 'text-xs'}>{servings || 1} pers.</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className={`${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
              <span className={compact ? 'text-xs' : 'text-xs'}>{difficulty || 'Facile'}</span>
            </div>
            {showRating && (
              <div className="flex items-center gap-1">
                <Star className={`${compact ? 'w-2 h-2' : 'w-3 h-3'} text-yellow-300`} />
                <span className={compact ? 'text-xs' : 'text-xs'}>{(rating || 0).toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Full version (existing code)
  return (
    <div 
      data-testid="recipe-card"
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={getRecipeImage(recipe)}
          alt={title || 'Recette'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }}
        />
        {showStatus && (
          <div className="absolute top-2 right-2">
            <RecipeStatusBadge status={getRecipeStatus(recipe)} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title || 'Sans titre'}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Meta information */}
        <div className="flex flex-wrap gap-2 mb-3">
          {duration && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              ⏱️ {formatDuration(duration)}
            </span>
          )}
          {difficulty && (
            <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          )}
          {servings && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
              👥 {servings} pers.
            </span>
          )}
        </div>

        {/* Category */}
        {showCategory && recipieCategory?.data && (
          <div className="mb-3">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {recipieCategory.data.categoryName}
            </span>
          </div>
        )}

        {/* Rating */}
        {showRating && rating && (
          <div className="flex items-center mb-3">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Tags */}
        {showTags && tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500">+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onStartCooking && (
            <button
              data-testid="start-cooking-button"
              onClick={handleCardClick}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Commencer
            </button>
          )}
          {onFavorite && (
            <button
              data-testid="favorite-button"
              onClick={handleFavorite}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              ❤️
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Composant pour l'affichage horizontal avec défilement sur mobile
export const RecipeCardHorizontal: React.FC<{
  recipes: any[]
  title?: string
  onStartCooking?: (recipe: any) => void
  onFavorite?: (recipe: any) => void
  showStatus?: boolean
  compact?: boolean
}> = ({ recipes, title, onStartCooking, onFavorite, showStatus = false, compact = false }) => {
  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4 px-4">{title}</h3>
      )}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex-shrink-0" style={{ width: compact ? '200px' : '280px' }}>
              <RecipeCard
                recipe={recipe}
                onStartCooking={onStartCooking}
                onFavorite={onFavorite}
                showStatus={showStatus}
                compact={compact}
              />
            </div>
          ))}
        </div>
        {/* Indicateur de défilement */}
        {recipes.length > 3 && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeCard 