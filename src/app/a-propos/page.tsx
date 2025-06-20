'use client'

import { Heart, Target, Users, Sparkles, ChefHat, Globe, Leaf, Award } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const team = [
  {
    name: "Daniel Le Petit",
    role: "Président et fondateur",
    image: "/Equipe/Daniel Le Petit.jpg",
    description: "Visionnaire et épicurien, Daniel a transmis sa passion pour la bonne chère et a inspiré la création d'AI et Fines Herbes."
  },
  {
    name: "Matthieu Le Petit",
    role: "CEO et co-fondateur", 
    image: "/Equipe/Matthieu Le Petit.jpg",
    description: "Chef d'orchestre du projet, Matthieu transforme la vision familiale en une plateforme culinaire innovante et accessible à tous."
  },
  {
    name: "Adrien Le Petit",
    role: "CTO et co-fondateur",
    image: "/Equipe/Adrien Le Petit.jpg",
    description: "Le cerveau technique, Adrien conçoit les algorithmes d'IA qui font la magie de nos recettes personnalisées."
  },
  {
    name: "Alice Le Petit",
    role: "CMO et co-fondatrice",
    image: "/Equipe/Alice Le Petit.jpg",
    description: "Créative et connectée, Alice bâtit la communauté et partage l'histoire de notre aventure familiale avec le monde."
  }
]

const values = [
  {
    icon: Heart,
    title: "Passion familiale",
    description: "Né de l'amour de la cuisine transmis par notre père, chaque plat raconte une histoire de partage et de convivialité."
  },
  {
    icon: Sparkles,
    title: "Innovation constante", 
    description: "Nous marions la tradition culinaire avec l'intelligence artificielle pour réinventer le plaisir de cuisiner au quotidien."
  },
  {
    icon: Leaf,
    title: "Cuisine responsable",
    description: "Nous encourageons une cuisine créative qui limite le gaspillage et valorise les produits de saison."
  },
  {
    icon: Users,
    title: "Le goût du partage",
    description: "Nous bâtissons une communauté où chaque membre peut partager ses créations, ses astuces et sa passion."
  }
]

const stats = [
  { number: "50,000+", label: "Recettes générées", icon: ChefHat },
  { number: "15,000+", label: "Utilisateurs actifs", icon: Users },
  { number: "28", label: "Pays", icon: Globe },
  { number: "4.9/5", label: "Note moyenne", icon: Award }
]

const timeline = [
  {
    year: "2005",
    title: "La Passion du Goût",
    description: "Daniel, le père, transmet son amour des produits du terroir et des repas de famille à ses enfants, Matthieu, Adrien et Alice."
  },
  {
    year: "2023", 
    title: "L'Idée Germe",
    description: "Frustrés par le gaspillage alimentaire, la fratrie imagine une solution alliant la tech d'Adrien, le sens du produit de Matthieu et la créativité d'Alice."
  },
  {
    year: "2024",
    title: "Lancement Familial",
    description: "AI et Fines Herbes est lancé ! La plateforme combine la sagesse culinaire de Daniel avec une IA de pointe pour inspirer les cuisines du monde entier."
  },
  {
    year: "Aujourd'hui",
    title: "Une Aventure Partagée",
    description: "Rejoignez notre communauté grandissante et faites partie d'une nouvelle page de l'histoire de la cuisine : la vôtre !"
  }
]

export default function APropos() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FDFBF5'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100/60 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200/50 mb-8">
                <Heart className="h-4 w-4" />
                Notre histoire de famille
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                La cuisine est une histoire qui se
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> partage</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Née d'une passion familiale, AI et Fines Herbes a pour mission de rendre la cuisine créative, intuitive et durable accessible à tous, grâce à la magie de l'intelligence artificielle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/creer-recette" passHref>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center space-x-2">
                    <ChefHat className="h-5 w-5" />
                    <span>Créer une recette</span>
                  </button>
                </Link>
                <Link href="#mission" passHref>
                  <button className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition-colors duration-300">
                    Notre mission
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Famille cuisinant ensemble"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Notre mission
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transformer la façon dont le monde cuisine en démocratisant l'accès à des recettes personnalisées, 
              nutritives et durables grâce à l'intelligence artificielle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Rencontrez la famille
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une fratrie passionnée qui allie technologie de pointe et amour de la bonne chère 
              pour créer l'expérience de cuisine de demain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-4">{member.role}</p>
                <p className="text-slate-600 leading-relaxed text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Notre histoire
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De la table de la cuisine familiale au lancement d'une plateforme innovante.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-200" aria-hidden="true"></div>

            {timeline.map((item, index) => (
              <div key={index} className="relative mb-12">
                <div className="flex items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                  
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                    <p className="font-bold text-green-600 mb-1">{item.year}</p>
                    <h3 className="font-semibold text-xl text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 