'use client'

import { Shield, Eye, Database, Users, Lock, FileText } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  {
    icon: Database,
    title: "Collecte des données",
    content: [
      "Nous collectons uniquement les informations nécessaires au fonctionnement de notre service.",
      "Vos ingrédients et préférences culinaires pour générer des recettes personnalisées.",
      "Votre adresse email si vous souscrivez à notre newsletter (optionnel).",
      "Données d'utilisation anonymisées pour améliorer nos algorithmes."
    ]
  },
  {
    icon: Lock,
    title: "Protection des données",
    content: [
      "Toutes vos données sont chiffrées et stockées de manière sécurisée.",
      "Nous utilisons des protocoles de sécurité de niveau bancaire (SSL/TLS).",
      "Accès restreint aux données par notre équipe technique uniquement.",
      "Sauvegardes régulières dans des centres de données certifiés ISO 27001."
    ]
  },
  {
    icon: Users,
    title: "Utilisation des données",
    content: [
      "Personnalisation de vos recettes en fonction de vos goûts et contraintes.",
      "Amélioration continue de nos algorithmes d'intelligence artificielle.",
      "Communication occasionnelle sur nos nouveautés (avec votre consentement).",
      "Analyses statistiques anonymes pour optimiser l'expérience utilisateur."
    ]
  },
  {
    icon: Eye,
    title: "Transparence",
    content: [
      "Vous pouvez consulter toutes vos données stockées à tout moment.",
      "Possibilité de modifier ou supprimer vos informations en un clic.",
      "Notification immédiate en cas de mise à jour de cette politique.",
      "Rapport annuel de transparence publié sur notre blog."
    ]
  }
]

const rights = [
  "Droit d'accès à vos données personnelles",
  "Droit de rectification et de mise à jour",
  "Droit à l'effacement (droit à l'oubli)",
  "Droit à la portabilité de vos données",
  "Droit d'opposition au traitement",
  "Droit de limitation du traitement"
]

export default function Confidentialite() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FDFBF5'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100/60 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200/50 mb-8">
            <Shield className="h-4 w-4" />
            Politique de confidentialité
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Votre vie privée est
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> sacrée</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nous nous engageons à protéger vos données personnelles avec le plus grand soin. 
            Découvrez comment nous respectons votre confidentialité.
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
                <p className="text-blue-700 text-sm">Cette politique entre en vigueur immédiatement</p>
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
              Chez <strong>AI et Fines Herbes</strong>, nous considérons que la protection de vos données personnelles 
              est fondamentale. Cette politique de confidentialité explique comment nous collectons, utilisons, 
              stockons et protégeons vos informations lorsque vous utilisez notre plateforme de génération de recettes par IA.
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

      {/* Vos droits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Vos droits RGPD
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Conformément au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez de droits fondamentaux sur vos données personnelles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg text-center">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-medium text-slate-900">{right}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6">
              Pour exercer vos droits, contactez-nous simplement par email
            </p>
            <a
              href="mailto:privacy@aietfinesherbes.com"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 transform"
            >
              <Shield className="h-5 w-5" />
              <span>Contacter notre DPO</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cookies et technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-8 text-center">
            Cookies et technologies similaires
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <h3 className="font-semibold text-xl text-slate-900 mb-4">Cookies essentiels</h3>
              <p className="text-slate-600 mb-4">
                Nécessaires au fonctionnement de base du site (authentification, préférences de session).
              </p>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Obligatoires
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <h3 className="font-semibold text-xl text-slate-900 mb-4">Cookies d'analyse</h3>
              <p className="text-slate-600 mb-4">
                Nous aident à comprendre comment vous utilisez notre site pour l'améliorer (Google Analytics).
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Avec votre consentement
              </span>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <h3 className="font-semibold text-xl text-slate-900 mb-4">Données de recettes</h3>
              <p className="text-slate-600 mb-4">
                Stockage local de vos recettes générées pour une meilleure expérience utilisateur.
              </p>
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Configurable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact DPO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Des questions sur vos données ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Notre Délégué à la Protection des Données (DPO) est disponible pour répondre 
            à toutes vos questions concernant la confidentialité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:privacy@aietfinesherbes.com"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 transform block"
            >
              privacy@aietfinesherbes.com
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