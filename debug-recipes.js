const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

async function debugRecipes() {
  console.log('🔍 Débogage des recettes existantes...\n');

  try {
    // Test de connectivité
    console.log('1. Test de connectivité...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      throw new Error('API non accessible');
    }
    console.log('✅ API accessible');

    // Récupérer toutes les recettes
    console.log('\n2. Récupération de toutes les recettes...');
    const allRecipesResponse = await fetch(`${API_URL}/api/recipies?populate=*&sort=createdAt:desc`);
    const allRecipesData = await allRecipesResponse.json();
    
    console.log(`📊 Total des recettes: ${allRecipesData.data?.length || 0}`);
    
    if (allRecipesData.data && allRecipesData.data.length > 0) {
      console.log('\n📋 Détail des recettes:');
      allRecipesData.data.forEach((recipe, index) => {
        console.log(`\n${index + 1}. Recette ID: ${recipe.id}`);
        console.log('   Titre:', recipe.attributes?.title || '❌ Non défini');
        console.log('   Description:', recipe.attributes?.description || '❌ Non défini');
        console.log('   Instructions:', recipe.attributes?.instructions || '❌ Non défini');
        console.log('   Statut:', recipe.attributes?.recipeState || '❌ Non défini');
        console.log('   Créée:', recipe.attributes?.createdAt ? new Date(recipe.attributes.createdAt).toLocaleDateString('fr-FR') : '❌ Date inconnue');
        console.log('   Auteur:', recipe.attributes?.author?.data?.attributes?.username || '❌ Anonyme');
        
        if (recipe.attributes?.ingredients) {
          console.log('   Ingrédients:', recipe.attributes.ingredients.length, 'ingrédient(s)');
          recipe.attributes.ingredients.forEach((ing, i) => {
            console.log(`     ${i + 1}. ${ing.name || 'Sans nom'} (${ing.quantity || 'quantité non spécifiée'})`);
          });
        } else {
          console.log('   Ingrédients: ❌ Aucun ingrédient');
        }
        
        console.log('   Toutes les propriétés:', Object.keys(recipe.attributes || {}));
      });
    } else {
      console.log('⚠️  Aucune recette trouvée dans la base de données');
    }

    // Vérifier les recettes par statut
    console.log('\n3. Vérification par statut...');
    const statuses = ['draft', 'saved', 'submitted', 'approved', 'rejected', 'ordered', 'completed', 'archived'];
    
    for (const status of statuses) {
      const statusResponse = await fetch(`${API_URL}/api/recipies?filters[recipeState][$eq]=${status}&populate=*`);
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        const count = statusData.data?.length || 0;
        console.log(`   ${status}: ${count} recette(s)`);
        
        if (count > 0) {
          statusData.data.forEach((recipe, index) => {
            console.log(`     ${index + 1}. ID: ${recipe.id} - "${recipe.attributes?.title || 'Sans titre'}"`);
          });
        }
      }
    }

    console.log('\n🎉 Débogage terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que le backend Strapi est démarré avec:');
    console.log('   cd backend-js && npm run develop');
  }
}

// Exécuter le script
debugRecipes(); 