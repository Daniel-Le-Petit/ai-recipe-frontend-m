const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

async function setupAdminRole() {
  console.log('👑 Configuration du rôle Admin...\n');

  try {
    // Test de connectivité
    console.log('1. Test de connectivité...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      throw new Error('API non accessible');
    }
    console.log('✅ API accessible');

    // Note: La création de rôles via API nécessite des permissions spéciales
    // Cette configuration doit être faite manuellement dans l'interface Strapi
    
    console.log('\n2. Instructions pour configurer le rôle Admin :');
    console.log('📋 Étapes à suivre dans l\'interface Strapi :');
    console.log('');
    console.log('   1. Ouvrir http://localhost:1338/admin');
    console.log('   2. Aller dans Settings → Users & Permissions plugin → Roles');
    console.log('   3. Cliquer sur "Add new role"');
    console.log('   4. Nom: "Admin"');
    console.log('   5. Description: "Administrator role with full access"');
    console.log('   6. Permissions: Cocher toutes les permissions nécessaires');
    console.log('   7. Sauvegarder');
    console.log('');
    console.log('   8. Aller dans Content Manager → User → Users');
    console.log('   9. Sélectionner l\'utilisateur dlepetit@hotmail.fr');
    console.log('   10. Changer le Role de "Authenticated" à "Admin"');
    console.log('   11. Sauvegarder');
    console.log('');

    // Vérifier les rôles existants
    console.log('3. Vérification des rôles existants...');
    const rolesResponse = await fetch(`${API_URL}/api/users-permissions/roles`);
    if (rolesResponse.ok) {
      const rolesData = await rolesResponse.json();
      console.log('📊 Rôles disponibles:');
      rolesData.roles.forEach(role => {
        console.log(`   - ${role.name} (${role.description})`);
      });
    }

    // Vérifier l'utilisateur admin
    console.log('\n4. Vérification de l\'utilisateur admin...');
    const usersResponse = await fetch(`${API_URL}/api/users?populate=*`);
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      console.log('👤 Utilisateurs:');
      usersData.data.forEach(user => {
        console.log(`   - ${user.attributes?.username} (${user.attributes?.email})`);
        console.log(`     Role: ${user.attributes?.role?.data?.attributes?.name || 'Non défini'}`);
        console.log(`     IsAdmin: ${user.attributes?.isAdmin || false}`);
      });
    }

    console.log('\n🎉 Instructions terminées!');
    console.log('💡 Après avoir configuré le rôle Admin, redémarrez le frontend et testez.');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que le backend Strapi est démarré avec:');
    console.log('   cd backend-js && npm run develop');
  }
}

// Exécuter le script
setupAdminRole(); 