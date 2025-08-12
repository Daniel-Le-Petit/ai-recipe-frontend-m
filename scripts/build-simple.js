#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Démarrage du build Next.js...');

// Lancer le build Next.js directement
const buildProcess = spawn('npx', ['next', 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  console.log(`\n🏁 Build terminé avec le code: ${code}`);
  
  if (code === 0) {
    console.log('✅ Build réussi !');
    process.exit(0);
  } else {
    console.log('❌ Build échoué');
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ Erreur lors du build:', error);
  process.exit(1);
});
