const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

async function checkRecipes() {
  try {
    console.log('🔍 Vérification des recettes dans la base de données...\n');
    
    // Récupérer toutes les recettes
    const response = await fetch(`${API_URL}/api/recipies?populate=*&sort=id:asc`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const recipes = data.data || [];
    
    console.log(`📊 Nombre total de recettes: ${recipes.length}\n`);
    
    if (recipes.length === 0) {
      console.log('❌ Aucune recette trouvée dans la base de données');
      return;
    }
    
    // Afficher les 10 premières recettes
    console.log('📋 Premières recettes:');
    recipes.slice(0, 10).forEach(recipe => {
      console.log(`  ID: ${recipe.id} | Titre: "${recipe.attributes?.title || 'Sans titre'}" | Statut: ${recipe.attributes?.recipeState || 'Non défini'}`);
    });
    
    if (recipes.length > 10) {
      console.log(`  ... et ${recipes.length - 10} autres recettes`);
    }
    
    // Vérifier si la recette 100 existe
    const recipe100 = recipes.find(r => r.id === 100);
    if (recipe100) {
      console.log('\n✅ Recette 100 trouvée:');
      console.log(`  Titre: "${recipe100.attributes?.title || 'Sans titre'}"`);
      console.log(`  Statut: ${recipe100.attributes?.recipeState || 'Non défini'}`);
      console.log(`  Créée le: ${recipe100.attributes?.createdAt || 'Date inconnue'}`);
    } else {
      console.log('\n❌ Recette 100 non trouvée');
      console.log('IDs disponibles:', recipes.map(r => r.id).join(', '));
    }
    
    // Statistiques par statut
    const statusCount = {};
    recipes.forEach(recipe => {
      const status = recipe.attributes?.recipeState || 'Non défini';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    console.log('\n📈 Statistiques par statut:');
    Object.entries(statusCount).forEach(([status, count]) => {
      console.log(`  ${status}: ${count} recette(s)`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  }
}

checkRecipes(); 