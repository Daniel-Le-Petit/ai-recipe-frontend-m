"use client";
import { Lightbulb, Utensils, ListChecks, Brain, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PlanSemainePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Lightbulb className="h-8 w-8 text-yellow-400 mr-2" />
          <span className="text-2xl font-bold text-gray-800">Votre plan AI & Fines Herbes de la semaine est prêt.</span>
        </div>
        <p className="text-lg text-gray-700 mb-6">Consultez-le gratuitement !</p>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-8 rounded-xl text-lg mb-8 shadow-lg transition-colors"
          onClick={() => router.push('/plan-semaine/voir')}
        >
          Voir
        </button>
        <div className="space-y-5 text-left mb-8">
          <div className="flex items-start gap-3">
            <Utensils className="h-6 w-6 text-gray-700 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Menu hebdomadaire personnalisé</span>
              <div className="text-gray-600 text-sm">7 recettes selon vos goûts</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ListChecks className="h-6 w-6 text-gray-700 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Liste de courses générée automatiquement</span>
              <div className="text-gray-600 text-sm">Exportable ou connectée à un panier</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Brain className="h-6 w-6 text-gray-700 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Recettes validées par l'IA + humain</span>
              <div className="text-gray-600 text-sm">Qualité + pertinence</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckSquare className="h-6 w-6 text-gray-700 mt-1" />
            <div>
              <span className="font-semibold text-gray-900">Adapté à vos contraintes</span>
              <div className="text-gray-600 text-sm">Temps dispo, allergies, préférences</div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-700 text-lg font-medium mt-6">
          Essayez le plan de la semaine – sans engagement
        </div>
      </div>
    </div>
  );
} 