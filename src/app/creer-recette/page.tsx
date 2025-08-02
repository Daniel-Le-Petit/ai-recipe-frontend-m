'use client'

import { useState } from 'react'
import { FadeIn } from '../../components/FadeIn'
import { SlideIn } from '../../components/SlideIn'
import { Pulse } from '../../components/Pulse'

// Définition des étapes
const STEPS = [
  { id: 1, name: 'Ingrédients', icon: '🥬', description: 'Sélectionnez vos ingrédients' },
  { id: 2, name: 'Catégorie', icon: '⭐', description: 'Choisissez la catégorie' },
  { id: 3, name: 'Type de repas', icon: '🍽️', description: 'Définissez le type de repas' },
  { id: 4, name: 'Portions', icon: '👥', description: 'Nombre de personnes' },
  { id: 5, name: 'Préférences', icon: '⚙️', description: 'Vos préférences' },
  { id: 6, name: 'Mode cuisson', icon: '👨‍🍳', description: 'Méthode de cuisson' },
  { id: 7, name: 'Récapitulatif', icon: '✅', description: 'Vérifiez vos choix' },
  { id: 8, name: 'Choix de recette', icon: '⭐', description: 'Sélectionnez une recette' },
  { id: 9, name: 'Action', icon: '👨‍🍳', description: 'Action finale' },
  { id: 10, name: 'Commander', icon: '🛒', description: 'Finalisez la commande' }
]

// Ingrédients populaires
const POPULAR_INGREDIENTS = [
  { name: 'Tomates', icon: '🍅' },
  { name: 'Oignons', icon: '🧅' },
  { name: 'Ail', icon: '🧄' },
  { name: 'Basilic', icon: '🌿' },
  { name: 'Persil', icon: '🌱' },
  { name: 'Thym', icon: '🌿' },
  { name: 'Romarin', icon: '🌿' },
  { name: 'Laurier', icon: '🌿' },
  { name: 'Pommes De Terre', icon: '🥔' },
  { name: 'Carottes', icon: '🥕' },
  { name: 'Courgettes', icon: '🥒' },
  { name: 'Aubergines', icon: '🍆' }
]

// Catégories de recettes
const RECIPE_CATEGORIES = [
  {
    id: 'entree',
    name: 'Entrée',
    description: 'Plats d\'ouverture pour stimuler l\'appétit',
    icon: '🥗',
    image: '/Images/entree-category.svg'
  },
  {
    id: 'plat-principal',
    name: 'Plat principal',
    description: 'Le cœur du repas, riche et savoureux',
    icon: '🍖',
    image: '/Images/plat-principal-category.svg'
  },
  {
    id: 'dessert',
    name: 'Dessert',
    description: 'La touche sucrée pour terminer le repas',
    icon: '🍰',
    image: '/Images/dessert-category.svg'
  }
]

// Types de repas
const MEAL_TYPES = [
  {
    id: 'petit-dejeuner',
    name: 'Petit déjeuner',
    description: 'Pour bien commencer la journée',
    icon: '🌿'
  },
  {
    id: 'dejeuner',
    name: 'Déjeuner',
    description: 'Repas du midi équilibré',
    icon: '🥗'
  },
  {
    id: 'diner',
    name: 'Dîner',
    description: 'Soirée gourmande',
    icon: '🍽️'
  },
  {
    id: 'collation',
    name: 'Collation',
    description: 'En-cas savoureux',
    icon: '🥜'
  },
  {
    id: 'dessert',
    name: 'Dessert',
    description: 'La touche sucrée',
    icon: '🍯'
  },
  {
    id: 'brunch',
    name: 'Brunch',
    description: 'Le meilleur des deux mondes',
    icon: '🥐'
  }
]

// Fonction pour calculer les suggestions basées sur les ingrédients
const getMealSuggestions = (ingredients: string[]) => {
  const suggestions = [
    {
      id: 'dejeuner',
      name: 'Déjeuner',
      description: 'Repas du midi équilibré',
      icon: '🥗',
      score: ingredients.length,
      recommended: true
    },
    {
      id: 'diner',
      name: 'Dîner',
      description: 'Soirée gourmande',
      icon: '🍽️',
      score: ingredients.length,
      recommended: true
    },
    {
      id: 'brunch',
      name: 'Brunch',
      description: 'Le meilleur des deux mondes',
      icon: '🥐',
      score: ingredients.length,
      recommended: true
    }
  ]
  
  return suggestions
}

// Options de portions
const PORTION_OPTIONS = [
  {
    id: 1,
    name: '1 personne',
    description: 'Solo',
    icon: '🌿'
  },
  {
    id: 2,
    name: '2 personnes',
    description: 'En couple',
    icon: '🍃'
  },
  {
    id: 4,
    name: '4 personnes',
    description: 'Famille',
    icon: '🌱'
  },
  {
    id: 6,
    name: '6 personnes',
    description: 'Grandes tablées',
    icon: '🌾'
  },
  {
    id: 8,
    name: '8 personnes',
    description: 'Soirée entre amis',
    icon: '🌳'
  },
  {
    id: 12,
    name: '12+ personnes',
    description: 'Grande fête',
    icon: '🌲'
  }
]

// Préférences alimentaires
const DIETARY_PREFERENCES = [
  {
    id: 'aucune',
    name: 'Aucune restriction',
    description: 'Tout est permis',
    icon: '🌾'
  },
  {
    id: 'vegetarien',
    name: 'Végétarien',
    description: 'Sans viande ni poisson',
    icon: '🥬'
  },
  {
    id: 'vegan',
    name: 'Végan',
    description: 'Uniquement végétal',
    icon: '🌱'
  },
  {
    id: 'sans-gluten',
    name: 'Sans gluten',
    description: 'Pour les intolérants',
    icon: '🌾'
  },
  {
    id: 'pauvre-glucides',
    name: 'Pauvre en glucides',
    description: 'Moins de sucres',
    icon: '🥒'
  },
  {
    id: 'cetogene',
    name: 'Cétogène',
    description: 'Riche en bonnes graisses',
    icon: '🥑'
  }
]

// Modes de cuisson
const COOKING_MODES = [
  {
    id: 'manuel',
    name: 'Manuel',
    description: 'Sans appareil',
    icon: '👨‍🍳'
  },
  {
    id: 'thermomix',
    name: 'Thermomix',
    description: 'TM6, TM5, TM31',
    icon: '⚙️'
  },
  {
    id: 'magimix',
    name: 'Magimix',
    description: 'Cook Expert',
    icon: '🔧'
  },
  {
    id: 'cookeo',
    name: 'Cookeo',
    description: 'Multicooker',
    icon: '🍳'
  },
  {
    id: 'companion',
    name: 'Companion',
    description: 'Vorwerk',
    icon: '⚡'
  },
  {
    id: 'monsieur-cuisine',
    name: 'Monsieur Cuisine',
    description: 'Lidl',
    icon: '👨‍🍳'
  }
]

export default function CreateRecipePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchIngredient, setSearchIngredient] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedMealType, setSelectedMealType] = useState<string>('')
  const [selectedPortions, setSelectedPortions] = useState<number>(0)
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState<string>('')
  const [selectedCookingMode, setSelectedCookingMode] = useState<string>('')

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleIngredientSelect = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const handleIngredientRemove = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient))
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchIngredient.trim() && !selectedIngredients.includes(searchIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, searchIngredient.trim()])
      setSearchIngredient('')
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleMealTypeSelect = (mealTypeId: string) => {
    setSelectedMealType(mealTypeId)
  }

  const handlePortionSelect = (portionId: number) => {
    setSelectedPortions(portionId)
  }

  const handleDietaryPreferenceSelect = (preferenceId: string) => {
    setSelectedDietaryPreference(preferenceId)
  }

  const handleCookingModeSelect = (modeId: string) => {
    setSelectedCookingMode(modeId)
  }

  const handleGenerateRecipe = () => {
    // Passer à l'étape de génération
    setCurrentStep(8)
    
    // Simuler la génération de recette
    setTimeout(() => {
      // Ici on pourrait ajouter la logique pour générer la recette
      console.log('Génération de recette avec les paramètres:', {
        ingredients: selectedIngredients,
        category: selectedCategory,
        mealType: selectedMealType,
        portions: selectedPortions,
        dietaryPreference: selectedDietaryPreference,
        cookingMode: selectedCookingMode
      })
      // Passer à l'étape suivante après génération
      setCurrentStep(9)
    }, 3000) // Simulation de 3 secondes de génération
  }

  const handleViewOtherRecipes = () => {
    // Rediriger vers la page des recettes
    window.location.href = '/mes-recettes'
  }

  const handleCreateNewRecipe = () => {
    // Redémarrer le processus de création
    setCurrentStep(1)
    setSelectedIngredients([])
    setSelectedCategory('')
    setSelectedMealType('')
    setSelectedPortions(0)
    setSelectedDietaryPreference('')
    setSelectedCookingMode('')
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      {/* Header avec animation */}
      <SlideIn direction="down" delay={200}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '16px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}>
          <button
            onClick={() => window.history.back()}
            style={{ 
              position: 'absolute',
              left: '20px',
              top: '20px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#20B251',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f0f9ff'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}
          >
            ← Retour
          </button>
          
          <FadeIn delay={400}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🍳</div>
          </FadeIn>
          
          <FadeIn delay={600}>
            <h1 style={{ color: '#1f2937', fontSize: '36px', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              Créer une Recette
            </h1>
          </FadeIn>
          
          <FadeIn delay={800}>
            <p style={{ color: '#6b7280', fontSize: '18px', margin: '0' }}>
              Générez votre recette personnalisée avec l'intelligence artificielle
            </p>
          </FadeIn>
        </div>
      </SlideIn>

      {/* Navigation */}
      <FadeIn delay={1000}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '15px', 
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <a href="/" style={{ 
            color: '#20B251', 
            margin: '0 15px', 
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >Accueil</a>
          <a href="/mes-recettes" style={{ 
            color: '#20B251', 
            margin: '0 15px', 
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >Mes Recettes</a>
          <a href="/connexion" style={{ 
            color: '#20B251', 
            margin: '0 15px', 
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f9ff'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >Connexion</a>
        </div>
      </FadeIn>

      {/* Barre de progression */}
      <FadeIn delay={1200}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '16px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: '0 auto 20px auto'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            overflowX: 'auto',
            padding: '10px 0'
          }}>
            {STEPS.map((step, index) => (
              <div key={step.id} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                minWidth: '80px',
                position: 'relative'
              }}>
                {/* Ligne de connexion */}
                {index < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    width: '60px',
                    height: '2px',
                    backgroundColor: currentStep > step.id ? '#20B251' : '#e5e7eb',
                    transform: 'translateX(50%)'
                  }} />
                )}
                
                {/* Cercle de l'étape */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= step.id ? '#20B251' : '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: currentStep >= step.id ? 'white' : '#9ca3af',
                  marginBottom: '8px',
                  position: 'relative',
                  zIndex: 1,
                  border: currentStep === step.id ? '3px solid #20B251' : 'none'
                }}>
                  {step.icon}
                </div>
                
                {/* Nom de l'étape */}
                <span style={{
                  fontSize: '12px',
                  color: currentStep >= step.id ? '#20B251' : '#6b7280',
                  fontWeight: currentStep === step.id ? 'bold' : 'normal',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Contenu principal */}
      <SlideIn direction="up" delay={1400}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Étape 1: Ingrédients */}
          {currentStep === 1 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Ingrédients
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Que voulez-vous cuisiner ?
                  </p>
                </div>



                {/* Barre de recherche */}
                <form onSubmit={handleSearchSubmit} style={{ marginBottom: '30px' }}>
                  <input
                    type="text"
                    value={searchIngredient}
                    onChange={(e) => setSearchIngredient(e.target.value)}
                    placeholder="Tapez un ingrédient..."
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#20B251'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </form>

                {/* Ingrédients sélectionnés */}
                {selectedIngredients.length > 0 && (
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ 
                      color: '#1f2937', 
                      fontSize: '18px', 
                      margin: '0 0 15px 0',
                      fontWeight: 'bold'
                    }}>
                      Vos ingrédients :
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '10px' 
                    }}>
                      {selectedIngredients.map((ingredient, index) => (
                        <div key={index} style={{
                          backgroundColor: '#20B251',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span>{ingredient}</span>
                          <button
                            onClick={() => handleIngredientRemove(ingredient)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '16px',
                              padding: '0',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingrédients populaires */}
                <div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '18px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Ingrédients populaires :
                  </h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '12px' 
                  }}>
                    {POPULAR_INGREDIENTS.map((ingredient, index) => (
                      <button
                        key={index}
                        onClick={() => handleIngredientSelect(ingredient.name)}
                        disabled={selectedIngredients.includes(ingredient.name)}
                        style={{
                          backgroundColor: selectedIngredients.includes(ingredient.name) ? '#f3f4f6' : 'white',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '12px',
                          cursor: selectedIngredients.includes(ingredient.name) ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          opacity: selectedIngredients.includes(ingredient.name) ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedIngredients.includes(ingredient.name)) {
                            e.target.style.borderColor = '#20B251'
                            e.target.style.backgroundColor = '#f0f9ff'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedIngredients.includes(ingredient.name)) {
                            e.target.style.borderColor = '#e5e7eb'
                            e.target.style.backgroundColor = 'white'
                          }
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>{ingredient.icon}</span>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#1f2937',
                          fontWeight: '500'
                        }}>
                          {ingredient.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Étape 2: Catégorie */}
          {currentStep === 2 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Catégorie
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Choisissez le type de plat que vous souhaitez préparer
                  </p>
                </div>

                {/* Catégories disponibles */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  {RECIPE_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      style={{
                        backgroundColor: selectedCategory === category.id ? '#20B251' : '#f3f4f6',
                        border: `3px solid ${selectedCategory === category.id ? '#20B251' : '#d1d5db'}`,
                        borderRadius: '16px',
                        padding: '0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        position: 'relative',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category.id) {
                          e.target.style.borderColor = '#20B251'
                          e.target.style.backgroundColor = '#f0f9ff'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category.id) {
                          e.target.style.borderColor = '#d1d5db'
                          e.target.style.backgroundColor = '#f3f4f6'
                        }
                      }}
                    >
                      {/* Partie supérieure avec icône */}
                      <div style={{
                        width: '100%',
                        height: '120px',
                        backgroundColor: selectedCategory === category.id ? '#20B251' : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <span style={{ 
                          fontSize: '48px',
                          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                        }}>
                          {category.icon}
                        </span>
                      </div>

                      {/* Contenu de la catégorie */}
                      <div style={{
                        padding: '20px',
                        textAlign: 'center',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <h3 style={{ 
                          color: selectedCategory === category.id ? '#1f2937' : '#1f2937',
                          fontSize: '20px', 
                          margin: '0 0 8px 0',
                          fontWeight: 'bold'
                        }}>
                          {category.name}
                        </h3>
                        <p style={{ 
                          color: selectedCategory === category.id ? '#6b7280' : '#6b7280',
                          fontSize: '14px', 
                          margin: '0',
                          lineHeight: '1.4'
                        }}>
                          {category.description}
                        </p>
                      </div>

                      {/* Indicateur de sélection */}
                      {selectedCategory === category.id && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                          <span style={{ 
                            fontSize: '14px',
                            color: '#20B251'
                          }}>
                            ✓
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Message d'aide */}
                {selectedCategory && (
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>
                    <p style={{ 
                      color: '#0c4a6e',
                      fontSize: '16px',
                      margin: '0',
                      fontWeight: '500'
                    }}>
                      ✅ Catégorie sélectionnée : <strong>{RECIPE_CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong>
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Étape 3: Type de repas */}
          {currentStep === 3 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Type de repas
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Pour quel moment ?
                  </p>
                </div>

                {/* Suggestions basées sur les ingrédients */}
                {selectedIngredients.length > 0 && (
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ 
                      color: '#1f2937', 
                      fontSize: '20px', 
                      margin: '0 0 15px 0',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>
                      Quel type de repas ?
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '16px', 
                      margin: '0 0 20px 0',
                      textAlign: 'center'
                    }}>
                      Nous avons détecté {getMealSuggestions(selectedIngredients).length} type(s) de repas possible(s) basé sur vos ingrédients.
                    </p>

                    <div style={{ marginBottom: '30px' }}>
                      <h4 style={{ 
                        color: '#20B251', 
                        fontSize: '18px', 
                        margin: '0 0 15px 0',
                        fontWeight: 'bold'
                      }}>
                        Suggestions basées sur vos ingrédients :
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '15px',
                        marginBottom: '20px'
                      }}>
                        {getMealSuggestions(selectedIngredients).map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleMealTypeSelect(suggestion.id)}
                            style={{
                              backgroundColor: selectedMealType === suggestion.id ? '#20B251' : '#f0f9ff',
                              border: `2px solid ${selectedMealType === suggestion.id ? '#20B251' : '#0ea5e9'}`,
                              borderRadius: '12px',
                              padding: '15px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px'
                            }}
                            onMouseEnter={(e) => {
                              if (selectedMealType !== suggestion.id) {
                                e.target.style.backgroundColor = '#e0f2fe'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedMealType !== suggestion.id) {
                                e.target.style.backgroundColor = '#f0f9ff'
                              }
                            }}
                          >
                            <span style={{ fontSize: '24px' }}>{suggestion.icon}</span>
                            <div style={{ textAlign: 'left', flex: 1 }}>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                marginBottom: '4px'
                              }}>
                                <span style={{ 
                                  color: selectedMealType === suggestion.id ? 'white' : '#1f2937',
                                  fontSize: '16px', 
                                  fontWeight: 'bold'
                                }}>
                                  {suggestion.name}
                                </span>
                                <span style={{
                                  backgroundColor: selectedMealType === suggestion.id ? 'white' : '#0ea5e9',
                                  color: selectedMealType === suggestion.id ? '#20B251' : 'white',
                                  fontSize: '12px',
                                  padding: '2px 6px',
                                  borderRadius: '10px',
                                  fontWeight: 'bold'
                                }}>
                                  Recommandé
                                </span>
                              </div>
                              <p style={{ 
                                color: selectedMealType === suggestion.id ? 'rgba(255,255,255,0.9)' : '#6b7280',
                                fontSize: '14px', 
                                margin: '0 0 4px 0'
                              }}>
                                {suggestion.description}
                              </p>
                              <p style={{ 
                                color: selectedMealType === suggestion.id ? 'rgba(255,255,255,0.8)' : '#0ea5e9',
                                fontSize: '12px', 
                                margin: '0',
                                fontWeight: '500'
                              }}>
                                Score: {suggestion.score} ingrédients
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ 
                      borderTop: '1px solid #e5e7eb', 
                      paddingTop: '20px',
                      marginTop: '20px'
                    }}>
                      <h4 style={{ 
                        color: '#1f2937', 
                        fontSize: '18px', 
                        margin: '0 0 15px 0',
                        fontWeight: 'bold'
                      }}>
                        Ou choisissez un autre type :
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '12px'
                      }}>
                        {MEAL_TYPES.map((mealType) => (
                          <button
                            key={mealType.id}
                            onClick={() => handleMealTypeSelect(mealType.id)}
                            style={{
                              backgroundColor: selectedMealType === mealType.id ? '#20B251' : '#f3f4f6',
                              border: `2px solid ${selectedMealType === mealType.id ? '#20B251' : '#d1d5db'}`,
                              borderRadius: '12px',
                              padding: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}
                            onMouseEnter={(e) => {
                              if (selectedMealType !== mealType.id) {
                                e.target.style.borderColor = '#20B251'
                                e.target.style.backgroundColor = '#f0f9ff'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedMealType !== mealType.id) {
                                e.target.style.borderColor = '#d1d5db'
                                e.target.style.backgroundColor = '#f3f4f6'
                              }
                            }}
                          >
                            <span style={{ fontSize: '20px' }}>{mealType.icon}</span>
                            <div style={{ textAlign: 'left' }}>
                              <div style={{ 
                                color: selectedMealType === mealType.id ? 'white' : '#1f2937',
                                fontSize: '14px', 
                                fontWeight: 'bold',
                                marginBottom: '2px'
                              }}>
                                {mealType.name}
                              </div>
                              <div style={{ 
                                color: selectedMealType === mealType.id ? 'rgba(255,255,255,0.9)' : '#6b7280',
                                fontSize: '12px'
                              }}>
                                {mealType.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Message si aucun ingrédient sélectionné */}
                {selectedIngredients.length === 0 && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ 
                      color: '#92400e',
                      fontSize: '16px',
                      margin: '0'
                    }}>
                      ⚠️ Veuillez d'abord sélectionner des ingrédients à l'étape 1 pour obtenir des suggestions personnalisées.
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Étape 4: Portions */}
          {currentStep === 4 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Portions
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Pour combien de personnes ?
                  </p>
                </div>

                {/* Sélection des portions */}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '20px', 
                    margin: '0 0 20px 0',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    Sélectionnez le nombre de portions
                  </h3>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                    gap: '15px'
                  }}>
                    {PORTION_OPTIONS.map((portion) => (
                      <button
                        key={portion.id}
                        onClick={() => handlePortionSelect(portion.id)}
                        style={{
                          backgroundColor: selectedPortions === portion.id ? '#20B251' : '#f3f4f6',
                          border: `3px solid ${selectedPortions === portion.id ? '#20B251' : '#d1d5db'}`,
                          borderRadius: '16px',
                          padding: '20px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          minHeight: '140px',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedPortions !== portion.id) {
                            e.target.style.borderColor = '#20B251'
                            e.target.style.backgroundColor = '#f0f9ff'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedPortions !== portion.id) {
                            e.target.style.borderColor = '#d1d5db'
                            e.target.style.backgroundColor = '#f3f4f6'
                          }
                        }}
                      >
                        {/* Icône */}
                        <span style={{ 
                          fontSize: '36px',
                          filter: selectedPortions === portion.id ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' : 'none'
                        }}>
                          {portion.icon}
                        </span>

                        {/* Contenu */}
                        <div style={{ textAlign: 'center' }}>
                          <h4 style={{ 
                            color: selectedPortions === portion.id ? 'white' : '#1f2937',
                            fontSize: '16px', 
                            margin: '0 0 4px 0',
                            fontWeight: 'bold'
                          }}>
                            {portion.name}
                          </h4>
                          <p style={{ 
                            color: selectedPortions === portion.id ? 'rgba(255,255,255,0.9)' : '#6b7280',
                            fontSize: '14px', 
                            margin: '0'
                          }}>
                            {portion.description}
                          </p>
                        </div>

                        {/* Indicateur de sélection */}
                        {selectedPortions === portion.id && (
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}>
                            <span style={{ 
                              fontSize: '14px',
                              color: '#20B251'
                            }}>
                              ✓
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message de confirmation */}
                {selectedPortions > 0 && (
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>
                    <p style={{ 
                      color: '#0c4a6e',
                      fontSize: '16px',
                      margin: '0',
                      fontWeight: '500'
                    }}>
                      ✅ Portions sélectionnées : <strong>{PORTION_OPTIONS.find(p => p.id === selectedPortions)?.name}</strong>
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Étape 5: Préférences alimentaires */}
          {currentStep === 5 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Préférences alimentaires
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Des restrictions particulières ? (optionnel)
                  </p>
                </div>

                {/* Sélection des préférences alimentaires */}
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px'
                  }}>
                    {DIETARY_PREFERENCES.map((preference) => (
                      <button
                        key={preference.id}
                        onClick={() => handleDietaryPreferenceSelect(preference.id)}
                        style={{
                          backgroundColor: selectedDietaryPreference === preference.id ? '#20B251' : '#f3f4f6',
                          border: `3px solid ${selectedDietaryPreference === preference.id ? '#20B251' : '#d1d5db'}`,
                          borderRadius: '16px',
                          padding: '20px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          minHeight: '140px',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedDietaryPreference !== preference.id) {
                            e.target.style.borderColor = '#20B251'
                            e.target.style.backgroundColor = '#f0f9ff'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedDietaryPreference !== preference.id) {
                            e.target.style.borderColor = '#d1d5db'
                            e.target.style.backgroundColor = '#f3f4f6'
                          }
                        }}
                      >
                        {/* Icône */}
                        <span style={{ 
                          fontSize: '36px',
                          filter: selectedDietaryPreference === preference.id ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' : 'none'
                        }}>
                          {preference.icon}
                        </span>

                        {/* Contenu */}
                        <div style={{ textAlign: 'center' }}>
                          <h4 style={{ 
                            color: selectedDietaryPreference === preference.id ? 'white' : '#1f2937',
                            fontSize: '16px', 
                            margin: '0 0 4px 0',
                            fontWeight: 'bold'
                          }}>
                            {preference.name}
                          </h4>
                          <p style={{ 
                            color: selectedDietaryPreference === preference.id ? 'rgba(255,255,255,0.9)' : '#6b7280',
                            fontSize: '14px', 
                            margin: '0'
                          }}>
                            {preference.description}
                          </p>
                        </div>

                        {/* Indicateur de sélection */}
                        {selectedDietaryPreference === preference.id && (
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}>
                            <span style={{ 
                              fontSize: '14px',
                              color: '#20B251'
                            }}>
                              ✓
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message de confirmation */}
                {selectedDietaryPreference && (
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>
                    <p style={{ 
                      color: '#0c4a6e',
                      fontSize: '16px',
                      margin: '0',
                      fontWeight: '500'
                    }}>
                      ✅ Préférence sélectionnée : <strong>{DIETARY_PREFERENCES.find(p => p.id === selectedDietaryPreference)?.name}</strong>
                    </p>
                  </div>
                )}

                {/* Message optionnel */}
                {!selectedDietaryPreference && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>
                    <p style={{ 
                      color: '#92400e',
                      fontSize: '16px',
                      margin: '0'
                    }}>
                      💡 Cette étape est optionnelle. Vous pouvez passer à la suite sans restriction.
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Étape 6: Mode cuisson */}
          {currentStep === 6 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Mode cuisson
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Choisissez votre mode cuisson
                  </p>
                </div>

                {/* Sélection du mode de cuisson */}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '20px', 
                    margin: '0 0 20px 0',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    Sélectionnez votre appareil de cuisine pour un guidage personnalisé
                  </h3>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px'
                  }}>
                    {COOKING_MODES.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => handleCookingModeSelect(mode.id)}
                        style={{
                          backgroundColor: selectedCookingMode === mode.id ? '#20B251' : '#f3f4f6',
                          border: `3px solid ${selectedCookingMode === mode.id ? '#20B251' : '#d1d5db'}`,
                          borderRadius: '16px',
                          padding: '20px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          minHeight: '140px',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCookingMode !== mode.id) {
                            e.target.style.borderColor = '#20B251'
                            e.target.style.backgroundColor = '#f0f9ff'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCookingMode !== mode.id) {
                            e.target.style.borderColor = '#d1d5db'
                            e.target.style.backgroundColor = '#f3f4f6'
                          }
                        }}
                      >
                        {/* Icône */}
                        <span style={{ 
                          fontSize: '36px',
                          filter: selectedCookingMode === mode.id ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' : 'none'
                        }}>
                          {mode.icon}
                        </span>

                        {/* Contenu */}
                        <div style={{ textAlign: 'center' }}>
                          <h4 style={{ 
                            color: selectedCookingMode === mode.id ? 'white' : '#1f2937',
                            fontSize: '16px', 
                            margin: '0 0 4px 0',
                            fontWeight: 'bold'
                          }}>
                            {mode.name}
                          </h4>
                          <p style={{ 
                            color: selectedCookingMode === mode.id ? 'rgba(255,255,255,0.9)' : '#6b7280',
                            fontSize: '14px', 
                            margin: '0'
                          }}>
                            {mode.description}
                          </p>
                        </div>

                        {/* Indicateur de sélection */}
                        {selectedCookingMode === mode.id && (
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}>
                            <span style={{ 
                              fontSize: '14px',
                              color: '#20B251'
                            }}>
                              ✓
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message de confirmation */}
                {selectedCookingMode && (
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '20px'
                  }}>
                    <p style={{ 
                      color: '#0c4a6e',
                      fontSize: '16px',
                      margin: '0',
                      fontWeight: '500'
                    }}>
                      ✅ Mode de cuisson sélectionné : <strong>{COOKING_MODES.find(m => m.id === selectedCookingMode)?.name}</strong>
                    </p>
                    <p style={{ 
                      color: '#0c4a6e',
                      fontSize: '14px',
                      margin: '8px 0 0 0',
                      opacity: '0.8'
                    }}>
                      Vous recevrez des instructions personnalisées pour votre appareil.
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {/* Étape 7: Récapitulatif */}
          {currentStep === 7 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '28px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Récapitulatif de votre recette
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Vérifiez vos choix avant de générer la recette
                  </p>
                </div>

                {/* Résumé de la recette */}
                <div style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '30px',
                  marginBottom: '30px',
                  border: '2px solid #e5e7eb'
                }}>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '22px', 
                    margin: '0 0 20px 0',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    Votre recette sera :
                  </h3>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '20px',
                    marginBottom: '30px'
                  }}>
                    {/* Ingrédients */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '15px'
                      }}>
                        <span style={{ fontSize: '24px' }}>🥬</span>
                        <h4 style={{ 
                          color: '#1f2937',
                          fontSize: '18px',
                          margin: '0',
                          fontWeight: 'bold'
                        }}>
                          {selectedIngredients.length} ingrédient{selectedIngredients.length > 1 ? 's' : ''}
                        </h4>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '8px' 
                      }}>
                        {selectedIngredients.map((ingredient, index) => (
                          <span key={index} style={{
                            backgroundColor: '#20B251',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Type de repas */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '15px'
                      }}>
                        <span style={{ fontSize: '24px' }}>
                          {MEAL_TYPES.find(m => m.id === selectedMealType)?.icon || '🍽️'}
                        </span>
                        <h4 style={{ 
                          color: '#1f2937',
                          fontSize: '18px',
                          margin: '0',
                          fontWeight: 'bold'
                        }}>
                          {MEAL_TYPES.find(m => m.id === selectedMealType)?.name || 'Non sélectionné'}
                        </h4>
                      </div>
                      <p style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0'
                      }}>
                        {MEAL_TYPES.find(m => m.id === selectedMealType)?.description || ''}
                      </p>
                    </div>

                    {/* Portions */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '15px'
                      }}>
                        <span style={{ fontSize: '24px' }}>
                          {PORTION_OPTIONS.find(p => p.id === selectedPortions)?.icon || '👥'}
                        </span>
                        <h4 style={{ 
                          color: '#1f2937',
                          fontSize: '18px',
                          margin: '0',
                          fontWeight: 'bold'
                        }}>
                          Pour {selectedPortions} personne{selectedPortions > 1 ? 's' : ''}
                        </h4>
                      </div>
                      <p style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0'
                      }}>
                        {PORTION_OPTIONS.find(p => p.id === selectedPortions)?.description || ''}
                      </p>
                    </div>
                  </div>

                  {/* Détails supplémentaires */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px'
                  }}>
                    {/* Catégorie */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '15px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h5 style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0 0 8px 0',
                        fontWeight: '500'
                      }}>
                        Catégorie
                      </h5>
                      <p style={{ 
                        color: '#1f2937',
                        fontSize: '16px',
                        margin: '0',
                        fontWeight: 'bold'
                      }}>
                        {RECIPE_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Non sélectionnée'}
                      </p>
                    </div>

                    {/* Préférence alimentaire */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '15px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h5 style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0 0 8px 0',
                        fontWeight: '500'
                      }}>
                        Préférence
                      </h5>
                      <p style={{ 
                        color: '#1f2937',
                        fontSize: '16px',
                        margin: '0',
                        fontWeight: 'bold'
                      }}>
                        {DIETARY_PREFERENCES.find(p => p.id === selectedDietaryPreference)?.name || 'Aucune'}
                      </p>
                    </div>

                    {/* Mode de cuisson */}
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '15px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h5 style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0 0 8px 0',
                        fontWeight: '500'
                      }}>
                        Mode de cuisson
                      </h5>
                      <p style={{ 
                        color: '#1f2937',
                        fontSize: '16px',
                        margin: '0',
                        fontWeight: 'bold'
                      }}>
                        {COOKING_MODES.find(m => m.id === selectedCookingMode)?.name || 'Non sélectionné'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bouton de génération */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleGenerateRecipe}
                    style={{
                      backgroundColor: '#20B251',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '20px 40px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1a8f42'
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#20B251'
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>✨</span>
                    Créer ma recette magique
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Étape 8: Génération de recette */}
          {currentStep === 8 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '32px', 
                    margin: '0 0 20px 0',
                    fontWeight: 'bold'
                  }}>
                    Génération de votre recette...
                  </h2>
                </div>

                {/* Animation de chargement */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                  marginBottom: '40px'
                }}>
                  {/* Icône animée */}
                  <div style={{
                    fontSize: '80px',
                    marginBottom: '30px',
                    animation: 'pulse 2s infinite'
                  }}>
                    ✨
                  </div>

                  {/* Barre de progression */}
                  <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '10px',
                    height: '8px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#20B251',
                      borderRadius: '10px',
                      animation: 'loading 3s ease-in-out infinite'
                    }} />
                  </div>

                  {/* Messages de progression */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                  }}>
                    <p style={{ 
                      color: '#6b7280',
                      fontSize: '18px',
                      margin: '0 0 10px 0'
                    }}>
                      L'IA analyse vos ingrédients...
                    </p>
                    <p style={{ 
                      color: '#6b7280',
                      fontSize: '16px',
                      margin: '0'
                    }}>
                      Création d'une recette personnalisée
                    </p>
                  </div>

                  {/* Étapes de génération */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '100%',
                    maxWidth: '500px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      border: '1px solid #0ea5e9'
                    }}>
                      <span style={{ fontSize: '20px' }}>🔍</span>
                      <span style={{ 
                        color: '#0c4a6e',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Analyse des ingrédients sélectionnés
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      border: '1px solid #0ea5e9'
                    }}>
                      <span style={{ fontSize: '20px' }}>🧠</span>
                      <span style={{ 
                        color: '#0c4a6e',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Génération de la recette avec l'IA
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      border: '1px solid #0ea5e9'
                    }}>
                      <span style={{ fontSize: '20px' }}>⚙️</span>
                      <span style={{ 
                        color: '#0c4a6e',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Adaptation au mode de cuisson choisi
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '12px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '8px',
                      border: '1px solid #0ea5e9'
                    }}>
                      <span style={{ fontSize: '20px' }}>📝</span>
                      <span style={{ 
                        color: '#0c4a6e',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Finalisation des instructions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message d'attente */}
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  <p style={{ 
                    color: '#92400e',
                    fontSize: '16px',
                    margin: '0'
                  }}>
                    ⏱️ Veuillez patienter pendant que notre IA crée votre recette personnalisée...
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Étape 9: Demande d'autres recettes */}
          {currentStep === 9 && (
            <FadeIn delay={1600}>
              <div>
                {/* Titre de l'étape */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 style={{ 
                    color: '#1f2937', 
                    fontSize: '32px', 
                    margin: '0 0 20px 0',
                    fontWeight: 'bold'
                  }}>
                    🎉 Votre recette a été générée !
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '18px', 
                    margin: '0'
                  }}>
                    Souhaitez-vous voir d'autres recettes ou créer une nouvelle recette ?
                  </p>
                </div>

                {/* Options */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '20px',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  {/* Option 1: Voir d'autres recettes */}
                  <div style={{
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onClick={handleViewOtherRecipes}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#20B251'
                    e.currentTarget.style.backgroundColor = '#f0fdf4'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>📚</div>
                    <h3 style={{ 
                      color: '#1f2937', 
                      fontSize: '24px', 
                      margin: '0 0 10px 0',
                      fontWeight: 'bold'
                    }}>
                      Voir d'autres recettes
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '16px', 
                      margin: '0'
                    }}>
                      Découvrez notre collection de recettes existantes
                    </p>
                  </div>

                  {/* Option 2: Créer une nouvelle recette */}
                  <div style={{
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onClick={handleCreateNewRecipe}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#20B251'
                    e.currentTarget.style.backgroundColor = '#f0fdf4'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>✨</div>
                    <h3 style={{ 
                      color: '#1f2937', 
                      fontSize: '24px', 
                      margin: '0 0 10px 0',
                      fontWeight: 'bold'
                    }}>
                      Créer une nouvelle recette
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '16px', 
                      margin: '0'
                    }}>
                      Recommencer le processus avec de nouveaux ingrédients
                    </p>
                  </div>

                  {/* Option 3: Retour à l'accueil */}
                  <div style={{
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onClick={() => window.location.href = '/'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#20B251'
                    e.currentTarget.style.backgroundColor = '#f0fdf4'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏠</div>
                    <h3 style={{ 
                      color: '#1f2937', 
                      fontSize: '24px', 
                      margin: '0 0 10px 0',
                      fontWeight: 'bold'
                    }}>
                      Retour à l'accueil
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '16px', 
                      margin: '0'
                    }}>
                      Retourner à la page d'accueil
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Navigation des étapes */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              style={{
                backgroundColor: currentStep === 1 ? '#f3f4f6' : 'white',
                color: currentStep === 1 ? '#9ca3af' : '#6b7280',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 1) {
                  e.target.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (currentStep !== 1) {
                  e.target.style.backgroundColor = 'white'
                }
              }}
            >
              ← Précédent
            </button>

            <div style={{ 
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Étape {currentStep} / {STEPS.length}
            </div>

            <button
              onClick={handleNext}
              disabled={
                currentStep === STEPS.length || 
                currentStep === 7 ||
                currentStep === 8 ||
                currentStep === 9 ||
                (currentStep === 1 && selectedIngredients.length === 0) ||
                (currentStep === 2 && !selectedCategory) ||
                (currentStep === 3 && !selectedMealType) ||
                (currentStep === 4 && selectedPortions === 0)
              }
              style={{
                backgroundColor: (
                  currentStep === STEPS.length || 
                  currentStep === 7 ||
                  currentStep === 8 ||
                  currentStep === 9 ||
                  (currentStep === 1 && selectedIngredients.length === 0) ||
                  (currentStep === 2 && !selectedCategory) ||
                  (currentStep === 3 && !selectedMealType) ||
                  (currentStep === 4 && selectedPortions === 0)
                ) ? '#f3f4f6' : '#20B251',
                color: (
                  currentStep === STEPS.length || 
                  currentStep === 7 ||
                  currentStep === 8 ||
                  currentStep === 9 ||
                  (currentStep === 1 && selectedIngredients.length === 0) ||
                  (currentStep === 2 && !selectedCategory) ||
                  (currentStep === 3 && !selectedMealType) ||
                  (currentStep === 4 && selectedPortions === 0)
                ) ? '#9ca3af' : 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: (
                  currentStep === STEPS.length || 
                  currentStep === 7 ||
                  currentStep === 8 ||
                  currentStep === 9 ||
                  (currentStep === 1 && selectedIngredients.length === 0) ||
                  (currentStep === 2 && !selectedCategory) ||
                  (currentStep === 3 && !selectedMealType) ||
                  (currentStep === 4 && selectedPortions === 0)
                ) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (
                  currentStep !== STEPS.length && 
                  currentStep !== 7 &&
                  currentStep !== 8 &&
                  currentStep !== 9 &&
                  !(currentStep === 1 && selectedIngredients.length === 0) &&
                  !(currentStep === 2 && !selectedCategory) &&
                  !(currentStep === 3 && !selectedMealType) &&
                  !(currentStep === 4 && selectedPortions === 0)
                ) {
                  e.target.style.backgroundColor = '#1a8f42'
                }
              }}
              onMouseLeave={(e) => {
                if (
                  currentStep !== STEPS.length && 
                  currentStep !== 7 &&
                  currentStep !== 8 &&
                  currentStep !== 9 &&
                  !(currentStep === 1 && selectedIngredients.length === 0) &&
                  !(currentStep === 2 && !selectedCategory) &&
                  !(currentStep === 3 && !selectedMealType) &&
                  !(currentStep === 4 && selectedPortions === 0)
                ) {
                  e.target.style.backgroundColor = '#20B251'
                }
              }}
            >
              Suivant →
            </button>
          </div>
        </div>
      </SlideIn>

      {/* Footer */}
      <FadeIn delay={3000}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          marginTop: '20px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>✅ Générateur de recettes IA - Système d'étapes complet</p>
          <p style={{ margin: '0 0 8px 0' }}>🎯 Étapes 1-9 : Ingrédients + Catégories + Type de repas + Portions + Préférences + Mode cuisson + Récapitulatif + Génération + Choix final</p>
          <p style={{ margin: '0 0 8px 0' }}>🤖 Suggestions intelligentes basées sur les ingrédients</p>
          <p style={{ margin: '0 0 8px 0' }}>👥 6 options de portions : Solo à Grande fête</p>
          <p style={{ margin: '0 0 8px 0' }}>🥬 6 préférences alimentaires : Aucune restriction à Cétogène</p>
          <p style={{ margin: '0 0 8px 0' }}>⚙️ 6 modes de cuisson : Manuel à Monsieur Cuisine</p>
          <p style={{ margin: '0 0 8px 0' }}>✨ Récapitulatif complet avant génération de recette</p>
          <p style={{ margin: '0 0 8px 0' }}>🚀 Écran de génération avec animations et progression</p>
          <p style={{ margin: '0 0 8px 0' }}>🎉 Étape finale avec choix d'action (voir autres recettes, créer nouvelle recette, retour accueil)</p>
          <p style={{ margin: '0' }}>Dernière mise à jour: 23/07/2025 12:00:00</p>
        </div>
      </FadeIn>
    </div>
  )
} 