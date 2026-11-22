/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Easter Eggs 100% offline per l'equipaggio di 4 amici su MSC Euribia (23-30 nov 2026).
 * Include sintetizzatore Web Audio (sirena nave, chime trofeo, tick estrazione),
 * frasi dal ponte di comando, trofei Steam/Platino, codici convertitore TND e saluti orari.
 */

export interface PortAchievement {
  portId: string;
  title: string;
  subtitle: string;
  rarity: string;
  isPlatinum?: boolean;
}

export const PORT_ACHIEVEMENTS: Record<string, PortAchievement> = {
  napoli: {
    portId: 'napoli',
    title: 'Cavalieri della Sfogliatella',
    subtitle: '100% Napoli completata tra Decumani, Toledo e Maschio Angioino',
    rarity: 'Trofeo Oro · Scalo 1/5'
  },
  palermo: {
    portId: 'palermo',
    title: 'Signori dei Quattro Canti',
    subtitle: '100% Palermo completata tra mercati storici e cupole arabo-normanne',
    rarity: 'Trofeo Oro · Scalo 2/5'
  },
  'la-goletta': {
    portId: 'la-goletta',
    title: 'Sopravvissuti a 0 KB di Roaming',
    subtitle: '100% Tunisia completata tra Sidi Bou Saïd, Cartagine e TGM offline',
    rarity: 'Trofeo Oro · Scalo 3/5'
  },
  barcellona: {
    portId: 'barcellona',
    title: 'Eroi del Triángulo Friki',
    subtitle: '100% Barcellona completata tra Barrio Gótico, Gaudí e templi nerd',
    rarity: 'Trofeo Oro · Scalo 4/5'
  },
  marsiglia: {
    portId: 'marsiglia',
    title: 'Evasi dallo Château d’If',
    subtitle: '100% Marsiglia completata da La Major a Notre-Dame e Fort Saint-Jean',
    rarity: 'Trofeo Oro · Scalo 5/5'
  }
};

export const PLATINUM_ACHIEVEMENT: PortAchievement = {
  portId: 'platinum',
  title: 'CROCIERA PLATINATA · 100%',
  subtitle: 'Tutti e 5 gli scali completati: 0 tappe mancate, 100% achievement Steam sbloccati nel Mediterraneo!',
  rarity: '🏆 Trofeo Platino · Solo lo 0.1% dei crocieristi',
  isPlatinum: true
};

export const CAPTAIN_ANNOUNCEMENTS: string[] = [
  'Ponte di Comando: birra autorizzata al Ponte 7 per l’unico bevitore del gruppo, un superalcolico (misurato!) per lei e sfogliatelle per gli astemi!',
  'Avviso VIP ai 4 passeggeri: chi arriva ultimo alla passerella offre il prossimo giro — analcolico, birra o shot mirato che sia.',
  'Il Comandante approva l’itinerario: superalcolico concesso solo dopo quota 7 km, birra fresca al Masters of the Sea e zero euro al roaming satellitare.',
  'Comunicazione ufficiale MSC Euribia: controllato lo stato Steam del gruppo — l’obiettivo resta platinare tutti e 5 gli scali senza saltare una tappa!',
  'Sirena di saluto all’equipaggio: ricordatevi che la nave non aspetta nessuno... ma la pizza al Ponte 15 sì!'
];

/**
 * Codici segreti nel convertitore EUR / TND della Tunisia.
 */
export function getConverterEasterEgg(eurStr: string, tndStr: string): string | null {
  const cleanEur = eurStr.trim().replace(',', '.');
  const cleanTnd = tndStr.trim().replace(',', '.');
  const codes: Record<string, string> = {
    '42': '🌌 42: La risposta alla vita, l’universo e tutto quanto (~140.70 TND: abbastanza per 45 Bambalouni!).',
    '100': '🏆 100%: Qualcuno nel gruppo sente già profumo di Trofeo Platino su Steam...',
    '404': '🔌 404 Roaming Not Found: per fortuna qui funziona tutto al 100% in modalità aereo!',
    '666': '😈 666: Nemmeno il tassista più ottimista fuori dal porto oserebbe chiedere tanto.',
    '1000': '💰 1000: Con questa cifra a La Goletta vi comprate un intero vagone del treno TGM!',
    '1337': '🎮 1337: Modalità Pro Gamer rilevata — caccia agli achievement attiva.',
    '1781': '🥐 1781: Anno di fondazione del Four des Navettes di Marsiglia — state già pensando ai biscotti!',
    '1999': '🕶️ 1999: Anno di Matrix... pillola blu (TGM a 1.20 TND) o pillola rossa (trattativa al souk)?'
  };

  if (codes[cleanEur]) return codes[cleanEur];
  if (codes[cleanTnd]) return codes[cleanTnd];
  return null;
}

export interface TimeContextEasterEgg {
  kind: 'night-owl' | 'early-bird';
  text: string;
}

/**
 * Messaggi segreti nel footer in base all'ora locale:
 * - 01:30 – 04:29 (nottambuli)
 * - 04:30 – 06:29 (mattinieri / "già svegli?")
 */
export function getFooterTimeEasterEgg(now: Date): TimeContextEasterEgg | null {
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 01:30 (90 min) -> 04:29 (269 min)
  if (totalMinutes >= 90 && totalMinutes < 270) {
    return {
      kind: 'night-owl',
      text: `🌙 Ancora svegli alle ${hhmm}? Domani si cammina ~7.8 km... o state cercando la pizza notturna al Ponte 15?`
    };
  }

  // 04:30 (270 min) -> 06:29 (389 min)
  if (totalMinutes >= 270 && totalMinutes < 390) {
    return {
      kind: 'early-bird',
      text: `🌅 Già svegli alle ${hhmm}?! Alba sul ponte in solitaria o state già farmando achievement prima degli altri 3?`
    };
  }

  return null;
}

/**
 * Verifica se oggi è il giorno dell'imbarco (23 novembre 2026) per mostrare il banner celebrativo "Si salpa!".
 */
export function isEmbarkationDayCelebration(nowMs: number): boolean {
  const cet = new Date(nowMs + 3_600_000);
  const y = cet.getUTCFullYear();
  const m = cet.getUTCMonth() + 1;
  const d = cet.getUTCDate();
  const h = cet.getUTCHours();
  return y === 2026 && m === 11 && d === 23 && h >= 6 && h <= 19;
}

/**
 * Sintetizza una sirena da nave da crociera profonda (100% offline via Web Audio API).
 */
export function playShipFoghorn(): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([280, 90, 420]);
    }
  } catch {
    // ignore
  }

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(340, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.22, now + 0.14);
    masterGain.gain.setValueAtTime(0.22, now + 0.85);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Accordo grave tipico da sirena navale (110 Hz + 138.6 Hz + sub 55 Hz)
    const freqs = [110, 138.59, 55];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 2 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.linearRampToValueAtTime(f * 0.985, now + 1.35);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + 1.4);
    });

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1600);
  } catch {
    // ignore blocked audio context
  }
}

/**
 * Sintetizza un suono cristallino stile "Achievement / Trofeo Sbloccato" (100% offline).
 */
export function playAchievementChime(isPlatinum = false): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(isPlatinum ? [120, 70, 120, 70, 260] : [90, 60, 140]);
    }
  } catch {
    // ignore
  }

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const notes = isPlatinum ? [523.25, 659.25, 783.99, 1046.5] : [587.33, 880];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + i * 0.11;
      const dur = i === notes.length - 1 ? 0.45 : 0.16;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.03);
    });

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1200);
  } catch {
    // ignore
  }
}

/**
 * Breve click sonoro per l'animazione del sorteggio tra i 4 amici.
 */
export function playRouletteTick(isWinner = false): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isWinner ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isWinner ? 880 : 520, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(isWinner ? 0.16 : 0.06, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isWinner ? 0.28 : 0.05));

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + (isWinner ? 0.3 : 0.06));

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 400);
  } catch {
    // ignore
  }
}
