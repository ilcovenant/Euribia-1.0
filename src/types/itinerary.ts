/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 
  | 'Panorama' 
  | 'Parco' 
  | 'Storia' 
  | 'Nerd/Pop' 
  | 'Archeologia' 
  | 'Architettura/Cult'
  | 'Cibo Cult' 
  | 'Logistica'
  | 'Ritorno';

export interface Stop {
  id: string;
  orario: string; // Es. "13:45 - 14:15"
  nome: string;
  descrizione: string;
  tipologia: CategoryType;
  kmParziali: number; // km a piedi dalla tappa precedente
  durataMinuti?: number;
  query: string; // Stringa di ricerca per Google Maps
  curiositaNerd?: string; // Curiosità pop culture / nerd / aneddoto storico insolito
  wikiSlug?: string; // Slug per consultare la voce enciclopedica offline (Wikipedia tascabile)
  immagine?: string; // Percorso relativo alla foto reale locale (es. ./stops/napoli-maschio-angioino.webp)
  immagineDidascalia?: string; // Breve didascalia descrittiva del luogo nella foto
}

export interface WikiSection {
  titolo: string;
  contenuto: string;
}

export interface WikiArticle {
  slug: string;
  titolo: string;
  sottotitolo: string;
  categoria: string;
  periodoStorico: string;
  letturaMinuti: number;
  sommario: string;
  sezioni: WikiSection[];
  curiositaInedite: string[];
}

export interface SostaGolosa {
  locale: string;
  specialita: string;
  descrizione: string;
  costoIndicativo: string;
  indirizzo: string;
  curiosita: string;
}

export interface InfoLogisticaMolo {
  nomeMolo: string;
  collegamentoPortoCitta: string;
  mezzoConsigliato: string;
  costoTransfer: string;
  tempoTransferMinuti: number;
  istruzioniDettagliate: string;
  consiglioRisparmio: string;
}

export interface PortVariant {
  id: string;
  label: string; // Es. "Anello Classico" / "Con Sagrada Família"
  badge: string; // Es. "Port Vell • 7.7 km" / "Sagrada + Metro L2 • 7.2 km"
  portoTitolo: string;
  kmTotaliStimati: number;
  infoLogisticaMolo: InfoLogisticaMolo;
  tappe: Stop[];
}

export interface PortItinerary {
  id: string;
  giornoNumero: number;
  dataGiorno: string; // Es. "24 nov 2026"
  porto: string;
  citta: string;
  paese: string;
  bandiera: string;
  orarioAttracco: string; // Es. "13:00"
  orarioPartenza: string; // Es. "20:00"
  orarioSbarcoStimato: string; // Attracco + 45 min (es. "13:45")
  orarioTuttiABordo: string; // Partenza - 45 min (es. "19:15")
  kmTotaliStimati: number; // Es. 7.8
  durataFinestraOre: string; // Es. "5h 30m"
  infoLogisticaMolo: InfoLogisticaMolo;
  sostaGolosaTop?: SostaGolosa; // Presente solo se eccellenza leggendaria
  tappe: Stop[];
  varianti?: PortVariant[]; // Eventuali itinerari alternativi selezionabili per lo stesso scalo
}


