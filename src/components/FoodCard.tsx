/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SostaGolosa } from '../types/itinerary';
import { Crown, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { generateStopGoogleMapsUrl } from '../utils/itineraryUtils';

interface FoodCardProps {
  sostaGolosa?: SostaGolosa;
}

export const FoodCard: React.FC<FoodCardProps> = ({ sostaGolosa }) => {
  // Box visibile SOLO se è presente una sosta golosa di assoluto rilievo europeo/mondiale
  if (!sostaGolosa) return null;

  const mapsUrl = generateStopGoogleMapsUrl(`${sostaGolosa.locale} ${sostaGolosa.indirizzo}`, sostaGolosa.locale);

  return (
    <aside 
      aria-label="Esperienza gastronomica cult"
      className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-rose-950/20 to-slate-900 border border-amber-500/30 shadow-lg relative overflow-hidden print-border"
    >
      {/* Decorative accent glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-extrabold uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Esperienza Gastronomica Cult</span>
        </div>
        <div className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800/60 shadow-inner">
          {sostaGolosa.costoIndicativo}
        </div>
      </div>

      {/* Locale e Specialità */}
      <div className="mt-1">
        <h3 className="font-black text-lg text-white tracking-tight flex items-center gap-1.5">
          {sostaGolosa.locale}
        </h3>
        <p className="text-sm font-bold text-amber-300/90 mt-0.5 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {sostaGolosa.specialita}
        </p>
      </div>

      {/* Descrizione */}
      <p className="text-sm sm:text-[14.5px] text-slate-200 mt-2.5 leading-relaxed font-normal">
        {sostaGolosa.descrizione}
      </p>

      {/* Curiosità storica cult */}
      <div className="mt-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
        <span className="text-base shrink-0 mt-0.5">💡</span>
        <p className="leading-relaxed">
          <strong className="text-amber-300 font-semibold">Curiosità Cult:</strong> {sostaGolosa.curiosita}
        </p>
      </div>

      {/* Indirizzo e link Maps */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 truncate text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
          <span className="truncate">{sostaGolosa.indirizzo}</span>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 px-2.5 py-1 rounded-lg border border-amber-800/50 transition no-print"
        >
          <span>Apri Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
