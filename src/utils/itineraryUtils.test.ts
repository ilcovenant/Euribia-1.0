/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { 
  calculateCompletedStats, 
  generateStopGoogleMapsUrl, 
  generateGoogleMapsRouteUrl, 
  formatItineraryForSharing,
  generateSingleHtmlBundle
} from './itineraryUtils';
import { itineraryData } from '../data/itineraryData';
import { STOP_IMAGES } from '../data/stopImages';
import { TUNISIA_WIKI_ARTICLES, TUNISIA_PHRASEBOOK, TUNISIA_CURRENCY } from '../data/tunisiaWikiData';
import { Stop } from '../types/itinerary';

test('calculateCompletedStats correctly computes progress percentages and km', () => {
  const dummyStops: Stop[] = [
    { id: 's1', orario: '10:00', nome: 'Tappa 1', descrizione: '', tipologia: 'Storia', kmParziali: 2.0, query: 'Q1' },
    { id: 's2', orario: '11:00', nome: 'Tappa 2', descrizione: '', tipologia: 'Panorama', kmParziali: 3.0, query: 'Q2' },
    { id: 's3', orario: '12:00', nome: 'Tappa 3', descrizione: '', tipologia: 'Ritorno', kmParziali: 1.0, query: 'Q3' }
  ];

  // Zero checked
  const stats0 = calculateCompletedStats(dummyStops, []);
  assert.equal(stats0.total, 3);
  assert.equal(stats0.completed, 0);
  assert.equal(stats0.percent, 0);
  assert.equal(stats0.completedKm, 0);
  assert.equal(stats0.remainingKm, 6.0);

  // One checked
  const stats1 = calculateCompletedStats(dummyStops, ['s1']);
  assert.equal(stats1.completed, 1);
  assert.equal(stats1.percent, 33);
  assert.equal(stats1.completedKm, 2.0);
  assert.equal(stats1.remainingKm, 4.0);

  // All checked
  const statsAll = calculateCompletedStats(dummyStops, ['s1', 's2', 's3']);
  assert.equal(statsAll.completed, 3);
  assert.equal(statsAll.percent, 100);
  assert.equal(statsAll.completedKm, 6.0);
  assert.equal(statsAll.remainingKm, 0);
});

test('generateStopGoogleMapsUrl produces valid search query URL', () => {
  const url = generateStopGoogleMapsUrl('Castel Nuovo Napoli');
  assert.ok(url.startsWith('https://www.google.com/maps/search/?api=1&query='));
  assert.ok(url.includes('Castel%20Nuovo%20Napoli'));
});

test('generateGoogleMapsRouteUrl generates multi-stop directions URL', () => {
  const stops: Stop[] = [
    { id: '1', orario: '', nome: 'A', descrizione: '', tipologia: 'Storia', kmParziali: 1, query: 'Piazza Municipio' },
    { id: '2', orario: '', nome: 'B', descrizione: '', tipologia: 'Storia', kmParziali: 1, query: 'Spaccanapoli' },
    { id: '3', orario: '', nome: 'C', descrizione: '', tipologia: 'Ritorno', kmParziali: 1, query: 'Porto Napoli' }
  ];

  const routeUrl = generateGoogleMapsRouteUrl(stops);
  assert.ok(routeUrl.includes('origin=Piazza%20Municipio'));
  assert.ok(routeUrl.includes('destination=Porto%20Napoli'));
  assert.ok(routeUrl.includes('waypoints=Spaccanapoli'));
  assert.ok(routeUrl.includes('travelmode=walking'));
});

test('itineraryData contains the requested 5 ports with valid ring itineraries', () => {
  assert.equal(itineraryData.length, 5);

  const portIds = itineraryData.map(p => p.id);
  assert.deepEqual(portIds, ['napoli', 'palermo', 'la-goletta', 'barcellona', 'marsiglia']);

  for (const port of itineraryData) {
    // Check km is reasonable ring (~6.5 to ~9.5 km)
    assert.ok(port.kmTotaliStimati >= 6.5 && port.kmTotaliStimati <= 9.5, `Port ${port.id} km out of range: ${port.kmTotaliStimati}`);
    // Check has real dock info
    assert.ok(port.infoLogisticaMolo.nomeMolo.length > 5);
    assert.ok(port.infoLogisticaMolo.mezzoConsigliato.length > 5);
    // Check at least 6 stops per port
    assert.ok(port.tappe.length >= 6);
    // Check every stop has query and title
    for (const stop of port.tappe) {
      assert.ok(stop.nome.length > 0);
      assert.ok(stop.query.length > 0);
      assert.ok(stop.orario.length > 0);
    }
    // Check format text
    const text = formatItineraryForSharing(port);
    assert.ok(text.includes('MSC EURIBIA'));
    assert.ok(text.includes(port.porto.toUpperCase()));
    assert.ok(text.includes('Tutti a bordo: ' + port.orarioTuttiABordo));
  }
});

test('generateSingleHtmlBundle produces valid HTML and script compiles with zero syntax errors', () => {
  const html = generateSingleHtmlBundle(itineraryData);
  assert.ok(html.includes('<!doctype html>'));
  assert.ok(html.includes('Piazza del Plebiscito'));
  assert.ok(html.includes('wikiModalBackdrop'));
  assert.ok(html.includes('openWikiModal'));
  assert.ok(html.includes('Sidi Bou Sa'));
  assert.ok(html.includes('Cothon'));
  assert.ok(html.includes('Tophet'));
  assert.ok(html.includes('wakeLockBtn'));
  assert.ok(html.includes('selectVariant'));
  assert.ok(html.includes('barcellona-sagrada'));
  
  // Extract script
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(scriptMatch, 'Script tag not found in bundle');
  const scriptCode = scriptMatch[1];
  
  // Verify it executes as a valid function without syntax errors
  assert.doesNotThrow(() => {
    new Function(scriptCode);
  }, 'The generated script has a syntax error!');
});

test('Barcellona includes both Classic (7.7 km) and Sagrada Família (7.8 km) variants with accurate WhatsApp text', () => {
  const barcellona = itineraryData.find(p => p.id === 'barcellona');
  assert.ok(barcellona, 'Barcellona port not found');
  assert.ok(barcellona.varianti && barcellona.varianti.length === 2, 'Barcellona should have 2 variants');

  const classic = barcellona.varianti.find(v => v.id === 'barcellona-classico');
  const sagrada = barcellona.varianti.find(v => v.id === 'barcellona-sagrada');
  assert.ok(classic, 'Classic variant missing');
  assert.ok(sagrada, 'Sagrada Família variant missing');

  assert.equal(classic.kmTotaliStimati, 7.7);
  assert.equal(sagrada.kmTotaliStimati, 7.8);
  assert.equal(sagrada.tappe.length, 9);

  const stop7 = sagrada.tappe[6];
  assert.equal(stop7.nome, 'Sagrada Família (Esterno) & Avinguda de Gaudí');
  assert.equal(stop7.kmParziali, 2.2);
  assert.equal(stop7.orario, '14:15 - 15:40');

  const resolvedSagrada = {
    ...barcellona,
    porto: sagrada.portoTitolo,
    kmTotaliStimati: sagrada.kmTotaliStimati,
    infoLogisticaMolo: sagrada.infoLogisticaMolo,
    tappe: sagrada.tappe
  };

  const shareText = formatItineraryForSharing(resolvedSagrada);
  assert.ok(shareText.includes('~7.8 km a piedi'));
  assert.ok(shareText.includes('Sagrada Família (Esterno) & Avinguda de Gaudí (+2.2 km)'));
  assert.ok(shareText.includes('Recinte Modernista de Sant Pau'));
  assert.ok(shareText.includes('Stormtrooper'));
  assert.ok(shareText.includes('T-Familiar'));
  assert.ok(shareText.includes('⛪'));
  assert.ok(shareText.includes('Tutti a bordo: 17:15'));
});

test('Tunisia offline encyclopedia contains deep, accurate articles', () => {
  assert.ok(TUNISIA_WIKI_ARTICLES['sidi-bou-said']);
  assert.ok(TUNISIA_WIKI_ARTICLES['cafe-des-nattes']);
  assert.ok(TUNISIA_WIKI_ARTICLES['cothon-cartagine']);
  assert.ok(TUNISIA_WIKI_ARTICLES['tophet-salammbo']);
  assert.ok(TUNISIA_WIKI_ARTICLES['borj-el-karraka']);
  assert.ok(TUNISIA_WIKI_ARTICLES['piccola-sicilia']);
  assert.ok(TUNISIA_WIKI_ARTICLES['tgm-ferrovia']);
  assert.ok(TUNISIA_WIKI_ARTICLES['street-food-tunisino']);

  assert.ok(TUNISIA_PHRASEBOOK.length >= 8);
  assert.ok(TUNISIA_CURRENCY.eurToTnd > 3.0);
});

test('Every itinerary stop across all 5 ports and variants has an existing local WebP photo', () => {
  for (const port of itineraryData) {
    const allStops = port.varianti ? port.varianti.flatMap(v => v.tappe) : port.tappe;
    for (const stop of allStops) {
      const photo = STOP_IMAGES[stop.id];
      assert.ok(photo, `Missing photo mapping for stop ${stop.id} (${stop.nome})`);
      assert.ok(photo.src.startsWith('./stops/') && photo.src.endsWith('.webp'), `Invalid relative path for ${stop.id}: ${photo.src}`);
      assert.ok(photo.caption.length > 5, `Missing caption for ${stop.id}`);
      const diskPath = path.resolve('public', photo.src.replace(/^\.\//, ''));
      assert.ok(fs.existsSync(diskPath), `Missing WebP file on disk for ${stop.id}: ${diskPath}`);
      const size = fs.statSync(diskPath).size;
      assert.ok(size > 2048, `WebP file suspiciously small (${size} bytes) for ${stop.id}`);
    }
  }
});



