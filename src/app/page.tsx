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
          categories.map((cat) => {
            const catRecipes = getRecipesForCategory(cat.id);
            return (
              <section key={cat.id} className="mb-12">
                <h2 className="text-2xl font-bold mb-2">{cat.categoryName}</h2>
                {cat.categoryDescription && (
                  <p className="text-gray-400 mb-4">{cat.categoryDescription}</p>
                )}
                <div className="flex overflow-x-auto gap-6 pb-2">
                  {catRecipes.length > 0 ? (
                    catRecipes.map((recipe) => (
                      <div key={recipe.id} className="min-w-[320px] max-w-[320px]">
                        <RecipeCard recipe={recipe} showCategory={false} />
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 italic">Aucune recette associée à cette catégorie.</div>
                  )}
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