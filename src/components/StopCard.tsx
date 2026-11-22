/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Stop, CategoryType } from '../types/itinerary';
import { STOP_IMAGES } from '../data/stopImages';
import { generateStopGoogleMapsUrl } from '../utils/itineraryUtils';
import { 
  Check, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Clapperboard, 
  Sparkles,
  Mountain,
  Trees,
  Landmark,
  Utensils,
  Navigation,
  Compass,
  BookOpen,
  X,
  ZoomIn
} from 'lucide-react';

interface StopCardProps {
  stop: Stop;
  index: number;
  totalStops: number;
  isChecked: boolean;
  onToggleCheck: (stopId: string) => void;
  onOpenWiki?: (slug: string) => void;
}

export const StopCard: React.FC<StopCardProps> = ({
  stop,
  index,
  totalStops,
  isChecked,
  onToggleCheck,
  onOpenWiki
}) => {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isLast = index === totalStops - 1;
  const mapsUrl = generateStopGoogleMapsUrl(stop.query, stop.nome);
  const mappedPhoto = STOP_IMAGES[stop.id];
  const photoSrc = stop.immagine || mappedPhoto?.src;
  const photoCaption = stop.immagineDidascalia || mappedPhoto?.caption;
  const hasPhoto = Boolean(photoSrc && !imgError);

  useEffect(() => {
    if (!isPhotoOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPhotoOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoOpen]);

  // Badge styles based on category
  const categoryConfig: Record<CategoryType, { colorClass: string; icon: React.ReactNode }> = {
    'Panorama': {
      colorClass: 'bg-amber-950/70 text-amber-300 border-amber-800/70',
      icon: <Mountain className="w-3 h-3" />
    },
    'Parco': {
      colorClass: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/70',
      icon: <Trees className="w-3 h-3" />
    },
    'Storia': {
      colorClass: 'bg-blue-950/70 text-blue-300 border-blue-800/70',
      icon: <Landmark className="w-3 h-3" />
    },
    'Nerd/Pop': {
      colorClass: 'bg-purple-950/70 text-purple-300 border-purple-800/70',
      icon: <Clapperboard className="w-3 h-3" />
    },
    'Archeologia': {
      colorClass: 'bg-orange-950/70 text-orange-300 border-orange-800/70',
      icon: <Compass className="w-3 h-3" />
    },
    'Architettura/Cult': {
      colorClass: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/70',
      icon: <Sparkles className="w-3 h-3" />
    },
    'Cibo Cult': {
      colorClass: 'bg-rose-950/70 text-rose-300 border-rose-800/70',
      icon: <Utensils className="w-3 h-3" />
    },
    'Logistica': {
      colorClass: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/70',
      icon: <Navigation className="w-3 h-3" />
    },
    'Ritorno': {
      colorClass: 'bg-slate-800 text-slate-300 border-slate-700',
      icon: <MapPin className="w-3 h-3" />
    }
  };

  const currentCategory = categoryConfig[stop.tipologia] || categoryConfig['Storia'];

  return (
    <div className="relative pl-7 sm:pl-8 pb-6 last:pb-1 group print-break-inside-avoid">
      {/* Linea verticale timeline */}
      {!isLast && (
        <div 
          className={`absolute left-[13px] top-6 bottom-0 w-0.5 transition-colors ${
            isChecked ? 'bg-emerald-500/30' : 'bg-slate-800'
          }`} 
        />
      )}

      {/* Pallino circolare numero / spunta completata */}
      <button
        onClick={() => onToggleCheck(stop.id)}
        aria-label={`Segna ${stop.nome} come ${isChecked ? 'non visitata' : 'completata'}`}
        className={`absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
          isChecked
            ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-950/60 shadow-md shadow-emerald-900/40'
            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-white'
        }`}
      >
        {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : index + 1}
      </button>

      {/* Card Principale Tappa */}
      <div 
        className={`p-4 rounded-2xl border transition-all duration-200 ${
          isChecked
            ? 'bg-slate-900/60 border-emerald-500/40 shadow-sm'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700/80 shadow-md'
        }`}
      >
        {/* Intestazione: Orario, Categoria & Km parziali */}
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {stop.orario}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${currentCategory.colorClass}`}>
              {currentCategory.icon}
              {stop.tipologia}
            </span>
            <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-800">
              +{stop.kmParziali} km
            </span>
          </div>
        </div>

        {/* Nome della Tappa + Miniatura Foto Cliccabile */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={`font-extrabold text-base sm:text-lg leading-snug transition-colors ${
              isChecked ? 'line-through text-slate-400' : 'text-white'
            }`}>
              {stop.nome}
            </h3>
          </div>

          {hasPhoto && (
            <button
              type="button"
              onClick={() => setIsPhotoOpen(true)}
              aria-label={`Ingrandisci foto di ${stop.nome}`}
              className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden border border-slate-700/80 hover:border-cyan-400/80 bg-slate-950 group/thumb transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500 no-print"
            >
              <img
                src={photoSrc}
                alt={photoCaption || stop.nome}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105 ${
                  isChecked ? 'opacity-65' : 'opacity-100'
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-1 right-1 w-5 h-5 rounded-md bg-slate-950/80 border border-slate-700/80 text-cyan-300 flex items-center justify-center"
              >
                <ZoomIn className="w-3 h-3" />
              </span>
            </button>
          )}
        </div>

        {/* Descrizione (ingrandita per facilitare la lettura all'aperto) */}
        <p className={`text-sm sm:text-[14.5px] mt-2 leading-relaxed ${
          isChecked ? 'text-slate-400' : 'text-slate-200 font-normal'
        }`}>
          {stop.descrizione}
        </p>

        {/* Box Nerd & Pop Culture / Aneddoto Storico Insolito (testo ingrandito) */}
        {stop.curiositaNerd && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
            <span className="text-base shrink-0 mt-0.5">🎬</span>
            <div>
              <strong className="text-white font-semibold">Curiosità & Pop:</strong>{' '}
              <span>{stop.curiositaNerd}</span>
            </div>
          </div>
        )}

        {/* Barra di Azioni: Checkbox, Wikipedia Offline & Apri su Maps */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap no-print">
          <label 
            className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300 hover:text-white select-none py-1"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggleCheck(stop.id)}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-800 border-slate-700 cursor-pointer"
            />
            <span className="font-medium">
              {isChecked ? 'Tappa completata' : 'Segna come visitata'}
            </span>
          </label>

          <div className="flex items-center gap-1.5">
            {stop.wikiSlug && onOpenWiki && (
              <button
                type="button"
                onClick={() => onOpenWiki(stop.wikiSlug!)}
                aria-label={`Leggi scheda Wikipedia offline di ${stop.nome}`}
                className="text-xs sm:text-sm bg-cyan-950/90 hover:bg-cyan-900 text-cyan-300 px-3 py-1.5 rounded-xl border border-cyan-800/80 flex items-center gap-1.5 transition active:scale-95 font-bold shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Wiki Offline</span>
              </button>
            )}

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri ${stop.nome} su Google Maps`}
              className="text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3.5 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition active:scale-95 font-bold"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Maps</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Schermo Intero Foto Tappa */}
      {isPhotoOpen && hasPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto: ${stop.nome}`}
          onClick={() => setIsPhotoOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 no-print"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl"
          >
            <div className="relative bg-slate-950 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={photoSrc}
                alt={photoCaption || stop.nome}
                className="w-full max-h-[70vh] object-contain"
              />
              <button
                type="button"
                onClick={() => setIsPhotoOpen(false)}
                aria-label="Chiudi foto"
                className="absolute top-2.5 right-2.5 min-w-[40px] min-h-[40px] rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center transition active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-cyan-400 mb-0.5">
                  Tappa {index + 1} · {stop.orario}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {stop.nome}
                </h4>
                {photoCaption && (
                  <p className="text-xs text-slate-400 mt-1">
                    {photoCaption}
                  </p>
                )}
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 min-h-[40px] px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
