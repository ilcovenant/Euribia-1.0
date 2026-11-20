/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Ship, Info, Printer, Download, MoreVertical } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenCruiseInfo: () => void;
  onDownloadOfflineBundle: () => void;
  currentPortName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCruiseInfo,
  onDownloadOfflineBundle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  const handlePrint = () => {
    setIsMenuOpen(false);
    window.print();
  };

  const handleDownloadOffline = () => {
    setIsMenuOpen(false);
    onDownloadOfflineBundle();
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5 select-none no-print">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Titolo (sempre leggibile anche su schermi 360px) */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-900/30 font-bold">
            <Ship className="w-5 h-5 text-slate-950 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight truncate">
                MSC Euribia
              </h1>
              <span className="hidden sm:inline-block shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/70 font-semibold">
                7 Notti
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              23–30 Nov • 4 Amici
            </p>
          </div>
        </div>

        {/* Pulsanti Azioni Rapide */}
        <div className="flex items-center gap-1.5 shrink-0">
          <PWAInstallButton />

          {/* Pulsanti secondari inline su desktop/tablet */}
          <button
            onClick={onDownloadOfflineBundle}
            aria-label="Scarica File Standalone Offline"
            title="Salva file HTML unico utilizzabile offline sul telefono"
            className="hidden sm:flex items-center gap-1 text-[11px] font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 px-2.5 py-1.5 rounded-xl transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Offline</span>
            <span className="font-mono text-[10px] bg-cyan-900/80 px-1 rounded">.html</span>
          </button>

          <button
            onClick={handlePrint}
            aria-label="Stampa o Salva PDF"
            title="Stampa o salva in PDF l'itinerario"
            className="hidden sm:flex px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-semibold items-center gap-1 transition active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          <button
            onClick={onOpenCruiseInfo}
            aria-label="Info Crociera e Scheda MSC Euribia"
            title="Dettagli nave, orari crociera e regole d'oro"
            className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center transition active:scale-95"
          >
            <Info className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Menu compatto strumenti (Offline .html & PDF) su mobile */}
          <div className="relative sm:hidden" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label="Altri strumenti (file offline e PDF)"
              aria-expanded={isMenuOpen}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition active:scale-95 ${
                isMenuOpen
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl shadow-black/70 p-1.5 space-y-1 z-50"
              >
                <button
                  role="menuitem"
                  onClick={handleDownloadOffline}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-cyan-200 hover:bg-slate-800 transition"
                >
                  <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div>Scarica file .html</div>
                    <div className="text-[10px] text-slate-400 font-normal">Backup unico offline</div>
                  </div>
                </button>
                <button
                  role="menuitem"
                  onClick={handlePrint}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
                >
                  <Printer className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div>Stampa / Salva PDF</div>
                    <div className="text-[10px] text-slate-400 font-normal">Versione cartacea</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
