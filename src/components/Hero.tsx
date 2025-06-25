'use client'

import { useState } from 'react'
import RecipeGenerator from './RecipeGenerator'
import Link from 'next/link'
import { ChefHat, Utensils } from 'lucide-react'

export default function Hero() {
  const [showGenerator, setShowGenerator] = useState(false)

  if (showGenerator) {
    return <RecipeGenerator />
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FDFBF5'}}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-center min-h-[40vh]">
          <div className="md:col-span-5 space-y-4">
            <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark leading-tight max-w-2xl">
              Générez des recettes savoureuses avec l'IA
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl font-poppins">
              Créez des recettes personnalisées et faites vos courses en toute simplicité grâce à l'intelligence artificielle.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link href="/creer-recette">
                <button 
                  className="group relative overflow-hidden bg-gradient-to-r from-herb-green via-sage to-herb-dark hover:from-herb-dark hover:via-herb-green hover:to-sage text-white px-6 py-2 rounded-full font-poppins font-semibold text-base w-full sm:w-56 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <ChefHat className="h-4 w-4" />
                    <span>Créer une recette</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-herb-green/40 to-sage/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
                </button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-lg">
              <img 
                src="/main-image-cart.svg"
                alt="Illustration culinaire"
                className="w-full h-auto max-h-[400px] object-contain transition-all duration-500 hover:scale-105 transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 