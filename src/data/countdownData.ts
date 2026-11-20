/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Pianificazione oraria e dati di rientro al molo per MSC Euribia (23–30 nov 2026).
 * Tutti i 5 porti sono in fuso unico UTC+1 (CET) a fine novembre.
 */

export type UrgencyLevel = 'pre-cruise' | 'scheduled' | 'safe' | 'caution' | 'critical' | 'expired';

export interface PortDockReturnInfo {
  portId: string;
  isoDate: string; // YYYY-MM-DD (UTC+1)
  citta: string;
  bandiera: string;
  giornoNumero: number;
  orarioAttracco: string;
  orarioTuttiABordo: string;
  orarioPartenza: string;
  mapsReturnQuery: string;
  taxiCard: {
    terminalTitolo: string;
    indirizzoLocale: string;
    linguaLabel: string;
    fraseTassista: string;
    notaRientro: string;
  };
}

/** Partenza crociera da Genova (UTC+1) */
export const CRUISE_DEPARTURE_ISO = '2026-11-23T17:00:00+01:00';
export const CRUISE_DEPARTURE_MS = Date.parse(CRUISE_DEPARTURE_ISO);

export const PORT_RETURN_SCHEDULES: PortDockReturnInfo[] = [
  {
    portId: 'napoli',
    isoDate: '2026-11-24',
    citta: 'Napoli',
    bandiera: '🇮🇹',
    giornoNumero: 2,
    orarioAttracco: '13:00',
    orarioTuttiABordo: '19:15',
    orarioPartenza: '20:00',
    mapsReturnQuery: 'Stazione Marittima Molo Angioino Napoli',
    taxiCard: {
      terminalTitolo: 'Stazione Marittima – Molo Angioino',
      indirizzoLocale: 'Piazzale Stazione Marittima, 80133 Napoli (Terminal Crociere)',
      linguaLabel: 'Italiano',
      fraseTassista: 'Per favore, mi porti al Terminal Crociere – Molo Angioino (nave MSC Euribia).',
      notaRientro: 'Da Piazza Municipio sei a 5 minuti a piedi piani dalla passerella.'
    }
  },
  {
    portId: 'palermo',
    isoDate: '2026-11-25',
    citta: 'Palermo',
    bandiera: '🇮🇹',
    giornoNumero: 3,
    orarioAttracco: '09:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    mapsReturnQuery: 'Palermo Cruise Terminal Molo Vittorio Veneto',
    taxiCard: {
      terminalTitolo: 'Terminal Crociere – Molo Vittorio Veneto',
      indirizzoLocale: 'Via Francesco Crispi / Varco Amari, 90139 Palermo',
      linguaLabel: 'Italiano',
      fraseTassista: 'Per favore, al Porto di Palermo – Terminal Crociere (nave MSC Euribia).',
      notaRientro: 'Da Piazza Politeama sono 12 minuti a piedi dritti lungo Via Emerico Amari.'
    }
  },
  {
    portId: 'la-goletta',
    isoDate: '2026-11-26',
    citta: 'La Goletta',
    bandiera: '🇹🇳',
    giornoNumero: 4,
    orarioAttracco: '09:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    mapsReturnQuery: 'Port de La Goulette Terminal Croisieres Tunis',
    taxiCard: {
      terminalTitolo: 'Terminal Croisières – Goulette Village',
      indirizzoLocale: 'Port de La Goulette (Halq al-Wadi), Tunis',
      linguaLabel: 'Francese / Arabo tunisino',
      fraseTassista: "S'il vous plaît, au Port de La Goulette – Terminal Croisières (Bateau MSC Euribia). / Mina Halq al-Wadi – Bateau MSC.",
      notaRientro: 'Mostra anche la MSC Cruise Card al tassista. Dal centro de La Goletta sono 600 m a piedi.'
    }
  },
  {
    portId: 'barcellona',
    isoDate: '2026-11-28',
    citta: 'Barcellona',
    bandiera: '🇪🇸',
    giornoNumero: 6,
    orarioAttracco: '08:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    mapsReturnQuery: 'Cruise Bus T3 Monument a Colom Barcelona',
    taxiCard: {
      terminalTitolo: 'Terminal Creuers – Moll Adossat (MSC)',
      indirizzoLocale: 'Moll Adossat, Port de Barcelona (oppure Bus T3 a Monument a Colom)',
      linguaLabel: 'Spagnolo / Catalano',
      fraseTassista: 'Por favor, a la Terminal de Cruceros MSC en Moll Adossat (barco MSC Euribia).',
      notaRientro: 'In taxi si arriva diretti sotto nave (10 min da Colom); altrimenti Cruise Bus T3 dal Monument a Colom.'
    }
  },
  {
    portId: 'marsiglia',
    isoDate: '2026-11-29',
    citta: 'Marsiglia',
    bandiera: '🇫🇷',
    giornoNumero: 7,
    orarioAttracco: '09:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    mapsReturnQuery: 'Marseille Provence Cruise Terminal MPCT Porte 4',
    taxiCard: {
      terminalTitolo: 'Marseille Provence Cruise Terminal (MPCT)',
      indirizzoLocale: 'Porte 4 – Môle Léon Gourret, 13015 Marseille',
      linguaLabel: 'Francese',
      fraseTassista: "S'il vous plaît, au Terminal Croisières MPCT – Porte 4 (bateau MSC Euribia).",
      notaRientro: 'Il terminal è a 8 km dal Vieux-Port: considera almeno 25–30 min in taxi o navetta + Bus 35.'
    }
  }
];

export const PORT_SCHEDULE_MAP: Record<string, PortDockReturnInfo> = PORT_RETURN_SCHEDULES.reduce(
  (acc, item) => {
    acc[item.portId] = item;
    return acc;
  },
  {} as Record<string, PortDockReturnInfo>
);

/**
 * Converte data ISO (YYYY-MM-DD) + orario HH:MM (in UTC+1 CET) in timestamp ms,
 * applicando un eventuale offset in minuti (es. -15 o +15 comunicati a bordo).
 */
export function parseCruiseTimestamp(isoDate: string, hhmm: string, offsetMin = 0): number {
  const [h, m] = hhmm.split(':').map(Number);
  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  const baseMs = Date.parse(`${isoDate}T${hh}:${mm}:00+01:00`);
  return baseMs + offsetMin * 60_000;
}

/**
 * Aggiunge un offset in minuti a un orario HH:MM e restituisce il nuovo HH:MM.
 */
export function shiftTimeString(hhmm: string, offsetMin: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const totalMin = ((h * 60 + m + offsetMin) % 1440 + 1440) % 1440;
  const nh = Math.floor(totalMin / 60);
  const nm = totalMin % 60;
  return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`;
}

/**
 * Restituisce la data YYYY-MM-DD corrente nel fuso della crociera (UTC+1 / CET).
 */
export function getCruiseIsoDate(nowMs: number): string {
  // Aggiunge +1 ora (UTC+1) e legge i componenti UTC
  const cetDate = new Date(nowMs + 3_600_000);
  const y = cetDate.getUTCFullYear();
  const m = String(cetDate.getUTCMonth() + 1).padStart(2, '0');
  const d = String(cetDate.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Trova l'eventuale porto programmato esattamente nella data odierna (fuso UTC+1).
 */
export function findTodayPort(nowMs: number): PortDockReturnInfo | null {
  const todayIso = getCruiseIsoDate(nowMs);
  return PORT_RETURN_SCHEDULES.find(p => p.isoDate === todayIso) || null;
}

/**
 * Determina il livello di urgenza dal tempo residuo al Tutti a Bordo.
 */
export function getUrgencyFromRemainingMs(remainingMs: number): UrgencyLevel {
  if (remainingMs <= 0) return 'expired';
  const remainingMin = remainingMs / 60_000;
  if (remainingMin <= 45) return 'critical';
  if (remainingMin <= 90) return 'caution';
  return 'safe';
}

/**
 * Formatta un intervallo in ms come HH:MM:SS (cifre tabellari).
 */
export function formatDurationHms(ms: number): string {
  const clamped = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Formatta un intervallo in ms in formato compatto per la barra superiore (es. "2h 14m", "42m", "00:00").
 */
export function formatCompactDuration(ms: number): string {
  if (ms <= 0) return 'Scaduto';
  const totalSec = Math.ceil(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  if (days >= 1) {
    const remHours = Math.floor((totalSec % 86400) / 3600);
    return remHours > 0 ? `${days}g ${remHours}h` : `${days}g`;
  }
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (hours >= 1) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  }
  if (minutes >= 1) {
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  }
  return `${seconds}s`;
}

export interface ComputedCountdown {
  port: PortDockReturnInfo;
  isSimulated: boolean;
  isLiveToday: boolean;
  isPreCruise: boolean;
  offsetMin: number;
  adjustedAllAboardTime: string;
  targetMs: number;
  departureMs: number;
  remainingMs: number;
  remainingToDepartureMs: number;
  progressPercent: number; // 0 -> inizio sbarco, 100 -> Tutti a Bordo raggiunto
  urgency: UrgencyLevel;
}

/**
 * Calcola lo stato completo del countdown per uno scalo specifico (reale o simulato).
 */
export function computePortCountdown(
  port: PortDockReturnInfo,
  nowMs: number,
  offsetMin = 0,
  simulation?: { portId: string; targetMs: number; windowMs: number } | null
): ComputedCountdown {
  const adjustedAllAboardTime = shiftTimeString(port.orarioTuttiABordo, offsetMin);

  if (simulation && simulation.portId === port.portId) {
    const remainingMs = simulation.targetMs - nowMs;
    const departureMs = simulation.targetMs + 45 * 60_000;
    const remainingToDepartureMs = departureMs - nowMs;
    const elapsed = simulation.windowMs - remainingMs;
    const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / simulation.windowMs) * 100)));

    return {
      port,
      isSimulated: true,
      isLiveToday: true,
      isPreCruise: false,
      offsetMin,
      adjustedAllAboardTime,
      targetMs: simulation.targetMs,
      departureMs,
      remainingMs,
      remainingToDepartureMs,
      progressPercent,
      urgency: getUrgencyFromRemainingMs(remainingMs)
    };
  }

  const dockMs = parseCruiseTimestamp(port.isoDate, port.orarioAttracco, 0);
  const targetMs = parseCruiseTimestamp(port.isoDate, port.orarioTuttiABordo, offsetMin);
  const departureMs = parseCruiseTimestamp(port.isoDate, port.orarioPartenza, offsetMin);

  const todayIso = getCruiseIsoDate(nowMs);
  const isLiveToday = todayIso === port.isoDate;
  const isPreCruise = nowMs < CRUISE_DEPARTURE_MS;

  const remainingMs = targetMs - nowMs;
  const remainingToDepartureMs = departureMs - nowMs;
  const windowMs = Math.max(1, targetMs - dockMs);

  let urgency: UrgencyLevel;
  let progressPercent = 0;

  if (isLiveToday) {
    if (nowMs < dockMs) {
      urgency = 'scheduled';
      progressPercent = 0;
    } else {
      urgency = getUrgencyFromRemainingMs(remainingMs);
      progressPercent = Math.min(100, Math.max(0, Math.round(((nowMs - dockMs) / windowMs) * 100)));
    }
  } else if (nowMs < targetMs) {
    urgency = isPreCruise ? 'pre-cruise' : 'scheduled';
    progressPercent = 0;
  } else {
    urgency = 'expired';
    progressPercent = 100;
  }

  return {
    port,
    isSimulated: false,
    isLiveToday,
    isPreCruise,
    offsetMin,
    adjustedAllAboardTime,
    targetMs,
    departureMs,
    remainingMs,
    remainingToDepartureMs,
    progressPercent,
    urgency
  };
}
