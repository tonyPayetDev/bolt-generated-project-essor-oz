import { ImageProcessor } from './components/ImageProcessor';
import { BackgroundCarousel } from './components/BackgroundCarousel';

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative flex flex-col min-h-screen">
      <BackgroundCarousel />
      
      <div className="flex flex-col min-h-screen">
        <header className="w-full py-8 bg-gradient-to-r from-red-900/80 to-red-800/80 shadow-lg backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-light text-center text-white tracking-tight">
              Créez Votre Image
              <span className="block text-lg mt-2 font-light text-red-100">
                Transformez vos photos simplement
              </span>
            </h1>
          </div>
        </header>

        <main className="flex-1 w-full container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ImageProcessor />
          </div>
        </main>

        <footer className="w-full py-4 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-300 text-sm">
              {currentYear} Générateur d&apos;Image - Tous droits réservés
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
