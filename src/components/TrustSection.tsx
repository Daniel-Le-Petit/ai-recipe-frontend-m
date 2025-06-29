'use client'

import React from 'react'
import { Users, Clock, Utensils, CheckCircle, ChefHat } from 'lucide-react'
import Link from 'next/link'

export default function TrustSection() {
  const stats = [
    { icon: Users, value: "50K+", label: "Recettes créées" },
    { icon: Clock, value: "< 30s", label: "Génération moyenne" },
    { icon: Utensils, value: "98%", label: "Satisfaction" },
    { icon: CheckCircle, value: "24/7", label: "Disponible" }
  ]

  return (
    <section className="bg-gradient-to-r from-herb-green to-sage py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pourquoi nous faire
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"> confiance ?</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Des milliers d&apos;utilisateurs nous font déjà confiance pour leurs repas quotidiens
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/creer-recette">
            <button className="group relative overflow-hidden bg-white text-herb-green px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform hover:bg-gray-50">
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-herb-green/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              {/* Contenu du bouton */}
              <div className="relative flex items-center space-x-2">
                <ChefHat className="h-5 w-5" />
                <span>Essayer maintenant</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
} 