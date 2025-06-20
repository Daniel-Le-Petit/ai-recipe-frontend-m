'use client'

import { useState } from 'react'
import { Clock, Users, ChefHat, Star, ArrowRight, Search, Filter, Leaf, Utensils, Heart, Sun, Moon, Coffee, Cake, Sparkles, ArrowDownAZ } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Base de données de recettes pré-construites
const RECIPES = [
  // Petit-déjeuner
  {
    id: 'avocado-toast',
    title: 'Toast à l\'avocat et œufs pochés',
    category: 'breakfast',
    difficulty: 'Facile',
    prepTime: '10 min',
    cookTime: '5 min',
    servings: 2,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Sain', 'Rapide'],
    description: 'Un petit-déjeuner gourmand et équilibré avec avocat crémeux et œufs parfaitement pochés'
  },
  {
    id: 'smoothie-bowl',
    title: 'Smoothie bowl aux fruits rouges',
    category: 'breakfast',
    difficulty: 'Facile',
    prepTime: '15 min',
    cookTime: '0 min',
    servings: 1,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végan', 'Sans gluten', 'Frais'],
    description: 'Un bol coloré et rafraîchissant pour bien commencer la journée'
  },
  {
    id: 'pancakes-banane',
    title: 'Pancakes à la banane et chocolat',
    category: 'breakfast',
    difficulty: 'Facile',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Gourmand', 'Familial'],
    description: 'Des pancakes moelleux et parfumés, parfaits pour un brunch dominical'
  },

  // Déjeuner
  {
    id: 'salade-quinoa',
    title: 'Salade de quinoa aux légumes grillés',
    category: 'lunch',
    difficulty: 'Facile',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: 2,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végan', 'Sans gluten', 'Protéiné'],
    description: 'Une salade complète et nutritive, idéale pour un déjeuner équilibré'
  },
  {
    id: 'pasta-pesto',
    title: 'Pâtes au pesto de basilic frais',
    category: 'lunch',
    difficulty: 'Facile',
    prepTime: '10 min',
    cookTime: '12 min',
    servings: 2,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Rapide', 'Italien'],
    description: 'Des pâtes al dente avec un pesto maison parfumé et crémeux'
  },
  {
    id: 'burger-veggie',
    title: 'Burger végétarien aux haricots noirs',
    category: 'lunch',
    difficulty: 'Moyen',
    prepTime: '20 min',
    cookTime: '10 min',
    servings: 2,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végan', 'Protéiné', 'Gourmand'],
    description: 'Un burger savoureux et nutritif, parfait pour un déjeuner réconfortant'
  },

  // Dîner
  {
    id: 'saumon-teriyaki',
    title: 'Saumon teriyaki avec riz et légumes',
    category: 'dinner',
    difficulty: 'Facile',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: 2,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Poisson', 'Asiatique', 'Sain'],
    description: 'Un plat équilibré avec du saumon fondant et une sauce teriyaki maison'
  },
  {
    id: 'risotto-champignons',
    title: 'Risotto aux champignons et parmesan',
    category: 'dinner',
    difficulty: 'Moyen',
    prepTime: '10 min',
    cookTime: '25 min',
    servings: 2,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Végétarien', 'Italien', 'Crémeux'],
    description: 'Un risotto crémeux et parfumé, parfait pour une soirée romantique'
  },
  {
    id: 'curry-poulet',
    title: 'Curry de poulet aux épices douces',
    category: 'dinner',
    difficulty: 'Facile',
    prepTime: '20 min',
    cookTime: '30 min',
    servings: 4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Poulet', 'Indien', 'Épicé'],
    description: 'Un curry parfumé et réconfortant, idéal pour réchauffer les soirées'
  },

  // Desserts
  {
    id: 'tiramisu',
    title: 'Tiramisu classique',
    category: 'dessert',
    difficulty: 'Facile',
    prepTime: '20 min',
    cookTime: '0 min',
    servings: 6,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Italien', 'Café', 'Crémeux'],
    description: 'Le dessert italien par excellence, léger et délicatement parfumé'
  },
  {
    id: 'chocolate-cake',
    title: 'Gâteau au chocolat fondant',
    category: 'dessert',
    difficulty: 'Facile',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 8,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Chocolat', 'Fondant', 'Classique'],
    description: 'Un gâteau moelleux et intense, pour les amateurs de chocolat'
  },
  {
    id: 'creme-brulee',
    title: 'Crème brûlée à la vanille',
    category: 'dessert',
    difficulty: 'Moyen',
    prepTime: '20 min',
    cookTime: '40 min',
    servings: 4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Français', 'Vanille', 'Élégant'],
    description: 'Une crème brûlée parfaite avec sa croûte caramélisée croustillante'
  }
]

const CATEGORIES = [
  { id: 'all', name: 'Toutes', icon: Utensils },
  { id: 'breakfast', name: 'Petit-déjeuner', icon: Coffee },
  { id: 'lunch', name: 'Déjeuner', icon: Sun },
  { id: 'dinner', name: 'Dîner', icon: Moon },
  { id: 'dessert', name: 'Desserts', icon: Cake }
]

const SORT_OPTIONS = [
  { id: 'popular', name: 'Populaires', icon: Star },
  { id: 'time', name: 'Plus rapides', icon: Clock },
  { id: 'name', name: 'Ordre A-Z', icon: ArrowDownAZ }
]

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  // Filtrer les recettes
  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  // Trier les recettes
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.rating - a.rating
      case 'time':
        const timeA = parseInt(a.prepTime) + parseInt(a.cookTime)
        const timeB = parseInt(b.prepTime) + parseInt(b.cookTime)
        return timeA - timeB
      case 'name':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const startCooking = (recipe: typeof RECIPES[0]) => {
    // Ici on redirigerait vers le mode cuisson guidée avec la recette
    console.log('Démarrer la cuisson de:', recipe.title)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-herb-green/20 backdrop-blur-sm text-herb-dark px-3 sm:px-4 py-2 rounded-full text-sm font-medium border border-herb-green/30">
                <Leaf className="h-4 w-4" />
                Recettes testées et approuvées
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
                Nos recettes
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Découvrez notre sélection de recettes délicieuses, créées par nos chefs et testées par notre communauté
              </p>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            {/* Barre de recherche */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une recette, un ingrédient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-herb-green/30 focus:border-herb-green/50 transition-all duration-300"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Catégories */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                      selectedCategory === category.id
                        ? 'bg-herb-green text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Tri */}
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <Filter className="h-5 w-5 text-slate-400" />
                {SORT_OPTIONS.map((option) => (
                   <button
                   key={option.id}
                   onClick={() => setSortBy(option.id)}
                   className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                     sortBy === option.id
                       ? 'bg-slate-800 text-white shadow-lg'
                       : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                   }`}
                 >
                   <option.icon className="h-4 w-4" />
                   <span>{option.name}</span>
                 </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grille de recettes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span>{recipe.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-herb-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {recipe.difficulty}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-grow">
                    <h3 className="font-poppins text-xl font-bold text-slate-900 mb-2 h-14 line-clamp-2">
                      {recipe.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 h-10 line-clamp-2">
                      {recipe.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Infos */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="h-4 w-4" />
                          <span>{recipe.cookTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => startCooking(recipe)}
                    className="w-full bg-gradient-to-r from-herb-green to-sage hover:from-herb-dark hover:to-sage-dark text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <Utensils className="h-4 w-4" />
                    <span>Cuire cette recette</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA final */}
      <section className="bg-gradient-to-r from-herb-green to-sage py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Envie de quelque chose de plus personnalisé ?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Notre IA crée des recettes uniques adaptées à vos ingrédients et préférences
          </p>
          <Link href="/creer-recette">
            <button className="group relative overflow-hidden bg-white text-herb-green px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform hover:bg-gray-50">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-herb-green/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <div className="relative flex items-center space-x-2">
                <ChefHat className="h-5 w-5" />
                <span>Créer ma recette personnalisée</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
} 