import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { motion } from 'framer-motion';

interface ArtworkGalleryProps {
  onSelect: (imageUrl: string) => void;
}

export function ArtworkGallery({ onSelect }: ArtworkGalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (artwork: typeof artworks[0]) => {
    setSelectedId(artwork.id);
    onSelect(artwork.imageUrl);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg"
    >
      <h3 className="text-2xl font-light text-gray-800 mb-6 text-center">
        Sélectionnez un Style
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <motion.div
            key={artwork.id}
            layoutId={`artwork-${artwork.id}`}
            className={`group relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
              selectedId === artwork.id ? 'ring-2 ring-red-500' : ''
            }`}
            onClick={() => handleSelect(artwork)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-[3/4] relative">
              <motion.img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-lg font-medium mb-1">{artwork.title}</h4>
                  <p className="text-sm text-gray-200">{artwork.description}</p>
                  <motion.span 
                    className="inline-block mt-2 text-xs px-2 py-1 bg-red-500/80 rounded"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    {artwork.category}
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
