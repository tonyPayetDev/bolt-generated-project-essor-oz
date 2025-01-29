import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeArtworks } from './data/artworks';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Initialize artworks before rendering
initializeArtworks().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}).catch(error => {
  console.error('Failed to initialize artworks:', error);
  // Render app anyway even if artwork initialization fails
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
