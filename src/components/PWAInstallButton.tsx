/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, X, Share, MoreVertical, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isFirefoxAndroid, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Nasconde il pulsante quando l'app è già installata e aperta in modalità standalone
  if (isInstalled) {
    return null;
  }

  // Flusso nativo Chromium / Chrome Android / Desktop Edge
  if (isInstallable) {
    return (
      <button
        onClick={install}
        aria-label="Installa App PWA sul dispositivo"
        title="Installa come app offline sul telefono"
        className="w-8 h-8 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 flex items-center justify-center gap-1 text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition active:scale-95 shadow-sm shadow-emerald-950/40 shrink-0"
      >
        <Smartphone className="w-4 h-4 sm:w-3.5 sm:h-3.5 stroke-[2.4]" />
        <span className="hidden sm:inline">Installa</span>
      </button>
    );
  }

  // Flusso guidato per Firefox Android o iOS Safari (che non supportano beforeinstallprompt)
  if (isFirefoxAndroid || isIOS) {
    return (
      <>
        <button
          onClick={() => setShowGuideModal(true)}
          aria-label="Come installare l'App PWA"
          title="Installa come App Offline"
          className="w-8 h-8 sm:w-auto sm:h-auto sm:px-2 sm:py-1.5 flex items-center justify-center gap-1 text-[11px] font-bold bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/80 rounded-xl transition active:scale-95 shrink-0"
        >
          <Smartphone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline">Installa</span>
        </button>

        {showGuideModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setShowGuideModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-guide-title"
          >
            <div
              className="bg-slate-900 border border-slate-700/80 w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl p-5 shadow-2xl text-slate-100 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="pwa-guide-title" className="text-base font-extrabold text-white">
                      {isFirefoxAndroid ? 'Installa su Firefox Android' : 'Installa su iPhone / iPad'}
                    </h3>
                    <p className="text-[11px] text-slate-400">Funziona al 100% in modalità aereo</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  aria-label="Chiudi guida installazione"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isFirefoxAndroid ? (
                <ol className="space-y-3 text-xs sm:text-sm text-slate-200 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span>
                      Tocca il menu con i <strong>3 puntini</strong>{' '}
                      <MoreVertical className="w-3.5 h-3.5 inline text-cyan-400" /> nella barra di Firefox.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span>
                      Seleziona <strong>"Installa"</strong> (oppure <em>"Aggiungi alla schermata Home"</em>).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span>
                      Conferma: comparirà l'icona <strong>MSC Euribia</strong> sulla Home, pronta all'uso offline con tutte le funzioni attive!
                    </span>
                  </li>
                </ol>
              ) : (
                <ol className="space-y-3 text-xs sm:text-sm text-slate-200 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span>
                      Tocca il pulsante <strong>Condividi</strong>{' '}
                      <Share className="w-3.5 h-3.5 inline text-cyan-400" /> nella barra di Safari.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span>
                      Scorri verso il basso e tocca <strong>"Aggiungi alla schermata Home"</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span>
                      Tocca <strong>"Aggiungi"</strong> in alto a destra per salvare l'app offline sul dispositivo.
                    </span>
                  </li>
                </ol>
              )}

              <div className="flex items-center gap-2 text-[11px] text-emerald-300 bg-emerald-950/40 border border-emerald-800/50 rounded-xl px-3 py-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dopo l'installazione, fai un test attivando la Modalità Aereo per verificare l'apertura offline.</span>
              </div>

              <button
                onClick={() => setShowGuideModal(false)}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition active:scale-95"
              >
                Ho capito
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
