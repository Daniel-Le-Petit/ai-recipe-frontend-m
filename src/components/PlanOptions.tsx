'use client'

import { useState } from 'react'

interface PlanOption {
  id: string
  icon: string
  title: string
  price: string
  originalPrice?: string
  discount?: string
  features: string[]
  dailyPrice: string
  badge?: string
  popular?: boolean
  repas?: string
}

const planOptions: PlanOption[] = [
  {
    id: 'free',
    icon: '📅',
    title: 'Essai gratuit — 7 jours',
    price: '🎁 Gratuit',
    features: [
      '3 recettes personnalisées générées par notre IA',
      'Sans engagement'
    ],
    dailyPrice: '',
    popular: false,
    repas: '3 recettes'
  },
  {
    id: 'monthly',
    icon: '⭐',
    title: 'Plan mensuel — 1 mois',
    price: '🔄 23,99€',
    originalPrice: '29,99€',
    discount: 'Économisez 20%',
    features: [
      '4 à 5 recettes/semaine (20 total)',
      '0,80€/jour'
    ],
    dailyPrice: '0,80€/jour',
    badge: '✅ Recommandé',
    popular: false,
    repas: '20 recettes'
  },
  {
    id: 'quarterly',
    icon: '🌱',
    title: 'Plan trimestriel — 3 mois',
    price: '🔄 59,99€',
    originalPrice: '89,97€',
    discount: 'Économisez 33%',
    features: [
      '5 recettes/semaine (60 total)',
      '0,67€/jour'
    ],
    dailyPrice: '0,67€/jour',
    badge: '🌿 Le plus populaire',
    popular: true,
    repas: '60 recettes'
  }
]

interface PlanOptionsProps {
  selectedPlan?: string
  onPlanSelect?: (planId: string) => void
}

export default function PlanOptions({ selectedPlan, onPlanSelect }: PlanOptionsProps) {
  const [selected, setSelected] = useState<string>(selectedPlan || '')

  const handlePlanSelect = (planId: string) => {
    setSelected(planId)
    onPlanSelect?.(planId)
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          🌱 🎯 73% de nos utilisateurs choisissent le plan
        </p>
      </div>

      {/* Plan Options Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {planOptions.map((plan) => (
          <div
            key={plan.id}
            style={{
              position: 'relative',
              backgroundColor: selected === plan.id ? '#f0fdf4' : 'white',
              borderRadius: '12px',
              border: `2px solid ${selected === plan.id ? '#20B251' : '#e5e7eb'}`,
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: selected === plan.id ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
              height: '360px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {/* Checkbox */}
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${selected === plan.id ? '#20B251' : '#d1d5db'}`,
                  backgroundColor: selected === plan.id ? '#20B251' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {selected === plan.id && (
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                )}
              </div>
            </div>

            {/* Popular Badge */}
            {plan.popular && (
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)' 
              }}>
                <span style={{
                  backgroundColor: '#20B251',
                  color: 'white',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  🌿 Le plus populaire
                </span>
              </div>
            )}

            {/* Top Section */}
            <div>
              {/* Icon */}
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '48px' }}>{plan.icon}</span>
              </div>

              {/* Title */}
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                textAlign: 'center', 
                margin: '0 0 12px 0' 
              }}>
                {plan.title}
              </h3>

              {/* Price - NOW IN GREEN */}
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#20B251' }}>
                  {plan.price}
                </div>
                {plan.originalPrice && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px', 
                    marginTop: '4px' 
                  }}>
                    <span style={{ color: '#6b7280', textDecoration: 'line-through', fontSize: '14px' }}>
                      {plan.originalPrice}
                    </span>
                    <span style={{ color: '#059669', fontSize: '14px', fontWeight: 'bold' }}>
                      — {plan.discount}
                    </span>
                  </div>
                )}
              </div>

              {/* Repas Column - NEW GREEN SECTION */}
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '16px',
                backgroundColor: '#f0fdf4',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#166534',
                  marginBottom: '4px'
                }}>
                  🍽️ Repas
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#20B251'
                }}>
                  {plan.repas}
                </div>
              </div>

              {/* Features */}
              <div style={{ marginBottom: '16px' }}>
                {plan.features.map((feature, index) => (
                  <div key={index} style={{ 
                    color: '#6b7280', 
                    fontSize: '14px', 
                    textAlign: 'center',
                    marginBottom: '8px'
                  }}>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div>
              {/* Badge */}
              {plan.badge && (
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {plan.badge}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selection Info */}
      {selected && (
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <div style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <p style={{ color: '#166534', fontWeight: 'bold', margin: '0' }}>
              ✅ Plan sélectionné : {planOptions.find(p => p.id === selected)?.title}
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 