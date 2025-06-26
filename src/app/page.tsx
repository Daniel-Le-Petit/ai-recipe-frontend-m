"use client";
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import TrustSection from '@/components/TrustSection'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react';
import ApiService from '@/api';
import type { StrapiCategory, StrapiRecipe } from '@/types/api';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';

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
      // Si recipe.recipieCategory est un objet ou un id direct
      if (!recipe.recipieCategory) return false;
      if (typeof recipe.recipieCategory === 'object' && recipe.recipieCategory.id) {
        return recipe.recipieCategory.id === categoryId;
      }
      return recipe.recipieCategory === categoryId;
    });
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
              <section key={cat.id} className="mb-12">
                <h2 className="text-2xl font-bold mb-2">{cat.categoryName}</h2>
                {cat.categoryDescription && (
                  <p className="text-gray-400 mb-4">{cat.categoryDescription}</p>
                )}
                <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-thin scrollbar-thumb-gray-300"
                  style={{ WebkitOverflowScrolling: 'touch' }}>
                  {catRecipes.map((recipe) => (
                    <div key={recipe.id} className="min-w-[120px] max-w-[160px] sm:min-w-[180px] sm:max-w-[200px] md:min-w-[220px] md:max-w-[240px] lg:min-w-[260px] lg:max-w-[280px] flex-shrink-0">
                      <RecipeCard recipe={recipe} showCategory={false} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
      <Footer />
    </main>
  );
} 