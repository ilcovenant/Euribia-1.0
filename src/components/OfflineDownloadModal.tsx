/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { itineraryData } from '../data/itineraryData';
import { generateSingleHtmlBundle } from '../utils/itineraryUtils';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Smartphone, 
  WifiOff, 
  FileCode, 
  ExternalLink,
  Globe,
  FolderOpen
} from 'lucide-react';

interface OfflineDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineDownloadModal: React.FC<OfflineDownloadModalProps> = ({
  isOpen,
  onClose
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const htmlContent = generateSingleHtmlBundle(itineraryData);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'msc-euribia-itinerari-offline.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="offline-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <h2 id="offline-modal-title" className="font-extrabold text-base text-white">
                Guida per Smartphone & Modalità Offline
              </h2>
              <p className="text-xs text-slate-400">Come avere e aprire la guida durante la crociera</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi finestra"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo informativo e pulsanti */}
        <div className="p-4 sm:p-5 space-y-4 text-xs overflow-y-auto">
          {/* Opzione 1: Online PWA */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Globe className="w-4 h-4" />
              <span>Opzione 1: App Web Online (PWA per il gruppo)</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Puoi inviare il link di questa Web App a tutti i 4 amici del gruppo. Sullo smartphone (Chrome su Android o Safari su iPhone):
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div>👉 Tocca i <strong>tre puntini (⋮)</strong> in alto a destra su Chrome.</div>
              <div>👉 Seleziona <strong className="text-cyan-300">"Aggiungi a schermata Home"</strong> o <strong className="text-cyan-300">"Installa app"</strong>.</div>
              <div className="text-slate-400">In questo modo compare come una vera app sullo smartphone accessibile in qualsiasi momento.</div>
            </div>
          </div>

          {/* Opzione 2: File HTML Singolo Standalone per quando non c'è campo */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <FolderOpen className="w-4 h-4" />
              <span>Opzione 2: File Singolo Offline (.html)</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Questo file è <strong>100% indipendente</strong>: contiene tutte le 5 tappe, orari, logistica moli, mappa e foglio di stile incorporato (senza dipendere da internet). È il "salvagente" perfetto per quando si è in mare aperto o in Tunisia senza roaming europeo.
            </p>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Dove finisce il file?
              </div>
              <p className="text-slate-400">
                Cliccando sul tasto sotto, il file <code className="text-cyan-300 font-mono">msc-euribia-itinerari-offline.html</code> viene salvato nella cartella <strong>Download</strong> del tuo telefono o PC.
              </p>
              <p className="text-slate-400">
                Sul telefono basta aprire l'app <strong>"File"</strong> o <strong>"Download"</strong> e toccarlo: si apre subito a schermo intero nel browser anche con la modalità aereo attiva!
              </p>
            </div>
          </div>

          {/* Bottoni di azione */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleDownload}
              className={`w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                downloaded
                  ? 'bg-emerald-600 text-white shadow-emerald-950'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-950'
              }`}
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>File Scaricato nella cartella Download!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Scarica msc-euribia-itinerari-offline.html</span>
                </>
              )}
            </button>

            <a
              href="/msc-euribia-itinerari-offline.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span>Visualizza Versione Offline Standalone nel Browser</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
