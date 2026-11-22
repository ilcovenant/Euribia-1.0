/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { itineraryData } from './data/itineraryData';
import { Header } from './components/Header';
import { PortTabs } from './components/PortTabs';
import { LogisticsCard } from './components/LogisticsCard';
import { FoodCard } from './components/FoodCard';
import { StopCard } from './components/StopCard';
import { CruiseInfoModal } from './components/CruiseInfoModal';
import { OfflineDownloadModal } from './components/OfflineDownloadModal';
import { TunisiaOfflineSuite } from './components/TunisiaOfflineSuite';
import { OfflineWikiModal } from './components/OfflineWikiModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CountdownView } from './components/CountdownView';
import { SeaDayView } from './components/SeaDayView';
import {
  AchievementToast,
  CaptainToast,
  CrewRandomizerModal
} from './components/EasterEggOverlay';
import { useAllAboardCountdown } from './hooks/useAllAboardCountdown';
import { formatDurationHms } from './data/countdownData';
import {
  PORT_ACHIEVEMENTS,
  PLATINUM_ACHIEVEMENT,
  CAPTAIN_ANNOUNCEMENTS,
  PortAchievement,
  getFooterTimeEasterEgg,
  isEmbarkationDayCelebration,
  playShipFoghorn,
  playAchievementChime
} from './utils/easterEggs';
import { PortItinerary } from './types/itinerary';
import { 
  ChevronRight, 
  ChevronLeft, 
  Route,
  CheckCircle2,
  Timer,
  Compass,
  Trophy,
  X
} from 'lucide-react';

const STORAGE_KEY = 'msc_checked_stops_v1';
const VARIANT_STORAGE_KEY = 'msc_selected_variants_v1';

export default function App() {
  const [activeViewId, setActiveViewId] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (hashId === 'countdown' || hashId === 'navigazione' || itineraryData.some(p => p.id === hashId)) {
        return hashId;
      }
    }
    return itineraryData[0].id;
  });

  const [lastPortId, setLastPortId] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (itineraryData.some(p => p.id === hashId)) {
        return hashId;
      }
    }
    return itineraryData[0].id;
  });

  const [checkedStops, setCheckedStops] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(VARIANT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCruiseModalOpen, setIsCruiseModalOpen] = useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [selectedWikiSlug, setSelectedWikiSlug] = useState<string | null>(null);
  const [tunisiaTab, setTunisiaTab] = useState<'itinerario' | 'kit'>('itinerario');

  // Stato Easter Eggs (invisibili finché non attivati)
  const [activeAchievement, setActiveAchievement] = useState<PortAchievement | null>(null);
  const [captainMessage, setCaptainMessage] = useState<string | null>(null);
  const [isRandomizerOpen, setIsRandomizerOpen] = useState(false);
  const [embarkBannerDismissed, setEmbarkBannerDismissed] = useState(false);
  const logoTapCountRef = useRef(0);
  const logoTapTimerRef = useRef<number | null>(null);
  const captainMsgIdxRef = useRef(0);
  const footerTapCountRef = useRef(0);
  const footerTapTimerRef = useRef<number | null>(null);

  const countdown = useAllAboardCountdown(lastPortId);

  // Sincronizza stato checklist su localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedStops));
    } catch (e) {
      console.warn('Impossibile salvare su localStorage:', e);
    }
  }, [checkedStops]);

  // Sincronizza varianti selezionate su localStorage
  useEffect(() => {
    try {
      localStorage.setItem(VARIANT_STORAGE_KEY, JSON.stringify(selectedVariants));
    } catch (e) {
      console.warn('Impossibile salvare varianti su localStorage:', e);
    }
  }, [selectedVariants]);

  // Aggiorna URL hash per permettere deep-linking ai singoli porti
  const handleSelectPort = (portId: string) => {
    setActiveViewId(portId);
    setLastPortId(portId);
    if (typeof window !== 'undefined') {
      window.location.hash = portId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSeaDay = () => {
    setActiveViewId('navigazione');
    if (typeof window !== 'undefined') {
      window.location.hash = 'navigazione';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCountdown = () => {
    // Prima della partenza lascia Genova Imbarco; durante la crociera pre-seleziona l'ultimo porto aperto se non c'è uno scalo oggi
    if (!countdown.simulation && !countdown.todayPort && !countdown.isBeforeCruise) {
      countdown.setSelectedPortId(lastPortId);
    }
    setActiveViewId('countdown');
    if (typeof window !== 'undefined') {
      window.location.hash = 'countdown';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectVariant = (portId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [portId]: variantId
    }));
  };

  // Risolve l'eventuale variante attiva per ogni porto
  const resolvePort = (port: PortItinerary): PortItinerary => {
    if (!port.varianti || port.varianti.length === 0) return port;
    const selectedId = selectedVariants[port.id];
    const variant = port.varianti.find(v => v.id === selectedId) || port.varianti[0];
    return {
      ...port,
      porto: variant.portoTitolo,
      kmTotaliStimati: variant.kmTotaliStimati,
      infoLogisticaMolo: variant.infoLogisticaMolo,
      tappe: variant.tappe
    };
  };

  const resolvedPorts = itineraryData.map(resolvePort);

  const handleToggleCheck = (stopId: string) => {
    const wasChecked = !!checkedStops[stopId];
    const nextChecked: Record<string, boolean> = {
      ...checkedStops,
      [stopId]: !wasChecked
    };
    setCheckedStops(nextChecked);

    // Rileva sblocco 100% di uno scalo o Platino (tutti e 5 gli scali al 100%)
    if (!wasChecked) {
      const targetPort = resolvedPorts.find(p => p.tappe.some(t => t.id === stopId));
      if (targetPort && targetPort.tappe.length > 0) {
        const wasPortDone = targetPort.tappe.every(t => !!checkedStops[t.id]);
        const isPortNowDone = targetPort.tappe.every(t => !!nextChecked[t.id]);

        if (!wasPortDone && isPortNowDone) {
          const allPortsNowDone = resolvedPorts.every(
            p => p.tappe.length > 0 && p.tappe.every(t => !!nextChecked[t.id])
          );
          if (allPortsNowDone) {
            playAchievementChime(true);
            setActiveAchievement(PLATINUM_ACHIEVEMENT);
          } else if (PORT_ACHIEVEMENTS[targetPort.id]) {
            playAchievementChime(false);
            setActiveAchievement(PORT_ACHIEVEMENTS[targetPort.id]);
          }
        }
      }
    }
  };

  const handleLogoTap = () => {
    logoTapCountRef.current += 1;
    if (logoTapTimerRef.current) {
      window.clearTimeout(logoTapTimerRef.current);
    }
    if (logoTapCountRef.current >= 5) {
      logoTapCountRef.current = 0;
      playShipFoghorn();
      const msg = CAPTAIN_ANNOUNCEMENTS[captainMsgIdxRef.current % CAPTAIN_ANNOUNCEMENTS.length];
      captainMsgIdxRef.current += 1;
      setCaptainMessage(msg);
      return;
    }
    logoTapTimerRef.current = window.setTimeout(() => {
      logoTapCountRef.current = 0;
    }, 2400);
  };

  const handleCrewFooterTap = () => {
    footerTapCountRef.current += 1;
    if (footerTapTimerRef.current) {
      window.clearTimeout(footerTapTimerRef.current);
    }
    if (footerTapCountRef.current >= 3) {
      footerTapCountRef.current = 0;
      setIsRandomizerOpen(true);
      return;
    }
    footerTapTimerRef.current = window.setTimeout(() => {
      footerTapCountRef.current = 0;
    }, 1800);
  };

  const handleResetProgress = () => {
    setCheckedStops({});
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('msc_sea_day_checklist_v1');
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('msc-reset-progress'));
    }
  };
  const isCountdownView = activeViewId === 'countdown';
  const isSeaDayView = activeViewId === 'navigazione';
  const currentPortIndex = resolvedPorts.findIndex(
    p => p.id === (isCountdownView || isSeaDayView ? lastPortId : activeViewId)
  );
  const activePort = resolvedPorts[currentPortIndex] || resolvedPorts[0];
  const activeVariantId = activePort.varianti && activePort.varianti.length > 0
    ? (activePort.varianti.find(v => v.id === selectedVariants[activePort.id])?.id || activePort.varianti[0].id)
    : null;

  // Raggruppa gli ID spuntati per ciascun porto (usando la variante attiva) per i badge nei tab
  const checkedStopsByPort = resolvedPorts.reduce<Record<string, string[]>>((acc, port) => {
    acc[port.id] = port.tappe.filter(t => checkedStops[t.id]).map(t => t.id);
    return acc;
  }, {});

  const currentPortCheckedIds = checkedStopsByPort[activePort.id] || [];
  const completedPortsCount = resolvedPorts.filter(
    p => p.tappe.length > 0 && (checkedStopsByPort[p.id]?.length || 0) === p.tappe.length
  ).length;
  const isCruisePlatinum = completedPortsCount === resolvedPorts.length;
  const showEmbarkCelebration =
    !embarkBannerDismissed && isEmbarkationDayCelebration(countdown.nowMs);
  const footerTimeEgg = getFooterTimeEasterEgg(new Date(countdown.nowMs));

  const prevPort = currentPortIndex > 0 ? resolvedPorts[currentPortIndex - 1] : null;
  const nextPort = currentPortIndex < resolvedPorts.length - 1 ? resolvedPorts[currentPortIndex + 1] : null;

  // Banner live compatto mostrato nello scalo attivo se oggi è il suo giorno (o in modalità prova)
  const matchingLiveBanner =
    !isCountdownView &&
    !isSeaDayView &&
    countdown.activeLiveCountdown &&
    countdown.activeLiveCountdown.port.portId === activePort.id
      ? countdown.activeLiveCountdown
      : null;

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Barra Superiore Unificata Sticky (Header + Tabs Porti senza fessure su mobile) */}
      <div className="sticky top-0 z-30 no-print">
        <Header
          currentPortName={isCountdownView ? 'Tutti a Bordo' : isSeaDayView ? 'Navigazione' : activePort.citta}
          nextEvent={countdown.nextCruiseEvent}
          onLogoTap={handleLogoTap}
          onClickNextEvent={() => {
            if (countdown.nextCruiseEvent) {
              countdown.setSelectedPortId(countdown.nextCruiseEvent.portId);
            }
            setActiveViewId('countdown');
            if (typeof window !== 'undefined') {
              window.location.hash = 'countdown';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onOpenCruiseInfo={() => setIsCruiseModalOpen(true)}
          onDownloadOfflineBundle={() => setIsOfflineModalOpen(true)}
        />

        {/* Barra Tabs Orizzontale (A Bordo + G2..G7 inclusa G5 Navigazione) */}
        <PortTabs
          ports={resolvedPorts}
          activeViewId={activeViewId}
          onSelectPort={handleSelectPort}
          onSelectSeaDay={handleSelectSeaDay}
          onSelectCountdown={handleSelectCountdown}
          checkedStopsByPort={checkedStopsByPort}
          activeLiveCountdown={countdown.activeLiveCountdown}
          isBeforeCruise={countdown.isBeforeCruise}
          preCruiseRemainingMs={countdown.isBeforeBoarding ? countdown.boardingRemainingMs : countdown.preCruiseRemainingMs}
        />
      </div>

      {/* Intestazione speciale visibile SOLO in fase di stampa / PDF */}
      <div className="hidden print-only p-4 border-b border-slate-300">
        <h1 className="text-xl font-bold text-black">
          MSC Euribia – Guida Itinerario: {activePort.porto} ({activePort.bandiera})
        </h1>
        <p className="text-sm text-slate-600">
          {activePort.dataGiorno} • Attracco {activePort.orarioAttracco} • Limite {activePort.orarioTuttiABordo} (Partenza {activePort.orarioPartenza})
        </p>
      </div>

      {/* Main Container centrato max-w-xl per simulare esperienza nativa da smartphone */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 space-y-4">
        {showEmbarkCelebration && (
          <div className="rounded-2xl bg-gradient-to-r from-cyan-950/90 via-blue-950/80 to-indigo-950/90 border border-cyan-500/50 px-4 py-3 flex items-center justify-between gap-2.5 shadow-lg no-print">
            <div className="text-xs sm:text-sm font-bold text-cyan-100 leading-snug">
              🚢🥂 <span className="text-white">Oggi si salpa da Genova sulla MSC Euribia!</span> Buon viaggio equipaggio!
            </div>
            <button
              type="button"
              onClick={() => setEmbarkBannerDismissed(true)}
              aria-label="Chiudi banner partenza"
              className="w-7 h-7 rounded-lg bg-cyan-900/60 hover:bg-cyan-800/70 text-cyan-200 flex items-center justify-center shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {isCountdownView ? (
          <CountdownView
            selectedPortId={countdown.selectedPortId}
            onSelectPortId={countdown.setSelectedPortId}
            inspectedCountdown={countdown.inspectedCountdown}
            isBeforeBoarding={countdown.isBeforeBoarding}
            isBeforeCruise={countdown.isBeforeCruise}
            boardingRemainingMs={countdown.boardingRemainingMs}
            preCruiseRemainingMs={countdown.preCruiseRemainingMs}
            arrivalRemainingMs={countdown.arrivalRemainingMs}
            todayPortId={countdown.todayPort?.portId || null}
            simulation={countdown.simulation}
            onAdjustOffset={countdown.adjustPortOffset}
            onResetOffset={countdown.resetPortOffset}
            onStartSimulation={countdown.startSimulation}
            onStopSimulation={countdown.stopSimulation}
            alertPrefs={countdown.alertPrefs}
            onToggleAlertEnabled={countdown.toggleAlertEnabled}
            onSetAlertThreshold={countdown.setAlertThreshold}
            alertBannerMessage={countdown.alertBannerMessage}
            onDismissAlertBanner={countdown.dismissAlertBanner}
            onOpenPortItinerary={handleSelectPort}
          />
        ) : isSeaDayView ? (
          <SeaDayView onSelectPort={handleSelectPort} />
        ) : (
          <>
            {/* Banner live compatto se lo scalo visualizzato è quello attivo oggi o in prova */}
            {matchingLiveBanner && (
              <button
                type="button"
                onClick={handleSelectCountdown}
                className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border flex items-center justify-between gap-3 text-left transition active:scale-[0.99] no-print ${
                  matchingLiveBanner.urgency === 'critical' || matchingLiveBanner.urgency === 'expired'
                    ? 'bg-rose-950/50 border-rose-600/80 text-rose-100'
                    : matchingLiveBanner.urgency === 'caution'
                    ? 'bg-amber-950/45 border-amber-600/70 text-amber-100'
                    : 'bg-emerald-950/40 border-emerald-700/60 text-emerald-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Timer className="w-4 h-4 shrink-0 text-current" />
                  <div className="min-w-0">
                    <div className="text-[11px] opacity-85 truncate">
                      {matchingLiveBanner.isSimulated ? 'Prova Timer · ' : ''}Tutti a Bordo ore {matchingLiveBanner.adjustedAllAboardTime}
                    </div>
                    <div className="text-sm font-extrabold font-mono tabular-nums">
                      {formatDurationHms(matchingLiveBanner.remainingMs)} rimasti
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold shrink-0 whitespace-nowrap flex items-center gap-1">
                  Rientro
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            )}

            {/* Selettore Variante Itinerario (compatto a 2 colonne anche su mobile) */}
            {activePort.varianti && activePort.varianti.length > 1 && (
              <section
                aria-label="Selezione variante itinerario"
                className="bg-slate-900/95 border border-cyan-500/35 rounded-2xl p-3 shadow-lg no-print"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <h2 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      Percorso Giorno {activePort.giornoNumero}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activePort.varianti.length} varianti
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {activePort.varianti.map((variant, idx) => {
                    const isSelected = variant.id === activeVariantId;
                    const optionLetter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleSelectVariant(activePort.id, variant.id)}
                        aria-pressed={isSelected}
                        className={`text-left rounded-xl p-2.5 sm:p-3 border transition-all active:scale-[0.98] flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1.5 mb-1">
                            <span
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-cyan-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              Opzione {optionLetter}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-xs sm:text-sm font-extrabold leading-tight text-white">
                            {variant.label}
                          </div>
                        </div>
                        <div className={`text-[10px] sm:text-[11px] font-mono mt-1 leading-tight ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {variant.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Selettore Scheda Giorno 4 La Goletta: Itinerario vs Kit Sopravvivenza Offline (2 colonne compatte) */}
            {activePort.id === 'la-goletta' && (
              <section
                aria-label="Scegli scheda La Goletta"
                className="bg-slate-900/95 border border-cyan-500/35 rounded-2xl p-3 shadow-lg no-print"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <h2 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      Giorno 4 · Tunisia
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    2 schede
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTunisiaTab('itinerario')}
                    aria-pressed={tunisiaTab === 'itinerario'}
                    className={`text-left rounded-xl p-2.5 sm:p-3 border transition-all active:scale-[0.98] flex flex-col justify-between ${
                      tunisiaTab === 'itinerario'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            tunisiaTab === 'itinerario'
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Scheda A
                        </span>
                        {tunisiaTab === 'itinerario' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold leading-tight text-white">
                        Itinerario
                      </div>
                    </div>
                    <div className={`text-[10px] sm:text-[11px] font-mono mt-1 leading-tight ${tunisiaTab === 'itinerario' ? 'text-cyan-300' : 'text-slate-400'}`}>
                      Sidi Bou + Cartagine • {activePort.kmTotaliStimati}km
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTunisiaTab('kit')}
                    aria-pressed={tunisiaTab === 'kit'}
                    className={`text-left rounded-xl p-2.5 sm:p-3 border transition-all active:scale-[0.98] flex flex-col justify-between ${
                      tunisiaTab === 'kit'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            tunisiaTab === 'kit'
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Scheda B
                        </span>
                        {tunisiaTab === 'kit' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold leading-tight text-white">
                        Kit Offline
                      </div>
                    </div>
                    <div className={`text-[10px] sm:text-[11px] font-mono mt-1 leading-tight ${tunisiaTab === 'kit' ? 'text-cyan-300' : 'text-slate-400'}`}>
                      Wiki • Cambio TND • SOS
                    </div>
                  </button>
                </div>
              </section>
            )}

            {activePort.id === 'la-goletta' && tunisiaTab === 'kit' ? (
              <div className="space-y-4">
                <TunisiaOfflineSuite
                  onOpenWiki={(slug) => setSelectedWikiSlug(slug)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setTunisiaTab('itinerario');
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] no-print"
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span>Torna all’Itinerario La Goletta</span>
                </button>
              </div>
            ) : (
              <>
                {/* Scheda Logistica del Porto */}
                <LogisticsCard
                  port={activePort}
                  checkedStops={currentPortCheckedIds}
                />

                {/* Card Esperienza Gastronomica Cult (stile FAQ chiudibile) */}
                <FoodCard
                  sostaGolosa={activePort.sostaGolosaTop}
                />

                {/* Timeline Tappe ad Anello */}
                <section 
                  aria-label="Tappe dell'itinerario a piedi"
                  className="pt-2"
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      Circuito Tappe ad Anello
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {activePort.tappe.length} fermate ({activePort.kmTotaliStimati} km)
                    </span>
                  </div>

                  <div className="space-y-0">
                    {activePort.tappe.map((stop, idx) => (
                      <StopCard
                        key={stop.id}
                        stop={stop}
                        index={idx}
                        totalStops={activePort.tappe.length}
                        isChecked={!!checkedStops[stop.id]}
                        onToggleCheck={handleToggleCheck}
                        onOpenWiki={(slug) => setSelectedWikiSlug(slug)}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Navigazione Veloce tra Giorni Precedente / Successivo (incluso G5 Navigazione tra G4 e G6) */}
            <nav 
              aria-label="Navigazione tra scali successivi" 
              className="pt-4 pb-8 grid grid-cols-2 gap-2.5 w-full no-print"
            >
              {activePort.giornoNumero === 6 ? (
                <button
                  onClick={handleSelectSeaDay}
                  className="w-full min-w-0 overflow-hidden p-2.5 sm:p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition active:scale-95 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-400 font-mono truncate">Giorno 5</div>
                    <div className="text-xs font-bold text-white truncate">🌊 Navigazione</div>
                  </div>
                </button>
              ) : prevPort ? (
                <button
                  onClick={() => handleSelectPort(prevPort.id)}
                  className="w-full min-w-0 overflow-hidden p-2.5 sm:p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition active:scale-95 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-400 font-mono truncate">Giorno {prevPort.giornoNumero}</div>
                    <div className="text-xs font-bold text-white truncate">
                      {prevPort.bandiera} {prevPort.citta.split('/')[0].trim()}
                    </div>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {activePort.giornoNumero === 4 ? (
                <button
                  onClick={handleSelectSeaDay}
                  className="w-full min-w-0 overflow-hidden p-2.5 sm:p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-right transition active:scale-95 flex items-center justify-end gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-400 font-mono truncate">Giorno 5</div>
                    <div className="text-xs font-bold text-white truncate">Navigazione 🌊</div>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                </button>
              ) : nextPort ? (
                <button
                  onClick={() => handleSelectPort(nextPort.id)}
                  className="w-full min-w-0 overflow-hidden p-2.5 sm:p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-right transition active:scale-95 flex items-center justify-end gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-400 font-mono truncate">Giorno {nextPort.giornoNumero}</div>
                    <div className="text-xs font-bold text-white truncate">
                      {nextPort.citta.split('/')[0].trim()} {nextPort.bandiera}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                </button>
              ) : (
                <div />
              )}
            </nav>
          </>
        )}
      </main>

      {/* Footer minimalista (3 tocchi su "4 viaggiatori" = sorteggio segreto) */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-400 no-print">
        {isCruisePlatinum && (
          <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-400/60 text-[11px] font-mono font-bold text-cyan-200 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>CROCIERA PLATINATA · 100% ACHIEVEMENT (5/5 SCALI)</span>
          </div>
        )}
        <p className="max-w-md mx-auto">
          MSC Euribia • 23-30 Nov 2026 • Realizzato per{' '}
          <span
            onClick={handleCrewFooterTap}
            className="cursor-pointer select-none hover:text-slate-200 transition-colors"
          >
            4 viaggiatori (35enni)
          </span>
          .
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Tutti i dati, mappe e checklist sono salvati localmente sul dispositivo per un utilizzo 100% offline a bordo.
        </p>
        {footerTimeEgg && (
          <p className="text-[11px] text-cyan-300/90 mt-2 max-w-md mx-auto font-medium">
            {footerTimeEgg.text}
          </p>
        )}
      </footer>

      {/* Modale Dettagli Crociera & Scheda MSC Euribia */}
      <CruiseInfoModal
        isOpen={isCruiseModalOpen}
        onClose={() => setIsCruiseModalOpen(false)}
        onResetProgress={handleResetProgress}
      />

      {/* Modale Download Singolo File Offline Standalone */}
      <OfflineDownloadModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
      />

      {/* Modale Articolo Wikipedia Offline (La Goletta & Cartagine) */}
      <OfflineWikiModal
        slug={selectedWikiSlug}
        isOpen={!!selectedWikiSlug}
        onClose={() => setSelectedWikiSlug(null)}
        onSelectArticle={(slug) => setSelectedWikiSlug(slug)}
      />

      {/* Easter Eggs: Trofeo 100% / Platino, Annuncio Comandante & Sorteggio da 4 */}
      <AchievementToast
        achievement={activeAchievement}
        onDismiss={() => setActiveAchievement(null)}
      />
      <CaptainToast
        message={captainMessage}
        onDismiss={() => setCaptainMessage(null)}
      />
      <CrewRandomizerModal
        isOpen={isRandomizerOpen}
        onClose={() => setIsRandomizerOpen(false)}
      />

      {/* Indicatore stato Offline / Cache pronta */}
      <OfflineIndicator />
    </div>
  );
}
