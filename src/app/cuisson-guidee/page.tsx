'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, ChefHat, Users, Leaf, Check, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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

interface CookingData {
  recipe: Recipe
  cookingMode: string
  timestamp: number
}

// Mapping des modes de cuisson vers leurs noms d'affichage
const COOKING_MODE_NAMES = {
  manual: 'Manuel',
  thermomix: 'Thermomix',
  magimix: 'Magimix',
  cookeo: 'Cookeo',
  companion: 'Companion',
  'monsieur-cuisine': 'Monsieur Cuisine'
}

// Adapter les instructions selon l'appareil
const adaptInstructionsForAppliance = (instruction: string, targetAppliance: string) => {
  const applianceMappings = {
    'monsieur-cuisine': {
      'thermomix': 'Monsieur Cuisine',
      'magimix': 'Monsieur Cuisine',
      'cookeo': 'Monsieur Cuisine',
      'companion': 'Monsieur Cuisine'
    },
    'thermomix': {
      'monsieur-cuisine': 'Thermomix',
      'magimix': 'Thermomix',
      'cookeo': 'Thermomix',
      'companion': 'Thermomix'
    },
    'magimix': {
      'thermomix': 'Magimix',
      'monsieur-cuisine': 'Magimix',
      'cookeo': 'Magimix',
      'companion': 'Magimix'
    },
    'cookeo': {
      'thermomix': 'Cookeo',
      'magimix': 'Cookeo',
      'monsieur-cuisine': 'Cookeo',
      'companion': 'Cookeo'
    },
    'companion': {
      'thermomix': 'Companion',
      'magimix': 'Companion',
      'monsieur-cuisine': 'Companion',
      'cookeo': 'Companion'
    }
  }

  let adaptedInstruction = instruction
  
  // Remplacer les références d'appareils
  if (applianceMappings[targetAppliance as keyof typeof applianceMappings]) {
    Object.entries(applianceMappings[targetAppliance as keyof typeof applianceMappings]).forEach(([oldAppliance, newAppliance]) => {
      const regex = new RegExp(oldAppliance, 'gi')
      adaptedInstruction = adaptedInstruction.replace(regex, newAppliance)
    })
  }

  // Adapter les paramètres spécifiques selon l'appareil
  if (targetAppliance === 'monsieur-cuisine') {
    adaptedInstruction = adaptedInstruction
      .replace(/Sens inverse \/ Vitesse \d+ \/ \d+°C/g, 'Vitesse 2 / 100°C')
      .replace(/Expert, \d+[A-Z], \d+°C/g, 'Vitesse 2 / 120°C')
      .replace(/Maintien à \d+°C, mélange lent/g, 'Vitesse 1 / 85°C')
  } else if (targetAppliance === 'thermomix') {
    adaptedInstruction = adaptedInstruction
      .replace(/Vitesse \d+ \/ \d+°C/g, 'Sens inverse / Vitesse 2 / 100°C')
      .replace(/Expert, \d+[A-Z], \d+°C/g, 'Sens inverse / Vitesse 2 / 120°C')
      .replace(/Maintien à \d+°C, mélange lent/g, 'Sens inverse / Vitesse 1 / 85°C')
  }

  return adaptedInstruction
}

export default function CuissonGuidee() {
  const router = useRouter()
  const [cookingData, setCookingData] = useState<CookingData | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Récupérer les données de la recette depuis localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cookingRecipeData')
    if (savedData) {
      try {
        const data = JSON.parse(savedData) as CookingData
        setCookingData(data)
      } catch (error) {
        console.error('Erreur lors du chargement des données de recette:', error)
        router.push('/creer-recette')
      }
    } else {
      // Pas de données, rediriger vers la création de recette
      router.push('/creer-recette')
    }
  }, [router])

  // Gestion du timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && timeRemaining && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev > 0) {
            return prev - 1
          } else {
            setIsPlaying(false)
            return 0
          }
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, timeRemaining])

  // Démarrer le timer pour l'étape actuelle
  const startTimer = () => {
    const currentStep = cookingData?.recipe.steps[currentStepIndex]
    if (currentStep?.duration) {
      setTimeRemaining(currentStep.duration)
      setIsPlaying(true)
    }
  }

  // Arrêter le timer
  const pauseTimer = () => {
    setIsPlaying(false)
  }

  // Passer à l'étape suivante
  const nextStep = () => {
    if (cookingData && currentStepIndex < cookingData.recipe.steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStepIndex])
      setCurrentStepIndex(currentStepIndex + 1)
      setTimeRemaining(null)
      setIsPlaying(false)
    }
  }

  // Revenir à l'étape précédente
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setTimeRemaining(null)
      setIsPlaying(false)
    }
  }

  // Marquer une étape comme terminée
  const completeStep = () => {
    if (!completedSteps.includes(currentStepIndex)) {
      setCompletedSteps(prev => [...prev, currentStepIndex])
    }
  }

  // Retourner à la création de recette
  const goBack = () => {
    localStorage.removeItem('cookingRecipeData')
    router.push('/creer-recette')
  }

  // Formater le temps en mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!cookingData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement de votre recette...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const { recipe, cookingMode } = cookingData
  const currentStep = recipe.steps[currentStepIndex]
  const isStepCompleted = completedSteps.includes(currentStepIndex)
  const isLastStep = currentStepIndex === recipe.steps.length - 1

  // Adapter les instructions pour l'appareil sélectionné
  const adaptedInstruction = adaptInstructionsForAppliance(currentStep.instruction, cookingMode)
  const adaptedAppliance = currentStep.appliance ? {
    ...currentStep.appliance,
    name: COOKING_MODE_NAMES[cookingMode as keyof typeof COOKING_MODE_NAMES] || currentStep.appliance.name,
    settings: adaptInstructionsForAppliance(currentStep.appliance.settings, cookingMode)
  } : null

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">{recipe.title}</h1>
            <p className="text-slate-500 mt-2 text-base">
              Mode de cuisson : <span className="font-semibold text-slate-700">{COOKING_MODE_NAMES[cookingMode as keyof typeof COOKING_MODE_NAMES] || cookingMode}</span>
            </p>

            {/* Pilules d'information */}
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2 mt-4">
              <div className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                <Clock className="h-4 w-4 text-slate-500" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                <ChefHat className="h-4 w-4 text-slate-500" />
                <span>{recipe.cookTime}</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                <Users className="h-4 w-4 text-slate-500" />
                <span>{recipe.servings} portions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <button
            onClick={goBack}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </button>
          
          {/* Progression */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Étape {currentStepIndex + 1} sur {recipe.steps.length}
              </h2>
              <div className="flex items-center space-x-2">
                {completedSteps.length > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    {completedSteps.length} étape{completedSteps.length > 1 ? 's' : ''} terminée{completedSteps.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            
            {/* Barre de progression */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-herb-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / recipe.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              {/* Étape actuelle */}
              <div className="mb-8">
                <div className="flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    isStepCompleted ? 'bg-green-500 text-white' : 'bg-herb-green text-white'
                  }`}>
                    {isStepCompleted ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <span className="font-bold">{currentStepIndex + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {adaptedInstruction}
                    </h3>
                    
                    {/* Timer si l'étape a une durée */}
                    {currentStep.duration && (
                      <div className="bg-herb-green/10 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl font-mono font-bold text-herb-green">
                              {timeRemaining ? formatTime(timeRemaining) : formatTime(currentStep.duration)}
                            </div>
                            <div className="text-sm text-slate-600">
                              {timeRemaining ? 'Temps restant' : 'Durée totale'}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {!isPlaying ? (
                              <button
                                onClick={startTimer}
                                className="p-2 bg-herb-green text-white rounded-lg hover:bg-herb-dark transition-colors"
                              >
                                <Play className="h-5 w-5" />
                              </button>
                            ) : (
                              <button
                                onClick={pauseTimer}
                                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                              >
                                <Pause className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Paramètres d'appareil si applicable */}
                    {adaptedAppliance && (
                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <ChefHat className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">{adaptedAppliance.name}</span>
                        </div>
                        <p className="text-blue-700">{adaptedAppliance.settings}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SkipBack className="h-5 w-5" />
                  <span>Précédent</span>
                </button>

                <div className="flex items-center space-x-3">
                  {!isStepCompleted && (
                    <button
                      onClick={completeStep}
                      className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      Marquer comme terminé
                    </button>
                  )}
                  
                  {!isLastStep ? (
                    <button
                      onClick={nextStep}
                      className="flex items-center space-x-2 px-6 py-3 bg-herb-green text-white rounded-xl hover:bg-herb-dark transition-colors"
                    >
                      <span>Suivant</span>
                      <SkipForward className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={goBack}
                      className="flex items-center space-x-2 px-6 py-3 bg-herb-green text-white rounded-xl hover:bg-herb-dark transition-colors"
                    >
                      <Check className="h-5 w-5" />
                      <span>Terminer la recette</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Liste des étapes */}
          <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Toutes les étapes</h3>
              <div className="space-y-3">
                {recipe.steps.map((step, index) => {
                  const adaptedStepInstruction = adaptInstructionsForAppliance(step.instruction, cookingMode)
                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-xl transition-colors cursor-pointer ${
                        index === currentStepIndex
                          ? 'bg-herb-green/20 border-2 border-herb-green'
                          : completedSteps.includes(index)
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentStepIndex(index)}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        completedSteps.includes(index)
                          ? 'bg-green-500 text-white'
                          : index === currentStepIndex
                          ? 'bg-herb-green text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {completedSteps.includes(index) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${
                          completedSteps.includes(index)
                            ? 'text-green-800 line-through'
                            : index === currentStepIndex
                            ? 'text-herb-dark font-medium'
                            : 'text-slate-600'
                        }`}>
                          {adaptedStepInstruction}
                        </p>
                        {step.duration && (
                          <p className="text-xs text-slate-500 mt-1">
                            {formatTime(step.duration)}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 