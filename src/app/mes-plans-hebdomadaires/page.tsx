'use client'

import { FadeIn } from '../../components/FadeIn'
import { SlideIn } from '../../components/SlideIn'
import React, { useState } from 'react'

export default function MesPlansHebdomadairesPage() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)

  // Données simulées pour plusieurs semaines
  const weeklyPlans = [
    {
      weekStart: '21-Jul-2025',
      selections: {
        mealTypes: ['petit-dejeuner', 'dejeuner', 'collation', 'diner'],
        portions: '2',
        preferences: ['vegetarien'],
        cookingMode: 'manuel',
        difficulty: 'moyen',
        cookingTime: '30',
        cuisineType: 'toutes'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'declined' // X par défaut
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted' // ✔ par défaut
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'declined' // X par défaut
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted' // ✔ par défaut
            }
          ]
        }
      ]
    },
    {
      weekStart: '28-Jul-2025',
      selections: {
        mealTypes: ['petit-dejeuner', 'dejeuner', 'collation', 'diner'],
        portions: '2',
        preferences: ['vegetarien'],
        cookingMode: 'manuel',
        difficulty: 'moyen',
        cookingTime: '30',
        cuisineType: 'toutes'
      },
      days: [
        { date: '28-Jul-2025', day: 'Lundi 28 Juillet' },
        { date: '29-Jul-2025', day: 'Mardi 29 Juillet' },
        { date: '30-Jul-2025', day: 'Mercredi 30 Juillet' },
        { date: '31-Jul-2025', day: 'Jeudi 31 Juillet' },
        { date: '01-Août-2025', day: 'Vendredi 01 Août' },
        { date: '02-Août-2025', day: 'Samedi 02 Août' },
        { date: '03-Août-2025', day: 'Dimanche 03 Août' }
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'declined'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted'
            }
          ]
        }
      ]
    },
    {
      weekStart: '04-Août-2025',
      selections: {
        mealTypes: ['petit-dejeuner', 'dejeuner', 'collation', 'diner'],
        portions: '2',
        preferences: ['vegetarien'],
        cookingMode: 'manuel',
        difficulty: 'moyen',
        cookingTime: '30',
        cuisineType: 'toutes'
      },
      days: [
        { date: '04-Août-2025', day: 'Lundi 04 Août' },
        { date: '05-Août-2025', day: 'Mardi 05 Août' },
        { date: '06-Août-2025', day: 'Mercredi 06 Août' },
        { date: '07-Août-2025', day: 'Jeudi 07 Août' },
        { date: '08-Août-2025', day: 'Vendredi 08 Août' },
        { date: '09-Août-2025', day: 'Samedi 09 Août' },
        { date: '10-Août-2025', day: 'Dimanche 10 Août' }
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'accepted'
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
              ingredients: ['Quinoa', 'Légumes', 'Huile'],
              status: 'declined'
            }
          ]
        }
      ]
    }
  ]

  const goToPreviousWeek = () => {
    setCurrentWeekIndex(prev => Math.max(0, prev - 1))
  }

  const goToNextWeek = () => {
    setCurrentWeekIndex(prev => Math.min(weeklyPlans.length - 1, prev + 1))
  }

  const goToWeek = (weekIndex: number) => {
    setCurrentWeekIndex(weekIndex)
  }

  const currentPlan = weeklyPlans[currentWeekIndex]

  // Options pour afficher les noms
  const MEAL_TYPES = [
    { id: 'petit-dejeuner', name: 'Petit-Déjeuner' },
    { id: 'dejeuner', name: 'Déjeuner' },
    { id: 'collation', name: 'Collation' },
    { id: 'diner', name: 'Dîner' }
  ]

  const PORTION_OPTIONS = [
    { id: '2', name: '2' }
  ]

  const DIFFICULTY_OPTIONS = [
    { id: 'moyen', name: 'Moyen' }
  ]

  const PREFERENCE_OPTIONS = [
    { id: 'vegetarien', name: 'Végétarien' }
  ]

  const COOKING_MODE_OPTIONS = [
    { id: 'manuel', name: 'Manuel' }
  ]

  const COOKING_TIME_OPTIONS = [
    { id: '30', name: '30 min' }
  ]

  const CUISINE_TYPE_OPTIONS = [
    { id: 'toutes', name: 'Toutes' }
  ]

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

          {/* En-tête */}
          <FadeIn delay={600}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              marginBottom: '30px'
            }}>
              <h1 style={{ 
                color: '#20B251', 
                fontSize: '32px', 
                margin: '0 0 16px 0',
                textAlign: 'center',
                fontWeight: '700'
              }}>
                Mes Plans de la Semaine
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: '1.6',
                margin: '0 0 24px 0'
              }}>
                Consultez et gérez vos plans hebdomadaires personnalisés. 
                Naviguez entre les différentes semaines pour voir vos repas planifiés 
                et les sélections que vous avez faites.
              </p>
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '2px solid #20B251',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#20B251',
                  fontWeight: 'bold',
                  margin: '0'
                }}>
                  💡 Cette page affiche vos plans en lecture seule. 
                  Pour créer un nouveau plan, utilisez la page "Créer mon plan personnalisé".
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Navigation entre semaines */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={goToPreviousWeek}
              disabled={currentWeekIndex === 0}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                backgroundColor: currentWeekIndex === 0 ? '#f3f4f6' : '#ffffff',
                color: currentWeekIndex === 0 ? '#9ca3af' : '#374151',
                cursor: currentWeekIndex === 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              ← Semaine précédente
            </button>

            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              {weeklyPlans.map((plan, index) => (
                <button
                  key={plan.weekStart}
                  onClick={() => goToWeek(index)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: currentWeekIndex === index ? '2px solid #20B251' : '2px solid #e5e7eb',
                    backgroundColor: currentWeekIndex === index ? '#f0fdf4' : '#ffffff',
                    color: currentWeekIndex === index ? '#20B251' : '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {plan.weekStart}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextWeek}
              disabled={currentWeekIndex === weeklyPlans.length - 1}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                backgroundColor: currentWeekIndex === weeklyPlans.length - 1 ? '#f3f4f6' : '#ffffff',
                color: currentWeekIndex === weeklyPlans.length - 1 ? '#9ca3af' : '#374151',
                cursor: currentWeekIndex === weeklyPlans.length - 1 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Semaine suivante →
            </button>
          </div>

          {/* Récapitulatif des sélections */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <strong>Type de repas</strong><br />
                {currentPlan.selections.mealTypes.map(type =>
                  MEAL_TYPES.find(opt => opt.id === type)?.name
                ).join(', ')}
              </div>
              <div>
                <strong>Portions</strong><br />
                {PORTION_OPTIONS.find(opt => opt.id === currentPlan.selections.portions)?.name}
              </div>
              <div>
                <strong>Difficulté</strong><br />
                {DIFFICULTY_OPTIONS.find(opt => opt.id === currentPlan.selections.difficulty)?.name}
              </div>
              <div>
                <strong>Préférences</strong><br />
                {currentPlan.selections.preferences.map(pref =>
                  PREFERENCE_OPTIONS.find(opt => opt.id === pref)?.name
                ).join(', ')}
              </div>
              <div>
                <strong>Mode cuisson</strong><br />
                {COOKING_MODE_OPTIONS.find(opt => opt.id === currentPlan.selections.cookingMode)?.name}
              </div>
              <div>
                <strong>Temps max</strong><br />
                {COOKING_TIME_OPTIONS.find(opt => opt.id === currentPlan.selections.cookingTime)?.name}
              </div>
              <div>
                <strong>Type de cuisine</strong><br />
                {CUISINE_TYPE_OPTIONS.find(opt => opt.id === currentPlan.selections.cuisineType)?.name}
              </div>
            </div>
          </div>

          {/* Tableau des repas (lecture seule) */}
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
                  {currentPlan.days.map(day => (
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
                {currentPlan.meals.map(meal => (
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
                    {currentPlan.days.map(day => {
                      const recipe = meal.recipes[0]
                      const isAccepted = recipe.status === 'accepted'
                      
                      return (
                        <td key={day.date} style={{
                          padding: '8px',
                          borderRight: '1px solid #e5e7eb',
                          backgroundColor: isAccepted ? '#f0fdf4' : '#fef2f2'
                        }}>
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
              fontStyle: 'italic'
            }}>
              Cette page affiche vos plans hebdomadaires en lecture seule. Les sélections ne sont pas modifiables.
            </p>
          </div>

        </div>
      </SlideIn>
    </div>
  )
} 