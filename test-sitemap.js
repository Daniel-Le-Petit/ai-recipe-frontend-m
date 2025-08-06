const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

async function testSitemap() {
  console.log('🧪 Test du sitemap...\n');

  try {
    // Test de connectivité API
    console.log('1. Test de connectivité API...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      console.log('⚠️ API non accessible, le sitemap utilisera les pages statiques uniquement');
    } else {
      console.log('✅ API accessible');
    }

    // Test des recettes
    console.log('\n2. Test des recettes...');
    try {
      const recipesResponse = await fetch(`${API_URL}/api/recipies?populate=*`);
      if (recipesResponse.ok) {
        const recipesData = await recipesResponse.json();
        console.log(`✅ ${recipesData.data?.length || 0} recettes trouvées`);
        
        // Vérifier les propriétés des recettes
        if (recipesData.data && recipesData.data.length > 0) {
          const firstRecipe = recipesData.data[0];
          console.log('📋 Propriétés de la première recette:');
          console.log(`   - ID: ${firstRecipe.id}`);
          console.log(`   - Titre: ${firstRecipe.attributes?.title || 'N/A'}`);
          console.log(`   - updatedAt: ${firstRecipe.attributes?.updatedAt || 'N/A'}`);
          console.log(`   - publishedAt: ${firstRecipe.attributes?.publishedAt || 'N/A'}`);
        }
      } else {
        console.log('⚠️ Erreur lors de la récupération des recettes');
      }
    } catch (error) {
      console.log('⚠️ Erreur lors du test des recettes:', error.message);
    }

    // Test des catégories
    console.log('\n3. Test des catégories...');
    try {
      const categoriesResponse = await fetch(`${API_URL}/api/recipie-categories?populate=*`);
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        console.log(`✅ ${categoriesData.data?.length || 0} catégories trouvées`);
        
        // Vérifier les propriétés des catégories
        if (categoriesData.data && categoriesData.data.length > 0) {
          const firstCategory = categoriesData.data[0];
          console.log('📋 Propriétés de la première catégorie:');
          console.log(`   - ID: ${firstCategory.id}`);
          console.log(`   - Nom: ${firstCategory.attributes?.categoryName || 'N/A'}`);
          console.log(`   - updatedAt: ${firstCategory.attributes?.updatedAt || 'N/A'}`);
        }
      } else {
        console.log('⚠️ Erreur lors de la récupération des catégories');
      }
    } catch (error) {
      console.log('⚠️ Erreur lors du test des catégories:', error.message);
    }

    // Test du sitemap généré
    console.log('\n4. Test du sitemap généré...');
    try {
      const sitemapResponse = await fetch('http://localhost:3000/sitemap.xml');
      if (sitemapResponse.ok) {
        const sitemapContent = await sitemapResponse.text();
        console.log('✅ Sitemap accessible');
        console.log(`📏 Taille du sitemap: ${sitemapContent.length} caractères`);
        
        // Compter les URLs
        const urlMatches = sitemapContent.match(/<loc>/g);
        const urlCount = urlMatches ? urlMatches.length : 0;
        console.log(`🔗 Nombre d'URLs dans le sitemap: ${urlCount}`);
        
        // Afficher les premières URLs
        const urlRegex = /<loc>(.*?)<\/loc>/g;
        const urls = [];
        let match;
        while ((match = urlRegex.exec(sitemapContent)) !== null && urls.length < 5) {
          urls.push(match[1]);
        }
        
        console.log('📋 Premières URLs du sitemap:');
        urls.forEach((url, index) => {
          console.log(`   ${index + 1}. ${url}`);
        });
      } else {
        console.log('❌ Erreur lors de l\'accès au sitemap');
      }
    } catch (error) {
      console.log('⚠️ Erreur lors du test du sitemap:', error.message);
      console.log('💡 Assurez-vous que le serveur Next.js est démarré (npm run dev)');
    }

    console.log('\n🎉 Test terminé !');
    console.log('\n💡 Si des erreurs apparaissent, le sitemap utilisera les pages statiques uniquement.');

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

testSitemap(); 