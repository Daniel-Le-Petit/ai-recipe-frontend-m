'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FadeIn } from '../../components/FadeIn'
import { SlideIn } from '../../components/SlideIn'

// Types pour les filtres
interface RecipeFilters {
  mealTypes: string[]
  portions: string
  preferences: string
  cookingMode: string
  difficulty: string
  cookingTime: string
  cuisineTypes: string[]
}

// Données des options de filtres
const MEAL_TYPES = [
  { id: 'petit-dejeuner', name: 'Petit déjeuner', icon: '🌿' },
  { id: 'dejeuner', name: 'Déjeuner', icon: '🥗' },
  { id: 'brunch', name: 'Brunch', icon: '🥐' },
  { id: 'collation', name: 'Collation', icon: '🥜' },
  { id: 'dessert', name: 'Dessert', icon: '🍯' },
  { id: 'diner', name: 'Dîner', icon: '🍽️' }
]

const PORTION_OPTIONS = [
  { id: '1', name: '1 personne', icon: '🌿' },
  { id: '2', name: '2 personnes', icon: '🍃' },
  { id: '4', name: '4 personnes', icon: '🌱' },
  { id: '6', name: '6 personnes', icon: '🌾' },
  { id: '8', name: '8 personnes', icon: '🌳' },
  { id: '12', name: '12+ personnes', icon: '🌲' }
]

const PREFERENCE_OPTIONS = [
  { id: 'aucune', name: 'Aucune restriction', icon: '🌾' },
  { id: 'vegetarien', name: 'Végétarien', icon: '🥬' },
  { id: 'vegan', name: 'Végan', icon: '🌱' },
  { id: 'sans-gluten', name: 'Sans gluten', icon: '🌾' },
  { id: 'pauvre-glucides', name: 'Pauvre en glucides', icon: '🥒' },
  { id: 'cetogene', name: 'Cétogène', icon: '🥑' }
]

const COOKING_MODE_OPTIONS = [
  { id: 'manuel', name: 'Manuel', icon: '👨‍🍳' },
  { id: 'thermomix', name: 'Thermomix', icon: '⚙️' },
  { id: 'magimix', name: 'Magimix', icon: '🔧' },
  { id: 'cookeo', name: 'Cookeo', icon: '🍳' },
  { id: 'companion', name: 'Companion', icon: '⚡' },
  { id: 'monsieur-cuisine', name: 'Monsieur Cuisine', icon: '👨‍🍳' }
]

const DIFFICULTY_OPTIONS = [
  { id: 'facile', name: 'Facile', icon: '👨‍🍳' },
  { id: 'moyen', name: 'Moyen', icon: '⚙️' },
  { id: 'difficile', name: 'Difficile', icon: '🔧' }
]

const COOKING_TIME_OPTIONS = [
  { id: '15', name: '15 min', icon: '⏱️' },
  { id: '30', name: '30 min', icon: '⏱️' },
  { id: '45', name: '45 min', icon: '⏱️' },
  { id: '60', name: '60 min', icon: '⏱️' }
]

const CUISINE_TYPE_OPTIONS = [
  { id: 'toutes', name: 'Toutes', icon: '🌍' },
  { id: 'francaise', name: 'Française', icon: '🇫🇷' },
  { id: 'italienne', name: 'Italienne', icon: '🇮🇹' },
  { id: 'mediterraneenne', name: 'Méditerranéenne', icon: '🌊' },
  { id: 'asiatique', name: 'Asiatique', icon: '🍜' },
  { id: 'mexicaine', name: 'Mexicaine', icon: '🌮' },
  { id: 'vegetarienne', name: 'Végétarienne', icon: '🥬' }
]

// Données d'exemple pour les recettes
const SAMPLE_RECIPES = [
  {
    id: 1,
    title: 'Salade Quinoa et Légumes',
    image: '/Images/fallback-recipe.jpg',
    time: '15 min',
    portions: '2 pers.',
    rating: 4.2,
    difficulty: 'Facile',
    mealType: 'dejeuner',
    portionsCount: '2',
    preferences: 'vegetarien',
    cookingMode: 'manuel',
    cuisineType: 'mediterraneenne',
    tags: ['Végétarien', 'Sain']
  },
  {
    id: 2,
    title: 'Poulet au Curry',
    image: '/Images/fallback-recipe.jpg',
    time: '30 min',
    portions: '4 pers.',
    rating: 4.5,
    difficulty: 'Moyen',
    mealType: 'diner',
    portionsCount: '4',
    preferences: 'aucune',
    cookingMode: 'thermomix',
    cuisineType: 'asiatique',
    tags: ['Asiatique', 'Épicé']
  },
  {
    id: 3,
    title: 'Smoothie Bowl Petit Déjeuner',
    image: '/Images/fallback-recipe.jpg',
    time: '10 min',
    portions: '1 pers.',
    rating: 4.0,
    difficulty: 'Facile',
    mealType: 'petit-dejeuner',
    portionsCount: '1',
    preferences: 'vegan',
    cookingMode: 'manuel',
    cuisineType: 'vegetarienne',
    tags: ['Végan', 'Sain']
  }
]

export default function CreerRecettesFiltresPage() {
  const [filters, setFilters] = useState<RecipeFilters>({
    mealTypes: [],
    portions: '',
    preferences: '',
    cookingMode: '',
    difficulty: '',
    cookingTime: '',
    cuisineTypes: []
  })

  const [filteredRecipes, setFilteredRecipes] = useState(SAMPLE_RECIPES)

  // Fonction pour mettre à jour les filtres
  const updateFilter = (filterType: keyof RecipeFilters, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Fonction pour basculer les sélections multiples
  const toggleMultiSelect = (filterType: 'mealTypes' | 'cuisineTypes', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? (prev[filterType] as string[]).filter(item => item !== value)
        : [...(prev[filterType] as string[]), value]
    }))
  }

  // Fonction pour filtrer les recettes
  useEffect(() => {
    let filtered = SAMPLE_RECIPES

    // Filtre par type de repas
    if (filters.mealTypes.length > 0) {
      filtered = filtered.filter(recipe => 
        filters.mealTypes.includes(recipe.mealType)
      )
    }

    // Filtre par portions
    if (filters.portions) {
      filtered = filtered.filter(recipe => 
        recipe.portionsCount === filters.portions
      )
    }

    // Filtre par préférences
    if (filters.preferences) {
      filtered = filtered.filter(recipe => 
        recipe.preferences === filters.preferences
      )
    }

    // Filtre par mode de cuisson
    if (filters.cookingMode) {
      filtered = filtered.filter(recipe => 
        recipe.cookingMode === filters.cookingMode
      )
    }

    // Filtre par difficulté
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => 
        recipe.difficulty.toLowerCase() === filters.difficulty
      )
    }

    // Filtre par temps de cuisson
    if (filters.cookingTime) {
      filtered = filtered.filter(recipe => 
        parseInt(recipe.time) <= parseInt(filters.cookingTime)
      )
    }

    // Filtre par type de cuisine
    if (filters.cuisineTypes.length > 0) {
      filtered = filtered.filter(recipe => 
        filters.cuisineTypes.includes(recipe.cuisineType)
      )
    }

    setFilteredRecipes(filtered)
  }, [filters])

  // Composant pour afficher un dropdown de filtre avec Portal
  const FilterDropdown = ({ 
    title, 
    options, 
    selectedValue, 
    onSelect, 
    isMultiSelect = false 
  }: {
    title: string
    options: Array<{ id: string, name: string, icon: string }>
    selectedValue: string | string[]
    onSelect: (value: string) => void
    isMultiSelect?: boolean
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null)

    const getDisplayText = () => {
      if (isMultiSelect) {
        const selected = (selectedValue as string[]).map(id => 
          options.find(opt => opt.id === id)?.name
        ).filter(Boolean)
        return selected.length > 0 ? selected.join(', ') : title
      } else {
        const selected = options.find(opt => opt.id === selectedValue)
        return selected ? selected.name : title
      }
    }

    const getDropdownPosition = () => {
      if (!buttonRef) return { top: 0, left: 0, width: 0 }
      
      const rect = buttonRef.getBoundingClientRect()
      return {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      }
    }

    return (
      <div style={{ position: 'relative', minWidth: '150px' }}>
        <button
          ref={setButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '2px solid #e5e7eb',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '12px',
            color: '#374151'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement
            target.style.borderColor = '#20B251'
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement
            target.style.borderColor = '#e5e7eb'
          }}
        >
          <span>{getDisplayText()}</span>
          <span style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}>
            ▼
          </span>
        </button>

        {isOpen && buttonRef && typeof window !== 'undefined' && createPortal(
          <div style={{
            position: 'absolute',
            top: getDropdownPosition().top,
            left: getDropdownPosition().left,
            width: getDropdownPosition().width,
            backgroundColor: '#ffffff',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            zIndex: 999999,
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '4px'
          }}>
            {options.map(option => {
              const isSelected = isMultiSelect 
                ? (selectedValue as string[]).includes(option.id)
                : selectedValue === option.id

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option.id)
                    if (!isMultiSelect) {
                      setIsOpen(false)
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    backgroundColor: isSelected ? '#f0fdf4' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '12px',
                    color: isSelected ? '#20B251' : '#374151',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      const target = e.target as HTMLElement
                      target.style.backgroundColor = '#f0fdf4'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      const target = e.target as HTMLElement
                      target.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{option.icon}</span>
                  <span>{option.name}</span>
                </button>
              )
            })}
          </div>,
          document.body
        )}
      </div>
    )
  }

  return (
    <div style={{
      padding: '24px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      <SlideIn direction="up" delay={600}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px'
        }}>

          {/* Titre principal */}
          <FadeIn delay={800}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#20B251',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              Toutes les recettes
            </h1>
          </FadeIn>

          {/* Section des filtres sur une ligne */}
          <FadeIn delay={1000}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '40px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#20B251',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Filtres
              </h2>

              {/* Filtres sur une seule ligne */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Type de repas (Plusieurs choix) */}
                <FilterDropdown
                  title="Type de repas"
                  options={MEAL_TYPES}
                  selectedValue={filters.mealTypes}
                  onSelect={(value) => toggleMultiSelect('mealTypes', value)}
                  isMultiSelect={true}
                />

                {/* Portions (1 seul choix) */}
                <FilterDropdown
                  title="Portions"
                  options={PORTION_OPTIONS}
                  selectedValue={filters.portions}
                  onSelect={(value) => updateFilter('portions', value)}
                />

                {/* Préférences (1 seul choix) */}
                <FilterDropdown
                  title="Préférences"
                  options={PREFERENCE_OPTIONS}
                  selectedValue={filters.preferences}
                  onSelect={(value) => updateFilter('preferences', value)}
                />

                {/* Mode cuisson (1 seul choix) */}
                <FilterDropdown
                  title="Mode cuisson"
                  options={COOKING_MODE_OPTIONS}
                  selectedValue={filters.cookingMode}
                  onSelect={(value) => updateFilter('cookingMode', value)}
                />

                {/* Difficulté (1 seul choix) */}
                <FilterDropdown
                  title="Difficulté"
                  options={DIFFICULTY_OPTIONS}
                  selectedValue={filters.difficulty}
                  onSelect={(value) => updateFilter('difficulty', value)}
                />

                {/* Temps max (1 seul choix) */}
                <FilterDropdown
                  title="Temps max"
                  options={COOKING_TIME_OPTIONS}
                  selectedValue={filters.cookingTime}
                  onSelect={(value) => updateFilter('cookingTime', value)}
                />

                {/* Type de cuisine (Plusieurs choix) */}
                <FilterDropdown
                  title="Type de cuisine"
                  options={CUISINE_TYPE_OPTIONS}
                  selectedValue={filters.cuisineTypes}
                  onSelect={(value) => toggleMultiSelect('cuisineTypes', value)}
                  isMultiSelect={true}
                />

                {/* Bouton pour réinitialiser les filtres */}
                <button
                  onClick={() => setFilters({
                    mealTypes: [],
                    portions: '',
                    preferences: '',
                    cookingMode: '',
                    difficulty: '',
                    cookingTime: '',
                    cuisineTypes: []
                  })}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '12px'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement
                    target.style.backgroundColor = '#4b5563'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement
                    target.style.backgroundColor = '#6b7280'
                  }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Affichage des recettes filtrées */}
          <FadeIn delay={1200}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#20B251',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Recettes correspondantes ({filteredRecipes.length})
              </h2>

              {filteredRecipes.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#6b7280'
                }}>
                  <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                    Aucune recette ne correspond à vos critères
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    Essayez de modifier vos filtres pour voir plus de résultats
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredRecipes.map(recipe => (
                    <div
                      key={recipe.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        border: '2px solid #e5e7eb',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement
                        target.style.transform = 'translateY(-4px)'
                        target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement
                        target.style.transform = 'translateY(0)'
                        target.style.boxShadow = 'none'
                      }}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/Images/fallback-recipe.jpg'
                        }}
                      />
                      <div style={{ padding: '16px' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          {recipe.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          marginBottom: '12px',
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          <span>⏱️ {recipe.time}</span>
                          <span>👥 {recipe.portions}</span>
                          <span>⭐ {recipe.rating}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px'
                        }}>
                          {recipe.tags.map((tag, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: '#f0fdf4',
                                color: '#20B251',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

        </div>
      </SlideIn>
    </div>
  )
}
