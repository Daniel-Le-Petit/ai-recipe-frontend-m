const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

const testRecipes = [
  {
    title: "Poulet rôti aux herbes",
    description: "Un délicieux poulet rôti avec des herbes fraîches",
    instructions: "1. Préchauffer le four à 180°C\n2. Assaisonner le poulet\n3. Cuire 45 minutes",
    ingredients: [
      { name: "Poulet", quantity: "1 kg" },
      { name: "Herbes de Provence", quantity: "2 cuillères" },
      { name: "Huile d'olive", quantity: "3 cuillères" }
    ],
    recipeState: "submitted"
  },
  {
    title: "Salade César",
    description: "Une salade fraîche et croquante",
    instructions: "1. Laver la laitue\n2. Préparer la vinaigrette\n3. Mélanger les ingrédients",
    ingredients: [
      { name: "Laitue romaine", quantity: "1 tête" },
      { name: "Parmesan", quantity: "50g" },
      { name: "Croûtons", quantity: "100g" }
    ],
    recipeState: "approved"
  },
  {
    title: "Tarte aux pommes",
    description: "Une tarte traditionnelle aux pommes",
    instructions: "1. Préparer la pâte\n2. Éplucher les pommes\n3. Cuire 30 minutes",
    ingredients: [
      { name: "Pommes", quantity: "6" },
      { name: "Pâte brisée", quantity: "1" },
      { name: "Sucre", quantity: "100g" }
    ],
    recipeState: "draft"
  }
];

async function createTestRecipes() {
  console.log('🍳 Création de recettes de test...\n');

  try {
    // Test de connectivité
    console.log('1. Test de connectivité...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      throw new Error('API non accessible');
    }
    console.log('✅ API accessible');

    // Créer les recettes de test
    console.log('\n2. Création des recettes...');
    for (let i = 0; i < testRecipes.length; i++) {
      const recipe = testRecipes[i];
      console.log(`Création: ${recipe.title}`);
      
      const response = await fetch(`${API_URL}/api/recipies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: recipe
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Recette créée avec l'ID: ${result.data.id}`);
      } else {
        console.log(`❌ Erreur lors de la création: ${response.status}`);
      }
    }

    // Vérifier les recettes créées
    console.log('\n3. Vérification des recettes...');
    const allRecipesResponse = await fetch(`${API_URL}/api/recipies?populate=*`);
    const allRecipesData = await allRecipesResponse.json();
    
    console.log(`📊 Total des recettes: ${allRecipesData.data?.length || 0}`);
    
    if (allRecipesData.data && allRecipesData.data.length > 0) {
      console.log('\n📋 Recettes dans la base:');
      allRecipesData.data.forEach((recipe, index) => {
        console.log(`${index + 1}. ${recipe.attributes?.title || 'Sans titre'} (ID: ${recipe.id})`);
        console.log(`   Statut: ${recipe.attributes?.recipeState || 'Non défini'}`);
      });
    }

    console.log('\n🎉 Création terminée!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que le backend Strapi est démarré avec:');
    console.log('   cd backend-js && npm run develop');
  }
}

// Exécuter le script
createTestRecipes(); 