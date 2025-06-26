"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VoirPlanSemainePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-white px-4 py-12">
        <div className="max-w-md w-full mx-auto text-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg mb-6"
            aria-label="Retour"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Votre plan de la semaine</h1>
          <div className="bg-gray-100 rounded-xl p-8 text-gray-500 text-lg">
            Votre plan personnalisé s'affichera ici
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 