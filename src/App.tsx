/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { useAllAboardCountdown } from './hooks/useAllAboardCountdown';
import { formatDurationHms } from './data/countdownData';
import { PortItinerary } from './types/itinerary';
import { 
  ChevronRight, 
  ChevronLeft, 
  Route,
  CheckCircle2,
  Timer
} from 'lucide-react';

const STORAGE_KEY = 'msc_checked_stops_v1';
const VARIANT_STORAGE_KEY = 'msc_selected_variants_v1';

export default function App() {
  const [activeViewId, setActiveViewId] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (hashId === 'countdown' || itineraryData.some(p => p.id === hashId)) {
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

  const handleSelectCountdown = () => {
    // Se non è in corso una simulazione né uno scalo reale oggi, pre-seleziona l'ultimo porto aperto
    if (!countdown.simulation && !countdown.todayPort) {
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

  const handleToggleCheck = (stopId: string) => {
    setCheckedStops(prev => ({
      ...prev,
      [stopId]: !prev[stopId]
    }));
  };

  const handleResetProgress = () => {
    setCheckedStops({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
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
  const isCountdownView = activeViewId === 'countdown';
  const currentPortIndex = resolvedPorts.findIndex(p => p.id === (isCountdownView ? lastPortId : activeViewId));
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

  const prevPort = currentPortIndex > 0 ? resolvedPorts[currentPortIndex - 1] : null;
  const nextPort = currentPortIndex < resolvedPorts.length - 1 ? resolvedPorts[currentPortIndex + 1] : null;

  // Banner live compatto mostrato nello scalo attivo se oggi è il suo giorno (o in modalità prova)
  const matchingLiveBanner =
    !isCountdownView &&
    countdown.activeLiveCountdown &&
    countdown.activeLiveCountdown.port.portId === activePort.id
      ? countdown.activeLiveCountdown
      : null;

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header Mobile First */}
      <Header
        currentPortName={isCountdownView ? 'Tutti a Bordo' : activePort.citta}
        onOpenCruiseInfo={() => setIsCruiseModalOpen(true)}
        onDownloadOfflineBundle={() => setIsOfflineModalOpen(true)}
      />

      {/* Barra Tabs Orizzontale (A Bordo + 5 Porti) */}
      <PortTabs
        ports={resolvedPorts}
        activeViewId={activeViewId}
        onSelectPort={handleSelectPort}
        onSelectCountdown={handleSelectCountdown}
        checkedStopsByPort={checkedStopsByPort}
        activeLiveCountdown={countdown.activeLiveCountdown}
        isBeforeCruise={countdown.isBeforeCruise}
        preCruiseRemainingMs={countdown.preCruiseRemainingMs}
      />

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
        {isCountdownView ? (
          <CountdownView
            selectedPortId={countdown.selectedPortId}
            onSelectPortId={countdown.setSelectedPortId}
            inspectedCountdown={countdown.inspectedCountdown}
            isBeforeCruise={countdown.isBeforeCruise}
            preCruiseRemainingMs={countdown.preCruiseRemainingMs}
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

            {/* Selettore Variante Itinerario (se lo scalo offre percorsi alternativi) */}
            {activePort.varianti && activePort.varianti.length > 1 && (
              <section
                aria-label="Selezione variante itinerario"
                className="bg-slate-900/95 border border-cyan-500/35 rounded-2xl p-3.5 shadow-lg no-print"
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4 text-cyan-400 shrink-0" />
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      Scegli Percorso Giorno {activePort.giornoNumero}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activePort.varianti.length} varianti pronte
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activePort.varianti.map((variant, idx) => {
                    const isSelected = variant.id === activeVariantId;
                    const optionLetter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleSelectVariant(activePort.id, variant.id)}
                        aria-pressed={isSelected}
                        className={`text-left rounded-xl p-3 border transition-all active:scale-[0.98] ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
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
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-sm font-extrabold leading-snug text-white">
                          {variant.label}
                        </div>
                        <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {variant.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Scheda Logistica del Porto */}
            <LogisticsCard
              port={activePort}
              checkedStops={currentPortCheckedIds}
            />

            {/* Suite Offline per Tunisia (La Goletta) */}
            {activePort.id === 'la-goletta' && (
              <TunisiaOfflineSuite
                onOpenWiki={(slug) => setSelectedWikiSlug(slug)}
              />
            )}

            {/* Card Esperienza Gastronomica Cult (condizionale) */}
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

            {/* Navigazione Veloce tra Porti Precedente / Successivo */}
            <nav 
              aria-label="Navigazione tra scali successivi" 
              className="pt-4 pb-8 grid grid-cols-2 gap-2.5 w-full no-print"
            >
              {prevPort ? (
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

              {nextPort ? (
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

      {/* Footer minimalista */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-400 no-print">
        <p className="max-w-md mx-auto">
          MSC Euribia • 23-30 Nov 2026 • Realizzato per 4 viaggiatori (35enni).
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Tutti i dati, mappe e checklist sono salvati localmente sul dispositivo per un utilizzo 100% offline a bordo.
        </p>
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

      {/* Indicatore stato Offline / Cache pronta */}
      <OfflineIndicator />
    </div>
  );
}
