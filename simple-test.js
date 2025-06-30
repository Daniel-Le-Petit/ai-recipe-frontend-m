const http = require('http');

console.log('🧪 Test simple des pages frontend...\n');

const tests = [
  { url: 'http://localhost:3000/plan-semaine', name: 'Page plan de semaine' },
  { url: 'http://localhost:3000/plan-semaine/voir', name: 'Page visualisation' },
  { url: 'http://localhost:3000/', name: 'Page d\'accueil' }
];

async function testPage(url, name) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      console.log(`✅ ${name} - Status: ${res.statusCode}`);
      resolve(true);
    });

    req.on('error', (err) => {
      console.log(`❌ ${name} - Erreur: ${err.message}`);
      resolve(false);
    });

    req.setTimeout(3000, () => {
      console.log(`⏰ ${name} - Timeout`);
      req.destroy();
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('🔍 Test des pages avec le serveur Next.js...\n');
  
  let success = 0;
  for (const test of tests) {
    const result = await testPage(test.url, test.name);
    if (result) success++;
  }
  
  console.log(`\n📊 Résultats: ${success}/${tests.length} pages accessibles`);
  
  if (success === tests.length) {
    console.log('🎉 Toutes les pages fonctionnent !');
    console.log('\n💡 Vous pouvez maintenant tester dans votre navigateur :');
    console.log('   http://localhost:3000/plan-semaine');
    console.log('   http://localhost:3000/plan-semaine/voir');
  } else {
    console.log('⚠️  Certaines pages ont des problèmes.');
    console.log('💡 Vérifiez que le serveur Next.js est démarré avec: npm run dev');
  }
}

runTests(); 