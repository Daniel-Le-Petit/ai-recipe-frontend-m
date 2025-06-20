'use client'

import Header from '@/components/Header'
import RecipeGenerator from '@/components/RecipeGenerator'
import Footer from '@/components/Footer'

export default function CreateRecipePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <RecipeGenerator />
      <Footer />
    </main>
  )
} 