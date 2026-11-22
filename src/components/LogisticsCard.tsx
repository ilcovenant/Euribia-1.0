/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortItinerary } from '../types/itinerary';
import { calculateCompletedStats, formatItineraryForSharing, generateGoogleMapsRouteUrl } from '../utils/itineraryUtils';
import { 
  Anchor, 
  Clock, 
  AlertTriangle, 
  Footprints, 
  Share2, 
  Map, 
  Bus, 
  Lightbulb, 
  CheckCheck, 
  Compass 
} from 'lucide-react';

interface LogisticsCardProps {
  port: PortItinerary;
  checkedStops: string[];
}

export const LogisticsCard: React.FC<LogisticsCardProps> = ({ port, checkedStops }) => {
  const [copied, setCopied] = useState(false);
  const stats = calculateCompletedStats(port.tappe, checkedStops);

  const handleCopy = async () => {
    const text = formatItineraryForSharing(port);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const fullRouteUrl = generateGoogleMapsRouteUrl(port.tappe);

  return (
    <section 
      aria-label={`Logistica e orari ${port.porto}`}
      className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden print-border"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Giorno, Data & Km Badge */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-cyan-400 bg-cyan-950/70 px-2.5 py-1 rounded-full border border-cyan-800/60 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5" />
          Giorno {port.giornoNumero} • {port.dataGiorno}
        </span>
        <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 shadow-sm">
          <Footprints className="w-3.5 h-3.5 text-cyan-400" />
          ~{port.kmTotaliStimati} km a piedi
        </span>
      </div>

      {/* Titolo Porto & Bandiera */}
      <div className="mt-2.5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">{port.bandiera}</span>
          <span>{port.porto}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Circuito circolare ottimizzato ad anello • Finestra a terra: <strong className="text-slate-200">{port.durataFinestraOre}</strong>
        </p>
      </div>

      {/* Card Orari Reali (High Visibility per la sicurezza dei passeggeri) */}
      <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-center relative">
        {/* Attracco */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Attracco</span>
          <span className="text-base sm:text-lg font-black font-mono text-white leading-tight">
            {port.orarioAttracco}
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">
            Sbarco ~{port.orarioSbarcoStimato}
          </span>
        </div>

        {/* Tutti a Bordo (All Aboard Alarm) */}
        <div className="flex flex-col justify-center border-x border-slate-800/80 px-1 bg-amber-950/20 rounded-lg py-1 border-amber-900/30">
          <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider flex items-center justify-center gap-0.5">
            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" /> Tutti a Bordo
          </span>
          <span className="text-base sm:text-lg font-black font-mono text-amber-300 leading-tight">
            {port.orarioTuttiABordo}
          </span>
          <span className="text-[9px] text-amber-400/90 font-mono font-semibold">
            -45 min (limite)
          </span>
        </div>

        {/* Partenza Nave */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Partenza</span>
          <span className="text-base sm:text-lg font-black font-mono text-slate-300 leading-tight">
            {port.orarioPartenza}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {port.durataFinestraOre.split(' ')[0]} in porto
          </span>
        </div>
      </div>

      {/* Dettagli Logistica Molo & Trasporti Economici */}
      <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2.5 text-xs sm:text-sm">
        <div className="flex items-start gap-2.5">
          <Anchor className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong className="text-white font-semibold">Molo d'attracco:</strong>{' '}
            <span className="text-slate-200">{port.infoLogisticaMolo.nomeMolo}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Bus className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-snug flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              <strong className="text-white font-semibold">Uscita dal molo:</strong>{' '}
              <span className="text-slate-200">{port.infoLogisticaMolo.mezzoConsigliato}</span>
            </span>
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono font-bold text-xs">
              {port.infoLogisticaMolo.costoTransfer}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pt-2 border-t border-slate-800/70 font-normal">
          {port.infoLogisticaMolo.istruzioniDettagliate}
        </p>

        {/* Consiglio salva-soldi */}
        <div className="p-3 rounded-lg bg-cyan-950/50 border border-cyan-800/60 flex items-start gap-2.5 text-xs sm:text-[13px] text-cyan-200 leading-relaxed">
          <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-cyan-300 font-bold">Dritta Portuale:</strong> {port.infoLogisticaMolo.consiglioRisparmio}
          </p>
        </div>
      </div>

      {/* Barra di Avanzamento Tappe del Porto */}
      <div className="mt-3.5 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-400 mb-1.5">
          <span className="font-medium text-slate-300">Progresso circuito a piedi</span>
          <span className="font-mono text-cyan-400 font-bold">
            {stats.completed}/{stats.total} tappe ({stats.percent}%) •{' '}
            <span className="text-slate-400 font-normal">
              {stats.remainingKm > 0 ? `${stats.remainingKm} km da fare` : 'Completato! 🎉'}
            </span>
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/50">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-500 shadow-sm"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
      </div>

      {/* Pulsanti Azione Rapida: WhatsApp Copy & Google Maps Route */}
      <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-slate-800 no-print">
        <button
          onClick={handleCopy}
          className={`text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 border ${
            copied
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
        >
          {copied ? (
            <>
              <CheckCheck className="w-4 h-4 shrink-0" />
              <span>Copiato!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Copia WhatsApp</span>
            </>
          )}
        </button>

        <a
          href={fullRouteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2.5 px-3 rounded-xl font-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-950 active:scale-95"
        >
          <Map className="w-4 h-4 stroke-[2.5]" />
          <span>Mappa Intero Anello</span>
        </a>
      </div>
    </section>
  );
};
