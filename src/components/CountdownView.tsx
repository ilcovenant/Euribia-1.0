/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  PORT_RETURN_SCHEDULES,
  ComputedCountdown,
  formatDurationHms,
  formatCompactDuration,
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
  isBeforeCruise: boolean;
  preCruiseRemainingMs: number;
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

function getUrgencyStyle(urgency: UrgencyLevel) {
  switch (urgency) {
    case 'safe':
      return {
        label: 'Margine comodo',
        sublabel: 'Goditi le tappe con calma: hai ancora ampio margine.',
        textColor: 'text-emerald-400',
        ringStroke: '#10b981',
        borderClass: 'border-emerald-800/60',
        surfaceClass: 'bg-emerald-950/30',
        Icon: CheckCircle2
      };
    case 'caution':
      return {
        label: 'Inizia il rientro al molo',
        sublabel: 'Meno di 90 minuti al Tutti a Bordo: avvicinati al terminal.',
        textColor: 'text-amber-400',
        ringStroke: '#f59e0b',
        borderClass: 'border-amber-700/70',
        surfaceClass: 'bg-amber-950/35',
        Icon: AlertTriangle
      };
    case 'critical':
      return {
        label: 'Rientro immediato al terminal',
        sublabel: 'Meno di 45 minuti: torna subito verso la nave!',
        textColor: 'text-rose-400',
        ringStroke: '#f43f5e',
        borderClass: 'border-rose-600/80',
        surfaceClass: 'bg-rose-950/45',
        Icon: AlertTriangle
      };
    case 'expired':
      return {
        label: 'Tutti a Bordo superato',
        sublabel: 'La passerella chiude ora: recati subito al molo.',
        textColor: 'text-rose-400',
        ringStroke: '#e11d48',
        borderClass: 'border-rose-600',
        surfaceClass: 'bg-rose-950/50',
        Icon: AlertTriangle
      };
    case 'pre-cruise':
      return {
        label: 'Scalo programmato',
        sublabel: 'Il countdown live partirà automaticamente il giorno dello scalo.',
        textColor: 'text-cyan-400',
        ringStroke: '#06b6d4',
        borderClass: 'border-slate-800',
        surfaceClass: 'bg-slate-900',
        Icon: Clock
      };
    case 'scheduled':
    default:
      return {
        label: 'In attesa dello scalo',
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
  isBeforeCruise,
  preCruiseRemainingMs,
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

  const { port, isSimulated, isLiveToday, offsetMin, adjustedAllAboardTime, remainingMs, progressPercent, urgency } =
    inspectedCountdown;
  const style = getUrgencyStyle(urgency);
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

      {/* Intestazione compatta pre-crociera (prima del 23 nov ore 17:00) */}
      {isBeforeCruise && !simulation && (
        <div className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-slate-400">Imbarco Genova · 23 nov ore 17:00</p>
            <p className="text-sm font-bold text-white truncate">Partenza MSC Euribia tra</p>
          </div>
          <div className="font-mono tabular-nums text-base sm:text-lg font-extrabold text-cyan-400 shrink-0">
            {formatCompactDuration(preCruiseRemainingMs)}
          </div>
        </div>
      )}

      {/* Selettore rapido dei 5 scali */}
      <section aria-label="Scegli scalo per il countdown" className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-0.5">
          <span className="font-semibold text-slate-200">Scalo selezionato</span>
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
                <span>{item.citta}</span>
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

      {/* Card Principale: Anello Progresso & Orologio Tutti a Bordo */}
      <section
        aria-label={`Countdown Tutti a Bordo ${port.citta}`}
        className={`rounded-2xl border p-5 transition-colors ${style.surfaceClass} ${style.borderClass}`}
      >
        {/* Metadati puliti senza pillole */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-4">
          <span className="truncate">
            {port.bandiera} {port.citta} · Giorno {port.giornoNumero}
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
                {isLiveToday || isSimulated ? 'Al Tutti a Bordo' : 'Mancano allo scalo'}
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

        {/* Riga Orari Scalo (3 colonne con cifre tabellari) */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
          <div>
            <div className="text-[11px] text-slate-400">Attracco</div>
            <div className="font-mono tabular-nums text-base font-bold text-slate-200 mt-0.5">
              {port.orarioAttracco}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-amber-400">Tutti a Bordo</div>
            <div className="font-mono tabular-nums text-lg font-black text-amber-300 mt-0.5">
              {adjustedAllAboardTime}
            </div>
            {offsetMin !== 0 && (
              <div className="text-[10px] font-mono text-amber-400/90">
                ({offsetMin > 0 ? `+${offsetMin}` : offsetMin} min)
              </div>
            )}
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Partenza</div>
            <div className="font-mono tabular-nums text-base font-bold text-slate-200 mt-0.5">
              {port.orarioPartenza}
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
          <span>Apri Rientro al Molo su Google Maps</span>
        </a>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setIsTaxiCardOpen(true)}
            className="min-h-[48px] px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <CarTaxiFront className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mostra al Tassista</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenPortItinerary(port.portId)}
            className="min-h-[48px] px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <span>Tappe {port.citta}</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
          </button>
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
