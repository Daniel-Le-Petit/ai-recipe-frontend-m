"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ApiService from '@/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!params.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'}/api/recipies?filters[id][$eq]=${params.id}&populate=*`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setRecipe(data.data[0]);
        } else {
          setError('Recette non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la recette.');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            {error || 'Recette non trouvée'}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          
          {recipe.image && (
            <img
              src={recipe.image.url || recipe.image.formats?.medium?.url}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Ingrédients</h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient: any, index: number) => (
                  <li key={index} className="flex justify-between">
                    <span>{ingredient.name}</span>
                    <span className="text-gray-600">{ingredient.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3">Instructions</h2>
              <p className="text-gray-700">{recipe.instructions}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Durée: {recipe.duration} min</span>
              <span>Difficulté: {recipe.difficulty}</span>
              <span>Portions: {recipe.servings}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 