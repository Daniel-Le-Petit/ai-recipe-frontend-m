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

        {/* Action buttons - Only show for full version */}
        {!compact && (
          <div style={{ 
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid #f3f4f6'
          }}>
            {(() => {
              switch (status) {
                case 'draft':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleCardClick}
                        style={{
                          flex: 1,
                          backgroundColor: '#20B251',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1a8f42'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#20B251'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        ✏️ Continuer l'édition
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
                            console.log('Delete recipe:', recipe.id)
                          }
                        }}
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '48px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fecaca'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fee2e2'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  )

                case 'saved':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          // Handle submit for approval
                          console.log('Submit recipe for approval:', recipe.id)
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2563eb'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#3b82f6'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        📤 Soumettre pour validation
                      </button>
                      <button
                        onClick={handleCardClick}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '80px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                      >
                        ✏️ Modifier
                      </button>
                    </div>
                  )

                case 'submitted':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        disabled
                        style={{
                          flex: 1,
                          backgroundColor: '#fef3c7',
                          color: '#d97706',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: '1px solid #fde68a',
                          cursor: 'not-allowed',
                          opacity: '0.8'
                        }}
                      >
                        ⏳ En attente de validation
                      </button>
                      <button
                        onClick={() => {
                          console.log('View status:', recipe.id)
                        }}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '100px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                      >
                        📊 Voir le statut
                      </button>
                    </div>
                  )

                case 'approved':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleCardClick}
                        style={{
                          flex: 1,
                          backgroundColor: '#20B251',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1a8f42'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#20B251'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        🍳 Commencer la cuisson
                      </button>
                      <button
                        onClick={() => {
                          console.log('Order ingredients:', recipe.id)
                        }}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '120px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                      >
                        🛒 Commander
                      </button>
                    </div>
                  )

                case 'completed':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleCardClick}
                        style={{
                          flex: 1,
                          backgroundColor: '#20B251',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1a8f42'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#20B251'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        🔄 Refaire cette recette
                      </button>
                      <button
                        onClick={() => {
                          console.log('Rate recipe:', recipe.id)
                        }}
                                                 style={{
                           backgroundColor: '#fef3c7',
                           color: '#d97706',
                           border: '1px solid #fde68a',
                           padding: '10px 16px',
                           borderRadius: '8px',
                           fontSize: '14px',
                           fontWeight: '600',
                           cursor: 'pointer',
                           transition: 'all 0.2s ease',
                           minWidth: '100px'
                         }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fde68a'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fef3c7'
                        }}
                      >
                        ⭐ Noter
                      </button>
                    </div>
                  )

                case 'rejected':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          console.log('View feedback:', recipe.id)
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#fef3c7',
                          color: '#d97706',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: '1px solid #fde68a',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fde68a'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fef3c7'
                        }}
                      >
                        📝 Voir les commentaires
                      </button>
                      <button
                        onClick={() => {
                          console.log('Edit and resubmit:', recipe.id)
                        }}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '120px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                      >
                        ✏️ Modifier
                      </button>
                    </div>
                  )

                case 'ordered':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          console.log('Track order:', recipe.id)
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#7c3aed',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#6d28d9'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#7c3aed'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        📦 Suivre la commande
                      </button>
                      <button
                        onClick={() => {
                          console.log('View order details:', recipe.id)
                        }}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '120px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                      >
                        📋 Détails commande
                      </button>
                    </div>
                  )

                case 'archived':
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          console.log('Restore recipe:', recipe.id)
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: '#6b7280',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#4b5563'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#6b7280'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        🔄 Restaurer
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette recette ?')) {
                            console.log('Permanently delete recipe:', recipe.id)
                          }
                        }}
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '80px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fecaca'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fee2e2'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  )

                default:
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleCardClick}
                        style={{
                          flex: 1,
                          backgroundColor: '#6b7280',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#4b5563'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#6b7280'
                        }}
                      >
                        Voir les détails
                      </button>
                    </div>
                  )
              }
            })()}
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