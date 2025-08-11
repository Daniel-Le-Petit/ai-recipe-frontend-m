'use client'

import { useState } from 'react'
import { FadeIn } from '../../components/FadeIn'
import { SlideIn } from '../../components/SlideIn'
import { Pulse } from '../../components/Pulse'

// Simplified steps
const STEPS = [
  { id: 1, title: 'Ingrédients', description: 'Sélectionnez vos ingrédients' },
  { id: 2, title: 'Préférences', description: 'Choisissez vos préférences' },
  { id: 3, title: 'Génération', description: 'Votre recette est en cours de création' },
  { id: 4, title: 'Résultat', description: 'Votre recette personnalisée' }
]

// Popular ingredients (simplified)
const POPULAR_INGREDIENTS = [
  'Tomates', 'Oignons', 'Ail', 'Basilic', 'Mozzarella', 'Parmesan',
  'Riz', 'Pâtes', 'Poulet', 'Saumon', 'Courgettes', 'Aubergines',
  'Champignons', 'Épinards', 'Citron', 'Huile d\'olive'
]

// Simple categories
const RECIPE_CATEGORIES = [
  { id: 'plat-principal', name: 'Plat principal', icon: '🍽️' },
  { id: 'entree', name: 'Entrée', icon: '🥗' },
  { id: 'dessert', name: 'Dessert', icon: '🍰' }
]

// Simple meal types
const MEAL_TYPES = [
  { id: 'dejeuner', name: 'Déjeuner', icon: '🌞' },
  { id: 'diner', name: 'Dîner', icon: '🌙' },
  { id: 'snack', name: 'En-cas', icon: '☕' }
]

// Simple portions
const PORTION_OPTIONS = [1, 2, 4, 6, 8]

// Simple dietary preferences
const DIETARY_PREFERENCES = [
  { id: 'classique', name: 'Classique', icon: '🍖' },
  { id: 'vegetarien', name: 'Végétarien', icon: '🥬' },
  { id: 'vegan', name: 'Végan', icon: '🌱' },
  { id: 'sans-gluten', name: 'Sans gluten', icon: '🌾' }
]

// Simple cooking modes
const COOKING_MODES = [
  { id: 'manuel', name: 'Manuel', description: 'Sans appareil', icon: '👨‍🍳' },
  { id: 'thermomix', name: 'Thermomix', description: 'TM6, TM5, TM31', icon: '⚙️' },
  { id: 'magimix', name: 'Magimix', description: 'Cook Expert', icon: '🔧' }
]

// Mock recipes for demonstration
const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Salade composée aux tomates et basilic',
    description: 'Une salade fraîche et colorée parfaite pour l\'été',
    ingredients: ['Tomates', 'Basilic', 'Mozzarella', 'Huile d\'olive', 'Vinaigre balsamique'],
    instructions: [
      'Lavez et coupez les tomates en quartiers',
      'Tranchez la mozzarella',
      'Arrangez les tomates et la mozzarella sur un plat',
      'Ajoutez le basilic frais',
      'Arrosez d\'huile d\'olive et de vinaigre balsamique',
      'Salez et poivrez selon vos goûts'
    ],
    duration: 15,
    servings: 4,
    difficulty: 'Facile',
    category: 'entree',
    image: '/Images/entree-category.svg'
  },
  {
    id: '2',
    title: 'Risotto aux légumes de saison',
    description: 'Un risotto crémeux et réconfortant',
    ingredients: ['Riz Arborio', 'Légumes de saison', 'Parmesan', 'Bouillon de légumes'],
    instructions: [
      'Faites revenir les légumes dans l\'huile d\'olive',
      'Ajoutez le riz et faites-le nacrer',
      'Versez le bouillon progressivement en remuant',
      'Ajoutez le parmesan à la fin',
      'Laissez reposer 2 minutes avant de servir'
    ],
    duration: 30,
    servings: 4,
    difficulty: 'Intermédiaire',
    category: 'plat-principal',
    image: '/Images/plat-principal-category.svg'
  },
  {
    id: '3',
    title: 'Tarte aux fruits rouges',
    description: 'Une tarte légère et fruitée',
    ingredients: ['Pâte sablée', 'Fruits rouges', 'Crème pâtissière', 'Gelée de fruits'],
    instructions: [
      'Préchauffez le four à 180°C',
      'Foncez le moule avec la pâte',
      'Préparez la crème pâtissière',
      'Disposez les fruits sur la crème',
      'Nappez de gelée et laissez refroidir'
    ],
    duration: 45,
    servings: 6,
    difficulty: 'Intermédiaire',
    category: 'dessert',
    image: '/Images/dessert-category.svg'
  }
]

export default function CreateRecipePageStreamlined() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchIngredient, setSearchIngredient] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedMealType, setSelectedMealType] = useState<string>('')
  const [selectedPortions, setSelectedPortions] = useState<number>(0)
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState<string>('')
  const [selectedCookingMode, setSelectedCookingMode] = useState<string>('')
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [showRecipeSelection, setShowRecipeSelection] = useState(false)

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
    setCurrentStep(3)
    
    setTimeout(() => {
      const newRecipe = {
        id: 'generated-1',
        title: `Recette personnalisée ${selectedCategory ? `- ${RECIPE_CATEGORIES.find(c => c.id === selectedCategory)?.name}` : ''}`,
        description: `Une délicieuse recette créée spécialement pour vous avec ${selectedIngredients.join(', ')}`,
        ingredients: [...selectedIngredients, 'Sel', 'Poivre', 'Huile d\'olive'],
        instructions: [
          'Préparez tous vos ingrédients',
          'Faites chauffer l\'huile dans une poêle',
          'Ajoutez vos ingrédients principaux',
          'Assaisonnez selon vos goûts',
          'Laissez cuire à feu moyen',
          'Servez chaud et dégustez !'
        ],
        duration: 25,
        servings: selectedPortions || 2,
        difficulty: 'Facile',
        category: selectedCategory || 'plat-principal',
        cookingMode: selectedCookingMode
      }
      
      setGeneratedRecipe(newRecipe)
      setCurrentStep(4)
    }, 3000)
  }

  const handleRecipeSelect = (recipe: any) => {
    setSelectedRecipe(recipe)
    setShowRecipeSelection(true)
  }

  const handleConnectToMerchant = () => {
    alert('Connexion au commerçant en cours...')
  }

  const handleStartCooking = () => {
    window.location.href = `/cuisson-guidee?recipe=${selectedRecipe?.id}`
  }

  const handleBackToRecipes = () => {
    setShowRecipeSelection(false)
    setSelectedRecipe(null)
  }

  const handleViewOtherRecipes = () => {
    window.location.href = '/mes-recettes'
  }

  const handleCreateNewRecipe = () => {
    setCurrentStep(1)
    setSelectedIngredients([])
    setSelectedCategory('')
    setSelectedMealType('')
    setSelectedPortions(0)
    setSelectedDietaryPreference('')
    setSelectedCookingMode('')
    setGeneratedRecipe(null)
    setSelectedRecipe(null)
    setShowRecipeSelection(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        padding: '20px'
      }}>
        <h1 style={{ 
          color: '#1f2937', 
          fontSize: '36px', 
          margin: '0 0 10px 0',
          fontWeight: 'bold'
        }}>
          🍳 Créer une recette
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '18px', 
          margin: '0'
        }}>
          Créez votre recette personnalisée en quelques étapes simples
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto 40px auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          {STEPS.map((step, index) => (
            <div key={step.id} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step.id ? '#20B251' : '#e5e7eb',
                color: currentStep >= step.id ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span style={{
                fontSize: '12px',
                color: currentStep >= step.id ? '#1f2937' : '#6b7280',
                fontWeight: currentStep >= step.id ? '600' : '400',
                textAlign: 'center'
              }}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#e5e7eb',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            height: '100%',
            backgroundColor: '#20B251',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto'
      }}>
        {/* Step 1: Ingredient Selection */}
        {currentStep === 1 && (
          <SlideIn direction="right">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ 
                color: '#1f2937', 
                fontSize: '28px', 
                margin: '0 0 20px 0',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                🥬 Quels ingrédients avez-vous ?
              </h2>
              
              {/* Search */}
              <form onSubmit={handleSearchSubmit} style={{ marginBottom: '30px' }}>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '20px'
                }}>
                  <input
                    type="text"
                    value={searchIngredient}
                    onChange={(e) => setSearchIngredient(e.target.value)}
                    placeholder="Ajouter un ingrédient..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#20B251',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Ajouter
                  </button>
                </div>
              </form>

              {/* Popular ingredients */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#1f2937', 
                  fontSize: '20px', 
                  margin: '0 0 15px 0',
                  fontWeight: 'bold'
                }}>
                  Ingrédients populaires
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '10px'
                }}>
                  {POPULAR_INGREDIENTS.map((ingredient) => (
                    <button
                      key={ingredient}
                      onClick={() => handleIngredientSelect(ingredient)}
                      disabled={selectedIngredients.includes(ingredient)}
                      style={{
                        padding: '10px',
                        border: selectedIngredients.includes(ingredient) 
                          ? '2px solid #20B251' 
                          : '2px solid #e5e7eb',
                        borderRadius: '10px',
                        backgroundColor: selectedIngredients.includes(ingredient) 
                          ? '#f0fdf4' 
                          : 'white',
                        color: selectedIngredients.includes(ingredient) 
                          ? '#20B251' 
                          : '#1f2937',
                        cursor: selectedIngredients.includes(ingredient) 
                          ? 'default' 
                          : 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {ingredient}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected ingredients */}
              {selectedIngredients.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '20px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Vos ingrédients sélectionnés
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    {selectedIngredients.map((ingredient) => (
                      <div
                        key={ingredient}
                        style={{
                          backgroundColor: '#20B251',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {ingredient}
                        <button
                          onClick={() => handleIngredientRemove(ingredient)}
                          style={{
                            backgroundColor: 'transparent',
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

              {/* Navigation */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: '20px'
              }}>
                <button
                  onClick={handleNext}
                  disabled={selectedIngredients.length === 0}
                  style={{
                    backgroundColor: selectedIngredients.length > 0 ? '#20B251' : '#e5e7eb',
                    color: selectedIngredients.length > 0 ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '15px 30px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: selectedIngredients.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Continuer →
                </button>
              </div>
            </div>
          </SlideIn>
        )}

        {/* Step 2: Preferences */}
        {currentStep === 2 && (
          <SlideIn direction="right">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ 
                color: '#1f2937', 
                fontSize: '28px', 
                margin: '0 0 20px 0',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                ⚙️ Vos préférences
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
              }}>
                {/* Category */}
                <div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '18px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Type de recette
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {RECIPE_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        style={{
                          padding: '12px 16px',
                          border: selectedCategory === category.id 
                            ? '2px solid #20B251' 
                            : '2px solid #e5e7eb',
                          borderRadius: '10px',
                          backgroundColor: selectedCategory === category.id 
                            ? '#f0fdf4' 
                            : 'white',
                          color: '#1f2937',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal type */}
                <div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '18px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Moment de la journée
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {MEAL_TYPES.map((mealType) => (
                      <button
                        key={mealType.id}
                        onClick={() => handleMealTypeSelect(mealType.id)}
                        style={{
                          padding: '12px 16px',
                          border: selectedMealType === mealType.id 
                            ? '2px solid #20B251' 
                            : '2px solid #e5e7eb',
                          borderRadius: '10px',
                          backgroundColor: selectedMealType === mealType.id 
                            ? '#f0fdf4' 
                            : 'white',
                          color: '#1f2937',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{mealType.icon}</span>
                        {mealType.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Portions */}
                <div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '18px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Nombre de portions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {PORTION_OPTIONS.map((portion) => (
                      <button
                        key={portion}
                        onClick={() => handlePortionSelect(portion)}
                        style={{
                          padding: '12px 16px',
                          border: selectedPortions === portion 
                            ? '2px solid #20B251' 
                            : '2px solid #e5e7eb',
                          borderRadius: '10px',
                          backgroundColor: selectedPortions === portion 
                            ? '#f0fdf4' 
                            : 'white',
                          color: '#1f2937',
                          cursor: 'pointer',
                          fontSize: '16px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {portion} personne{portion > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary preference */}
                <div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '18px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Régime alimentaire
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {DIETARY_PREFERENCES.map((preference) => (
                      <button
                        key={preference.id}
                        onClick={() => handleDietaryPreferenceSelect(preference.id)}
                        style={{
                          padding: '12px 16px',
                          border: selectedDietaryPreference === preference.id 
                            ? '2px solid #20B251' 
                            : '2px solid #e5e7eb',
                          borderRadius: '10px',
                          backgroundColor: selectedDietaryPreference === preference.id 
                            ? '#f0fdf4' 
                            : 'white',
                          color: '#1f2937',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{preference.icon}</span>
                        {preference.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cooking mode */}
                <div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '18px', 
                    margin: '0 0 15px 0',
                    fontWeight: 'bold'
                  }}>
                    Mode de cuisson
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {COOKING_MODES.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => handleCookingModeSelect(mode.id)}
                        style={{
                          padding: '12px 16px',
                          border: selectedCookingMode === mode.id 
                            ? '2px solid #20B251' 
                            : '2px solid #e5e7eb',
                          borderRadius: '10px',
                          backgroundColor: selectedCookingMode === mode.id 
                            ? '#f0fdf4' 
                            : 'white',
                          color: '#1f2937',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{mode.icon}</span>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontWeight: 'bold' }}>{mode.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{mode.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                gap: '20px'
              }}>
                <button
                  onClick={handlePrevious}
                  style={{
                    backgroundColor: 'white',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '15px 30px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ← Retour
                </button>
                <button
                  onClick={handleGenerateRecipe}
                  style={{
                    backgroundColor: '#20B251',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '15px 30px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Générer ma recette →
                </button>
              </div>
            </div>
          </SlideIn>
        )}

        {/* Step 3: Generation */}
        {currentStep === 3 && (
          <FadeIn delay={1600}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '60px 40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🤖</div>
              <h2 style={{ 
                color: '#1f2937', 
                fontSize: '32px', 
                margin: '0 0 20px 0',
                fontWeight: 'bold'
              }}>
                Génération en cours...
              </h2>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '18px', 
                margin: '0 0 30px 0'
              }}>
                Notre IA cuisine votre recette personnalisée
              </p>
              <Pulse>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #e5e7eb',
                  borderTop: '4px solid #20B251',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }} />
              </Pulse>
            </div>
          </FadeIn>
        )}

        {/* Step 4: Recipe Display */}
        {currentStep === 4 && !showRecipeSelection && (
          <FadeIn delay={1600}>
            <div>
              {/* Generated Recipe */}
              {generatedRecipe && (
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '40px',
                  marginBottom: '40px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '2px solid #20B251'
                }}>
                                     <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                     <h2 style={{ 
                       color: '#1f2937', 
                       fontSize: '32px', 
                       margin: '0 0 15px 0',
                       fontWeight: 'bold'
                     }}>
                       🎉 Votre recette est prête !
                     </h2>
                     
                     {/* Recipe Photo */}
                     <div style={{
                       width: '200px',
                       height: '200px',
                       margin: '0 auto 20px auto',
                       borderRadius: '20px',
                       overflow: 'hidden',
                       boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                       border: '3px solid #20B251'
                     }}>
                       <img
                         src="/Images/plat-principal-category.svg"
                         alt="Photo de la recette"
                         style={{
                           width: '100%',
                           height: '100%',
                           objectFit: 'cover'
                         }}
                       />
                     </div>
                     
                     <h3 style={{ 
                       color: '#1f2937', 
                       fontSize: '24px', 
                       margin: '0 0 10px 0',
                       fontWeight: 'bold'
                     }}>
                       {generatedRecipe.title}
                     </h3>
                     <p style={{ 
                       color: '#6b7280', 
                       fontSize: '18px', 
                       margin: '0 0 15px 0'
                     }}>
                       {generatedRecipe.description}
                     </p>
                     
                     {/* Excitement message */}
                     <div style={{
                       backgroundColor: '#fef3c7',
                       border: '2px solid #f59e0b',
                       borderRadius: '12px',
                       padding: '15px 20px',
                       margin: '0 auto',
                       maxWidth: '400px'
                     }}>
                       <p style={{
                         color: '#92400e',
                         fontSize: '16px',
                         margin: '0',
                         fontWeight: '600',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         gap: '8px'
                       }}>
                         🌟 Cette recette a été créée spécialement pour vous !
                       </p>
                     </div>
                   </div>

                                     {/* Recipe details */}
                   <div style={{ 
                     display: 'grid', 
                     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                     gap: '20px',
                     marginBottom: '30px'
                   }}>
                     <div style={{
                       backgroundColor: '#f0fdf4',
                       padding: '20px',
                       borderRadius: '16px',
                       textAlign: 'center',
                       border: '2px solid #20B251',
                       boxShadow: '0 4px 12px rgba(32, 178, 81, 0.15)',
                       transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)'
                       e.currentTarget.style.boxShadow = '0 8px 20px rgba(32, 178, 81, 0.25)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)'
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(32, 178, 81, 0.15)'
                     }}
                     >
                       <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏱️</div>
                       <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>{generatedRecipe.duration} min</div>
                       <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Temps de préparation</div>
                     </div>
                     <div style={{
                       backgroundColor: '#f0fdf4',
                       padding: '20px',
                       borderRadius: '16px',
                       textAlign: 'center',
                       border: '2px solid #20B251',
                       boxShadow: '0 4px 12px rgba(32, 178, 81, 0.15)',
                       transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)'
                       e.currentTarget.style.boxShadow = '0 8px 20px rgba(32, 178, 81, 0.25)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)'
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(32, 178, 81, 0.15)'
                     }}
                     >
                       <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
                       <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>{generatedRecipe.servings} personne{generatedRecipe.servings > 1 ? 's' : ''}</div>
                       <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Portions</div>
                     </div>
                     <div style={{
                       backgroundColor: '#f0fdf4',
                       padding: '20px',
                       borderRadius: '16px',
                       textAlign: 'center',
                       border: '2px solid #20B251',
                       boxShadow: '0 4px 12px rgba(32, 178, 81, 0.15)',
                       transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)'
                       e.currentTarget.style.boxShadow = '0 8px 20px rgba(32, 178, 81, 0.25)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)'
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(32, 178, 81, 0.15)'
                     }}
                     >
                       <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                       <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>{generatedRecipe.difficulty}</div>
                       <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Niveau</div>
                     </div>
                   </div>

                                     {/* Ingredients and instructions */}
                   <div style={{ 
                     display: 'grid', 
                     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                     gap: '30px',
                     marginBottom: '30px'
                   }}>
                     <div>
                       <h4 style={{ 
                         color: '#1f2937', 
                         fontSize: '20px', 
                         margin: '0 0 15px 0',
                         fontWeight: 'bold',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '8px'
                       }}>
                         🥬 Ingrédients
                         <span style={{
                           backgroundColor: '#20B251',
                           color: 'white',
                           fontSize: '12px',
                           padding: '4px 8px',
                           borderRadius: '12px',
                           fontWeight: 'normal'
                         }}>
                           {generatedRecipe.ingredients.length} ingrédients
                         </span>
                       </h4>
                       <ul style={{ listStyle: 'none', padding: 0 }}>
                         {generatedRecipe.ingredients.map((ingredient: string, index: number) => (
                           <li key={index} style={{
                             backgroundColor: '#f9fafb',
                             padding: '12px 16px',
                             marginBottom: '10px',
                             borderRadius: '12px',
                             border: '2px solid #e5e7eb',
                             display: 'flex',
                             alignItems: 'center',
                             gap: '10px',
                             transition: 'all 0.2s ease'
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.borderColor = '#20B251'
                             e.currentTarget.style.backgroundColor = '#f0fdf4'
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.borderColor = '#e5e7eb'
                             e.currentTarget.style.backgroundColor = '#f9fafb'
                           }}
                           >
                             <span style={{
                               backgroundColor: '#20B251',
                               color: 'white',
                               width: '24px',
                               height: '24px',
                               borderRadius: '50%',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               fontSize: '12px',
                               fontWeight: 'bold'
                             }}>
                               {index + 1}
                             </span>
                             {ingredient}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div>
                       <h4 style={{ 
                         color: '#1f2937', 
                         fontSize: '20px', 
                         margin: '0 0 15px 0',
                         fontWeight: 'bold',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '8px'
                       }}>
                         📝 Instructions
                         <span style={{
                           backgroundColor: '#3b82f6',
                           color: 'white',
                           fontSize: '12px',
                           padding: '4px 8px',
                           borderRadius: '12px',
                           fontWeight: 'normal'
                         }}>
                           {generatedRecipe.instructions.length} étapes
                         </span>
                       </h4>
                       <ol style={{ padding: 0, listStyle: 'none' }}>
                         {generatedRecipe.instructions.map((instruction: string, index: number) => (
                           <li key={index} style={{
                             backgroundColor: '#f9fafb',
                             padding: '16px 20px',
                             marginBottom: '12px',
                             borderRadius: '12px',
                             border: '2px solid #e5e7eb',
                             position: 'relative',
                             transition: 'all 0.2s ease'
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.borderColor = '#3b82f6'
                             e.currentTarget.style.backgroundColor = '#eff6ff'
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.borderColor = '#e5e7eb'
                             e.currentTarget.style.backgroundColor = '#f9fafb'
                           }}
                           >
                             <div style={{
                               position: 'absolute',
                               top: '-8px',
                               left: '20px',
                               backgroundColor: '#3b82f6',
                               color: 'white',
                               width: '32px',
                               height: '32px',
                               borderRadius: '50%',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               fontSize: '14px',
                               fontWeight: 'bold',
                               border: '3px solid white'
                             }}>
                               {index + 1}
                             </div>
                             <div style={{ marginTop: '8px' }}>
                               {instruction}
                             </div>
                           </li>
                         ))}
                       </ol>
                     </div>
                   </div>

                                     {/* Action buttons */}
                   <div style={{ 
                     display: 'grid', 
                     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                     gap: '20px'
                   }}>
                     <button
                       onClick={() => handleRecipeSelect(generatedRecipe)}
                       style={{
                         backgroundColor: '#20B251',
                         color: 'white',
                         border: 'none',
                         borderRadius: '16px',
                         padding: '18px 32px',
                         fontSize: '18px',
                         fontWeight: 'bold',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         gap: '12px',
                         boxShadow: '0 8px 25px rgba(32, 178, 81, 0.3)',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.transform = 'translateY(-4px)'
                         e.currentTarget.style.boxShadow = '0 12px 35px rgba(32, 178, 81, 0.4)'
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.transform = 'translateY(0)'
                         e.currentTarget.style.boxShadow = '0 8px 25px rgba(32, 178, 81, 0.3)'
                       }}
                     >
                       🎯 Sélectionner cette recette?
                     </button>
                     <button
                       onClick={handleViewOtherRecipes}
                       style={{
                         backgroundColor: 'white',
                         color: '#6b7280',
                         border: '2px solid #e5e7eb',
                         borderRadius: '16px',
                         padding: '18px 32px',
                         fontSize: '18px',
                         fontWeight: 'bold',
                         cursor: 'pointer',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = '#20B251'
                         e.currentTarget.style.color = '#20B251'
                         e.currentTarget.style.backgroundColor = '#f0fdf4'
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = '#e5e7eb'
                         e.currentTarget.style.color = '#6b7280'
                         e.currentTarget.style.backgroundColor = 'white'
                       }}
                     >
                       📚 Voir d'autres recettes
                     </button>
                     <button
                       onClick={handleCreateNewRecipe}
                       style={{
                         backgroundColor: 'white',
                         color: '#6b7280',
                         border: '2px solid #e5e7eb',
                         borderRadius: '16px',
                         padding: '18px 32px',
                         fontSize: '18px',
                         fontWeight: 'bold',
                         cursor: 'pointer',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderColor = '#20B251'
                         e.currentTarget.style.color = '#20B251'
                         e.currentTarget.style.backgroundColor = '#f0fdf4'
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderColor = '#e5e7eb'
                         e.currentTarget.style.color = '#6b7280'
                         e.currentTarget.style.backgroundColor = 'white'
                       }}
                     >
                       ✨ Créer une nouvelle recette
                     </button>
                   </div>
                </div>
              )}

              {/* Other recipes */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <h3 style={{ 
                  color: '#1f2937', 
                  fontSize: '24px', 
                  margin: '0 0 20px 0',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  🍽️ Découvrez d'autres recettes
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '20px'
                }}>
                  {MOCK_RECIPES.map((recipe) => (
                    <div
                      key={recipe.id}
                      onClick={() => handleRecipeSelect(recipe)}
                      style={{
                        backgroundColor: '#f9fafb',
                        border: '2px solid #e5e7eb',
                        borderRadius: '16px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#20B251'
                        e.currentTarget.style.backgroundColor = '#f0fdf4'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.backgroundColor = '#f9fafb'
                      }}
                    >
                      <h4 style={{ 
                        color: '#1f2937', 
                        fontSize: '18px', 
                        margin: '0 0 10px 0',
                        fontWeight: 'bold'
                      }}>
                        {recipe.title}
                      </h4>
                      <p style={{ 
                        color: '#6b7280', 
                        fontSize: '14px', 
                        margin: '0 0 15px 0'
                      }}>
                        {recipe.description}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        <span>⏱️ {recipe.duration} min</span>
                        <span>👥 {recipe.servings}</span>
                        <span>📊 {recipe.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Recipe Selection Screen */}
        {showRecipeSelection && selectedRecipe && (
          <FadeIn delay={1600}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ 
                  color: '#1f2937', 
                  fontSize: '28px', 
                  margin: '0 0 10px 0',
                  fontWeight: 'bold'
                }}>
                  🎯 {selectedRecipe.title}
                </h2>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '18px', 
                  margin: '0'
                }}>
                  Que souhaitez-vous faire avec cette recette ?
                </p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '30px',
                marginBottom: '30px'
              }}>
                {/* Connect to merchant */}
                <button
                  onClick={handleConnectToMerchant}
                  style={{
                    backgroundColor: 'white',
                    border: '3px solid #20B251',
                    borderRadius: '16px',
                    padding: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🛒</div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '20px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Se connecter au commerçant
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '14px', 
                    margin: '0'
                  }}>
                    Commandez vos ingrédients (Auchan, Carrefour, Intermarché...)
                  </p>
                </button>

                {/* Start cooking */}
                <button
                  onClick={handleStartCooking}
                  style={{
                    backgroundColor: 'white',
                    border: '3px solid #3b82f6',
                    borderRadius: '16px',
                    padding: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#eff6ff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>👨‍🍳</div>
                  <h3 style={{ 
                    color: '#1f2937', 
                    fontSize: '20px', 
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    Exécuter la recette pas à pas
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '14px', 
                    margin: '0'
                  }}>
                    Suivez les instructions étape par étape avec guidage
                  </p>
                </button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleBackToRecipes}
                  style={{
                    backgroundColor: 'white',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ← Retour aux recettes
                </button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
