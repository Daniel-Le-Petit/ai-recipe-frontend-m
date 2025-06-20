'use client'

import { useState } from 'react'
import { Sparkles, Users, ChefHat, Timer, Leaf, ArrowRight, CheckCircle, Play, Gauge, Thermometer, RotateCcw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const steps = [
  {
    number: 1,
    title: "Sélectionnez vos ingrédients",
    description: "Choisissez parmi une base de données de plus de 50 ingrédients populaires ou ajoutez les vôtres. Notre système de drag & drop rend la sélection intuitive et amusante.",
    icon: Leaf,
    features: [
      "Auto-complétion intelligente",
      "Drag & drop interactif", 
      "Base de données extensive",
      "Suggestions personnalisées"
    ],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    color: "green"
  },
  {
    number: 2,
    title: "Définissez vos préférences",
    description: "Indiquez le type de repas, le nombre de portions et vos restrictions alimentaires. Notre IA s'adapte à tous les régimes : végétarien, végan, sans gluten, cétogène...",
    icon: Users,
    features: [
      "6 types de repas",
      "1 à 12+ portions",
      "Régimes spécialisés",
      "Préférences personnalisées"
    ],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    color: "blue"
  },
  {
    number: 3,
    title: "L'IA génère votre recette",
    description: "Notre intelligence artificielle de nouvelle génération analyse vos critères et crée une recette unique, équilibrée et adaptée à vos goûts en quelques secondes.",
    icon: Sparkles,
    features: [
      "IA avancée GPT",
      "Recettes équilibrées",
      "Temps de génération < 3s",
      "Instructions détaillées"
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    color: "purple"
  },
  {
    number: 4,
    title: "Cuisinez en mode guidé",
    description: "Suivez les instructions étape par étape avec notre mode cuisson interactif. Minuteurs automatiques, conseils d'appareils et navigation intuitive pour un résultat parfait.",
    icon: ChefHat,
    features: [
      "Instructions adaptées",
      "Minuteurs intégrés",
      "6 modes d'appareils",
      "Navigation étape par étape"
    ],
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    color: "orange"
  }
]

const appliances = [
  {
    name: "Thermomix",
    icon: "🥄",
    description: "Instructions adaptées avec vitesse, température et sens inverse",
    controls: ["Vitesse 1-10", "Température 37-120°C", "Sens inverse"]
  },
  {
    name: "Cook Expert",
    icon: "🥣", 
    description: "Programmes spécialisés avec mélangeur intelligent",
    controls: ["Programmes P1-P6", "Température 60-130°C", "Mélangeur"]
  },
  {
    name: "Cookeo",
    icon: "🍲",
    description: "Modes de cuisson optimisés pour multicuiseur",
    controls: ["Mode Dorage", "Cuisson vapeur", "Mijoter"]
  },
  {
    name: "Companion",
    icon: "🥘",
    description: "Robot culinaire avec contrôles précis",
    controls: ["12 vitesses", "Programmes auto", "Température variable"]
  },
  {
    name: "Monsieur Cuisine",
    icon: "🍴",
    description: "Robot accessible avec fonctions complètes",
    controls: ["Vitesse 1-10", "Turbomix", "Cuisson 37-120°C"]
  },
  {
    name: "Manuel",
    icon: "🌿",
    description: "Instructions traditionnelles pour tous ustensiles",
    controls: ["Casseroles", "Poêles", "Ustensiles classiques"]
  }
]

const benefits = [
  {
    title: "Gain de temps",
    description: "Plus besoin de chercher des recettes pendant des heures",
    icon: Timer,
    stat: "5 min",
    detail: "De l'idée au plat"
  },
  {
    title: "Zéro gaspillage",
    description: "Utilisez exactement ce que vous avez dans votre frigo", 
    icon: Leaf,
    stat: "100%",
    detail: "D'ingrédients utilisés"
  },
  {
    title: "Personnalisation",
    description: "Chaque recette est unique et adaptée à vos goûts",
    icon: Sparkles,
    stat: "∞",
    detail: "Combinaisons possibles"
  },
  {
    title: "Accompagnement",
    description: "Mode guidé pour ne jamais rater vos plats",
    icon: ChefHat,
    stat: "100%",
    detail: "De réussite"
  }
]

export default function CommentCaMarche() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FDFBF5'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100/60 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200/50 mb-8">
            <Sparkles className="h-4 w-4" />
            Comment ça marche
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            De l'idée au plat en
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> 4 étapes</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment notre intelligence artificielle transforme vos ingrédients en recettes personnalisées 
            avec un accompagnement pas-à-pas jusqu'à la dégustation.
          </p>
        </div>
      </section>

      {/* Étapes principales */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className={`mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:items-center lg:gap-16`}>
              
              {/* Contenu */}
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <div className="flex items-center mb-6">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mr-4 ${
                    step.color === 'green' ? 'bg-green-100' :
                    step.color === 'blue' ? 'bg-blue-100' :
                    step.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    <step.icon className={`h-6 w-6 ${
                      step.color === 'green' ? 'text-green-600' :
                      step.color === 'blue' ? 'text-blue-600' :
                      step.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    step.color === 'green' ? 'bg-green-100 text-green-700' :
                    step.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    step.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    Étape {step.number}
                  </div>
                </div>
                
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {step.title}
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className={`h-5 w-5 ${
                        step.color === 'green' ? 'text-green-500' :
                        step.color === 'blue' ? 'text-blue-500' :
                        step.color === 'purple' ? 'text-purple-500' : 'text-orange-500'
                      }`} />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <img 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    step.color === 'green' ? 'from-green-500/20 to-emerald-500/20' :
                    step.color === 'blue' ? 'from-blue-500/20 to-cyan-500/20' :
                    step.color === 'purple' ? 'from-purple-500/20 to-pink-500/20' : 'from-orange-500/20 to-red-500/20'
                  } rounded-2xl`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Appareils */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Compatible avec tous vos appareils
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Notre IA adapte automatiquement les instructions selon votre équipement de cuisine. 
              Contrôles visuels et réglages spécifiques pour chaque appareil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appliances.map((appliance, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{appliance.icon}</div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">{appliance.name}</h3>
                <p className="text-slate-600 mb-4 text-sm">{appliance.description}</p>
                <div className="space-y-2">
                  {appliance.controls.map((control, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-700">{control}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Pourquoi choisir AI et Fines Herbes ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une révolution culinaire qui transforme votre façon de cuisiner au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{benefit.stat}</div>
                <div className="text-sm text-green-600 font-medium mb-4">{benefit.detail}</div>
                <h3 className="font-semibold text-lg text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre cuisine ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de gourmets qui ont déjà simplifié leur quotidien grâce à notre IA.
          </p>
          <Link href="/creer-recette" passHref>
            <button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex items-center justify-center space-x-2">
              <ChefHat className="h-5 w-5" />
              <span>Créer ma première recette</span>
            </button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
} 