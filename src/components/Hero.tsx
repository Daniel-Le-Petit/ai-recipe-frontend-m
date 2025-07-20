'use client'

import { useState } from 'react'
import RecipeGenerator from './RecipeGenerator'
import Link from 'next/link'
import { ChefHat, Utensils, TestTube } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const [showGenerator, setShowGenerator] = useState(false)

  if (showGenerator) {
    return <RecipeGenerator />
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FDFBF5'}}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-center min-h-[40vh]">
          <div className="md:col-span-5 space-y-4 text-center md:text-center">
            <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark leading-tight max-w-2xl mx-auto">
              Générez des recettes savoureuses avec l'IA
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl font-poppins mx-auto">
              Créez des recettes personnalisées et faites vos courses en toute simplicité grâce à l'intelligence artificielle.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center items-center">
              <Link href="/creer-recette">
                <button 
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-poppins font-semibold text-base w-full sm:w-56 transition-all duration-200"
                >
                  <span className="mr-2 flex items-center" style={{ lineHeight: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10 3v5.5a4 4 0 0 1-.8 2.4l-4.1 5.7A4 4 0 0 0 8.4 21h7.2a4 4 0 0 0 3.3-4.4l-4.1-5.7A4 4 0 0 1 14 8.5V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 15h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span>Créer une recette</span>
                </button>
              </Link>
              <Link href="/plan-semaine">
                <button
                  className="group relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-poppins font-semibold text-base w-full sm:w-56 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  <div className="relative flex items-center justify-center space-x-2">
                    <Utensils className="h-4 w-4" />
                    <span>Découvrir le plan de la semaine</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs">
              <Link href="/mes-recettes?step=4">
                <img 
                  src="/main-image-cart.svg"
                  alt="Illustration culinaire"
                  className="w-full h-auto max-h-[220px] object-contain transition-all duration-500 hover:scale-105 transform cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 