'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Sparkles, Clock, Users, ChefHat, Settings, ArrowRight, Wand2, Utensils, Leaf, X, Plus, ArrowLeft, Check, ShoppingCart, Store, Save, RefreshCw } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import apiService from '../api'
import type { StrapiCategory } from '@/types/api'

interface Recipe {
  title: string
  description: string
  prepTime: string
  cookTime: string
  servings: number
  ingredients: { name: string; quantity: string }[]
  steps: {
    instruction: string
    duration: number | null
    appliance: { name: string; settings: string } | null
  }[]
}

// Base de données d'ingrédients populaires pour l'auto-complétion avec icônes
const POPULAR_INGREDIENTS = [
  { name: 'tomates', icon: '🍅' },
  { name: 'oignons', icon: '🧅' },
  { name: 'ail', icon: '🧄' },
  { name: 'basilic', icon: '🌿' },
  { name: 'persil', icon: '🌱' },
  { name: 'thym', icon: '🌿' },
  { name: 'romarin', icon: '🌿' },
  { name: 'laurier', icon: '🌿' },
  { name: 'pommes de terre', icon: '🥔' },
  { name: 'carottes', icon: '🥕' },
  { name: 'courgettes', icon: '🥒' },
  { name: 'aubergines', icon: '🍆' },
  { name: 'poivrons', icon: '🫑' },
  { name: 'brocolis', icon: '🥦' },
  { name: 'épinards', icon: '🥬' },
  { name: 'champignons', icon: '🍄' },
  { name: 'avocat', icon: '🥑' },
  { name: 'concombre', icon: '🥒' },
  { name: 'salade', icon: '🥬' },
  { name: 'roquette', icon: '🌱' },
  { name: 'poulet', icon: '🍗' },
  { name: 'bœuf', icon: '🥩' },
  { name: 'porc', icon: '🥓' },
  { name: 'agneau', icon: '🍖' },
  { name: 'saumon', icon: '🐟' },
  { name: 'thon', icon: '🐟' },
  { name: 'crevettes', icon: '🦐' },
  { name: 'moules', icon: '🦪' },
  { name: 'œufs', icon: '🥚' },
  { name: 'lait', icon: '🥛' },
  { name: 'beurre', icon: '🧈' },
  { name: 'crème fraîche', icon: '🥛' },
  { name: 'fromage', icon: '🧀' },
  { name: 'mozzarella', icon: '🧀' },
  { name: 'parmesan', icon: '🧀' },
  { name: 'pâtes', icon: '🍝' },
  { name: 'riz', icon: '🍚' },
  { name: 'quinoa', icon: '🌾' },
  { name: 'boulgour', icon: '🌾' },
  { name: 'pain', icon: '🍞' },
  { name: 'farine', icon: '🌾' },
  { name: 'sucre', icon: '🍯' },
  { name: 'miel', icon: '🍯' },
  { name: 'huile d\'olive', icon: '🫒' },
  { name: 'vinaigre', icon: '🍶' },
  { name: 'citron', icon: '🍋' },
  { name: 'orange', icon: '🍊' },
  { name: 'pommes', icon: '🍎' },
  { name: 'bananes', icon: '🍌' },
  { name: 'sel', icon: '🧂' },
  { name: 'poivre', icon: '🌶️' },
  { name: 'paprika', icon: '🌶️' },
  { name: 'cumin', icon: '🌱' },
  { name: 'curry', icon: '🌶️' },
  { name: 'gingembre', icon: '🫘' },
  { name: 'cannelle', icon: '🌿' }
]

const MEAL_TYPES = [
  { id: 'breakfast', name: 'Petit déjeuner', icon: '🌿', desc: 'Pour bien commencer la journée' },
  { id: 'lunch', name: 'Déjeuner', icon: '🥗', desc: 'Repas du midi équilibré' },
  { id: 'dinner', name: 'Dîner', icon: '🍽️', desc: 'Soirée gourmande' },
  { id: 'snack', name: 'Collation', icon: '🥜', desc: 'En-cas savoureux' },
  { id: 'dessert', name: 'Dessert', icon: '🍯', desc: 'La touche sucrée' },
  { id: 'brunch', name: 'Brunch', icon: '🥐', desc: 'Le meilleur des deux mondes' }
]

const SERVING_OPTIONS = [
  { id: '1', name: '1 personne', icon: '🌿', desc: 'Solo' },
  { id: '2', name: '2 personnes', icon: '🍃', desc: 'En couple' },
  { id: '4', name: '4 personnes', icon: '🌱', desc: 'Famille' },
  { id: '6', name: '6 personnes', icon: '🌾', desc: 'Grandes tablées' },
  { id: '8', name: '8 personnes', icon: '🌳', desc: 'Soirée entre amis' },
  { id: '12', name: '12+ personnes', icon: '🌲', desc: 'Grande fête' }
]

const DIETARY_OPTIONS = [
  { id: '', name: 'Aucune restriction', icon: '🌾', desc: 'Tout est permis' },
  { id: 'vegetarian', name: 'Végétarien', icon: '🥬', desc: 'Sans viande ni poisson' },
  { id: 'vegan', name: 'Végan', icon: '🌱', desc: 'Uniquement végétal' },
  { id: 'gluten-free', name: 'Sans gluten', icon: '🌾', desc: 'Pour les intolérants' },
  { id: 'low-carb', name: 'Pauvre en glucides', icon: '🥒', desc: 'Moins de sucres' },
  { id: 'keto', name: 'Cétogène', icon: '🥑', desc: 'Riche en bonnes graisses' }
]

const STEPS = [
  { id: 1, title: 'Ingrédients', icon: Leaf, desc: 'Que voulez-vous cuisiner ?' },
  { id: 2, title: 'Catégorie', icon: Sparkles, desc: 'Choisissez une catégorie' },
  { id: 3, title: 'Type de repas', icon: Utensils, desc: 'Pour quel moment ?' },
  { id: 4, title: 'Portions', icon: Users, desc: 'Pour combien de personnes ?' },
  { id: 5, title: 'Préférences', icon: Settings, desc: 'Des restrictions ?' },
  { id: 6, title: 'Mode cuisson', icon: ChefHat, desc: 'Choisissez votre appareil' },
  { id: 7, title: 'Récapitulatif', icon: Check, desc: 'Prêt à cuisiner ?' },
  { id: 8, title: 'Choix de recette', icon: Sparkles, desc: 'Sélectionnez votre recette' },
  { id: 9, title: 'Action', icon: ChefHat, desc: 'Que souhaitez-vous faire ?' },
  { id: 10, title: 'Commander', icon: ShoppingCart, desc: 'Sélectionnez votre distributeur' }
]

const DISTRIBUTORS = [
  { 
    id: 'carrefour', 
    name: 'Carrefour', 
    logo: '/distributeurs/carrefour.svg',
    desc: 'Grande distribution'
  },
  { 
    id: 'auchan', 
    name: 'Auchan', 
    logo: '/distributeurs/auchan.svg',
    desc: 'Grande distribution'
  },
  { 
    id: 'lavieclaire', 
    name: 'La Vie Claire', 
    logo: '/distributeurs/lavieclaire.svg',
    desc: 'Bio et naturel'
  },
  { 
    id: 'biocoop', 
    name: 'Biocoop', 
    logo: '/distributeurs/biocoop.svg',
    desc: 'Bio et coopératif'
  }
]

export default function RecipeGenerator() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [dietary, setDietary] = useState('')
  const [mealType, setMealType] = useState('')
  const [servings, setServings] = useState('4')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [selectedCookingMode, setSelectedCookingMode] = useState<'manual' | 'thermomix' | 'magimix' | 'cookeo' | 'companion' | 'monsieur-cuisine'>('manual')
  const [draggedIngredient, setDraggedIngredient] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [selectedDistributor, setSelectedDistributor] = useState('')
  const [recipeSaved, setRecipeSaved] = useState(false)
  const [suggestedMealTypes, setSuggestedMealTypes] = useState<string[]>([])
  const [actionChoice, setActionChoice] = useState<'cook' | 'buy' | null>(null)
  const [isSavingRecipe, setIsSavingRecipe] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fromCard, setFromCard] = useState(false)
  const [hasJumpedToStep3, setHasJumpedToStep3] = useState(false)
  const [categories, setCategories] = useState<StrapiCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  
  const { addToCart, isAuthenticated, setSelectedDistributor: setContextDistributor } = useAppContext()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fromCardParam = searchParams.get('fromCard');
    if (fromCardParam === '1' && !hasJumpedToStep3) {
      setCurrentStep(3);
      setHasJumpedToStep3(true);
    }
  }, [searchParams, hasJumpedToStep3]);

  useEffect(() => {
    const recipeId = searchParams.get('id');
    if (recipeId) {
      const fetchRecipe = async () => {
        try {
          const data = await apiService.getRecipeById(Number(recipeId));
          const recipe = data.data;
          if (recipe) {
            setSelectedIngredients(
              recipe.attributes.ingredients && Array.isArray(recipe.attributes.ingredients)
                ? recipe.attributes.ingredients.map((ing: any) => ing.name || ing)
                : []
            );
            setIngredientInput('');
            setMealType('');
            setServings(recipe.attributes.servings ? String(recipe.attributes.servings) : '4');
            setDietary('');
            if (recipe.attributes.isRobotCompatible) {
              setSelectedCookingMode('thermomix');
            } else {
              setSelectedCookingMode('manual');
            }
          }
        } catch (e) {
          // Gestion d'erreur silencieuse
        }
      };
      fetchRecipe();
    }
  }, [searchParams, hasJumpedToStep3]);

  useEffect(() => {
    apiService.getCategories().then((res) => {
      setCategories(res.data);
    }).catch(() => {
      setCategories([]);
    });
  }, []);

  // Filtrer les suggestions d'ingrédients
  const filteredSuggestions = POPULAR_INGREDIENTS.filter(ingredient =>
    ingredient.name.toLowerCase().includes(ingredientInput.toLowerCase()) &&
    !selectedIngredients.includes(ingredient.name) &&
    ingredientInput.length > 0
  ).slice(0, 8)

  // Ajouter un ingrédient
  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient) && ingredient.trim()) {
      setSelectedIngredients([...selectedIngredients, ingredient.trim()])
      setIngredientInput('')
      setShowSuggestions(false)
    }
  }

  // Supprimer un ingrédient
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient))
  }

  // Gérer l'appui sur Entrée
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ingredientInput.trim()) {
      addIngredient(ingredientInput)
    }
  }

  // Navigation entre étapes
  const nextStep = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      // Gestion spéciale pour les étapes 9 et 10
      if (currentStep === 9 && actionChoice === 'cook') {
        setCurrentStep(8) // Retour à l'étape 8 (choix de recette)
      } else if (currentStep === 10 && actionChoice === 'buy') {
        setCurrentStep(9) // Retour à l'étape 9 (choix d'action)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedIngredients.length > 0
      case 2:
        return selectedCategory !== null
      case 3:
        return mealType !== ''
      case 4:
        return servings !== ''
      case 5:
        return true // Toujours possible de passer
      case 6:
        return selectedCookingMode !== 'manual' // Doit avoir sélectionné un mode
      case 7:
        return true // Toujours possible de passer
      case 8:
        return selectedRecipe !== null
      case 9:
        return actionChoice !== null
      case 10:
        return actionChoice === 'buy' && selectedDistributor !== ''
      default:
        return true
    }
  }

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, ingredient: string) => {
    setDraggedIngredient(ingredient)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedIngredient) {
      addIngredient(draggedIngredient)
      setDraggedIngredient(null)
    }
  }

  // Fonction pour détecter automatiquement le type de repas basé sur les ingrédients
  const detectMealType = (ingredients: string[]) => {
    const ingredientNames = ingredients.map(i => i.toLowerCase())
    
    // Petit déjeuner
    const breakfastIngredients = ['œufs', 'lait', 'beurre', 'pain', 'farine', 'sucre', 'miel', 'pommes', 'bananes', 'orange']
    const breakfastScore = breakfastIngredients.filter(ing => ingredientNames.some(name => name.includes(ing))).length
    
    // Déjeuner/Dîner - Ajout de plus d'ingrédients
    const mealIngredients = [
      'poulet', 'bœuf', 'porc', 'agneau', 'saumon', 'thon', 'crevettes', 'moules',
      'pâtes', 'riz', 'quinoa', 'boulgour', 'pommes de terre', 'carottes', 'courgettes', 
      'aubergines', 'poivrons', 'brocolis', 'épinards', 'champignons', 'tomates', 'oignons',
      'ail', 'basilic', 'persil', 'thym', 'romarin', 'laurier', 'huile d\'olive', 'vinaigre'
    ]
    const mealScore = mealIngredients.filter(ing => ingredientNames.some(name => name.includes(ing))).length
    
    // Collation
    const snackIngredients = ['avocat', 'concombre', 'salade', 'roquette', 'pommes', 'bananes', 'orange', 'citron']
    const snackScore = snackIngredients.filter(ing => ingredientNames.some(name => name.includes(ing))).length
    
    // Dessert
    const dessertIngredients = ['sucre', 'miel', 'pommes', 'bananes', 'orange', 'citron', 'farine', 'beurre', 'lait', 'œufs']
    const dessertScore = dessertIngredients.filter(ing => ingredientNames.some(name => name.includes(ing))).length
    
    // Brunch (combinaison petit déjeuner + repas)
    const brunchScore = breakfastScore + mealScore
    
    const scores = [
      { type: 'breakfast', score: breakfastScore, name: 'Petit déjeuner' },
      { type: 'lunch', score: mealScore, name: 'Déjeuner' },
      { type: 'dinner', score: mealScore, name: 'Dîner' },
      { type: 'snack', score: snackScore, name: 'Collation' },
      { type: 'dessert', score: dessertScore, name: 'Dessert' },
      { type: 'brunch', score: brunchScore, name: 'Brunch' }
    ]
    
    // Filtrer les types avec un score significatif (au moins 1 ingrédient)
    const validScores = scores.filter(score => score.score >= 1)
    
    // Trier par score décroissant
    validScores.sort((a, b) => b.score - a.score)
    
    return validScores
  }

  // Effet pour détecter automatiquement le type de repas quand les ingrédients changent
  useEffect(() => {
    if (selectedIngredients.length > 0 && currentStep === 3 && !mealType) {
      const detectedTypes = detectMealType(selectedIngredients)
      if (detectedTypes.length > 0) {
        setMealType(detectedTypes[0].type)
      }
    }
  }, [selectedIngredients, currentStep, mealType])

  const handleGenerate = async () => {
    setIsLoading(true)
    
    try {
      // Générer 4 recettes avec des variations différentes
      const recipePromises = Array.from({ length: 4 }, (_, index) => {
        const variations = [
          { style: 'classique', difficulty: 'moyen' },
          { style: 'moderne', difficulty: 'facile' },
          { style: 'gastronomique', difficulty: 'difficile' },
          { style: 'rapide', difficulty: 'facile' }
        ]
        
        const variation = variations[index]
        
        return fetch('/api/generate-recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredients: selectedIngredients.join(', '),
            dietary,
            mealType,
            servings: parseInt(servings),
            style: variation.style,
            difficulty: variation.difficulty,
            variation: index + 1,
            cookingMode: selectedCookingMode
          }),
        }).then(res => res.json())
      })

      const recipes = await Promise.all(recipePromises)
      setGeneratedRecipes(recipes)
      nextStep()
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateMore = async () => {
    setIsLoading(true)
    
    try {
      // Générer 2 nouvelles recettes avec des variations différentes
      const recipePromises = Array.from({ length: 2 }, (_, index) => {
        const variations = [
          { style: 'fusion', difficulty: 'moyen' },
          { style: 'traditionnel', difficulty: 'facile' }
        ]
        
        const variation = variations[index]
        
        return fetch('/api/generate-recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredients: selectedIngredients.join(', '),
            dietary,
            mealType,
            servings: parseInt(servings),
            style: variation.style,
            difficulty: variation.difficulty,
            variation: generatedRecipes.length + index + 1,
            cookingMode: selectedCookingMode
          }),
        }).then(res => res.json())
      })

      const newRecipes = await Promise.all(recipePromises)
      setGeneratedRecipes([...generatedRecipes, ...newRecipes])
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecipeSelection = async (recipe: Recipe) => {
    if (isSavingRecipe) return;
    setIsSavingRecipe(true);
    setSelectedRecipe(recipe);
    try {
      await saveRecipeToStrapi(recipe);
    } catch (error: any) {
      // Affiche le message d'erreur Strapi s'il existe
      if (error?.response?.data?.error?.message) {
        setErrorMessage(error.response.data.error.message);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erreur inconnue lors de la sauvegarde.");
      }
      setIsSavingRecipe(false);
      return; // N'avance pas d'étape si erreur
    }
    setIsSavingRecipe(false);
    nextStep();
  };

  const handleActionChoice = (action: 'cook' | 'buy') => {
    setActionChoice(action)
    if (action === 'cook') {
      // Naviguer directement vers la cuisson guidée
      startCookingMode()
    } else {
      setCurrentStep(10) // Étape 10: Commander les ingrédients
    }
  }

  const startCookingMode = () => {
    if (selectedRecipe) {
      // Sauvegarder les données de la recette
      saveRecipeData(selectedRecipe, selectedCookingMode)
      
      // Naviguer vers la page de cuisson guidée
      router.push('/cuisson-guidee')
    }
  }

  const closeCookingMode = () => {
    setSelectedRecipe(null)
    setGeneratedRecipes([])
    setCurrentStep(1)
    setActionChoice(null)
    setSelectedDistributor('')
    setRecipeSaved(false)
    localStorage.removeItem('cookingRecipeData')
  }

  const handleAddToCart = () => {
    if (selectedRecipe && selectedDistributor) {
      setContextDistributor(selectedDistributor)
      addToCart(selectedRecipe.ingredients, selectedDistributor)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      
      // Sauvegarder la recette si l'utilisateur est connecté
      if (isAuthenticated) {
        setRecipeSaved(true)
      }
    }
  }

  // Sauvegarder les données de la recette dans localStorage avant navigation
  const saveRecipeData = (recipe: Recipe, cookingMode: string) => {
    const recipeData = {
      recipe,
      cookingMode,
      timestamp: Date.now()
    }
    localStorage.setItem('cookingRecipeData', JSON.stringify(recipeData))
  }

  // Sauvegarder la recette dans Strapi
  const saveRecipeToStrapi = async (recipe: Recipe) => {
    try {
      // Générer un titre si vide
      let title = recipe.title && recipe.title.trim() !== ''
        ? recipe.title
        : (selectedIngredients.length > 0
            ? `Recette à base de ${selectedIngredients[0]}`
            : 'Recette sans titre')

      // Choisir la difficulté (par défaut : 'Facile')
      let difficulty: 'Facile' | 'Intermédiaire' | 'Difficile' = 'Facile';
      // (Tu peux améliorer la logique ici si tu veux)

      if (selectedCategory === null) {
        throw new Error('Aucune catégorie sélectionnée.');
      }
      const strapiRecipeData = {
        title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.steps.map((step, index) => `${index + 1}. ${step.instruction}`).join('\n'),
        servings: Number(recipe.servings) || 1,
        difficulty,
        isRobotCompatible: selectedCookingMode !== 'manual',
        recipieCategory: selectedCategory,
        // Les autres champs sont optionnels
      }

      const response = await apiService.createRecipe(strapiRecipeData)
      console.log('Recette sauvegardée dans Strapi:', response)
      setRecipeSaved(true)
      
      // Afficher un toast de succès
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      
      return response
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la recette:', error)
      throw error
    }
  }

  // Modifier la fonction pour l'étape 6
  const handleCookingModeSelection = (mode: string) => {
    setSelectedCookingMode(mode as any)
    nextStep() // Passer à l'étape suivante au lieu de naviguer directement
  }

  console.log('DEBUG render', { currentStep });

  return (
    <section id="recipe-generator" className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-herb-green/20 backdrop-blur-sm text-herb-dark px-3 sm:px-4 py-2 rounded-full text-sm font-medium border border-herb-green/30">
              <Wand2 className="h-4 w-4" />
              IA Culinaire Avancée
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
              Créez votre recette
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Notre intelligence artificielle analyse vos préférences pour créer des recettes uniques, adaptées à vos goûts et contraintes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Animation de chargement lors de la génération automatique */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 p-8 bg-white/90 rounded-2xl shadow-2xl border border-herb-green/30">
              <svg className="animate-spin h-10 w-10 text-herb-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-herb-green text-lg font-semibold">Génération de votre recette en cours...</span>
            </div>
          </div>
        )}

        {/* Indicateur de progression */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-10 gap-1 mb-8">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-herb-green text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="hidden lg:block mt-1 text-center">
                  <div className="text-xs font-medium text-slate-600">{step.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2">
              {STEPS[currentStep - 1].title}
            </h3>
            <p className="text-slate-600">{STEPS[currentStep - 1].desc}</p>
          </div>
        </div>

        {/* Contenu des étapes - Container fixe pour éviter le scroll */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-6 sm:p-8 md:p-12 min-h-[600px] flex flex-col">
              
              {/* Étape 1: Ingrédients */}
              {currentStep === 1 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-herb-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Leaf className="h-8 w-8 text-herb-green" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Sélectionnez vos ingrédients</h4>
                    <p className="text-slate-600">Tapez ou glissez-déposez vos ingrédients préférés</p>
                  </div>

                  {/* Zone de drag & drop */}
                  <div 
                    className="border-2 border-dashed border-slate-300 rounded-2xl p-6 mb-6 text-center transition-colors hover:border-herb-green hover:bg-herb-green/10"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Plus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">Glissez vos ingrédients ici ou utilisez la recherche</p>
                    
                    {/* Input avec auto-complétion */}
                    <div className="relative max-w-md mx-auto">
                      <input
                        ref={inputRef}
                        type="text"
                        value={ingredientInput}
                        onChange={(e) => {
                          setIngredientInput(e.target.value)
                          setShowSuggestions(e.target.value.length > 0)
                        }}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setShowSuggestions(ingredientInput.length > 0)}
                        placeholder="Tapez un ingrédient..."
                        className="w-full p-4 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-herb-green/30 focus:border-herb-green/50 transition-all duration-300 shadow-lg text-center"
                      />
                      
                      {/* Suggestions d'auto-complétion */}
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-xl z-10 overflow-hidden">
                          {filteredSuggestions.map((ingredient) => (
                            <button
                              key={ingredient.name}
                              onClick={() => addIngredient(ingredient.name)}
                              className="w-full px-4 py-3 text-left hover:bg-herb-green/10 transition-colors flex items-center gap-3"
                            >
                              <span className="text-lg">{ingredient.icon}</span>
                              <span className="text-slate-700 capitalize">{ingredient.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ingrédients populaires avec drag & drop */}
                  <div>
                    <h5 className="font-medium text-slate-700 mb-4">Ingrédients populaires :</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {POPULAR_INGREDIENTS.slice(0, 12).map((ingredient) => (
                        <div
                          key={ingredient.name}
                          draggable
                          onDragStart={(e) => handleDragStart(e, ingredient.name)}
                          onClick={() => addIngredient(ingredient.name)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 cursor-move hover:scale-105 ${
                            selectedIngredients.includes(ingredient.name)
                              ? 'border-herb-green bg-herb-green/10 text-herb-dark'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/60 hover:bg-white/80'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-lg">{ingredient.icon}</span>
                            <span className="text-xs font-medium capitalize text-center">{ingredient.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags des ingrédients sélectionnés */}
                  {selectedIngredients.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-700">Ingrédients sélectionnés ({selectedIngredients.length}) :</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedIngredients.map((ingredient) => (
                          <div
                            key={ingredient}
                            className="group flex items-center gap-2 bg-herb-green/20 hover:bg-herb-green/30 text-herb-dark px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                          >
                            <span className="font-medium capitalize">{ingredient}</span>
                            <button
                              onClick={() => removeIngredient(ingredient)}
                              className="h-5 w-5 bg-herb-green/30 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors group-hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Étape 2: Catégorie */}
              {currentStep === 2 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-herb-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-herb-green" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Choisissez une catégorie</h4>
                    <p className="text-slate-600">Chaque recette doit appartenir à une catégorie.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.length === 0 ? (
                      <div className="col-span-3 text-center text-gray-400">Aucune catégorie disponible.</div>
                    ) : (
                      categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 relative text-left shadow-md ${
                            selectedCategory === cat.id
                              ? 'border-herb-green bg-herb-green/10 text-herb-green shadow-lg shadow-herb-green/20'
                              : 'border-slate-200 hover:border-herb-green/50 text-slate-700 bg-white/60'
                          }`}
                        >
                          <div className="font-semibold text-lg mb-1">{cat.attributes?.categoryName || `Catégorie #${cat.id}`}</div>
                          {cat.attributes?.categoryDescription && (
                            <div className="text-xs opacity-75 mb-2">{cat.attributes.categoryDescription}</div>
                          )}
                          {selectedCategory === cat.id && (
                            <div className="absolute top-2 right-2 bg-herb-green text-white text-xs px-2 py-1 rounded-full">Sélectionnée</div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                  {selectedCategory === null && (
                    <div className="text-center text-red-500 text-sm mt-2">Veuillez sélectionner une catégorie pour continuer.</div>
                  )}
                </div>
              )}

              {/* Étape 3: Type de repas */}
              {currentStep === 3 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-sage/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Utensils className="h-8 w-8 text-sage" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Quel type de repas ?</h4>
                    <p className="text-slate-600">
                      {detectMealType(selectedIngredients).length > 0 
                        ? `Nous avons détecté ${detectMealType(selectedIngredients).length} type(s) de repas possible(s) basé sur vos ingrédients.`
                        : "Choisissez le moment de la journée"
                      }
                    </p>
                  </div>

                  {/* Types de repas suggérés */}
                  {detectMealType(selectedIngredients).length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-medium text-slate-700 mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-herb-green" />
                        Suggestions basées sur vos ingrédients :
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {detectMealType(selectedIngredients).map((type, index) => (
                          <button
                            key={type.type}
                            onClick={() => setMealType(type.type)}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 relative ${
                              mealType === type.type
                                ? 'border-sage bg-sage/10 text-sage shadow-lg shadow-sage/20'
                                : 'border-herb-green/30 bg-herb-green/5 hover:border-herb-green/50 text-slate-600'
                            }`}
                          >
                            {index === 0 && (
                              <div className="absolute -top-2 -right-2 bg-herb-green text-white text-xs px-2 py-1 rounded-full">
                                Recommandé
                              </div>
                            )}
                            <div className="text-4xl mb-3">{MEAL_TYPES.find(m => m.id === type.type)?.icon}</div>
                            <div className="font-semibold text-sm mb-1">{type.name}</div>
                            <div className="text-xs opacity-75">{MEAL_TYPES.find(m => m.id === type.type)?.desc}</div>
                            <div className="text-xs text-herb-green mt-2">
                              Score: {type.score} ingrédient{type.score > 1 ? 's' : ''}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tous les types de repas */}
                  <div>
                    <h5 className="font-medium text-slate-700 mb-4">
                      {detectMealType(selectedIngredients).length > 0 ? 'Ou choisissez un autre type :' : 'Choisissez le moment de la journée :'}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {MEAL_TYPES.map((meal) => (
                        <button
                          key={meal.id}
                          onClick={() => setMealType(meal.id)}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 relative ${
                            mealType === meal.id
                              ? 'border-sage bg-sage/10 text-sage shadow-lg shadow-sage/20'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/60'
                          }`}
                        >
                          <div className="text-4xl mb-3">{meal.icon}</div>
                          <div className="font-semibold text-sm mb-1">{meal.name}</div>
                          <div className="text-xs opacity-75">{meal.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 4: Portions */}
              {currentStep === 4 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-warm-brown/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-warm-brown" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Pour combien de personnes ?</h4>
                    <p className="text-slate-600">Sélectionnez le nombre de portions</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {SERVING_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setServings(option.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          servings === option.id
                            ? 'border-warm-brown bg-warm-brown/10 text-warm-brown shadow-lg shadow-warm-brown/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/60'
                        }`}
                      >
                        <div className="text-3xl mb-2">{option.icon}</div>
                        <div className="font-semibold text-xs mb-1">{option.name}</div>
                        <div className="text-xs opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Étape 5: Préférences */}
              {currentStep === 5 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-sage/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-8 w-8 text-sage" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Préférences alimentaires</h4>
                    <p className="text-slate-600">Des restrictions particulières ? (optionnel)</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {DIETARY_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setDietary(option.id)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          dietary === option.id
                            ? 'border-sage bg-sage/10 text-sage shadow-lg shadow-sage/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white/60'
                        }`}
                      >
                        <div className="text-4xl mb-3">{option.icon}</div>
                        <div className="font-semibold text-sm mb-1">{option.name}</div>
                        <div className="text-xs opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Étape 6: Mode cuisson */}
              {currentStep === 6 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-herb-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <ChefHat className="h-8 w-8 text-herb-green" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Choisissez votre mode cuisson</h4>
                    <p className="text-slate-600">Sélectionnez votre appareil de cuisine pour un guidage personnalisé</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'manual', name: 'Manuel', icon: '👨‍🍳', desc: 'Sans appareil' },
                      { id: 'thermomix', name: 'Thermomix', icon: '⚙️', desc: 'TM6, TM5, TM31' },
                      { id: 'magimix', name: 'Magimix', icon: '🔧', desc: 'Cook Expert' },
                      { id: 'cookeo', name: 'Cookeo', icon: '🍳', desc: 'Multicooker' },
                      { id: 'companion', name: 'Companion', icon: '⚡', desc: 'Vorwerk' },
                      { id: 'monsieur-cuisine', name: 'Monsieur Cuisine', icon: '👨‍🍳', desc: 'Lidl' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => handleCookingModeSelection(mode.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedCookingMode === mode.id
                            ? 'border-herb-green bg-herb-green/10'
                            : 'border-slate-200 hover:border-slate-300 bg-white/60 hover:bg-white/80'
                        }`}
                      >
                        <div className="text-3xl mb-2">{mode.icon}</div>
                        <div className="font-semibold text-sm mb-1">{mode.name}</div>
                        <div className="text-xs opacity-75">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Étape 7: Récapitulatif */}
              {currentStep === 7 && (
                <div className="flex-1 space-y-8">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-herb-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-herb-green" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Récapitulatif de votre recette</h4>
                    <p className="text-slate-600">Vérifiez vos choix avant de générer la recette</p>
                  </div>

                  <div className="bg-gradient-to-r from-herb-green/10 to-sage/10 rounded-2xl p-6 border border-herb-green/20">
                    <h5 className="font-semibold text-herb-dark mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Votre recette sera :
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-herb-green">
                          <Leaf className="h-4 w-4" />
                          <span>{selectedIngredients.length} ingrédient{selectedIngredients.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-2 text-herb-green">
                          <Utensils className="h-4 w-4" />
                          <span>{MEAL_TYPES.find(m => m.id === mealType)?.name}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-herb-green">
                          <Users className="h-4 w-4" />
                          <span>Pour {servings} personne{parseInt(servings) > 1 ? 's' : ''}</span>
                        </div>
                        {dietary && (
                          <div className="flex items-center gap-2 text-herb-green">
                            <Settings className="h-4 w-4" />
                            <span>{DIETARY_OPTIONS.find(d => d.id === dietary)?.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-herb-green mb-2">Ingrédients sélectionnés :</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedIngredients.map((ingredient) => (
                          <span key={ingredient} className="bg-herb-green/20 text-herb-dark px-3 py-1 rounded-full text-xs font-medium capitalize">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bouton de génération */}
                  <div className="text-center">
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="group relative overflow-hidden bg-gradient-to-r from-herb-green via-sage to-herb-dark hover:from-herb-dark hover:via-herb-green hover:to-sage text-white py-6 px-12 rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xl shadow-2xl shadow-herb-green/25 hover:shadow-herb-green/40 hover:scale-105 transform"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        {isLoading ? (
                          <>
                            <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>IA en cours de création...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Créer ma recette magique</span>
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 8: Choix de recette */}
              {currentStep === 8 && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-herb-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-herb-green" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Vos recettes générées</h4>
                    <p className="text-slate-600">Sélectionnez votre recette préférée ou demandez-en d'autres</p>
                  </div>

                  {/* Grille des recettes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedRecipes.map((recipe, index) => (
                      <div key={index} className="bg-gradient-to-r from-herb-green/10 to-sage/10 rounded-2xl p-6 border border-herb-green/20 hover:border-herb-green/40 transition-all duration-300">
                        <div className="text-center mb-4">
                          <h5 className="font-playfair text-xl font-bold text-slate-900 mb-3">
                            {recipe.title}
                          </h5>
                          <p className="text-slate-600 text-base mb-4 line-clamp-3 leading-relaxed">{recipe.description}</p>
                          
                          <div className="flex justify-center flex-wrap gap-3 text-sm">
                            <div className="flex items-center space-x-2 bg-white/60 px-3 py-2 rounded-full">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{recipe.prepTime}</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/60 px-3 py-2 rounded-full">
                              <ChefHat className="h-4 w-4" />
                              <span className="font-medium">{recipe.cookTime}</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/60 px-3 py-2 rounded-full">
                              <Users className="h-4 w-4" />
                              <span className="font-medium">{recipe.servings} portions</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h6 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-base">
                            <Leaf className="h-4 w-4 text-herb-green" />
                            Ingrédients principaux
                          </h6>
                          <div className="space-y-2">
                            {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                              <div key={idx} className="flex items-center space-x-3 text-sm">
                                <div className="h-2 w-2 bg-herb-green rounded-full"></div>
                                <span className="text-slate-700 font-medium">{ingredient.name}</span>
                              </div>
                            ))}
                            {recipe.ingredients.length > 4 && (
                              <div className="text-sm text-slate-500 font-medium">
                                ... et {recipe.ingredients.length - 4} autres ingrédients
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRecipeSelection(recipe)}
                          disabled={isSavingRecipe}
                          className="w-full bg-gradient-to-r from-herb-green to-sage hover:from-herb-dark hover:to-sage-dark text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-base"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Check className="h-5 w-5" />
                            <span>Choisir cette recette</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Bouton pour générer plus de recettes */}
                  <div className="text-center">
                    <button
                      onClick={handleGenerateMore}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-10 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <RefreshCw className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>{isLoading ? 'Génération...' : `Générer ${generatedRecipes.length >= 6 ? '2' : '2'} autres recettes`}</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 9: Choix d'action */}
              {currentStep === 9 && selectedRecipe && (
                <div className="flex-1 space-y-8">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-herb-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <ChefHat className="h-8 w-8 text-herb-green" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Que souhaitez-vous faire ?</h4>
                    <p className="text-slate-600">Choisissez votre prochaine étape</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                      onClick={() => handleActionChoice('cook')}
                      className="group p-8 rounded-2xl border-2 border-herb-green/30 hover:border-herb-green transition-all duration-300 hover:scale-105 bg-gradient-to-br from-herb-green/10 to-sage/10 hover:from-herb-green/20 hover:to-sage/20"
                    >
                      <div className="text-center space-y-4">
                        <div className="h-20 w-20 bg-herb-green/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-herb-green/30 transition-colors">
                          <ChefHat className="h-10 w-10 text-herb-green" />
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-slate-800 mb-2">Cuisiner maintenant</h5>
                          <p className="text-slate-600 text-base leading-relaxed">
                            Commencez à cuisiner avec notre mode guidé personnalisé pour votre appareil !
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleActionChoice('buy')}
                      className="group p-8 rounded-2xl border-2 border-blue-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
                    >
                      <div className="text-center space-y-4">
                        <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                          <ShoppingCart className="h-10 w-10 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-slate-800 mb-2">Commander les ingrédients</h5>
                          <p className="text-slate-600 text-base leading-relaxed">
                            Besoin d'ingrédients ? Commandez-les chez votre distributeur préféré et nous les ajoutons à votre panier !
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 10: Commander les ingrédients */}
              {currentStep === 10 && actionChoice === 'buy' && selectedRecipe && (
                <div className="flex-1 space-y-6">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Store className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Commander les ingrédients</h4>
                    <p className="text-slate-600">Choisissez votre distributeur pour commander les ingrédients</p>
                  </div>

                  <div className="space-y-6">
                    {/* Sélection du distributeur */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">Choisissez votre distributeur :</label>
                      <div className="grid grid-cols-2 gap-3">
                        {DISTRIBUTORS.map((distributor) => (
                          <button
                            key={distributor.id}
                            onClick={() => setSelectedDistributor(distributor.id)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              selectedDistributor === distributor.id
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <img 
                                src={distributor.logo} 
                                alt={distributor.name}
                                className="h-8 w-auto object-contain"
                              />
                              <span className="text-xs font-medium text-slate-700">{distributor.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedDistributor}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Commander chez {selectedDistributor ? DISTRIBUTORS.find(d => d.id === selectedDistributor)?.name : 'votre distributeur'}</span>
                      </div>
                    </button>

                    {/* Message de sauvegarde */}
                    {isAuthenticated && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                        <Save className="h-4 w-4" />
                        <span>La recette sera sauvegardée dans votre compte</span>
                      </div>
                    )}

                    {/* Message de succès */}
                    {recipeSaved && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-center space-x-2 text-green-700">
                          <Check className="h-5 w-5" />
                          <span className="font-semibold">✅ Recette sauvegardée !</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Affichage d'erreur si on arrive sur une étape inappropriée */}
              {((currentStep === 9 && !selectedRecipe) || (currentStep === 10 && actionChoice !== 'buy')) && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <X className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Erreur de navigation</h4>
                    <p className="text-slate-600">Cette étape n'est pas accessible. Retournez à l'étape précédente.</p>
                    <button
                      onClick={() => setCurrentStep(8)}
                      className="mt-4 px-6 py-3 bg-herb-green text-white rounded-xl hover:bg-herb-dark transition-colors"
                    >
                      Retour au choix de recette
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Précédent</span>
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Étape</div>
                  <div className="font-semibold text-lg text-gray-900">
                    {currentStep} / {STEPS.length}
                  </div>
                </div>

                {currentStep < 6 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex items-center space-x-2 px-6 py-3 bg-herb-green text-white rounded-xl hover:bg-herb-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">Suivant</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="w-20"></div> // Spacer pour garder l'alignement
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast de notification */}
        {showToast && (
          <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce">
            <Check className="h-5 w-5" />
            <span className="font-semibold">
              {recipeSaved 
                ? "✅ Recette sauvegardée dans Strapi !"
                : `✅ Ingrédients ajoutés au panier ! ${selectedDistributor && ` Prêt pour ${DISTRIBUTORS.find(d => d.id === selectedDistributor)?.name}`}`
              }
            </span>
          </div>
        )}

        {/* Message d'erreur */}
        {errorMessage && (
          <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce">
            <span className="font-semibold">{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="ml-4 underline">Fermer</button>
          </div>
        )}
      </div>
    </section>
  )
} 