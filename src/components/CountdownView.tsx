/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  PORT_RETURN_SCHEDULES,
  ComputedCountdown,
  formatDurationHms,
  formatCompactDuration,
  shiftTimeString,
  UrgencyLevel
} from '../data/countdownData';
import { AlertPreferences, SimulationState, playOfflineAlertSignal } from '../hooks/useAllAboardCountdown';
import { generateStopGoogleMapsUrl } from '../utils/itineraryUtils';
import {
  AlertTriangle,
  CheckCircle2,
  Navigation,
  CarTaxiFront,
  Volume2,
  VolumeX,
  RotateCcw,
  Minus,
  Plus,
  X,
  Anchor,
  Clock,
  FlaskConical,
  ArrowRight
} from 'lucide-react';

interface CountdownViewProps {
  selectedPortId: string;
  onSelectPortId: (portId: string) => void;
  inspectedCountdown: ComputedCountdown;
  isBeforeBoarding: boolean;
  isBeforeCruise: boolean;
  boardingRemainingMs: number;
  preCruiseRemainingMs: number;
  arrivalRemainingMs: number;
  todayPortId: string | null;
  simulation: SimulationState | null;
  onAdjustOffset: (portId: string, deltaMin: number) => void;
  onResetOffset: (portId: string) => void;
  onStartSimulation: (portId: string, remainingMinutes: number) => void;
  onStopSimulation: () => void;
  alertPrefs: AlertPreferences;
  onToggleAlertEnabled: () => void;
  onSetAlertThreshold: (thresholdMin: 60 | 30) => void;
  alertBannerMessage: string | null;
  onDismissAlertBanner: () => void;
  onOpenPortItinerary: (portId: string) => void;
}

function getUrgencyStyle(urgency: UrgencyLevel, kind: 'embark' | 'port' | 'disembark') {
  switch (urgency) {
    case 'safe':
      return {
        label: kind === 'embark' ? 'Imbarco con margine' : kind === 'disembark' ? 'Arrivo programmato' : 'Margine comodo',
        sublabel:
          kind === 'embark'
            ? 'Preparati con calma per il check-in a Ponte dei Mille.'
            : kind === 'disembark'
            ? 'Ultima mattina a bordo prima dello sbarco a Genova.'
            : 'Goditi le tappe con calma: hai ancora ampio margine.',
        textColor: 'text-emerald-400',
        ringStroke: '#10b981',
        borderClass: 'border-emerald-800/60',
        surfaceClass: 'bg-emerald-950/30',
        Icon: CheckCircle2
      };
    case 'caution':
      return {
        label: kind === 'embark' ? 'Avvicinati al terminal' : kind === 'disembark' ? 'Arrivo imminente' : 'Inizia il rientro al molo',
        sublabel:
          kind === 'embark'
            ? 'Meno di 90 minuti: tieni pronti biglietto MSC e documenti.'
            : kind === 'disembark'
            ? 'Meno di 90 minuti all’attracco a Genova (ore 09:00).'
            : 'Meno di 90 minuti al Tutti a Bordo: avvicinati al terminal.',
        textColor: 'text-amber-400',
        ringStroke: '#f59e0b',
        borderClass: 'border-amber-700/70',
        surfaceClass: 'bg-amber-950/35',
        Icon: AlertTriangle
      };
    case 'critical':
      return {
        label: kind === 'embark' ? 'Imbarco imminente!' : kind === 'disembark' ? 'Quasi a Genova!' : 'Rientro immediato al terminal',
        sublabel:
          kind === 'embark'
            ? 'Meno di 45 minuti: raggiungi subito il gate MSC a Ponte dei Mille.'
            : kind === 'disembark'
            ? 'Meno di 45 minuti all’arrivo al porto di Genova.'
            : 'Meno di 45 minuti: torna subito verso la nave!',
        textColor: 'text-rose-400',
        ringStroke: '#f43f5e',
        borderClass: 'border-rose-600/80',
        surfaceClass: 'bg-rose-950/45',
        Icon: AlertTriangle
      };
    case 'expired':
      return {
        label: kind === 'embark' ? 'Nave in partenza' : kind === 'disembark' ? 'Arrivati a Genova' : 'Tutti a Bordo superato',
        sublabel:
          kind === 'embark'
            ? 'La MSC Euribia è in partenza dal porto di Genova.'
            : kind === 'disembark'
            ? 'Crociera conclusa: bentornati al porto di Genova!'
            : 'La passerella chiude ora: recati subito al molo.',
        textColor: kind === 'disembark' ? 'text-cyan-400' : 'text-rose-400',
        ringStroke: kind === 'disembark' ? '#06b6d4' : '#e11d48',
        borderClass: kind === 'disembark' ? 'border-cyan-700/70' : 'border-rose-600',
        surfaceClass: kind === 'disembark' ? 'bg-cyan-950/30' : 'bg-rose-950/50',
        Icon: kind === 'disembark' ? CheckCircle2 : AlertTriangle
      };
    case 'pre-cruise':
      return {
        label: kind === 'embark' ? 'Imbarco Genova · 23 nov' : kind === 'disembark' ? 'Rientro fine 7 notti' : 'Scalo programmato',
        sublabel:
          kind === 'embark'
            ? 'Boarding dalle 14:00 a Ponte dei Mille, partenza nave alle 17:00.'
            : kind === 'disembark'
            ? 'Rientro previsto al porto di Genova lunedì 30 novembre alle 09:00.'
            : 'Il countdown live partirà automaticamente il giorno dello scalo.',
        textColor: 'text-cyan-400',
        ringStroke: '#06b6d4',
        borderClass: 'border-slate-800',
        surfaceClass: 'bg-slate-900',
        Icon: Clock
      };
    case 'scheduled':
    default:
      return {
        label: kind === 'disembark' ? 'In navigazione verso Genova' : 'In attesa dello scalo',
        sublabel: 'Orario sincronizzato su fuso unico UTC+1 (0 ore di differenza).',
        textColor: 'text-cyan-400',
        ringStroke: '#06b6d4',
        borderClass: 'border-slate-800',
        surfaceClass: 'bg-slate-900',
        Icon: Clock
      };
  }
}

export const CountdownView: React.FC<CountdownViewProps> = ({
  selectedPortId,
  onSelectPortId,
  inspectedCountdown,
  boardingRemainingMs,
  preCruiseRemainingMs,
  arrivalRemainingMs,
  todayPortId,
  simulation,
  onAdjustOffset,
  onResetOffset,
  onStartSimulation,
  onStopSimulation,
  alertPrefs,
  onToggleAlertEnabled,
  onSetAlertThreshold,
  alertBannerMessage,
  onDismissAlertBanner,
  onOpenPortItinerary
}) => {
  const [isTaxiCardOpen, setIsTaxiCardOpen] = useState(false);

  useEffect(() => {
    if (!isTaxiCardOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTaxiCardOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTaxiCardOpen]);

  const isBoardingHighlight = selectedPortId === 'genova-imbarco' && boardingRemainingMs > 0;
  const isDepartureHighlight = selectedPortId === 'genova-imbarco' && boardingRemainingMs <= 0;

  const {
    port,
    isSimulated,
    isLiveToday,
    offsetMin,
    adjustedAllAboardTime,
    targetLabel,
    remainingMs,
    progressPercent,
    urgency
  } = inspectedCountdown;
  const style = getUrgencyStyle(urgency, port.kind);
  const StatusIcon = style.Icon;

  // Geometria anello SVG (r = 76)
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progressPercent / 100) * circumference;

  const returnMapsUrl = generateStopGoogleMapsUrl(port.mapsReturnQuery, port.taxiCard.terminalTitolo);

  return (
    <div className="space-y-4">
      {/* Banner avviso soglia superata (se scattato) */}
      {alertBannerMessage && (
        <div
          role="alert"
          className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-600/80 text-amber-100 flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5 text-xs sm:text-sm leading-snug">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <span>{alertBannerMessage}</span>
          </div>
          <button
            type="button"
            onClick={onDismissAlertBanner}
            aria-label="Chiudi avviso rientro"
            className="min-w-[36px] min-h-[36px] rounded-xl bg-amber-900/60 text-amber-200 flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Riepilogo Tappe Chiave Genova: Boarding 14:00 · Partenza 17:00 · Arrivo 30 nov 09:00 */}
      <section aria-label="Orari chiave imbarco e rientro Genova" className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onSelectPortId('genova-imbarco')}
          className={`p-2.5 rounded-2xl border text-left transition active:scale-[0.98] ${
            isBoardingHighlight
              ? 'bg-cyan-950/50 border-cyan-500/70'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[10px] text-slate-400 truncate">Boarding · 23 nov</div>
          <div className="font-mono tabular-nums text-sm font-extrabold text-cyan-300 mt-0.5">
            14:00
          </div>
          <div className="font-mono tabular-nums text-[10px] text-slate-300 mt-0.5 truncate">
            {boardingRemainingMs > 0 ? `tra ${formatCompactDuration(boardingRemainingMs)}` : 'Aperto'}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectPortId('genova-imbarco')}
          className={`p-2.5 rounded-2xl border text-left transition active:scale-[0.98] ${
            isDepartureHighlight
              ? 'bg-amber-950/45 border-amber-500/70'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[10px] text-slate-400 truncate">Partenza · 23 nov</div>
          <div className="font-mono tabular-nums text-sm font-extrabold text-amber-300 mt-0.5">
            17:00
          </div>
          <div className="font-mono tabular-nums text-[10px] text-slate-300 mt-0.5 truncate">
            {preCruiseRemainingMs > 0 ? `tra ${formatCompactDuration(preCruiseRemainingMs)}` : 'Salpata'}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectPortId('genova-arrivo')}
          className={`p-2.5 rounded-2xl border text-left transition active:scale-[0.98] ${
            selectedPortId === 'genova-arrivo'
              ? 'bg-cyan-950/50 border-cyan-500/70'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[10px] text-slate-400 truncate">Arrivo · 30 nov</div>
          <div className="font-mono tabular-nums text-sm font-extrabold text-emerald-300 mt-0.5">
            09:00
          </div>
          <div className="font-mono tabular-nums text-[10px] text-slate-300 mt-0.5 truncate">
            {arrivalRemainingMs > 0 ? `tra ${formatCompactDuration(arrivalRemainingMs)}` : 'Arrivata'}
          </div>
        </button>
      </section>

      {/* Selettore rapido: Imbarco Genova + 5 Scali + Arrivo Genova */}
      <section aria-label="Scegli tappa per il countdown" className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-0.5">
          <span className="font-semibold text-slate-200">Tappa selezionata</span>
          <span>Fuso unico UTC+1 · 100% offline</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {PORT_RETURN_SCHEDULES.map((item) => {
            const isSelected = item.portId === selectedPortId;
            const isToday = item.portId === todayPortId;
            return (
              <button
                key={item.portId}
                type="button"
                onClick={() => onSelectPortId(item.portId)}
                aria-pressed={isSelected}
                className={`shrink-0 min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{item.bandiera}</span>
                <span>{item.tabLabel}</span>
                {isToday && (
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-900' : 'text-cyan-400'}`}>
                    Oggi
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Card Principale: Anello Progresso & Orologio */}
      <section
        aria-label={`Countdown ${port.citta}`}
        className={`rounded-2xl border p-5 transition-colors ${style.surfaceClass} ${style.borderClass}`}
      >
        {/* Metadati puliti senza pillole */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-4">
          <span className="truncate">
            {port.bandiera} {port.citta} · {port.giornoCaption}
          </span>
          <span className="font-mono tabular-nums shrink-0 text-slate-300">
            {isSimulated ? 'Modalità prova attiva' : port.isoDate.split('-').reverse().join('/')}
          </span>
        </div>

        {/* SVG Progress Ring + Orologio centrale */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 180 180" aria-hidden="true">
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
              />
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={style.ringStroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-500"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <span className="text-[11px] font-medium text-slate-400 mb-0.5">
                {targetLabel}
              </span>
              <span
                className={`font-mono tabular-nums font-black tracking-tight ${
                  isLiveToday || isSimulated ? 'text-3xl text-white' : 'text-2xl text-white'
                }`}
              >
                {isLiveToday || isSimulated
                  ? formatDurationHms(remainingMs)
                  : formatCompactDuration(remainingMs)}
              </span>
              <span className={`mt-1 text-xs font-bold flex items-center gap-1 ${style.textColor}`}>
                <StatusIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{style.label}</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 text-center max-w-xs mt-2 leading-relaxed">
            {style.sublabel}
          </p>
        </div>

        {/* Riga Orari Tappa (3 colonne con cifre tabellari e label contestuali) */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
          <div>
            <div className="text-[11px] text-slate-400">{port.col1Label}</div>
            <div className="font-mono tabular-nums text-base font-bold text-slate-200 mt-0.5">
              {port.kind === 'port' ? port.orarioAttracco : shiftTimeString(port.orarioAttracco, offsetMin)}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-amber-400">{port.col2Label}</div>
            <div className="font-mono tabular-nums text-lg font-black text-amber-300 mt-0.5">
              {port.kind === 'embark'
                ? shiftTimeString(port.orarioTuttiABordo, offsetMin)
                : adjustedAllAboardTime}
            </div>
            {offsetMin !== 0 && (
              <div className="text-[10px] font-mono text-amber-400/90">
                ({offsetMin > 0 ? `+${offsetMin}` : offsetMin} min)
              </div>
            )}
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{port.col3Label}</div>
            <div className="font-mono tabular-nums text-base font-bold text-slate-200 mt-0.5">
              {shiftTimeString(port.orarioPartenza, offsetMin)}
            </div>
          </div>
        </div>

        {/* Regolazione rapida se il Comandante modifica l'orario sul Daily Program */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Variazione Daily Program:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onAdjustOffset(port.portId, -15)}
              className="min-h-[44px] px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-bold text-slate-200 flex items-center gap-1 transition active:scale-95 whitespace-nowrap"
            >
              <Minus className="w-3.5 h-3.5" />
              15m
            </button>
            <button
              type="button"
              onClick={() => onAdjustOffset(port.portId, 15)}
              className="min-h-[44px] px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-bold text-slate-200 flex items-center gap-1 transition active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              15m
            </button>
            {offsetMin !== 0 && (
              <button
                type="button"
                onClick={() => onResetOffset(port.portId)}
                aria-label="Ripristina orario ufficiale"
                className="min-h-[44px] min-w-[44px] px-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Azioni Rapide di Rientro al Molo (Thumb-friendly >= 48px) */}
      <section aria-label="Azioni di rientro al molo" className="space-y-2.5">
        <a
          href={returnMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-md shadow-cyan-950/40"
        >
          <Navigation className="w-4 h-4 stroke-[2.5] shrink-0" />
          <span>{port.mapsCtaLabel}</span>
        </a>

        <div className={`grid gap-2.5 ${port.hasItinerary ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <button
            type="button"
            onClick={() => setIsTaxiCardOpen(true)}
            className="min-h-[48px] px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <CarTaxiFront className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mostra al Tassista</span>
          </button>

          {port.hasItinerary && (
            <button
              type="button"
              onClick={() => onOpenPortItinerary(port.portId)}
              className="min-h-[48px] px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <span>Tappe {port.citta}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
            </button>
          )}
        </div>
      </section>

      {/* Avviso Acustico / Vibrazione Offline */}
      <section aria-label="Avviso rientro offline" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {alertPrefs.enabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>Avviso sonoro e vibrazione</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Segnale locale offline ad app aperta al raggiungimento della soglia.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={alertPrefs.enabled}
            onClick={onToggleAlertEnabled}
            className={`min-h-[44px] px-3.5 rounded-xl font-bold text-xs transition shrink-0 whitespace-nowrap ${
              alertPrefs.enabled
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {alertPrefs.enabled ? 'Attivo' : 'Disattivo'}
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSetAlertThreshold(60)}
              aria-pressed={alertPrefs.thresholdMin === 60}
              className={`min-h-[40px] px-3 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                alertPrefs.thresholdMin === 60
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-700/70'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              A -60 min
            </button>
            <button
              type="button"
              onClick={() => onSetAlertThreshold(30)}
              aria-pressed={alertPrefs.thresholdMin === 30}
              className={`min-h-[40px] px-3 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                alertPrefs.thresholdMin === 30
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-700/70'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              A -30 min
            </button>
          </div>

          <button
            type="button"
            onClick={playOfflineAlertSignal}
            className="min-h-[40px] px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition active:scale-95 whitespace-nowrap"
          >
            Prova segnale
          </button>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Nota: su smartphone gli avvisi web suonano con la PWA aperta; per sicurezza in tasca conviene impostare anche una sveglia del telefono 60 minuti prima delle <strong className="text-slate-200 font-mono">{adjustedAllAboardTime}</strong>.
        </p>
      </section>

      {/* Modalità Prova Pre-Partenza */}
      <section aria-label="Prova il countdown prima della partenza" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Prova il timer prima di partire</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simula uno scalo in corso per vedere colori, barra superiore e avvisi.
            </p>
          </div>
          {simulation && (
            <button
              type="button"
              onClick={onStopSimulation}
              className="min-h-[40px] px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-200 text-xs font-bold shrink-0 whitespace-nowrap"
            >
              Esci da prova
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onStartSimulation(port.portId, 120)}
            className="min-h-[44px] px-2 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-emerald-400 transition active:scale-95"
          >
            Simula 2h
          </button>
          <button
            type="button"
            onClick={() => onStartSimulation(port.portId, 50)}
            className="min-h-[44px] px-2 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-amber-400 transition active:scale-95"
          >
            Simula 50m
          </button>
          <button
            type="button"
            onClick={() => onStartSimulation(port.portId, 20)}
            className="min-h-[44px] px-2 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-rose-400 transition active:scale-95"
          >
            Simula 20m
          </button>
        </div>
      </section>

      {/* Modale Schermo Intero: Mostra al Tassista */}
      {isTaxiCardOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="taxi-card-title"
          onClick={() => setIsTaxiCardOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Anchor className="w-4 h-4" />
                <span>Scheda rientro · {port.taxiCard.linguaLabel}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsTaxiCardOpen(false)}
                aria-label="Chiudi scheda tassista"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400">MSC EURIBIA · {port.citta.toUpperCase()}</div>
              <h2 id="taxi-card-title" className="text-2xl font-black text-white leading-tight">
                {port.taxiCard.terminalTitolo}
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                {port.taxiCard.indirizzoLocale}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/50">
              <p className="text-lg font-extrabold text-amber-300 leading-snug">
                “{port.taxiCard.fraseTassista}”
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {port.taxiCard.notaRientro}
            </p>

            <button
              type="button"
              onClick={() => setIsTaxiCardOpen(false)}
              className="w-full min-h-[48px] rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition active:scale-[0.98]"
            >
              Chiudi scheda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
