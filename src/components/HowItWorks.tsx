'use client'

import React from 'react'
import { MessageSquare, Sparkles, ChefHat, Users, Clock, Utensils, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Décrivez vos envies",
      description: "Partagez vos ingrédients disponibles et vos préférences alimentaires",
      duration: "30 secondes",
      features: ["Liste d'ingrédients", "Préférences alimentaires", "Nombre de personnes", "Temps disponible"]
    },
    {
      icon: Sparkles,
      title: "L'IA crée votre recette",
      description: "Notre intelligence artificielle génère une recette parfaitement adaptée",
      duration: "10 secondes",
      features: ["Recette équilibrée", "Instructions claires", "Temps de préparation", "Conseils pratiques"]
    },
    {
      icon: ChefHat,
      title: "Cuisinez en toute simplicité",
      description: "Suivez les étapes détaillées pour un résultat parfait",
      duration: "Selon la recette",
      features: ["Étapes numérotées", "Temps indicatifs", "Conseils de cuisson", "Variations suggérées"]
    }
  ]

  const stats = [
    { icon: Users, value: "50K+", label: "Recettes créées" },
    { icon: Clock, value: "< 30s", label: "Génération moyenne" },
    { icon: Utensils, value: "98%", label: "Satisfaction" },
    { icon: CheckCircle, value: "24/7", label: "Disponible" }
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-herb-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sage rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-herb-green/10 text-herb-dark px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Comment ça fonctionne</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            En 3 étapes
            <span className="bg-gradient-to-r from-herb-green to-sage bg-clip-text text-transparent"> simples</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Créez des recettes personnalisées en quelques clics grâce à notre intelligence artificielle
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-herb-green to-sage text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>
              
              {/* Card */}
              <div className="rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 relative z-0" style={{backgroundColor: '#FDFBF5'}}>
                <div className="h-16 w-16 bg-gradient-to-r from-herb-green/10 to-sage/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-herb-green" />
                </div>
                
                <h3 className="font-poppins text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                
                <div className="flex items-center space-x-2 text-sm text-herb-green font-semibold mb-6">
                  <Clock className="h-4 w-4" />
                  <span>{step.duration}</span>
                </div>
                
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-herb-green flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 