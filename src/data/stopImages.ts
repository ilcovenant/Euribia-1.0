/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StopPhoto {
  src: string;
  caption: string;
}

/**
 * Mappa 1:1 delle foto reali locali (WebP compresse, salvate in cache PWA per uso 100% offline)
 * associate a ogni tappa dei 5 scali MSC Euribia (inclusi entrambi i percorsi di Barcellona).
 */
export const STOP_IMAGES: Record<string, StopPhoto> = {
  // === 1. NAPOLI ===
  'na-0': {
    src: './stops/napoli-maschio-angioino.webp',
    caption: 'Castel Nuovo (Maschio Angioino), subito fuori dal Molo Angioino'
  },
  'na-1': {
    src: './stops/napoli-piazza-plebiscito.webp',
    caption: 'Piazza del Plebiscito e la Basilica di San Francesco di Paola'
  },
  'na-2': {
    src: './stops/napoli-metro-toledo.webp',
    caption: 'Stazione Metro Toledo – Il celebre "Crater de Luz" di Óscar Tusquets'
  },
  'na-3': {
    src: './stops/napoli-spaccanapoli.webp',
    caption: 'Spaccanapoli: il decumano inferiore che taglia in due il centro antico'
  },
  'na-4': {
    src: './stops/napoli-san-gregorio-armeno.webp',
    caption: 'Via San Gregorio Armeno, la celebre strada delle botteghe dei presepi'
  },
  'na-5': {
    src: './stops/napoli-via-tribunali.webp',
    caption: 'Via dei Tribunali, cuore pulsante del Decumano Maggiore e dello street food'
  },
  'na-6': {
    src: './stops/napoli-sfogliatella.webp',
    caption: 'Sfogliatelle napoletane ricce e frolle appena sfornate'
  },
  'na-7': {
    src: './stops/napoli-stazione-marittima.webp',
    caption: 'Stazione Marittima di Napoli al Molo Angioino – Terminal Crociere'
  },

  // === 2. PALERMO ===
  'pa-0': {
    src: './stops/palermo-politeama.webp',
    caption: 'Teatro Politeama Garibaldi, ingresso del salotto Liberty di Palermo'
  },
  'pa-1': {
    src: './stops/palermo-teatro-massimo.webp',
    caption: 'Teatro Massimo Vittorio Emanuele, scalinata cult de "Il Padrino – Parte III"'
  },
  'pa-2': {
    src: './stops/palermo-mercato-capo.webp',
    caption: 'Mercato storico del Capo, tra banchi di spezie e street food palermitano'
  },
  'pa-3': {
    src: './stops/palermo-cattedrale.webp',
    caption: 'Cattedrale di Palermo (patrimonio UNESCO arabo-normanno)'
  },
  'pa-4': {
    src: './stops/palermo-quattro-canti.webp',
    caption: 'Quattro Canti (Piazza Vigliena), il teatro barocco del Sole'
  },
  'pa-5': {
    src: './stops/palermo-san-cataldo.webp',
    caption: 'Le cupole rosse arabo-normanne di San Cataldo in Piazza Bellini'
  },
  'pa-6': {
    src: './stops/palermo-piazza-marina.webp',
    caption: 'Il gigantesco Ficus macrophylla secolare di Villa Garibaldi a Piazza Marina'
  },
  'pa-7': {
    src: './stops/palermo-la-cala.webp',
    caption: 'La Cala, lo storico porto antico a ferro di cavallo di Palermo'
  },
  'pa-8': {
    src: './stops/palermo-porto.webp',
    caption: 'Porto di Palermo e Molo Vittorio Veneto per il rientro in nave'
  },

  // === 3. LA GOLETTA (TUNISIA) ===
  'lg-0': {
    src: './stops/tunisia-la-goulette.webp',
    caption: 'La Goletta (Halq al-Wadi), porta marittima di Tunisi'
  },
  'lg-1': {
    src: './stops/tunisia-tgm.webp',
    caption: 'Treno metropolitano TGM (Tunis–Goulette–Marsa)'
  },
  'lg-2': {
    src: './stops/tunisia-sidi-bou-said.webp',
    caption: 'Sidi Bou Saïd: il borgo bianco e blu a picco sul Golfo di Tunisi'
  },
  'lg-3': {
    src: './stops/tunisia-cothon.webp',
    caption: 'Gli antichi Porti Punici di Cartagine (Cothon e Isola dell’Ammiragliato)'
  },
  'lg-4': {
    src: './stops/tunisia-tophet.webp',
    caption: 'Stele puniche nel Santuario del Tophet di Salammbô a Cartagine'
  },
  'lg-5': {
    src: './stops/tunisia-borj-karraka.webp',
    caption: 'Fortezza ottomano-spagnola Borj el-Karraka nel cuore di La Goletta'
  },
  'lg-6': {
    src: './stops/msc-euribia.webp',
    caption: 'MSC Euribia – Rientro al Terminal Crociere Goulette Village'
  },

  // === 4. BARCELLONA (Anello Classico + Variante Sagrada Família) ===
  'bc-0': {
    src: './stops/barcellona-colom.webp',
    caption: 'Monument a Colom, capolinea del Cruise Bus T3 sul lungomare'
  },
  'bc-1': {
    src: './stops/barcellona-boqueria.webp',
    caption: 'Ingresso modernista del Mercat de la Boqueria su La Rambla'
  },
  'bc-2': {
    src: './stops/barcellona-pont-bisbe.webp',
    caption: 'Il celebre Ponte neogotico di Carrer del Bisbe nel Barrio Gótico'
  },
  'bc-3': {
    src: './stops/barcellona-santa-maria-mar.webp',
    caption: 'Basilica di Santa Maria del Mar, la "Cattedrale del Mare" nel Born'
  },
  'bc-4': {
    src: './stops/barcellona-ciutadella.webp',
    caption: 'La Cascada Monumental nel Parc de la Ciutadella'
  },
  'bc-5': {
    src: './stops/barcellona-arc-triomf.webp',
    caption: 'Arc de Triomf su Passeig de Sant Joan, porta del Triángulo Friki'
  },
  'bc-6': {
    src: './stops/barcellona-rambla-mar.webp',
    caption: 'Passerella ondulata della Rambla del Mar sul Port Vell'
  },
  'bc-7': {
    src: './stops/barcellona-porto.webp',
    caption: 'Porto di Barcellona e Terminal Crociere Moll Adossat'
  },
  'bcsf-0': {
    src: './stops/barcellona-colom.webp',
    caption: 'Monument a Colom, capolinea del Cruise Bus T3'
  },
  'bcsf-1': {
    src: './stops/barcellona-boqueria.webp',
    caption: 'Mercat de la Boqueria su La Rambla, a due passi da Granja Viader'
  },
  'bcsf-2': {
    src: './stops/barcellona-pont-bisbe.webp',
    caption: 'Carrer del Bisbe nel cuore medievale del Barrio Gótico'
  },
  'bcsf-3': {
    src: './stops/barcellona-santa-maria-mar.webp',
    caption: 'Basilica gotica di Santa Maria del Mar a El Born'
  },
  'bcsf-4': {
    src: './stops/barcellona-ciutadella.webp',
    caption: 'Cascada Monumental nel Parc de la Ciutadella'
  },
  'bcsf-5': {
    src: './stops/barcellona-arc-triomf.webp',
    caption: 'Arc de Triomf all’ingresso del distretto nerd Triángulo Friki'
  },
  'bcsf-6': {
    src: './stops/barcellona-sagrada-familia.webp',
    caption: 'Basilica della Sagrada Família e viale pedonale Avinguda de Gaudí'
  },
  'bcsf-7': {
    src: './stops/barcellona-metro-l2.webp',
    caption: 'Stazione Metro Sagrada Família (Linea L2 Viola diretta per Paral·lel)'
  },
  'bcsf-8': {
    src: './stops/barcellona-porto.webp',
    caption: 'Terminal Crociere Moll Adossat – Porto di Barcellona'
  },

  // === 5. MARSIGLIA ===
  'mr-0': {
    src: './stops/marsiglia-porto.webp',
    caption: 'Porto di Marsiglia – Terminal Crociere Môle Léon Gourret'
  },
  'mr-1': {
    src: './stops/marsiglia-vieux-port.webp',
    caption: 'Vieux-Port di Marsiglia con il celebre padiglione a specchio L’Ombrière'
  },
  'mr-2': {
    src: './stops/marsiglia-notre-dame.webp',
    caption: 'Basilica di Notre-Dame de la Garde (La Bonne Mère) sulla collina'
  },
  'mr-3': {
    src: './stops/marsiglia-saint-victor.webp',
    caption: 'Abbazia fortificata di Saint-Victor, accanto a Le Four des Navettes'
  },
  'mr-4': {
    src: './stops/marsiglia-ferry-boat.webp',
    caption: 'Il piccolo Ferry-Boat elettrico che attraversa il Vieux-Port'
  },
  'mr-5': {
    src: './stops/marsiglia-le-panier.webp',
    caption: 'Vicoli colorati e street art nel quartiere storico di Le Panier'
  },
  'mr-6': {
    src: './stops/marsiglia-mucem.webp',
    caption: 'Il MUCEM e la sua spettacolare facciata merlettata in cemento sul mare'
  },
  'mr-7': {
    src: './stops/marsiglia-joliette.webp',
    caption: 'Cathédrale de la Major e zona La Joliette per il rientro in navetta'
  },
  'mr-8': {
    src: './stops/msc-euribia.webp',
    caption: 'MSC Euribia – Ultimo rientro a bordo prima della rotta per Genova'
  }
};
