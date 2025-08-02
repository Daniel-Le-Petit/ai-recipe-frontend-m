export const mockCategories = [
  {
    id: 1,
    categoryName: "Entrées",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    categoryName: "Plats",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 3,
    categoryName: "Desserts",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

export const mockRecipes = [
  {
    id: 1,
    title: "Salade César",
    description: "Une salade fraîche et croquante avec une vinaigrette maison",
    duration: 15,
    servings: 2,
    difficulty: "Facile",
    isRobotCompatible: true,
    recipieCategory: {
      id: 1,
      categoryName: "Entrées"
    },
    image: "/Images/fallback-recipe.jpg"
  },
  {
    id: 2,
    title: "Poulet rôti aux herbes",
    description: "Poulet rôti avec des herbes fraîches et des légumes",
    duration: 45,
    servings: 4,
    difficulty: "Intermédiaire",
    isRobotCompatible: false,
    recipieCategory: {
      id: 2,
      categoryName: "Plats"
    },
    image: "/Images/fallback-recipe.jpg"
  },
  {
    id: 3,
    title: "Tiramisu classique",
    description: "Dessert italien crémeux au café et mascarpone",
    duration: 30,
    servings: 6,
    difficulty: "Difficile",
    isRobotCompatible: true,
    recipieCategory: {
      id: 3,
      categoryName: "Desserts"
    },
    image: "/Images/fallback-recipe.jpg"
  }
]; 