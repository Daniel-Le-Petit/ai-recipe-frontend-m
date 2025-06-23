import React from 'react'
import { Clock, Users, ChefHat, Star, Heart, Sparkles } from 'lucide-react'
import type { StrapiRecipe, RecipeCardProps } from '@/types/api'

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onStartCooking,
  onFavorite,
  showCategory = true,
  showRating = true,
  showTags = true
}) => {
  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (recipe: StrapiRecipe): string => {
    if (recipe.attributes.image?.data?.attributes) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
      const imageUrl = recipe.attributes.image.data.attributes.url
      return imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`
    }
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }

  // Fonction pour obtenir le nom de la catégorie
  const getCategoryName = (recipe: StrapiRecipe): string => {
    return recipe.attributes.recipieCategory?.data?.attributes?.name || 'Non catégorisée'
  }

  // Fonction pour mapper la difficulté
  const mapDifficulty = (difficulty: string): string => {
    switch (difficulty) {
      case 'Facile': return 'Facile'
      case 'Intermédiaire': return 'Moyen'
      case 'Difficile': return 'Difficile'
      default: return 'Facile'
    }
  }

  const handleStartCooking = () => {
    if (onStartCooking) {
      onStartCooking(recipe)
    } else {
      // Navigation par défaut
      window.location.href = `/cuisson-guidee?id=${recipe.id}`
    }
  }

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(recipe)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={getImageUrl(recipe)}
          alt={recipe.attributes.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }}
        />
        {recipe.attributes.isRobotCompatible && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            🤖 Robot
          </div>
        )}
        {showCategory && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {getCategoryName(recipe)}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
          {recipe.attributes.title}
        </h3>
        
        {recipe.attributes.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.attributes.description}
          </p>
        )}

        {/* Métadonnées */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {recipe.attributes.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {recipe.attributes.duration} min
            </div>
          )}
          {recipe.attributes.servings && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {recipe.attributes.servings} pers.
            </div>
          )}
          {recipe.attributes.difficulty && (
            <div className="flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              {mapDifficulty(recipe.attributes.difficulty)}
            </div>
          )}
        </div>

        {/* Note */}
        {showRating && recipe.attributes.rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {recipe.attributes.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Tags */}
        {showTags && recipe.attributes.tags && recipe.attributes.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {recipe.attributes.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleStartCooking}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Commencer
          </button>
          <button 
            onClick={handleFavorite}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard 