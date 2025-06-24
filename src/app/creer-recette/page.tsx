'use client'

import Header from '@/components/Header'
import RecipeGenerator from '@/components/RecipeGenerator'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

export default function CreateRecipePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={<div>Chargement du générateur...</div>}>
        <RecipeGenerator />
      </Suspense>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
      <Footer />
    </main>
  )
} 