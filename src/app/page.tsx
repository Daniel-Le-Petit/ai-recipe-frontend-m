"use client";
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import TrustSection from '@/components/TrustSection'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react';
import ApiService from '@/api';
import type { StrapiCategory, StrapiRecipe, FlexibleRecipe } from '@/types/api';
import { RecipeCard } from '@/components/RecipeCard';
import Link from 'next/link';

// Helper functions to safely access recipe properties
const getRecipeCategoryId = (recipe: any): number | null => {
  if (recipe.recipieCategory && typeof recipe.recipieCategory.id === 'number') {
    return recipe.recipieCategory.id;
  }
  return null;
};

function getDbInfo() {
  return {
    client: process.env.NEXT_PUBLIC_DATABASE_CLIENT || '',
    host: process.env.NEXT_PUBLIC_DATABASE_HOST || '',
    port: process.env.NEXT_PUBLIC_DATABASE_PORT || '',
    name: process.env.NEXT_PUBLIC_DATABASE_NAME || '',
    username: process.env.NEXT_PUBLIC_DATABASE_USERNAME || '',
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD || '',
    ssl: process.env.NEXT_PUBLIC_DATABASE_SSL || '',
    sslRejectUnauthorized: process.env.NEXT_PUBLIC_DATABASE_SSL_REJECT_UNAUTHORIZED || '',
  };
}

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]); // plus de typage strict
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const db = getDbInfo();
  const maskPassword = (pwd: string) => {
    if (!pwd || pwd.length < 2) return '****';
    return pwd[0] + '****' + pwd[pwd.length-1];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Log l'URL de l'API utilisée
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338');
        
        const catRes = await ApiService.getCategories();
        setCategories(catRes.data);
        const recRes = await ApiService.getRecipes();
        setRecipes(recRes.data);

        // Ajoute ces logs :
        console.log('Categories from API:', catRes.data);
        console.log('Recipes from API:', recRes.data);
        console.log('Categories count:', catRes.data?.length || 0);
        console.log('Recipes count:', recRes.data?.length || 0);
        
        // Log détaillé des recettes
        if (recRes.data && recRes.data.length > 0) {
          console.log('Première recette:', recRes.data[0]);
          console.log('Catégorie de la première recette:', (recRes.data[0] as any).recipieCategory);
        }
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
    return recipes.filter((recipe) => recipe.recipieCategory && Number(recipe.recipieCategory.id) === Number(categoryId));
  };

  const handleRecipeClick = (recipe: any) => {
    // Navigation vers la page de création/édition de la recette
    window.location.href = `/creer-recette?id=${recipe.id}&step=4`;
  };

  // Ajout du log pour debug
  console.log('CATEGORIES:', sortedCategories);
  console.log('RECIPES:', recipes);
  if (recipes.length > 0) {
    console.log('EXEMPLE RECETTE COMPLETE:', JSON.stringify(recipes[0], null, 2));
  }
  sortedCategories.forEach(cat => {
    const catRecipes = getRecipesForCategory(cat.id);
    console.log(`Catégorie ${cat.categoryName} (id=${cat.id}) → recettes:`, catRecipes.map(r => r.id));
  });

  // Debug : log les ids de catégorie des recettes et des catégories
  recipes.forEach(r => {
    console.log('Recipe', r.id, 'catId:', getRecipeCategoryId(r), 'type:', typeof getRecipeCategoryId(r));
  });
  sortedCategories.forEach(cat => {
    console.log('Category', cat.id, 'type:', typeof cat.id);
  });

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* Section catégories/recettes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
          <div>
            {sortedCategories.map((category) => {
              const recettesPourCategorie = recipes.filter(recipe =>
                recipe.recipieCategory && Number(recipe.recipieCategory.id) === Number(category.id)
              );
              return (
                <div key={category.id} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-herb-green">{category.categoryName}</h2>
                  {recettesPourCategorie.length === 0 ? (
                    <div className="text-gray-400 italic mb-8">Aucune recette dans cette catégorie.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {recettesPourCategorie.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onStartCooking={handleRecipeClick}
                          compact={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
} 