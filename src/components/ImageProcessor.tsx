import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { ImagePreview } from './ImagePreview';
import { StatusMessage } from './StatusMessage';
import { SubmitButton } from './SubmitButton';
import { ArtworkGallery } from './ArtworkGallery';
import { processImages } from '../utils/api';
import { validateImage } from '../utils/validation';
import { uploadImageToImgBB } from '../utils/imgbb';

export function ImageProcessor() {
  const [tableauImage, setTableauImage] = useState<string | null>(null);
  const [visageImage, setVisageImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(true);

  const handleImageUpload = async (file: File, setImage: (url: string) => void) => {
    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setUploadProgress("Upload en cours...");
      setError(null);
      const imageUrl = await uploadImageToImgBB(file);
      setImage(imageUrl);
      setUploadProgress(null);
      setSuccess(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload de l'image");
      setUploadProgress(null);
    }
  };

  const handleArtworkSelect = (imageUrl: string) => {
    setTableauImage(imageUrl);
    setShowGallery(false);
  };

  const handleSubmit = async () => {
    if (!tableauImage || !visageImage) {
      setError("Veuillez sélectionner les deux images");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setResultImage(null);

    try {
      const imageUrl = await processImages(tableauImage, visageImage);
      setResultImage(imageUrl);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors du traitement des images");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {showGallery ? (
        <ArtworkGallery onSelect={handleArtworkSelect} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-light text-white">Images Sélectionnées</h3>
            <button
              onClick={() => setShowGallery(true)}
              className="text-red-100 hover:text-white transition-colors duration-200"
            >
              Changer d'œuvre d'art
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tableauImage && (
              <div>
                <h4 className="text-lg font-light text-white mb-2">Œuvre Sélectionnée</h4>
                <ImagePreview
                  imageUrl={tableauImage}
                  title="Tableau"
                />
              </div>
            )}
            <div>
              <h4 className="text-lg font-light text-white mb-2">Votre Photo</h4>
              <ImageUpload
                title="Image du Visage"
                description="Sélectionnez l'image du visage à intégrer"
                onImageSelect={(file) => handleImageUpload(file, setVisageImage)}
              />
              {visageImage && (
                <div className="mt-4">
                  <ImagePreview
                    imageUrl={visageImage}
                    title="Visage Sélectionné"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {uploadProgress && (
        <div className="bg-red-50/90 backdrop-blur-sm text-red-600 p-4 rounded-lg text-sm">
          {uploadProgress}
        </div>
      )}

      {!showGallery && (
        <div className="flex justify-center">
          <SubmitButton
            onClick={handleSubmit}
            disabled={!tableauImage || !visageImage}
            isLoading={isLoading}
          />
        </div>
      )}

      {error && <StatusMessage type="error" message={error} />}
      {success && (
        <StatusMessage
          type="success"
          message="Image générée avec succès"
        />
      )}

      {resultImage && (
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-light text-center mb-8 text-gray-800">Résultat</h2>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={resultImage} 
                alt="Image générée"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <a 
                href={resultImage}
                download="image-generee.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-2.5 rounded-lg hover:from-red-800 hover:to-red-900 transition-all duration-200 shadow-lg hover:shadow-red-500/30"
              >
                Télécharger
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
