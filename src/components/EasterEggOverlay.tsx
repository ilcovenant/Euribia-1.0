/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { PortAchievement, playRouletteTick } from '../utils/easterEggs';
import { Trophy, Sparkles, Ship, X, Shuffle, Users, Check } from 'lucide-react';

const CREW_NAMES_STORAGE_KEY = 'msc_crew_names_v1';
const DEFAULT_CREW = ['Amico 1', 'Amico 2', 'Amico 3', 'Amico 4'];

const ROUND_PRESETS = [
  { id: 'cibo', label: 'Dolce / Street Food', verdict: 'offre sfogliatelle, cannoli o bambalouni a tutti!' },
  { id: 'bar', label: 'Giro al Bar', verdict: 'offre il giro (analcolico, birra o shot mirato)!' },
  { id: 'bus', label: 'Biglietti Bus / TGM', verdict: 'paga i prossimi biglietti per tutto il gruppo!' },
  { id: 'jolly', label: 'Scelta Libera', verdict: 'è il prescelto ufficiale di questo turno!' }
];

const CONFETTI_PIECES = [
  { left: '8%', color: '#22d3ee', delay: '0ms', size: 'w-2 h-2' },
  { left: '16%', color: '#f59e0b', delay: '70ms', size: 'w-1.5 h-3' },
  { left: '25%', color: '#34d399', delay: '120ms', size: 'w-2 h-2' },
  { left: '34%', color: '#a78bfa', delay: '40ms', size: 'w-2 h-1.5' },
  { left: '43%', color: '#38bdf8', delay: '160ms', size: 'w-1.5 h-3' },
  { left: '52%', color: '#fbbf24', delay: '90ms', size: 'w-2.5 h-2' },
  { left: '61%', color: '#f472b6', delay: '30ms', size: 'w-2 h-2' },
  { left: '70%', color: '#22d3ee', delay: '140ms', size: 'w-1.5 h-3' },
  { left: '79%', color: '#34d399', delay: '60ms', size: 'w-2 h-2' },
  { left: '88%', color: '#f59e0b', delay: '110ms', size: 'w-2 h-1.5' },
  { left: '93%', color: '#e2e8f0', delay: '180ms', size: 'w-2 h-2' }
];

interface AchievementToastProps {
  achievement: PortAchievement | null;
  onDismiss: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onDismiss
}) => {
  useEffect(() => {
    if (!achievement) return;
    const duration = achievement.isPlatinum ? 9000 : 6500;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const isPlat = !!achievement.isPlatinum;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md pointer-events-auto no-print"
    >
      {/* Micro-coriandoli leggeri senza librerie esterne */}
      <div className="pointer-events-none absolute -top-2 inset-x-0 h-28 overflow-hidden" aria-hidden="true">
        {CONFETTI_PIECES.map((piece, idx) => (
          <span
            key={idx}
            className={`absolute top-0 rounded-sm ${piece.size} animate-bounce`}
            style={{
              left: piece.left,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              animationDuration: `${900 + (idx % 4) * 180}ms`,
              opacity: 0.9
            }}
          />
        ))}
      </div>

      <div
        className={`relative rounded-2xl border p-4 shadow-2xl backdrop-blur-md flex items-start gap-3 ${
          isPlat
            ? 'bg-gradient-to-r from-slate-900 via-cyan-950/95 to-indigo-950/95 border-cyan-300/80 shadow-cyan-500/25'
            : 'bg-slate-900/95 border-amber-500/70 shadow-amber-950/50'
        }`}
      >
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
            isPlat
              ? 'bg-gradient-to-br from-cyan-400 to-indigo-400 text-slate-950 border-white/60 shadow-lg shadow-cyan-500/30'
              : 'bg-amber-500/20 text-amber-300 border-amber-400/50'
          }`}
        >
          {isPlat ? <Sparkles className="w-6 h-6 stroke-[2.3]" /> : <Trophy className="w-5 h-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isPlat ? 'text-cyan-300' : 'text-amber-300'}`}>
            {isPlat ? 'Achievement Platino Sbloccato' : 'Achievement Sbloccato · 100%'}
          </div>
          <div className="text-sm sm:text-base font-black text-white leading-tight mt-0.5">
            {achievement.title}
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-snug">
            {achievement.subtitle}
          </p>
          <div className={`text-[10px] font-mono mt-1.5 ${isPlat ? 'text-cyan-200' : 'text-amber-200/90'}`}>
            {achievement.rarity}
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Chiudi notifica trofeo"
          className="w-7 h-7 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 flex items-center justify-center shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface CaptainToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const CaptainToast: React.FC<CaptainToastProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, 7000);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md no-print"
    >
      <div className="rounded-2xl bg-slate-900/95 border border-cyan-500/70 p-3.5 shadow-2xl shadow-cyan-950/60 backdrop-blur-md flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0">
          <Ship className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
            📯 Ponte di Comando · MSC Euribia
          </div>
          <p className="text-xs sm:text-sm text-slate-100 leading-snug mt-0.5">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Chiudi annuncio comandante"
          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface CrewRandomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrewRandomizerModal: React.FC<CrewRandomizerModalProps> = ({ isOpen, onClose }) => {
  const [names, setNames] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CREW_NAMES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) {
          return parsed.map((n, i) => (typeof n === 'string' ? n : DEFAULT_CREW[i]));
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_CREW;
  });

  const [presetId, setPresetId] = useState<string>(ROUND_PRESETS[0].id);
  const [isSpinning, setIsSpinning] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);
  const [winnerIdx, setWinnerIdx] = useState<number | null>(null);
  const spinTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CREW_NAMES_STORAGE_KEY, JSON.stringify(names));
    } catch {
      // ignore
    }
  }, [names]);

  useEffect(() => {
    if (!isOpen) {
      if (spinTimerRef.current) {
        window.clearTimeout(spinTimerRef.current);
        spinTimerRef.current = null;
      }
      setIsSpinning(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePreset = ROUND_PRESETS.find(p => p.id === presetId) || ROUND_PRESETS[0];

  const handleNameChange = (idx: number, val: string) => {
    setNames(prev => prev.map((item, i) => (i === idx ? val : item)));
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setWinnerIdx(null);
    setIsSpinning(true);

    const finalIndex = Math.floor(Math.random() * 4);
    const totalSteps = 14 + finalIndex;
    let step = 0;

    const runStep = () => {
      const currentIdx = step % 4;
      setHighlightedIdx(currentIdx);
      step++;

      if (step <= totalSteps) {
        playRouletteTick(false);
        const delay = 65 + Math.floor((step / totalSteps) * 140);
        spinTimerRef.current = window.setTimeout(runStep, delay);
      } else {
        setHighlightedIdx(finalIndex);
        setWinnerIdx(finalIndex);
        setIsSpinning(false);
        playRouletteTick(true);
      }
    };

    runStep();
  };

  const winnerName =
    winnerIdx !== null
      ? (names[winnerIdx]?.trim() || DEFAULT_CREW[winnerIdx])
      : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crew-randomizer-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md no-print"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 id="crew-randomizer-title" className="text-sm sm:text-base font-extrabold text-white">
                Sorteggio Segreto · Equipaggio da 4
              </h2>
              <p className="text-[11px] text-slate-400">
                100% imparziale e offline (nomi salvati sul telefono)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi sorteggio"
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Scelta contesto rapido */}
          <div className="grid grid-cols-2 gap-1.5">
            {ROUND_PRESETS.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setPresetId(preset.id)}
                className={`px-2.5 py-2 rounded-xl text-[11px] font-bold border transition ${
                  presetId === preset.id
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* 4 Nomi modificabili + evidenziatore roulette */}
          <div className="grid grid-cols-2 gap-2">
            {names.map((name, idx) => {
              const isHighlighted = highlightedIdx === idx;
              const isWinner = winnerIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl p-2 border transition-all ${
                    isWinner
                      ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-400/40'
                      : isHighlighted
                      ? 'bg-cyan-950/60 border-cyan-400'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      Membro #{idx + 1}
                    </span>
                    {isWinner && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <input
                    type="text"
                    value={name}
                    maxLength={22}
                    disabled={isSpinning}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    placeholder={DEFAULT_CREW[idx]}
                    className="w-full bg-transparent text-sm font-bold text-white focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              );
            })}
          </div>

          {/* Verdetto vincitore */}
          {winnerName && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-600/60 text-center space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                🎲 Verdetto Ufficiale
              </div>
              <div className="text-base font-black text-white">
                {winnerName}
              </div>
              <p className="text-xs text-emerald-200">
                {activePreset.verdict}
              </p>
            </div>
          )}

          {/* Pulsante estrazione */}
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full min-h-[46px] py-2.5 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <Shuffle className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Estrazione in corso...' : winnerName ? 'Estrai di Nuovo' : 'Estrai a Sorte (1 su 4)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
