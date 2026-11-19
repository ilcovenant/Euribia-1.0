/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortItinerary, Stop } from '../types/itinerary';
import { TUNISIA_WIKI_ARTICLES, TUNISIA_PHRASEBOOK, TUNISIA_CURRENCY } from '../data/tunisiaWikiData';

/**
 * Calcola le statistiche di completamento delle tappe di un porto
 */
export function calculateCompletedStats(stops: Stop[], checkedStopIds: string[]) {
  const total = stops.length;
  if (total === 0) return { total: 0, completed: 0, percent: 0, completedKm: 0, remainingKm: 0 };

  const checkedSet = new Set(checkedStopIds);
  let completed = 0;
  let completedKm = 0;
  let totalKm = 0;

  for (const stop of stops) {
    totalKm += stop.kmParziali;
    if (checkedSet.has(stop.id)) {
      completed++;
      completedKm += stop.kmParziali;
    }
  }

  const percent = Math.round((completed / total) * 100);
  const remainingKm = Math.max(0, parseFloat((totalKm - completedKm).toFixed(1)));

  return {
    total,
    completed,
    percent,
    completedKm: parseFloat(completedKm.toFixed(1)),
    remainingKm
  };
}

/**
 * Genera il link di ricerca Google Maps per una singola tappa
 */
export function generateStopGoogleMapsUrl(query: string, nome?: string): string {
  const searchQuery = encodeURIComponent(query || nome || '');
  return `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
}

/**
 * Genera il link Google Maps per il percorso a piedi multi-tappa
 */
export function generateGoogleMapsRouteUrl(stops: Stop[]): string {
  if (!stops || stops.length === 0) return 'https://www.google.com/maps';
  if (stops.length === 1) return generateStopGoogleMapsUrl(stops[0].query, stops[0].nome);

  const origin = encodeURIComponent(stops[0].query);
  const destination = encodeURIComponent(stops[stops.length - 1].query);
  
  // Tappe intermedie (waypoints)
  const waypoints = stops
    .slice(1, -1)
    .map(s => encodeURIComponent(s.query))
    .join('|');

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
  if (waypoints) {
    url += `&waypoints=${waypoints}`;
  }
  return url;
}

/**
 * Formatta l'itinerario del porto per condivisione veloce su WhatsApp / Telegram
 */
export function formatItineraryForSharing(port: PortItinerary): string {
  const header = `🚢 *MSC EURIBIA – GIORNO ${port.giornoNumero}: ${port.porto.toUpperCase()}* ${port.bandiera}\n📅 ${port.dataGiorno}\n⏱️ Attracco: ${port.orarioAttracco} | Tutti a bordo: ${port.orarioTuttiABordo} (Partenza: ${port.orarioPartenza})\n🚶 Finestra utile: ${port.durataFinestraOre} (~${port.kmTotaliStimati} km a piedi)\n`;
  
  const logistics = `\n📍 *LOGISTICA MOLO & USCITA:*\n• Molo: ${port.infoLogisticaMolo.nomeMolo}\n• Mezzo: ${port.infoLogisticaMolo.mezzoConsigliato}\n• Costo transfer: ${port.infoLogisticaMolo.costoTransfer}\n• Dritta: ${port.infoLogisticaMolo.consiglioRisparmio}\n`;
  
  let food = '';
  if (port.sostaGolosaTop) {
    food = `\n👑 *ESPERIENZA GASTRONOMICA CULT:*\n• Locale: ${port.sostaGolosaTop.locale}\n• Specialità: ${port.sostaGolosaTop.specialita}\n• Costo indicativo: ${port.sostaGolosaTop.costoIndicativo}\n• Curiosità: ${port.sostaGolosaTop.curiosita}\n`;
  }

  const stopsList = port.tappe.map((t, idx) => {
    const emojiMap: Record<string, string> = {
      'Panorama': '🌅',
      'Parco': '🌳',
      'Storia': '🏛️',
      'Nerd/Pop': '🎬',
      'Archeologia': '🏺',
      'Architettura/Cult': '⛪',
      'Cibo Cult': '🍕',
      'Logistica': '🚌',
      'Ritorno': '⚓'
    };
    const emoji = emojiMap[t.tipologia] || '📍';
    let item = `${idx + 1}. ${emoji} *${t.orario}* – ${t.nome} (+${t.kmParziali} km)\n   ${t.descrizione}`;
    if (t.curiositaNerd) {
      item += `\n   💡 _${t.curiositaNerd}_`;
    }
    return item;
  }).join('\n\n');

  const footer = `\n\n🗺️ *Percorso Maps:* ${generateGoogleMapsRouteUrl(port.tappe)}\n_Generato dalla Guida Itinerari MSC Euribia_`;

  return `${header}${logistics}${food}\n📋 *PROGRAMMA TAPPE AD ANELLO:*\n\n${stopsList}${footer}`;
}

/**
 * Genera un file HTML5 100% autonomo con CSS incorporato e JavaScript puro.
 * Non dipende da CDN esterne (funziona al 100% offline su qualsiasi browser/smartphone in modalità aereo).
 */
export function generateSingleHtmlBundle(itineraries: PortItinerary[]): string {
  const jsonItineraries = JSON.stringify(itineraries);
  const jsonWiki = JSON.stringify(TUNISIA_WIKI_ARTICLES);
  const jsonPhrases = JSON.stringify(TUNISIA_PHRASEBOOK);
  const jsonCurrency = JSON.stringify(TUNISIA_CURRENCY);

  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>MSC Euribia – Guida & Itinerari Crociera (Offline)</title>
  <meta name="theme-color" content="#090d16">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #0f172a;
      --card-sub: #020617;
      --border: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --cyan: #06b6d4;
      --cyan-dark: #083344;
      --amber: #f59e0b;
      --amber-dark: #451a03;
      --emerald: #10b981;
      --emerald-dark: #064e3b;
      --rose: #f43f5e;
      --rose-dark: #4c0519;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: var(--bg); color: var(--text); line-height: 1.5; padding-bottom: 50px; }
    header { position: sticky; top: 0; z-index: 50; background: rgba(9, 13, 22, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 10px 16px; }
    .header-inner { max-width: 600px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .logo-box { display: flex; align-items: center; gap: 10px; }
    .logo-icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #06b6d4, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .logo-text h1 { font-size: 15px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 6px; }
    .badge-offline { font-size: 10px; padding: 2px 6px; border-radius: 9999px; background: var(--cyan-dark); color: #67e8f9; border: 1px solid #164e63; font-weight: 700; }
    .logo-text p { font-size: 11px; color: var(--text-muted); }
    
    .header-actions { display: flex; align-items: center; gap: 6px; }
    .btn-hdr { font-size: 11px; background: #1e293b; color: #f1f5f9; padding: 6px 10px; border-radius: 8px; border: 1px solid #334155; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s; }
    .btn-hdr.active { background: rgba(245, 158, 11, 0.25); color: #fde047; border-color: rgba(245, 158, 11, 0.6); }

    /* Tabs */
    .tabs-wrapper { max-width: 600px; margin: 10px auto 0; display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
    .tabs-wrapper::-webkit-scrollbar { display: none; }
    .tab-btn { flex-shrink: 0; display: flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; border: 1px solid var(--border); background: #0f172a; color: #cbd5e1; cursor: pointer; transition: all 0.2s; }
    .tab-btn.active { background: var(--cyan); color: #020617; font-weight: 800; border-color: #22d3ee; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3); }
    
    /* Main Content */
    main { max-width: 600px; margin: 0 auto; padding: 16px; }
    .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 18px; margin-bottom: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }

    /* Variant Switcher */
    .variant-card { background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(6, 182, 212, 0.35); border-radius: 18px; padding: 14px; margin-bottom: 14px; }
    .variant-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .variant-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #67e8f9; }
    .variant-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    @media (max-width: 480px) { .variant-grid { grid-template-columns: 1fr; } }
    .variant-btn { text-align: left; background: rgba(2, 6, 23, 0.75); border: 1px solid #1e293b; border-radius: 12px; padding: 10px 12px; cursor: pointer; color: #cbd5e1; transition: all 0.2s; }
    .variant-btn.active { background: rgba(6, 182, 212, 0.16); border-color: #22d3ee; color: #fff; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.15); }
    .variant-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
    .variant-tag { font-size: 10px; font-weight: 800; font-family: monospace; text-transform: uppercase; padding: 2px 6px; border-radius: 5px; background: #1e293b; color: #94a3b8; }
    .variant-btn.active .variant-tag { background: #06b6d4; color: #020617; }
    .variant-label { font-size: 13px; font-weight: 800; color: #fff; }
    .variant-badge { font-size: 11px; font-family: monospace; color: #94a3b8; margin-top: 2px; }
    .variant-btn.active .variant-badge { color: #67e8f9; }
    
    .meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px; }
    .tag-day { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #38bdf8; background: #082f49; padding: 3px 8px; border-radius: 9999px; border: 1px solid #0369a1; }
    .tag-km { font-size: 11px; font-weight: 800; background: #1e293b; color: #e2e8f0; padding: 3px 8px; border-radius: 9999px; border: 1px solid #334155; }
    .port-title { font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
    .port-subtitle { font-size: 12px; color: var(--text-muted); }
    
    /* Timings Grid */
    .timings-grid { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 8px; background: var(--card-sub); border: 1px solid var(--border); border-radius: 14px; padding: 10px; margin: 14px 0; text-align: center; }
    .time-col { display: flex; flex-direction: column; justify-content: center; }
    .time-label { font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }
    .time-val { font-size: 16px; font-weight: 900; color: #fff; font-family: monospace; }
    .time-sub { font-size: 10px; color: #38bdf8; }
    .all-aboard { background: rgba(69, 26, 3, 0.4); border-left: 1px solid rgba(245, 158, 11, 0.3); border-right: 1px solid rgba(245, 158, 11, 0.3); padding: 4px; border-radius: 8px; }
    .all-aboard .time-label { color: #fbbf24; font-weight: 800; }
    .all-aboard .time-val { color: #fde047; }
    .all-aboard .time-sub { color: #f59e0b; font-weight: 700; }
    
    /* Logistics Box */
    .logistics-box { background: rgba(2, 6, 23, 0.7); border: 1px solid var(--border); border-radius: 14px; padding: 12px; font-size: 12px; margin-bottom: 14px; }
    .log-item { display: flex; gap: 8px; margin-bottom: 6px; }
    .log-item strong { color: #e2e8f0; }
    .log-cost { display: inline-block; background: var(--emerald-dark); color: #6ee7b7; padding: 1px 6px; border-radius: 6px; font-size: 10px; font-weight: 700; margin-left: 4px; }
    .log-desc { font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 8px; margin-top: 6px; }
    .tip-box { background: rgba(8, 51, 68, 0.4); border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 10px; padding: 8px 10px; font-size: 11px; color: #bae6fd; margin-top: 8px; }
    
    /* Progress */
    .progress-bar-wrap { width: 100%; height: 8px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-top: 6px; }
    .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #06b6d4, #10b981); transition: width 0.3s; }
    
    /* Actions */
    .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border); }
    .btn-action { padding: 10px; border-radius: 12px; font-size: 12px; font-weight: 700; text-align: center; cursor: pointer; text-decoration: none; border: 1px solid transparent; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .btn-copy { background: #1e293b; color: #f1f5f9; border-color: #334155; }
    .btn-copy.copied { background: #059669; color: #fff; }
    .btn-map-all { background: var(--cyan); color: #020617; font-weight: 900; }
    
    /* Food Card */
    .card-food { background: linear-gradient(135deg, rgba(69, 26, 3, 0.4), rgba(76, 5, 25, 0.3), #0f172a); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 20px; padding: 16px; margin-bottom: 20px; }
    .food-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 9999px; background: rgba(245, 158, 11, 0.2); color: #fde047; border: 1px solid rgba(245, 158, 11, 0.4); margin-bottom: 6px; }
    .food-venue { font-size: 18px; font-weight: 900; color: #fff; }
    .food-specialty { font-size: 14px; font-weight: 700; color: #fcd34d; margin-bottom: 6px; }
    .food-desc { font-size: 14px; color: #f1f5f9; line-height: 1.55; margin-bottom: 10px; }
    .food-curiosity { background: rgba(2, 6, 23, 0.9); border: 1px solid var(--border); border-radius: 10px; padding: 10px; font-size: 13px; color: #cbd5e1; line-height: 1.5; }

    /* TUNISIA OFFLINE SUITE CARD */
    .suite-card { background: linear-gradient(180deg, #0f172a, #020617); border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 22px; padding: 16px; margin-bottom: 20px; }
    .suite-header { margin-bottom: 12px; }
    .suite-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 9999px; background: #083344; color: #67e8f9; border: 1px solid #164e63; }
    .suite-title { font-size: 16px; font-weight: 800; color: #fff; margin-top: 4px; }
    .suite-desc { font-size: 12px; color: #94a3b8; }
    
    .suite-tabs-nav { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 12px 0; background: #020617; padding: 4px; border-radius: 14px; border: 1px solid #1e293b; }
    .suite-tab-btn { padding: 6px 2px; font-size: 11px; font-weight: 700; border-radius: 10px; border: none; background: transparent; color: #94a3b8; cursor: pointer; text-align: center; }
    .suite-tab-btn.active { background: var(--cyan); color: #020617; font-weight: 900; }
    .suite-tab-btn.active.sos-tab { background: #f43f5e; color: #fff; }
    
    .wiki-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    @media (max-width: 500px) { .wiki-grid { grid-template-columns: 1fr; } }
    .wiki-tile { background: #090d16; border: 1px solid #1e293b; border-radius: 14px; padding: 10px; cursor: pointer; text-align: left; color: inherit; transition: all 0.2s; }
    .wiki-tile:hover { border-color: var(--cyan); }
    .wiki-tile-title { font-size: 13px; font-weight: 800; color: #fff; margin-bottom: 2px; }
    .wiki-tile-sub { font-size: 11px; color: #94a3b8; line-height: 1.3; }
    
    /* Converter */
    .conv-box { background: #020617; border: 1px solid #1e293b; border-radius: 14px; padding: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
    .conv-field label { display: block; font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 4px; }
    .conv-field input { width: 100%; background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 8px; color: #fff; font-size: 15px; font-family: monospace; font-weight: 700; }
    .conv-presets { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .btn-preset { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 6px; text-align: left; cursor: pointer; font-size: 11px; color: #cbd5e1; }
    .btn-preset strong { color: #67e8f9; font-family: monospace; }
    
    /* Phrasebook */
    .phrase-card { background: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 10px; margin-bottom: 6px; }
    .phrase-ar { font-size: 16px; font-weight: bold; color: #fde047; direction: rtl; text-align: right; }
    .phrase-tr { font-size: 12px; font-weight: 700; color: #fff; font-family: monospace; margin: 2px 0; }
    .phrase-it { font-size: 12px; color: #cbd5e1; }
    .phrase-fr { font-size: 11px; color: #64748b; font-style: italic; }

    /* SOS Box */
    .sos-content { background: rgba(76, 5, 25, 0.25); border: 1px solid rgba(244, 63, 94, 0.4); border-radius: 14px; padding: 12px; font-size: 12px; color: #ffe4e6; line-height: 1.5; }
    
    /* Timeline Stops */
    .timeline { position: relative; margin-top: 10px; }
    .stop-item { position: relative; padding-left: 34px; padding-bottom: 22px; }
    .stop-line { position: absolute; left: 11px; top: 24px; bottom: 0; width: 2px; background: #1e293b; }
    .stop-item.checked .stop-line { background: rgba(16, 185, 129, 0.3); }
    .stop-circle { position: absolute; left: 0; top: 0; width: 24px; height: 24px; border-radius: 50%; background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; cursor: pointer; font-family: monospace; }
    .stop-item.checked .stop-circle { background: #10b981; color: #020617; border-color: #10b981; }
    
    .stop-card { background: rgba(15, 23, 42, 0.9); border: 1px solid var(--border); border-radius: 16px; padding: 16px; }
    .stop-item.checked .stop-card { border-color: rgba(16, 185, 129, 0.4); background: rgba(6, 78, 59, 0.1); }
    .stop-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 4px; }
    .stop-time { font-size: 12px; font-family: monospace; font-weight: 700; color: #38bdf8; background: #082f49; padding: 3px 8px; border-radius: 6px; }
    .stop-type { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 9999px; border: 1px solid #334155; }
    .type-panorama { background: rgba(245, 158, 11, 0.2); color: #fde047; border-color: rgba(245, 158, 11, 0.4); }
    .type-storia { background: rgba(59, 130, 246, 0.2); color: #93c5fd; border-color: rgba(59, 130, 246, 0.4); }
    .type-nerd { background: rgba(168, 85, 247, 0.2); color: #d8b4fe; border-color: rgba(168, 85, 247, 0.4); }
    .type-parco { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border-color: rgba(16, 185, 129, 0.4); }
    .type-cibo { background: rgba(244, 63, 94, 0.2); color: #fda4af; border-color: rgba(244, 63, 94, 0.4); }
    .type-archeo { background: rgba(249, 115, 22, 0.2); color: #fdba74; border-color: rgba(249, 115, 22, 0.4); }
    .type-arch { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border-color: rgba(99, 102, 241, 0.45); }
    
    .stop-title { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 6px; }
    .stop-item.checked .stop-title { text-decoration: line-through; color: #64748b; }
    .stop-desc { font-size: 14px; color: #e2e8f0; line-height: 1.55; margin-bottom: 10px; font-weight: 400; }
    .nerd-box { background: rgba(2, 6, 23, 0.95); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; font-size: 13px; color: #cbd5e1; margin-bottom: 12px; line-height: 1.5; }
    .nerd-box strong { color: #f8fafc; font-weight: 700; }
    
    .stop-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 10px; flex-wrap: wrap; gap: 8px; }
    .check-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #cbd5e1; cursor: pointer; }
    .stop-btns { display: flex; align-items: center; gap: 6px; }
    .btn-wiki { font-size: 12px; background: #083344; color: #67e8f9; padding: 6px 10px; border-radius: 10px; border: 1px solid #164e63; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
    .btn-maps { font-size: 12px; background: #1e293b; color: #38bdf8; padding: 6px 12px; border-radius: 10px; border: 1px solid #334155; text-decoration: none; font-weight: 700; }

    /* WIKIPEDIA MODAL */
    .wiki-modal-backdrop { display: none; position: fixed; inset: 0; z-index: 100; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(6px); align-items: flex-end; justify-content: center; }
    .wiki-modal-backdrop.open { display: flex; }
    @media (min-width: 640px) { .wiki-modal-backdrop { align-items: center; padding: 16px; } }
    .wiki-modal { background: #0f172a; border: 1px solid #334155; border-radius: 24px 24px 0 0; width: 100%; max-width: 620px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
    @media (min-width: 640px) { .wiki-modal { border-radius: 24px; } }
    .wiki-modal-hdr { background: #020617; border-bottom: 1px solid #1e293b; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; }
    .wiki-modal-title { font-size: 16px; font-weight: 800; color: #fff; }
    .wiki-modal-close { background: #1e293b; border: none; color: #fff; width: 30px; height: 30px; border-radius: 50%; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .wiki-modal-body { padding: 18px; overflow-y: auto; font-size: 14px; line-height: 1.6; color: #e2e8f0; }
    .wiki-abstract { background: rgba(8, 51, 68, 0.3); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 12px; margin-bottom: 16px; color: #cffafe; }
    .wiki-sec-title { font-size: 15px; font-weight: 700; color: #fff; margin: 14px 0 6px; border-left: 3px solid var(--cyan); padding-left: 8px; }
    .wiki-nerds { background: rgba(69, 26, 3, 0.3); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 12px; margin-top: 16px; font-size: 13px; color: #fef3c7; }
    
    @media print {
      body { background: #fff !important; color: #000 !important; }
      header, .tabs-wrapper, .variant-card, .actions-grid, .btn-maps, .btn-wiki, .suite-card, .check-label input { display: none !important; }
      .card, .card-food, .stop-card { border: 1px solid #cbd5e1 !important; background: #fff !important; color: #000 !important; box-shadow: none !important; }
      .stop-title, .port-title, .food-venue { color: #000 !important; }
      .stop-desc, .food-desc, .log-desc { color: #334155 !important; }
    }
  </style>
</head>
<body>

  <header>
    <div class="header-inner">
      <div class="logo-box">
        <div class="logo-icon">🚢</div>
        <div class="logo-text">
          <h1>MSC Euribia <span class="badge-offline">Offline</span></h1>
          <p>4 Amici (35enni) • Guida Itinerari</p>
        </div>
      </div>
      <div class="header-actions">
        <button id="wakeLockBtn" onclick="toggleWakeLock()" class="btn-hdr" title="Tieni lo schermo sempre acceso mentre cammini per strada">🌙 Schermo</button>
        <button onclick="window.print()" class="btn-hdr">🖨️ PDF</button>
      </div>
    </div>
    <div class="tabs-wrapper" id="portTabs"></div>
  </header>

  <main id="mainContainer"></main>

  <!-- Wikipedia Modal Offline Container -->
  <div id="wikiModalBackdrop" class="wiki-modal-backdrop" onclick="closeWikiModal(event)">
    <div class="wiki-modal" onclick="event.stopPropagation()">
      <div class="wiki-modal-hdr">
        <div>
          <div style="font-size:10px; color:#67e8f9; font-weight:bold; text-transform:uppercase;">📖 Enciclopedia Offline • Senza Roaming</div>
          <h3 id="wikiModalTitle" class="wiki-modal-title">Titolo Articolo</h3>
        </div>
        <button class="wiki-modal-close" onclick="closeWikiModal()">✕</button>
      </div>
      <div id="wikiModalBody" class="wiki-modal-body"></div>
      <div style="padding:10px; background:#020617; border-top:1px solid #1e293b; text-align:center;">
        <button onclick="closeWikiModal()" style="width:100%; padding:10px; border-radius:12px; background:var(--cyan); color:#020617; font-weight:bold; border:none; cursor:pointer;">Torna all’Itinerario</button>
      </div>
    </div>
  </div>

  <script>
    var ITINERARIES = ${jsonItineraries};
    var WIKI = ${jsonWiki};
    var PHRASES = ${jsonPhrases};
    var CURRENCY = ${jsonCurrency};

    var currentPortId = ITINERARIES[0].id;
    var currentSuiteTab = 'wiki';
    var checkedStops = {};
    var selectedVariants = {};
    var wakeLockActive = false;
    var wakeLockObj = null;

    try {
      var saved = localStorage.getItem('msc_checked_stops_v1');
      if (saved) checkedStops = JSON.parse(saved);
    } catch(e) {}

    try {
      var savedVariants = localStorage.getItem('msc_selected_variants_v1');
      if (savedVariants) selectedVariants = JSON.parse(savedVariants);
    } catch(e) {}

    function getResolvedPort(port) {
      if (!port || !port.varianti || port.varianti.length === 0) return port;
      var selId = selectedVariants[port.id];
      var v = port.varianti.find(function(item) { return item.id === selId; }) || port.varianti[0];
      return Object.assign({}, port, {
        porto: v.portoTitolo,
        kmTotaliStimati: v.kmTotaliStimati,
        infoLogisticaMolo: v.infoLogisticaMolo,
        tappe: v.tappe,
        activeVariantId: v.id
      });
    }

    function selectVariant(portId, variantId) {
      selectedVariants[portId] = variantId;
      try {
        localStorage.setItem('msc_selected_variants_v1', JSON.stringify(selectedVariants));
      } catch(e) {}
      render();
    }

    // Screen Wake Lock API
    function toggleWakeLock() {
      if (!('wakeLock' in navigator)) {
        alert('Wake Lock non supportato da questo browser.');
        return;
      }
      if (wakeLockActive) {
        if (wakeLockObj) wakeLockObj.release();
        wakeLockObj = null;
        wakeLockActive = false;
        updateWakeLockUI();
      } else {
        navigator.wakeLock.request('screen').then(function(lock) {
          wakeLockObj = lock;
          wakeLockActive = true;
          lock.addEventListener('release', function() {
            wakeLockActive = false;
            wakeLockObj = null;
            updateWakeLockUI();
          });
          updateWakeLockUI();
        }).catch(function(err) {
          console.warn('Wake Lock error:', err);
        });
      }
    }

    function updateWakeLockUI() {
      var btn = document.getElementById('wakeLockBtn');
      if (!btn) return;
      if (wakeLockActive) {
        btn.innerHTML = '☀️ Schermo ON';
        btn.classList.add('active');
      } else {
        btn.innerHTML = '🌙 Schermo';
        btn.classList.remove('active');
      }
    }

    // Modal Wikipedia Offline
    function openWikiModal(slug) {
      var art = WIKI[slug] || WIKI['sidi-bou-said'];
      if (!art) return;

      document.getElementById('wikiModalTitle').innerText = art.titolo;
      
      var bHtml = '<p style="font-size:12px; color:#67e8f9; font-style:italic; margin-bottom:10px;">' + art.sottotitolo + '</p>' +
        '<div style="font-size:11px; color:#94a3b8; margin-bottom:12px; display:flex; gap:6px; flex-wrap:wrap;">' +
          '<span style="background:#1e293b; padding:2px 6px; border-radius:4px;">📅 ' + art.periodoStorico + '</span>' +
          '<span style="background:#1e293b; padding:2px 6px; border-radius:4px;">🏛️ ' + art.categoria + '</span>' +
          '<span style="background:#1e293b; padding:2px 6px; border-radius:4px;">⏱️ ' + art.letturaMinuti + ' min</span>' +
        '</div>' +
        '<div class="wiki-abstract">' + art.sommario + '</div>';

      art.sezioni.forEach(function(s) {
        bHtml += '<h4 class="wiki-sec-title">' + s.titolo + '</h4>' +
          '<p style="margin-bottom:12px; font-size:13.5px; color:#cbd5e1;">' + s.contenuto + '</p>';
      });

      if (art.curiositaInedite && art.curiositaInedite.length > 0) {
        bHtml += '<div class="wiki-nerds"><strong>💡 Curiosità Inedite da Sapere sul Posto:</strong><ul style="margin-top:6px; padding-left:18px;">';
        art.curiositaInedite.forEach(function(c) {
          bHtml += '<li style="margin-bottom:4px;">' + c + '</li>';
        });
        bHtml += '</ul></div>';
      }

      document.getElementById('wikiModalBody').innerHTML = bHtml;
      document.getElementById('wikiModalBackdrop').classList.add('open');
    }

    function closeWikiModal(e) {
      if (e && e.target && e.target.id !== 'wikiModalBackdrop' && !e.target.classList.contains('wiki-modal-close')) return;
      document.getElementById('wikiModalBackdrop').classList.remove('open');
    }

    function switchSuiteTab(tab) {
      currentSuiteTab = tab;
      render();
    }

    function calcConvEur(val) {
      var num = parseFloat(val);
      var tndEl = document.getElementById('convTnd');
      if (tndEl && !isNaN(num)) {
        tndEl.value = (num * CURRENCY.eurToTnd).toFixed(2);
      }
    }

    function calcConvTnd(val) {
      var num = parseFloat(val);
      var eurEl = document.getElementById('convEur');
      if (eurEl && !isNaN(num)) {
        eurEl.value = (num * CURRENCY.tndToEur).toFixed(2);
      }
    }

    function applyPresetTnd(tnd) {
      var tndEl = document.getElementById('convTnd');
      var eurEl = document.getElementById('convEur');
      if (tndEl && eurEl) {
        tndEl.value = Number(tnd).toFixed(2);
        eurEl.value = (tnd * CURRENCY.tndToEur).toFixed(2);
      }
    }

    function toggleStop(stopId) {
      checkedStops[stopId] = !checkedStops[stopId];
      try {
        localStorage.setItem('msc_checked_stops_v1', JSON.stringify(checkedStops));
      } catch(e) {}
      render();
    }

    function selectPort(id) {
      currentPortId = id;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function copyItinerary(portId, btn) {
      var rawPort = ITINERARIES.find(function(p) { return p.id === portId; });
      if (!rawPort) return;
      var port = getResolvedPort(rawPort);

      var text = "🚢 MSC EURIBIA – GIORNO " + port.giornoNumero + ": " + port.porto.toUpperCase() + " " + port.bandiera + "\\n" +
        "📅 " + port.dataGiorno + "\\n" +
        "⏱️ Attracco: " + port.orarioAttracco + " | Tutti a bordo: " + port.orarioTuttiABordo + " (Partenza: " + port.orarioPartenza + ")\\n" +
        "🚶 Giro a piedi: ~" + port.kmTotaliStimati + " km anello\\n\\n" +
        "📍 MOLO & TRASFERIMENTO:\\n" +
        "• Molo: " + port.infoLogisticaMolo.nomeMolo + "\\n" +
        "• Mezzo: " + port.infoLogisticaMolo.mezzoConsigliato + " (" + port.infoLogisticaMolo.costoTransfer + ")\\n" +
        "• Dritta: " + port.infoLogisticaMolo.consiglioRisparmio + "\\n\\n" +
        "📋 PROGRAMMA TAPPE:\\n";

      port.tappe.forEach(function(t, idx) {
        text += (idx + 1) + ". " + t.orario + " – " + t.nome + " (+" + t.kmParziali + " km)\\n   " + t.descrizione + "\\n";
        if (t.curiositaNerd) text += "   💡 " + t.curiositaNerd + "\\n";
      });

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          btn.innerText = "✅ Copiato!";
          btn.classList.add("copied");
          setTimeout(function() {
            btn.innerText = "📋 Copia per Chat";
            btn.classList.remove("copied");
          }, 2000);
        });
      }
    }

    function renderTabs() {
      var tabsContainer = document.getElementById('portTabs');
      var html = '';
      ITINERARIES.forEach(function(p) {
        var isActive = p.id === currentPortId;
        var cls = 'tab-btn' + (isActive ? ' active' : '');
        html += '<button onclick="selectPort(\\'' + p.id + '\\')" class="' + cls + '">' +
          '<span>' + p.bandiera + '</span>' +
          '<span>' + p.porto.split(' ')[0] + '</span>' +
          '<span style="font-size:10px; opacity:0.8;">G' + p.giornoNumero + '</span>' +
          '</button>';
      });
      tabsContainer.innerHTML = html;
    }

    function renderTunisiaSuite() {
      var tab = currentSuiteTab;
      var html = '<div class="suite-card">' +
        '<div class="suite-header">' +
          '<div style="display:flex; justify-content:space-between; align-items:center;">' +
            '<span class="suite-badge">🇹🇳 Kit Salvavita Offline (No Roaming)</span>' +
            '<span style="font-size:10px; color:#10b981; font-weight:bold;">✈️ 100% Locale</span>' +
          '</div>' +
          '<h3 class="suite-title">Pocket Toolkit: La Goletta & Cartagine</h3>' +
          '<p class="suite-desc">In Tunisia non vi è roaming UE: enciclopedia offline, convertitore valuta e frasario integrati.</p>' +
        '</div>' +

        '<div class="suite-tabs-nav">' +
          '<button onclick="switchSuiteTab(\\'wiki\\')" class="suite-tab-btn' + (tab === 'wiki' ? ' active' : '') + '">📖 Wiki</button>' +
          '<button onclick="switchSuiteTab(\\'conv\\')" class="suite-tab-btn' + (tab === 'conv' ? ' active' : '') + '">💱 Valuta</button>' +
          '<button onclick="switchSuiteTab(\\'phrases\\')" class="suite-tab-btn' + (tab === 'phrases' ? ' active' : '') + '">🗣️ Frasario</button>' +
          '<button onclick="switchSuiteTab(\\'sos\\')" class="suite-tab-btn sos-tab' + (tab === 'sos' ? ' active' : '') + '">🆘 SOS</button>' +
        '</div>';

      if (tab === 'wiki') {
        html += '<div class="wiki-grid">';
        Object.keys(WIKI).forEach(function(k) {
          var w = WIKI[k];
          html += '<div class="wiki-tile" onclick="openWikiModal(\\'' + w.slug + '\\')">' +
            '<div style="font-size:10px; color:#38bdf8; font-family:monospace; margin-bottom:2px;">' + w.letturaMinuti + ' min • ' + w.categoria + '</div>' +
            '<div class="wiki-tile-title">' + w.titolo.split('(')[0] + '</div>' +
            '<div class="wiki-tile-sub">' + w.sottotitolo + '</div>' +
            '<div style="font-size:11px; color:#06b6d4; font-weight:bold; margin-top:6px;">Leggi articolo ↗</div>' +
          '</div>';
        });
        html += '</div>';
      } else if (tab === 'conv') {
        html += '<div class="conv-box">' +
          '<div class="conv-field">' +
            '<label>Euro (€ EUR)</label>' +
            '<input type="number" id="convEur" value="10" oninput="calcConvEur(this.value)">' +
          '</div>' +
          '<div class="conv-field">' +
            '<label>Dinari Tunisini (TND)</label>' +
            '<input type="number" id="convTnd" value="33.50" oninput="calcConvTnd(this.value)">' +
          '</div>' +
        '</div>' +
        '<div style="font-size:11px; color:#94a3b8; margin-bottom:6px; font-weight:bold;">Tocca un prezzo tipico per calcolare:</div>' +
        '<div class="conv-presets">';
        CURRENCY.quickPresets.forEach(function(pr) {
          html += '<button onclick="applyPresetTnd(' + pr.tnd + ')" class="btn-preset">' +
            '<div><strong>' + pr.tnd.toFixed(2) + ' TND</strong> <span style="font-size:10px; color:#94a3b8;">(~' + pr.eur.toFixed(2) + '€)</span></div>' +
            '<div style="font-size:10px; color:#cbd5e1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + pr.label + '</div>' +
          '</button>';
        });
        html += '</div>';
      } else if (tab === 'phrases') {
        html += '<div style="max-height:280px; overflow-y:auto; padding-right:4px;">';
        PHRASES.forEach(function(p) {
          html += '<div class="phrase-card">' +
            '<div class="phrase-ar">' + p.arabo + '</div>' +
            '<div class="phrase-tr">🗣️ "' + p.traslitterazione + '"</div>' +
            '<div class="phrase-it">🇮🇹 ' + p.italiano + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else if (tab === 'sos') {
        html += '<div class="sos-content">' +
          '<div style="font-weight:bold; font-size:13px; color:#fca5a5; margin-bottom:4px;">⚠️ Limite Improrogabile: Tutti a Bordo ore 17:15</div>' +
          '<p style="margin-bottom:8px;">La nave chiude la passerella e salpa alle 18:00. Dalle 15:30 in poi sarete già a La Goletta a 600m dalla nave.</p>' +
          '<div style="background:#020617; border:1px solid #7f1d1d; border-radius:8px; padding:8px; margin-bottom:8px; font-family:monospace; font-size:11px;">' +
            '<strong>Destinazione Taxi / Bolt:</strong><br>' +
            'Terminal Croisières - Goulette Village<br>' +
            'Port de La Goulette (Halq al-Wadi)' +
          '</div>' +
          '<p style="font-size:11px; color:#fecdd3;">Mostra sempre la MSC Cruise Card al tassista o dì: <em>"Mina Halq al-Wadi – Bateau MSC"</em>.</p>' +
        '</div>';
      }

      html += '</div>';
      return html;
    }

    function render() {
      renderTabs();
      var rawPort = ITINERARIES.find(function(p) { return p.id === currentPortId; }) || ITINERARIES[0];
      var port = getResolvedPort(rawPort);
      var container = document.getElementById('mainContainer');

      var totalStops = port.tappe.length;
      var completedCount = 0;
      var completedKm = 0;
      port.tappe.forEach(function(t) {
        if (checkedStops[t.id]) {
          completedCount++;
          completedKm += t.kmParziali;
        }
      });
      var percent = totalStops > 0 ? Math.round((completedCount / totalStops) * 100) : 0;
      var remainingKm = Math.max(0, (port.kmTotaliStimati - completedKm)).toFixed(1);

      // Multi-stop Google Maps URL
      var origin = encodeURIComponent(port.tappe[0].query);
      var dest = encodeURIComponent(port.tappe[port.tappe.length - 1].query);
      var waypoints = port.tappe.slice(1, -1).map(function(s) { return encodeURIComponent(s.query); }).join('|');
      var mapUrl = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + dest + "&travelmode=walking" + (waypoints ? "&waypoints=" + waypoints : "");

      var html = '';

      if (rawPort.varianti && rawPort.varianti.length > 1) {
        html += '<div class="variant-card">' +
          '<div class="variant-hdr">' +
            '<span class="variant-title">🔀 Scegli Percorso Giorno ' + port.giornoNumero + '</span>' +
            '<span style="font-size:10px; color:#94a3b8; font-family:monospace;">' + rawPort.varianti.length + ' varianti pronte</span>' +
          '</div>' +
          '<div class="variant-grid">';
        rawPort.varianti.forEach(function(v, idx) {
          var isSel = v.id === port.activeVariantId;
          var optLetter = String.fromCharCode(65 + idx);
          html += '<button type="button" onclick="selectVariant(\\'' + rawPort.id + '\\', \\'' + v.id + '\\')" class="variant-btn' + (isSel ? ' active' : '') + '">' +
            '<div class="variant-top">' +
              '<span class="variant-tag">Opzione ' + optLetter + '</span>' +
              (isSel ? '<span style="color:#22d3ee; font-size:12px;">✓</span>' : '') +
            '</div>' +
            '<div class="variant-label">' + v.label + '</div>' +
            '<div class="variant-badge">' + v.badge + '</div>' +
          '</button>';
        });
        html += '</div></div>';
      }

      html += '<div class="card">' +
        '<div class="meta-row">' +
          '<span class="tag-day">Giorno ' + port.giornoNumero + ' • ' + port.dataGiorno + '</span>' +
          '<span class="tag-km">~' + port.kmTotaliStimati + ' km a piedi</span>' +
        '</div>' +
        '<h2 class="port-title">' + port.bandiera + ' ' + port.porto + '</h2>' +
        '<p class="port-subtitle">Circuito ad anello ottimizzato • ' + port.durataFinestraOre + '</p>' +

        '<div class="timings-grid">' +
          '<div class="time-col">' +
            '<span class="time-label">Attracco</span>' +
            '<span class="time-val">' + port.orarioAttracco + '</span>' +
            '<span class="time-sub">Sbarco ~' + port.orarioSbarcoStimato + '</span>' +
          '</div>' +
          '<div class="time-col all-aboard">' +
            '<span class="time-label">⚠️ Tutti a Bordo</span>' +
            '<span class="time-val">' + port.orarioTuttiABordo + '</span>' +
            '<span class="time-sub">-45 min limite</span>' +
          '</div>' +
          '<div class="time-col">' +
            '<span class="time-label">Partenza</span>' +
            '<span class="time-val">' + port.orarioPartenza + '</span>' +
            '<span class="time-sub">Chiusura passerella</span>' +
          '</div>' +
        '</div>' +

        '<div class="logistics-box">' +
          '<div class="log-item"><span>⚓</span><div><strong>Molo:</strong> ' + port.infoLogisticaMolo.nomeMolo + '</div></div>' +
          '<div class="log-item"><span>🚌</span><div><strong>Transfer:</strong> ' + port.infoLogisticaMolo.mezzoConsigliato + ' <span class="log-cost">' + port.infoLogisticaMolo.costoTransfer + '</span></div></div>' +
          '<div class="log-desc">' + port.infoLogisticaMolo.istruzioniDettagliate + '</div>' +
          '<div class="tip-box">💡 <strong>Dritta Portuale:</strong> ' + port.infoLogisticaMolo.consiglioRisparmio + '</div>' +
        '</div>' +

        '<div style="margin-top:10px;">' +
          '<div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8; font-weight:600;">' +
            '<span>Progresso Tappe</span>' +
            '<span>' + completedCount + '/' + totalStops + ' (' + percent + '%) • ' + remainingKm + ' km rimasti</span>' +
          '</div>' +
          '<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:' + percent + '%;"></div></div>' +
        '</div>' +

        '<div class="actions-grid">' +
          '<button onclick="copyItinerary(\\'' + port.id + '\\', this)" class="btn-action btn-copy">📋 Copia per Chat</button>' +
          '<a href="' + mapUrl + '" target="_blank" rel="noopener noreferrer" class="btn-action btn-map-all">🗺️ Mappa Intero Anello</a>' +
        '</div>' +
      '</div>';

      // Se siamo a La Goletta, mostra il kit salvavita Tunisia
      if (port.id === 'la-goletta') {
        html += renderTunisiaSuite();
      }

      // Sosta Golosa Top
      if (port.sostaGolosaTop) {
        var foodMaps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(port.sostaGolosaTop.locale + " " + port.sostaGolosaTop.indirizzo);
        html += '<div class="card-food">' +
          '<div class="food-badge">👑 Esperienza Gastronomica Cult</div>' +
          '<div style="display:flex; justify-content:space-between; align-items:flex-start;">' +
            '<div>' +
              '<h3 class="food-venue">' + port.sostaGolosaTop.locale + '</h3>' +
              '<div class="food-specialty">✨ ' + port.sostaGolosaTop.specialita + '</div>' +
            '</div>' +
            '<span style="font-size:11px; background:#451a03; color:#fde047; padding:2px 8px; border-radius:6px; font-weight:bold; border:1px solid #78350f;">' + port.sostaGolosaTop.costoIndicativo + '</span>' +
          '</div>' +
          '<p class="food-desc">' + port.sostaGolosaTop.descrizione + '</p>' +
          '<div class="food-curiosity">💡 <strong>Curiosità Cult:</strong> ' + port.sostaGolosaTop.curiosita + '</div>' +
          '<div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#94a3b8;">' +
            '<span>📍 ' + port.sostaGolosaTop.indirizzo + '</span>' +
            '<a href="' + foodMaps + '" target="_blank" rel="noopener noreferrer" style="color:#fde047; font-weight:bold; text-decoration:none;">Apri Maps ↗</a>' +
          '</div>' +
        '</div>';
      }

      // Timeline Tappe
      html += '<div class="timeline">';
      port.tappe.forEach(function(t, idx) {
        var isChecked = !!checkedStops[t.id];
        var isLast = idx === port.tappe.length - 1;
        var stopMapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(t.query);

        var typeCls = 'type-storia';
        if (t.tipologia === 'Panorama') typeCls = 'type-panorama';
        else if (t.tipologia === 'Nerd/Pop') typeCls = 'type-nerd';
        else if (t.tipologia === 'Parco') typeCls = 'type-parco';
        else if (t.tipologia === 'Cibo Cult') typeCls = 'type-cibo';
        else if (t.tipologia === 'Archeologia') typeCls = 'type-archeo';
        else if (t.tipologia === 'Architettura/Cult') typeCls = 'type-arch';

        html += '<div class="stop-item' + (isChecked ? ' checked' : '') + '">' +
          (!isLast ? '<div class="stop-line"></div>' : '') +
          '<div class="stop-circle" onclick="toggleStop(\\'' + t.id + '\\')">' + (isChecked ? '✓' : (idx + 1)) + '</div>' +
          '<div class="stop-card">' +
            '<div class="stop-header">' +
              '<span class="stop-time">⏱️ ' + t.orario + '</span>' +
              '<div style="display:flex; gap:6px; align-items:center;">' +
                '<span class="stop-type ' + typeCls + '">' + t.tipologia + '</span>' +
                '<span style="font-size:10px; color:#94a3b8; font-family:monospace;">+' + t.kmParziali + ' km</span>' +
              '</div>' +
            '</div>' +
            '<h4 class="stop-title">' + t.nome + '</h4>' +
            '<p class="stop-desc">' + t.descrizione + '</p>' +
            (t.curiositaNerd ? '<div class="nerd-box">🎬 <strong>Curiosità & Pop:</strong> ' + t.curiositaNerd + '</div>' : '') +
            '<div class="stop-footer">' +
              '<label class="check-label">' +
                '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onchange="toggleStop(\\'' + t.id + '\\')">' +
                '<span>' + (isChecked ? 'Tappa visitata' : 'Segna come visitata') + '</span>' +
              '</label>' +
              '<div class="stop-btns">' +
                (t.wikiSlug ? '<button type="button" class="btn-wiki" onclick="openWikiModal(\\'' + t.wikiSlug + '\\')">📖 Wiki Offline</button>' : '') +
                '<a href="' + stopMapUrl + '" target="_blank" rel="noopener noreferrer" class="btn-maps">📍 Maps</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      });
      html += '</div>';

      container.innerHTML = html;
    }

    render();
  </script>
</body>
</html>`;
}

