import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addWeeks, subWeeks, startOfWeek, addDays, isToday } from "date-fns";
import fr from "date-fns/locale/fr";

const mockData = [
  {
    date: "2025-07-21",
    meals: [
      {
        type: "Petit-déjeuner",
        title: "Bowl de granola et fruits",
        duration: "10 min",
        persons: 2,
        note: 4.7,
        tags: ["Végétarien", "Sain", "Rapide"],
        ingredients: ["Céréales", "Fruits", "Lait"],
      },
      {
        type: "Déjeuner",
        title: "Salade de quinoa 🥗",
        duration: "20 min",
        persons: 2,
        note: 4.5,
        tags: ["Végétarien", "Sain"],
        ingredients: ["Quinoa", "Avocat", "Tomates"],
      },
      {
        type: "Dîner",
        title: "Poulet rôti & légumes",
        duration: "35 min",
        persons: 4,
        note: 4.8,
        tags: ["Rapide"],
        ingredients: ["Poulet", "Carottes", "Pommes de terre"],
      },
    ],
  },
  // ...6 autres jours mockés (à dupliquer pour la démo)
];

const daysOfWeek = [
  { short: "Lun", idx: 1 },
  { short: "Mar", idx: 2 },
  { short: "Mer", idx: 3 },
  { short: "Jeu", idx: 4 },
  { short: "Ven", idx: 5 },
  { short: "Sam", idx: 6 },
  { short: "Dim", idx: 0 },
];

function getWeekDates(baseDate) {
  const start = startOfWeek(baseDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export default function WeeklyMealPlanner() {
  const [weekStart, setWeekStart] = useState(new Date("2025-07-21"));
  const [selectedDay, setSelectedDay] = useState(0); // 0 = lundi
  const weekDates = getWeekDates(weekStart);

  // Pour la démo, on duplique les mockData pour chaque jour
  const weekMeals = weekDates.map((date, i) => ({
    date: format(date, "yyyy-MM-dd"),
    meals: mockData[0].meals.map((meal) => ({
      ...meal,
      title: meal.title + (i === 0 ? "" : ` (${daysOfWeek[i].short})`),
    })),
  }));

  const handlePrevWeek = () => setWeekStart((d) => subWeeks(d, 1));
  const handleNextWeek = () => setWeekStart((d) => addWeeks(d, 1));
  const handleToday = () => {
    const today = new Date();
    setWeekStart(startOfWeek(today, { weekStartsOn: 1 }));
    setSelectedDay(today.getDay() === 0 ? 6 : today.getDay() - 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8">
      {/* Barre des jours */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevWeek}
          className="p-2 rounded-full hover:bg-gray-100 text-xl"
          aria-label="Semaine précédente"
        >
          ←
        </button>
        <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="flex min-w-[500px] sm:min-w-0 justify-between bg-white rounded-xl border border-green-200 p-2 shadow-sm">
            {weekDates.map((date, i) => {
              const isSelected = selectedDay === i;
              const isCurrent = isToday(date);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`flex flex-col items-center px-2 py-1 rounded-lg transition
                    ${isSelected ? "bg-green-100 font-bold text-green-700" : ""}
                    ${isCurrent && !isSelected ? "text-green-600" : ""}
                    hover:bg-green-50`}
                >
                  <span className="text-xs">{daysOfWeek[i].short}</span>
                  <span className="text-sm">{format(date, "dd/MM")}</span>
                  {isCurrent && !isSelected && (
                    <span className="text-[10px] text-green-600 font-semibold">Aujourd’hui</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleNextWeek}
          className="p-2 rounded-full hover:bg-gray-100 text-xl"
          aria-label="Semaine suivante"
        >
          →
        </button>
      </div>
      <div className="flex justify-end mb-2">
        <button
          onClick={handleToday}
          className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition"
        >
          Aujourd’hui
        </button>
      </div>
      {/* Affichage des repas du jour */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
        >
          {weekMeals[selectedDay].meals.map((meal, idx) => (
            <motion.div
              key={meal.type}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-green-50 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-green-700">{meal.type}</span>
                  <span className="text-xs text-gray-400">{meal.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-1">
                  <span>⏱️ {meal.duration}</span>
                  <span>👥 {meal.persons} pers.</span>
                  <span>⭐ {meal.note}</span>
                  {meal.tags.map((tag) => (
                    <span key={tag} className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2 text-lg mb-2">
                  {meal.ingredients.slice(0, 3).map((ing, i) => (
                    <span key={i}>
                      {ing === "Quinoa" && "🍚"}
                      {ing === "Avocat" && "🥑"}
                      {ing === "Tomates" && "🍅"}
                      {ing === "Céréales" && "🥣"}
                      {ing === "Fruits" && "🍓"}
                      {ing === "Lait" && "🥛"}
                      {ing === "Poulet" && "🍗"}
                      {ing === "Carottes" && "🥕"}
                      {ing === "Pommes de terre" && "🥔"}
                      {ing !== "Quinoa" && ing !== "Avocat" && ing !== "Tomates" && ing !== "Céréales" && ing !== "Fruits" && ing !== "Lait" && ing !== "Poulet" && ing !== "Carottes" && ing !== "Pommes de terre" && "🧄"}
                      <span className="text-xs ml-1">{ing}</span>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm transition">Voir la recette</button>
                  <button className="bg-white border border-green-300 hover:bg-green-100 text-green-600 px-3 py-1 rounded-full text-lg transition">❤️</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 