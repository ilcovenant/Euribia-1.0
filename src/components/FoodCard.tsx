/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { SostaGolosa } from '../types/itinerary';
import { Crown, Sparkles, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import { generateStopGoogleMapsUrl } from '../utils/itineraryUtils';

interface FoodCardProps {
  sostaGolosa?: SostaGolosa;
}

export const FoodCard: React.FC<FoodCardProps> = ({ sostaGolosa }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Richiude la scheda quando si cambia porto per lasciare subito spazio all'itinerario
  useEffect(() => {
    setIsOpen(false);
  }, [sostaGolosa?.locale]);

  // Box visibile SOLO se è presente una sosta golosa di assoluto rilievo europeo/mondiale
  if (!sostaGolosa) return null;

  const mapsUrl = generateStopGoogleMapsUrl(
    `${sostaGolosa.locale} ${sostaGolosa.indirizzo}`,
    sostaGolosa.locale
  );

  return (
    <aside
      aria-label="Esperienza gastronomica cult"
      className="rounded-2xl border border-amber-500/35 bg-gradient-to-r from-amber-950/35 via-rose-950/15 to-slate-900 overflow-hidden shadow-md print-border"
    >
      {/* Header Accordion stile FAQ (cliccabile per aprire/chiudere) */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-2.5 text-left hover:bg-amber-950/25 transition active:scale-[0.995]"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                Cibo Cult
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-200 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60">
                {sostaGolosa.costoIndicativo}
              </span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-white leading-snug truncate mt-0.5">
              {sostaGolosa.locale}
            </h3>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-amber-400 transition-transform duration-300 shrink-0 no-print ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Contenuto Espandibile (sempre visibile in fase di stampa / PDF) */}
      <div className={`${isOpen ? 'block' : 'hidden print:block'} px-4 pb-4 pt-3 border-t border-amber-500/20 space-y-3`}>
        <p className="text-sm font-bold text-amber-300/95 flex items-start gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{sostaGolosa.specialita}</span>
        </p>

        <p className="text-sm sm:text-[14.5px] text-slate-200 leading-relaxed font-normal">
          {sostaGolosa.descrizione}
        </p>

        <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
          <span className="text-base shrink-0 mt-0.5">💡</span>
          <p className="leading-relaxed">
            <strong className="text-amber-300 font-semibold">Curiosità Cult:</strong> {sostaGolosa.curiosita}
          </p>
        </div>

        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 truncate text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            <span className="truncate">{sostaGolosa.indirizzo}</span>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 px-2.5 py-1.5 rounded-lg border border-amber-800/50 transition no-print"
          >
            <span>Apri Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
