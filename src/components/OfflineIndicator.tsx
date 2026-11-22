/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { WifiOff, CheckCircle2, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [showReadyToast, setShowReadyToast] = useState(false);
  const [offlineDismissed, setOfflineDismissed] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setOfflineDismissed(false);
    }
  }, [isOnline]);

  useEffect(() => {
    const handleOfflineReady = () => {
      setShowReadyToast(true);
    };

    window.addEventListener('pwa-offline-ready', handleOfflineReady);
    return () => {
      window.removeEventListener('pwa-offline-ready', handleOfflineReady);
    };
  }, []);

  useEffect(() => {
    if (!showReadyToast) return;
    const timer = window.setTimeout(() => setShowReadyToast(false), 6000);
    return () => window.clearTimeout(timer);
  }, [showReadyToast]);

  if (!isOnline && !offlineDismissed) {
    return (
      <div
        role="status"
        className="fixed bottom-4 left-4 right-4 sm:right-auto z-40 max-w-sm flex items-center justify-between gap-2.5 rounded-2xl bg-amber-950/95 border border-amber-500/50 px-3.5 py-2.5 text-xs font-semibold text-amber-200 shadow-xl backdrop-blur-md no-print"
      >
        <div className="flex items-center gap-2 min-w-0">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Modalità Offline attiva — Itinerari, Wiki e strumenti locali pronti.</span>
        </div>
        <button
          type="button"
          onClick={() => setOfflineDismissed(true)}
          aria-label="Chiudi avviso modalità offline"
          className="w-7 h-7 rounded-lg bg-amber-900/60 hover:bg-amber-800/70 text-amber-200 flex items-center justify-center shrink-0 transition active:scale-95"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  if (showReadyToast) {
    return (
      <div
        role="status"
        className="fixed bottom-4 left-4 right-4 sm:right-auto z-40 max-w-sm flex items-center justify-between gap-2.5 rounded-2xl bg-emerald-950/95 border border-emerald-500/50 px-3.5 py-2.5 text-xs font-semibold text-emerald-200 shadow-xl backdrop-blur-md no-print"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>App salvata in cache: pronta per l'uso 100% offline!</span>
        </div>
        <button
          onClick={() => setShowReadyToast(false)}
          aria-label="Chiudi notifica offline pronto"
          className="text-emerald-300 hover:text-white p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return null;
};
