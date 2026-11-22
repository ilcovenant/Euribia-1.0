/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Pianificazione oraria e dati di rientro al molo per MSC Euribia (23–30 nov 2026).
 * Include Imbarco Genova (23 nov · Boarding 14:00 · Partenza 17:00), i 5 scali e Arrivo Genova (30 nov · 09:00).
 * Tutti i porti sono in fuso unico UTC+1 (CET) a fine novembre.
 */

export type UrgencyLevel = 'pre-cruise' | 'scheduled' | 'safe' | 'caution' | 'critical' | 'expired';
export type ScheduleKind = 'embark' | 'port' | 'disembark';

export interface PortDockReturnInfo {
  portId: string;
  kind: ScheduleKind;
  hasItinerary: boolean;
  isoDate: string; // YYYY-MM-DD (UTC+1)
  citta: string;
  tabLabel: string;
  bandiera: string;
  giornoNumero: number;
  giornoCaption: string;
  orarioAttracco: string;
  orarioTuttiABordo: string;
  orarioPartenza: string;
  col1Label: string;
  col2Label: string;
  col3Label: string;
  mapsReturnQuery: string;
  mapsCtaLabel: string;
  taxiCard: {
    terminalTitolo: string;
    indirizzoLocale: string;
    linguaLabel: string;
    fraseTassista: string;
    notaRientro: string;
  };
}

/** Imbarco / Boarding Genova (23 nov 2026 ore 14:00 UTC+1) */
export const CRUISE_BOARDING_ISO = '2026-11-23T14:00:00+01:00';
export const CRUISE_BOARDING_MS = Date.parse(CRUISE_BOARDING_ISO);

/** Partenza crociera da Genova (23 nov 2026 ore 17:00 UTC+1) */
export const CRUISE_DEPARTURE_ISO = '2026-11-23T17:00:00+01:00';
export const CRUISE_DEPARTURE_MS = Date.parse(CRUISE_DEPARTURE_ISO);

/** Arrivo finale a Genova (30 nov 2026 ore 09:00 UTC+1) */
export const CRUISE_ARRIVAL_ISO = '2026-11-30T09:00:00+01:00';
export const CRUISE_ARRIVAL_MS = Date.parse(CRUISE_ARRIVAL_ISO);

export const PORT_RETURN_SCHEDULES: PortDockReturnInfo[] = [
  {
    portId: 'genova-imbarco',
    kind: 'embark',
    hasItinerary: false,
    isoDate: '2026-11-23',
    citta: 'Genova (Imbarco)',
    tabLabel: 'Genova Imbarco',
    bandiera: '⚓',
    giornoNumero: 1,
    giornoCaption: 'Giorno 1 · Imbarco',
    orarioAttracco: '14:00',
    orarioTuttiABordo: '16:00',
    orarioPartenza: '17:00',
    col1Label: 'Boarding',
    col2Label: 'Chiusura Imbarco',
    col3Label: 'Partenza Nave',
    mapsReturnQuery: 'Stazione Marittima Ponte dei Mille Genova',
    mapsCtaLabel: 'Apri Terminal Imbarco Genova su Maps',
    taxiCard: {
      terminalTitolo: 'Stazione Marittima – Ponte dei Mille (MSC)',
      indirizzoLocale: 'Ponte dei Mille / Via Andrea Doria, 16126 Genova (Terminal Crociere)',
      linguaLabel: 'Italiano',
      fraseTassista: 'Per favore, alla Stazione Marittima di Genova – Terminal Crociere MSC Euribia (Ponte dei Mille).',
      notaRientro: 'Boarding previsto dalle 14:00 (tieni a portata di mano biglietto MSC, documenti e bagagli etichettati). Partenza nave ore 17:00.'
    }
  },
  {
    portId: 'napoli',
    kind: 'port',
    hasItinerary: true,
    isoDate: '2026-11-24',
    citta: 'Napoli',
    tabLabel: 'Napoli',
    bandiera: '🇮🇹',
    giornoNumero: 2,
    giornoCaption: 'Giorno 2 · Scalo',
    orarioAttracco: '13:00',
    orarioTuttiABordo: '19:15',
    orarioPartenza: '20:00',
    col1Label: 'Attracco',
    col2Label: 'Tutti a Bordo',
    col3Label: 'Partenza',
    mapsReturnQuery: 'Stazione Marittima Molo Angioino Napoli',
    mapsCtaLabel: 'Apri Rientro al Molo su Google Maps',
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
    kind: 'port',
    hasItinerary: true,
    isoDate: '2026-11-25',
    citta: 'Palermo',
    tabLabel: 'Palermo',
    bandiera: '🇮🇹',
    giornoNumero: 3,
    giornoCaption: 'Giorno 3 · Scalo',
    orarioAttracco: '09:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    col1Label: 'Attracco',
    col2Label: 'Tutti a Bordo',
    col3Label: 'Partenza',
    mapsReturnQuery: 'Palermo Cruise Terminal Molo Vittorio Veneto',
    mapsCtaLabel: 'Apri Rientro al Molo su Google Maps',
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
    kind: 'port',
    hasItinerary: true,
    isoDate: '2026-11-26',
    citta: 'La Goletta',
    tabLabel: 'La Goletta',
    bandiera: '🇹🇳',
    giornoNumero: 4,
    giornoCaption: 'Giorno 4 · Scalo',
    orarioAttracco: '09:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    col1Label: 'Attracco',
    col2Label: 'Tutti a Bordo',
    col3Label: 'Partenza',
    mapsReturnQuery: 'Port de La Goulette Terminal Croisieres Tunis',
    mapsCtaLabel: 'Apri Rientro al Molo su Google Maps',
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
    kind: 'port',
    hasItinerary: true,
    isoDate: '2026-11-28',
    citta: 'Barcellona',
    tabLabel: 'Barcellona',
    bandiera: '🇪🇸',
    giornoNumero: 6,
    giornoCaption: 'Giorno 6 · Scalo',
    orarioAttracco: '08:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    col1Label: 'Attracco',
    col2Label: 'Tutti a Bordo',
    col3Label: 'Partenza',
    mapsReturnQuery: 'Cruise Bus T3 Monument a Colom Barcelona',
    mapsCtaLabel: 'Apri Rientro al Molo su Google Maps',
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
    kind: 'port',
    hasItinerary: true,
    isoDate: '2026-11-29',
    citta: 'Marsiglia',
    tabLabel: 'Marsiglia',
    bandiera: '🇫🇷',
    giornoNumero: 7,
    giornoCaption: 'Giorno 7 · Scalo',
    orarioAttracco: '09:00',
    orarioTuttiABordo: '17:15',
    orarioPartenza: '18:00',
    col1Label: 'Attracco',
    col2Label: 'Tutti a Bordo',
    col3Label: 'Partenza',
    mapsReturnQuery: 'Marseille Provence Cruise Terminal MPCT Porte 4',
    mapsCtaLabel: 'Apri Rientro al Molo su Google Maps',
    taxiCard: {
      terminalTitolo: 'Marseille Provence Cruise Terminal (MPCT)',
      indirizzoLocale: 'Porte 4 – Môle Léon Gourret, 13015 Marseille',
      linguaLabel: 'Francese',
      fraseTassista: "S'il vous plaît, au Terminal Croisières MPCT – Porte 4 (bateau MSC Euribia).",
      notaRientro: 'Il terminal è a 8 km dal Vieux-Port: considera almeno 25–30 min in taxi o navetta + Bus 35.'
    }
  },
  {
    portId: 'genova-arrivo',
    kind: 'disembark',
    hasItinerary: false,
    isoDate: '2026-11-30',
    citta: 'Genova (Arrivo)',
    tabLabel: 'Genova Arrivo',
    bandiera: '🏁',
    giornoNumero: 8,
    giornoCaption: 'Fine 7 Notti · Arrivo',
    orarioAttracco: '09:00',
    orarioTuttiABordo: '09:00',
    orarioPartenza: '10:30',
    col1Label: 'Arrivo Porto',
    col2Label: 'Sbarco Previsto',
    col3Label: 'Fine Sbarco',
    mapsReturnQuery: 'Stazione Genova Piazza Principe',
    mapsCtaLabel: 'Apri Stazione Genova Principe su Maps',
    taxiCard: {
      terminalTitolo: 'Stazione Marittima Genova – Ponte dei Mille',
      indirizzoLocale: 'Arrivo MSC Euribia ore 09:00 · 5 min a piedi da Stazione Genova Piazza Principe',
      linguaLabel: 'Italiano',
      fraseTassista: 'Sbarco da MSC Euribia alla Stazione Marittima di Genova (Ponte dei Mille).',
      notaRientro: 'Arrivo in porto alle 09:00 dopo le 7 notti di crociera. Ricorda di lasciare le valigie fuori cabina la sera del 29 nov entro l’orario indicato sul Daily Program.'
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
  const cetDate = new Date(nowMs + 3_600_000);
  const y = cetDate.getUTCFullYear();
  const m = String(cetDate.getUTCMonth() + 1).padStart(2, '0');
  const d = String(cetDate.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Trova l'eventuale giorno crociera (imbarco, scalo o arrivo finale) programmato nella data odierna (UTC+1).
 */
export function findTodayPort(nowMs: number): PortDockReturnInfo | null {
  const todayIso = getCruiseIsoDate(nowMs);
  return PORT_RETURN_SCHEDULES.find(p => p.isoDate === todayIso) || null;
}

/**
 * Determina il livello di urgenza dal tempo residuo.
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
 * Formatta un intervallo in ms in formato compatto per la barra superiore (es. "2h 14m", "42m 10s", "3g 5h").
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
  targetLabel: string;
  targetMs: number;
  departureMs: number;
  remainingMs: number;
  remainingToDepartureMs: number;
  progressPercent: number;
  urgency: UrgencyLevel;
}

/**
 * Calcola lo stato completo del countdown per imbarco Genova, scalo intermedio o arrivo finale Genova.
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

    const simLabel =
      port.kind === 'embark'
        ? 'Alla chiusura imbarco'
        : port.kind === 'disembark'
        ? 'All’arrivo a Genova'
        : 'Al Tutti a Bordo';

    return {
      port,
      isSimulated: true,
      isLiveToday: true,
      isPreCruise: false,
      offsetMin,
      adjustedAllAboardTime,
      targetLabel: simLabel,
      targetMs: simulation.targetMs,
      departureMs,
      remainingMs,
      remainingToDepartureMs,
      progressPercent,
      urgency: getUrgencyFromRemainingMs(remainingMs)
    };
  }

  const todayIso = getCruiseIsoDate(nowMs);
  const isLiveToday = todayIso === port.isoDate;
  const isPreCruise = nowMs < CRUISE_DEPARTURE_MS;

  // 1) Imbarco Genova (Giorno 1 · 23 nov): prima delle 14:00 conta al Boarding 14:00, poi conta alla Partenza 17:00
  if (port.kind === 'embark') {
    const boardingMs = parseCruiseTimestamp(port.isoDate, port.orarioAttracco, offsetMin); // 14:00
    const departureMs = parseCruiseTimestamp(port.isoDate, port.orarioPartenza, offsetMin); // 17:00
    const isBeforeBoarding = nowMs < boardingMs;

    const targetMs = isBeforeBoarding ? boardingMs : departureMs;
    const remainingMs = targetMs - nowMs;
    const remainingToDepartureMs = departureMs - nowMs;
    const targetLabel = isBeforeBoarding ? 'Al Boarding (14:00)' : 'Alla partenza da Genova';

    let urgency: UrgencyLevel;
    let progressPercent = 0;

    if (nowMs >= departureMs) {
      urgency = 'expired';
      progressPercent = 100;
    } else if (isLiveToday) {
      if (isBeforeBoarding) {
        urgency = getUrgencyFromRemainingMs(remainingMs);
        // Finestra 4 ore prima del boarding per barra visiva del giorno imbarco
        const prepWindow = 4 * 3_600_000;
        progressPercent = Math.min(100, Math.max(0, Math.round(((prepWindow - remainingMs) / prepWindow) * 100)));
      } else {
        urgency = getUrgencyFromRemainingMs(remainingMs);
        const embarkWindow = Math.max(1, departureMs - boardingMs);
        progressPercent = Math.min(100, Math.max(0, Math.round(((nowMs - boardingMs) / embarkWindow) * 100)));
      }
    } else {
      urgency = 'pre-cruise';
      progressPercent = 0;
    }

    return {
      port,
      isSimulated: false,
      isLiveToday,
      isPreCruise,
      offsetMin,
      adjustedAllAboardTime: shiftTimeString(isBeforeBoarding ? port.orarioAttracco : port.orarioPartenza, offsetMin),
      targetLabel,
      targetMs,
      departureMs,
      remainingMs,
      remainingToDepartureMs,
      progressPercent,
      urgency
    };
  }

  // 2) Arrivo finale Genova (30 nov · 09:00)
  if (port.kind === 'disembark') {
    const arrivalMs = parseCruiseTimestamp(port.isoDate, port.orarioAttracco, offsetMin); // 09:00
    const endDisembarkMs = parseCruiseTimestamp(port.isoDate, port.orarioPartenza, offsetMin); // 10:30
    const remainingMs = arrivalMs - nowMs;
    const remainingToDepartureMs = endDisembarkMs - nowMs;
    const totalCruiseMs = Math.max(1, arrivalMs - CRUISE_DEPARTURE_MS);

    let urgency: UrgencyLevel;
    let progressPercent = 0;

    if (nowMs >= arrivalMs) {
      urgency = 'expired';
      progressPercent = 100;
    } else if (nowMs < CRUISE_DEPARTURE_MS) {
      urgency = 'pre-cruise';
      progressPercent = 0;
    } else {
      progressPercent = Math.min(100, Math.max(0, Math.round(((nowMs - CRUISE_DEPARTURE_MS) / totalCruiseMs) * 100)));
      urgency = isLiveToday ? getUrgencyFromRemainingMs(remainingMs) : 'scheduled';
    }

    return {
      port,
      isSimulated: false,
      isLiveToday,
      isPreCruise,
      offsetMin,
      adjustedAllAboardTime: shiftTimeString(port.orarioAttracco, offsetMin),
      targetLabel: 'All’arrivo a Genova (09:00)',
      targetMs: arrivalMs,
      departureMs: endDisembarkMs,
      remainingMs,
      remainingToDepartureMs,
      progressPercent,
      urgency
    };
  }

  // 3) Scali intermedi (Napoli, Palermo, La Goletta, Barcellona, Marsiglia)
  const dockMs = parseCruiseTimestamp(port.isoDate, port.orarioAttracco, 0);
  const targetMs = parseCruiseTimestamp(port.isoDate, port.orarioTuttiABordo, offsetMin);
  const departureMs = parseCruiseTimestamp(port.isoDate, port.orarioPartenza, offsetMin);

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
    targetLabel: isLiveToday ? 'Al Tutti a Bordo' : 'Mancano allo scalo',
    targetMs,
    departureMs,
    remainingMs,
    remainingToDepartureMs,
    progressPercent,
    urgency
  };
}

export type NextEventKind = 'checkin' | 'disembark' | 'all-aboard' | 'departure' | 'arrival';

export interface NextCruiseEvent {
  kind: NextEventKind;
  portId: string;
  shortLabel: string;
  timeLabel: string;
  targetMs: number;
  remainingMs: number;
  urgency: UrgencyLevel;
  isSimulated: boolean;
}

/**
 * Restituisce automaticamente il prossimo evento cronologico della crociera
 * (Check-in Genova 14:00 → Partenza Genova 17:00 → Discesa Napoli → A bordo Napoli →
 * Partenza Napoli → ... → Arrivo Genova 30 nov 09:00).
 */
export function getNextCruiseEvent(
  nowMs: number,
  portOffsetsMin: Record<string, number> = {},
  simulation?: { portId: string; targetMs: number; windowMs: number } | null
): NextCruiseEvent | null {
  if (simulation) {
    const simPort = PORT_SCHEDULE_MAP[simulation.portId] || PORT_RETURN_SCHEDULES[0];
    const remainingMs = Math.max(0, simulation.targetMs - nowMs);
    const shortCity = simPort.citta.split('(')[0].trim();
    const kind: NextEventKind =
      simPort.kind === 'embark'
        ? 'checkin'
        : simPort.kind === 'disembark'
        ? 'arrival'
        : 'all-aboard';
    const shortLabel =
      simPort.kind === 'embark'
        ? 'Check-in Genova'
        : simPort.kind === 'disembark'
        ? 'Arrivo Genova'
        : `A bordo ${shortCity}`;

    return {
      kind,
      portId: simPort.portId,
      shortLabel,
      timeLabel: 'Prova',
      targetMs: simulation.targetMs,
      remainingMs,
      urgency: getUrgencyFromRemainingMs(remainingMs),
      isSimulated: true
    };
  }

  const events: Array<{
    kind: NextEventKind;
    portId: string;
    shortLabel: string;
    timeLabel: string;
    targetMs: number;
  }> = [];

  for (const item of PORT_RETURN_SCHEDULES) {
    const offset = portOffsetsMin[item.portId] || 0;
    const shortCity = item.portId === 'la-goletta' ? 'Tunisi' : item.citta.split('(')[0].trim();

    if (item.kind === 'embark') {
      events.push({
        kind: 'checkin',
        portId: item.portId,
        shortLabel: 'Check-in Genova',
        timeLabel: shiftTimeString(item.orarioAttracco, offset),
        targetMs: parseCruiseTimestamp(item.isoDate, item.orarioAttracco, offset)
      });
      events.push({
        kind: 'departure',
        portId: item.portId,
        shortLabel: 'Partenza Genova',
        timeLabel: shiftTimeString(item.orarioPartenza, offset),
        targetMs: parseCruiseTimestamp(item.isoDate, item.orarioPartenza, offset)
      });
    } else if (item.kind === 'disembark') {
      events.push({
        kind: 'arrival',
        portId: item.portId,
        shortLabel: 'Arrivo Genova',
        timeLabel: shiftTimeString(item.orarioAttracco, offset),
        targetMs: parseCruiseTimestamp(item.isoDate, item.orarioAttracco, offset)
      });
    } else {
      events.push({
        kind: 'disembark',
        portId: item.portId,
        shortLabel: `Discesa ${shortCity}`,
        timeLabel: item.orarioAttracco,
        targetMs: parseCruiseTimestamp(item.isoDate, item.orarioAttracco, 0)
      });
      events.push({
        kind: 'all-aboard',
        portId: item.portId,
        shortLabel: `A bordo ${shortCity}`,
        timeLabel: shiftTimeString(item.orarioTuttiABordo, offset),
        targetMs: parseCruiseTimestamp(item.isoDate, item.orarioTuttiABordo, offset)
      });
      events.push({
        kind: 'departure',
        portId: item.portId,
        shortLabel: `Partenza ${shortCity}`,
        timeLabel: shiftTimeString(item.orarioPartenza, offset),
        targetMs: parseCruiseTimestamp(item.isoDate, item.orarioPartenza, offset)
      });
    }
  }

  events.sort((a, b) => a.targetMs - b.targetMs);
  const next = events.find(e => e.targetMs > nowMs);
  if (!next) return null;

  const remainingMs = next.targetMs - nowMs;
  const urgency: UrgencyLevel =
    next.kind === 'all-aboard' || remainingMs <= 90 * 60_000
      ? getUrgencyFromRemainingMs(remainingMs)
      : 'scheduled';

  return {
    ...next,
    remainingMs,
    urgency,
    isSimulated: false
  };
}

