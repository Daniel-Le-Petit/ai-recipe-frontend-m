'use client'

import { useState } from 'react'
import { Search, HelpCircle, ChevronDown, ChevronRight, Book, MessageCircle, Video, FileText } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const categories = [
  {
    title: "Premiers pas",
    icon: Book,
    questions: [
      {
        q: "Comment créer ma première recette ?",
        a: "Cliquez sur 'Créer une recette' dans le menu principal. Suivez les 5 étapes : sélectionnez vos ingrédients, choisissez le type de repas, définissez le nombre de portions, ajoutez vos préférences alimentaires (optionnel), puis lancez la génération. Votre recette sera prête en quelques secondes !"
      },
      {
        q: "Dois-je créer un compte pour utiliser le service ?",
        a: "Non, AI et Fines Herbes est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez commencer à générer des recettes immédiatement. Cependant, créer un compte vous permettra de sauvegarder vos recettes favorites."
      },
      {
        q: "Comment fonctionne l'intelligence artificielle ?",
        a: "Notre IA analyse vos ingrédients, préférences et contraintes pour créer une recette unique. Elle s'appuie sur une base de données culinaire étendue et des algorithmes d'apprentissage automatique pour proposer des combinaisons équilibrées et savoureuses."
      }
    ]
  },
  {
    title: "Génération de recettes",
    icon: MessageCircle,
    questions: [
      {
        q: "Puis-je modifier une recette générée ?",
        a: "Actuellement, vous ne pouvez pas modifier directement une recette. Cependant, vous pouvez regénérer une nouvelle recette en ajustant vos ingrédients ou préférences. Nous travaillons sur une fonctionnalité d'édition pour les prochaines versions."
      },
      {
        q: "Combien d'ingrédients puis-je utiliser ?",
        a: "Il n'y a pas de limite au nombre d'ingrédients ! Vous pouvez en utiliser aussi peu que 2-3 ou jusqu'à 15-20 selon votre créativité. Plus vous en ajoutez, plus la recette sera riche et complexe."
      },
      {
        q: "Les recettes sont-elles toujours réalisables ?",
        a: "Notre IA est entraînée pour créer des recettes cohérentes et réalisables. Cependant, nous recommandons toujours de vérifier les instructions et temps de cuisson avant de commencer, surtout pour des combinaisons d'ingrédients inhabituelles."
      },
      {
        q: "Puis-je sauvegarder mes recettes ?",
        a: "Oui ! Créez un compte gratuit pour sauvegarder toutes vos recettes générées. Vous pourrez les organiser, les partager et y accéder depuis n'importe quel appareil."
      }
    ]
  },
  {
    title: "Mode cuisson guidée",
    icon: Video,
    questions: [
      {
        q: "Comment utiliser le mode cuisson guidée ?",
        a: "Après avoir généré votre recette, cliquez sur 'Commencer la cuisson'. Choisissez votre appareil (Thermomix, Cookeo, etc. ou manuel), puis suivez les instructions étape par étape avec les minuteurs intégrés."
      },
      {
        q: "Quels appareils sont supportés ?",
        a: "Nous supportons 6 types d'appareils : Thermomix, Cook Expert, Cookeo, Companion, Monsieur Cuisine, et cuisson manuelle. Chaque mode adapte automatiquement les instructions et réglages spécifiques."
      },
      {
        q: "Puis-je changer d'appareil en cours de cuisson ?",
        a: "Oui ! Cliquez sur l'icône de réglages pendant la cuisson guidée pour changer d'appareil. Les instructions s'adapteront automatiquement à partir de l'étape suivante."
      },
      {
        q: "Les minuteurs fonctionnent-ils en arrière-plan ?",
        a: "Oui, nos minuteurs continuent de fonctionner même si vous changez d'onglet ou minimisez la fenêtre. Vous recevrez une notification sonore et visuelle quand le temps est écoulé."
      }
    ]
  },
  {
    title: "Problèmes techniques",
    icon: FileText,
    questions: [
      {
        q: "La génération de recette ne fonctionne pas",
        a: "Vérifiez votre connexion internet et assurez-vous d'avoir sélectionné au moins 2 ingrédients et un type de repas. Si le problème persiste, rechargez la page ou contactez notre support."
      },
      {
        q: "Les minuteurs ne se lancent pas",
        a: "Assurez-vous d'avoir autorisé les notifications dans votre navigateur. Les minuteurs nécessitent cette autorisation pour fonctionner correctement. Vous pouvez l'activer dans les paramètres de votre navigateur."
      },
      {
        q: "Le site est lent à charger",
        a: "Notre IA peut prendre quelques secondes pour générer des recettes complexes. Si le site reste lent, videz le cache de votre navigateur ou essayez avec un autre navigateur."
      },
      {
        q: "Je ne vois pas toutes les fonctionnalités",
        a: "Assurez-vous d'utiliser un navigateur récent (Chrome, Firefox, Safari, Edge). Certaines fonctionnalités avancées nécessitent JavaScript activé."
      }
    ]
  }
]

const quickActions = [
  {
    title: "Créer une recette",
    description: "Générez votre première recette en 2 minutes",
    icon: MessageCircle,
    action: "Commencer",
    href: "/"
  },
  {
    title: "Guide vidéo",
    description: "Regardez notre tutoriel de 3 minutes",
    icon: Video,
    action: "Regarder",
    href: "#"
  },
  {
    title: "Nous contacter",
    description: "Posez votre question à notre équipe",
    icon: HelpCircle,
    action: "Contacter",
    href: "/contact"
  }
]

export default function Aide() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openCategory, setOpenCategory] = useState<number | null>(0)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const filteredCategories = categories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FDFBF5'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100/60 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200/50 mb-8">
            <HelpCircle className="h-4 w-4" />
            Centre d'aide
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Comment pouvons-nous
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> vous aider ?</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Trouvez rapidement les réponses à vos questions sur AI et Fines Herbes. 
            Guides, tutoriels et FAQ pour maîtriser votre cuisine intelligente.
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Actions rapides */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <action.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{action.title}</h3>
                <p className="text-slate-600 mb-4">{action.description}</p>
                <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-xl font-medium group-hover:bg-green-700 transition-colors duration-300">
                  {action.action}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-12 text-center">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenCategory(openCategory === categoryIndex ? null : categoryIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50/50 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-slate-900">{category.title}</h3>
                  </div>
                  {openCategory === categoryIndex ? (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-500" />
                  )}
                </button>

                {openCategory === categoryIndex && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      {category.questions.map((qa, qaIndex) => {
                        const questionKey = `${categoryIndex}-${qaIndex}`
                        return (
                          <div key={qaIndex} className="border-l-2 border-green-100 pl-4">
                            <button
                              onClick={() => setOpenQuestion(openQuestion === questionKey ? null : questionKey)}
                              className="w-full text-left flex items-center justify-between py-2 hover:text-green-600 transition-colors duration-300"
                            >
                              <span className="font-medium text-slate-900">{qa.q}</span>
                              {openQuestion === questionKey ? (
                                <ChevronDown className="h-4 w-4 text-slate-500 flex-shrink-0 ml-2" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0 ml-2" />
                              )}
                            </button>
                            {openQuestion === questionKey && (
                              <div className="mt-2 pb-4">
                                <p className="text-slate-600 leading-relaxed">{qa.a}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {searchTerm && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-slate-600 mb-6">Essayez avec d'autres mots-clés ou contactez notre équipe</p>
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Poser une question</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Support supplémentaire */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Besoin d'aide supplémentaire ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Notre équipe support est disponible pour vous accompagner dans votre utilisation 
            d'AI et Fines Herbes. N'hésitez pas à nous contacter !
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/contact"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 transform block"
            >
              Contactez le support
            </a>
            <a
              href="mailto:help@aietfinesherbes.com"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 transform block"
            >
              help@aietfinesherbes.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 