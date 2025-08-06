'use client'

import { FadeIn } from '../../../components/FadeIn'
import { SlideIn } from '../../../components/SlideIn'
import React, { useState, useEffect } from 'react'

export default function PlanSemaineVoirPage() {
  const [mealStatuses, setMealStatuses] = useState({})
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)

  // Données des semaines (simulation - en vrai ça viendrait de l'API)
  const weeklyPlans = [
    {
      weekStart: '21-Jul-2025',
      filters: {
        mealType: 'Petit-Déjeuner, Déjeuner, Collation, Dîner',
        portions: '2',
        difficulty: 'Moyen',
        preferences: 'Végétarien',
        cookingMode: 'Manuel',
        maxTime: '30 min',
        cuisine: 'Toutes'
      },
      days: [
        { date: '21-Jul-2025', dayName: 'Lundi' },
        { date: '22-Jul-2025', dayName: 'Mardi' },
        { date: '23-Jul-2025', dayName: 'Mercredi' },
        { date: '24-Jul-2025', dayName: 'Jeudi' },
        { date: '25-Jul-2025', dayName: 'Vendredi' },
        { date: '26-Jul-2025', dayName: 'Samedi' },
        { date: '27-Jul-2025', dayName: 'Dimanche' }
      ],
      meals: [
        { name: 'Petit-Déjeuner', icon: '🌿' },
        { name: 'Déjeuner', icon: '🥗' },
        { name: 'Collation', icon: '🥜' },
        { name: 'Dîner', icon: '🍽️' }
      ]
    }
  ]

  // Initialiser les statuts des repas (tous acceptés par défaut)
  useEffect(() => {
    const initialStatuses = {}
    weeklyPlans.forEach((weekPlan, weekIndex) => {
      weekPlan.days.forEach(day => {
        weekPlan.meals.forEach(meal => {
          const key = `${meal.name}-${day.date}`
          initialStatuses[key] = 'accepted' // Par défaut, tous les repas sont acceptés
        })
      })
    })
    setMealStatuses(initialStatuses)
  }, [weeklyPlans])

  const toggleMealStatus = (mealName, dayDate) => {
    const key = `${mealName}-${dayDate}`
    setMealStatuses(prev => ({
      ...prev,
      [key]: prev[key] === 'accepted' ? 'declined' : 'accepted'
    }))
  }

  const getMealStatus = (mealName, dayDate) => {
    const key = `${mealName}-${dayDate}`
    return mealStatuses[key] || 'accepted'
  }

  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  const goToNextWeek = () => {
    if (currentWeekIndex < weeklyPlans.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }

  const goToWeek = (weekIndex) => {
    setCurrentWeekIndex(weekIndex)
  }

  const currentPlan = weeklyPlans[currentWeekIndex]

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
          maxWidth: '1400px', 
          margin: '0 auto',
          padding: '20px'
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
                Plan de la Semaine
            </h1>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '18px', 
                margin: '0 0 30px 0',
                textAlign: 'center'
              }}>
                Semaine du: {currentPlan.weekStart}
              </p>
            </div>
          </FadeIn>

          {/* Récapitulatif des sélections */}
          <FadeIn delay={800}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px',
              borderRadius: '16px',
              marginBottom: '30px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                color: '#20B251', 
                fontSize: '24px', 
                margin: '0 0 20px 0',
                fontWeight: '600'
              }}>
                Récapitulatif des sélections de mon Plan de la Semaine du: {currentPlan.weekStart}
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <div>
                  <strong>Type de repas</strong><br />
                  {currentPlan.filters.mealType}
                </div>
                <div>
                  <strong>Portions</strong><br />
                  {currentPlan.filters.portions}
                </div>
                <div>
                  <strong>Difficulté</strong><br />
                  {currentPlan.filters.difficulty}
                </div>
                <div>
                  <strong>Préférences</strong><br />
                  {currentPlan.filters.preferences}
                </div>
                <div>
                  <strong>Mode cuisson</strong><br />
                  {currentPlan.filters.cookingMode}
              </div>
                <div>
                  <strong>Temps max</strong><br />
                  {currentPlan.filters.maxTime}
              </div>
                <div>
                  <strong>Type de cuisine</strong><br />
                  {currentPlan.filters.cuisine}
              </div>
              </div>
            </div>
          </FadeIn>

          {/* Tableau des repas */}
          <FadeIn delay={1000}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '800px'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8fafc',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#374151',
                      borderRight: '1px solid #e5e7eb'
                    }}>
                      Repas
                    </th>
                    {currentPlan.days.map(day => (
                      <th key={day.date} style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#374151',
                        borderRight: '1px solid #e5e7eb'
                      }}>
                        {day.dayName}<br />
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          {day.date}
                        </span>
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
                        fontWeight: '600',
                        color: '#374151',
                        borderRight: '1px solid #e5e7eb',
                        backgroundColor: '#f8fafc'
                      }}>
                        {meal.icon} {meal.name}
                      </td>
                      {currentPlan.days.map(day => {
                        const status = getMealStatus(meal.name, day.date)
                        const isAccepted = status === 'accepted'

              return (
                          <td key={day.date} style={{
                            padding: '16px',
                            textAlign: 'center',
                            borderRight: '1px solid #e5e7eb',
                            backgroundColor: isAccepted ? '#f0fdf4' : '#fef2f2',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => toggleMealStatus(meal.name, day.date)}
                          >
                            <div style={{
                              padding: '12px',
                              borderRadius: '8px',
                              backgroundColor: isAccepted ? '#dcfce7' : '#fee2e2',
                              border: isAccepted ? '2px solid #22c55e' : '2px solid #ef4444'
                            }}>
                              <div style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: isAccepted ? '#166534' : '#991b1b',
                                marginBottom: '4px'
                              }}>
                                Salade Quinoa et Légumes
                              </div>
                              <div style={{
                                fontSize: '12px',
                                color: isAccepted ? '#166534' : '#991b1b',
                                marginBottom: '4px'
                              }}>
                                15 min 2 pers. 4.2
                              </div>
                              <div style={{
                                fontSize: '12px',
                                fontWeight: 'normal',
                                color: isAccepted ? '#166534' : '#991b1b',
                                marginBottom: '2px'
                              }}>
                                Vegetarien Sain
                              </div>
                              <div style={{
                                fontSize: '11px',
                                color: isAccepted ? '#166534' : '#991b1b'
                              }}>
                                Quinoa Légumes Huile
                              </div>
                              <div style={{
                                marginTop: '8px',
                                fontSize: '18px',
                                color: isAccepted ? '#22c55e' : '#ef4444'
                              }}>
                                {isAccepted ? '✔' : '✗'}
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
          </FadeIn>

          {/* Actions */}
          <FadeIn delay={1200}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '30px'
            }}>
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
              
              <button
                onClick={() => window.location.href = '/mes-recettes'}
                style={{
                  background: 'white',
                  color: '#20B251',
                  border: '2px solid #20B251',
                  padding: '12px 24px',
                  borderRadius: '8px', 
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#20B251'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white'
                  e.target.style.color = '#20B251'
                }}
              >
                📋 Mes Recettes
              </button>
            </div>
          </FadeIn>
        </div>
      </SlideIn>
      </div>
  )
} 