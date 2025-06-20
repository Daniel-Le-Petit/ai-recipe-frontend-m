'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Timer, CheckCircle, Bot, Settings, Play, Pause, RotateCcw, Thermometer, Gauge, Clock3 } from 'lucide-react'

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

interface Props {
  recipe: Recipe
  closeCookingMode: () => void
  currentStepIndex: number
  setCurrentStepIndex: (index: number) => void
  selectedCookingMode: CookingMode
}

type CookingMode = 'manual' | 'thermomix' | 'magimix' | 'cookeo' | 'companion' | 'monsieur-cuisine'

const COOKING_MODES = [
  { 
    id: 'manual', 
    name: 'Manuel', 
    icon: '🌿',
    description: 'Cuisson traditionnelle avec vos ustensiles',
    controls: []
  },
  { 
    id: 'thermomix', 
    name: 'Thermomix', 
    icon: '🥄',
    description: 'Robot culinaire intelligent Vorwerk',
    controls: [
      { label: 'Vitesse', range: '1-10', icon: Gauge },
      { label: 'Température', range: '37-120°C', icon: Thermometer },
      { label: 'Temps', range: '0-99 min', icon: Timer },
      { label: 'Sens inverse', toggle: true, icon: RotateCcw }
    ]
  },
  { 
    id: 'magimix', 
    name: 'Cook Expert', 
    icon: '🥣',
    description: 'Robot culinaire Magimix Cook Expert',
    controls: [
      { label: 'Programme', range: 'P1-P6', icon: Settings },
      { label: 'Température', range: '60-130°C', icon: Thermometer },
      { label: 'Temps', range: '1-90 min', icon: Timer },
      { label: 'Mélangeur', toggle: true, icon: RotateCcw }
    ]
  },
  { 
    id: 'cookeo', 
    name: 'Cookeo', 
    icon: '🍲',
    description: 'Multicuiseur intelligent Moulinex',
    controls: [
      { label: 'Mode', range: 'Dorage/Mijoter/Vapeur', icon: Settings },
      { label: 'Pression', toggle: true, icon: Gauge },
      { label: 'Temps', range: '1-99 min', icon: Timer }
    ]
  },
  { 
    id: 'companion', 
    name: 'Companion', 
    icon: '🥘',
    description: 'Robot culinaire Moulinex Companion',
    controls: [
      { label: 'Programme', range: 'P1-P6', icon: Settings },
      { label: 'Vitesse', range: '1-12', icon: Gauge },
      { label: 'Température', range: '30-130°C', icon: Thermometer },
      { label: 'Temps', range: '1-99 min', icon: Timer }
    ]
  },
  { 
    id: 'monsieur-cuisine', 
    name: 'Monsieur Cuisine', 
    icon: '🍴',
    description: 'Robot culinaire Silvercrest',
    controls: [
      { label: 'Vitesse', range: '1-10', icon: Gauge },
      { label: 'Température', range: '37-120°C', icon: Thermometer },
      { label: 'Temps', range: '1-90 min', icon: Timer },
      { label: 'Turbomix', toggle: true, icon: RotateCcw }
    ]
  }
]

export default function GuidedCookingView({ 
  recipe, 
  closeCookingMode, 
  currentStepIndex, 
  setCurrentStepIndex,
  selectedCookingMode: initialCookingMode
}: Props) {
  const [selectedCookingMode, setSelectedCookingMode] = useState<CookingMode>(initialCookingMode)
  const [showModeSelection, setShowModeSelection] = useState(true)
  const [timerActive, setTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerDuration, setTimerDuration] = useState(0)

  const currentStep = recipe.steps[currentStepIndex]
  const isLastStep = currentStepIndex === recipe.steps.length - 1
  const isFirstStep = currentStepIndex === 0

  const selectedMode = COOKING_MODES.find(mode => mode.id === selectedCookingMode)

  // Gestion du minuteur
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setTimerActive(false)
            // Ici on pourrait ajouter une notification sonore
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, timeLeft])

  const startTimer = (duration: number) => {
    setTimerDuration(duration)
    setTimeLeft(duration)
    setTimerActive(true)
  }

  const stopTimer = () => {
    setTimerActive(false)
    setTimeLeft(0)
  }

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1)
      stopTimer()
    } else {
      // Fin de la recette
      closeCookingMode()
    }
  }

  const previousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1)
      stopTimer()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const startCooking = () => {
    setShowModeSelection(false)
  }

  const getAdaptedInstruction = (instruction: string, cookingMode: CookingMode) => {
    // Adaptation de base des instructions selon l'appareil
    switch (cookingMode) {
      case 'thermomix':
        if (instruction.includes('faites fondre')) {
          return instruction + ' (Thermomix: 2 min / Vitesse 2 / 90°C)'
        }
        if (instruction.includes('faites revenir') || instruction.includes('faites sauter')) {
          return instruction + ' (Thermomix: Sens inverse / Vitesse 1 / 100°C)'
        }
        if (instruction.includes('remuez')) {
          return instruction.replace('remuez', 'programmez le sens inverse / Vitesse 1')
        }
        break
      case 'magimix':
        if (instruction.includes('faites fondre')) {
          return instruction + ' (Cook Expert: Fonction Expert / 120°C / 2 min)'
        }
        if (instruction.includes('faites revenir')) {
          return instruction + ' (Cook Expert: Fonction Expert / 120°C / Mélangeur lent)'
        }
        break
      case 'cookeo':
        if (instruction.includes('faites fondre') || instruction.includes('faites revenir')) {
          return instruction + ' (Cookeo: Mode Dorage / 5 min)'
        }
        break
      case 'companion':
        if (instruction.includes('faites fondre')) {
          return instruction + ' (Companion: Programme P1 / 120°C / 2 min)'
        }
        break
      case 'monsieur-cuisine':
        if (instruction.includes('faites fondre')) {
          return instruction + ' (M.Cuisine: 2 min / Vitesse 2 / 90°C)'
        }
        break
      default:
        return instruction
    }
    return instruction
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        
        {/* Sélection du mode de cuisson */}
        {showModeSelection ? (
          <>
            {/* Header */}
            <div className="bg-herb-green text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="font-poppins text-2xl font-bold">Choisissez votre mode de cuisson</h2>
                <p className="text-herb-green/80">{recipe.title}</p>
              </div>
              <button
                onClick={closeCookingMode}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Sélectionnez votre équipement de cuisine
                </h3>
                <p className="text-slate-600">
                  Chaque mode adaptera automatiquement les instructions et affichera les contrôles spécifiques
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {COOKING_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedCookingMode(mode.id as CookingMode)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 text-left ${
                      selectedCookingMode === mode.id
                        ? 'border-herb-green bg-herb-green/10 text-herb-dark shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="text-4xl mb-4">{mode.icon}</div>
                    <h4 className="font-semibold text-lg mb-2">{mode.name}</h4>
                    <p className="text-sm opacity-75 mb-4">{mode.description}</p>
                    
                    {mode.controls.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Contrôles disponibles :</p>
                        <div className="flex flex-wrap gap-2">
                          {mode.controls.slice(0, 3).map((control, index) => (
                            <div key={index} className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded text-xs">
                              <control.icon className="h-3 w-3" />
                              <span>{control.label}</span>
                            </div>
                          ))}
                          {mode.controls.length > 3 && (
                            <div className="text-xs text-slate-400">+{mode.controls.length - 3}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={startCooking}
                  className="bg-herb-green hover:bg-herb-dark text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
                >
                  <Play className="h-5 w-5" />
                  <span>Commencer la cuisson avec {selectedMode?.name}</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header du mode cuisson */}
            <div className="bg-herb-green text-white p-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowModeSelection(true)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="font-poppins text-2xl font-bold flex items-center space-x-3">
                    <span className="text-3xl">{selectedMode?.icon}</span>
                    <span>Mode {selectedMode?.name}</span>
                  </h2>
                  <p className="text-herb-green/80">{recipe.title}</p>
                </div>
              </div>
              <button
                onClick={closeCookingMode}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
              {/* Contrôles spécifiques du robot */}
              {selectedMode && selectedMode.controls.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bot className="h-6 w-6 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Contrôles {selectedMode.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedMode.controls.map((control, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
                        <control.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-medium text-blue-900 text-sm mb-1">{control.label}</div>
                        <div className="text-xs text-blue-700">
                          {control.toggle ? 'ON/OFF' : control.range}
                        </div>
                        {control.toggle ? (
                          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs transition-colors">
                            Toggle
                          </button>
                        ) : (
                          <div className="mt-2 bg-blue-200 rounded-full h-2 relative">
                            <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progression */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Étape {currentStepIndex + 1} sur {recipe.steps.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentStepIndex + 1) / recipe.steps.length) * 100)}% terminé
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-herb-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / recipe.steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Instruction principale */}
              <div className="text-center mb-8">
                <h3 className="font-poppins text-2xl md:text-3xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {getAdaptedInstruction(currentStep.instruction, selectedCookingMode)}
                </h3>

                {/* Minuteur */}
                {currentStep.duration && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Timer className="h-6 w-6 text-herb-green" />
                      <span className="font-semibold text-lg">Minuteur suggéré</span>
                    </div>
                    
                    {timerActive ? (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-herb-green mb-4">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="flex space-x-3 justify-center">
                          <button
                            onClick={stopTimer}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Arrêter
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-gray-700 mb-4">
                          {Math.floor(currentStep.duration / 60)} min {currentStep.duration % 60 > 0 ? `${currentStep.duration % 60}s` : ''}
                        </div>
                        <button
                          onClick={() => startTimer(currentStep.duration!)}
                          className="px-6 py-3 bg-herb-green text-white rounded-lg hover:bg-herb-dark transition-colors flex items-center space-x-2 mx-auto"
                        >
                          <Timer className="h-4 w-4" />
                          <span>Lancer le minuteur</span>
                        </button>
                      </div>
                    )}

                    {/* Indication visuelle quand le timer est fini */}
                    {timeLeft === 0 && timerDuration > 0 && !timerActive && (
                      <div className="text-center text-green-600 font-semibold flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Temps écoulé !</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 p-6 flex justify-between items-center">
              <button
                onClick={previousStep}
                disabled={isFirstStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Étape précédente</span>
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Étape actuelle</div>
                <div className="font-semibold text-lg text-gray-900">
                  {currentStepIndex + 1} / {recipe.steps.length}
                </div>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-herb-green text-white rounded-lg hover:bg-herb-dark transition-colors"
              >
                <span>{isLastStep ? 'Terminer' : 'Étape suivante'}</span>
                {!isLastStep && <ChevronRight className="h-5 w-5" />}
                {isLastStep && <CheckCircle className="h-5 w-5" />}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 