"use client";
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import TrustSection from '@/components/TrustSection'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react';
import ApiService from '@/api';
import type { StrapiCategory, StrapiRecipe, FlexibleRecipe } from '@/types/api';
import { RecipeCardHorizontal } from '@/components/RecipeCard';
import Link from 'next/link';

// Helper functions to safely access recipe properties
const getRecipeCategory = (recipe: StrapiRecipe | FlexibleRecipe): any => {
  return recipe.attributes?.recipieCategory?.data || (recipe as any).recipieCategory || null
}

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]); // plus de typage strict
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await ApiService.getCategories();
        setCategories(catRes.data);
        const recRes = await ApiService.getRecipes();
        setRecipes(recRes.data);
      } catch (e) {
        // TODO: gestion d'erreur
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Trie les catégories par ordre alphabétique
  const sortedCategories = [...categories].sort((a, b) => a.categoryName.localeCompare(b.categoryName));

  // Fonction pour filtrer les recettes par catégorie
  const getRecipesForCategory = (categoryId: number) => {
    return recipes.filter((recipe) => {
      const recipeCat = getRecipeCategory(recipe);
      if (!recipeCat) return false;
      if (typeof recipeCat === 'object' && recipeCat.id) {
        return recipeCat.id === categoryId;
      }
      return recipeCat === categoryId;
    });
  };

  const handleRecipeClick = (recipe: any) => {
    // Navigation vers la page de détail de la recette
    window.location.href = `/recettes/${recipe.id}`;
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* Section catégories/recettes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
          sortedCategories.map((cat) => {
            const catRecipes = getRecipesForCategory(cat.id);
            if (catRecipes.length === 0) return null; // Ne pas afficher la catégorie si aucune recette
            return (
              <RecipeCardHorizontal
                key={cat.id}
                recipes={catRecipes}
                title={cat.categoryName}
                onStartCooking={handleRecipeClick}
                compact={true}
              />
            );
          })
        )}
      </div>
      <Footer />
    </main>
  );
} 