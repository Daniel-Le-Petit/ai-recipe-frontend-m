const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

const sampleRecipes = [
  {
    title: "Poulet rôti aux herbes de Provence",
    description: "Un délicieux poulet rôti parfumé aux herbes de Provence, parfait pour un repas familial.",
    instructions: "1. Préchauffer le four à 180°C\n2. Laver et sécher le poulet\n3. Assaisonner avec sel, poivre et herbes de Provence\n4. Badigeonner d'huile d'olive\n5. Enfourner 45 minutes\n6. Laisser reposer 10 minutes avant de servir",
    ingredients: [
      { name: "Poulet entier", quantity: "1.5 kg" },
      { name: "Herbes de Provence", quantity: "2 cuillères à soupe" },
      { name: "Huile d'olive", quantity: "3 cuillères à soupe" },
      { name: "Sel", quantity: "1 cuillère à café" },
      { name: "Poivre noir", quantity: "1/2 cuillère à café" }
    ],
    recipeState: "approved"
  },
  {
    title: "Salade César authentique",
    description: "Une salade César traditionnelle avec une vinaigrette crémeuse et des croûtons maison.",
    instructions: "1. Préparer la vinaigrette : mélanger mayonnaise, parmesan, jus de citron, ail et anchois\n2. Laver et couper la laitue romaine\n3. Préparer les croûtons : couper du pain en cubes et les faire dorer à la poêle\n4. Mélanger tous les ingrédients\n5. Saupoudrer de parmesan frais",
    ingredients: [
      { name: "Laitue romaine", quantity: "2 têtes" },
      { name: "Parmesan râpé", quantity: "100g" },
      { name: "Croûtons", quantity: "150g" },
      { name: "Mayonnaise", quantity: "3 cuillères à soupe" },
      { name: "Jus de citron", quantity: "1 cuillère à soupe" },
      { name: "Ail", quantity: "2 gousses" }
    ],
    recipeState: "approved"
  },
  {
    title: "Tarte aux pommes traditionnelle",
    description: "Une tarte aux pommes classique avec une pâte brisée maison et des pommes caramélisées.",
    instructions: "1. Préparer la pâte brisée et la laisser reposer 30 minutes\n2. Éplucher et couper les pommes en lamelles\n3. Étaler la pâte dans un moule à tarte\n4. Disposer les pommes en rosace\n5. Saupoudrer de sucre et de cannelle\n6. Cuire 30 minutes à 180°C",
    ingredients: [
      { name: "Pommes Golden", quantity: "6" },
      { name: "Pâte brisée", quantity: "1" },
      { name: "Sucre", quantity: "100g" },
      { name: "Cannelle", quantity: "1 cuillère à café" },
      { name: "Beurre", quantity: "50g" }
    ],
    recipeState: "submitted"
  },
  {
    title: "Risotto aux champignons",
    description: "Un risotto crémeux aux champignons de Paris, parfait pour un repas végétarien.",
    instructions: "1. Faire revenir les échalotes dans l'huile d'olive\n2. Ajouter le riz et le faire nacrer\n3. Verser le vin blanc et laisser absorber\n4. Ajouter progressivement le bouillon chaud\n5. Incorporer les champignons et le parmesan\n6. Laisser reposer 2 minutes avant de servir",
    ingredients: [
      { name: "Riz Arborio", quantity: "300g" },
      { name: "Champignons de Paris", quantity: "400g" },
      { name: "Bouillon de légumes", quantity: "1L" },
      { name: "Parmesan", quantity: "80g" },
      { name: "Vin blanc sec", quantity: "100ml" },
      { name: "Échalotes", quantity: "2" }
    ],
    recipeState: "draft"
  },
  {
    title: "Soupe à l'oignon gratinée",
    description: "Une soupe à l'oignon traditionnelle avec du fromage gratiné, réconfortante et savoureuse.",
    instructions: "1. Émincer finement les oignons\n2. Les faire caraméliser à feu doux 30 minutes\n3. Ajouter le bouillon et laisser mijoter 20 minutes\n4. Préchauffer le four à 200°C\n5. Verser la soupe dans des bols à gratin\n6. Couvrir de fromage râpé et gratiner 10 minutes",
    ingredients: [
      { name: "Oignons", quantity: "1kg" },
      { name: "Bouillon de bœuf", quantity: "1.5L" },
      { name: "Fromage râpé", quantity: "200g" },
      { name: "Beurre", quantity: "50g" },
      { name: "Pain de campagne", quantity: "4 tranches" }
    ],
    recipeState: "saved"
  }
];

async function fixExistingRecipes() {
  console.log('🔧 Correction des recettes existantes...\n');

  try {
    // Test de connectivité
    console.log('1. Test de connectivité...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      throw new Error('API non accessible');
    }
    console.log('✅ API accessible');

    // Récupérer les recettes existantes
    console.log('\n2. Récupération des recettes existantes...');
    const existingRecipesResponse = await fetch(`${API_URL}/api/recipies?populate=*&sort=createdAt:desc`);
    const existingRecipesData = await existingRecipesResponse.json();
    
    console.log(`📊 Recettes existantes: ${existingRecipesData.data?.length || 0}`);

    // Supprimer les recettes existantes qui n'ont pas de titre
    if (existingRecipesData.data && existingRecipesData.data.length > 0) {
      console.log('\n3. Nettoyage des recettes incomplètes...');
      let deletedCount = 0;
      
      for (const recipe of existingRecipesData.data) {
        if (!recipe.attributes?.title || recipe.attributes.title === 'Sans titre') {
          console.log(`   Suppression de la recette ${recipe.id} (sans titre)`);
          
          const deleteResponse = await fetch(`${API_URL}/api/recipies/${recipe.id}`, {
            method: 'DELETE'
          });
          
          if (deleteResponse.ok) {
            deletedCount++;
            console.log(`   ✅ Recette ${recipe.id} supprimée`);
          } else {
            console.log(`   ❌ Erreur lors de la suppression de ${recipe.id}`);
          }
        }
      }
      
      console.log(`   ${deletedCount} recette(s) supprimée(s)`);
    }

    // Créer de nouvelles recettes complètes
    console.log('\n4. Création de nouvelles recettes complètes...');
    let createdCount = 0;
    
    for (const recipeData of sampleRecipes) {
      console.log(`   Création: ${recipeData.title}`);
      
      const createResponse = await fetch(`${API_URL}/api/recipies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: recipeData
        })
      });

      if (createResponse.ok) {
        const result = await createResponse.json();
        console.log(`   ✅ Recette créée avec l'ID: ${result.data.id}`);
        createdCount++;
      } else {
        console.log(`   ❌ Erreur lors de la création: ${createResponse.status}`);
      }
    }

    // Vérifier le résultat final
    console.log('\n5. Vérification du résultat...');
    const finalRecipesResponse = await fetch(`${API_URL}/api/recipies?populate=*&sort=createdAt:desc`);
    const finalRecipesData = await finalRecipesResponse.json();
    
    console.log(`📊 Total final: ${finalRecipesData.data?.length || 0} recettes`);
    
    if (finalRecipesData.data && finalRecipesData.data.length > 0) {
      console.log('\n📋 Recettes finales:');
      finalRecipesData.data.forEach((recipe, index) => {
        console.log(`${index + 1}. "${recipe.attributes?.title}" (ID: ${recipe.id})`);
        console.log(`   Statut: ${recipe.attributes?.recipeState || 'Non défini'}`);
        console.log(`   Ingrédients: ${recipe.attributes?.ingredients?.length || 0}`);
      });
    }

    console.log('\n🎉 Correction terminée!');
    console.log(`✅ ${createdCount} nouvelle(s) recette(s) créée(s)`);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que le backend Strapi est démarré avec:');
    console.log('   cd backend-js && npm run develop');
  }
}

// Exécuter le script
fixExistingRecipes(); 