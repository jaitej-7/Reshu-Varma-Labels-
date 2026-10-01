import React from 'react';
import { useAppStore } from './lib/store';
import { CategoryPage } from './components/public/CategoryPage';
import { HomePage } from './components/public/HomePage';
import { VideosPage } from './components/public/VideosPage';
import { ImageModal } from './components/public/ImageModal';
import { WhatsAppButton } from './components/public/WhatsAppButton';

export default function App() {
  const { activePage } = useAppStore();

  return (
    <>
      {activePage === 'home' && <HomePage />}
      {activePage === 'category' && <CategoryPage />}
      {activePage === 'videos' && <VideosPage />}
      <ImageModal />
      <WhatsAppButton />
    </>
  );
}
