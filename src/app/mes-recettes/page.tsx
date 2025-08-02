'use client'

import { useState, useEffect } from 'react'
import { RecipeCard } from '../../components/RecipeCard'
import { FadeIn } from '../../components/FadeIn'
import { SlideIn } from '../../components/SlideIn'
import { Pulse } from '../../components/Pulse'

// Mock data for recipes
const mockRecipes = [
  {
    id: 1,
    title: 'Poulet rôti aux herbes de Provence',
    description: 'Un délicieux poulet rôti avec des herbes fraîches et des légumes de saison',
    duration: 45,
    difficulty: 'Facile',
    servings: 4,
    rating: 4.5,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'approved',
    isRobotCompatible: true,
    category: 'Plat principal',
    tags: ['Poulet', 'Herbes', 'Rôti'],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Salade composée méditerranéenne',
    description: 'Une salade fraîche et colorée avec des ingrédients méditerranéens',
    duration: 20,
    difficulty: 'Facile',
    servings: 2,
    rating: 4.2,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'saved',
    isRobotCompatible: false,
    category: 'Entrée',
    tags: ['Salade', 'Méditerranéen', 'Végétarien'],
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Tarte aux pommes traditionnelle',
    description: 'La recette de grand-mère avec une pâte brisée maison',
    duration: 90,
    difficulty: 'Intermédiaire',
    servings: 6,
    rating: 4.8,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'completed',
    isRobotCompatible: true,
    category: 'Dessert',
    tags: ['Dessert', 'Pommes', 'Tarte'],
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    title: 'Risotto aux champignons sauvages',
    description: 'Un risotto crémeux et parfumé aux champignons de saison',
    duration: 35,
    difficulty: 'Intermédiaire',
    servings: 3,
    rating: 4.3,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'draft',
    isRobotCompatible: false,
    category: 'Plat principal',
    tags: ['Risotto', 'Champignons', 'Italien'],
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    title: 'Soupe à l\'oignon gratinée',
    description: 'Une soupe réconfortante avec du fromage gratiné',
    duration: 60,
    difficulty: 'Facile',
    servings: 4,
    rating: 4.6,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'submitted',
    isRobotCompatible: true,
    category: 'Soupe',
    tags: ['Soupe', 'Oignon', 'Gratin'],
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Tiramisu classique',
    description: 'Le dessert italien par excellence avec du mascarpone',
    duration: 120,
    difficulty: 'Difficile',
    servings: 8,
    rating: 4.9,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'approved',
    isRobotCompatible: false,
    category: 'Dessert',
    tags: ['Dessert', 'Italien', 'Café'],
    createdAt: '2024-01-03'
  }
]

const statusFilters = [
  { id: 'all', label: 'Toutes', icon: '📋' },
  { id: 'draft', label: 'Brouillons', icon: '📝' },
  { id: 'saved', label: 'Sauvegardées', icon: '💾' },
  { id: 'submitted', label: 'Soumises', icon: '📤' },
  { id: 'approved', label: 'Approuvées', icon: '✅' },
  { id: 'completed', label: 'Terminées', icon: '🎉' }
]

const categoryFilters = [
  'Toutes',
  'Entrée',
  'Plat principal',
  'Dessert',
  'Soupe',
  'Salade'
]

export default function MesRecettesPage() {
  const [recipes, setRecipes] = useState(mockRecipes)
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('Toutes')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  useEffect(() => {
    let filtered = recipes

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.recipeState === statusFilter)
    }

    // Filter by category
    if (categoryFilter !== 'Toutes') {
      filtered = filtered.filter(recipe => recipe.category === categoryFilter)
    }

    // Sort recipes
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration)
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredRecipes(filtered)
  }, [recipes, searchTerm, statusFilter, categoryFilter, sortBy])

  const handleStartCooking = (recipe: any) => {
    console.log('Commencer la cuisson:', recipe.title)
    window.location.href = `/cuisson-guidee?id=${recipe.id}`
  }

  const handleFavorite = (recipe: any) => {
    console.log('Ajouter aux favoris:', recipe.title)
  }

  const handleDeleteRecipe = (recipeId: number) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId))
  }

  const getStatusCount = (status: string) => {
    if (status === 'all') return recipes.length
    return recipes.filter(recipe => recipe.recipeState === status).length
  }

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Hero Section */}
      <SlideIn direction="down" delay={200}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '30px',
          textAlign: 'center',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <FadeIn delay={400}>
            <div style={{
              background: 'linear-gradient(135deg, #20B251 0%, #10b981 100%)',
              borderRadius: '50px',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 8px 32px rgba(32, 178, 81, 0.3)'
            }}>
              <span style={{ fontSize: '40px' }}>🍽️</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={600}>
            <h1 style={{ 
              color: '#1f2937', 
              fontSize: '36px', 
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              Mes Recettes
            </h1>
          </FadeIn>

          <FadeIn delay={800}>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '18px', 
              margin: '0 0 20px 0'
            }}>
              Gérez et suivez vos recettes personnalisées créées par l'IA
            </p>
          </FadeIn>

          <FadeIn delay={1000}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: '#f0fdf4',
                color: '#20B251',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid #bbf7d0'
              }}>
                📊 {recipes.length} recettes au total
              </div>
              <div style={{
                background: '#fef3c7',
                color: '#d97706',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid #fde68a'
              }}>
                ⭐ {recipes.filter(r => r.rating >= 4.5).length} favoris
              </div>
              <div style={{
                background: '#ede9fe',
                color: '#7c3aed',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid #ddd6fe'
              }}>
                🤖 {recipes.filter(r => r.isRobotCompatible).length} compatibles IA
              </div>
            </div>
          </FadeIn>
        </div>
      </SlideIn>

      {/* Search and Filters */}
      <SlideIn direction="up" delay={1200}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          {/* Search Bar */}
          <FadeIn delay={1400}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                position: 'relative',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <input
                  type="text"
                  placeholder="🔍 Rechercher une recette..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 50px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20B251'
                    e.target.style.background = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb'
                    e.target.style.background = '#f9fafb'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '18px',
                  color: '#9ca3af'
                }}>
                  🔍
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={1600}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px'
            }}>
              {/* Status Filters */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {statusFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    style={{
                      background: statusFilter === filter.id ? '#20B251' : '#f3f4f6',
                      color: statusFilter === filter.id ? 'white' : '#6b7280',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      if (statusFilter !== filter.id) {
                        e.target.style.background = '#e5e7eb'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (statusFilter !== filter.id) {
                        e.target.style.background = '#f3f4f6'
                      }
                    }}
                  >
                    <span>{filter.icon}</span>
                    {filter.label}
                    <span style={{
                      background: statusFilter === filter.id ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                      color: statusFilter === filter.id ? 'white' : '#6b7280',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      marginLeft: '4px'
                    }}>
                      {getStatusCount(filter.id)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Category and Sort Controls */}
          <FadeIn delay={1800}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {/* Category Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
                  Catégorie:
                </span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filtrer par catégorie"
                  style={{
                    padding: '8px 12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: 'white',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {categoryFilters.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
                  Trier par:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Trier les recettes"
                  style={{
                    padding: '8px 12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: 'white',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="recent">Plus récentes</option>
                  <option value="rating">Meilleures notes</option>
                  <option value="duration">Durée croissante</option>
                  <option value="title">Ordre alphabétique</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
                  Affichage:
                </span>
                <div style={{
                  display: 'flex',
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '2px'
                }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    style={{
                      background: viewMode === 'grid' ? '#20B251' : 'transparent',
                      color: viewMode === 'grid' ? 'white' : '#6b7280',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📱 Grille
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      background: viewMode === 'list' ? '#20B251' : 'transparent',
                      color: viewMode === 'list' ? 'white' : '#6b7280',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📋 Liste
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SlideIn>

      {/* Results Count */}
      <FadeIn delay={2000}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            margin: '0'
          }}>
            {filteredRecipes.length} recette{filteredRecipes.length !== 1 ? 's' : ''} trouvée{filteredRecipes.length !== 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
          </p>
        </div>
      </FadeIn>

      {/* Recipe Grid/List */}
      <SlideIn direction="up" delay={2200}>
        {filteredRecipes.length > 0 ? (
          <div style={{
            display: viewMode === 'grid' ? 'grid' : 'block',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : 'none',
            gap: '24px'
          }}>
            {filteredRecipes.map((recipe, index) => (
              <FadeIn key={recipe.id} delay={2400 + index * 100}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  <RecipeCard
                    recipe={recipe}
                    onStartCooking={handleStartCooking}
                    onFavorite={handleFavorite}
                    showStatus={true}
                    showRating={true}
                    showTags={true}
                    compact={viewMode === 'list'}
                  />
                  
                  {/* Action Buttons */}
                  <div style={{
                    padding: '16px',
                    borderTop: '1px solid #f3f4f6',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => handleStartCooking(recipe)}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #20B251 0%, #10b981 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      🍳 Commencer
                    </button>
                    <button
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#fecaca'
                        e.target.style.transform = 'scale(1.02)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#fee2e2'
                        e.target.style.transform = 'scale(1)'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={2400}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '60px 40px',
              textAlign: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '20px'
              }}>
                🍽️
              </div>
              <h3 style={{
                color: '#1f2937',
                fontSize: '24px',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                Aucune recette trouvée
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '16px',
                margin: '0 0 20px 0'
              }}>
                {searchTerm ? 'Essayez de modifier vos critères de recherche.' : 'Commencez par créer votre première recette !'}
              </p>
              <button
                onClick={() => window.location.href = '/creer-recette'}
                style={{
                  background: 'linear-gradient(135deg, #20B251 0%, #10b981 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 16px rgba(32, 178, 81, 0.3)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✨ Créer une recette
              </button>
            </div>
          </FadeIn>
        )}
      </SlideIn>
    </div>
  )
} 