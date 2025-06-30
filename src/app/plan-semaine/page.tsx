"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lightbulb, Utensils, ListChecks, Brain, CheckSquare, Clock, Users, Star, Calendar, ShoppingCart, Download, Share2, ChefHat, Heart, Coffee, Sun, Moon, Settings, Copy, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PlanSemainePage() {
  const router = useRouter();
  const [selectedMealTypes, setSelectedMealTypes] = useState({
    petitDejeuner: true,
    dejeuner: true,
    diner: true,
    brunch: true,
    collation: true
  });

  const [preferences, setPreferences] = useState({
    servings: 2,
    difficulty: 'Facile',
    maxTime: 30,
    cuisine: 'Toutes'
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const mealTypes = [
    { id: 'petitDejeuner', name: 'Petit-déjeuner', icon: <Coffee className="h-5 w-5" />, description: 'Céréales, fruits, œufs' },
    { id: 'dejeuner', name: 'Déjeuner', icon: <Sun className="h-5 w-5" />, description: 'Plats principaux, salades' },
    { id: 'diner', name: 'Dîner', icon: <Moon className="h-5 w-5" />, description: 'Soupes, plats légers' },
    { id: 'brunch', name: 'Brunch', icon: <ChefHat className="h-5 w-5" />, description: 'Week-end, repas fusion' },
    { id: 'collation', name: 'Collation', icon: <Heart className="h-5 w-5" />, description: 'Snacks, goûters' }
  ];

  const cuisineTypes = [
    'Toutes', 'Française', 'Italienne', 'Méditerranéenne', 'Asiatique', 'Mexicaine', 'Végétarienne'
  ];

  const difficulties = ['Facile', 'Moyen', 'Difficile'];
  const servingOptions = [1, 2, 3, 4, 5, 6];
  const timeOptions = [15, 30, 45, 60];

  const features = [
    {
      icon: <ChefHat className="h-6 w-6 text-orange-500" />,
      title: "Menu personnalisé par type de repas",
      description: "Petit-déjeuner, déjeuner, dîner, brunch selon vos préférences",
      highlight: "Sur-mesure"
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-green-500" />,
      title: "Liste de courses intelligente",
      description: "Générée automatiquement et optimisée par repas",
      highlight: "Économies garanties"
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      title: "Recettes adaptées à vos goûts",
      description: "IA qui apprend vos préférences culinaires",
      highlight: "Intelligence artificielle"
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Flexibilité totale",
      description: "Changez les types de repas selon vos envies",
      highlight: "100% personnalisable"
    }
  ];

  const stats = [
    { icon: <Clock className="h-5 w-5" />, value: "15-45 min", label: "Temps par repas" },
    { icon: <Users className="h-5 w-5" />, value: "1-6 pers", label: "Portions flexibles" },
    { icon: <Star className="h-5 w-5" />, value: "4.8/5", label: "Note moyenne" },
    { icon: <Calendar className="h-5 w-5" />, value: "5 types", label: "Types de repas" }
  ];

  const handleMealTypeToggle = (mealType) => {
    setSelectedMealTypes(prev => ({
      ...prev,
      [mealType]: !prev[mealType]
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const generatePlan = () => {
    // Préparer les données pour la page de visualisation
    const planData = {
      mealTypes: selectedMealTypes,
      preferences: preferences,
      week: `Semaine du ${new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}`
    };
    
    // Stocker temporairement les préférences
    localStorage.setItem('planPreferences', JSON.stringify(planData));
    
    router.push('/plan-semaine/voir');
  };

  const generatePrompt = () => {
    const selectedTypes = Object.entries(selectedMealTypes)
      .filter(([_, selected]) => selected)
      .map(([type, _]) => {
        const typeNames = {
          petitDejeuner: 'petit-déjeuner',
          dejeuner: 'déjeuner',
          diner: 'dîner',
          brunch: 'brunch',
          collation: 'collation'
        };
        return typeNames[type];
      })
      .join(', ');

    return `Crée-moi un plan de repas pour une semaine complète avec les spécifications suivantes :

Types de repas souhaités : ${selectedTypes}
Nombre de personnes : ${preferences.servings}
Niveau de difficulté : ${preferences.difficulty}
Temps maximum par repas : ${preferences.maxTime} minutes
Type de cuisine préféré : ${preferences.cuisine}

Pour chaque repas, fournis :
- Un titre accrocheur
- Le temps de préparation
- Le niveau de difficulté
- Les ingrédients principaux
- Des tags descriptifs (ex: Végétarien, Rapide, etc.)
- Une note de 4.5 à 5.0

Organise les repas par jour de la semaine (Lundi à Dimanche) et par type de repas dans l'ordre chronologique de la journée.

Format de réponse souhaité :
Jour - Type de repas
Titre du plat
⏱️ Temps de préparation
👥 Nombre de personnes
⭐ Note
🏷️ Tags
🥘 Ingrédients principaux`;
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-orange-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Navigation */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg mb-8 transition-colors"
            aria-label="Retour"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>

          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-3 rounded-full mr-4">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Créez votre plan de semaine personnalisé !
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choisissez vos types de repas préférés et laissez notre IA créer votre menu sur-mesure. 
              <span className="text-orange-600 font-semibold"> Gratuit et sans engagement !</span>
            </p>
          </div>

          {/* Meal Types Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings className="h-6 w-6 text-blue-500" />
              Choisissez vos types de repas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {mealTypes.map((mealType) => (
                <button
                  key={mealType.id}
                  onClick={() => handleMealTypeToggle(mealType.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedMealTypes[mealType.id]
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedMealTypes[mealType.id] ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      {mealType.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{mealType.name}</div>
                      <div className="text-sm opacity-75">{mealType.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Preferences */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre de personnes
                </label>
                <select
                  value={preferences.servings}
                  onChange={(e) => handlePreferenceChange('servings', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {servingOptions.map(num => (
                    <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulté
                </label>
                <select
                  value={preferences.difficulty}
                  onChange={(e) => handlePreferenceChange('difficulty', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Temps max par repas
                </label>
                <select
                  value={preferences.maxTime}
                  onChange={(e) => handlePreferenceChange('maxTime', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time} min</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type de cuisine
                </label>
                <select
                  value={preferences.cuisine}
                  onChange={(e) => handlePreferenceChange('cuisine', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Generate Plan Button */}
          <div className="text-center mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                onClick={generatePlan}
                disabled={Object.values(selectedMealTypes).every(v => !v)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-12 rounded-2xl text-xl shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
              >
                🍽️ Générer mon plan personnalisé
              </button>
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <Eye className="h-5 w-5" />
                Voir le prompt
              </button>
            </div>
            
            {Object.values(selectedMealTypes).every(v => !v) && (
              <p className="text-red-500 mt-2">Veuillez sélectionner au moins un type de repas</p>
            )}

            {/* Prompt Display */}
            {showPrompt && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Prompt pour ChatGPT</h3>
                  <button
                    onClick={copyPrompt}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckSquare className="h-4 w-4" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copier
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {generatePrompt()}
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Copiez ce prompt et collez-le dans ChatGPT pour tester la génération de recettes !
                </p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                <div className="flex justify-center mb-3 text-orange-500">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <span className="inline-block bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {feature.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Ce que disent nos utilisateurs
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-3">
                  "J'adore pouvoir choisir mes types de repas ! Plus de monotonie !"
                </p>
                <p className="text-sm text-gray-500">- Marie, 32 ans</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-3">
                  "Le brunch du weekend est devenu notre rituel préféré !"
                </p>
                <p className="text-sm text-gray-500">- Thomas, 28 ans</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-3">
                  "Parfait pour mes collations healthy entre les repas !"
                </p>
                <p className="text-sm text-gray-500">- Sophie, 35 ans</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6 font-medium">
              Prêt à révolutionner votre cuisine ? 
              <span className="text-orange-600 font-bold"> Personnalisez votre plan !</span>
            </p>
            <button
              onClick={generatePlan}
              disabled={Object.values(selectedMealTypes).every(v => !v)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
            >
              Commencer maintenant
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 