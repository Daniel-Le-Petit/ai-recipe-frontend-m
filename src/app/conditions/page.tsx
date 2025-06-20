'use client'

import { FileText, Scale, AlertTriangle, Users, Zap, Shield } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  {
    icon: Users,
    title: "Utilisation du service",
    content: [
      "AI et Fines Herbes est un service gratuit de génération de recettes par intelligence artificielle.",
      "Vous devez être âgé d'au moins 13 ans pour utiliser notre plateforme.",
      "Chaque utilisateur est responsable de l'exactitude des informations qu'il fournit.",
      "L'utilisation commerciale nécessite notre autorisation préalable écrite."
    ]
  },
  {
    icon: Scale,
    title: "Propriété intellectuelle",
    content: [
      "Les recettes générées par notre IA vous appartiennent et peuvent être utilisées librement.",
      "Le code source, les algorithmes et la marque AI et Fines Herbes restent notre propriété.",
      "Vous nous accordez le droit d'utiliser vos retours pour améliorer nos services.",
      "Toute tentative de reproduction de notre technologie est strictement interdite."
    ]
  },
  {
    icon: AlertTriangle,
    title: "Responsabilités et limites",
    content: [
      "Les recettes sont générées automatiquement et doivent être vérifiées avant utilisation.",
      "Nous ne garantissons pas la qualité gustative ou nutritionnelle des recettes.",
      "Vérifiez toujours la compatibilité des ingrédients avec vos allergies et intolérances.",
      "Notre responsabilité est limitée aux cas de faute grave ou intentionnelle."
    ]
  },
  {
    icon: Zap,
    title: "Disponibilité du service",
    content: [
      "Nous nous efforçons d'assurer une disponibilité maximale de nos services.",
      "Des interruptions peuvent survenir pour maintenance ou améliorations.",
      "Nous nous réservons le droit de modifier ou suspendre le service temporairement.",
      "Les utilisateurs seront informés des maintenances programmées dans la mesure du possible."
    ]
  }
]

const prohibitions = [
  "Utiliser le service à des fins illégales ou non autorisées",
  "Tenter de contourner nos mesures de sécurité",
  "Partager des contenus offensants ou inappropriés",
  "Utiliser des bots ou systèmes automatisés non autorisés",
  "Copier ou reproduire notre technologie d'IA",
  "Surcharger nos serveurs par un usage excessif"
]

export default function Conditions() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FDFBF5'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100/60 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200/50 mb-8">
            <Scale className="h-4 w-4" />
            Conditions d'utilisation
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Utilisation
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> responsable</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ces conditions d'utilisation définissent le cadre légal de votre utilisation 
            d'AI et Fines Herbes. Elles garantissent une expérience sûre et équitable pour tous.
          </p>
        </div>
      </section>

      {/* Dernière mise à jour */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-blue-900 font-medium">Dernière mise à jour : 15 janvier 2024</p>
                <p className="text-blue-700 text-sm">En utilisant notre service, vous acceptez ces conditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed">
              Bienvenue sur <strong>AI et Fines Herbes</strong> ! En accédant à notre plateforme et en l'utilisant, 
              vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, 
              veuillez ne pas utiliser notre service. Ces conditions peuvent être mises à jour périodiquement, 
              et nous vous encourageons à les consulter régulièrement.
            </p>
          </div>
        </div>
      </section>

      {/* Sections principales */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="font-poppins text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Utilisations interdites */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Utilisations interdites
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pour maintenir un environnement sûr et légal, certaines utilisations 
              de notre plateforme sont strictement interdites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prohibitions.map((prohibition, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-red-200/50 shadow-lg">
                <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <p className="font-medium text-slate-900 text-center">{prohibition}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <p className="text-red-800 font-medium">
                La violation de ces conditions peut entraîner la suspension immédiate de votre accès au service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modifications et résiliation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-8 text-center">
            Modifications et résiliation
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <h3 className="font-semibold text-xl text-slate-900 mb-4">Modification des conditions</h3>
              <p className="text-slate-600 mb-4">
                Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
                Les utilisateurs seront informés des changements significatifs par email ou notification sur la plateforme.
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Notification obligatoire
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <h3 className="font-semibold text-xl text-slate-900 mb-4">Résiliation par l'utilisateur</h3>
              <p className="text-slate-600 mb-4">
                Vous pouvez cesser d'utiliser notre service à tout moment. Vos données personnelles seront 
                supprimées conformément à notre politique de confidentialité, sauf obligation légale contraire.
              </p>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Libre et gratuit
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <h3 className="font-semibold text-xl text-slate-900 mb-4">Résiliation par AI et Fines Herbes</h3>
              <p className="text-slate-600 mb-4">
                Nous pouvons suspendre ou résilier votre accès en cas de violation de ces conditions, 
                d'utilisation abusive ou pour des raisons légales. Un préavis sera donné sauf urgence.
              </p>
              <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Avec préavis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Droit applicable */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-8">
            Droit applicable et juridictions
          </h2>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <Scale className="h-12 w-12 text-green-600 mx-auto mb-6" />
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <p className="text-slate-600">
                <strong>Droit applicable :</strong> Ces conditions d'utilisation sont régies par le droit français.
              </p>
              <p className="text-slate-600">
                <strong>Juridiction :</strong> En cas de litige, les tribunaux de Lyon seront seuls compétents.
              </p>
              <p className="text-slate-600">
                <strong>Médiation :</strong> Avant tout recours judiciaire, nous encourageons la résolution amiable des différends.
              </p>
              <p className="text-slate-600">
                <strong>RGPD :</strong> Nos pratiques respectent le Règlement Général sur la Protection des Données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact pour questions légales */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Questions sur les conditions ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Notre équipe juridique est disponible pour clarifier ces conditions 
            et répondre à vos questions concernant l'utilisation de notre service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:legal@aietfinesherbes.com"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 transform block"
            >
              legal@aietfinesherbes.com
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 transform block"
            >
              Formulaire de contact
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 