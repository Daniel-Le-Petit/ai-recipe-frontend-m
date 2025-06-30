const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

console.log('🔍 Test de l\'API Admin');
console.log('URL API:', API_URL);

// Test simple avec fetch
fetch(`${API_URL}/api/recipie?populate=*`)
  .then(response => {
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    return response.json();
  })
  .then(data => {
    console.log('✅ Succès - Nombre de recettes:', data.data?.length || 0);
  })
  .catch(error => {
    console.error('❌ Erreur:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez que le backend Strapi est démarré');
    console.log('2. Vérifiez l\'URL de l\'API:', API_URL);
    console.log('3. Vérifiez les variables d\'environnement');
  }); 