/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  PORT_RETURN_SCHEDULES,
  PORT_SCHEDULE_MAP,
  CRUISE_BOARDING_MS,
  CRUISE_DEPARTURE_MS,
  CRUISE_ARRIVAL_MS,
  findTodayPort,
  computePortCountdown,
  getNextCruiseEvent,
  ComputedCountdown,
  NextCruiseEvent
} from '../data/countdownData';

const OFFSETS_STORAGE_KEY = 'msc_all_aboard_offsets_v1';
const ALERT_STORAGE_KEY = 'msc_all_aboard_alert_v1';
const SIM_STORAGE_KEY = 'msc_all_aboard_sim_v1';

export interface AlertPreferences {
  enabled: boolean;
  thresholdMin: 60 | 30;
}

export interface SimulationState {
  portId: string;
  targetMs: number;
  windowMs: number;
}

/**
 * Sintetizza un breve doppio tono nautico 100% offline tramite Web Audio API
 * più una leggera vibrazione su smartphone (se supportata).
 */
export function playOfflineAlertSignal(): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([220, 120, 220]);
    }
  } catch {
    // ignore vibration errors
  }

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const playTone = (freq: number, startOffset: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + startOffset);
      gain.gain.setValueAtTime(0.001, now + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.18, now + startOffset + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration + 0.02);
    };

    playTone(660, 0, 0.22);
    playTone(880, 0.26, 0.3);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 800);
  } catch {
    // Web Audio may be blocked until first gesture
  }
}

export function useAllAboardCountdown(currentAppPortId?: string) {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const [selectedPortId, setSelectedPortId] = useState<string>(() => {
    const now = Date.now();
    const today = findTodayPort(now);
    if (today) return today.portId;
    if (now < CRUISE_DEPARTURE_MS) return 'genova-imbarco';
    if (currentAppPortId && PORT_SCHEDULE_MAP[currentAppPortId]) return currentAppPortId;
    return PORT_RETURN_SCHEDULES[0].portId;
  });

  const [portOffsetsMin, setPortOffsetsMin] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(OFFSETS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [alertPrefs, setAlertPrefs] = useState<AlertPreferences>(() => {
    try {
      const saved = localStorage.getItem(ALERT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { enabled: false, thresholdMin: 60 };
    } catch {
      return { enabled: false, thresholdMin: 60 };
    }
  });

  const [simulation, setSimulation] = useState<SimulationState | null>(() => {
    try {
      const saved = localStorage.getItem(SIM_STORAGE_KEY);
      if (!saved) return null;
      const parsed: SimulationState = JSON.parse(saved);
      if (parsed && typeof parsed.targetMs === 'number' && parsed.targetMs > Date.now() - 15 * 60_000) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [alertBannerMessage, setAlertBannerMessage] = useState<string | null>(null);
  const firedAlertKeyRef = useRef<string | null>(null);

  // Ticker deterministico 1s
  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Persiste offset orari su localStorage
  useEffect(() => {
    try {
      localStorage.setItem(OFFSETS_STORAGE_KEY, JSON.stringify(portOffsetsMin));
    } catch {
      // ignore
    }
  }, [portOffsetsMin]);

  // Persiste preferenze avviso su localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(alertPrefs));
    } catch {
      // ignore
    }
  }, [alertPrefs]);

  // Persiste simulazione attiva
  useEffect(() => {
    try {
      if (simulation) {
        localStorage.setItem(SIM_STORAGE_KEY, JSON.stringify(simulation));
      } else {
        localStorage.removeItem(SIM_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [simulation]);

  const adjustPortOffset = useCallback((portId: string, deltaMin: number) => {
    setPortOffsetsMin(prev => {
      const nextVal = Math.max(-90, Math.min(90, (prev[portId] || 0) + deltaMin));
      return { ...prev, [portId]: nextVal };
    });
  }, []);

  const resetPortOffset = useCallback((portId: string) => {
    setPortOffsetsMin(prev => {
      const copy = { ...prev };
      delete copy[portId];
      return copy;
    });
  }, []);

  const startSimulation = useCallback((portId: string, remainingMinutes: number) => {
    const now = Date.now();
    const targetMs = now + remainingMinutes * 60_000;
    const windowMs = Math.max(remainingMinutes * 60_000, 6 * 3_600_000);
    setSelectedPortId(portId);
    setSimulation({ portId, targetMs, windowMs });
    firedAlertKeyRef.current = null;
    setAlertBannerMessage(null);
  }, []);

  const stopSimulation = useCallback(() => {
    setSimulation(null);
    firedAlertKeyRef.current = null;
    setAlertBannerMessage(null);
  }, []);

  const toggleAlertEnabled = useCallback(() => {
    setAlertPrefs(prev => {
      const next = { ...prev, enabled: !prev.enabled };
      if (next.enabled) {
        playOfflineAlertSignal();
      }
      return next;
    });
  }, []);

  const setAlertThreshold = useCallback((thresholdMin: 60 | 30) => {
    firedAlertKeyRef.current = null;
    setAlertPrefs(prev => ({ ...prev, thresholdMin }));
  }, []);

  // Determina l'eventuale countdown LIVE (o simulazione attiva, o giorno reale)
  const todayPort = findTodayPort(nowMs);
  const livePort = simulation
    ? PORT_SCHEDULE_MAP[simulation.portId] || PORT_RETURN_SCHEDULES[0]
    : todayPort;

  const activeLiveCountdown: ComputedCountdown | null = livePort
    ? computePortCountdown(livePort, nowMs, portOffsetsMin[livePort.portId] || 0, simulation)
    : null;

  // Stato della tappa attualmente ispezionata nella vista Countdown
  const inspectedPort = PORT_SCHEDULE_MAP[selectedPortId] || PORT_RETURN_SCHEDULES[0];
  const inspectedCountdown: ComputedCountdown = computePortCountdown(
    inspectedPort,
    nowMs,
    portOffsetsMin[inspectedPort.portId] || 0,
    simulation
  );

  // Tappe principali di crociera (Boarding Genova 14:00, Partenza Genova 17:00, Arrivo Genova 30 nov 09:00)
  const boardingRemainingMs = Math.max(0, CRUISE_BOARDING_MS - nowMs);
  const preCruiseRemainingMs = Math.max(0, CRUISE_DEPARTURE_MS - nowMs);
  const arrivalRemainingMs = Math.max(0, CRUISE_ARRIVAL_MS - nowMs);
  const isBeforeBoarding = nowMs < CRUISE_BOARDING_MS;
  const isBeforeCruise = nowMs < CRUISE_DEPARTURE_MS;
  const nextCruiseEvent: NextCruiseEvent | null = getNextCruiseEvent(nowMs, portOffsetsMin, simulation);

  // Trigger avviso offline quando il countdown live scende sotto la soglia scelta
  useEffect(() => {
    if (!alertPrefs.enabled || !activeLiveCountdown) return;
    if (activeLiveCountdown.urgency === 'scheduled' || activeLiveCountdown.urgency === 'pre-cruise') return;

    const remMin = activeLiveCountdown.remainingMs / 60_000;
    const alertKey = `${activeLiveCountdown.port.portId}-${activeLiveCountdown.targetMs}-${alertPrefs.thresholdMin}`;

    if (remMin > 0 && remMin <= alertPrefs.thresholdMin && firedAlertKeyRef.current !== alertKey) {
      firedAlertKeyRef.current = alertKey;
      playOfflineAlertSignal();
      setAlertBannerMessage(
        `Soglia rientro raggiunta (${alertPrefs.thresholdMin} min): dirigiti al molo di ${activeLiveCountdown.port.citta}.`
      );
    }
  }, [alertPrefs, activeLiveCountdown]);

  return {
    nowMs,
    todayPort,
    selectedPortId,
    setSelectedPortId,
    inspectedCountdown,
    activeLiveCountdown,
    nextCruiseEvent,
    isBeforeBoarding,
    isBeforeCruise,
    boardingRemainingMs,
    preCruiseRemainingMs,
    arrivalRemainingMs,
    portOffsetsMin,
    adjustPortOffset,
    resetPortOffset,
    simulation,
    startSimulation,
    stopSimulation,
    alertPrefs,
    toggleAlertEnabled,
    setAlertThreshold,
    alertBannerMessage,
    dismissAlertBanner: () => setAlertBannerMessage(null)
  };
}
