'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Mail, Instagram, Twitter, ChefHat, Users, MessageCircle, Shield, FileText, Heart, Utensils } from 'lucide-react'

const navigation = [
  { name: 'Accueil', href: '/', icon: ChefHat },
  { name: 'Recettes', href: '/recettes', icon: Utensils },
  { name: 'Comment ça marche', href: '/comment-ca-marche', icon: Users },
  { name: 'À propos', href: '/a-propos', icon: Heart },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
]

const support = [
  { name: 'Centre d\'aide', href: '/aide', icon: MessageCircle },
  { name: 'Nous contacter', href: '/contact', icon: Mail },
  { name: 'Politique de confidentialité', href: '/confidentialite', icon: Shield },
  { name: 'Conditions d\'utilisation', href: '/conditions', icon: FileText },
]

const social = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@aietfinesherbes.com', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="h-20 w-auto">
                <Image
                  src="/logo-aietfinesherbes - white.svg"
                  alt="AI et Fines Herbes"
                  width={250}
                  height={100}
                  className="h-full w-auto group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            </Link>
            
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed font-poppins">
              Révolutionnez votre cuisine avec des recettes personnalisées créées par l'intelligence artificielle. 
              Chaque plat est une nouvelle aventure culinaire adaptée à vos goûts et contraintes.
            </p>
            
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-herb-green transition-all duration-300 hover:scale-110 transform"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

                      {/* Navigation */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300 font-poppins"
                  >
                    <item.icon className="h-4 w-4 text-slate-500 group-hover:text-herb-light transition-colors duration-300" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300 font-poppins"
                  >
                    <item.icon className="h-4 w-4 text-slate-500 group-hover:text-herb-light transition-colors duration-300" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800 pt-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-2 text-white">Restez informé</h3>
              <p className="text-slate-400 font-poppins">
                Recevez nos dernières recettes et mises à jour directement dans votre boîte mail.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-herb-green focus:border-transparent transition-colors duration-300 font-poppins"
              />
              <button className="bg-herb-green hover:bg-herb-dark text-white px-6 py-3 rounded-xl font-poppins font-semibold transition-all duration-300 hover:scale-105 transform whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm font-poppins">
              &copy; 2024 AI et Fines Herbes. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/confidentialite" className="text-slate-400 hover:text-white text-sm transition-colors duration-300 font-poppins">
                Confidentialité
              </Link>
              <Link href="/conditions" className="text-slate-400 hover:text-white text-sm transition-colors duration-300 font-poppins">
                Conditions
              </Link>
              <div className="flex items-center space-x-2 text-slate-400 text-sm font-poppins">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Fait avec amour à Lyon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 