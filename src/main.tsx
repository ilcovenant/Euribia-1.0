import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Registra il Service Worker PWA per funzionamento 100% offline (Firefox, Chrome, Safari)
registerSW({
  immediate: true,
  onOfflineReady() {
    window.dispatchEvent(new Event('pwa-offline-ready'));
  },
});

createRoot(document.getElementById('root')!).render(<App />);

