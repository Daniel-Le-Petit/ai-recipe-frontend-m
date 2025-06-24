import React from 'react'
import { Clock, Users, ChefHat, Star, Heart, Sparkles } from 'lucide-react'
import type { RecipeCardProps } from '@/types/api'

export const RecipeCard: React.FC<RecipeCardProps & { recipe: any }> = ({
  recipe,
  onStartCooking,
  onFavorite,
  showCategory = true,
  showRating = true,
  showTags = true
}) => {
  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (recipe: any): string => {
    // Structure Strapi v4 (avec attributes)
    if (recipe.attributes?.image?.data?.attributes) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
      const imageUrl = recipe.attributes.image.data.attributes.url
      return imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`
    }
    // Structure à plat
    if (recipe.image) {
      return recipe.image;
    }
    // Fallback image
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
    <div
      className="bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => {
        const id = recipe.id || recipe.attributes?.id;
        window.location.href = `/creer-recette?id=${id}&fromCard=1`;
      }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-800">
        <img
          src={getImageUrl(recipe)}
          alt={recipe.title || recipe.attributes?.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }}
        />
        {recipe.isRobotCompatible || recipe.attributes?.isRobotCompatible ? (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            🤖 Robot
          </div>
        ) : null}
        {showCategory && (
          <div className="absolute top-2 left-2 bg-green-700 text-white px-2 py-1 rounded-full text-xs font-medium">
            {getCategoryName(recipe)}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-0">
        <div className="bg-gradient-to-r from-herb-green via-sage to-herb-dark px-4 py-3 rounded-b-xl">
          <h3 className="font-semibold text-lg mb-1 text-white line-clamp-2">
            {recipe.title || recipe.attributes?.title}
          </h3>
          {(recipe.description || recipe.attributes?.description) && (
            <p className="text-white/90 text-sm line-clamp-2">
              {recipe.description || recipe.attributes?.description}
            </p>
          )}
          {/* Métadonnées en vert */}
          <div className="flex items-center gap-4 text-sm text-white mt-2">
            {(recipe.duration || recipe.attributes?.duration) && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-white" />
                {(recipe.duration || recipe.attributes?.duration)} min
              </div>
            )}
            {(recipe.servings || recipe.attributes?.servings) && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-white" />
                {(recipe.servings || recipe.attributes?.servings)} pers.
              </div>
            )}
            {(recipe.difficulty || recipe.attributes?.difficulty) && (
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4 text-white" />
                {mapDifficulty(recipe.difficulty || recipe.attributes?.difficulty)}
              </div>
            )}
            {showRating && (recipe.rating || recipe.attributes?.rating) && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
                <span className="text-white font-medium">
                  {(recipe.rating || recipe.attributes?.rating)?.toFixed ? (recipe.rating || recipe.attributes?.rating).toFixed(1) : (recipe.rating || recipe.attributes?.rating)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {showTags && (recipe.tags || recipe.attributes?.tags) && (recipe.tags || recipe.attributes?.tags).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {(recipe.tags || recipe.attributes?.tags).slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeCard 