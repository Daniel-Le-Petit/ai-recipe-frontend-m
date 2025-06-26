'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users, CheckCircle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Notre équipe vous répond sous 24h",
    contact: "hello@aietfinesherbes.com",
    action: "Envoyer un email"
  },
  {
    icon: Phone,
    title: "Téléphone",
    description: "Du lundi au vendredi, 9h-18h",
    contact: "+33 1 23 45 67 89",
    action: "Nous appeler"
  },
  {
    icon: MapPin,
    title: "Adresse",
    description: "Siège social",
    contact: "123 Rue de la République\n69002 Lyon, France",
    action: "Voir sur la carte"
  }
]

const reasons = [
  {
    icon: Users,
    title: "Partenariat",
    description: "Vous êtes un chef, un restaurant ou une marque et souhaitez collaborer avec nous ?"
  },
  {
    icon: MessageCircle,
    title: "Support technique",
    description: "Un problème avec l'application ? Notre équipe technique est là pour vous aider."
  },
  {
    icon: Clock,
    title: "Retours & suggestions",
    description: "Vos idées nous aident à améliorer l'expérience pour tous nos utilisateurs."
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reason: 'general'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FDFBF5'}}>
      <Header />
      <div className="max-w-3xl mx-auto py-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg mb-4"
          aria-label="Retour"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Restons en
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> contact</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Une question, une suggestion ou envie de collaborer ? 
            Notre équipe passionnée est là pour vous accompagner dans votre aventure culinaire.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <method.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">{method.title}</h3>
                <p className="text-slate-600 mb-4">{method.description}</p>
                <p className="font-medium text-slate-900 mb-6 whitespace-pre-line">{method.contact}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 w-full">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            
            {/* Reasons to contact */}
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                Pourquoi nous contacter ?
              </h2>
              
              <div className="space-y-8">
                {reasons.map((reason, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <reason.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">{reason.title}</h3>
                      <p className="text-slate-600">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-green-50 rounded-2xl p-8 border border-green-100">
                <h3 className="font-semibold text-xl text-slate-900 mb-4">Temps de réponse</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Questions générales</span>
                    <span className="font-medium text-green-600">&lt; 24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Support technique</span>
                    <span className="font-medium text-green-600">&lt; 4h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Partenariats</span>
                    <span className="font-medium text-green-600">&lt; 48h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="font-poppins text-2xl font-bold text-slate-900 mb-6">
                  Envoyez-nous un message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Message envoyé !</h3>
                    <p className="text-slate-600">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                        Motif de contact
                      </label>
                      <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                      >
                        <option value="general">Question générale</option>
                        <option value="support">Support technique</option>
                        <option value="partnership">Partenariat</option>
                        <option value="feedback">Retours & suggestions</option>
                        <option value="press">Presse & médias</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Résumé de votre demande"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <Send className="h-5 w-5" />
                      <span>Envoyer le message</span>
                    </button>

                    <p className="text-sm text-slate-500 text-center">
                      Vos données sont protégées et ne seront utilisées que pour répondre à votre demande.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Questions fréquentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">L'application est-elle gratuite ?</h3>
              <p className="text-slate-600">Oui, AI et Fines Herbes est entièrement gratuit avec toutes les fonctionnalités incluses.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">Puis-je sauvegarder mes recettes ?</h3>
              <p className="text-slate-600">Absolument ! Créez un compte pour sauvegarder et organiser toutes vos recettes personnalisées.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">Combien d'ingrédients puis-je utiliser ?</h3>
              <p className="text-slate-600">Il n'y a pas de limite ! Ajoutez autant d'ingrédients que vous le souhaitez pour des recettes sur mesure.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">L'IA fonctionne dans quelle langue ?</h3>
              <p className="text-slate-600">Actuellement en français, avec bientôt le support de l'anglais, espagnol et italien.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 