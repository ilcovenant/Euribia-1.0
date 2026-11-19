/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortItinerary } from '../types/itinerary';
import { Check } from 'lucide-react';

interface PortTabsProps {
  ports: PortItinerary[];
  activePortId: string;
  onSelectPort: (portId: string) => void;
  checkedStopsByPort: Record<string, string[]>;
}

export const PortTabs: React.FC<PortTabsProps> = ({
  ports,
  activePortId,
  onSelectPort,
  checkedStopsByPort
}) => {
  return (
    <nav 
      aria-label="Selezione porto del giorno"
      className="sticky top-[57px] z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 py-2 no-print"
    >
      <div className="max-w-xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {ports.map((port) => {
          const isActive = port.id === activePortId;
          const checked = checkedStopsByPort[port.id] || [];
          const totalStops = port.tappe.length;
          const isAllCompleted = totalStops > 0 && checked.length === totalStops;

          return (
            <button
              key={port.id}
              onClick={() => onSelectPort(port.id)}
              aria-selected={isActive}
              role="tab"
              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all select-none ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-slate-800/90 hover:text-white'
              }`}
            >
              <span className="text-base leading-none">{port.bandiera}</span>
              <div className="text-left flex flex-col">
                <span className="leading-tight">
                  {port.citta.split('/')[0].trim()}
                </span>
                <span className={`text-[10px] font-mono leading-none ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                  G{port.giornoNumero} • {port.kmTotaliStimati}km
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
