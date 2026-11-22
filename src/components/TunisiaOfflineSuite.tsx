/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TUNISIA_WIKI_ARTICLES, 
  TUNISIA_PHRASEBOOK, 
  TUNISIA_CURRENCY, 
  StreetPhrase 
} from '../data/tunisiaWikiData';
import { getConverterEasterEgg } from '../utils/easterEggs';
import { 
  BookOpen, 
  Coins, 
  MessageSquare, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRightLeft,
  Sparkles,
  PhoneCall,
  Ship,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

interface TunisiaOfflineSuiteProps {
  onOpenWiki: (slug: string) => void;
}

export const TunisiaOfflineSuite: React.FC<TunisiaOfflineSuiteProps> = ({ onOpenWiki }) => {
  const [activeTab, setActiveTab] = useState<'wiki' | 'converter' | 'phrasebook' | 'sos'>('wiki');
  const [eurInput, setEurInput] = useState<string>('10');
  const [tndInput, setTndInput] = useState<string>((10 * TUNISIA_CURRENCY.eurToTnd).toFixed(2));
  const [selectedPhraseCategory, setSelectedPhraseCategory] = useState<string>('Tutti');

  const handleEurChange = (val: string) => {
    setEurInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setTndInput((num * TUNISIA_CURRENCY.eurToTnd).toFixed(2));
    } else {
      setTndInput('');
    }
  };

  const handleTndChange = (val: string) => {
    setTndInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setEurInput((num * TUNISIA_CURRENCY.tndToEur).toFixed(2));
    } else {
      setEurInput('');
    }
  };

  const handleApplyPreset = (tnd: number) => {
    setTndInput(tnd.toFixed(2));
    setEurInput((tnd * TUNISIA_CURRENCY.tndToEur).toFixed(2));
  };

  const phraseCategories = ['Tutti', 'Trattativa', 'Cibo', 'Direzioni', 'Saluti'];
  const filteredPhrases = selectedPhraseCategory === 'Tutti' 
    ? TUNISIA_PHRASEBOOK 
    : TUNISIA_PHRASEBOOK.filter(p => p.contesto === selectedPhraseCategory);

  const wikiArticlesList = Object.values(TUNISIA_WIKI_ARTICLES);
  const converterSecretNote = getConverterEasterEgg(eurInput, tndInput);

  return (
    <div className="rounded-3xl border border-cyan-800/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-xl overflow-hidden text-slate-100">
      {/* Intestazione Speciale Tunisia Offline Suite */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border-b border-cyan-800/50">
        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇹🇳</span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800/80">
              Kit Salvavita Offline (No Roaming UE)
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            ✈️ Modalità Aereo OK
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-white">
          La Goletta & Cartagine Pocket Toolkit
        </h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          In Tunisia non c'è roaming gratuito: usa questa suite con enciclopedia Wikipedia integrata, convertitore valuta Dinar/Euro e frasario da strada senza usare 1 KB di dati!
        </p>

        {/* Tab switcher */}
        <div className="grid grid-cols-4 gap-1.5 mt-4 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('wiki')}
            className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition ${
              activeTab === 'wiki'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[11px]">Wiki ({wikiArticlesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('converter')}
            className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition ${
              activeTab === 'converter'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span className="text-[11px]">TND ⇄ EUR</span>
          </button>

          <button
            onClick={() => setActiveTab('phrasebook')}
            className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition ${
              activeTab === 'phrasebook'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[11px]">Frasario</span>
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className={`py-2 px-1 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition ${
              activeTab === 'sos'
                ? 'bg-rose-500 text-slate-950 shadow-sm'
                : 'text-rose-400 hover:text-rose-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[11px]">SOS Porto</span>
          </button>
        </div>
      </div>

      {/* Contenuto Tab */}
      <div className="p-4 sm:p-5">
        {/* TAB 1: ENCICLOPEDIA WIKIPEDIA OFFLINE */}
        {activeTab === 'wiki' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Tocca un articolo per aprirlo a schermo intero:</span>
              <span className="font-mono text-cyan-400">{wikiArticlesList.length} Voci Storiche</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {wikiArticlesList.map((art) => (
                <button
                  key={art.slug}
                  onClick={() => onOpenWiki(art.slug)}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 text-left transition group active:scale-[0.98] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
                        {art.letturaMinuti} min lettura
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        {art.periodoStorico.split('(')[0]}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {art.titolo}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                      {art.sottotitolo}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400 font-semibold">
                    <span>Leggi Articolo Completo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CONVERTITORE TND ⇄ EUR */}
        {activeTab === 'converter' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Tasso indicativo ufficiale di cambio:</span>
              <span className="font-mono font-bold text-cyan-400">1 EUR ≈ 3.35 TND</span>
            </div>

            {/* Input bidirezionale */}
            <div className="grid grid-cols-2 gap-3 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Euro (€ EUR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={eurInput}
                    onChange={(e) => handleEurChange(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-8 py-2 text-base font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold pointer-events-none">€</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-cyan-400 mb-1">
                  Dinari Tunisini (TND)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={tndInput}
                    onChange={(e) => handleTndChange(e.target.value)}
                    className="w-full bg-slate-900 border border-cyan-700/60 rounded-xl pl-3 pr-10 py-2 text-base font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-cyan-400 font-bold pointer-events-none">DT</span>
                </div>
              </div>
            </div>

            {converterSecretNote && (
              <div className="px-3.5 py-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-xs text-cyan-200 leading-relaxed">
                {converterSecretNote}
              </div>
            )}

            {/* Prezzi tipici da strada cliccabili (Preset veloci) */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Prezzi Tipici da Strada (Tocca per calcolare al volo):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TUNISIA_CURRENCY.quickPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPreset(preset.tnd)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition active:scale-95 text-xs"
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-cyan-300">
                      <span>{preset.tnd.toFixed(2)} TND</span>
                      <span className="text-[10px] text-slate-400">~{preset.eur.toFixed(2)}€</span>
                    </div>
                    <div className="text-[11px] text-slate-300 truncate mt-0.5">
                      {preset.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              💡 <strong>Regola d'oro contanti:</strong> In Tunisia l'Euro è accettato solo in alcuni negozi turistici con tassi sfavorevoli. Cambiate 20€ a testa in Dinari allo sportello bancario ufficiale dentro il Terminal Crociere prima di uscire per pagare TGM, bambalouni e ingressi archeologici senza commissioni truffa.
            </div>
          </div>
        )}

        {/* TAB 3: FRASARIO DA STRADA */}
        {activeTab === 'phrasebook' && (
          <div className="space-y-3">
            {/* Categorie filtri */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {phraseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPhraseCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedPhraseCategory === cat
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Lista frasi con arabo, traslitterazione fonetica e italiano */}
            <div className="space-y-2">
              {filteredPhrases.map((p, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-amber-300 font-sans" dir="rtl">
                      {p.arabo}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      {p.contesto}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-white">
                    🗣️ "{p.traslitterazione}"
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    🇮🇹 {p.italiano}
                  </div>
                  <div className="text-[11px] text-slate-400 italic">
                    🇫🇷 {p.francese}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SOS & GUIDA EMERGENZA MSC */}
        {activeTab === 'sos' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 text-xs sm:text-sm text-rose-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                Limite Assoluto: Tutti a Bordo ore 17:15 (Partenza 18:00)
              </div>
              <p>
                In Tunisia la nave non aspetta i ritardatari. Grazie all'itinerario a imbuto proposto, dalle 15:30 in poi sarete già a La Goletta a meno di 600m dalla nave.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Indirizzo di Rientro per Taxi Giallo o inDrive:
              </h4>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-xs text-cyan-200">
                <strong>Terminal Croisières - Goulette Village</strong><br />
                Port de La Goulette (Halq al-Wadi), 2060 Tunis
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mostra al tassista la tua <strong>MSC Cruise Card</strong> oppure dì semplicemente: <em>"Mina Halq al-Wadi – Bateau de Croisière MSC"</em>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Ship className="w-4 h-4 text-cyan-400" />
                Procedura Rapida in caso di Qualsiasi Ritardo:
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-xs">
                <li><strong>Nota: Bolt non opera più in Tunisia.</strong> Se alle 16:15 sei ancora a Cartagine o Sidi Bou Saïd, ferma su strada un <strong>taxi giallo ufficiale</strong> (chiedendo il <em>compteur</em> o concordando 15–20 TND / ~5–6€ per l'intera auto) oppure usa l'app <strong>inDrive</strong> se hai dati mobili / hotspot (~10-15 min di tragitto).</li>
                <li>In alternativa, da Sidi Bou Saïd o Carthage Salammbô prendi il <strong>treno TGM</strong> direzione Tunis Marine e scendi a <em>Goulette Vieille</em> (1.20 TND, 100% senza internet).</li>
                <li>Conserva sempre nella tasca il "Daily Program" cartaceo di MSC Euribia consegnato in cabina la mattina: contiene il numero di emergenza dell'<strong>Agente Portuale Marittimo MSC</strong> locale di Tunisi.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
