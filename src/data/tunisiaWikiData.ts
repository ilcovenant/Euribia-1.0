/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WikiArticle } from '../types/itinerary';

export interface StreetPhrase {
  arabo: string;
  traslitterazione: string;
  italiano: string;
  francese: string;
  contesto: 'Saluti' | 'Trattativa' | 'Direzioni' | 'Emergenza' | 'Cibo';
}

export const TUNISIA_PHRASEBOOK: StreetPhrase[] = [
  {
    arabo: 'السلام عليكم',
    traslitterazione: 'As-salāmu ʿalaykum (risposta: Wa ʿalaykum as-salām)',
    italiano: 'La pace sia con te (Buongiorno / Salve formale e rispettoso)',
    francese: 'Bonjour / Que la paix soit sur vous',
    contesto: 'Saluti'
  },
  {
    arabo: 'صباح الخير / عسلامة',
    traslitterazione: 'Sbāh el-khir / ʿAslama',
    italiano: 'Buongiorno / Ciao (usatissimo in Tunisia)',
    francese: 'Salut / Bonjour informel',
    contesto: 'Saluti'
  },
  {
    arabo: 'بقدّاش هذا؟',
    traslitterazione: 'Bqaddēsh hādha?',
    italiano: 'Quanto costa questo? (la frase regina per lo street food e i mercati)',
    francese: 'Combien ça coûte ?',
    contesto: 'Trattativa'
  },
  {
    arabo: 'لا، شكراً',
    traslitterazione: 'Lā, shukran',
    italiano: 'No, grazie (deciso ma educato, allontana i venditori insistenti)',
    francese: 'Non, merci',
    contesto: 'Trattativa'
  },
  {
    arabo: 'عيّشك / من فضلك',
    traslitterazione: 'ʿAyshék / Min fadlek',
    italiano: 'Grazie mille / Per favore',
    francese: 'Merci beaucoup / S\'il vous plaît',
    contesto: 'Saluti'
  },
  {
    arabo: 'وين محطة التي جي إم؟',
    traslitterazione: 'Wīn mahattet el-TGM?',
    italiano: 'Dov\'è la stazione del treno TGM?',
    francese: 'Où est la gare TGM ?',
    contesto: 'Direzioni'
  },
  {
    arabo: 'محطة حلق الوادي القديمة',
    traslitterazione: 'Mahattet Halq al-Wadi al-Qadima (Gare La Goulette Vieille)',
    italiano: 'Stazione ferroviaria La Goulette Vieille (quella vicina al molo a 750m)',
    francese: 'Gare de la Goulette Vieille',
    contesto: 'Direzioni'
  },
  {
    arabo: 'ميناء حلق الوادي للسفن السياحية',
    traslitterazione: 'Mina Halq al-Wadi (Goulette Cruise Village)',
    italiano: 'Molo navi da crociera La Goletta (da mostrare ai tassisti per il rientro)',
    francese: 'Terminal Croisières Goulette Village',
    contesto: 'Direzioni'
  },
  {
    arabo: 'الحساب، يرحم والديك',
    traslitterazione: 'El-hissēb, yarham wāldīk (o "L\'addition s\'il vous plaît")',
    italiano: 'Il conto, che Dio benedica i tuoi genitori (formula di grande cortesia)',
    francese: 'L\'addition, s\'il vous plaît',
    contesto: 'Cibo'
  },
  {
    arabo: 'واحد، زوز، ثلاثة، أربعة، خمسة',
    traslitterazione: 'Wāhad (1), Zūz (2), Tlātha (3), Arbʿa (4), Khamsa (5)',
    italiano: 'Numeri 1, 2, 3, 4, 5 (per ordinare 4 bambalouni: "Arb\'a bambalouni")',
    francese: 'Un, Deux, Trois, Quatre, Cinq',
    contesto: 'Cibo'
  },
  {
    arabo: 'نحب كسكروت شباتي بلا هريسة / مع هريسة',
    traslitterazione: 'Nhib caskroute chapati ble harissa / m\'aa harissa',
    italiano: 'Vorrei un panino chapati senza harissa (non piccante) / con harissa',
    francese: 'Un chapati sans harissa / avec harissa',
    contesto: 'Cibo'
  },
  {
    arabo: 'بالسلامة',
    traslitterazione: 'Bes-slēma',
    italiano: 'Arrivederci / Buona giornata',
    francese: 'Au revoir',
    contesto: 'Saluti'
  }
];

export const TUNISIA_CURRENCY = {
  eurToTnd: 3.35, // 1 EUR = 3.35 TND
  tndToEur: 0.2985, // 1 TND ≈ 0.30 EUR
  quickPresets: [
    { tnd: 1.20, eur: 0.36, label: '1 Biglietto 1ª Classe TGM' },
    { tnd: 1.50, eur: 0.45, label: '1 Bambalouni caldo zuccherato' },
    { tnd: 4.80, eur: 1.43, label: '4 Biglietti TGM per il gruppo' },
    { tnd: 5.00, eur: 1.49, label: 'Thé aux Pignons al Café des Nattes' },
    { tnd: 6.00, eur: 1.79, label: 'Chapati tunisien farcito caldo' },
    { tnd: 12.00, eur: 3.58, label: 'Pass archeologico Porti Punici + Tophet' },
    { tnd: 15.00, eur: 4.48, label: 'Corsa Bolt in auto per 4 persone' },
    { tnd: 30.00, eur: 8.95, label: 'Fritto di paranza abbondante sul molo' }
  ]
};

export const TUNISIA_WIKI_ARTICLES: Record<string, WikiArticle> = {
  'sidi-bou-said': {
    slug: 'sidi-bou-said',
    titolo: 'Sidi Bou Saïd (سيدي بو سعيد)',
    sottotitolo: 'Il balcone sul Golfo di Tunisi, l\'eredità andalusa e la nascita dell\'astrattismo moderno',
    categoria: 'Storia, Arte & Architettura',
    periodoStorico: 'XII sec. d.C. (santuario sufi) – XX sec. (folgorazione di Paul Klee)',
    letturaMinuti: 4,
    sommario: 'Arroccato a picco sul mare sopra il Golfo di Tunisi e le rovine dell\'antica Cartagine, Sidi Bou Saïd è universalmente celebre per l\'armonia accecante del bianco a calce e del blu ceruleo delle sue imposte, le gabbie di legno moucharabieh e le bouganville fucsia. Da rifugio di mistici sufi nel Medioevo, è divenuto all\'inizio del Novecento la culla spirituale dell\'arte moderna europea, attirando maestri come Paul Klee, August Macke, Simone de Beauvoir e André Gide.',
    sezioni: [
      {
        titolo: 'Le Origini Sufi e la Tomba di Abu Sa\'id al-Baji',
        contenuto: 'Nel XII secolo il teologo e maestro sufi Abu Sa\'id Khalaf ibn Yahya al-Tamimi al-Baji si ritirò su questa collina solitaria per meditare e fare da sentinella spirituale e militare (ribat) contro le incursioni marittime. Dopo la sua morte nel 1231, il villaggio prese il suo nome ("Signor Bu Sa\'id"). Ancora oggi la sua zawiya (mausoleo) custodisce le sue spoglie e attira pellegrini da tutto il Maghreb.'
      },
      {
        titolo: 'Il Barone d\'Erlanger e il Decreto Storico del 1915',
        contenuto: 'L\'aspetto estetico unico del borgo non è casuale: nel 1912 il barone franco-britannico Rodolphe d\'Erlanger, musicologo e pittore, vi costruì il favoloso palazzo Ennejma Ezzahra. Fu lui a promuovere il rivoluzionario decreto del 28 agosto 1915 firmato dal Bey di Tunisi: Sidi Bou Saïd divenne il primo sito protetto al mondo per legge contro qualsiasi alterazione architettonica. Da allora vige l\'obbligo assoluto di calce bianca pura per le facciate e tonalità di blu cobalto/ceruleo per porte, finestre e grate in ferro battuto, con il divieto tassativo di insegne moderne o cavi a vista.'
      },
      {
        titolo: 'Il Viaggio in Tunisia di Paul Klee (Aprile 1914)',
        contenuto: 'Nel mese di aprile del 1914 i pittori d\'avanguardia Paul Klee, August Macke e Louis Moilliet intrapresero un leggendario viaggio studio in Tunisia. Giunti a Sidi Bou Saïd, la purezza della luce mediterranea e il contrasto tra l\'azzurro del mare e le geometrie cubiche delle case provocarono in Klee una vera epifania artistica. Nel suo celebre diario scrisse: "Il colore mi possiede. Non ho bisogno di tentare di afferrarlo. Mi possiede per sempre, lo so. Questo è il senso del momento felice: io e il colore siamo una cosa sola. Sono un pittore". Quell\'istante segnò l\'atto di nascita dell\'astrattismo cromatico contemporaneo.'
      },
      {
        titolo: 'L\'Enigma dei Tripli Battenti Sonori',
        contenuto: 'Passeggiando lungo Rue Hédi Zarrouk, osservate attentamente le monumentali porte chiodate di legno di cedro. Al centro e ai lati presentano spesso tre battenti ad anello (martelli di ferro) posizionati ad altezze diverse. Non sono decorativi: ciascuno produce un suono con un timbro metallico differente! L\'anello in alto a sinistra emetteva un rimbombo grave (per gli uomini), quello in basso a destra un rintocco argentino e acuto (per le donne), e il terzo un suono intermedio (per i bambini o i mendicanti). In questo modo le donne all\'interno della casa sapevano chi stava bussando senza doversi affacciare o togliere il velo prima di aprire.'
      },
      {
        titolo: 'Il Belvedere di Ras Katarjamah e il Faro',
        contenuto: 'Salendo fino alla vetta della collina si giunge al faro e al belvedere di Ras Katarjamah. La vista spazia a 360 gradi su tutto il Golfo di Cartagine, la sagoma montuosa del Boukornine (l\'antica montagna a due corna sacra a Baal) e le acque turchesi dove tremila anni fa navigavano le navi di Annibale e della regina Didone.'
      }
    ],
    curiositaInedite: [
      'Il famoso "Café des Délices", reso celebre in Francia dalla canzone di Patrick Bruel del 1999, è in realtà un\'invenzione turistica recente degli anni \'60; il vero ritrovo storico centenario degli abitanti e dei filosofi è il Café des Nattes in cima alla scalinata.',
      'Sidi Bou Saïd ha ospitato a lungo Michel Foucault, che proprio qui visse tra il 1966 e il 1968 mentre completava il saggio filosofico fondamentale "L\'archeologia del sapere".',
      'Le piante di gelsomino (machmoum) che i venditori offrono per strada sono confezionate a mano ogni mattina infilando i singoli boccioli ancora chiusi su steli di giunco: si aprono al calore del sole profumando per ore.'
    ]
  },

  'cafe-des-nattes': {
    slug: 'cafe-des-nattes',
    titolo: 'Café des Nattes (Kahwet el-Alia)',
    sottotitolo: 'Il tempio del tè alla menta e delle stuoie berbere in cima alla scalinata monumentale',
    categoria: 'Caffè Storico & Costume Tradizionale',
    periodoStorico: 'Fine XVIII secolo – Presente',
    letturaMinuti: 3,
    sommario: 'Arroccato al culmine di una monumentale gradinata in pietra che domina la piazza principale di Sidi Bou Saïd, il Café des Nattes (chiamato in arabo Kahwet el-Alia, "il caffè alto") è il locale tradizionale più celebre dell\'intera Tunisia. Entrare qui significa immergersi in un\'atmosfera sospesa nell\'Ottocento, tra colonne tortili dipinte di verde e rosso ottomano, stuoie di giunco intrecciate e l\'aroma inebriante di tè verde, menta nanah e fiori d\'arancio.',
    sezioni: [
      {
        titolo: 'La Tradizione delle Nattes (Stuoie di Giunco)',
        contenuto: 'Il nome francese del caffè deriva dalle "nattes", le grandi stuoie tradizionali in fibra di giunco naturale intrecciate a mano che ricoprono i divani in muratura rialzati lungo le pareti. Secondo il codice di cortesia tradizionale arabo, gli avventori si tolgono le scarpe prima di salire sulle piattaforme, sedendosi a gambe incrociate per fumare la chicha (narghilè al tabacco m\'assel alla mela) o sorseggiare il tè in tutta calma.'
      },
      {
        titolo: 'Il Segreto del Thé aux Pignons (Tè con Pinoli Tostati)',
        contenuto: 'La specialità regina del Café des Nattes è il "Thé aux pignons": una miscela intensa di tè verde Gunpowder, bollito lentamente con rametti freschi di menta nanah selvatica e zucchero, servito caldissimo in bicchierini di vetro sagomati e sormontato da una generosa manciata di pinoli mediterranei tostati galleggianti. I pinoli rilasciano oli essenziali resinosi che ammorbidiscono l\'astringenza del tè; vengono consumati alla fine con un cucchiaino o masticati insieme a ogni sorso. Il costo si aggira attorno ai 4-5 Dinari (~1.50€), una frazione dei prezzi gonfiati dei locali lussuosi della costa.'
      },
      {
        titolo: 'Il Ritrovo dei Bohemien: Klee, Gide e Foucault',
        contenuto: 'Nel 1914 Paul Klee immortalò la gradinata e la facciata bianca del caffè in uno dei suoi più celebri acquerelli, affascinato dal gioco di ombre dei tendoni e dalla quiete contemplativa dei clienti seduti sui gradini. Prima di lui lo scrittore André Gide vi trascorse pomeriggi interi ascoltando i suonatori di liuto (oud) e malouf andaluso. Più tardi, tra il 1966 e il 1968, il filosofo Michel Foucault vi si rifugiava per scrivere al riparo dal trambusto universitario di Tunisi.'
      }
    ],
    curiositaInedite: [
      'Il proprietario originario era legato alla confraternita mistica della vicina Zawiya di Sidi Bou Saïd: per secoli il caffè serviva come luogo di sosta per i pellegrini che salivano al santuario.',
      'A differenza della maggior parte dei caffè moderni tunisini, qui i camerieri continuano a preparare il caffè con l\'antico cezve in rame ottomano, aromatizzato a richiesta con gocce di zahar (distillato puro di petali di zagare e fiori d\'arancio amaro).',
      'Il bambalouni fritto acquistato alla bottega all\'angolo della scalinata può essere portato e mangiato tranquillamente al tavolo del caffè accompagnandolo con il tè: è una consuetudine locale amata e rispettata da tutti!'
    ]
  },

  'cothon-cartagine': {
    slug: 'cothon-cartagine',
    titolo: 'Cothon di Cartagine & Isola dell\'Ammiragliato',
    sottotitolo: 'Il porto militare segreto dei Fenici: 220 navi da guerra invisibili dal mare aperto',
    categoria: 'Archeologia Navale & Storia Antica',
    periodoStorico: 'IV – II secolo a.C. (Carthago Punica)',
    letturaMinuti: 4,
    sommario: 'Il Cothon cartaginese rappresenta il vertice insuperato dell\'ingegneria idraulica e militare navale del mondo antico. Costituito da due bacini artificiali collegati tra loro (un bacino mercantile rettangolare esterno e un bacino militare circolare interno con un\'isola centrale artificiale), permetteva alla superpotenza punica di armare, riparare e varare oltre 200 navi da guerra in totale segretezza, al riparo da qualsiasi spia o flotta nemica.',
    sezioni: [
      {
        titolo: 'Una Fortezza Idraulica a Prova di Spia',
        contenuto: 'Descritto minutamente dallo storico greco Appiano di Alessandria, il Cothon era un complesso ingegneristico prodigioso. L\'ingresso dal mare era largo appena 21 metri e poteva essere chiuso ermeticamente da massicce catene di ferro tirate tra due torri fortificate. Chiunque entrasse dall\'esterno approdava nel bacino rettangolare commerciale. Il secondo bacino, riservato esclusivamente alla marina militare punica, era accessibile solo attraverso uno stretto canale interno: era circondato da mura altissime e schermato da doppi palazzi lignei, in modo che nessun marinaio o mercante straniero potesse vedere quante navi da guerra vi fossero ormeggiate o in costruzione.'
      },
      {
        titolo: 'L\'Isola dell\'Ammiragliato e la Torre a 360 Gradi',
        contenuto: 'Al centro esatto del bacino militare circolare sorgeva un\'isola artificiale (l\'Isola dell\'Ammiragliato). Su di essa svettava la residenza e la torre di vedetta del supremo comandante navale fenicio (il sufeta o l\'ammiraglio). Dalla cima della torre, l\'ammiraglio godeva di una visuale a 360 gradi: poteva guardare verso l\'interno sorvegliando simultaneamente tutti i cantieri del bacino circolare e contemporaneamente scrutare l\'orizzonte del Mediterraneo oltre le mura della città per avvistare vele sospette, impartendo ordini tramite trombe di bronzo e segnali di fumo.'
      },
      {
        titolo: 'Le 220 Rampe di Varo per Triremi e Quinqueremi',
        contenuto: 'Sia lungo il perimetro dell\'isola centrale che lungo l\'intero anello costiero del bacino circolare correvano 220 banchine a scivolo inclinato coperte da tettoie monumentali sorrette da eleganti colonne ioniche di pietra. Ciascuna rampa poteva accogliere una trireme o una micidiale quinquereme da guerra cartaginese lunga fino a 35 metri. Le navi venivano tirate a secco su rulli di legno per mantenerne gli scafi in legno di cedro perfettamente asciutti e liberi da alghe e molluschi, pronte a scivolare in mare in pochi secondi in caso di allarme generale.'
      },
      {
        titolo: 'L\'Assedio Romano del 146 a.C. e la Diga di Scipione',
        contenuto: 'Durante la Terza Guerra Punica, il console romano Scipione Emiliano capì che Cartagine non sarebbe mai caduta finché il porto militare fosse rimasto operativo. Con uno sforzo titanico durato mesi, le legioni romane costruirono una gigantesca diga di massi ciclopici per sbarrare l\'imboccatura del porto sul mare. Credendosi ormai in trappola, i cartaginesi compirono un miracolo: lavorando giorno e notte in segreto con l\'aiuto di donne e bambini, scavarono un canale sotterraneo alternativo che sboccava sul lato opposto della costa e vi vararono a sorpresa una flotta fresca di 50 nuove navi da guerra, terrorizzando i romani che credevano la marina cartaginese defunta.'
      }
    ],
    curiositaInedite: [
      'Il termine greco "kothon" deriva dalla parola fenicia "qtn", che indicava originariamente un recipiente o una coppa da bere circolare, per l\'esatta somiglianza della pianta dello specchio d\'acqua.',
      'Oggi l\'Isola dell\'Ammiragliato è un\'oasi verde tranquilla accessibile tramite una passerella pedonale in legno, con il Museo dei Porti Punici che custodisce plastici tridimensionali perfetti che ricostruiscono la configurazione originaria del bacino militare.',
      'Gli scavi archeologici condotti da missioni britanniche e dell\'UNESCO negli anni \'70 hanno riportato alla luce i basamenti esatti delle colonne ioniche e le pendenze originali delle rampe di varo punico in calcare.'
    ]
  },

  'tophet-salammbo': {
    slug: 'tophet-salammbo',
    titolo: 'Santuario del Tophet di Salammbô',
    sottotitolo: 'Il luogo sacro più enigmatico dell\'antichità fenicia tra stele votive e il mistero del rito "molk"',
    categoria: 'Archeologia Religiosa & Mito',
    periodoStorico: 'VIII – II secolo a.C.',
    letturaMinuti: 4,
    sommario: 'Nascosto a poche centinaia di metri dai bacini portuali, all\'ombra di alte palme ed eucalipti secolari, il Tophet di Cartagine è il più vasto, intatto e affascinante santuario a cielo aperto del mondo fenicio-punico. Costellato da migliaia di cippi, are e stele funerarie in pietra scolpite con le sembianze triangolari della dea Tanit, questo recinto sacro ipogeo è al centro di uno dei più accesi dibattiti storiografici dell\'archeologia moderna sul sacrificio dei fanciulli.',
    sezioni: [
      {
        titolo: 'Tanit dal Volto Celeste e Baal Hammon',
        contenuto: 'Il santuario era dedicato alla coppia suprema del pantheon cartaginese: la dea madre Tanit (personificazione della fecondità, dei cicli lunari e protettrice celeste della città di Cartagine) e il dio Baal Hammon (signore del sole, del fuoco e delle messi). Sulle stele calcaree, datate tra l\'VIII e il II secolo a.C., compare costantemente inciso il celebre "Segno di Tanit": una figura stilizzata formata da un triangolo sormontato da una barra orizzontale con le estremità rivolte verso l\'alto e un cerchio (la testa con le braccia alzate in preghiera verso il cielo).'
      },
      {
        titolo: 'Il Rito del "Molk": Sacrificio o Necropoli Infantile?',
        contenuto: 'Gli autori romani e greci (tra cui Diodoro Siculo e Plutarco), acerrimi nemici politici di Cartagine, descrissero il Tophet con toni raccapriccianti come una fornace infernale dove i primogeniti delle famiglie nobili cartaginesi venivano gettati vivi nel grembo infuocato di una statua bronzea di Kronos/Moloch per placare l\'ira degli dèi durante le pestilenze o gli assedi. Tuttavia le moderne analisi osteologiche al radiocarbonio condotte da équipe internazionali hanno smentito questa leggenda nera: la maggior parte delle ceneri nelle urne appartiene a feti nati morti o neonati deceduti per morte naturale o malattia nelle prime settimane di vita. Nel mondo antico, chi moriva prima di ricevere il nome non poteva essere sepolto nei cimiteri degli adulti; il Tophet era un santuario protetto dove i neonati venivano affidati con rito di purificazione tramite il fuoco (molk) alle cure eterne e misericordiose della dea Tanit.'
      },
      {
        titolo: 'L\'Ispirazione del Romanzo Storico "Salammbô" di Flaubert',
        contenuto: 'Nel 1858 lo scrittore francese Gustave Flaubert compì un viaggio a Tunisi e trascorse giorni interi a vagare tra queste rovine ricoperte di erbacce e fichi d\'India per raccogliere materiale per il suo capolavoro letterario "Salammbô" (pubblicato nel 1862). Flaubert descrisse con un\'intensità visiva e sensoriale straordinaria il rituale del fuoco sacro e i quartieri puniche della città, immortalando la figura dell\'eroina sacerdotessa figlia del generale Amilcare Barca.'
      },
      {
        titolo: 'La Stratificazione Archeologica: Tre Livelli Storici',
        contenuto: 'Il Tophet è una capsula temporale eccezionale perché non fu mai saccheggiato o raso al suolo dai Romani, che per superstizione religiosa preferirono murarlo e consacrare il colle al loro dio Saturno. Scavando nel terreno, gli archeologi hanno identificato tre strati sovrapposti: il livello arcaico (VIII-VII sec. a.C.) con piccole urne in arenaria; il livello classico d\'oro (VI-IV sec. a.C.) con stele a forma di edicola egizia; e il livello tardo-ellenistico (III-II sec. a.C.) con incisioni minuziose di navi, ancore, delfini e palme.'
      }
    ],
    curiositaInedite: [
      'Il nome "Tophet" è di derivazione biblica (dall\'ebraico tofet, "luogo di sputo" o "fornace") ed è una convenzione moderna adottata dagli studiosi ottocenteschi; i cartaginesi si riferivano al luogo semplicemente come "l\'Area Sacra di Nostra Signora Tanit".',
      'Molte stele recano la formula votiva in lingua punica: "Alla signora Tanit Pene Baal e al signore Baal Hammon, ciò che ha promesso Hamilcar figlio di Magon, perché hanno ascoltato la sua voce e lo hanno benedetto".',
      'L\'accesso al Tophet è incluso nello stesso biglietto cumulativo (12 Dinari / ~3.60€) acquistato ai Porti Punici, consentendo la visita di entrambi i siti senza costi aggiuntivi.'
    ]
  },

  'borj-el-karraka': {
    slug: 'borj-el-karraka',
    titolo: 'Borj el-Karraka (La Fortezza de La Goletta)',
    sottotitolo: 'Il bastione spagnolo di Carlo V e del corsaro Barbarossa a guardia della laguna',
    categoria: 'Storia Militare Rinascimentale & Fortificazioni',
    periodoStorico: '1535 (spedizione imperiale di Tunisi) – 1574 (riconquista ottomana)',
    letturaMinuti: 3,
    sommario: 'Situata nel cuore de La Goletta lungo Avenue Franklin Roosevelt, a soli 600 metri dai moli del porto crociere moderno, la fortezza di Borj el-Karraka (nota nei documenti storici europei come il Forte Spagnolo de La Goletta) è il testimone monumentale delle titaniche guerre per il controllo del Mediterraneo tra l\'Impero di Carlo V d\'Asburgo e la Sublime Porta ottomana di Solimano il Magnifico.',
    sezioni: [
      {
        titolo: 'La "Gola" di Tunisi: Una Posizione Strategica Vitale',
        contenuto: 'La Goletta (in arabo Halq al-Wadi, letteralmente "la gola del torrente") deve il suo nome allo stretto canale navigabile naturale che collega il mare aperto del Golfo di Tunisi con la vasta laguna interna (il Lago El Bahira). Chiunque controllasse la fortezza controllava il passaggio obbligato di qualsiasi barca o rifornimento diretto verso la capitale Tunisi. Chi possedeva La Goletta possedeva la chiave militare dell\'intero Nord Africa.'
      },
      {
        titolo: 'La Battaglia di Tunisi del 1535: Carlo V contro Barbarossa',
        contenuto: 'Nell\'estate del 1535 l\'imperatore Carlo V guidò di persona una delle più colossali spedizioni navali del Rinascimento: oltre 400 navi e 30.000 soldati (tra cui lanzichenecchi tedeschi, veterani spagnoli, cavalieri di Malta e la flotta genovese dell\'ammiraglio Andrea Doria) assediarono La Goletta per strapparla al celebre corsaro ottomano Khayr al-Din detto "Barbarossa", nominato Kapudan Pascià da Solimano. Dopo 24 giorni di violentissimi bombardamenti d\'artiglieria, la fortezza cadde e Carlo V fece erigere un mastodontico forte bastionato poligonale.'
      },
      {
        titolo: 'La Riconquista Ottomana del 1574 e Sinan Pascià',
        contenuto: 'Il dominio asburgico durò meno di quarant\'anni: nel 1574 il generale ottomano Sinan Pascià e il corsaro convertito calabrese Uluj Alì (Luccialì) sbarcarono con un\'armata di oltre 70.000 uomini e riconquistarono La Goletta dopo un assedio disperato. La fortezza fu parzialmente smantellata per evitare che servisse nuovamente come base cristiana e ricostruita con la tipica architettura a scarpa ottomana.'
      },
      {
        titolo: 'Da Prigione di Stato a Monumento Urbano',
        contenuto: 'Nel corso del Settecento e dell\'Ottocento i Bey Husaynidi usarono i sotterranei della fortezza come prigione di stato (il nome "Karraka" deriva proprio dal termine caracca o galera, con cui venivano chiamati i condannati ai lavori forzati). Oggi le sue mura in pietra ocra e le antiche cannoniere aperte sul canale offrono una passeggiata suggestiva e tranquilla nel centro del borgo marinaro.'
      }
    ],
    curiositaInedite: [
      'Durante la battaglia del 1535, tra i difensori della fortezza e i liberatori cristiani vi fu anche il celebre poeta spagnolo Garcilaso de la Vega, che rimase ferito alla bocca e al braccio durante l\'assalto alle mura.',
      'A poche decine di metri dalla fortezza si snodano i ristorantini di pesce fresco più amati della costa, dove la sera i pescatori locali attraccano le barche vendendo triglie e orate direttamente ai cuochi.',
      'Trovandosi a soli 7 minuti a piedi dai varchi del Goulette Cruise Village, Borj el-Karraka è la tappa perfetta e senza alcun rischio per ingannare gli ultimi 60-90 minuti prima dell\'orario del Tutti a Bordo.'
    ]
  },

  'piccola-sicilia': {
    slug: 'piccola-sicilia',
    titolo: 'La Piccola Sicilia de La Goulette (Petite Sicile)',
    sottotitolo: 'Un secolo di fratellanza mediterranea, Claudia Cardinale e la Madonna di Trapani portata a mare dai musulmani',
    categoria: 'Storia Sociale, Cinema & Tradizioni Popolari',
    periodoStorico: '1860 – 1964',
    letturaMinuti: 4,
    sommario: 'Tra la metà dell\'Ottocento e i primi decenni del Novecento, il quartiere de La Goletta affacciato sul canale e sulla spiaggia divenne noto in tutto il Mediterraneo come "La Piccola Sicilia" (Petite Sicile). Migliaia di pescatori e maestri d\'ascia emigrati dalla Sicilia occidentale (in particolare da Trapani, Favignana e Mazara del Vallo) vi fondarono una comunità cosmopolita unica al mondo, dove italiani cattolici, ebrei tunisini (i Grana livornesi e i Twansa locali) e arabi musulmani condivisero la stessa lingua, gli stessi mercati e le stesse feste patronali.',
    sezioni: [
      {
        titolo: 'L\'Epopea dei Pescatori di Trapani e Favignana',
        contenuto: 'Attratti dalla straordinaria pescosità del Golfo di Tunisi e dal canale della laguna, centinaia di barche a vela latina partirono dalla costa trapanese per stabilirsi a La Goletta. Nel 1920 la comunità italiana superava il 60% dell\'intera popolazione residente nel borgo. I cartelli delle botteghe erano scritti in tre lingue (arabo, francese e siciliano) e si sviluppò un gergo misto italo-arabo parlato comunemente da tutti gli abitanti sul molo e nelle pescherie.'
      },
      {
        titolo: 'La Nascita di Claudia Cardinale nel 1938',
        contenuto: 'È proprio tra questi vicoli inondati di luce che il 15 aprile 1938 nacque Claude Joséphine Rose Cardinale, destinata a diventare una delle più grandi star della storia del cinema mondiale con il nome d\'arte di Claudia Cardinale. Figlia di emigrati siciliani (il padre ingegnere delle ferrovie della Compagnie des Phosphates e la madre originaria di una famiglia armatrice trapanese), crebbe parlando francese, dialetto siciliano e arabo tunisino: l\'italiano formale lo imparò solo più tardi sul set dei film di Visconti e Fellini. Nel 1957, all\'età di 19 anni, venne eletta a sorpresa "La più bella italiana di Tunisi", vincendo come premio un viaggio alla Mostra Internazionale d\'Arte Cinematografica di Venezia che lanciò la sua carriera leggendaria.'
      },
      {
        titolo: 'Il Miracolo del 15 Agosto: La Madonna di Trapani',
        contenuto: 'Il momento più alto e commovente della vita della Piccola Sicilia si svolgeva ogni 15 agosto, in occasione della festa dell\'Assunta. Dalla Chiesa di Sant\'Agostino e San Fedele (tuttora visibile a pochi passi dalla stazione TGM e dal molo) partiva la solenne processione della Madonna di Trapani. La statua veniva portata a spalla per le vie del paese fino alla battigia e immersa nelle acque del mare per benedire le reti e i pescatori per l\'anno a venire. Il fatto straordinario e irripetibile era che la statua veniva scortata e sorretta con devozione profonda congiuntamente da marinai cattolici siciliani e da pescatori arabi musulmani, che invocavano la Vergine con l\'appellativo affettuoso di "Mariam Trapanīya" (Maria di Trapani).'
      },
      {
        titolo: 'La Cucina Meticcia: Couscous di Pesce e Pasta coi Ricci',
        contenuto: 'L\'eredità culturale della Piccola Sicilia è viva ancora oggi nei piatti tipici dei ristoranti di Avenue Habib Bourguiba e Rue Franklin Roosevelt: qui la paranza fritta di triglie e seppie si serve accompagnata da abbondante harissa fresca con semi di carvi e cumino, e il celebre Couscous au Mérou (cernia) fonde la semola fine berbera con il brodo denso e speziato della tradizione marinara trapanese.'
      }
    ],
    curiositaInedite: [
      'Nel 2022 il comune de La Goletta ha inaugurato ufficialmente una via intitolata "Rue Claudia Cardinale" alla presenza commossa dell\'attrice, tornata per l\'occasione a visitare la sua casa natale d\'infanzia.',
      'Dopo l\'indipendenza della Tunisia nel 1956, la storica processione della Madonna di Trapani fu interrotta per decenni; è stata ripristinata e celebrata con grande successo e partecipazione popolare nel 2017 come simbolo di dialogo interreligioso nel Mediterraneo.',
      'La chiesa parrocchiale di Sant\'Agostino fu eretta nel 1848 su concessione del Bey Ahmad I, che donò personalmente il terreno alla comunità dei padri cappuccini siciliani.'
    ]
  },

  'tgm-ferrovia': {
    slug: 'tgm-ferrovia',
    titolo: 'Ferrovia TGM (Tunis – Goulette – Marsa)',
    sottotitolo: 'La ferrovia più antica della Tunisia e una delle prime d\'Africa (1872)',
    categoria: 'Archeologia Industriale & Trasporti Storici',
    periodoStorico: '1872 – Presente (Oltre 150 anni di servizio ininterrotto)',
    letturaMinuti: 3,
    sommario: 'La ferrovia TGM (acronimo delle tre tappe storiche: Tunis, La Goulette, La Marsa) è un pezzo vivente di storia dei trasporti mediterranei. Inaugurata nel 1872 sotto il regno del Bey Muhammad al-Sadiq, precede di molti decenni la maggior parte delle reti ferroviarie del continente africano e collega la capitale Tunisi con i sobborghi marittimi settentrionali costeggiando le lagune fenicie e i siti punici di Cartagine.',
    sezioni: [
      {
        titolo: 'La Traversata del Lago di Tunisi su Diga',
        contenuto: 'La caratteristica ingegneristica più affascinante del tracciato è il lungo rettilineo di 10 chilometri che attraversa il centro esatto del Lago di Tunisi (El Bahira). Il binario corre su una sottile diga artificiale rialzata sull\'acqua costruita a fine Ottocento: guardando fuori dai finestrini sembra letteralmente di volare a pelo d\'acqua, tra aironi, fenicotteri rosa e gabbiani che nidificano negli specchi salmastri della laguna.'
      },
      {
        titolo: 'L\'Elettrificazione del 1905 con Terza Rotaia',
        contenuto: 'Inizialmente operata con vaporiere inglesi a carbone della ditta Pickersgill & Frost, la linea venne completamente elettrificata nel 1905 con un sistema avveniristico a terza rotaia a corrente continua a 750 Volt, simile a quello della metropolitana di Londra e New York. Solo negli anni Settanta la terza rotaia a terra fu sostituita dalla linea aerea di contatto a pantografo per ragioni di sicurezza lungo i passaggi a livello pedonali dei paesi attraversati.'
      },
      {
        titolo: 'Le Classi di Viaggio e la Vita Quotidiana a Bordo',
        contenuto: 'La TGM è rimasta una delle rarissime linee ferroviarie al mondo a mantenere formalmente la divisione tra 1ère classe (Prima Classe) e 2ème classe (Seconda Classe) su treni suburbani popolari. Il biglietto di prima classe costa appena 1.20 TND (~0.36€), contro gli 0.70 TND della seconda: garantisce vetture leggermente più spaziose con poltroncine imbottite e consente di viaggiare comodi tra pendolari locali, studenti e pescatori in totale sicurezza.'
      },
      {
        titolo: 'Chiarimento Cruciale: Fermata "Vieille" vs "Casino"',
        contenuto: 'Molte vecchie guide turistiche cartacee o blog consigliano erroneamente la fermata "La Goulette Casino". In realtà, per chi sbarca dalla nave al molo crociere (Goulette Cruise Village), la stazione di gran lunga più vicina è "Gare de la Goulette Vieille", situata a soli 750 metri di camminata pianeggiante su marciapiede (9 minuti a piedi). La fermata Casino si trova invece 1,5 km più a nord (2,2 km dalla nave), comportando oltre mezz\'ora inutile di cammino sotto il sole!'
      }
    ],
    curiositaInedite: [
      'Il tracciato della ferrovia segue quasi millimetricamente l\'antico argine costiero fenicio e romano che separava il lago navigabile dal mare aperto.',
      'I biglietti cartacei emessi alle stazioni storiche mantengono ancora il layout vintage con numerazione progressiva stampata su cartoncino o ricevuta termica con doppia dicitura in arabo e francese.',
      'La frequenza media dei convogli è di circa 15-20 minuti; da La Goulette Vieille a Sidi Bou Saïd il treno impiega circa 22 minuti attraversando le storiche fermate di Cartagine (Salammbô, Byrsa, Dermech, Hannibal, Amilcar).'
    ]
  },

  'street-food-tunisino': {
    slug: 'street-food-tunisino',
    titolo: 'Street Food Cult Tunisino: I Sapori Popolari',
    sottotitolo: 'Bambalouni caldo, Chapati su piastra, Fricassé, Thé aux Pignons e Harissa UNESCO',
    categoria: 'Gastronomia di Strada Popolare',
    periodoStorico: 'Tradizione secolare maghrebina',
    letturaMinuti: 3,
    sommario: 'La cucina di strada tunisina è considerata tra le più generose, vivaci e saporite del Mediterraneo. Lungi dalle trappole per turisti con menù a prezzo fisso gonfiato, il cibo da strada si consuma caldo sul momento nei chioschi frequentati dagli artigiani e dagli studenti locali, a prezzi irrisori (tra 0.40€ e 2.00€ a pezzo).',
    sezioni: [
      {
        titolo: 'Il Bambalouni: La Ciambella Fumante di Sidi Bou Saïd',
        contenuto: 'Regina incontrastata del borgo andaluso, è una ciambella di impasto lievitato morbidissimo a base di farina, lievito e acqua. Il mastro friggitore stacca un pezzo di pasta, la allarga facendola roteare rapidamente in aria e la tuffa in un gigantesco calderone di olio bollente. Dopo meno di due minuti viene scolata dorata e croccante fuori con l\'interno soffice e passata al volo in un vassoio di zucchero semolato. Va mangiata caldissima mentre si passeggia: costa circa 1.50 TND (~0.45€).'
      },
      {
        titolo: 'Il Chapati Tunisien: La Piadina Sfogliata Ripiena',
        contenuto: 'Originario di Mahdia ma diffuso ovunque nei chioschi attorno alle stazioni TGM, il chapati tunisino non ha nulla a che vedere con il pane indiano omonimo. È un disco di pasta lievitata cotto su piastra rovente bombata (tajine). Al suo interno viene inserita sul momento una frittatina calda preparata al volo con uova, cipolla tritata e prezzemolo fresco, a cui si aggiungono tonno sott\'olio di prima scelta, formaggio fuso (gruyère o mozzarella) e una punta di harissa. È un pasto completo, caldissimo e corroborante a soli 5-7 TND (~1.50€ - 2.00€).'
      },
      {
        titolo: 'Il Fricassé: Il Panino Fritto con Tonno e Uova',
        contenuto: 'Un piccolo panino allungato di pasta lievitata, fritto fino a ottenere una crosticina dorata e asciutta, spaccato a metà e farcito con patate lesse a cubetti, tonno all\'olio d\'oliva, olive nere locali, spicchi di uovo sodo e una spalmata di harissa emulsionata con limone. Si trova in tutti i banchetti del molo e della stazione per circa 1.50 - 2.00 TND (meno di 0.60€).'
      },
      {
        titolo: 'L\'Harissa Tradizionale del Cap Bon (Patrimonio UNESCO)',
        contenuto: 'Nel dicembre 2022 l\'UNESCO ha ufficialmente proclamato l\'Harissa tunisina patrimonio culturale immateriale dell\'umanità. A base di peperoncini rossi essiccati al sole, aglio schiacciato nel mortaio, semi di coriandolo, carvi (cumino dei prati) e sale marino pestati a mano e conservati in olio d\'oliva vergine, l\'harissa artigianale possiede una complessità aromatica e floreale incomparabile rispetto alle salse industriali in tubetto.'
      }
    ],
    curiositaInedite: [
      'Se non amate il cibo piccante, basta specificare con un sorriso: "Ble Harissa, min fadlek" (senza harissa, per favore) oppure "Shwaya harissa" (poca harissa).',
      'In Tunisia il tonno è un\'autentica religione nazionale: le tonnare storiche di Sidi Daoud (nella vicina penisola di Cap Bon) sono attive dai tempi dei Fenici e dei Romani.',
      'I datteri freschi venduti nel terminal a fine novembre appartengono al raccolto fresco della varietà "Deglet Nour" (Dito di Luce) delle oasi di Tozeur, traslucidi e dal sapore di miele.'
    ]
  }
};
