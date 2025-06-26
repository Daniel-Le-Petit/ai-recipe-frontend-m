import React from 'react'
import { Clock, Users, ChefHat, Star, Heart, Sparkles } from 'lucide-react'
import type { RecipeCardProps, StrapiRecipe } from '@/types/api'

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
    return recipe.attributes.recipieCategory?.data?.categoryName || 'Non catégorisée'
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
      className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group flex flex-col bg-transparent"
      onClick={() => {
        const id = recipe.id || recipe.attributes?.id;
        window.location.href = `/creer-recette?id=${id}&fromCard=1`;
      }}
    >
      {/* Image */}
      <div className="relative h-32 bg-gray-800">
        <img
          src={getImageUrl(recipe)}
          alt={recipe.title || recipe.attributes?.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }}
        />
      </div>
      {/* Bloc infos */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="bg-herb-green px-4 py-2 rounded-b-xl min-h-[70px] max-h-[70px] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-base text-white line-clamp-1">
              {recipe.title || recipe.attributes?.title}
            </h3>
            {(recipe.isRobotCompatible || recipe.attributes?.isRobotCompatible) && (
              <span className="flex items-center gap-1 ml-2 text-xs text-white"><span>🤖</span>Robot</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-white">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{recipe.duration || recipe.attributes?.duration || 0} min</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{recipe.servings || recipe.attributes?.servings || 1} pers.</span>
            <span className="flex items-center gap-1"><ChefHat className="w-4 h-4" />{mapDifficulty(recipe.difficulty || recipe.attributes?.difficulty)}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-300 fill-current" />{(recipe.rating || recipe.attributes?.rating || 0).toFixed ? (recipe.rating || recipe.attributes?.rating || 0).toFixed(1) : (recipe.rating || recipe.attributes?.rating || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard 