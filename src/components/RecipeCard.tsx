import React from 'react'

// Types simplifiés
interface RecipeCardProps {
  recipe: any
  onStartCooking?: (recipe: any) => void
  onFavorite?: (recipe: any) => void
  showCategory?: boolean
  showRating?: boolean
  showTags?: boolean
  showStatus?: boolean
  compact?: boolean
  customColors?: {
    duration?: { bg: string; text: string }
    servings?: { bg: string; text: string }
    difficulty?: { bg: string; text: string }
    rating?: { bg: string; text: string }
  }
}

// Helper functions
const getRecipeTitle = (recipe: any): string => {
  return recipe.attributes?.title || recipe.title || 'Sans titre'
}

const getRecipeDuration = (recipe: any): number => {
  return recipe.attributes?.duration || recipe.duration || 0
}

const getRecipeServings = (recipe: any): number => {
  return recipe.attributes?.servings || recipe.servings || 1
}

const getRecipeDifficulty = (recipe: any): string => {
  return recipe.attributes?.difficulty || recipe.difficulty || 'Facile'
}

const getRecipeRating = (recipe: any): number => {
  return recipe.attributes?.rating || recipe.rating || 0
}

const getRecipeStatus = (recipe: any) => {
  return recipe.recipeState || recipe.attributes?.recipeState || 'draft'
}

const getRecipeImageUrl = (recipe: any): string | null => {
  if (recipe?.image?.formats?.medium?.url) {
    return recipe.image.formats.medium.url;
  }
  if (recipe?.image?.url) {
    return recipe.image.url;
  }
  if (recipe?.attributes?.image?.data?.attributes?.formats?.medium?.url) {
    return recipe.attributes.image.data.attributes.formats.medium.url;
  }
  if (recipe?.attributes?.image?.data?.attributes?.url) {
    return recipe.attributes.image.data.attributes.url;
  }
  return null;
};

const FALLBACK_IMAGE = '/Images/fallback-recipe.jpg';

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
      return { text: '#059669', bg: '#d1fae5' }
    case 'Intermédiaire':
      return { text: '#d97706', bg: '#fef3c7' }
    case 'Difficile':
      return { text: '#dc2626', bg: '#fee2e2' }
    default:
      return { text: '#6b7280', bg: '#f3f4f6' }
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft':
      return { text: '#6b7280', bg: '#f3f4f6' }
    case 'saved':
      return { text: '#059669', bg: '#d1fae5' }
    case 'submitted':
      return { text: '#d97706', bg: '#fef3c7' }
    case 'approved':
      return { text: '#059669', bg: '#d1fae5' }
    case 'ordered':
      return { text: '#7c3aed', bg: '#ede9fe' }
    case 'completed':
      return { text: '#059669', bg: '#d1fae5' }
    case 'archived':
      return { text: '#6b7280', bg: '#f3f4f6' }
    case 'rejected':
      return { text: '#dc2626', bg: '#fee2e2' }
    default:
      return { text: '#6b7280', bg: '#f3f4f6' }
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
  compact = false,
  customColors
}) => {
  const title = getRecipeTitle(recipe)
  const duration = getRecipeDuration(recipe)
  const servings = getRecipeServings(recipe)
  const difficulty = getRecipeDifficulty(recipe)
  const rating = getRecipeRating(recipe)
  const status = getRecipeStatus(recipe)
  const imageUrl = getRecipeImageUrl(recipe) || FALLBACK_IMAGE
  const isRobotCompatible = recipe.attributes?.isRobotCompatible || recipe.isRobotCompatible || false

  const handleCardClick = () => {
    if (onStartCooking) {
      onStartCooking(recipe)
    } else {
      window.location.href = `/cuisson-guidee?id=${recipe.id || recipe.attributes?.id}`
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onFavorite) {
      onFavorite(recipe)
    }
  }

  // Compact version for home page
  if (compact) {
    return (
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '267px'
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
        data-testid="recipe-card"
      >
        <div style={{ position: 'relative' }}>
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: '100%',
              height: '192px',
              objectFit: 'cover',
              borderRadius: '12px 12px 0 0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginBottom: '0'
            }}
          />
          
          {/* Status and Robot badges */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {showStatus && (
              <span style={{
                fontSize: '12px',
                padding: '2px 4px',
                borderRadius: '4px',
                backgroundColor: getStatusColor(status).bg,
                color: getStatusColor(status).text,
                fontWeight: 'bold'
              }}>
                {status}
              </span>
            )}
            {isRobotCompatible && (
              <span style={{
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '2px 4px',
                borderRadius: '4px',
                backdropFilter: 'blur(4px)'
              }}>
                🤖 Robot
              </span>
            )}
          </div>

          {/* Favorite button */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px'
          }}>
            <button
              onClick={handleFavorite}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              ❤️
            </button>
          </div>
        </div>

        {/* Content with light gray background */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '12px',
          borderRadius: '0 0 8px 8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(2/7 * 12rem)'
        }}>
          {/* Line 1: Title */}
          <div>
            <h3 style={{
              fontWeight: 'bold',
              color: '#333',
              fontSize: '16px',
              margin: '0 0 8px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {title}
            </h3>
          </div>

          {/* Line 2: Duration + Servings + Difficulty + Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#666',
            fontSize: '12px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              backgroundColor: customColors?.duration?.bg || 'transparent',
              color: customColors?.duration?.text || '#666',
              padding: customColors?.duration ? '2px 4px' : '0',
              borderRadius: customColors?.duration ? '4px' : '0'
            }}>
              <span style={{ fontSize: '12px' }}>⏱️</span>
              <span style={{ fontSize: '12px' }}>{formatDuration(duration)}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              backgroundColor: customColors?.servings?.bg || 'transparent',
              color: customColors?.servings?.text || '#666',
              padding: customColors?.servings ? '2px 4px' : '0',
              borderRadius: customColors?.servings ? '4px' : '0'
            }}>
              <span style={{ fontSize: '12px' }}>👥</span>
              <span style={{ fontSize: '12px' }}>{servings} pers.</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              backgroundColor: customColors?.difficulty?.bg || 'transparent',
              color: customColors?.difficulty?.text || '#666',
              padding: customColors?.difficulty ? '2px 4px' : '0',
              borderRadius: customColors?.difficulty ? '4px' : '0'
            }}>
              <span style={{ fontSize: '12px' }}>👨‍🍳</span>
              <span style={{ fontSize: '12px' }}>{difficulty}</span>
            </div>
            {showRating && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                backgroundColor: customColors?.rating?.bg || 'transparent',
                color: customColors?.rating?.text || '#666',
                padding: customColors?.rating ? '2px 4px' : '0',
                borderRadius: customColors?.rating ? '4px' : '0'
              }}>
                <span style={{ fontSize: '12px', color: '#f59e0b' }}>⭐</span>
                <span style={{ fontSize: '12px' }}>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Full version
  return (
    <div 
      data-testid="recipe-card"
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '320px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '192px', backgroundColor: '#f3f4f6' }}>
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {showStatus && (
          <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
            <span style={{
              fontSize: '12px',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: getStatusColor(status).bg,
              color: getStatusColor(status).text,
              fontWeight: 'bold'
            }}>
              {status}
            </span>
          </div>
        )}

        {/* Favorite button */}
        <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
          <button
            onClick={handleFavorite}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            ❤️
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          margin: '0 0 8px 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {title}
        </h3>

        {/* Meta information */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {duration && (
            <span style={{
              fontSize: '12px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              ⏱️ {formatDuration(duration)}
            </span>
          )}
          {difficulty && (
            <span style={{
              fontSize: '12px',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: getDifficultyColor(difficulty).bg,
              color: getDifficultyColor(difficulty).text
            }}>
              {difficulty}
            </span>
          )}
          {servings && (
            <span style={{
              fontSize: '12px',
              backgroundColor: '#f3e8ff',
              color: '#7c3aed',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              👥 {servings} pers.
            </span>
          )}
        </div>

        {/* Rating */}
        {showRating && rating && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#fbbf24' }}>⭐</span>
            <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '4px' }}>{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Actions - Only show for full version */}
        {!compact && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {onStartCooking && (
              <button
                data-testid="start-cooking-button"
                onClick={handleCardClick}
                style={{
                  flex: 1,
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                }}
              >
                Commencer
              </button>
            )}
            {onFavorite && (
              <button
                data-testid="favorite-button"
                onClick={handleFavorite}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                }}
              >
                ❤️
              </button>
            )}
          </div>
        )}
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
  showRating?: boolean
  compact?: boolean
  customColors?: {
    duration?: { bg: string; text: string }
    servings?: { bg: string; text: string }
    difficulty?: { bg: string; text: string }
    rating?: { bg: string; text: string }
  }
}> = ({ recipes, title, onStartCooking, onFavorite, showStatus = false, showRating = false, compact = false, customColors }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      {title && (
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px',
          padding: '0 16px'
        }}>
          {title}
        </h3>
      )}
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: compact ? '50px' : '24px',
          padding: '0 16px 16px 16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          justifyContent: 'center'
        }}>
          {recipes.map((recipe) => (
            <div key={recipe.id} style={{ 
              flexShrink: 0,
                        width: compact ? '267px' : '280px',
          display: 'flex',
          justifyContent: 'center'
            }}>
              <RecipeCard
                recipe={recipe}
                onStartCooking={onStartCooking}
                onFavorite={onFavorite}
                showStatus={showStatus}
                showRating={showRating}
                compact={compact}
                customColors={customColors}
              />
            </div>
          ))}
        </div>
        {/* Indicateur de défilement */}
        {recipes.length > 3 && (
          <div style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            padding: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '16px', color: '#6b7280' }}>→</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeCard 