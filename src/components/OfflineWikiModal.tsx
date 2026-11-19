/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TUNISIA_WIKI_ARTICLES } from '../data/tunisiaWikiData';
import { 
  X, 
  BookOpen, 
  Clock, 
  Landmark, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface OfflineWikiModalProps {
  slug: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const OfflineWikiModal: React.FC<OfflineWikiModalProps> = ({
  slug,
  isOpen,
  onClose,
  onSelectArticle
}) => {
  if (!isOpen || !slug) return null;

  const article = TUNISIA_WIKI_ARTICLES[slug] || TUNISIA_WIKI_ARTICLES['sidi-bou-said'];
  const allArticles = Object.values(TUNISIA_WIKI_ARTICLES);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wiki-title"
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 w-full sm:max-w-2xl max-h-[90vh] sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modale stile Enciclopedia Tascabile */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 sticky top-0 z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  100% Offline (No Roaming Dati)
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.letturaMinuti} min
                </span>
              </div>
              <h2 id="wiki-title" className="text-base sm:text-lg font-extrabold text-white truncate mt-0.5">
                {article.titolo}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Chiudi finestra enciclopedia"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition active:scale-95 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo dell'Articolo Enciclopedico */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-200 text-sm sm:text-[15px] leading-relaxed">
          {/* Sottotitolo & Metadata */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-cyan-300/90 italic">
              {article.sottotitolo}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-mono">
                📅 {article.periodoStorico}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                🏛️ {article.categoria}
              </span>
            </div>
          </div>

          {/* Abstract / Sommario Wikipedia */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 text-cyan-100 font-normal leading-relaxed text-sm sm:text-[15px] shadow-inner">
            {article.sommario}
          </div>

          {/* Sezioni Approfondite */}
          <div className="space-y-5">
            {article.sezioni.map((sec, idx) => (
              <section key={idx} className="space-y-2 border-l-2 border-cyan-500/40 pl-3.5">
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs">{idx + 1}.</span>
                  {sec.titolo}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {sec.contenuto}
                </p>
              </section>
            ))}
          </div>

          {/* Box Curiosità Inedite */}
          {article.curiositaInedite.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/50 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                Curiosità Inedite da Sapere sul Posto
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-100/90 list-disc list-inside">
                {article.curiositaInedite.map((c, i) => (
                  <li key={i} className="leading-relaxed">
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Selezione Rapida Altre Voci Wikipedia della Tunisia */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Altre Voci Enciclopediche Offline (La Goletta & Cartagine):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allArticles
                .filter(a => a.slug !== article.slug)
                .map((a) => (
                  <button
                    key={a.slug}
                    onClick={() => onSelectArticle(a.slug)}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-left transition text-xs flex items-center justify-between group active:scale-98"
                  >
                    <div className="truncate pr-2">
                      <div className="font-bold text-white group-hover:text-cyan-300 truncate">
                        {a.titolo.split('(')[0]}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {a.categoria}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Footer con bottone chiusura */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition active:scale-95"
          >
            Ho Finito di Leggere • Torna all'Itinerario
          </button>
        </div>
      </div>
    </div>
  );
};
