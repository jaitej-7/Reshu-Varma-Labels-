import React from 'react';
import { useAppStore } from './lib/store';
import { CategoryPage } from './components/public/CategoryPage';
import { HomePage } from './components/public/HomePage';
import { VideosPage } from './components/public/VideosPage';
import { LegalPage } from './components/public/LegalPage';
import { ImageModal } from './components/public/ImageModal';
import { WhatsAppButton } from './components/public/WhatsAppButton';

export default function App() {
  const { activePage } = useAppStore();

  return (
    <>
      {activePage === 'home' && <HomePage />}
      {activePage === 'category' && <CategoryPage />}
      {activePage === 'videos' && <VideosPage />}
      {['terms', 'privacy', 'disclaimer'].includes(activePage) && <LegalPage />}
      <ImageModal />
      <WhatsAppButton />
    </>
  );
}
