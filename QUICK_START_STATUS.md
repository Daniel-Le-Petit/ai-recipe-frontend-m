# Guide de Démarrage Rapide - Système de Statuts

## 🚀 Installation en 5 étapes

### 1. Migration de la base de données (Backend)
```bash
cd backend-js
node run-migration-status.js
```

### 2. Mise à jour des recettes existantes
```bash
cd backend-js
node update-existing-recipes-status.js
```

### 3. Redémarrage de Strapi
```bash
cd backend-js
npm run develop
```

### 4. Vérification des types (Frontend)
```bash
cd frontend-m
npm run build
```

### 5. Test du système
```bash
cd frontend-m
node test-status-system.js
```

## ✅ Vérification

### Dans Strapi Admin
1. Allez sur `http://localhost:1338/admin`
2. Naviguez vers "Content Manager" > "Recipie"
3. Vérifiez que les recettes ont un champ "Status"
4. Créez une nouvelle recette pour tester

### Dans le Frontend
1. Allez sur `http://localhost:3000`
2. Naviguez vers `/recettes` pour voir les badges de statut
3. Allez sur `/admin/recettes` pour l'interface d'administration

## 🔧 Configuration

### Variables d'environnement
```env
# .env.local (frontend-m)
NEXT_PUBLIC_API_URL=http://localhost:1338

# .env (backend-js)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=strapi
```

## 📱 Utilisation

### Pour les utilisateurs
1. **Créer une recette** : Statut automatique "En cours"
2. **Enregistrer** : Passe à "Enregistrée"
3. **Soumettre** : Passe à "Soumise" (en attente de validation)

### Pour les admins
1. **Valider** : Passe de "Soumise" à "Approuvée"
2. **Rejeter** : Passe de "Soumise" à "Rejetée"
3. **Archiver** : Passe de "Complète" à "Archivée"

## 🐛 Dépannage

### Erreur de migration
```bash
# Vérifier la connexion à la base de données
cd backend-js
node -e "console.log(process.env.DATABASE_HOST)"
```

### Erreur de types TypeScript
```bash
# Nettoyer et réinstaller
cd frontend-m
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Recettes sans statut
```bash
# Forcer la mise à jour
cd backend-js
node update-existing-recipes-status.js
```

## 📞 Support

- **Documentation complète** : `STATUS_SYSTEM.md`
- **Tests** : `test-status-system.js`
- **Migration** : `run-migration-status.js`

## 🎯 Prochaines étapes

1. Configurer les permissions utilisateur
2. Ajouter les notifications
3. Intégrer avec le système de commande
4. Personnaliser les workflows par catégorie 