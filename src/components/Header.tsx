/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Ship, Info, Printer, Download, Sun, Moon } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenCruiseInfo: () => void;
  onDownloadOfflineBundle: () => void;
  currentPortName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCruiseInfo,
  onDownloadOfflineBundle,
  currentPortName
}) => {
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  const wakeLockRef = useRef<any>(null);

  const toggleWakeLock = async () => {
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      alert('La funzione "Tieni schermo sempre attivo" non è supportata da questo browser.');
      return;
    }

    try {
      if (isWakeLockActive) {
        if (wakeLockRef.current) {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        }
        setIsWakeLockActive(false);
      } else {
        const sentinel = await (navigator as any).wakeLock.request('screen');
        sentinel.addEventListener('release', () => {
          setIsWakeLockActive(false);
          wakeLockRef.current = null;
        });
        wakeLockRef.current = sentinel;
        setIsWakeLockActive(true);
      }
    } catch (err) {
      console.warn('Wake Lock request error:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 select-none no-print">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Titolo */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-900/30 font-bold">
            <Ship className="w-5 h-5 text-slate-950 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight truncate">
                MSC Euribia
              </h1>
              <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/70 font-semibold">
                7 Notti
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              4 Amici • Guida Tappe & Logistica
            </p>
          </div>
        </div>

        {/* Pulsanti Azioni Rapide */}
        <div className="flex items-center gap-1.5 shrink-0">
          <PWAInstallButton />

          <button
            onClick={toggleWakeLock}
            aria-label={isWakeLockActive ? 'Disattiva schermo sempre acceso' : 'Tieni schermo sempre acceso mentre cammini'}
            title={isWakeLockActive ? 'Schermo sempre attivo (ON)' : 'Tieni schermo sempre attivo (ideale camminando per strada)'}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 ${
              isWakeLockActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm shadow-amber-900/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            {isWakeLockActive ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isWakeLockActive ? 'Schermo ON' : 'Schermo'}</span>
          </button>

          <button
            onClick={onDownloadOfflineBundle}
            aria-label="Scarica File Standalone Offline"
            title="Salva file HTML unico utilizzabile offline sul telefono"
            className="flex items-center gap-1 text-[11px] font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 px-2.5 py-1.5 rounded-xl transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Offline</span>
            <span className="font-mono text-[10px] bg-cyan-900/80 px-1 rounded">.html</span>
          </button>

          <button
            onClick={handlePrint}
            aria-label="Stampa o Salva PDF"
            title="Stampa o salva in PDF l'itinerario"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-semibold flex items-center gap-1 transition active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={onOpenCruiseInfo}
            aria-label="Info Crociera e Scheda MSC Euribia"
            title="Dettagli nave, orari crociera e regole d'oro"
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition active:scale-95"
          >
            <Info className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
