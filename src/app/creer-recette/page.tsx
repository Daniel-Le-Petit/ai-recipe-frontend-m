'use client'

import Header from '@/components/Header'
import RecipeGenerator from '@/components/RecipeGenerator'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

export default function CreateRecipePage() {
  return (
    <main className="min-h-screen">
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
      <Suspense fallback={<div>Chargement du générateur...</div>}>
        <RecipeGenerator />
      </Suspense>
      <Footer />
    </main>
  )
} 