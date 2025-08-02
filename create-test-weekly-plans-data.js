const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

// Données de test pour les recettes (si elles n'existent pas)
const testRecipes = [
  {
    title: 'Salade Quinoa Végétarienne',
    description: 'Une salade fraîche et nutritive avec quinoa, légumes de saison et vinaigrette maison',
    duration: 25,
    difficulty: 'Facile',
    servings: 2,
    rating: 4.5,
    tags: ['vegetarien', 'sans-gluten', 'healthy'],
    recipeState: 'approved'
  },
  {
    title: 'Poulet Rôti aux Herbes',
    description: 'Poulet rôti avec herbes de Provence et légumes de saison',
    duration: 45,
    difficulty: 'Intermédiaire',
    servings: 4,
    rating: 4.8,
    tags: ['poulet', 'herbes', 'roti'],
    recipeState: 'approved'
  },
  {
    title: 'Soupe de Légumes Express',
    description: 'Soupe rapide et réconfortante avec légumes de saison',
    duration: 20,
    difficulty: 'Facile',
    servings: 2,
    rating: 4.2,
    tags: ['soupe', 'rapide', 'vegetarien'],
    recipeState: 'approved'
  },
  {
    title: 'Pasta Carbonara Végétarienne',
    description: 'Version végétarienne de la carbonara avec champignons et parmesan',
    duration: 30,
    difficulty: 'Intermédiaire',
    servings: 2,
    rating: 4.6,
    tags: ['pasta', 'vegetarien', 'italien'],
    recipeState: 'approved'
  },
  {
    title: 'Bowl Buddha Bowl',
    description: 'Bowl coloré avec riz, légumes rôtis et sauce tahini',
    duration: 35,
    difficulty: 'Facile',
    servings: 2,
    rating: 4.7,
    tags: ['bowl', 'vegetarien', 'healthy'],
    recipeState: 'approved'
  }
];

// Données de test pour les plans de semaine
const testWeeklyPlans = [
  {
    userId: 1,
    weekStart: '2025-01-20',
    weekEnd: '2025-01-26',
    selections: {
      mealTypes: ['petit-dejeuner', 'dejeuner', 'diner'],
      portions: '2',
      preferences: ['vegetarien'],
      cookingMode: 'manuel',
      difficulty: 'moyen',
      cookingTime: '30',
      cuisineType: 'toutes'
    },
    status: 'active'
  },
  {
    userId: 1,
    weekStart: '2025-01-27',
    weekEnd: '2025-02-02',
    selections: {
      mealTypes: ['petit-dejeuner', 'dejeuner', 'collation', 'diner'],
      portions: '2',
      preferences: ['vegetarien', 'sans-gluten'],
      cookingMode: 'manuel',
      difficulty: 'facile',
      cookingTime: '20',
      cuisineType: 'mediterraneen'
    },
    status: 'active'
  }
];

// Données de test pour les repas
const testWeeklyPlanMeals = [
  // Semaine 1 - Lundi
  {
    weekly_plan: 1,
    day: '2025-01-20',
    mealType: 'petit-dejeuner',
    recipe: 1,
    status: 'accepted',
    userNotes: 'Parfait pour commencer la journée'
  },
  {
    weekly_plan: 1,
    day: '2025-01-20',
    mealType: 'dejeuner',
    recipe: 2,
    status: 'accepted',
    userNotes: 'Délicieux !'
  },
  {
    weekly_plan: 1,
    day: '2025-01-20',
    mealType: 'diner',
    recipe: 3,
    status: 'declined',
    userNotes: 'Je préfère quelque chose de plus consistant'
  },
  // Semaine 1 - Mardi
  {
    weekly_plan: 1,
    day: '2025-01-21',
    mealType: 'petit-dejeuner',
    recipe: 4,
    status: 'pending',
    userNotes: ''
  },
  {
    weekly_plan: 1,
    day: '2025-01-21',
    mealType: 'dejeuner',
    recipe: 5,
    status: 'accepted',
    userNotes: 'Très satisfaisant'
  },
  {
    weekly_plan: 1,
    day: '2025-01-21',
    mealType: 'diner',
    recipe: 1,
    status: 'accepted',
    userNotes: ''
  }
];

// Données de test pour les alternatives
const testAlternatives = [
  {
    weekly_plan_meal: 3, // Dîner lundi (recette 3 déclinée)
    recipe: 4, // Pasta Carbonara comme alternative
    reason: 'preference',
    reasonDetails: 'Je préfère une recette plus consistante',
    isSelected: true
  },
  {
    weekly_plan_meal: 3,
    recipe: 5, // Buddha Bowl comme autre alternative
    reason: 'preference',
    reasonDetails: 'Option plus légère',
    isSelected: false
  },
  {
    weekly_plan_meal: 4, // Petit-déjeuner mardi (recette 4 en attente)
    recipe: 1, // Salade Quinoa comme alternative
    reason: 'time-constraint',
    reasonDetails: 'J\'ai besoin de quelque chose de plus rapide',
    isSelected: false
  }
];

// Données de test pour l'historique des changements
const testChanges = [
  {
    weekly_plan_meal: 3,
    changeType: 'recipe-switch',
    reason: 'preference',
    reasonDetails: 'Recette plus consistante',
    previousRecipe: 3,
    newRecipe: 4,
    previousValue: 'Soupe de Légumes Express',
    newValue: 'Pasta Carbonara Végétarienne'
  },
  {
    weekly_plan_meal: 3,
    changeType: 'status-change',
    reason: 'preference',
    reasonDetails: 'Je préfère une autre recette',
    previousValue: 'accepted',
    newValue: 'declined'
  },
  {
    weekly_plan_meal: 4,
    changeType: 'alternative-selected',
    reason: 'time-constraint',
    reasonDetails: 'Besoin d\'une recette plus rapide',
    previousValue: 'Pasta Carbonara Végétarienne',
    newValue: 'Salade Quinoa Végétarienne'
  }
];

async function createTestData() {
  console.log('🎯 Création des données de test pour les plans de semaine...\n');

  try {
    // Test de connectivité
    console.log('1. Test de connectivité...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      throw new Error('API non accessible');
    }
    console.log('✅ API accessible');

    // 2. Créer les recettes de test
    console.log('\n2. Création des recettes de test...');
    const recipeIds = [];
    
    for (const recipe of testRecipes) {
      try {
        const response = await fetch(`${API_URL}/api/recipies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: recipe }),
        });

        if (response.ok) {
          const data = await response.json();
          recipeIds.push(data.data.id);
          console.log(`✅ Recette créée: ${recipe.title} (ID: ${data.data.id})`);
        } else {
          console.log(`⚠️ Recette déjà existante ou erreur: ${recipe.title}`);
        }
      } catch (error) {
        console.log(`⚠️ Erreur lors de la création de la recette: ${recipe.title}`);
      }
    }

    // 3. Créer les plans de semaine
    console.log('\n3. Création des plans de semaine...');
    const planIds = [];
    
    for (const plan of testWeeklyPlans) {
      try {
        const response = await fetch(`${API_URL}/api/weekly-plans`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: plan }),
        });

        if (response.ok) {
          const data = await response.json();
          planIds.push(data.data.id);
          console.log(`✅ Plan créé: Semaine du ${plan.weekStart} (ID: ${data.data.id})`);
        } else {
          console.log(`⚠️ Erreur lors de la création du plan: Semaine du ${plan.weekStart}`);
        }
      } catch (error) {
        console.log(`⚠️ Erreur lors de la création du plan: Semaine du ${plan.weekStart}`);
      }
    }

    // 4. Créer les repas
    console.log('\n4. Création des repas...');
    const mealIds = [];
    
    for (const meal of testWeeklyPlanMeals) {
      try {
        const response = await fetch(`${API_URL}/api/weekly-plan-meals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: meal }),
        });

        if (response.ok) {
          const data = await response.json();
          mealIds.push(data.data.id);
          console.log(`✅ Repas créé: ${meal.mealType} du ${meal.day} (ID: ${data.data.id})`);
        } else {
          console.log(`⚠️ Erreur lors de la création du repas: ${meal.mealType} du ${meal.day}`);
        }
      } catch (error) {
        console.log(`⚠️ Erreur lors de la création du repas: ${meal.mealType} du ${meal.day}`);
      }
    }

    // 5. Créer les alternatives
    console.log('\n5. Création des alternatives...');
    
    for (const alternative of testAlternatives) {
      try {
        const response = await fetch(`${API_URL}/api/weekly-plan-meal-alternatives`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: alternative }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Alternative créée: Recette ${alternative.recipe} (ID: ${data.data.id})`);
        } else {
          console.log(`⚠️ Erreur lors de la création de l'alternative: Recette ${alternative.recipe}`);
        }
      } catch (error) {
        console.log(`⚠️ Erreur lors de la création de l'alternative: Recette ${alternative.recipe}`);
      }
    }

    // 6. Créer l'historique des changements
    console.log('\n6. Création de l\'historique des changements...');
    
    for (const change of testChanges) {
      try {
        const response = await fetch(`${API_URL}/api/weekly-plan-meal-changes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: change }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Changement enregistré: ${change.changeType} (ID: ${data.data.id})`);
        } else {
          console.log(`⚠️ Erreur lors de l'enregistrement du changement: ${change.changeType}`);
        }
      } catch (error) {
        console.log(`⚠️ Erreur lors de l'enregistrement du changement: ${change.changeType}`);
      }
    }

    console.log('\n🎉 Données de test créées avec succès !');
    console.log('\n📊 Résumé des données créées :');
    console.log(`   - ${recipeIds.length} recettes`);
    console.log(`   - ${planIds.length} plans de semaine`);
    console.log(`   - ${mealIds.length} repas`);
    console.log(`   - ${testAlternatives.length} alternatives`);
    console.log(`   - ${testChanges.length} changements enregistrés`);

    console.log('\n🔗 URLs de test :');
    console.log(`   - Plans de semaine: ${API_URL}/api/weekly-plans?populate=*`);
    console.log(`   - Repas: ${API_URL}/api/weekly-plan-meals?populate=*`);
    console.log(`   - Alternatives: ${API_URL}/api/weekly-plan-meal-alternatives?populate=*`);
    console.log(`   - Changements: ${API_URL}/api/weekly-plan-meal-changes?populate=*`);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que :');
    console.log('   1. Le backend Strapi est démarré');
    console.log('   2. Les tables ont été créées dans Strapi');
    console.log('   3. Les permissions sont configurées');
  }
}

createTestData(); 