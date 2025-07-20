import React from "react";
import FallbackImage from "./FallbackImage";
import { useRouter } from "next/navigation";

export default function RecipeCardCarousel({ recipe, categoryId }) {
  const router = useRouter();

  // Icônes à personnaliser selon ta charte
  const statusIcon = <span>🟢</span>; // À remplacer par une vraie icône
  const robotIcon = recipe.isRobotCompatible ? <span>🤖</span> : null;

  // Redirection avec catégorie à l’étape 3
  const handleClick = () => {
    router.push(`/creer-recette?step=3&category=${categoryId}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg flex flex-col cursor-pointer h-72 w-56 mr-4"
      onClick={handleClick}
      style={{ minWidth: "14rem", maxWidth: "14rem", position: 'relative' }}
    >
      <div className="relative z-10" style={{ flex: "5 0 0", marginTop: '-1.5rem' }}>
        <FallbackImage
          src={recipe.image?.url}
          alt={recipe.title}
          className="object-cover w-full h-[12rem] rounded-xl shadow-lg border-4 border-white"
          style={{ height: "12rem", maxHeight: '12rem', margin: '0 auto', display: 'block' }}
        />
        <div className="absolute top-2 right-2 flex items-center gap-1">
          {statusIcon}
          <span className="text-xs bg-white rounded px-1">{recipe.recipeState}</span>
          {robotIcon}
          {recipe.isRobotCompatible && <span className="text-xs bg-white rounded px-1">Robot</span>}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-2" style={{ flex: "2 0 0" }}>
        <div className="font-bold text-black truncate">{recipe.title}</div>
        <div className="text-xs text-black mt-1">
          {recipe.duration ? `${recipe.duration} min` : ""} • {recipe.servings || 1} pers. • {recipe.difficulty} • {recipe.rating ? `⭐${recipe.rating}` : ""}
        </div>
      </div>
    </div>
  );
} 