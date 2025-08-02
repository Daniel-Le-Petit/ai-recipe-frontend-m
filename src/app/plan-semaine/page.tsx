'use client'

import { FadeIn } from '../../components/FadeIn'
import { SlideIn } from '../../components/SlideIn'
import React, { useState, useEffect } from 'react'

// Définition des étapes pour le plan de semaine
const STEPS = [
  { id: 1, name: 'Type de repas', icon: '🍽️', description: 'Choisissez vos types de repas' },
  { id: 2, name: 'Portions', icon: '👥', description: 'Nombre de personnes' },
  { id: 3, name: 'Préférences', icon: '⚙️', description: 'Vos préférences alimentaires' },
  { id: 4, name: 'Mode cuisson', icon: '🍳', description: 'Méthode de cuisson' },
  { id: 5, name: 'Difficulté', icon: '🎯', description: 'Niveau de difficulté' },
  { id: 6, name: 'Temps max', icon: '⏱️', description: 'Temps maximum par repas' },
  { id: 7, name: 'Type de cuisine', icon: '🌍', description: 'Type de cuisine préféré' },
  { id: 8, name: 'Récapitulatif', icon: '✅', description: 'Vérifiez vos choix' },
  { id: 9, name: 'Email', icon: '📧', description: 'Entrez votre email' },
  { id: 10, name: 'Abonnement', icon: '🎉', description: 'Choisissez votre plan' }
]

export default function PlanSemainePage() {
  // État pour gérer les étapes
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 10

  // États pour les étapes
  const [selectedMealTypes, setSelectedMealTypes] = useState([])
  const [selectedPortions, setSelectedPortions] = useState('')
  const [selectedPreferences, setSelectedPreferences] = useState([])
  const [selectedCookingMode, setSelectedCookingMode] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedCookingTime, setSelectedCookingTime] = useState('')
  const [selectedCuisineType, setSelectedCuisineType] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes en secondes
  const [mealStatuses, setMealStatuses] = useState({})

  // Données du plan de semaine généré
  const weeklyPlanData = {
    weekStart: '21-Jul-2025',
    selections: {
      mealTypes: selectedMealTypes,
      portions: selectedPortions,
      preferences: selectedPreferences,
      cookingMode: selectedCookingMode,
      difficulty: selectedDifficulty,
      cookingTime: selectedCookingTime,
      cuisineType: selectedCuisineType
    },
    days: [
      { date: '21-Jul-2025', day: 'Lundi 21 Juillet' },
      { date: '22-Jul-2025', day: 'Mardi 22 Juillet' },
      { date: '23-Jul-2025', day: 'Mercredi 23 Juillet' },
      { date: '24-Jul-2025', day: 'Jeudi 24 Juillet' },
      { date: '25-Jul-2025', day: 'Vendredi 25 Juillet' },
      { date: '26-Jul-2025', day: 'Samedi 26 Juillet' },
      { date: '27-Jul-2025', day: 'Dimanche 27 Juillet' }
    ],
    meals: [
      {
        name: 'Petit-Déjeuner',
        icon: '🌿',
        recipes: [
          {
            name: 'Salade Quinoa et Légumes',
            time: '15 min',
            portions: '2 pers.',
            rating: '4.2',
            tags: ['Vegetarien', 'Sain'],
            ingredients: ['Quinoa', 'Légumes', 'Huile']
          }
        ]
      },
      {
        name: 'Déjeuner',
        icon: '🥗',
        recipes: [
          {
            name: 'Salade Quinoa et Légumes',
            time: '15 min',
            portions: '2 pers.',
            rating: '4.2',
            tags: ['Vegetarien', 'Sain'],
            ingredients: ['Quinoa', 'Légumes', 'Huile']
          }
        ]
      },
      {
        name: 'Collation',
        icon: '🥜',
        recipes: [
          {
            name: 'Salade Quinoa et Légumes',
            time: '15 min',
            portions: '2 pers.',
            rating: '4.2',
            tags: ['Vegetarien', 'Sain'],
            ingredients: ['Quinoa', 'Légumes', 'Huile']
          }
        ]
      },
      {
        name: 'Dîner',
        icon: '🍽️',
        recipes: [
          {
            name: 'Salade Quinoa et Légumes',
            time: '15 min',
            portions: '2 pers.',
            rating: '4.2',
            tags: ['Vegetarien', 'Sain'],
            ingredients: ['Quinoa', 'Légumes', 'Huile']
          }
        ]
      }
    ]
  }

  // Données des options
  const MEAL_TYPES = [
    { id: 'petit-dejeuner', name: 'Petit déjeuner', icon: '🌿', description: 'Pour bien commencer la journée' },
    { id: 'dejeuner', name: 'Déjeuner', icon: '🥗', description: 'Repas du midi équilibré' },
    { id: 'brunch', name: 'Brunch', icon: '🥐', description: 'Le meilleur des deux mondes' },
    { id: 'collation', name: 'Collation', icon: '🥜', description: 'En-cas savoureux' },
    { id: 'dessert', name: 'Dessert', icon: '🍯', description: 'La touche sucrée' },
    { id: 'diner', name: 'Dîner', icon: '🍽️', description: 'Soirée gourmande' }
  ]

  const PORTION_OPTIONS = [
    { id: '1', name: '1 personne', icon: '🌿', description: 'Solo' },
    { id: '2', name: '2 personnes', icon: '🍃', description: 'En couple' },
    { id: '4', name: '4 personnes', icon: '🌱', description: 'Famille' },
    { id: '6', name: '6 personnes', icon: '🌾', description: 'Grandes tablées' },
    { id: '8', name: '8 personnes', icon: '🌳', description: 'Soirée entre amis' },
    { id: '12', name: '12+ personnes', icon: '🌲', description: 'Grande fête' }
  ]

  const PREFERENCE_OPTIONS = [
    { id: 'aucune', name: 'Aucune restriction', icon: '🌾', description: 'Tout est permis' },
    { id: 'vegetarien', name: 'Végétarien', icon: '🥬', description: 'Sans viande ni poisson' },
    { id: 'vegan', name: 'Végan', icon: '🌱', description: 'Uniquement végétal' },
    { id: 'sans-gluten', name: 'Sans gluten', icon: '🌾', description: 'Pour les intolérants' },
    { id: 'pauvre-glucides', name: 'Pauvre en glucides', icon: '🥒', description: 'Moins de sucres' },
    { id: 'cetogene', name: 'Cétogène', icon: '🥑', description: 'Riche en bonnes graisses' }
  ]

  const COOKING_MODE_OPTIONS = [
    { id: 'manuel', name: 'Manuel', icon: '👨‍🍳', description: 'Sans appareil' },
    { id: 'thermomix', name: 'Thermomix', icon: '⚙️', description: 'TM6, TM5, TM31' },
    { id: 'magimix', name: 'Magimix', icon: '🔧', description: 'Cook Expert' },
    { id: 'cookeo', name: 'Cookeo', icon: '🍳', description: 'Multicooker' },
    { id: 'companion', name: 'Companion', icon: '⚡', description: 'Vorwerk' },
    { id: 'monsieur-cuisine', name: 'Monsieur Cuisine', icon: '👨‍🍳', description: 'Lidl' }
  ]

  const DIFFICULTY_OPTIONS = [
    { id: 'facile', name: 'Facile', icon: '👨‍🍳', description: 'Débutant' },
    { id: 'moyen', name: 'Moyen', icon: '⚙️', description: 'Intermédiaire' },
    { id: 'difficile', name: 'Difficile', icon: '🔧', description: 'Expert' }
  ]

  const COOKING_TIME_OPTIONS = [
    { id: '15', name: '15 min', icon: '⏱️', description: 'Rapide' },
    { id: '30', name: '30 min', icon: '⏱️', description: 'Standard' },
    { id: '45', name: '45 min', icon: '⏱️', description: 'Modéré' },
    { id: '60', name: '60 min', icon: '⏱️', description: 'Long' }
  ]

  const CUISINE_TYPE_OPTIONS = [
    { id: 'toutes', name: 'Toutes', icon: '🌍', description: 'Tous types' },
    { id: 'francaise', name: 'Française', icon: '🇫🇷', description: 'Cuisine française' },
    { id: 'italienne', name: 'Italienne', icon: '🇮🇹', description: 'Cuisine italienne' },
    { id: 'mediterraneenne', name: 'Méditerranéenne', icon: '🌊', description: 'Cuisine méditerranéenne' },
    { id: 'asiatique', name: 'Asiatique', icon: '🍜', description: 'Cuisine asiatique' },
    { id: 'mexicaine', name: 'Mexicaine', icon: '🌮', description: 'Cuisine mexicaine' },
    { id: 'vegetarienne', name: 'Végétarienne', icon: '🥬', description: 'Cuisine végétarienne' }
  ]

  // Plans d'abonnement
  const subscriptionPlans = [
    {
      id: 'trial',
      icon: '🟢',
      title: 'Essai gratuit — 7 jours',
      price: 'Gratuit',
      originalPrice: null,
      savings: null,
      description: '3 recettes personnalisées générées par notre IA',
      features: ['Sans engagement'],
      popular: false,
      recommended: false
    },
    {
      id: 'monthly',
      icon: '⭐',
      title: 'Plan mensuel — 1 mois',
      price: '23,99€',
      originalPrice: '29,99€',
      savings: '20%',
      description: '4 à 5 recettes/semaine (20 total)',
      features: ['0,80€/jour', 'Recommandé'],
      popular: false,
      recommended: true
    },
    {
      id: 'quarterly',
      icon: '🌱',
      title: 'Plan trimestriel — 3 mois',
      price: '59,99€',
      originalPrice: '89,97€',
      savings: '33%',
      description: '5 recettes/semaine (60 total)',
      features: ['0,67€/jour', 'Le plus populaire'],
      popular: true,
      recommended: false
    }
  ]

  // Timer pour l'étape 9
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (currentStep === 9) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timer) clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [currentStep])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Validation email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleEmailSubmit = () => {
    if (!email) {
      setEmailError('L\'email est requis')
      return
    }
    if (!validateEmail(email)) {
      setEmailError('Email invalide')
      return
    }
    setEmailError('')
    handleNext()
  }

  // Fonctions de navigation des étapes
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Fonctions de sélection
  const handleMealTypeToggle = (mealType) => {
    setSelectedMealTypes(prev => 
      prev.includes(mealType) 
        ? prev.filter(type => type !== mealType)
        : [...prev, mealType]
    )
  }

  const handleOptionSelect = (optionId, setter) => {
    setter(optionId)
  }

  const handlePreferencesToggle = (preferenceId) => {
    setSelectedPreferences(prev => {
      if (prev.includes(preferenceId)) {
        return prev.filter(id => id !== preferenceId)
      } else {
        return [...prev, preferenceId]
      }
    })
  }

  const toggleMealStatus = (mealName, dayDate) => {
    const key = `${mealName}-${dayDate}`
    setMealStatuses(prev => ({
      ...prev,
      [key]: prev[key] === 'accepted' ? 'declined' : 'accepted'
    }))
  }

  const getMealStatus = (mealName, dayDate) => {
    const key = `${mealName}-${dayDate}`
    return mealStatuses[key] || 'accepted' // Par défaut, tous les repas sont acceptés
  }

  // Vérification si on peut passer à l'étape suivante
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedMealTypes.length > 0
      case 2:
        return selectedPortions !== ''
      case 3:
        return selectedPreferences.length > 0
      case 4:
        return selectedCookingMode !== ''
      case 5:
        return selectedDifficulty !== ''
      case 6:
        return selectedCookingTime !== ''
      case 7:
        return selectedCuisineType !== ''
      case 8:
        return true // Récapitulatif toujours accessible
      case 9:
        return email && validateEmail(email)
      case 10:
        return selectedPlan !== ''
      default:
        return false
    }
  }

  // Rendu des options de sélection
  const renderOptions = (options, selectedValue, onSelect, isMultiSelect = false) => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        {options.map((option) => {
          const isSelected = isMultiSelect 
            ? selectedValue.includes(option.id)
            : selectedValue === option.id

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: isSelected ? '2px solid #20B251' : '2px solid #e5e7eb',
                backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                minHeight: 'auto',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.target.style.borderColor = '#20B251'
                  e.target.style.backgroundColor = '#f0fdf4'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.backgroundColor = '#ffffff'
                }
              }}
            >
              <div style={{
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: isSelected ? '#20B251' : '#f3f4f6',
                color: isSelected ? 'white' : '#6b7280'
              }}>
                {option.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: isSelected ? '#20B251' : '#374151',
                  marginBottom: '4px'
                }}>
                  {option.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: isSelected ? '#20B251' : '#6b7280',
                  lineHeight: '1.4'
                }}>
                  {option.description}
                </div>
              </div>
              {isSelected && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#20B251',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Rendu du contenu de l'étape
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Type de repas
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Ou choisissez un autre type :
            </p>
            {renderOptions(MEAL_TYPES, selectedMealTypes, handleMealTypeToggle, true)}
            {selectedMealTypes.length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Type de repas sélectionnés : {selectedMealTypes.map(type => 
                    MEAL_TYPES.find(opt => opt.id === type)?.name
                  ).join(', ')}
                </p>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Portions
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Pour combien de personnes ?
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Sélectionnez le nombre de portions
            </p>
            {renderOptions(PORTION_OPTIONS, selectedPortions, (id) => handleOptionSelect(id, setSelectedPortions))}
            {selectedPortions && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Préférence sélectionnée : {PORTION_OPTIONS.find(opt => opt.id === selectedPortions)?.name}
                </p>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Préférences alimentaires
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Des restrictions particulières ? (optionnel)
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Sélectionnez vos préférences alimentaires
            </p>
            {renderOptions(PREFERENCE_OPTIONS, selectedPreferences, handlePreferencesToggle, true)}
            {selectedPreferences.length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Préférences sélectionnées : {selectedPreferences.map(pref =>
                    PREFERENCE_OPTIONS.find(opt => opt.id === pref)?.name
                  ).join(', ')}
                </p>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Mode cuisson
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Choisissez votre mode cuisson
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Sélectionnez votre appareil de cuisine pour un guidage personnalisé
            </p>
            {renderOptions(COOKING_MODE_OPTIONS, selectedCookingMode, (id) => handleOptionSelect(id, setSelectedCookingMode))}
            {selectedCookingMode && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Préférence sélectionnée : {COOKING_MODE_OPTIONS.find(opt => opt.id === selectedCookingMode)?.name}
                </p>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Difficulté
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Choisissez votre niveau de difficulté
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Sélectionnez votre niveau de difficulté
            </p>
            {renderOptions(DIFFICULTY_OPTIONS, selectedDifficulty, (id) => handleOptionSelect(id, setSelectedDifficulty))}
            {selectedDifficulty && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Préférence sélectionnée : {DIFFICULTY_OPTIONS.find(opt => opt.id === selectedDifficulty)?.name}
                </p>
              </div>
            )}
          </div>
        )

      case 6:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Temps max par repas
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Combien de temps pour préparer un repas
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Sélectionnez votre temps maximum par repas
            </p>
            {renderOptions(COOKING_TIME_OPTIONS, selectedCookingTime, (id) => handleOptionSelect(id, setSelectedCookingTime))}
            {selectedCookingTime && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Préférence sélectionnée : {COOKING_TIME_OPTIONS.find(opt => opt.id === selectedCookingTime)?.name}
                </p>
              </div>
            )}
          </div>
        )

      case 7:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Type de cuisine
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Quel type de cuisine préférez-vous
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Sélectionnez votre type de cuisine préféré
            </p>
            {renderOptions(CUISINE_TYPE_OPTIONS, selectedCuisineType, (id) => handleOptionSelect(id, setSelectedCuisineType))}
            {selectedCuisineType && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '2px solid #20B251'
              }}>
                <p style={{
                  color: '#20B251',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0
                }}>
                  ✅ Préférence sélectionnée : {CUISINE_TYPE_OPTIONS.find(opt => opt.id === selectedCuisineType)?.name}
                </p>
              </div>
            )}
          </div>
        )

      case 8:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Récapitulatif de vos choix pour le plan de la semaine
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Vérifiez vos choix avant de générer le plan...
            </p>
            
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '24px'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151',
                      width: '30%'
                    }}>
                      Type de repas :
                    </td>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151',
                      width: '30%'
                    }}>
                      Portions :
                    </td>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151',
                      width: '40%'
                    }}>
                      Préférences :
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedMealTypes.length > 0 
                        ? selectedMealTypes.map(type =>
                            MEAL_TYPES.find(opt => opt.id === type)?.name
                          ).join(', ')
                        : 'Aucun sélectionné'
                      }
                    </td>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedPortions 
                        ? PORTION_OPTIONS.find(opt => opt.id === selectedPortions)?.name
                        : 'Non sélectionné'
                      }
                    </td>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedPreferences.length > 0
                        ? selectedPreferences.map(pref =>
                            PREFERENCE_OPTIONS.find(opt => opt.id === pref)?.name
                          ).join(', ')
                        : 'Aucune sélectionnée'
                      }
                    </td>
                  </tr>
                  
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Mode cuisson :
                    </td>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Difficulté :
                    </td>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Temps max :
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedCookingMode 
                        ? COOKING_MODE_OPTIONS.find(opt => opt.id === selectedCookingMode)?.name
                        : 'Non sélectionné'
                      }
                    </td>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedDifficulty 
                        ? DIFFICULTY_OPTIONS.find(opt => opt.id === selectedDifficulty)?.name
                        : 'Non sélectionné'
                      }
                    </td>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedCookingTime 
                        ? COOKING_TIME_OPTIONS.find(opt => opt.id === selectedCookingTime)?.name
                        : 'Non sélectionné'
                      }
                    </td>
                  </tr>
                  
                  <tr>
                    <td style={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Type de cuisine :
                    </td>
                    <td style={{
                      padding: '12px 0',
                      color: '#6b7280'
                    }}>
                      {selectedCuisineType 
                        ? CUISINE_TYPE_OPTIONS.find(opt => opt.id === selectedCuisineType)?.name
                        : 'Non sélectionné'
                      }
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )

      case 9:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              ✅ Votre Plan de la semaine personnalisé est prêt
            </h2>
            
            <div style={{
              color: '#ef4444',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              🍽️ Obtenir mon plan personnalisé
            </div>
            
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Entrez votre adresse email pour obtenir votre plan personnel
            </p>
            
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              border: '2px solid #e5e7eb',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '20px' }}>📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre e-mail"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>
            
            {emailError && (
              <p style={{
                color: '#ef4444',
                marginTop: '8px',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                L'email est requis
              </p>
            )}
            
            <div style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#6b7280',
              justifyContent: 'center'
            }}>
              <span>🔒</span>
              <p style={{ margin: 0 }}>
                Nous respectons votre vie privée et traitons vos données exclusivement conformément à notre <u>politique de confidentialité</u>
              </p>
            </div>
            
            <div style={{
              marginTop: '24px',
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0 }}>
                Cette offre prend fin dans <span style={{ fontWeight: 'bold' }}>{formatTime(timeLeft)}</span> min.
              </p>
            </div>
            
            {/* Plans d'abonnement */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '32px'
            }}>
              {/* Plan Essai gratuit */}
              <div
                onClick={() => setSelectedPlan('trial')}
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  border: selectedPlan === 'trial' ? '2px solid #20B251' : '2px solid #e5e7eb',
                  backgroundColor: selectedPlan === 'trial' ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📅</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  🟢 Essai gratuit — 7 jours
                </h3>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#20B251',
                  marginBottom: '8px'
                }}>
                  🎁 Gratuit
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  3 recettes personnalisées générées par notre IA
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '16px'
                }}>
                  Sans engagement
                </p>
                {selectedPlan === 'trial' && (
                  <div style={{
                    marginTop: '16px',
                    color: '#20B251',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>

              {/* Plan Mensuel */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  border: selectedPlan === 'monthly' ? '2px solid #20B251' : '2px solid #e5e7eb',
                  backgroundColor: selectedPlan === 'monthly' ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⭐</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  Plan mensuel — 1 mois
                </h3>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#20B251',
                  marginBottom: '8px'
                }}>
                  🔄 23,99€
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px',
                  textDecoration: 'line-through'
                }}>
                  <s>29,99€</s> — Économisez 20%
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  4 à 5 recettes/semaine (20 total)
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  0,80€/jour
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#20B251',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}>
                  ✅ Recommandé
                </p>
                {selectedPlan === 'monthly' && (
                  <div style={{
                    marginTop: '16px',
                    color: '#20B251',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>

              {/* Plan Trimestriel */}
              <div
                onClick={() => setSelectedPlan('quarterly')}
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  border: selectedPlan === 'quarterly' ? '2px solid #20B251' : '2px solid #e5e7eb',
                  backgroundColor: selectedPlan === 'quarterly' ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌱</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '12px'
                }}>
                  Plan trimestriel — 3 mois
                </h3>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#20B251',
                  marginBottom: '8px'
                }}>
                  🔄 59,99€
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px',
                  textDecoration: 'line-through'
                }}>
                  <s>89,97€</s> — Économisez 33%
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  5 recettes/semaine (60 total)
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  0,67€/jour
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#20B251',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}>
                  🌿 Le plus populaire
                </p>
                {selectedPlan === 'quarterly' && (
                  <div style={{
                    marginTop: '16px',
                    color: '#20B251',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </div>

            <div style={{
              marginTop: '32px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                🌱 🎯 73% de nos utilisateurs choisissent le plan 3 mois pour des résultats durables.
              </p>
              
              <button
                onClick={handleEmailSubmit}
                style={{
                  backgroundColor: '#20B251',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(32, 178, 81, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1a8f42'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(32, 178, 81, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#20B251'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(32, 178, 81, 0.3)'
                }}
              >
                Obtenez votre plan de la semaine du 21 Juillet 2025 personnalisé !
              </button>
            </div>
          </div>
        )

      case 10:
        return (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#20B251',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              Plan de la Semaine
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Semaine du: {weeklyPlanData.weekStart}
            </p>

            {/* Récapitulatif des sélections */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '32px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Récapitulatif des sélections de mon Plan de la Semaine du: {weeklyPlanData.weekStart}
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <strong>Type de repas</strong><br />
                  {selectedMealTypes.length > 0 
                    ? selectedMealTypes.map(type =>
                        MEAL_TYPES.find(opt => opt.id === type)?.name
                      ).join(', ')
                    : 'Aucun sélectionné'
                  }
                </div>
                <div>
                  <strong>Portions</strong><br />
                  {selectedPortions 
                    ? PORTION_OPTIONS.find(opt => opt.id === selectedPortions)?.name
                    : 'Non sélectionné'
                  }
                </div>
                <div>
                  <strong>Difficulté</strong><br />
                  {selectedDifficulty 
                    ? DIFFICULTY_OPTIONS.find(opt => opt.id === selectedDifficulty)?.name
                    : 'Non sélectionné'
                  }
                </div>
                <div>
                  <strong>Préférences</strong><br />
                  {selectedPreferences.length > 0
                    ? selectedPreferences.map(pref =>
                        PREFERENCE_OPTIONS.find(opt => opt.id === pref)?.name
                      ).join(', ')
                    : 'Aucune sélectionnée'
                  }
                </div>
                <div>
                  <strong>Mode cuisson</strong><br />
                  {selectedCookingMode 
                    ? COOKING_MODE_OPTIONS.find(opt => opt.id === selectedCookingMode)?.name
                    : 'Non sélectionné'
                  }
                </div>
                <div>
                  <strong>Temps max</strong><br />
                  {selectedCookingTime 
                    ? COOKING_TIME_OPTIONS.find(opt => opt.id === selectedCookingTime)?.name
                    : 'Non sélectionné'
                  }
                </div>
                <div>
                  <strong>Type de cuisine</strong><br />
                  {selectedCuisineType 
                    ? CUISINE_TYPE_OPTIONS.find(opt => opt.id === selectedCuisineType)?.name
                    : 'Non sélectionné'
                  }
                </div>
              </div>
            </div>

            {/* Tableau des repas */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '800px'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f9fafb',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: '#374151',
                      borderRight: '1px solid #e5e7eb'
                    }}>
                      Repas
                    </th>
                    {weeklyPlanData.days.map(day => (
                      <th key={day.date} style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#374151',
                        borderRight: '1px solid #e5e7eb'
                      }}>
                        {day.day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklyPlanData.meals.map(meal => (
                    <tr key={meal.name} style={{
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <td style={{
                        padding: '16px',
                        fontWeight: 'bold',
                        color: '#374151',
                        borderRight: '1px solid #e5e7eb',
                        backgroundColor: '#f9fafb'
                      }}>
                        {meal.icon} {meal.name}
                      </td>
                      {weeklyPlanData.days.map(day => {
                        const status = getMealStatus(meal.name, day.date)
                        const isAccepted = status === 'accepted'
                        const recipe = meal.recipes[0]
                        
                        return (
                          <td key={day.date} style={{
                            padding: '8px',
                            borderRight: '1px solid #e5e7eb',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: isAccepted ? '#f0fdf4' : '#fef2f2'
                          }}
                          onClick={() => toggleMealStatus(meal.name, day.date)}
                          >
                            <div style={{
                              padding: '12px',
                              borderRadius: '8px',
                              backgroundColor: isAccepted ? '#dcfce7' : '#fee2e2',
                              border: isAccepted ? '2px solid #22c55e' : '2px solid #ef4444',
                              textAlign: 'center'
                            }}>
                              <div style={{
                                fontWeight: 'bold',
                                color: isAccepted ? '#22c55e' : '#ef4444',
                                marginBottom: '4px',
                                fontSize: '12px'
                              }}>
                                {recipe.name}
                              </div>
                              <div style={{
                                color: isAccepted ? '#22c55e' : '#ef4444',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '4px'
                              }}>
                                {isAccepted ? '✔' : 'X'}
                              </div>
                              <div style={{
                                color: isAccepted ? '#22c55e' : '#ef4444',
                                fontSize: '10px',
                                marginBottom: '2px'
                              }}>
                                {recipe.time} {recipe.portions} {recipe.rating}
                              </div>
                              <div style={{
                                color: isAccepted ? '#22c55e' : '#ef4444',
                                fontSize: '9px',
                                marginBottom: '2px'
                              }}>
                                {recipe.tags.join(' ')}
                              </div>
                              <div style={{
                                color: isAccepted ? '#22c55e' : '#ef4444',
                                fontSize: '8px'
                              }}>
                                {recipe.ingredients.join(' ')}
                              </div>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              marginTop: '24px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                <strong>Important !</strong> Par défaut, tous les plats sont acceptés.
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Cliquez sur un repas pour l'accepter (✔) ou le décliner (X)
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Contenu principal */}
      <SlideIn direction="up" delay={1400}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '20px',
          width: '100%'
        }}>

          {/* En-tête avec IA Culinaire Avancée */}
          <FadeIn delay={600}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              marginBottom: '30px'
            }}>
              {/* Cadre vert avec IA Culinaire Avancée */}
              <div style={{
                background: 'linear-gradient(135deg, #20B251 0%, #10b981 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 24px rgba(32, 178, 81, 0.3)'
              }}>
                <span style={{ fontSize: '24px' }}>🤖</span>
                <h1 style={{ 
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  IA Culinaire Avancée
                </h1>
              </div>

              {/* Titre H3 */}
              <h3 style={{ 
                color: '#20B251', 
                fontSize: '28px', 
                margin: '0 0 16px 0',
                textAlign: 'center',
                fontWeight: '700'
              }}>
                Créez votre plan de semaine personnalisé !
              </h3>

              {/* Description */}
              <p style={{ 
                color: '#6b7280', 
                fontSize: '18px', 
                margin: '0 0 30px 0',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: '1.6'
              }}>
                Choisissez vos types de repas préférés et laissez notre IA créer votre menu sur-mesure. Gratuit et sans engagement !
              </p>

              {/* Barre de progression */}
              <div style={{ 
                backgroundColor: 'white', 
                padding: '30px',
                borderRadius: '16px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                maxWidth: '1000px',
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
                      minWidth: '60px',
                      position: 'relative'
                    }}>
                      {/* Ligne de connexion */}
                      {index < STEPS.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          left: '50%',
                          width: '100%',
                          height: '2px',
                          backgroundColor: index < currentStep - 1 ? '#20B251' : '#e5e7eb',
                          zIndex: 0
                        }} />
                      )}
                      
                      {/* Cercle avec icône */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: index < currentStep ? '#20B251' : '#f3f4f6',
                        border: index === currentStep - 1 ? '3px solid #20B251' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: index < currentStep ? 'white' : '#9ca3af',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        zIndex: 1,
                        position: 'relative'
                      }}>
                        {index < currentStep - 1 ? '✓' : step.icon}
                      </div>
                      
                      {/* Nom de l'étape */}
                      <div style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: index < currentStep ? '#20B251' : '#6b7280',
                        textAlign: 'center',
                        maxWidth: '80px'
                      }}>
                        {step.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contenu de l'étape */}
              <div style={{ 
                backgroundColor: 'white', 
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
                minHeight: '400px'
              }}>
                {renderStepContent()}
              </div>

              {/* Boutons de navigation */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '600px',
                width: '100%',
                marginTop: '20px'
              }}>
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '2px solid #20B251',
                    backgroundColor: 'transparent',
                    color: '#20B251',
                    fontWeight: '600',
                    cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === 1 ? 0.5 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  ← Précédent
                </button>

                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>
                  Étape {currentStep}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: canProceed() 
                      ? 'linear-gradient(135deg, #20B251 0%, #10b981 100%)'
                      : '#e5e7eb',
                    color: 'white',
                    fontWeight: '600',
                    cursor: canProceed() ? 'pointer' : 'not-allowed',
                    opacity: canProceed() ? 1 : 0.5,
                    transition: 'all 0.2s ease',
                    boxShadow: canProceed() ? '0 4px 16px rgba(32, 178, 81, 0.3)' : 'none'
                  }}
                >
                  Suivant →
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </SlideIn>
    </div>
  )
} 