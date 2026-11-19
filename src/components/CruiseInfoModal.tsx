/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CRUISE_INFO } from '../data/itineraryData';
import { 
  X, 
  Ship, 
  Calendar, 
  RotateCcw, 
  ChevronDown, 
  Clock, 
  AlertTriangle, 
  Plane, 
  CreditCard, 
  Sparkles, 
  Maximize2 
} from 'lucide-react';

interface CruiseInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const CruiseInfoModal: React.FC<CruiseInfoModalProps> = ({
  isOpen,
  onClose,
  onResetProgress
}) => {
  // Gestione sezioni accordion (FAQ): tiene traccia delle sezioni aperte
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'itinerario': true, // aperta di default
    'fuso': true        // aperta di default per mostrare subito le differenze reali
  });

  const [isImageZoomed, setIsImageZoomed] = useState(false);

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cruise-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold shadow-sm">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cruise-modal-title" className="font-extrabold text-base sm:text-lg text-white leading-tight">
                MSC Euribia • Info & FAQ Crociera
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {CRUISE_INFO.date} • Partenza Genova
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi finestra dettagli crociera"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenuto ad Accordion (Clicca per espandere/richiudere) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-sm">

          {/* ACCORDION 1: TABELLA ITINERARIO SCRITTA & IMMAGINE INGRANDIBILE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection('itinerario')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-100 hover:bg-slate-900/60 transition gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-white">
                  Tabella Ufficiale Crociera 7 Notti & Orari
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${openSections['itinerario'] ? 'rotate-180' : ''}`} />
            </button>

            {openSections['itinerario'] && (
              <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-slate-800/80">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tabella completa degli 8 giorni (inclusi imbarco/sbarco a Genova e il giorno di navigazione):
                </p>

                {/* Tabella Scritta Chiara ed Elegante */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950/90 text-slate-400 font-mono border-b border-slate-800 text-[11px]">
                        <th className="py-2.5 px-3">Giorno</th>
                        <th className="py-2.5 px-3">Data</th>
                        <th className="py-2.5 px-3 font-semibold text-slate-200">Porto</th>
                        <th className="py-2.5 px-3">Orari</th>
                        <th className="py-2.5 px-3">Programma</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70 font-medium">
                      {CRUISE_INFO.tabellaCompleta.map((item) => (
                        <tr key={item.giorno} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 px-3 font-bold font-mono text-cyan-400">
                            G{item.giorno}
                          </td>
                          <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                            {item.data.replace(' 2026', '')}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                            {item.porto}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-200 font-semibold whitespace-nowrap">
                            {item.orario}
                          </td>
                          <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                            {item.stato}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Immagine Tragitto Ufficiale Ingrandibile */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 transition"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{isImageZoomed ? 'Riduci Immagine Prenotazione' : 'Mostra Immagine Originale Grande'}</span>
                  </button>

                  {isImageZoomed && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center animate-in zoom-in-95 duration-200">
                      <img 
                        src="/assets/aistudio/immagine_d82a340e.png" 
                        alt="MSC Euribia Itinerario Ufficiale Prenotazione" 
                        className="w-full max-w-sm rounded-xl border border-slate-700 shadow-xl bg-white p-2 object-contain"
                      />
                      <p className="text-[11px] text-slate-400 mt-2 text-center">
                        Screenshot ufficiale MSC Crociere allegato alla prenotazione
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 2: FUSO ORARIO & DIFFERENZE REALI RISPETTO ALL'ORARIO NAVE */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 to-slate-950 overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection('fuso')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-amber-300 hover:bg-amber-950/30 transition gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-amber-300">
                  Fuso Orario: Differenze Reali rispetto all'Orario Nave
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform duration-300 shrink-0 ${openSections['fuso'] ? 'rotate-180' : ''}`} />
            </button>

            {openSections['fuso'] && (
              <div className="px-4 pb-4 pt-1 space-y-3 border-t border-amber-800/40">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-2">
                  <span className="text-base shrink-0">🟢</span>
                  <div>
                    <strong>Risultato Reale: 0 ORE di differenza su tutti i porti!</strong>
                    <p className="text-xs text-slate-300 font-normal mt-1 leading-relaxed">
                      A fine novembre 2026, sia l'Italia, sia la Tunisia, sia la Spagna, sia la Francia si trovano tutte esattamente sullo stesso fuso orario <strong>UTC+1 (CET)</strong>. L'ora a terra coincide sempre al minuto con l'orologio della nave. Non c'è alcun rischio di confusione tra ora locale e ora nave!
                    </p>
                  </div>
                </div>

                {/* Tabella Comparativa Fusi per Porto */}
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/80">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800">
                        <th className="py-2 px-3">Porto di Scalo</th>
                        <th className="py-2 px-3">Fuso a Terra</th>
                        <th className="py-2 px-3 font-semibold text-emerald-400">Differenza vs Nave</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {CRUISE_INFO.fusoOrarioInfo.dettaglioPorti.map((dp, i) => (
                        <tr key={i} className="hover:bg-slate-800/40">
                          <td className="py-2 px-3 text-slate-200">{dp.porto}</td>
                          <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{dp.fuso}</td>
                          <td className="py-2 px-3 text-emerald-400 font-bold">{dp.differenzaNave}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 3: REGOLA DEI 45 MINUTI (TUTTI A BORDO) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden">
            <button
              onClick={() => toggleSection('45min')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-100 hover:bg-slate-900/60 transition gap-2"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-white">
                  Regola dei 45 Minuti: Il Limite "Tutti a Bordo"
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${openSections['45min'] ? 'rotate-180' : ''}`} />
            </button>

            {openSections['45min'] && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-2">
                <p>
                  La passerella della nave chiude <strong>tassativamente 30-45 minuti prima</strong> dell'orario di partenza indicato nei programmi. Se la nave salpa alle 18:00, il limite insindacabile per salire a bordo è alle <strong>17:15</strong>.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  💡 <em>Tutti i nostri anelli di camminata sono già calibrati per concludersi con abbondante margine 45 minuti prima della partenza.</em>
                </div>
              </div>
            )}
          </div>

          {/* ACCORDION 4: MODALITÀ AEREO IN NAVIGAZIONE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden">
            <button
              onClick={() => toggleSection('aereo')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-100 hover:bg-slate-900/60 transition gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Plane className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-white">
                  Modalità Aereo in Mare Aperto (Zero Sorprese in Bolletta)
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${openSections['aereo'] ? 'rotate-180' : ''}`} />
            </button>

            {openSections['aereo'] && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-2">
                <p>
                  Non appena la nave si allontana dalla costa (circa 30 minuti dopo la partenza dal molo), attiva subito la <strong>Modalità Aereo</strong> su tutti i telefoni del gruppo.
                </p>
                <p className="text-xs text-slate-400">
                  La rete cellulare marittima satellitare si aggancia in automatico e applica tariffe extra-UE esorbitanti (anche 15-20€ per 1 MB di dati di background). A terra a Napoli, Palermo, Barcellona e Marsiglia potete invece usare la vostra normale tariffa dati italiana senza costi aggiuntivi (roaming UE).
                </p>
              </div>
            )}
          </div>

          {/* ACCORDION 5: CRUISE CARD & DOCUMENTI */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden">
            <button
              onClick={() => toggleSection('card')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-100 hover:bg-slate-900/60 transition gap-2"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-white">
                  Cruise Card MSC & Documenti Personali
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${openSections['card'] ? 'rotate-180' : ''}`} />
            </button>

            {openSections['card'] && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-2">
                <p>
                  Ciascuno dei 4 amici deve avere sempre con sé la propria <strong>Cruise Card MSC</strong>: funge da documento di bordo, chiave cabina e pass obbligatorio per scendere e risalire sulla nave.
                </p>
                <p className="text-xs text-slate-400">
                  Per lo scalo a La Goletta (Tunisia), portate con voi anche la carta d'identità valida per l'espatrio o il passaporto per i controlli doganali al terminal.
                </p>
              </div>
            )}
          </div>

          {/* ACCORDION 6: CURIOSITÀ NAVE MSC EURIBIA */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden">
            <button
              onClick={() => toggleSection('euribia')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-100 hover:bg-slate-900/60 transition gap-2"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-white">
                  Curiosità sulla Nave MSC Euribia
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${openSections['euribia'] ? 'rotate-180' : ''}`} />
            </button>

            {openSections['euribia'] && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-2">
                <p>
                  MSC Euribia (battezzata a Copenaghen nel 2023) prende il nome dall'antica dea greca Eurybia, signora dei venti e delle correnti. È la seconda nave della flotta alimentata a <strong>GNL (Gas Naturale Liquefatto)</strong>, con una riduzione del 25% di emissioni di gas serra.
                </p>
                <p className="text-xs text-slate-400">
                  All'interno, la spettacolare <em>Galleria Euribia</em> è sormontata dalla cupola a LED sul mare più lunga al mondo (112 metri), che trasmette spettacoli visivi animati 24 ore su 24. Lo scafo esterno è una tela marina gigante decorata con l'opera d'arte '#SaveTheSea'.
                </p>
              </div>
            )}
          </div>

          {/* Reset progressi checklist */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <div className="text-xs text-slate-400">
              Spunte tappe salvate sul telefono
            </div>
            <button
              onClick={() => {
                if (window.confirm('Vuoi davvero azzerare tutte le tappe completate?')) {
                  onResetProgress();
                }
              }}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/50 hover:bg-rose-900/50 border border-rose-800/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Azzera Tutte le Spunte
            </button>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-center shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition active:scale-95 shadow-md shadow-cyan-950"
          >
            Chiudi & Torna agli Itinerari
          </button>
        </div>
      </div>
    </div>
  );
};
