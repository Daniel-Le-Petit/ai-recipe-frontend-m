#!/usr/bin/env node

const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function testPage(url, description) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const success = res.statusCode === 200;
        console.log(`${success ? '✅' : '❌'} ${description}`);
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   URL: ${url}`);
        if (!success) {
          console.log(`   Erreur: ${res.statusMessage}`);
        }
        console.log('');
        resolve(success);
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${description}`);
      console.log(`   Erreur: ${err.message}`);
      console.log(`   URL: ${url}`);
      console.log('');
      resolve(false);
    });

    req.setTimeout(5000, () => {
      console.log(`⏰ ${description} - Timeout`);
      console.log(`   URL: ${url}`);
      console.log('');
      req.destroy();
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('🧪 Test des pages locales...\n');

  const tests = [
    { url: `${BASE_URL}/plan-semaine`, description: 'Page principale plan de semaine' },
    { url: `${BASE_URL}/plan-semaine/voir`, description: 'Page visualisation plan de semaine' },
    { url: `${BASE_URL}/`, description: 'Page d\'accueil' },
    { url: `${BASE_URL}/recettes`, description: 'Page recettes' }
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    const success = await testPage(test.url, test.description);
    if (success) passed++;
  }

  console.log(`📊 Résultats: ${passed}/${total} tests réussis`);
  
  if (passed === total) {
    console.log('🎉 Toutes les pages fonctionnent correctement !');
  } else {
    console.log('⚠️  Certaines pages ont des problèmes.');
    console.log('💡 Vérifiez que le serveur de développement est démarré avec: npm run dev');
  }
}

// Vérifier si le serveur est démarré
console.log('🔍 Vérification du serveur de développement...\n');

runTests().catch(console.error); 