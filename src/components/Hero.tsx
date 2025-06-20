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
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FDFBF5'}}>
      <div className="max-w-7xl mx-auto">
        {/* Grille asymétrique : Texte à gauche (50%) + Image à droite (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center min-h-[70vh]">
          
          {/* Colonne de GAUCHE - Texte (50% = 5 colonnes sur 10) */}
          <div className="md:col-span-5 space-y-8">
            {/* Titre H1 - exactement comme dans la maquette */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight max-w-2xl">
              Générez des recettes savoureuses avec l'IA
            </h1>
            
            {/* Description - exactement comme dans la maquette */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl font-poppins">
              Créez des recettes personnalisées et faites vos courses en toute simplicité grâce à l'intelligence artificielle.
            </p>

            {/* Boutons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link href="/creer-recette">
                <button 
                  className="group relative overflow-hidden bg-gradient-to-r from-herb-green via-sage to-herb-dark hover:from-herb-dark hover:via-herb-green hover:to-sage text-white px-10 py-4 rounded-full font-poppins font-semibold text-lg w-full sm:w-80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  {/* Contenu du bouton */}
                  <div className="relative flex items-center justify-center space-x-2">
                    <ChefHat className="h-5 w-5" />
                    <span>Créer une recette</span>
                  </div>
                  
                  {/* Bordure animée */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-herb-green/40 to-sage/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
                </button>
              </Link>
              
              <Link href="/recettes">
                <button 
                  className="group relative overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-100 hover:from-slate-100 hover:via-white hover:to-slate-50 text-slate-700 hover:text-slate-900 px-10 py-4 rounded-full font-poppins font-semibold border-2 border-slate-300 hover:border-herb-green/50 text-base w-full sm:w-96 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-herb-green/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  {/* Contenu du bouton */}
                  <div className="relative flex items-center justify-center space-x-2">
                    <Utensils className="h-5 w-5" />
                    <span>Voir nos recettes préparées</span>
                  </div>
                  
                  {/* Bordure animée */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-herb-green/20 to-sage/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></div>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Colonne de DROITE - Image (50% = 5 colonnes sur 10) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-lg">
              <img 
                src="/main-image-cart.svg"
                alt="Illustration culinaire"
                className="w-full h-auto max-h-[500px] object-contain transition-all duration-500 hover:scale-105 transform"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
} 