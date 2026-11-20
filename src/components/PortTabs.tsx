/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortItinerary } from '../types/itinerary';
import { ComputedCountdown, formatCompactDuration } from '../data/countdownData';
import { Check, Timer } from 'lucide-react';

interface PortTabsProps {
  ports: PortItinerary[];
  activeViewId: string;
  onSelectPort: (portId: string) => void;
  onSelectCountdown: () => void;
  checkedStopsByPort: Record<string, string[]>;
  activeLiveCountdown: ComputedCountdown | null;
  isBeforeCruise: boolean;
  preCruiseRemainingMs: number;
}

export const PortTabs: React.FC<PortTabsProps> = ({
  ports,
  activeViewId,
  onSelectPort,
  onSelectCountdown,
  checkedStopsByPort,
  activeLiveCountdown,
  isBeforeCruise,
  preCruiseRemainingMs
}) => {
  const isCountdownActive = activeViewId === 'countdown';

  const getCountdownTabStyle = () => {
    if (isCountdownActive) {
      return 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 border border-cyan-400';
    }
    if (activeLiveCountdown) {
      if (activeLiveCountdown.urgency === 'critical' || activeLiveCountdown.urgency === 'expired') {
        return 'bg-rose-950/80 text-rose-200 border border-rose-600/80 hover:bg-rose-900/80';
      }
      if (activeLiveCountdown.urgency === 'caution') {
        return 'bg-amber-950/80 text-amber-200 border border-amber-600/80 hover:bg-amber-900/80';
      }
      if (activeLiveCountdown.urgency === 'safe') {
        return 'bg-emerald-950/70 text-emerald-200 border border-emerald-700/70 hover:bg-emerald-900/70';
      }
    }
    return 'bg-slate-900/90 text-slate-200 border border-slate-800 hover:bg-slate-800/90 hover:text-white';
  };

  const getCountdownSubLabel = () => {
    if (activeLiveCountdown) {
      return formatCompactDuration(activeLiveCountdown.remainingMs);
    }
    if (isBeforeCruise) {
      return formatCompactDuration(preCruiseRemainingMs);
    }
    return 'Timer';
  };

  const getCountdownIconColor = () => {
    if (isCountdownActive) return 'text-slate-950';
    if (activeLiveCountdown?.urgency === 'critical' || activeLiveCountdown?.urgency === 'expired') return 'text-rose-400';
    if (activeLiveCountdown?.urgency === 'caution') return 'text-amber-400';
    if (activeLiveCountdown?.urgency === 'safe') return 'text-emerald-400';
    return 'text-cyan-400';
  };

  return (
    <nav 
      aria-label="Selezione porto del giorno e countdown rientro"
      className="sticky top-[57px] z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 py-2 no-print"
    >
      <div className="max-w-xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {/* Pulsante Countdown Live Tutti a Bordo */}
        <button
          type="button"
          onClick={onSelectCountdown}
          aria-selected={isCountdownActive}
          role="tab"
          className={`shrink-0 min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all select-none whitespace-nowrap ${getCountdownTabStyle()}`}
        >
          <Timer className={`w-4 h-4 shrink-0 ${getCountdownIconColor()}`} />
          <div className="text-left flex flex-col">
            <span className="leading-tight">A Bordo</span>
            <span
              className={`text-[10px] font-mono tabular-nums leading-none mt-0.5 ${
                isCountdownActive ? 'text-slate-900 font-bold' : 'text-slate-300'
              }`}
            >
              {getCountdownSubLabel()}
            </span>
          </div>
        </button>

        {/* Tabs dei 5 Porti */}
        {ports.map((port) => {
          const isActive = port.id === activeViewId;
          const checked = checkedStopsByPort[port.id] || [];
          const totalStops = port.tappe.length;
          const isAllCompleted = totalStops > 0 && checked.length === totalStops;

          return (
            <button
              key={port.id}
              type="button"
              onClick={() => onSelectPort(port.id)}
              aria-selected={isActive}
              role="tab"
              className={`shrink-0 min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all select-none whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-slate-800/90 hover:text-white'
              }`}
            >
              <span className="text-base leading-none">{port.bandiera}</span>
              <div className="text-left flex flex-col">
                <span className="leading-tight">
                  {port.citta.split('/')[0].trim()}
                </span>
                <span className={`text-[10px] font-mono tabular-nums leading-none mt-0.5 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                  G{port.giornoNumero} · {port.kmTotaliStimati}km
                </span>
              </div>
              {isAllCompleted && (
                <span 
                  title="Tutte le tappe completate!"
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-slate-950 text-cyan-400' : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
