const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

async function testRecipeStateSystem() {
  console.log('🧪 Test du système de recipe_state de recettes...\n');

  try {
    // 1. Créer une nouvelle recette avec recipe_state draft
    console.log('1️⃣ Création d\'une nouvelle recette avec recipe_state draft...');
    const createResponse = await fetch(`${API_URL}/api/recipies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: 'Test Recette RecipeState',
          description: 'Recette de test pour vérifier le système de recipe_state',
          ingredients: ['Ingrédient 1', 'Ingrédient 2'],
          instructions: 'Instructions de test',
          duration: 30,
          difficulty: 'Facile',
          servings: 2,
          recipeState: 'draft'
        }
      })
    });

    if (!createResponse.ok) {
      throw new Error(`Erreur création: ${createResponse.status}`);
    }

    const createdRecipe = await createResponse.json();
    const recipeId = createdRecipe.data.id;
    console.log(`✅ Recette créée avec ID: ${recipeId}, recipe_state: ${createdRecipe.data.attributes.recipeState}`);

    // 2. Tester les transitions de recipe_state
    const recipeStateTransitions = [
      { from: 'draft', to: 'saved' },
      { from: 'saved', to: 'submitted' },
      { from: 'submitted', to: 'approved' },
      { from: 'approved', to: 'ordered' },
      { from: 'ordered', to: 'completed' },
      { from: 'completed', to: 'archived' }
    ];

    for (const transition of recipeStateTransitions) {
      console.log(`\n🔄 Transition: ${transition.from} → ${transition.to}...`);
      
      const updateResponse = await fetch(`${API_URL}/api/recipies/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { recipeState: transition.to }
        })
      });

      if (!updateResponse.ok) {
        throw new Error(`Erreur mise à jour ${transition.to}: ${updateResponse.status}`);
      }

      const updatedRecipe = await updateResponse.json();
      console.log(`✅ Recipe_state mis à jour: ${updatedRecipe.data.attributes.recipeState}`);

      // Vérifier que le recipe_state a bien été mis à jour
      if (updatedRecipe.data.attributes.recipeState !== transition.to) {
        throw new Error(`Recipe_state incorrect: attendu ${transition.to}, reçu ${updatedRecipe.data.attributes.recipeState}`);
      }
    }

    // 3. Tester la récupération par recipe_state
    console.log('\n📋 Test de récupération par recipe_state...');
    const recipeStates = ['draft', 'saved', 'submitted', 'approved', 'ordered', 'completed', 'archived', 'rejected'];
    
    for (const recipeState of recipeStates) {
      const filterResponse = await fetch(`${API_URL}/api/recipies?filters[recipeState][$eq]=${recipeState}&populate=*`);
      
      if (!filterResponse.ok) {
        throw new Error(`Erreur filtrage ${recipeState}: ${filterResponse.status}`);
      }

      const filteredRecipes = await filterResponse.json();
      console.log(`✅ Recettes avec recipe_state "${recipeState}": ${filteredRecipes.data?.length || 0}`);
    }

    // 4. Tester le recipe_state rejeté
    console.log('\n❌ Test du recipe_state rejeté...');
    const rejectResponse = await fetch(`${API_URL}/api/recipies/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { recipeState: 'rejected' }
      })
    });

    if (!rejectResponse.ok) {
      throw new Error(`Erreur rejet: ${rejectResponse.status}`);
    }

    const rejectedRecipe = await rejectResponse.json();
    console.log(`✅ Recette rejetée: ${rejectedRecipe.data.attributes.recipeState}`);

    // 5. Nettoyer - Supprimer la recette de test
    console.log('\n🧹 Nettoyage - Suppression de la recette de test...');
    const deleteResponse = await fetch(`${API_URL}/api/recipies/${recipeId}`, {
      method: 'DELETE'
    });

    if (!deleteResponse.ok) {
      console.log(`⚠️ Erreur suppression: ${deleteResponse.status}`);
    } else {
      console.log('✅ Recette de test supprimée');
    }

    console.log('\n🎉 Tous les tests du système de recipe_state sont passés avec succès !');
    console.log('\n📊 Résumé des fonctionnalités testées:');
    console.log('   ✅ Création de recette avec recipe_state initial');
    console.log('   ✅ Transitions de recipe_state (draft → saved → submitted → approved → ordered → completed → archived)');
    console.log('   ✅ Recipe_state rejeté');
    console.log('   ✅ Filtrage par recipe_state');
    console.log('   ✅ Mise à jour de recipe_state');

  } catch (error) {
    console.error('\n❌ Erreur lors des tests:', error.message);
    process.exit(1);
  }
}

// Exécuter les tests
testRecipeStateSystem(); 