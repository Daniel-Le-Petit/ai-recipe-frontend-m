#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Test Rapide - AI et Fines Herbes\n');

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n${colors.yellow}Exécution: ${description}${colors.reset}`);
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    log(`${colors.green}✅ ${description} réussi${colors.reset}`);
    return { success: true, output };
  } catch (error) {
    log(`${colors.red}❌ ${description} échoué${colors.reset}`);
    log(`Erreur: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function quickTest() {
  logSection('Vérification de l\'environnement');
  
  // Vérifier Node.js
  const nodeVersion = process.version;
  log(`Node.js version: ${nodeVersion}`);
  
  // Vérifier npm
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    log(`npm version: ${npmVersion}`);
  } catch (error) {
    log('npm non disponible', 'red');
  }
  
  logSection('Vérification de la configuration');
  
  // Vérifier les fichiers essentiels
  const essentialFiles = [
    'package.json',
    'render.yaml',
    'env.example',
    'src/app/plan-semaine/page.tsx',
    'src/app/plan-semaine/voir/page.tsx'
  ];
  
  essentialFiles.forEach(file => {
    const exists = fs.existsSync(path.join(process.cwd(), file));
    log(`${exists ? '✅' : '❌'} ${file}`, exists ? 'green' : 'red');
  });
  
  logSection('Installation des dépendances');
  
  // Installer les dépendances si node_modules n'existe pas
  if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
    runCommand('npm install', 'Installation des dépendances');
  } else {
    log('✅ Dépendances déjà installées', 'green');
  }
  
  logSection('Test de build');
  
  // Test de build
  const buildResult = runCommand('npm run build', 'Build de production');
  
  if (!buildResult.success) {
    log('⚠️  Le build a échoué, mais continuons les tests...', 'yellow');
  }
  
  logSection('Test de configuration Render');
  
  // Vérifier la configuration Render
  try {
    const renderYaml = fs.readFileSync('render.yaml', 'utf8');
    const hasApiUrl = renderYaml.includes('https://aifb-backend.onrender.com');
    log(`${hasApiUrl ? '✅' : '❌'} URL API backend configurée`, hasApiUrl ? 'green' : 'red');
    
    const hasEnvVars = renderYaml.includes('NEXT_PUBLIC_API_URL') && 
                      renderYaml.includes('API_BASE_URL');
    log(`${hasEnvVars ? '✅' : '❌'} Variables d\'environnement configurées`, hasEnvVars ? 'green' : 'red');
  } catch (error) {
    log('❌ Erreur lors de la vérification de render.yaml', 'red');
  }
  
  logSection('Test de connectivité backend');
  
  // Test simple de connectivité (sans fetch pour éviter les problèmes de module)
  log('🌐 Test de connectivité vers le backend...', 'yellow');
  log('   URL: https://aifb-backend.onrender.com', 'blue');
  log('   Note: Utilisez curl ou votre navigateur pour tester manuellement', 'yellow');
  
  logSection('Résumé et recommandations');
  
  log('\n📋 Actions recommandées:', 'bold');
  log('1. Démarrer le serveur de développement:', 'blue');
  log('   npm run dev', 'yellow');
  log('');
  log('2. Tester les pages dans votre navigateur:', 'blue');
  log('   http://localhost:3000/plan-semaine', 'yellow');
  log('   http://localhost:3000/plan-semaine/voir', 'yellow');
  log('');
  log('3. Vérifier les variables d\'environnement sur Render:', 'blue');
  log('   Dashboard Render → Service backend → Environment', 'yellow');
  log('');
  log('4. Consulter les logs Render:', 'blue');
  log('   Dashboard Render → Service backend → Logs', 'yellow');
  
  log('\n🎯 Prochaines étapes:', 'bold');
  log('• Si le build échoue: Vérifier les erreurs et corriger', 'yellow');
  log('• Si les pages ne se chargent pas: Vérifier le serveur de développement', 'yellow');
  log('• Si le backend ne répond pas: Vérifier la configuration PostgreSQL', 'yellow');
  
  log('\n✨ Test rapide terminé !', 'green');
}

// Exécuter le test rapide
quickTest().catch(error => {
  log(`\n❌ Erreur lors du test: ${error.message}`, 'red');
  process.exit(1);
}); 