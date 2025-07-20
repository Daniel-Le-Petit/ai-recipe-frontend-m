"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import RecipeCardCarousel from "@/components/RecipeCardCarousel";
import Image from "next/image";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';
        const catRes = await (await fetch(`${apiUrl}/api/recipie-categories`)).json();
        setCategories(catRes.data || []);
        const recRes = await (await fetch(`${apiUrl}/api/recipies`)).json();
        setRecipes(recRes.data || []);
      } catch (e) {
        // TODO: gestion d'erreur
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Trie les catégories par nom
  const sortedCategories = [...categories].sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  // Récupère les recettes d'une catégorie
  const getRecipesForCategory = (categoryId: number) =>
    recipes.filter(
      (r) =>
        r.recipieCategory &&
        Number(r.recipieCategory.id) === Number(categoryId)
    );

  return (
    <main className="min-h-screen bg-beige-main">
      <Header />

      {/* Bloc Héro */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-beige-main">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-text-dark">
              Générez des recettes savoureuses avec l&apos;IA
            </h1>
            <p className="text-base md:text-lg text-text-medium">
              Créez des recettes personnalisées et faites vos courses en toute simplicité grâce à l&apos;intelligence artificielle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
              <Link href="/creer-recette">
                <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200">
                  <span className="mr-2 flex items-center" style={{ lineHeight: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10 3v5.5a4 4 0 0 1-.8 2.4l-4.1 5.7A4 4 0 0 0 8.4 21h7.2a4 4 0 0 0 3.3-4.4l-4.1-5.7A4 4 0 0 1 14 8.5V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 15h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Créer une recette
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/main-image-cart.svg"
              alt="Caddie"
              className="w-64 h-auto max-h-64 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Bloc Plan de la semaine */}
      <section className="py-6 bg-beige-warm">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow-md px-6 py-6">
          {/* Bloc gauche : texte et icône */}
          <div className="flex-1 flex flex-col items-start justify-center gap-2">
            <Link href="/plan-semaine" className="flex items-center gap-2 mb-1">
              {/* Icône calendrier orange */}
              <span style={{ lineHeight: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="16" rx="2" fill="#fff"/>
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="#fb8500" strokeWidth="2"/>
                  <rect x="7" y="2" width="2" height="6" rx="1" fill="#fb8500"/>
                  <rect x="15" y="2" width="2" height="6" rx="1" fill="#fb8500"/>
                  <rect x="7" y="10" width="10" height="2" rx="1" fill="#fb8500"/>
                </svg>
              </span>
              <span className="text-xl md:text-2xl font-bold font-poppins text-orange-500">Découvrir le plan de la semaine</span>
            </Link>
            <p className="text-gray-600 text-base md:text-lg mb-2">Découvrez un menu hebdomadaire équilibré généré par l&apos;IA.</p>
          </div>
          {/* Bloc droit : livre ouvert */}
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-64 h-48 md:w-80 md:h-56 flex items-center justify-center">
              <div className="absolute inset-0 flex shadow-lg rounded-2xl overflow-hidden bg-white border-2 border-green-200" style={{ boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.10), 0 1.5px 0 #e5e7eb' }}>
                <div className="flex-1 flex flex-col items-center justify-start shadow-inner py-6 px-4">
                  <div className="flex flex-1 items-center justify-center w-full h-full">
                    <Image src="/Images/calendar-recipe.png" alt="Calendrier recette" width={120} height={120} className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Commander nos recettes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-text-dark mb-2">Commander nos recettes inspirantes</h1>
        <p className="text-base md:text-lg text-text-medium">Ajouter vos recettes au panier et passez commande facilement</p>
      </div>

      {/* Bloc Recettes par catégorie (NOUVELLE VERSION) */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
          sortedCategories.map((cat) => {
            const recettes = cat.recipies || [];
            if (recettes.length === 0) return null;
            return (
              <div key={cat.id} className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-herb-green">{cat.categoryName}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {recettes.map((recipe) => (
                    <RecipeCardCarousel
                      key={recipe.id}
                      recipe={recipe}
                      categoryId={cat.id}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>

      <Footer />
    </main>
  );
} 