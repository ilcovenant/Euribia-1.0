/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * DATI ITINERARI CROCIERA MSC EURIBIA (23-30 Novembre 2026)
 * Architettura modulare: ogni porto è un anello pedonale circolare chiuso
 * con ORIGINE e DESTINAZIONE al Molo d'Attracco / Terminal Crociere esatto.
 */

import { PortItinerary } from '../types/itinerary';

export const CRUISE_INFO = {
  nave: 'MSC Euribia',
  classe: 'Meraviglia-Plus (Propulsione a GNL)',
  itinerarioNome: 'Mediterraneo Occidentale (7 Notti)',
  date: '23 nov 2026 – 30 nov 2026',
  portoPartenzaArrivo: 'Genova',
  passeggeriGruppo: '4 persone (35enni)',
  profiloViaggio: 'Mix dinamico: quartieri iconici, street art, panorami, curiosità nerd/pop culture e archeologia.',
  
  // Tabella ufficiale completa delle 7 Notti (8 Giorni) visibile nella prenotazione
  tabellaCompleta: [
    { giorno: 1, data: '23 nov 2026', porto: 'Genova', orario: 'Partenza ore 17:00', stato: 'Imbarco passeggeri' },
    { giorno: 2, data: '24 nov 2026', porto: 'Napoli', orario: '13:00 – 20:00', stato: 'Scalo (Tutti a bordo: 19:15)' },
    { giorno: 3, data: '25 nov 2026', porto: 'Palermo', orario: '09:00 – 18:00', stato: 'Scalo (Tutti a bordo: 17:15)' },
    { giorno: 4, data: '26 nov 2026', porto: 'La Goletta (Tunisi)', orario: '09:00 – 18:00', stato: 'Scalo (Tutti a bordo: 17:15)' },
    { giorno: 5, data: '27 nov 2026', porto: 'In Navigazione', orario: 'Tutto il giorno in mare', stato: 'Relax a bordo MSC Euribia' },
    { giorno: 6, data: '28 nov 2026', porto: 'Barcellona', orario: '08:00 – 18:00', stato: 'Scalo (Tutti a bordo: 17:15)' },
    { giorno: 7, data: '29 nov 2026', porto: 'Marsiglia', orario: '09:00 – 18:00', stato: 'Scalo (Tutti a bordo: 17:15)' },
    { giorno: 8, data: '30 nov 2026', porto: 'Genova', orario: 'Arrivo ore 09:00', stato: 'Sbarco finale' }
  ],

  // Analisi reale dei fusi orari per scalo rispetto all'orario della nave
  fusoOrarioInfo: {
    sintesi: '0 Ore di differenza (Nessun fuso orario durante tutta la crociera!)',
    spiegazione: 'A fine novembre, tutti e 4 i paesi dell\'itinerario (Italia, Tunisia, Spagna e Francia) si trovano sullo stesso identico fuso orario UTC+1 (CET). In Tunisia non c\'è ora legale in inverno: l\'ora a terra a La Goletta è identica al minuto all\'ora di Roma, Barcellona, Marsiglia e alla nave.',
    dettaglioPorti: [
      { porto: 'Napoli (Italia)', fuso: 'UTC+1 (CET)', differenzaNave: '0 ore (Identico)' },
      { porto: 'Palermo (Italia)', fuso: 'UTC+1 (CET)', differenzaNave: '0 ore (Identico)' },
      { porto: 'La Goletta / Tunisi', fuso: 'UTC+1 (CET)', differenzaNave: '0 ore (Identico)' },
      { porto: 'Barcellona (Spagna)', fuso: 'UTC+1 (CET)', differenzaNave: '0 ore (Identico)' },
      { porto: 'Marsiglia (Francia)', fuso: 'UTC+1 (CET)', differenzaNave: '0 ore (Identico)' }
    ]
  },

  regoleOro: [
    {
      id: 'regola-fuso',
      titolo: 'Fuso Orario: Differenze Reali rispetto all\'Orario Nave',
      icona: '⏰',
      testo: 'Zero differenze di orario (0 ore)! A novembre Italia, Tunisia, Spagna e Francia sono tutte sincronizzate su UTC+1 (CET). L\'orologio locale a terra a Tunisi, Barcellona e Marsiglia segna la stessa identica ora dell\'orologio di bordo della nave.'
    },
    {
      id: 'regola-45min',
      titolo: 'Regola dei 45 Minuti: Il Limite "Tutti a Bordo"',
      icona: '⚠️',
      testo: 'La passerella della nave chiude improrogabilmente 30-45 minuti prima dell\'orario di partenza. Se la partenza è alle 18:00, tutti devono essere a bordo entro le 17:15. I nostri percorsi ad anello terminano sempre 45 minuti prima.'
    },
    {
      id: 'regola-aereo',
      titolo: 'Modalità Aereo in Navigazione (Salva Bolletta)',
      icona: '✈️',
      testo: 'Non appena la nave lascia il porto, imposta subito lo smartphone in "Modalità Aereo". Il roaming marittimo satellitare si attiva automaticamente in mare aperto e costa decine di euro per pochi megabyte.'
    },
    {
      id: 'regola-card',
      titolo: 'Cruise Card MSC & Documento d\'Identità',
      icona: '💳',
      testo: 'Porta sempre con te la Cruise Card MSC personale (serve come chiave della cabina e come pass magnetico per uscire e rientrare al molo) più la carta d\'identità o passaporto (necessario per i controlli a La Goletta/Tunisia).'
    }
  ]
};

export const itineraryData: PortItinerary[] = [
  // ==========================================
  // 1. NAPOLI (Giorno 2 - 24 Nov 2026)
  // ==========================================
  {
    id: 'napoli',
    giornoNumero: 2,
    dataGiorno: 'Martedì 24 nov 2026',
    porto: 'Napoli (Circuito Monumentale, Spaccanapoli & Street Food dei Decumani)',
    citta: 'Napoli',
    paese: 'Italia',
    bandiera: '🇮🇹',
    orarioAttracco: '13:00',
    orarioPartenza: '20:00',
    orarioSbarcoStimato: '13:45',
    orarioTuttiABordo: '19:15',
    durataFinestraOre: '5h 30m reali a terra',
    kmTotaliStimati: 7.1,
    infoLogisticaMolo: {
      nomeMolo: 'Molo Angioino / Stazione Marittima Terminal Crociere',
      collegamentoPortoCitta: 'Uscita a piedi diretta su Piazza Municipio (0€)',
      mezzoConsigliato: '100% a piedi: circuito pedonale ad anello senza salite ripide, con rientro diretto al molo',
      costoTransfer: '0.00 € (nessun costo di transfer)',
      tempoTransferMinuti: 5,
      istruzioniDettagliate: 'La MSC Euribia attracca al Molo Angioino della Stazione Marittima di Napoli. Non servono navette o taxi: una volta scesi dalla passerella della nave, si esce a piedi dal terminal e attraversando il piazzale pedonale di Piazza Municipio ci si trova subito ai piedi del Maschio Angioino. L\'intero anello parte e si chiude a piedi direttamente sotto la prua della nave.',
      consiglioRisparmio: 'Ignora tassativamente i procacciatori di taxi all\'uscita del terminal (chiedono cifre esorbitanti per poche centinaia di metri): l\'area reale monumentale, Via Toledo, Spaccanapoli e San Gregorio Armeno si visitano comodamente a piedi in una camminata pianeggiante.'
    },
    sostaGolosaTop: {
      locale: 'Pizzeria Di Matteo / Dal Presidente & Caffè del Professore',
      specialita: 'Pizza a Portafoglio, Frittatina di Maccheroni calda, Caffè Nocciolato & Sfogliatella',
      descrizione: 'Tris gastronomico imperdibile: pausa caffè al banco allo storico Caffè del Professore in Piazza Trieste e Trento per il leggendario caffè nocciolato cremoso (1.50€), street food caldo su Via dei Tribunali con pizza a portafoglio fumante piegata in quattro (2.50-3.00€) e frittatina di pasta impanata e dorata (1.50-2.00€) da Di Matteo o Dal Presidente, e chiusura dolce prima di imbarcarsi con sfogliatella calda appena sfornata (riccia o frolla) a Piazza Municipio.',
      costoIndicativo: '6.00 € - 9.00 € a persona tutto compreso',
      indirizzo: 'Piazza Trieste e Trento, Via dei Tribunali 94 & Piazza Municipio, Napoli',
      curiosita: 'La frittatina di maccheroni napoletana è nata anticamente come geniale ricetta di recupero della pasta avanzata del pranzo domenicale, trasformata poi nel capolavoro street food più imitato al mondo.'
    },
    tappe: [
      {
        id: 'na-0',
        orario: '13:45 - 14:15',
        nome: 'Sbarco al Molo Angioino & Maschio Angioino (Castel Nuovo)',
        descrizione: 'Discesa dalla passerella della MSC Euribia ed escursione a piedi dal terminal passeggeri della Stazione Marittima direttamente sul piazzale pedonale di Piazza Municipio. Senza pagare biglietti d\'ingresso, camminata fin sotto la porta d\'accesso per ammirare l\'imponente Arco Trionfale rinascimentale in marmo bianco di Alfonso d\'Aragona (1453), incastonato tra le due torri cilindriche in piperno scuro.',
        tipologia: 'Logistica',
        kmParziali: 0.0,
        durataMinuti: 30,
        query: 'Castel Nuovo Maschio Angioino Piazza Municipio Napoli',
        curiositaNerd: 'Secondo la celebre leggenda narrata da Benedetto Croce, dalle segrete del castello (la "Fossa del Miglio") i detenuti sparivano nel nulla: si scoprì poi che dal mare si infiltrava un enorme coccodrillo egiziano che li azzannava per le gambe trascinandoli in acqua.'
      },
      {
        id: 'na-1',
        orario: '14:15 - 15:00',
        nome: 'Piazza del Plebiscito, Caffè del Professore & Galleria Umberto I',
        descrizione: 'Costeggiando Palazzo Reale lungo Via San Carlo si entra nella monumentale Piazza del Plebiscito tra il grandioso emiciclo dorico di San Francesco di Paola e le statue dei re. Tentativo della celebre "Sfida del Plebiscito" a occhi chiusi dal portone reale tra le due statue equestri. Pausa caffè veloce al banco in Piazza Trieste e Trento allo storico Caffè del Professore per un cremoso caffè nocciolato (1.50€), e attraversamento della Galleria Umberto I con rotazione scaramantica sul tacco destro sopra il mosaico zodiacale.',
        tipologia: 'Panorama',
        kmParziali: 1.1,
        durataMinuti: 45,
        query: 'Piazza del Plebiscito Piazza Trieste e Trento Napoli',
        curiositaNerd: 'La Sfida del Plebiscito: a causa della leggera pendenza a conca del selciato di Piazza del Plebiscito, bendandosi o chiudendo gli occhi dal portone di Palazzo Reale quasi nessuno riesce a camminare dritto passando tra le due statue equestri, finendo sempre deviati a destra o sinistra!'
      },
      {
        id: 'na-2',
        orario: '15:00 - 15:40',
        nome: 'Via Toledo & Opzione Nerd/Design a Metro Toledo ("Crater de Luz")',
        descrizione: 'Uscita dalla Galleria Umberto I su Via Toledo, l\'arteria pedonale più vivace della città, risalendola verso nord in totale pianura senza infilarsi nei vicoli ripidi dei Quartieri Spagnoli. All\'altezza di Piazza Carità, rapida discesa nella pluripremiata Stazione Toledo (basta passare carta contactless al tornello a 1.30€) per ammirare il fantastico "Crater de Luz" di Robert Wilson, un cono di luce a spirale in mosaico blu oceano a LED cangianti che sembra un portale fantascientifico.',
        tipologia: 'Nerd/Pop',
        kmParziali: 0.9,
        durataMinuti: 40,
        query: 'Metropolitana Toledo Crater de Luz Napoli',
        curiositaNerd: 'La stazione Toledo della metropolitana di Napoli è stata eletta da The Daily Telegraph e CNN come "la stazione metro più bella d\'Europa e del mondo": scendendo le scale mobili ci si trova a 40 metri di profondità sotto il livello del mare.'
      },
      {
        id: 'na-3',
        orario: '15:40 - 16:30',
        nome: 'Spaccanapoli: Il Gesù Nuovo, Santa Chiara & San Domenico Maggiore',
        descrizione: 'Ingresso nel decumano inferiore (Spaccanapoli) attraverso Piazza del Gesù Nuovo. Ammirazione della facciata vulcanica a bugnato piramidale a punte di diamante della Chiesa del Gesù Nuovo, passaggio davanti al campanile gotico trecentesco di Santa Chiara e sosta nell\'elegante Piazza San Domenico Maggiore con l\'obelisco barocco circondato da palazzi nobiliari.',
        tipologia: 'Storia',
        kmParziali: 0.8,
        durataMinuti: 50,
        query: 'Piazza del Gesu Nuovo Piazza San Domenico Maggiore Napoli',
        curiositaNerd: 'Le lettere aramaiche incise su ciascuna pietra a punta di diamante della facciata del Gesù Nuovo non erano semplici sigle di scalpellini: secondo un musicologo formano un vero e proprio spartito musicale rinascimentale lungo tre quarti d\'ora intitolato "Enigma".'
      },
      {
        id: 'na-4',
        orario: '16:30 - 17:15',
        nome: 'San Gregorio Armeno: La Strada dei Presepi tra Luci Natalizie & Pop Art',
        descrizione: 'Da Spaccanapoli salita lungo la stretta via di San Gregorio Armeno. Verso le 16:30 cala l\'imbrunire (il sole tramonta alle 16:42) e si accendono le lanterne calde e le luci natalizie delle botteghe storiche: essendo un martedì feriale di fine novembre, si gode l\'allestimento natalizio al 100% dell\'atmosfera senza la calca paralizzante dei weekend di dicembre. Oltre ai presepi tradizionali con muschio e sughero, botteghe piene di caricature in terracotta di icone pop di cinema, fumetti e sport.',
        tipologia: 'Nerd/Pop',
        kmParziali: 0.5,
        durataMinuti: 45,
        query: 'Via San Gregorio Armeno Napoli',
        curiositaNerd: 'Gli artigiani modellano terracotta a San Gregorio Armeno fin dai tempi della colonia greca di Neapolis, quando nella stessa via si vendevano statuette ex-voto per il tempio di Demetra. Oggi accanto a San Gennaro spuntano Goku, Maradona, Batman e i personaggi delle serie TV del momento!'
      },
      {
        id: 'na-5',
        orario: '17:15 - 18:15',
        nome: 'Via dei Tribunali: Street Food Cult, Banksy & Teschi del Purgatorio',
        descrizione: 'Sbocco su Via dei Tribunali (il decumano maggiore) e sosta street food al bancone da Pizzeria Di Matteo (o Dal Presidente) per pizza a portafoglio fumante appena sfornata (2.50-3.00€) e frittatina di pasta croccante (1.50-2.00€). A pochi passi, due chicche uniche: a Piazza Gerolomini l\'unica opera murale originale di Banksy in Italia ("La Madonna con la Pistola" protetta da teca) e al civico 39 la facciata della Chiesa di Santa Maria delle Anime del Purgatorio ad Arco con i teschi di bronzo e il teschio con velo da sposa "Lucia", lucidato a mano dai passanti.',
        tipologia: 'Cibo Cult',
        kmParziali: 0.7,
        durataMinuti: 60,
        query: 'Pizzeria Di Matteo Via dei Tribunali 94 Napoli',
        curiositaNerd: 'La Madonna con la Pistola di Banksy fu realizzata intorno al 2010 a Piazza Gerolomini ed è l\'unica opera su muro certificata dello street artist britannico sopravvissuta integra in Italia, protetta da una teca trasparente voluta dagli abitanti del quartiere.'
      },
      {
        id: 'na-6',
        orario: '18:15 - 18:50',
        nome: 'Rientro Verso il Mare & Sosta Sfogliatella Calda a Piazza Municipio',
        descrizione: 'Da Via dei Tribunali discesa verso sud lungo Via Duomo o Via Mezzocannone fino a Corso Umberto I e Piazza Bovio, proseguendo poi su Via Medina fino a Piazza Municipio (oppure opzione comoda con 1 sola fermata di Metro Linea 1 da Duomo/Università a Municipio). Prima di attraversare il cancello del molo, sosta da Cuori di Sfogliatella o Chalet Ciro su Piazza Municipio per una sfogliatella calda appena sfornata (riccia croccante o frolla morbida con ricotta e canditi a 1.50-2.00€).',
        tipologia: 'Cibo Cult',
        kmParziali: 1.8,
        durataMinuti: 35,
        query: 'Piazza Municipio Stazione Marittima Napoli',
        curiositaNerd: 'La sfogliatella riccia nacque nel XVII secolo nel convento di Santa Rosa sulla Costiera Amalfitana: la pasta sfoglia sovrapposta a strati sottilissimi crea un guscio incredibilmente croccante che trattiene il vapore caldo del ripieno aromatico.'
      },
      {
        id: 'na-7',
        orario: '18:50 - 19:15',
        nome: 'Rientro al Terminal Crociere Stazione Marittima (Tutti a Bordo 19:15)',
        descrizione: 'Attraversamento a piedi del piazzale illuminato della Stazione Marittima fino ai controlli d\'accesso del Molo Angioino. Risalita sulla passerella della MSC Euribia entro le 19:15 in totale tranquillità e sicurezza, con 45 minuti netti di anticipo rispetto alla partenza della nave fissata per le 20:00.',
        tipologia: 'Ritorno',
        kmParziali: 0.0,
        durataMinuti: 25,
        query: 'Stazione Marittima Terminal Crociere Napoli Molo Angioino',
        curiositaNerd: 'La MSC Euribia parte alle ore 20:00 navigando verso sud nel Golfo di Napoli e oltrepassando Capri durante la notte, diretta verso la Sicilia (Palermo).'
      }
    ]
  },

  // ==========================================
  // 2. PALERMO (Giorno 3 - 25 Nov 2026)
  // ==========================================
  {
    id: 'palermo',
    giornoNumero: 3,
    dataGiorno: 'Mercoledì 25 nov 2026',
    porto: 'Palermo (Mercati, Segreti Arabo-Normanni & Street Food)',
    citta: 'Palermo',
    paese: 'Italia',
    bandiera: '🇮🇹',
    orarioAttracco: '09:00',
    orarioPartenza: '18:00',
    orarioSbarcoStimato: '09:45',
    orarioTuttiABordo: '17:15',
    durataFinestraOre: '7h 30m reali a terra',
    kmTotaliStimati: 7.6,
    infoLogisticaMolo: {
      nomeMolo: 'Molo Vittorio Veneto Terminal Crociere',
      collegamentoPortoCitta: 'Uscita a piedi diretta su Via Emerico Amari (0€)',
      mezzoConsigliato: '100% a piedi: circuito pedonale circolare senza nessun mezzo o transfer',
      costoTransfer: '0.00 € (Nessuna spesa transfer)',
      tempoTransferMinuti: 5,
      istruzioniDettagliate: 'Il molo Vittorio Veneto è perfettamente integrato nel tessuto urbano di Palermo. Esci dal gate del terminal crociere su Via Emerico Amari e in soli 600 metri di piacevole viale alberato pedonalizzato sei già in Piazza Politeama. L\'anello pedonale parte e si chiude esattamente a questo gate, senza bisogno di autobus, taxi o navette!',
      consiglioRisparmio: 'Rifiuta categoricamente carrozze a cavallo e taxi privati da 80-100€: l\'intero anello dei mercati, della Cattedrale, del Cassaro e del lungomare de La Cala è una delle passeggiate pianeggianti più affascinanti e sicure d\'Europa a costo zero!'
    },
    sostaGolosaTop: {
      locale: 'Mercato del Capo (Salato) & I Segreti del Chiostro a Santa Caterina (Dolce)',
      specialita: 'Panelle e Crocchè calde, Arancina croccante & Cannolo espresso di ricotta fresca',
      descrizione: 'Doppia esperienza leggendaria della capitale europea dello street food: verso le 11:30 immersione nei banchi del Mercato del Capo per panelle calde di ceci e crocchè di patate e menta dentro la mafalda con limone (2-2.50€), arancine fumanti al ragù o al burro e per i più audaci pani c\'a meusa. Verso le 13:30, sosta al Monastero di Santa Caterina d\'Alessandria (I Segreti del Chiostro) per il cannolo di ricotta di pecora vellutata farcito espresso sul momento secondo gli antichi ricettari conventuali manoscritti.',
      costoIndicativo: '4.50 € - 7.50 € a persona tutto compreso',
      indirizzo: 'Porta Carini (Mercato del Capo) & Piazza Bellini 1 (Santa Caterina), Palermo',
      curiosita: 'Le ricette dei dolci conventuali siciliani erano gelosamente custodite dalle suore di clausura e scambiate con la cittadinanza attraverso una "ruota" girevole in legno senza contatti visivi.'
    },
    tappe: [
      {
        id: 'pa-0',
        orario: '09:45 - 10:20',
        nome: 'Sbarco Nave: Terminal Crociere & Passeggiata Liberty al Politeama',
        descrizione: 'Discesa dalla passerella della MSC Euribia e uscita dal gate portuale su Via Emerico Amari. Passeggiata di 600m lungo il viale alberato pedonale fino a Piazza Castelnuovo e Piazza Ruggero Settimo (Piazza Politeama). Sosta davanti alla facciata neoclassica del Teatro Politeama Garibaldi, coronata dalla quadriga bronzea di Apollo.',
        tipologia: 'Logistica',
        kmParziali: 0.0,
        durataMinuti: 35,
        query: 'Teatro Politeama Garibaldi Piazza Ruggero Settimo Palermo',
        curiositaNerd: 'La quadriga bronzea sulla cupola del teatro raffigura Apollo, dio delle arti: all\'inizio del Novecento questa piazza segnava il confine tra la città storica e l\'espansione della ricca Palermo Liberty della dinastia Florio.'
      },
      {
        id: 'pa-1',
        orario: '10:20 - 10:50',
        nome: 'Via Ruggero Settimo & Teatro Massimo (Location Cult "Il Padrino III")',
        descrizione: 'Passeggiata sull\'isola pedonale di Via Ruggero Settimo fino a Piazza Verdi (400m). Sosta davanti al maestoso Teatro Massimo, il più grande teatro d\'opera d\'Italia e terzo d\'Europa, e sui gradini della scalinata monumentale tra i due leoni di bronzo.',
        tipologia: 'Nerd/Pop',
        kmParziali: 0.6,
        durataMinuti: 30,
        query: 'Teatro Massimo Piazza Verdi Palermo',
        curiositaNerd: 'Scena Cult del Cinema: proprio su questi gradini fu girata la tragica sequenza finale de "Il Padrino - Parte III" (1990) di Francis Ford Coppola, con l\'agguato a Mary Corleone e il celebre urlo disperato di Michael Corleone (Al Pacino).'
      },
      {
        id: 'pa-2',
        orario: '10:50 - 12:00',
        nome: 'Mercato del Capo: Voci, Spezie & Street Food Salato',
        descrizione: 'Attraversamento di Via Volturno ed ingresso nel mercato storico attraverso l\'antica Porta Carini. Il Mercato del Capo è strutturato come un autentico souk arabo medievale tra abbanniate (richiami cantati dei venditori), banchi di spezie e pesce fresco. Sosta street food al bancone: panelle calde dorate di ceci e crocchè di patate nella mafalda con limone (2.00-2.50€), arancina croccante al ragù o burro, e per i più audaci pani c\'a meusa (schettu o maritatu).',
        tipologia: 'Cibo Cult',
        kmParziali: 0.8,
        durataMinuti: 70,
        query: 'Mercato del Capo Porta Carini Palermo',
        curiositaNerd: 'La leggenda popolare vuole che nei cunicoli e camminamenti sotterranei sotto il Mercato del Capo avesse la propria sede segreta la misteriosa setta dei Beati Paoli, i giustizieri mascherati della tradizione siciliana.'
      },
      {
        id: 'pa-3',
        orario: '12:00 - 12:45',
        nome: 'Cattedrale di Palermo & Tomba di Federico II "Stupor Mundi"',
        descrizione: 'Uscita dal mercato risalendo Via Beati Paoli fino a sbucare su Corso Vittorio Emanuele davanti alla Cattedrale arabo-normanna. Ammirazione del giardino recintato di palme e della monumentale facciata tra merlature e torrette. Ingresso libero nella navata principale per contemplare i maestosi sarcofagi in porfido rosso dei re normanni e di Federico II di Svevia (lo "Stupor Mundi"), oltre alla meridiana solare in marmo con i segni zodiacali del 1801.',
        tipologia: 'Storia',
        kmParziali: 0.7,
        durataMinuti: 45,
        query: 'Cattedrale di Palermo Corso Vittorio Emanuele',
        curiositaNerd: 'La Cattedrale è un palinsesto storico unico: nata come basilica paleocristiana, fu trasformata in grande moschea venerdì per 7.000 fedeli nell\'831, e poi riconsacrata nel 1072. Su una delle colonne del portico d\'ingresso è ancora incisa un\'iscrizione araba tratta dal Corano.'
      },
      {
        id: 'pa-4',
        orario: '12:45 - 13:30',
        nome: 'Discesa del Cassaro, Quattro Canti, Piazza Pretoria & Genio di Palermo',
        descrizione: 'Discesa lungo l\'isola pedonale del Cassaro (la via più antica di Palermo, fondata dai Fenici). Sosta allo spettacolare incrocio ottagonale barocco dei Quattro Canti (Piazza Vigliena o "Teatro del Sole"), passaggio nella contigua Piazza Pretoria con la monumentale fontana toscana marmorea "della Vergogna" ed ingresso nel cortile a portici di Palazzo delle Aquile (Comune, accesso libero) per ammirare la statua del Genio di Palermo.',
        tipologia: 'Storia',
        kmParziali: 0.7,
        durataMinuti: 45,
        query: 'Quattro Canti Piazza Vigliena Palermo',
        curiositaNerd: 'Il Genio di Palermo è la divinità protettrice pagana pre-romana della città: raffigurato come un re barbuto con corona e un serpente che si nutre al suo petto, personifica la terra di Palermo che accoglie e nutre anche gli stranieri.'
      },
      {
        id: 'pa-5',
        orario: '13:30 - 14:15',
        nome: 'Piazza Bellini: Cannolo Espresso a Santa Caterina & Cupole di San Cataldo',
        descrizione: 'Giro dell\'angolo ed ingresso in Piazza Bellini. Ingresso al Monastero di Santa Caterina d\'Alessandria per raggiungere la celebre dolceria conventuale interna "I Segreti del Chiostro" (accesso libero): ordinazione del cannolo siciliano con cialda croccante riempita al momento di ricotta di pecora vellutata e cioccolato (3.50-4.00€), gustato nel chiostro con fontana e aranci. Accanto spicca la Chiesa di San Cataldo con le sue 3 caratteristiche cupole emisferiche rosso acceso.',
        tipologia: 'Cibo Cult',
        kmParziali: 0.3,
        durataMinuti: 45,
        query: 'I Segreti del Chiostro Monastero di Santa Caterina Piazza Bellini Palermo',
        curiositaNerd: 'Le tre cupole rosse di San Cataldo (1160) non sono intonacate: il colore rosso fu applicato durante i restauri ottocenteschi dell\'architetto Patricolo prendendo spunto dalla malta idraulica pozzolanica araba originale.'
      },
      {
        id: 'pa-6',
        orario: '14:15 - 15:30',
        nome: 'Piazza Marina, Il Ficus Gigante "Avatar" & La Vucciria',
        descrizione: 'Continuazione della discesa lungo il Cassaro verso il mare ed ingresso in Piazza Marina. Nel Giardino Garibaldi (parco pubblico libero) contemplazione dell\'esemplare di Ficus macrophylla più imponente d\'Europa: un colosso monumentale del 1863 alto oltre 30m e largo 50m con una foresta di radici aeree a colonna che sembra l\'albero fantastico di Avatar. Sosta davanti a Palazzo Chiaramonte-Steri (antica sede dell\'Inquisizione) e rapido passaggio nei vicoli della Vucciria tra street art e botteghe.',
        tipologia: 'Nerd/Pop',
        kmParziali: 1.0,
        durataMinuti: 75,
        query: 'Ficus Macrophylla Giardino Garibaldi Piazza Marina Palermo',
        curiositaNerd: 'Questo mastodontico Ficus monumentale fu piantato nel 1863 dall\'architetto Giovan Battista Filippo Basile subito dopo l\'Unità d\'Italia: le sue radici aeree calano dai rami toccando terra per trasformarsi in nuovi tronchi portanti!'
      },
      {
        id: 'pa-7',
        orario: '15:30 - 16:30',
        nome: 'La Cala & Passeggiata Relax sul Porto Antico',
        descrizione: 'Attraversamento da Piazza Marina verso lo specchio d\'acqua semicircolare de La Cala. Passeggiata rilassata lungo le banchine tra barche a vela, pescherecci ormeggiati e caffetterie all\'aperto con vista panoramica sul golfo e su Monte Pellegrino. Momento ideale per una sosta seduti al sole con una spuma siciliana rinfrescante, un mandarino al limone o una birra artigianale senza alcuna ansia da orario.',
        tipologia: 'Panorama',
        kmParziali: 0.8,
        durataMinuti: 60,
        query: 'Porto della Cala Palermo',
        curiositaNerd: 'La Cala è l\'approdo naturale originario dove nell\'VIII secolo a.C. sbarcarono i Fenici fondando la città con il nome di "Zyz" ("il fiore"), poi ribattezzata dai greci "Panormos" ("tutto porto").'
      },
      {
        id: 'pa-8',
        orario: '16:30 - 17:15',
        nome: 'Rientro a piedi al Terminal Crociere Molo Vittorio Veneto (Tutti a Bordo 17:15)',
        descrizione: 'Dalla punta nord della Cala camminata distesa sul marciapiede lungomare di Via Francesco Crispi per soli 1,2 km completamente pianeggianti (circa 15 minuti a piedi). Rientro attraverso i gate del terminal crociere e risalita sulla passerella della MSC Euribia entro le 17:15 con 45 minuti di anticipo sulla partenza delle 18:00, avendo speso zero euro in trasporti!',
        tipologia: 'Ritorno',
        kmParziali: 1.2,
        durataMinuti: 45,
        query: 'Terminal Crociere Palermo Molo Vittorio Veneto',
        curiositaNerd: 'L\'intero circuito di Palermo è stato completato a impatto zero e costo zero di trasporto: la MSC Euribia salpa alle 18:00 navigando verso sud nel canale di Sicilia alla volta de La Goletta (Tunisia).'
      }
    ]
  },

  // ==========================================
  // 3. LA GOLETTA / TUNISI (Giorno 4 - 26 Nov 2026)
  // ==========================================
  {
    id: 'la-goletta',
    giornoNumero: 4,
    dataGiorno: 'Giovedì 26 nov 2026',
    porto: 'La Goletta (Sidi Bou Said, Cartagine Punica & Piccola Sicilia)',
    citta: 'La Goletta / Cartagine / Sidi Bou Said',
    paese: 'Tunisia',
    bandiera: '🇹🇳',
    orarioAttracco: '09:00',
    orarioPartenza: '18:00',
    orarioSbarcoStimato: '09:45',
    orarioTuttiABordo: '17:15',
    durataFinestraOre: '7h 30m reali a terra',
    kmTotaliStimati: 7.2,
    infoLogisticaMolo: {
      nomeMolo: 'Goulette Village Cruise Terminal',
      collegamentoPortoCitta: 'Gare La Goulette Vieille (750m a piedi) + Treno TGM & Rientro TGM / Taxi giallo o inDrive',
      mezzoConsigliato: 'Treno TGM andata e ritorno (1ère classe ~0.35€) + eventuale taxi giallo a tassametro o app inDrive (~2-3€ totali per 4 persone)',
      costoTransfer: '~1.50 € - 3.00 € a testa per tutti i trasporti della giornata (TGM + eventuale taxi/inDrive)',
      tempoTransferMinuti: 25,
      istruzioniDettagliate: 'Strategia a imbuto anticoda e antirischio: all\'uscita del molo cambia circa 20€ a testa in Dinari Tunisini (TND) agli sportelli bancari ufficiali interni al Goulette Cruise Terminal. Esci dai cancelli e cammina per soli 750 metri (9 minuti a piedi su Rue des Ramparts / Rue Hédi Chaker) fino alla stazione "Gare de la Goulette Vieille" (la più vicina al molo, a differenza di Casino che dista 2.2 km). Prendi il treno TGM verso nord fino al capolinea di Sidi Bou Saïd. Al pomeriggio scendi di 6 fermate TGM fino a Carthage Salammbô per esplorare i Porti Punici (Cothon) e il misterioso Tophet. Infine rientra a La Goletta con 3 fermate di TGM (6 min) oppure un taxi giallo con tassametro / app inDrive (~6-10 TND / ~2-3€ totali in 4), trascorrendo l\'ultima ora e mezza a meno di 600m dalla nave tra la fortezza Borj el-Karraka e la Piccola Sicilia, azzerando qualsiasi ansia da ritardo!',
      consiglioRisparmio: 'Rifiuta categoricamente i taxi turistici all\'interno del terminal (chiedono fino a 80-120€ a persona). Nota importante: Bolt non opera più in Tunisia (servizio chiuso nel 2025). I mezzi più affidabili ed economici sono il treno TGM (1.20 TND ~0.35€ in 1ère classe, 100% senza internet), i taxi gialli su strada chiedendo sempre il tassametro ("compteur") oppure l\'app inDrive (se avete eSIM/dati mobili).'
    },
    sostaGolosaTop: {
      locale: 'Bottega del Bambalouni & Café des Nattes (Sidi Bou Said)',
      specialita: 'Bambalouni fritto fumante & Thé aux pignons (tè alla menta con pinoli) + Chapati Tunisien salato',
      descrizione: 'A Sidi Bou Saïd: ciambella di pasta lievitata fritta al momento nel calderone di rame e passata nello zucchero semolato alla bottega storica di Rue Hédi Zarrouk (~0.40€). Relax al mitico Café des Nattes, togliendosi le scarpe per sedersi a gambe incrociate sulle stuoie berbere originali con il tè verde alla menta e pinoli tostati (~1.50€). Per il salato: Chapati tunisien sfogliato su piastra con frittata al prezzemolo, tonno, formaggio e harissa nei chioschi vicino alla stazione TGM o all\'inizio di Rue Habib Thameur (1.50€ - 2.00€).',
      costoIndicativo: '3.50 € - 5.00 € a persona tutto compreso',
      indirizzo: 'Rue Hédi Zarrouk, Sidi Bou Said 2026',
      curiosita: 'Il Café des Nattes è l\'autentico caffè storico degli artisti e dei poeti tunisini fin dall\'Ottocento: i prezzi sono popolari e non applica i rincari esagerati dei bar turistici della costa.'
    },
    tappe: [
      {
        id: 'lg-0',
        orario: '09:45',
        nome: 'Sbarco Nave: Goulette Village Cruise Terminal',
        descrizione: 'Discesa dalla passerella della MSC Euribia e passaggio doganale. Cambio di circa 20€ a testa in Dinari Tunisini (TND) agli sportelli bancari ufficiali interni al terminal prima di uscire dai cancelli.',
        tipologia: 'Logistica',
        kmParziali: 0.0,
        durataMinuti: 20,
        query: 'Goulette Village Cruise Terminal La Goulette',
        curiositaNerd: 'Il porto de La Goletta (Halq al-Wadi, "la gola del fiume") è la storica porta marittima di Tunisi: qui nacque la celebre attrice Claudia Cardinale nel 1938 nella vivace comunità italo-tunisina locale.',
        wikiSlug: 'piccola-sicilia'
      },
      {
        id: 'lg-1',
        orario: '10:05 - 10:25',
        nome: 'Gare de la Goulette Vieille & Partenza TGM',
        descrizione: 'Camminata di soli 750 metri (9 minuti a piedi) uscendo dai cancelli del porto attraverso Rue des Ramparts e Rue Hédi Chaker fino alla Gare de la Goulette Vieille (la stazione TGM più vicina in assoluto al terminal crociere). Alla biglietteria si acquistano 4 biglietti di 1ère classe per Sidi Bou Saïd (~1.20 TND / 0.35€ a persona).',
        tipologia: 'Logistica',
        kmParziali: 0.8,
        durataMinuti: 20,
        query: 'Gare de la Goulette Vieille 42 Rue Hedi Chaker La Goulette',
        curiositaNerd: 'La ferrovia TGM è ininterrottamente in funzione dal 1874 ed è una delle più antiche linee ferroviarie elettrificate di tutta l\'Africa. I convogli sono spartani e genuini, perfetti per evitare il pressing dei tassisti non autorizzati.',
        wikiSlug: 'tgm-ferrovia'
      },
      {
        id: 'lg-2',
        orario: '10:25 - 13:15',
        nome: 'Sidi Bou Saïd: Borgo Andaluso, Street Food & Café des Nattes',
        descrizione: 'Viaggio in TGM (~25 min) fino a Sidi Bou Saïd. Salita a piedi lungo Rue Hédi Zarrouk tra le celebri case a calce bianca, porte borchiate azzurre e bouganville fino al faro (Belvedere Ras Katarjamah) con vista mozzafiato sul golfo di Tunisi e affaccio fotografico panoramico sul Café des Délices dalla terrazza pubblica antistante. Sosta rigenerante al leggendario Café des Nattes togliendosi le scarpe sulle stuoie tradizionali con tè verde ai pinoli e degustazione del mitico Bambalouni fritto zuccherato e del Chapati Tunisien salato su piastra.',
        tipologia: 'Panorama',
        kmParziali: 1.8,
        durataMinuti: 170,
        query: 'Cafe des Nattes Rue Hedi Zarrouk Sidi Bou Said',
        curiositaNerd: 'Nell\'aprile 1914 il pittore Paul Klee ebbe qui la celebre folgorazione: "Il colore mi possiede... Io e il colore siamo una cosa sola: sono un pittore", che diede inizio all\'astrattismo moderno. Notate i battenti delle porte chiodate: hanno 3 anelli dal suono differente per distinguere se a bussare era un uomo, una donna o un ospite sconosciuto.',
        wikiSlug: 'sidi-bou-said'
      },
      {
        id: 'lg-3',
        orario: '13:15 - 14:45',
        nome: 'Porto Militare Punico (Cothon & Isola dell\'Ammiragliato)',
        descrizione: 'Discesa alla stazione TGM di Sidi Bou Saïd e treno verso sud in direzione Tunis Marine. Si scende dopo 6 fermate a Carthage Salammbô (~10 min di tragitto, ~0.25€). Camminata di 500m fino al bacino lagunare circolare. Acquisto del Pass cumulativo archeologico da 12 TND (~3.60€, valido per Porti e Tophet) e traversata della passerella verso l\'Isola dell\'Ammiragliato per ammirare i plastici navali e le banchine puniche.',
        tipologia: 'Archeologia',
        kmParziali: 1.5,
        durataMinuti: 90,
        query: 'Punic Ports of Carthage Cothon Salammbo',
        curiositaNerd: 'Il Cothon era il segreto militare più sorvegliato dell\'antichità: un bacino navale artificiale circolare invisibile dal largo, in grado di ospitare e nascondere 220 triremi da guerra a raggiera, con scivoli di varo rapido e cantieri di riparazione a tempo di record.',
        wikiSlug: 'cothon-cartagine'
      },
      {
        id: 'lg-4',
        orario: '14:45 - 15:30',
        nome: 'Santuario del Tophet di Salammbô',
        descrizione: 'Camminata a piedi di soli 400 metri (5 minuti) verso sud lungo Rue Hannibal. Ingresso con lo stesso pass cumulativo già acquistato. Visita all\'enigmatica area sacra ipogea a cielo aperto tra palme ed eucalipti, costellata da centinaia di stele votive calcaree con il simbolo triangolare della dea fenicia Tanit e dediche a Baal Hammon.',
        tipologia: 'Archeologia',
        kmParziali: 0.5,
        durataMinuti: 45,
        query: 'Tophet de Carthage Salammbo Rue Hannibal',
        curiositaNerd: 'Niente a che vedere con le solite colonne imperiali romane: è il sito più misterioso ed esoterico dell\'archeologia fenicio-punica, al centro del celebre romanzo storico "Salammbô" di Gustave Flaubert sul controverso sacrificio votivo dei primogeniti al dio Moloch.',
        wikiSlug: 'tophet-salammbo'
      },
      {
        id: 'lg-5',
        orario: '15:30 - 16:55',
        nome: 'La Goletta: Fortezza Borj el-Karraka, Piccola Sicilia & Paranza',
        descrizione: 'Dal Tophet, rientro rapido verso Avenue Franklin Roosevelt a La Goletta (~3 km): in treno TGM dalla vicina stazione Carthage Salammbô (3 fermate, ~6 min, ~0.35€) oppure con un taxi giallo su strada con tassametro / app inDrive (6-10 TND / ~2-3€ per l\'intera auto in 4; nota: Bolt non è attivo in Tunisia). Visita alla fortezza Borj el-Karraka (1535), passeggiata nel quartiere della Piccola Sicilia davanti alla Chiesa di Sant\'Agostino e San Fedele, e sosta sul lungomare per un caffè turco all\'acqua di fiori d\'arancio (zahar) o un cartoccio di paranza fritta appena pescata, a soli 600m dalla nave.',
        tipologia: 'Nerd/Pop',
        kmParziali: 2.0,
        durataMinuti: 85,
        query: 'Borj el Karraka La Goulette Avenue Franklin Roosevelt',
        curiositaNerd: 'La fortezza Borj el-Karraka fu teatro degli scontri cruenti tra Carlo V e il corsaro ottomano Barbarossa. Nella Piccola Sicilia, la convivenza tra marinai italiani ed arabi era così stretta che durante la processione della Madonna di Trapani i pescatori musulmani portavano a spalla la statua cristiana della Vergine.',
        wikiSlug: 'borj-el-karraka'
      },
      {
        id: 'lg-6',
        orario: '16:55 - 17:15',
        nome: 'Rientro a piedi al Terminal Crociere Goulette Village (Tutti a Bordo 17:15)',
        descrizione: 'Camminata di 5-7 minuti (550 metri) fino ai cancelli del Goulette Cruise Village. Spesa degli ultimi spiccioli di dinari nei banchetti del terminal per datteri freschi (Deglet Nour) o harissa artigianale, e risalita a bordo della MSC Euribia entro le 17:15 in totale sicurezza e relax.',
        tipologia: 'Ritorno',
        kmParziali: 0.6,
        durataMinuti: 20,
        query: 'Goulette Village Cruise Terminal La Goulette',
        curiositaNerd: 'Grazie alla strategia a imbuto, l\'ultima ora viene trascorsa a poche centinaia di metri dalla nave: anche in caso di qualsiasi imprevisto, la banchina è raggiungibile in pochi minuti a piedi senza alcuno stress da traffico!',
        wikiSlug: 'piccola-sicilia'
      }
    ]
  },

  // ==========================================
  // 4. BARCELLONA (Giorno 6 - 28 Nov 2026)
  // ==========================================
  {
    id: 'barcellona',
    giornoNumero: 6,
    dataGiorno: 'Sabato 28 nov 2026',
    porto: 'Barcellona (Centro Storico, Street Food & Triángulo Friki)',
    citta: 'Barcellona',
    paese: 'Spagna',
    bandiera: '🇪🇸',
    orarioAttracco: '08:00',
    orarioPartenza: '18:00',
    orarioSbarcoStimato: '08:45',
    orarioTuttiABordo: '17:15',
    durataFinestraOre: '8h 30m reali a terra',
    kmTotaliStimati: 7.7,
    infoLogisticaMolo: {
      nomeMolo: 'Moll Adossat (Terminal Creuers Barcelona)',
      collegamentoPortoCitta: 'Cruise Bus T3 (Portbus blu A/R 4.50€) fino alla Statua di Colombo',
      mezzoConsigliato: 'Cruise Bus T3 fino al Monument a Colom (Plaça del Portal de la Pau)',
      costoTransfer: '4.50 € Andata e Ritorno a persona (acquistabile a bordo in contanti o carta)',
      tempoTransferMinuti: 12,
      istruzioniDettagliate: 'La MSC Euribia attracca al molo Moll Adossat, isolato dalla città da un ponte mobile. Salite subito sul Cruise Bus T3 (bus blu Portbus) davanti all\'uscita del terminal: vi porta in 10-12 minuti alla Statua di Colombo, punto di partenza e chiusura dell\'intero anello pedonale. Per il rientro, presentatevi alla fermata del bus T3 (alla base del Monument a Colom) tra le 16:15 e le 16:25: attraverserete il ponte e salirete a bordo entro le 16:45, con ben 30 minuti di cuscinetto relax prima del Tutti a bordo tassativo (17:15)!',
      consiglioRisparmio: 'Acquistate a bordo del bus il biglietto A/R da 4.50€ (conservate il talloncino cartaceo per il ritorno). Evitate assolutamente i taxi privati dal molo e non salite in nave per pranzare: perdereste quasi 2 ore tra controlli e molo. Fate street food tipico al volo nel centro storico!'
    },
    sostaGolosaTop: {
      locale: 'Granja M. Viader (dal 1870) & Coni Jamón alla Boqueria',
      specialita: 'Churros caldi dorati con cioccolata densa / Cacaolat & Cono di Jamón Ibérico de Bellota',
      descrizione: 'Combinazione street food leggendaria: cono da asporto di Jamón Ibérico de Bellota tagliato al coltello o formaggio Manchego tra i corridoi interni del Mercat de la Boqueria (3-4€) e sosta alla centenaria Granja M. Viader (Carrer d\'en Xuclà 4-6, dal 1870) per churros appena fritti con cioccolata fondente catalana o una bottiglietta del Cacaolat originale brevettato qui nel 1931.',
      costoIndicativo: '4.00 € - 6.50 € a persona',
      indirizzo: 'Carrer d\'en Xuclà 4-6 & La Rambla 91, 08001 Barcelona',
      curiosita: 'Nel 1931 Marc Viader inventò proprio in questo laboratorio la prima bevanda al cacao e latte pastorizzato, battezzandola "Cacaolat", diventata icona pop spagnola.'
    },
    tappe: [
      {
        id: 'bc-0',
        orario: '08:45 - 09:15',
        nome: 'Sbarco Nave: Moll Adossat & Cruise Bus T3',
        descrizione: 'Discesa dalla passerella della MSC Euribia e salita sul Cruise Bus T3 (Portbus blu) posizionato davanti al terminal. Acquisto del biglietto A/R da 4.50€ a persona e tragitto panoramico sul ponte mobile Porta d\'Europa fino alla Statua di Colombo.',
        tipologia: 'Logistica',
        kmParziali: 0.0,
        durataMinuti: 30,
        query: 'Moll Adossat Terminal Creuers Barcelona',
        curiositaNerd: 'Il molo Adossat è lungo oltre 2 km; il ponte strallato Porta d\'Europa ha una campata mobile di 109 metri che si apre in soli 3 minuti per consentire il transito dei grandi traghetti.'
      },
      {
        id: 'bc-1',
        orario: '09:15 - 10:15',
        nome: 'El Raval, Palau Güell, Mercat de la Boqueria & Churros da Viader',
        descrizione: 'Dalla Statua di Colombo risalita della Rambla ed ingresso a sinistra nel quartiere El Raval: sosta fotografica davanti alla facciata di Palau Güell di Gaudí (archi parabolici e comignoli scultorei in pietra), traversata della Boqueria nei corridoi centrali per un cono al volo di jamón ibérico de bellota o frutta fresca (3-4€), e pausa alla vicina Granja M. Viader (aperta dal 1870) per churros caldi con cioccolata densa o Cacaolat.',
        tipologia: 'Cibo Cult',
        kmParziali: 1.2,
        durataMinuti: 60,
        query: 'Granja M. Viader Carrer d en Xucla Barcelona',
        curiositaNerd: 'I 20 comignoli sul tetto di Palau Güell sono sculture astratte rivestite con la tecnica del "trencadís" (frammenti di ceramica e bicchieri rotti), che anticiparono di 20 anni il modernismo catalano.'
      },
      {
        id: 'bc-2',
        orario: '10:15 - 11:30',
        nome: 'Barrio Gótico: Plaça Reial, Carrer del Bisbe & Cattedrale',
        descrizione: 'Attraversamento della Rambla verso il cuore medievale gotico. Sosta a Plaça Reial con i lampioni in ghisa a 6 bracci disegnati da un giovanissimo Gaudí nel 1878, passaggio sotto il leggendario Ponte neogotico di Carrer del Bisbe con il teschio trafitto da pugnale, raccoglimento nella piazzetta silenziosa di Sant Felip Neri (con i fori della bomba della Guerra Civile) e maestosa facciata gotica della Cattedrale di Santa Eulalia (con le 13 oche del chiostro).',
        tipologia: 'Storia',
        kmParziali: 1.0,
        durataMinuti: 75,
        query: 'Pont del Bisbe Carrer del Bisbe Barcelona',
        curiositaNerd: 'La leggenda metropolitana del Ponte del Bisbe vuole che chi incroci lo sguardo del teschio umano scolpito sotto l\'arco sia colpito da sfortuna, a meno che non attraversi la via camminando all\'indietro!'
      },
      {
        id: 'bc-3',
        orario: '11:30 - 12:30',
        nome: 'El Born, Basilica di Santa Maria del Mar & Street Food',
        descrizione: 'Proseguimento a est oltre Via Laietana tra i vicoli marinari di El Born. Sosta davanti alla severa facciata gotica della Basilica di Santa Maria del Mar (la "Cattedrale del Mare" del romanzo di Ildefonso Falcones) per scorgere sulle porte in bronzo le figure dei "bastaixos" (gli scaricatori di porto). Passeggiata tra Carrer de Montcada e Passeig del Born, con sosta per un\'empanada calda artigianale da passeggio (2-3€) presa al bancone.',
        tipologia: 'Storia',
        kmParziali: 0.9,
        durataMinuti: 60,
        query: 'Basilica de Santa Maria del Mar Barcelona',
        curiositaNerd: 'I bastaixos erano una corporazione medievale intoccabile: caricarono a spalla centinaia di migliaia di blocchi di pietra dalla montagna del Montjuïc per erigere la chiesa come omaggio del popolo contro l\'arroganza nobiliare.'
      },
      {
        id: 'bc-4',
        orario: '12:30 - 13:30',
        nome: 'Parc de la Ciutadella: Cascada Monumentale & Mammut di Pietra',
        descrizione: 'Ingresso diretto nell\'oasi verde del parco cittadino. Sosta davanti alla colossale Cascada Monumental coronata dalla quadriga dorata di Aurora (ai cui calcoli idraulici e grifoni d\'acqua collaborò Gaudí ancora studente) e foto cult davanti alla statua a grandezza naturale del Mammut lanoso in pietra del 1907 seminascosta tra gli alberi.',
        tipologia: 'Parco',
        kmParziali: 0.9,
        durataMinuti: 60,
        query: 'Cascada Monumental Parc de la Ciutadella Barcelona',
        curiositaNerd: 'Il mammut in cemento fu la prima statua preistorica installata nel 1907: l\'ambizioso progetto iniziale prevedeva un intero parco di dinosauri e megafauna a grandezza naturale, ma si esaurirono i fondi municipali!'
      },
      {
        id: 'bc-5',
        orario: '13:30 - 15:15',
        nome: 'Arc de Triomf & Triángulo Friki (Norma Comics, Gigamesh, Kaburi)',
        descrizione: 'Uscita lungo il viale alberato di Passeig de Lluís Companys sotto l\'Arc de Triomf neomoresco in mattoni rossi ed ingresso nel celebre distretto nerd "Triángulo Friki" (aperto con orario continuato di sabato!). Esplorazione di Norma Comics (2 piani, tempio pop vincitore dell\'Eisner Award con statue 1:1 e gadget), Gigamesh (la mecca fantasy/sci-fi che scoprì George R.R. Martin in Spagna), e gli showroom di giochi da tavolo, retrogaming e manga su Carrer de Bailèn.',
        tipologia: 'Nerd/Pop',
        kmParziali: 1.4,
        durataMinuti: 105,
        query: 'Norma Comics Passeig de Sant Joan Barcelona',
        curiositaNerd: 'Norma Comics fu il primo comic shop in Europa ad aggiudicarsi il prestigioso Will Eisner Spirit of Comics Retailer Award al San Diego Comic-Con: all\'interno custodisce statue life-size di Darth Vader, Batman e Alien.'
      },
      {
        id: 'bc-6',
        orario: '15:15 - 16:15',
        nome: 'Rientro Panoramico: Port Vell & Passerella Rambla del Mar',
        descrizione: 'Dal distretto nerd discesa verso sud costeggiando il Born lungo Passeig de Picasso fino a Pla de Palau e alla storica dogana (Aduana). Attraversamento scenografico della passerella in legno ondulato della Rambla del Mar sul porto antico tra yacht e gabbiani, sbucando direttamente ai piedi del Monument a Colom.',
        tipologia: 'Panorama',
        kmParziali: 1.8,
        durataMinuti: 60,
        query: 'Rambla de Mar Port Vell Barcelona',
        curiositaNerd: 'La passerella della Rambla del Mar ha una sezione centrale rotante di 40 metri che ruota orizzontalmente sull\'acqua per consentire l\'ingresso e l\'uscita dei velieri dal porto vecchio.'
      },
      {
        id: 'bc-7',
        orario: '16:15 - 17:00',
        nome: 'Rientro al Terminal Crociere Moll Adossat (Tutti a Bordo 17:15)',
        descrizione: 'Arrivo alla fermata del Cruise Bus T3 ai piedi della Statua di Colombo tra le 16:15 e le 16:25. Corsa di 10-12 minuti attraverso il ponte Porta d\'Europa e risalita sulla passerella della MSC Euribia entro le 16:45, con oltre 30 minuti di pieno cuscinetto sicurezza prima del Tutti a bordo (17:15).',
        tipologia: 'Ritorno',
        kmParziali: 0.0,
        durataMinuti: 45,
        query: 'Moll Adossat Terminal Creuers Barcelona',
        curiositaNerd: 'La MSC Euribia salpa alle 18:00 dal porto di Barcellona facendo rotta verso nord-est per la penultima tappa della crociera: Marsiglia.'
      }
    ],
    varianti: [
      {
        id: 'barcellona-classico',
        label: 'Anello Classico',
        badge: 'Port Vell • 7.7 km',
        portoTitolo: 'Barcellona (Centro Storico, Street Food & Triángulo Friki)',
        kmTotaliStimati: 7.7,
        infoLogisticaMolo: {
          nomeMolo: 'Moll Adossat (Terminal Creuers Barcelona)',
          collegamentoPortoCitta: 'Cruise Bus T3 (Portbus blu A/R 4.50€) fino alla Statua di Colombo',
          mezzoConsigliato: 'Cruise Bus T3 fino al Monument a Colom (Plaça del Portal de la Pau)',
          costoTransfer: '4.50 € Andata e Ritorno a persona (acquistabile a bordo in contanti o carta)',
          tempoTransferMinuti: 12,
          istruzioniDettagliate: 'La MSC Euribia attracca al molo Moll Adossat, isolato dalla città da un ponte mobile. Salite subito sul Cruise Bus T3 (bus blu Portbus) davanti all\'uscita del terminal: vi porta in 10-12 minuti alla Statua di Colombo, punto di partenza e chiusura dell\'intero anello pedonale. Per il rientro, presentatevi alla fermata del bus T3 (alla base del Monument a Colom) tra le 16:15 e le 16:25: attraverserete il ponte e salirete a bordo entro le 16:45, con ben 30 minuti di cuscinetto relax prima del Tutti a bordo tassativo (17:15)!',
          consiglioRisparmio: 'Acquistate a bordo del bus il biglietto A/R da 4.50€ (conservate il talloncino cartaceo per il ritorno). Evitate assolutamente i taxi privati dal molo e non salite in nave per pranzare: perdereste quasi 2 ore tra controlli e molo. Fate street food tipico al volo nel centro storico!'
        },
        tappe: [
          {
            id: 'bc-0',
            orario: '08:45 - 09:15',
            nome: 'Sbarco Nave: Moll Adossat & Cruise Bus T3',
            descrizione: 'Discesa dalla passerella della MSC Euribia e salita sul Cruise Bus T3 (Portbus blu) posizionato davanti al terminal. Acquisto del biglietto A/R da 4.50€ a persona e tragitto panoramico sul ponte mobile Porta d\'Europa fino alla Statua di Colombo.',
            tipologia: 'Logistica',
            kmParziali: 0.0,
            durataMinuti: 30,
            query: 'Moll Adossat Terminal Creuers Barcelona',
            curiositaNerd: 'Il molo Adossat è lungo oltre 2 km; il ponte strallato Porta d\'Europa ha una campata mobile di 109 metri che si apre in soli 3 minuti per consentire il transito dei grandi traghetti.'
          },
          {
            id: 'bc-1',
            orario: '09:15 - 10:15',
            nome: 'El Raval, Palau Güell, Mercat de la Boqueria & Churros da Viader',
            descrizione: 'Dalla Statua di Colombo risalita della Rambla ed ingresso a sinistra nel quartiere El Raval: sosta fotografica davanti alla facciata di Palau Güell di Gaudí (archi parabolici e comignoli scultorei in pietra), traversata della Boqueria nei corridoi centrali per un cono al volo di jamón ibérico de bellota o frutta fresca (3-4€), e pausa alla vicina Granja M. Viader (aperta dal 1870) per churros caldi con cioccolata densa o Cacaolat.',
            tipologia: 'Cibo Cult',
            kmParziali: 1.2,
            durataMinuti: 60,
            query: 'Granja M. Viader Carrer d en Xucla Barcelona',
            curiositaNerd: 'I 20 comignoli sul tetto di Palau Güell sono sculture astratte rivestite con la tecnica del "trencadís" (frammenti di ceramica e bicchieri rotti), che anticiparono di 20 anni il modernismo catalano.'
          },
          {
            id: 'bc-2',
            orario: '10:15 - 11:30',
            nome: 'Barrio Gótico: Plaça Reial, Carrer del Bisbe & Cattedrale',
            descrizione: 'Attraversamento della Rambla verso il cuore medievale gotico. Sosta a Plaça Reial con i lampioni in ghisa a 6 bracci disegnati da un giovanissimo Gaudí nel 1878, passaggio sotto il leggendario Ponte neogotico di Carrer del Bisbe con il teschio trafitto da pugnale, raccoglimento nella piazzetta silenziosa di Sant Felip Neri (con i fori della bomba della Guerra Civile) e maestosa facciata gotica della Cattedrale di Santa Eulalia (con le 13 oche del chiostro).',
            tipologia: 'Storia',
            kmParziali: 1.0,
            durataMinuti: 75,
            query: 'Pont del Bisbe Carrer del Bisbe Barcelona',
            curiositaNerd: 'La leggenda metropolitana del Ponte del Bisbe vuole che chi incroci lo sguardo del teschio umano scolpito sotto l\'arco sia colpito da sfortuna, a meno che non attraversi la via camminando all\'indietro!'
          },
          {
            id: 'bc-3',
            orario: '11:30 - 12:30',
            nome: 'El Born, Basilica di Santa Maria del Mar & Street Food',
            descrizione: 'Proseguimento a est oltre Via Laietana tra i vicoli marinari di El Born. Sosta davanti alla severa facciata gotica della Basilica di Santa Maria del Mar (la "Cattedrale del Mare" del romanzo di Ildefonso Falcones) per scorgere sulle porte in bronzo le figure dei "bastaixos" (gli scaricatori di porto). Passeggiata tra Carrer de Montcada e Passeig del Born, con sosta per un\'empanada calda artigianale da passeggio (2-3€) presa al bancone.',
            tipologia: 'Storia',
            kmParziali: 0.9,
            durataMinuti: 60,
            query: 'Basilica de Santa Maria del Mar Barcelona',
            curiositaNerd: 'I bastaixos erano una corporazione medievale intoccabile: caricarono a spalla centinaia di migliaia di blocchi di pietra dalla montagna del Montjuïc per erigere la chiesa come omaggio del popolo contro l\'arroganza nobiliare.'
          },
          {
            id: 'bc-4',
            orario: '12:30 - 13:30',
            nome: 'Parc de la Ciutadella: Cascada Monumentale & Mammut di Pietra',
            descrizione: 'Ingresso diretto nell\'oasi verde del parco cittadino. Sosta davanti alla colossale Cascada Monumental coronata dalla quadriga dorata di Aurora (ai cui calcoli idraulici e grifoni d\'acqua collaborò Gaudí ancora studente) e foto cult davanti alla statua a grandezza naturale del Mammut lanoso in pietra del 1907 seminascosta tra gli alberi.',
            tipologia: 'Parco',
            kmParziali: 0.9,
            durataMinuti: 60,
            query: 'Cascada Monumental Parc de la Ciutadella Barcelona',
            curiositaNerd: 'Il mammut in cemento fu la prima statua preistorica installata nel 1907: l\'ambizioso progetto iniziale prevedeva un intero parco di dinosauri e megafauna a grandezza naturale, ma si esaurirono i fondi municipali!'
          },
          {
            id: 'bc-5',
            orario: '13:30 - 15:15',
            nome: 'Arc de Triomf & Triángulo Friki (Norma Comics, Gigamesh, Kaburi)',
            descrizione: 'Uscita lungo il viale alberato di Passeig de Lluís Companys sotto l\'Arc de Triomf neomoresco in mattoni rossi ed ingresso nel celebre distretto nerd "Triángulo Friki" (aperto con orario continuato di sabato!). Esplorazione di Norma Comics (2 piani, tempio pop vincitore dell\'Eisner Award con statue 1:1 e gadget), Gigamesh (la mecca fantasy/sci-fi che scoprì George R.R. Martin in Spagna), e gli showroom di giochi da tavolo, retrogaming e manga su Carrer de Bailèn.',
            tipologia: 'Nerd/Pop',
            kmParziali: 1.4,
            durataMinuti: 105,
            query: 'Norma Comics Passeig de Sant Joan Barcelona',
            curiositaNerd: 'Norma Comics fu il primo comic shop in Europa ad aggiudicarsi il prestigioso Will Eisner Spirit of Comics Retailer Award al San Diego Comic-Con: all\'interno custodisce statue life-size di Darth Vader, Batman e Alien.'
          },
          {
            id: 'bc-6',
            orario: '15:15 - 16:15',
            nome: 'Rientro Panoramico: Port Vell & Passerella Rambla del Mar',
            descrizione: 'Dal distretto nerd discesa verso sud costeggiando il Born lungo Passeig de Picasso fino a Pla de Palau e alla storica dogana (Aduana). Attraversamento scenografico della passerella in legno ondulato della Rambla del Mar sul porto antico tra yacht e gabbiani, sbucando direttamente ai piedi del Monument a Colom.',
            tipologia: 'Panorama',
            kmParziali: 1.8,
            durataMinuti: 60,
            query: 'Rambla de Mar Port Vell Barcelona',
            curiositaNerd: 'La passerella della Rambla del Mar ha una sezione centrale rotante di 40 metri che ruota orizzontalmente sull\'acqua per consentire l\'ingresso e l\'uscita dei velieri dal porto vecchio.'
          },
          {
            id: 'bc-7',
            orario: '16:15 - 17:00',
            nome: 'Rientro al Terminal Crociere Moll Adossat (Tutti a Bordo 17:15)',
            descrizione: 'Arrivo alla fermata del Cruise Bus T3 ai piedi della Statua di Colombo tra le 16:15 e le 16:25. Corsa di 10-12 minuti attraverso il ponte Porta d\'Europa e risalita sulla passerella della MSC Euribia entro le 16:45, con oltre 30 minuti di pieno cuscinetto sicurezza prima del Tutti a bordo (17:15).',
            tipologia: 'Ritorno',
            kmParziali: 0.0,
            durataMinuti: 45,
            query: 'Moll Adossat Terminal Creuers Barcelona',
            curiositaNerd: 'La MSC Euribia salpa alle 18:00 dal porto di Barcellona facendo rotta verso nord-est per la penultima tappa della crociera: Marsiglia.'
          }
        ]
      },
      {
        id: 'barcellona-sagrada',
        label: 'Con Sagrada Família',
        badge: 'Sagrada + Metro L2 • 7.8 km',
        portoTitolo: 'Barcellona (Centro, Triángulo Friki & Sagrada Família)',
        kmTotaliStimati: 7.8,
        infoLogisticaMolo: {
          nomeMolo: 'Moll Adossat (Terminal Creuers Barcelona)',
          collegamentoPortoCitta: 'Cruise Bus T3 (4.50€ A/R) + Metro L2 diretta Sagrada Família → Paral·lel (~3.12€/testa)',
          mezzoConsigliato: 'Cruise Bus T3 fino a Colom + rientro in Metro L2 (Viola) diretta senza cambi da Sagrada Família a Paral·lel',
          costoTransfer: '~7.60 € a persona totali (4.50€ Bus T3 A/R + ~3.12€ quota T-Familiar condivisa)',
          tempoTransferMinuti: 12,
          istruzioniDettagliate: 'Variante ottimizzata per includere la Sagrada Família senza rinunciare a Boqueria, Granja Viader, Barrio Gótico, Ciutadella e Triángulo Friki! All\'andata Cruise Bus T3 fino al Monument a Colom. Dal Triángulo Friki si prosegue dritti a nord lungo il viale alberato Passeig de Sant Joan fino alla Sagrada Família, con deviazione lungo Avinguda de Gaudí fino a Sant Pau. Alle 15:40 rientro super rapido in Metro Linea L2 (Viola) diretta da Sagrada Família a Paral·lel (9-11 min, zero cambi), 700m pianeggianti fino a Colom e Bus T3 per la nave entro le 16:45 (Tutti a bordo 17:15).',
          consiglioRisparmio: 'Alle macchinette TMB della metro Sagrada Família prendete 1 sola tessera condivisa T-Familiar da 8 corse (11.50€ + 1€ tessera ricaricabile = ~3.12€ a testa, valida multi-persona con 4 timbrature consecutive, e vi restano pure 4 corse extra di riserva!). In alternativa, 4 biglietti singoli costano ~2.65€ ciascuno. La visita esterna della Sagrada Família e la passeggiata su Avinguda de Gaudí fino a Sant Pau sono 100% gratuite.'
        },
        tappe: [
          {
            id: 'bcsf-0',
            orario: '08:45 - 09:15',
            nome: 'Sbarco Moll Adossat & Cruise Bus T3 fino a Monument a Colom',
            descrizione: 'Discesa dalla passerella della MSC Euribia e salita immediata sul Cruise Bus T3 (Portbus blu, 4.50€ A/R acquistabile a bordo in contanti o carta). Attraversamento del ponte mobile Porta d\'Europa fino al Monument a Colom, base di partenza e rientro della giornata.',
            tipologia: 'Logistica',
            kmParziali: 0.0,
            durataMinuti: 30,
            query: 'Moll Adossat Terminal Creuers Barcelona',
            curiositaNerd: 'Conservate bene il talloncino cartaceo A/R del Cruise Bus T3: vi servirà alle 16:15 alla base della Statua di Colombo per saltare la coda alla biglietteria del rientro.'
          },
          {
            id: 'bcsf-1',
            orario: '09:15 - 10:15',
            nome: 'La Rambla, Mercat de la Boqueria & Granja M. Viader (Churros & Cacaolat)',
            descrizione: 'Risalita della Rambla con ingresso nei corridoi colorati del Mercat de la Boqueria per un cono al volo di Jamón Ibérico o frutta fresca (3-4€) e sosta alla storica Granja M. Viader (dal 1870, aperta il sabato solo fino alle 13:30!) per churros caldi appena fritti con cioccolata densa catalana o il celebre Cacaolat originale.',
            tipologia: 'Cibo Cult',
            kmParziali: 1.1,
            durataMinuti: 60,
            query: 'Granja M. Viader Carrer d en Xucla Barcelona',
            curiositaNerd: 'Passare da Viader di mattina è una mossa geniale: di sabato chiude tassativamente alle 13:30, mentre alle 9:30 trovate churros bollenti e il banco storico ancora libero dalla folla.'
          },
          {
            id: 'bcsf-2',
            orario: '10:15 - 11:15',
            nome: 'Barrio Gótico: Plaça Reial, Carrer del Bisbe & Cattedrale',
            descrizione: 'Attraversamento della Rambla nel cuore medievale gotico: Plaça Reial con i primi lampioni disegnati da un giovane Gaudí, il celebre Ponte neogotico di Carrer del Bisbe con il teschio scolpito, la piazzetta silenziosa di Sant Felip Neri e la maestosa facciata della Cattedrale di Barcellona.',
            tipologia: 'Storia',
            kmParziali: 0.7,
            durataMinuti: 60,
            query: 'Pont del Bisbe Carrer del Bisbe Barcelona',
            curiositaNerd: 'Secondo la leggenda urbana del Carrer del Bisbe, incrociare lo sguardo del teschio trafitto dal pugnale porta sfortuna a meno di attraversare l\'arco camminando all\'indietro!'
          },
          {
            id: 'bcsf-3',
            orario: '11:15 - 12:00',
            nome: 'El Born & Basilica di Santa Maria del Mar',
            descrizione: 'Passeggiata tra i vicoli artigianali e marinari di El Born fino alla severa e affascinante Basilica di Santa Maria del Mar (la "Cattedrale del Mare"), osservando sulle porte bronzee le sculture dedicate ai "bastaixos" che trasportarono le pietre a spalla. Ottima zona per prendere al volo un\'empanada o un bocadillo caldo da sgranocchiare.',
            tipologia: 'Storia',
            kmParziali: 0.8,
            durataMinuti: 45,
            query: 'Basilica de Santa Maria del Mar Barcelona',
            curiositaNerd: 'Santa Maria del Mar fu costruita in soli 54 anni (record assoluto per il gotico medievale) grazie al finanziamento popolare di mercanti, pescatori e scaricatori del porto.'
          },
          {
            id: 'bcsf-4',
            orario: '12:00 - 12:45',
            nome: 'Parc de la Ciutadella: Cascada Monumental & Mammut di Pietra',
            descrizione: 'Attraversamento dell\'oasi verde centrale di Barcellona con sosta fotografica davanti alla monumentale Cascada con la quadriga dorata (a cui collaborò Gaudí da studente) e alla statua cult a grandezza naturale del Mammut lanoso del 1907.',
            tipologia: 'Parco',
            kmParziali: 0.8,
            durataMinuti: 45,
            query: 'Cascada Monumental Parc de la Ciutadella Barcelona',
            curiositaNerd: 'Il Mammut del 1907 doveva essere la prima statua di un intero parco giurassico in cemento: finiti i fondi comunali, rimase l\'unico sopravvissuto preistorico nel parco!'
          },
          {
            id: 'bcsf-5',
            orario: '12:45 - 14:15',
            nome: 'Arc de Triomf & Triángulo Friki (Norma Còmics, Norma 13 & Gigamesh)',
            descrizione: 'Passaggio sotto il maestoso Arc de Triomf in mattoni rossi e ingresso nel celebre distretto nerd "Triángulo Friki" su Passeig de Sant Joan (aperto con orario continuato il sabato): tappa obbligatoria da Norma Còmics (2 piani, premiato all\'Eisner Award), Norma Comics 13 Merchandising per figure/gadget e la leggendaria libreria fantasy/sci-fi Gigamesh. Lungo Passeig de Sant Joan ottimi locali rapidi per un bocadillo o ramen al volo.',
            tipologia: 'Nerd/Pop',
            kmParziali: 1.0,
            durataMinuti: 90,
            query: 'Norma Comics Passeig de Sant Joan Barcelona',
            curiositaNerd: 'Passeig de Sant Joan è uno dei viali pedonali più belli d\'Europa e funge da ponte naturale perfetto: collega direttamente il tempio nerd di Norma Còmics alla Sagrada Família!'
          },
          {
            id: 'bcsf-6',
            orario: '14:15 - 15:40',
            nome: 'Sagrada Família (Esterno) & Avinguda de Gaudí',
            descrizione: 'Passeggiata lungo Passeig de Sant Joan fino alla Sagrada Família. Visita esterna gratuita delle due facciate principali (Natività e Passione) con sosta fotografica allo stagno di Plaça de Gaudí. Col tempo guadagnato non entrando nella basilica, breve deviazione lungo il viale pedonale Avinguda de Gaudí fino all\'ingresso monumentale del Recinte Modernista de Sant Pau (complesso Art Nouveau simile a una cittadella fantasy), prima di tornare alla stazione metro Sagrada Família (Linea L2).',
            tipologia: 'Architettura/Cult',
            kmParziali: 2.2,
            durataMinuti: 85,
            query: 'Basilica de la Sagrada Familia Barcelona',
            curiositaNerd: 'La Facciata della Passione (scolpita da Josep Maria Subirachs) ha uno stile spigoloso e geometrico che ha ispirato artisti sci-fi, incluso il design degli Stormtrooper di Star Wars secondo diverse leggende di settore.'
          },
          {
            id: 'bcsf-7',
            orario: '15:40 - 16:15',
            nome: 'Metro Linea L2 (Viola) Sagrada Família → Paral·lel & Rientro a Colom',
            descrizione: 'Ingresso nella stazione metro Sagrada Família (Linea L2 Viola direzione Paral·lel): corsa diretta velocissima di circa 9-11 minuti senza alcun cambio! Consigliato 1 biglietto condiviso T-Familiar da 8 corse (11.50€ + 1€ tessera = ~3.12€ a testa, multi-persona con 4 passaggi consecutivi). Usciti a Paral·lel, passeggiata finale pianeggiante di 700m (9 min) lungo Av. del Paral·lel fino alla fermata del Bus T3 al Monument a Colom.',
            tipologia: 'Logistica',
            kmParziali: 0.7,
            durataMinuti: 35,
            query: 'Metro Paral·lel Monument a Colom Barcelona',
            curiositaNerd: 'La Linea L2 Viola è la scorciatoia perfetta per i crocieristi: evita completamente i cambi di Passeig de Gràcia o Catalunya e vi scarica a soli 700 metri in piano dalla Statua di Colombo.'
          },
          {
            id: 'bcsf-8',
            orario: '16:15 - 17:00',
            nome: 'Cruise Bus T3 → Terminal Moll Adossat (Tutti a Bordo 17:15)',
            descrizione: 'Salita sul Cruise Bus T3 alla base del Monument a Colom tra le 16:15 e le 16:25 usando il talloncino del ritorno. Attraversamento del ponte Porta d\'Europa (10-12 min) e risalita a bordo della MSC Euribia entro le 16:45-16:55, in pieno margine di sicurezza prima del Tutti a bordo tassativo delle 17:15.',
            tipologia: 'Ritorno',
            kmParziali: 0.0,
            durataMinuti: 45,
            query: 'Moll Adossat Terminal Creuers Barcelona',
            curiositaNerd: 'Con ~7.8 km reali a piedi (grazie alla Metro L2 al rientro) avete unito il centro medievale, il Triángulo Friki, la Sagrada Família e Avinguda de Gaudí rientrando in nave senza stress!'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 5. MARSIGLIA (Giorno 7 - 29 Nov 2026)
  // ==========================================
  {
    id: 'marsiglia',
    giornoNumero: 7,
    dataGiorno: 'Domenica 29 nov 2026',
    porto: 'Marsiglia (Notre-Dame, Ferry-Boat, Panier & MUCEM)',
    citta: 'Marsiglia',
    paese: 'Francia',
    bandiera: '🇫🇷',
    orarioAttracco: '09:00',
    orarioPartenza: '18:00',
    orarioSbarcoStimato: '09:45',
    orarioTuttiABordo: '17:15',
    durataFinestraOre: '7h 30m reali a terra',
    kmTotaliStimati: 7.3,
    infoLogisticaMolo: {
      nomeMolo: 'Môle Léon Gourret (Terminal Croisières MPCT)',
      collegamentoPortoCitta: 'Navette Portuaire Gratuite fino a Place de la Joliette + Bus 60 / Metro M2',
      mezzoConsigliato: 'Navetta Portuale Gratuita + Bus 60 per salire a Notre-Dame + Ferry-Boat (0.50€)',
      costoTransfer: '~2.20 € a testa (Navetta gratuita + Bus 60 ~1.70€ + Ferry-Boat 0.50€; eventuale Bolt di scorta ~4€ a testa)',
      tempoTransferMinuti: 15,
      istruzioniDettagliate: 'All\'uscita del terminal crociere Léon Gourret seguite la linea verde dipinta a terra per 250m fino alla fermata della Navette Portuaire Gratuite per Place de la Joliette. Da lì raggiungete il Vieux-Port (a piedi o Metro M2) e prendete il Bus RTM linea 60 per salire senza fatica fino a Notre-Dame de la Garde (pagamento a bordo con carta contactless ~1.70€). Poi solo discesa panoramica a piedi fino a Saint-Victor per Le Four des Navettes prima della chiusura domenicale delle 13:00, traversata del porto con il mitico Ferry-Boat (0.50€) e chiusura ad anello tra Le Panier, passerelle MUCEM e Cattedrale de la Major, a soli 7 minuti a piedi da La Joliette!',
      consiglioRisparmio: 'La domenica pomeriggio con navi da oltre 6.000 passeggeri la navetta gratuita del porto a La Joliette può essere affollata. Arrivate a Place de la Joliette per le 15:30-15:45; se la coda è troppo lunga, aprite l\'app Bolt (una corsa costa circa 15-18€ totali in 4 e vi porta direttamente sotto la scaletta della nave in 10 minuti).'
    },
    sostaGolosaTop: {
      locale: 'Le Four des Navettes (136 Rue Sainte, dal 1781) & Panisses al Porto',
      specialita: 'Navettes dorate all\'aroma di zagara (fiori d\'arancio) & Cartoccio di Panisses calde fritte',
      descrizione: 'Esperienza culinaria provenzale leggendaria: sosta tra le 12:00 e le 12:45 all\'antico Le Four des Navettes (il più antico forno di Marsiglia dal 1781, aperto la domenica fino alle 13:00!) per le autentiche navettes a forma di barchetta cotte nel forno a legna del XVIII secolo. Sul Vieux-Port, pranzo al volo con un cartoccio fumante di Panisses (frittelle dorate di farina di ceci con sale, 2-4€) e un trancio di pizza marsigliese al taglio.',
      costoIndicativo: '4.00 € - 7.00 € a persona',
      indirizzo: '136 Rue Sainte (Four des Navettes) & Quai du Port / Quai de Rive Neuve, Marseille',
      curiosita: 'Le Panisses arrivarono a Marsiglia con i lavoratori portuali liguri e provenzali nell\'Ottocento: vengono tagliate a dischi o bastoncini e tuffate nell\'olio bollente, croccanti fuori e vellutate dentro.'
    },
    tappe: [
      {
        id: 'mr-0',
        orario: '09:45 - 10:25',
        nome: 'Sbarco Nave: Terminal Léon Gourret & Navetta Gratuita',
        descrizione: 'Discesa dalla passerella della MSC Euribia. Segui la striscia verde dipinta a terra per 250m fino alla fermata della Navette Portuaire Gratuite. Corsa di 15 minuti fino a Place de la Joliette.',
        tipologia: 'Logistica',
        kmParziali: 0.0,
        durataMinuti: 40,
        query: 'Terminal Croisieres Marseille Provence Mole Leon Gourret',
        curiositaNerd: 'Il Môle Léon Gourret è uno dei complessi marittimi più grandi del Mediterraneo: dalla passerella si scorge il profilo calcareo bianco delle famose falesie provenzali.'
      },
      {
        id: 'mr-1',
        orario: '10:25 - 11:00',
        nome: 'Vieux-Port, L\'Ombrière a specchio & Bus 60',
        descrizione: 'Da Place de la Joliette camminata verso il Vieux-Port (o Metro M2 fino a Vieux-Port). Sosta fotografica sotto L\'Ombrière di Norman Foster (la pensilina in acciaio super-lucidato che riflette capovolti barche e passanti). Da Quai des Belges salita sul Bus RTM linea 60 (biglietto ~1.70€ pagabile a bordo contactless) per raggiungere comodamente la vetta della collina senza spaccarsi le gambe.',
        tipologia: 'Panorama',
        kmParziali: 1.2,
        durataMinuti: 35,
        query: 'L Ombriere de Norman Foster Quai des Belges Marseille',
        curiositaNerd: 'L\'Ombrière di Norman Foster fu inaugurata per Marsiglia Capitale della Cultura 2013: posizionandosi al centro dello specchio metallico sembra di camminare a mezz\'aria a testa in giù sopra l\'acqua del porto.'
      },
      {
        id: 'mr-2',
        orario: '11:00 - 12:00',
        nome: 'Notre-Dame de la Garde (La Bonne Mère) & Belvedere 360°',
        descrizione: 'Arrivo in cima allo sperone calcareo a 150m di quota senza fatica. Ingresso libero alla monumentale basilica romano-bizantina con cupole a mosaico dorato ed ex-voto di marinai e modellini di barche appesi alle volte. Panorama a 360° sul golfo, la città e le isole.',
        tipologia: 'Panorama',
        kmParziali: 0.5,
        durataMinuti: 60,
        query: 'Basilique Notre Dame de la Garde Marseille',
        curiositaNerd: 'Dal belvedere sud-ovest si riconosce la rocca fortificata di Château d\'If, l\'inaccessibile prigione di pietra da cui evade Edmond Dantès ne "Il Conte di Montecristo" di Alexandre Dumas.'
      },
      {
        id: 'mr-3',
        orario: '12:00 - 12:45',
        nome: 'Discesa a Saint-Victor & Le Four des Navettes (dal 1781)',
        descrizione: 'Discesa panoramica e rilassante a piedi lungo la collina (soli 15-20 minuti, tutta in pendenza favorevole) fino all\'Abbazia fortezza di Saint-Victor e a Le Four des Navettes (136 Rue Sainte), aperto la domenica mattina fino alle 13:00! Sosta per un sacchetto delle storiche navettes calde cotte nel forno a legna originale del 1781 con profumo di fiori d\'arancio.',
        tipologia: 'Cibo Cult',
        kmParziali: 1.3,
        durataMinuti: 45,
        query: 'Le Four des Navettes 136 Rue Sainte Marseille',
        curiositaNerd: 'Il forno in pietra refrattaria del Four des Navettes è in funzione ininterrottamente dal regno di Luigi XVI: la forma a barchetta rievoca la leggenda della barca senza vele né remi con cui le Tre Marie approdarono in Provenza.'
      },
      {
        id: 'mr-4',
        orario: '12:45 - 13:30',
        nome: 'Ferry-Boat Storico & Street Food (Panisses calde & Pizza)',
        descrizione: 'Discesa a Quai de Rive Neuve e imbarco sul leggendario Ferry-Boat (0.50€ a testa), la rotta navale di linea più breve al mondo (283m) resa celebre da Marcel Pagnol, per attraversare lo specchio d\'acqua fino al Municipio (Hôtel de Ville). Sosta street food al porto con un cartoccio di Panisses fritte calde al sale (farina di ceci, 2-4€) e un trancio di pizza al taglio.',
        tipologia: 'Cibo Cult',
        kmParziali: 0.7,
        durataMinuti: 45,
        query: 'Ferry Boat Quai des Belges Marseille',
        curiositaNerd: 'Il Ferry-Boat del Vieux-Port attraversa il porto dal 1880 ed è una vera icona pop marsigliese: evita di percorrere a piedi l\'intero perimetro a U del porto tagliando direttamente via mare in 3 minuti.'
      },
      {
        id: 'mr-5',
        orario: '13:30 - 14:30',
        nome: 'Quartiere Le Panier & Street Art della Vieille Charité',
        descrizione: 'Salita tra i vicoli arroccati e le scalinate colorate di Le Panier, il nucleo abitato più antico di Francia (l\'antica Massalia fondata dai greci nel 600 a.C.). Esplorazione della street art, piazzette ombreggiate da platani, botteghe del vero Sapone di Marsiglia e la monumentale corte barocca della Vieille Charité.',
        tipologia: 'Nerd/Pop',
        kmParziali: 1.2,
        durataMinuti: 60,
        query: 'Le Panier Marseille Centre de la Vieille Charite',
        curiositaNerd: 'Le Panier ha ispirato il quartiere fittizio "Le Mistral" della celebre serie TV cult francese "Plus belle la vie": i suoi vicoli conservano un fascino pittoresco a metà tra Provenza e Napoli.'
      },
      {
        id: 'mr-6',
        orario: '14:30 - 15:30',
        nome: 'Passerelle Sospese MUCEM, Fort Saint-Jean & Cathédrale de la Major',
        descrizione: 'Dal Panier attraversamento gratuito della spettacolare passerella aerea pedonale in cemento sospesa sopra il mare verso Fort Saint-Jean. Passeggiata sul tetto panoramico traforato del MUCEM a filo d\'acqua e passaggio davanti alle colossali cupole a fasce bicolori della Cathédrale de la Major.',
        tipologia: 'Panorama',
        kmParziali: 1.4,
        durataMinuti: 60,
        query: 'MUCEM Fort Saint Jean Marseille',
        curiositaNerd: 'La passerella pedonale aerea collega la seicentesca fortezza militare di Fort Saint-Jean con l\'avveniristico museo MUCEM senza toccare terra: un ponte d\'acciaio e calcestruzzo ad altissima densità che sembra fluttuare nel vuoto sul mare.'
      },
      {
        id: 'mr-7',
        orario: '15:30 - 16:30',
        nome: 'Rientro a Place de la Joliette & Navetta Portuale (o Bolt)',
        descrizione: 'Dalla Cattedrale de la Major camminata di appena 7 minuti (600m) fino a Place de la Joliette. Posizionamento per la Navette Gratuite con largo anticipo rispetto al Tutti a Bordo. Se la coda dei crocieristi è troppo congestionata, apertura rapida dell\'app Bolt (o taxi in loco) per raggiungere la banchina della nave in 10 minuti con ~15€ totali in 4.',
        tipologia: 'Logistica',
        kmParziali: 0.7,
        durataMinuti: 60,
        query: 'Place de la Joliette Marseille',
        curiositaNerd: 'Place de la Joliette era nel XIX secolo il punto nevralgico degli scambi commerciali con l\'Indocina e il Nordafrica, dominata dai monumentali magazzini in pietra dei "Docks de Marseille".'
      },
      {
        id: 'mr-8',
        orario: '16:30 - 17:15',
        nome: 'Rientro al Terminal Croisières Môle Léon Gourret (Tutti a Bordo 17:15)',
        descrizione: 'Arrivo confortevole sotto la passerella della MSC Euribia entro le 16:45, con oltre mezz\'ora di pieno cuscinetto sicurezza prima del Tutti a bordo (17:15). Pronti a godersi dal ponte esterno la partenza della nave alle 18:00 per la traversata conclusiva verso Genova.',
        tipologia: 'Ritorno',
        kmParziali: 0.0,
        durataMinuti: 45,
        query: 'Terminal Croisieres Marseille Provence Mole Leon Gourret',
        curiositaNerd: 'Ultima partenza della crociera: la MSC Euribia naviga di notte lungo la Costa Azzurra e la Riviera di Ponente per attraccare a Genova lunedì 30 novembre alle ore 09:00.'
      }
    ]
  }
];
