/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MSC_EURIBIA_PHOTO } from '../data/stopImages';
import {
  Ship,
  Waves,
  Check,
  Compass,
  Sparkles,
  WifiOff,
  Utensils,
  Gamepad2,
  Wine,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';

const SEA_DAY_STORAGE_KEY = 'msc_sea_day_checklist_v1';

interface SeaDayMission {
  id: string;
  label: string;
  detail: string;
}

const SEA_DAY_MISSIONS: SeaDayMission[] = [
  {
    id: 'sd-roaming',
    label: 'Modalità Aereo + Wi-Fi interno MSC attivo',
    detail: 'Evita il roaming satellitare marittimo (carissimo) e usa la chat gratuita tra cabine su MSC for Me.'
  },
  {
    id: 'sd-bamboo',
    label: 'Relax alla Bamboo Pool coperta & idromassaggi',
    detail: 'Ponte 15: piscina indoor riscaldata perfetta per il clima di fine novembre.'
  },
  {
    id: 'sd-pranzo',
    label: 'Pranzo seduti al Ristorante Principale (incluso)',
    detail: 'Nel giorno di navigazione evita la folla del buffet delle 13:00 pranzando serviti al tavolo.'
  },
  {
    id: 'sd-sfida',
    label: 'Sfida tra amici: Bowling, Arcade o Sportplex',
    detail: 'Ponte 16: tornei interni o sessione vista mare in palestra Technogym.'
  },
  {
    id: 'sd-pub',
    label: 'Birra al Masters of the Sea o tramonto al Carousel Lounge',
    detail: 'Ponte 7 per il pub inglese con birre artigianali; Ponte 18 poppa per vista scia sul Mediterraneo.'
  },
  {
    id: 'sd-teatro',
    label: 'Prenota lo spettacolo serale al Delphi Theatre',
    detail: 'Si prenota gratis dall’app MSC for Me (o dai totem sui ponti) la mattina stessa.'
  },
  {
    id: 'sd-barcellona',
    label: 'Decidi la variante di domani a Barcellona (G6)',
    detail: 'Scegli in gruppo tra Anello Classico (7.7 km) o Con Sagrada Família & Avinguda de Gaudí (7.8 km).'
  }
];

const EURIBIA_DECKS = [
  {
    deck: 'Ponti 6–7',
    title: 'Galleria Euribia, Pub & Teatro',
    desc: 'Cupola LED lunga 112 m con show visivi, Masters of the Sea Pub, Helios Wine Bar, cioccolateria Jean-Philippe e Delphi Theatre.',
    Icon: Wine
  },
  {
    deck: 'Ponte 15',
    title: 'Bamboo Pool Coperta & Buffet',
    desc: 'Piscina interna riscaldata (top a novembre), idromassaggi panoramici e Marketplace Buffet aperto quasi tutto il giorno.',
    Icon: Waves
  },
  {
    deck: 'Ponte 16',
    title: 'Sportplex, Arcade & Palestra',
    desc: 'Campo polivalente indoor, bowling, simulatore F1, sala giochi e palestra Technogym affacciata sul mare.',
    Icon: Gamepad2
  },
  {
    deck: 'Ponte 18',
    title: 'Carousel Lounge & Sky Lounge',
    desc: 'Salone panoramico di poppa per cocktail con musica dal vivo e Sky Lounge riservata agli adulti per relax tranquillo.',
    Icon: Sparkles
  }
];

interface SeaDayViewProps {
  onSelectPort: (portId: string) => void;
}

export const SeaDayView: React.FC<SeaDayViewProps> = ({ onSelectPort }) => {
  const [checkedMissions, setCheckedMissions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(SEA_DAY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SEA_DAY_STORAGE_KEY, JSON.stringify(checkedMissions));
    } catch {
      // ignore storage errors
    }
  }, [checkedMissions]);

  const toggleMission = (id: string) => {
    setCheckedMissions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = SEA_DAY_MISSIONS.filter(m => checkedMissions[m.id]).length;

  return (
    <div className="space-y-4">
      {/* Hero Card Giorno 5 - Navigazione */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="relative h-44 sm:h-48 bg-slate-950 overflow-hidden">
          <img
            src={MSC_EURIBIA_PHOTO}
            alt="MSC Euribia in navigazione nel Mediterraneo"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
          <div className="absolute bottom-3.5 left-4 right-4">
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 shrink-0" />
              <span>Giorno 5 · Venerdì 27 nov 2026</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mt-0.5">
              In Navigazione verso Barcellona
            </h2>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            Giornata intera di mare aperto tra <strong className="text-white">La Goletta (Tunisia)</strong> e{' '}
            <strong className="text-white">Barcellona (Spagna)</strong>. Nessuno sbarco, nessuna sveglia obbligatoria: ricaricate le gambe dopo 3 scali consecutivi prima del gran finale catalano.
          </p>

          {/* 3 metriche pulite in stile maritime */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Rotta</div>
              <div className="font-mono text-xs sm:text-sm font-bold text-white mt-0.5">🇹🇳 → 🇪🇸</div>
              <div className="text-[10px] text-slate-400">~470 NM</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Fuso Orario</div>
              <div className="font-mono text-xs sm:text-sm font-bold text-cyan-300 mt-0.5">UTC+1</div>
              <div className="text-[10px] text-slate-400">Nessun cambio</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Domani</div>
              <div className="font-mono text-xs sm:text-sm font-bold text-amber-300 mt-0.5">08:00</div>
              <div className="text-[10px] text-slate-400">Arrivo BCN</div>
            </div>
          </div>
        </div>
      </section>

      {/* Avviso pratico Roaming Marittimo & Chat Gratuita */}
      <section className="rounded-2xl bg-amber-950/35 border border-amber-700/60 p-4 flex items-start gap-3">
        <WifiOff className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-100 leading-relaxed">
          <strong className="text-amber-300 block mb-0.5">Attenzione al Roaming Satellitare in mare</strong>
          Tieni sempre attiva la <strong>Modalità Aereo</strong> con il solo <strong>Wi-Fi acceso</strong> sulla rete della nave: eviti addebiti salati del roaming marittimo e puoi usare gratis la <strong>chat interna sull’app MSC for Me</strong> per coordinarvi tra voi 4.
        </div>
      </section>

      {/* Mappa Rapida Ponti Chiave MSC Euribia */}
      <section aria-label="Ponti chiave MSC Euribia" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Ship className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Ponti Chiave · MSC Euribia</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Bussola di bordo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EURIBIA_DECKS.map(({ deck, title, desc, Icon }) => (
            <div
              key={deck}
              className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold text-cyan-400">{deck}</span>
                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <div className="text-sm font-bold text-white leading-snug">{title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist Interattiva "Missioni del Giorno di Navigazione" */}
      <section aria-label="Checklist giornata in mare" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Missioni di Bordo</span>
          </h3>
          <span className="text-xs font-mono tabular-nums text-cyan-300 font-bold">
            {completedCount}/{SEA_DAY_MISSIONS.length}
          </span>
        </div>

        <div className="space-y-2">
          {SEA_DAY_MISSIONS.map((mission) => {
            const isDone = !!checkedMissions[mission.id];
            return (
              <button
                key={mission.id}
                type="button"
                onClick={() => toggleMission(mission.id)}
                aria-pressed={isDone}
                className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 active:scale-[0.99] ${
                  isDone
                    ? 'bg-emerald-950/25 border-emerald-700/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'bg-slate-900 border-slate-700 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-sm font-bold leading-snug ${
                      isDone ? 'line-through text-slate-400' : 'text-white'
                    }`}
                  >
                    {mission.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {mission.detail}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Dritte Furbe Giorno di Navigazione */}
      <section aria-label="Consigli pratici giorno di navigazione" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Dritte Furbe di Bordo</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Orari furbi al Buffet:</strong> nei giorni in mare l’ora di punta è 09:00–10:15 e 12:30–13:45. Scegliendo la sala ristorante principale a pranzo eviti code e stai seduto comodo.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Serata Elegante / Gala:</strong> spesso cade proprio nel giorno di navigazione (controlla il <em>Daily Program</em> in cabina la sera prima).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Prep Barcellona:</strong> domani si attracca alle 08:00 e si cammina tanto (~7.7–7.8 km). Carica powerbank e controlla quale variante volete fare.
            </span>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => onSelectPort('barcellona')}
          className="w-full min-h-[46px] mt-1 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          <span>Prepara Giorno 6 · Barcellona</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </section>

      {/* Navigazione Veloce Precedente (G4) / Successivo (G6) */}
      <nav
        aria-label="Navigazione tra giorni adiacenti"
        className="pt-2 pb-8 grid grid-cols-2 gap-2.5 w-full no-print"
      >
        <button
          type="button"
          onClick={() => onSelectPort('la-goletta')}
          className="w-full min-w-0 overflow-hidden p-2.5 sm:p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition active:scale-95 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-slate-400 font-mono truncate">Giorno 4</div>
            <div className="text-xs font-bold text-white truncate">🇹🇳 La Goletta</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectPort('barcellona')}
          className="w-full min-w-0 overflow-hidden p-2.5 sm:p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-right transition active:scale-95 flex items-center justify-end gap-2"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-slate-400 font-mono truncate">Giorno 6</div>
            <div className="text-xs font-bold text-white truncate">Barcellona 🇪🇸</div>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
        </button>
      </nav>
    </div>
  );
};
