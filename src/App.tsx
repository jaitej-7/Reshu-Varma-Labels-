import React, { useEffect } from 'react';
import { useAppStore } from './lib/store';
import { CategoryPage } from './components/public/CategoryPage';
import { HomePage } from './components/public/HomePage';

export default function App() {
  const { activePage } = useAppStore();

  return (
    <>
      {activePage === 'home' && <HomePage />}
      {activePage === 'category' && <CategoryPage />}
    </>
  );
}
