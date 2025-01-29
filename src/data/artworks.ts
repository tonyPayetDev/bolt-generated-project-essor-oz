import { uploadImageFromURL } from '../utils/imgbb';

interface Artwork {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export let artworks: Artwork[] = [
  {
    id: 1,
    title: "Coquelicots Rouges",
    description: "Portrait élégant avec couronne de coquelicots",
    imageUrl: "https://i.ibb.co/SX3Rv3M/red-portrait-1-jpg-Copie.jpg",
    category: "Portrait Floral"
  },
  {
    id: 2,
    title: "Roses Aquarelle",
    description: "Portrait artistique avec roses et taches d'aquarelle",
    imageUrl: "https://i.ibb.co/2yjFDpD/red-portrait-2-jpg.jpg ",
    category: "Portrait Artistique"
  },
  {
    id: 3,
    title: "Roses Graphiques",
    description: "Portrait avec roses graphiques et feuilles stylisées",
    imageUrl: "https://i.ibb.co/Xkx0R5Y/3.jpg",
    category: "Portrait Moderne"
  },
  {
    id: 4,
    title: "Gothic Roses",
    description: "Portrait gothique avec roses et larmes de sang",
    imageUrl: "https://i.ibb.co/vVzs0RN/red-portrait-4-jpg.png",
    category: "Portrait Gothique"
  },
  {
    id: 5,
    title: "Roses Sauvages",
    description: "Portrait naturel avec roses et fleurs sauvages",
    imageUrl: "https://i.ibb.co/XbjMHfB/red-portrait-5-jpg.png",
    category: "Portrait Naturel"
  }
];

export async function initializeArtworks() {
  try {
    const uploadedArtworks = await Promise.all(
      artworks.map(async (artwork) => {
        const uploadedUrl = await uploadImageFromURL(artwork.imageUrl);
        return {
          ...artwork,
          imageUrl: uploadedUrl
        };
      })
    );
    artworks = uploadedArtworks;
    return uploadedArtworks;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des images:', error);
    return artworks;
  }
}
