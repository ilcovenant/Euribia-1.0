/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PHOTOS as EURIBIA_PHOTOS } from './stopPhotos/euribia';

export interface StopPhoto {
  src: string;
  caption: string;
}

export const MSC_EURIBIA_PHOTO: string = EURIBIA_PHOTOS['msc-euribia'];

/**
 * Didascalie 1:1 per ogni tappa dei 5 scali (inclusi entrambi i percorsi di Barcellona).
 */
export const STOP_CAPTIONS: Record<string, string> = {
  // === 1. NAPOLI ===
  'na-0': 'Castel Nuovo (Maschio Angioino), subito fuori dal Molo Angioino',
  'na-1': 'Piazza del Plebiscito e la Basilica di San Francesco di Paola',
  'na-2': 'Stazione Metro Toledo – Il celebre "Crater de Luz" di Óscar Tusquets',
  'na-3': 'Spaccanapoli: il decumano inferiore che taglia in due il centro antico',
  'na-4': 'Via San Gregorio Armeno, la celebre strada delle botteghe dei presepi',
  'na-5': 'Via dei Tribunali, cuore pulsante del Decumano Maggiore e dello street food',
  'na-6': 'Sfogliatelle napoletane ricce e frolle appena sfornate',
  'na-7': 'Stazione Marittima di Napoli al Molo Angioino – Terminal Crociere',

  // === 2. PALERMO ===
  'pa-0': 'Teatro Politeama Garibaldi, ingresso del salotto Liberty di Palermo',
  'pa-1': 'Teatro Massimo Vittorio Emanuele, scalinata cult de "Il Padrino – Parte III"',
  'pa-2': 'Mercato storico del Capo, tra banchi di spezie e street food palermitano',
  'pa-3': 'Cattedrale di Palermo (patrimonio UNESCO arabo-normanno)',
  'pa-4': 'Quattro Canti (Piazza Vigliena), il teatro barocco del Sole',
  'pa-5': 'Le cupole rosse arabo-normanne di San Cataldo in Piazza Bellini',
  'pa-6': 'Il gigantesco Ficus macrophylla secolare di Villa Garibaldi a Piazza Marina',
  'pa-7': 'La Cala, lo storico porto antico a ferro di cavallo di Palermo',
  'pa-8': 'Porto di Palermo e Molo Vittorio Veneto per il rientro in nave',

  // === 3. LA GOLETTA (TUNISIA) ===
  'lg-0': 'La Goletta (Halq al-Wadi), porta marittima di Tunisi',
  'lg-1': 'Treno metropolitano TGM (Tunis–Goulette–Marsa)',
  'lg-2': 'Sidi Bou Saïd: il borgo bianco e blu a picco sul Golfo di Tunisi',
  'lg-3': 'Gli antichi Porti Punici di Cartagine (Cothon e Isola dell’Ammiragliato)',
  'lg-4': 'Stele puniche nel Santuario del Tophet di Salammbô a Cartagine',
  'lg-5': 'Fortezza ottomano-spagnola Borj el-Karraka nel cuore di La Goletta',
  'lg-6': 'MSC Euribia – Rientro al Terminal Crociere Goulette Village',

  // === 4. BARCELLONA (Anello Classico + Variante Sagrada Família) ===
  'bc-0': 'Monument a Colom, capolinea del Cruise Bus T3 sul lungomare',
  'bc-1': 'Ingresso modernista del Mercat de la Boqueria su La Rambla',
  'bc-2': 'Il celebre Ponte neogotico di Carrer del Bisbe nel Barrio Gótico',
  'bc-3': 'Basilica di Santa Maria del Mar, la "Cattedrale del Mare" nel Born',
  'bc-4': 'La Cascada Monumental nel Parc de la Ciutadella',
  'bc-5': 'Arc de Triomf su Passeig de Sant Joan, porta del Triángulo Friki',
  'bc-6': 'Passerella ondulata della Rambla del Mar sul Port Vell',
  'bc-7': 'Porto di Barcellona e Terminal Crociere Moll Adossat',
  'bcsf-0': 'Monument a Colom, capolinea del Cruise Bus T3',
  'bcsf-1': 'Mercat de la Boqueria su La Rambla, a due passi da Granja Viader',
  'bcsf-2': 'Carrer del Bisbe nel cuore medievale del Barrio Gótico',
  'bcsf-3': 'Basilica gotica di Santa Maria del Mar a El Born',
  'bcsf-4': 'Cascada Monumental nel Parc de la Ciutadella',
  'bcsf-5': 'Arc de Triomf all’ingresso del distretto nerd Triángulo Friki',
  'bcsf-6': 'Basilica della Sagrada Família e viale pedonale Avinguda de Gaudí',
  'bcsf-7': 'Stazione Metro Sagrada Família (Linea L2 Viola diretta per Paral·lel)',
  'bcsf-8': 'Terminal Crociere Moll Adossat – Porto di Barcellona',

  // === 5. MARSIGLIA ===
  'mr-0': 'Porto di Marsiglia – Terminal Crociere Môle Léon Gourret',
  'mr-1': 'Vieux-Port di Marsiglia con il celebre padiglione a specchio L’Ombrière',
  'mr-2': 'Basilica di Notre-Dame de la Garde (La Bonne Mère) sulla collina',
  'mr-3': 'Abbazia fortificata di Saint-Victor, accanto a Le Four des Navettes',
  'mr-4': 'Il piccolo Ferry-Boat elettrico che attraversa il Vieux-Port',
  'mr-5': 'Vicoli colorati e street art nel quartiere storico di Le Panier',
  'mr-6': 'Il MUCEM e la sua spettacolare facciata merlettata in cemento sul mare',
  'mr-7': 'Cathédrale de la Major e zona La Joliette per il rientro in navetta',
  'mr-8': 'MSC Euribia – Ultimo rientro a bordo prima della rotta per Genova'
};

/**
 * Alias per evitare di duplicare i data-URI tra Barcellona Classico e Barcellona Sagrada.
 */
const STOP_PHOTO_KEY_ALIAS: Record<string, string> = {
  'bcsf-0': 'bc-0',
  'bcsf-1': 'bc-1',
  'bcsf-2': 'bc-2',
  'bcsf-3': 'bc-3',
  'bcsf-4': 'bc-4',
  'bcsf-5': 'bc-5',
  'bcsf-8': 'bc-7'
};

type PortGroup = 'napoli' | 'palermo' | 'tunisia' | 'barcellona' | 'marsiglia';

function getGroupForStopId(stopId: string): PortGroup | null {
  if (stopId.startsWith('na-')) return 'napoli';
  if (stopId.startsWith('pa-')) return 'palermo';
  if (stopId.startsWith('lg-')) return 'tunisia';
  if (stopId.startsWith('bc-') || stopId.startsWith('bcsf-')) return 'barcellona';
  if (stopId.startsWith('mr-')) return 'marsiglia';
  return null;
}

const loadedGroups: Partial<Record<PortGroup, Record<string, string>>> = {};
const inflightGroups: Partial<Record<PortGroup, Promise<Record<string, string>>>> = {};

async function loadGroupPhotos(group: PortGroup): Promise<Record<string, string>> {
  const cached = loadedGroups[group];
  if (cached) return cached;
  const pending = inflightGroups[group];
  if (pending) return pending;

  const promise = (async () => {
    let mod: { PHOTOS: Record<string, string> };
    switch (group) {
      case 'napoli':
        mod = await import('./stopPhotos/napoli');
        break;
      case 'palermo':
        mod = await import('./stopPhotos/palermo');
        break;
      case 'tunisia':
        mod = await import('./stopPhotos/tunisia');
        break;
      case 'barcellona':
        mod = await import('./stopPhotos/barcellona');
        break;
      case 'marsiglia':
        mod = await import('./stopPhotos/marsiglia');
        break;
    }
    loadedGroups[group] = mod.PHOTOS;
    return mod.PHOTOS;
  })();

  inflightGroups[group] = promise;
  return promise;
}

/**
 * Restituisce subito la foto se il chunk del porto è già in memoria (zero flicker).
 */
export function getCachedStopPhoto(stopId: string): StopPhoto | null {
  const group = getGroupForStopId(stopId);
  if (!group) return null;
  const photos = loadedGroups[group];
  if (!photos) return null;
  const photoKey = STOP_PHOTO_KEY_ALIAS[stopId] || stopId;
  const src = photos[photoKey];
  if (!src) return null;
  return {
    src,
    caption: STOP_CAPTIONS[stopId] || ''
  };
}

/**
 * Carica la foto reale offline (data:image/webp;base64) dal chunk JS precachato del porto.
 * Funziona sempre anche su GitHub Pages, Firefox e in modalità aereo senza 404.
 */
export async function loadStopPhoto(stopId: string): Promise<StopPhoto | null> {
  const group = getGroupForStopId(stopId);
  if (!group) return null;
  const photos = await loadGroupPhotos(group);
  const photoKey = STOP_PHOTO_KEY_ALIAS[stopId] || stopId;
  const src = photos[photoKey];
  if (!src) return null;
  return {
    src,
    caption: STOP_CAPTIONS[stopId] || ''
  };
}
