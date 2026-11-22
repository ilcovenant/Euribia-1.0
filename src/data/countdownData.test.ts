/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PORT_RETURN_SCHEDULES,
  PORT_SCHEDULE_MAP,
  parseCruiseTimestamp,
  shiftTimeString,
  getCruiseIsoDate,
  findTodayPort,
  getUrgencyFromRemainingMs,
  formatDurationHms,
  formatCompactDuration,
  computePortCountdown,
  getNextCruiseEvent
} from './countdownData';

test('PORT_RETURN_SCHEDULES covers Genova Embark, 5 ports, and Genova Arrival with valid taxi cards', () => {
  assert.equal(PORT_RETURN_SCHEDULES.length, 7);
  const ids = PORT_RETURN_SCHEDULES.map(p => p.portId);
  assert.deepEqual(ids, [
    'genova-imbarco',
    'napoli',
    'palermo',
    'la-goletta',
    'barcellona',
    'marsiglia',
    'genova-arrivo'
  ]);

  for (const p of PORT_RETURN_SCHEDULES) {
    assert.ok(p.isoDate.startsWith('2026-11-'));
    assert.ok(p.mapsReturnQuery.length > 5);
    assert.ok(p.taxiCard.terminalTitolo.length > 5);
    assert.ok(p.taxiCard.fraseTassista.length > 10);
  }
});

test('shiftTimeString correctly applies positive and negative Captain offsets', () => {
  assert.equal(shiftTimeString('17:15', -15), '17:00');
  assert.equal(shiftTimeString('17:15', 30), '17:45');
  assert.equal(shiftTimeString('19:15', -30), '18:45');
  assert.equal(shiftTimeString('17:15', 0), '17:15');
});

test('findTodayPort detects embarkation, cruise port days, and arrival day accurately in UTC+1 (CET)', () => {
  const genovaEmbarkMs = Date.parse('2026-11-23T12:00:00+01:00');
  assert.equal(findTodayPort(genovaEmbarkMs)?.portId, 'genova-imbarco');

  const napoliAfternoonMs = Date.parse('2026-11-24T15:30:00+01:00');
  assert.equal(getCruiseIsoDate(napoliAfternoonMs), '2026-11-24');
  assert.equal(findTodayPort(napoliAfternoonMs)?.portId, 'napoli');

  const barcelonaDayMs = Date.parse('2026-11-28T11:00:00+01:00');
  assert.equal(findTodayPort(barcelonaDayMs)?.portId, 'barcellona');

  const genovaArrivalMs = Date.parse('2026-11-30T07:30:00+01:00');
  assert.equal(findTodayPort(genovaArrivalMs)?.portId, 'genova-arrivo');

  // Sea day (27 Nov) returns null
  const seaDayMs = Date.parse('2026-11-27T12:00:00+01:00');
  assert.equal(findTodayPort(seaDayMs), null);
});

test('getUrgencyFromRemainingMs enforces 90m and 45m safety thresholds', () => {
  assert.equal(getUrgencyFromRemainingMs(120 * 60_000), 'safe');
  assert.equal(getUrgencyFromRemainingMs(90 * 60_000), 'caution');
  assert.equal(getUrgencyFromRemainingMs(50 * 60_000), 'caution');
  assert.equal(getUrgencyFromRemainingMs(45 * 60_000), 'critical');
  assert.equal(getUrgencyFromRemainingMs(10 * 60_000), 'critical');
  assert.equal(getUrgencyFromRemainingMs(0), 'expired');
  assert.equal(getUrgencyFromRemainingMs(-5000), 'expired');
});

test('formatDurationHms and formatCompactDuration format tabular strings cleanly', () => {
  assert.equal(formatDurationHms(3_661_000), '01:01:01');
  assert.equal(formatDurationHms(0), '00:00:00');
  assert.equal(formatCompactDuration(2 * 3_600_000 + 14 * 60_000), '2h 14m');
  assert.equal(formatCompactDuration(35 * 60_000 + 5_000), '35m 05s');
  assert.equal(formatCompactDuration(0), 'Scaduto');
});

test('computePortCountdown handles Genova Boarding 14:00, Departure 17:00, Arrival 09:00, and port offsets accurately', () => {
  const genovaEmbark = PORT_SCHEDULE_MAP['genova-imbarco'];
  // 23 Nov at 13:00 -> 60 min left to Boarding 14:00
  const beforeBoardingMs = parseCruiseTimestamp('2026-11-23', '13:00');
  const embarkPre = computePortCountdown(genovaEmbark, beforeBoardingMs, 0);
  assert.equal(embarkPre.targetLabel, 'Al Boarding (14:00)');
  assert.equal(embarkPre.remainingMs, 60 * 60_000);
  assert.equal(embarkPre.urgency, 'caution');

  // 23 Nov at 15:00 -> switches automatically to Departure 17:00 (120 min left)
  const afterBoardingMs = parseCruiseTimestamp('2026-11-23', '15:00');
  const embarkPost = computePortCountdown(genovaEmbark, afterBoardingMs, 0);
  assert.equal(embarkPost.targetLabel, 'Alla partenza da Genova');
  assert.equal(embarkPost.remainingMs, 120 * 60_000);
  assert.equal(embarkPost.urgency, 'safe');

  // 30 Nov at 08:15 -> 45 min left to Arrival 09:00
  const genovaArrival = PORT_SCHEDULE_MAP['genova-arrivo'];
  const arrivalMorningMs = parseCruiseTimestamp('2026-11-30', '08:15');
  const arrivalStatus = computePortCountdown(genovaArrival, arrivalMorningMs, 0);
  assert.equal(arrivalStatus.remainingMs, 45 * 60_000);
  assert.equal(arrivalStatus.urgency, 'critical');

  // Barcellona port day with Captain offset
  const barcellona = PORT_SCHEDULE_MAP['barcellona'];
  const nowLiveMs = parseCruiseTimestamp('2026-11-28', '16:00');
  const live = computePortCountdown(barcellona, nowLiveMs, 0);
  assert.equal(live.isLiveToday, true);
  assert.equal(live.urgency, 'caution');
  assert.equal(live.remainingMs, 75 * 60_000);

  const shifted = computePortCountdown(barcellona, nowLiveMs, -30);
  assert.equal(shifted.adjustedAllAboardTime, '16:45');
  assert.equal(shifted.urgency, 'critical');
  assert.equal(shifted.remainingMs, 45 * 60_000);
});

test('getNextCruiseEvent transitions automatically across Check-in, Departure, Disembark, All Aboard, and Arrival', () => {
  // 1) Before Genova Check-in (22 Nov) -> Check-in Genova 14:00
  const ev1 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-22', '10:00'));
  assert.equal(ev1?.shortLabel, 'Check-in Genova');
  assert.equal(ev1?.timeLabel, '14:00');
  assert.equal(ev1?.portId, 'genova-imbarco');

  // 2) After 14:00 on 23 Nov -> Partenza Genova 17:00
  const ev2 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-23', '14:30'));
  assert.equal(ev2?.shortLabel, 'Partenza Genova');
  assert.equal(ev2?.timeLabel, '17:00');

  // 3) After 17:00 on 23 Nov -> Discesa Napoli 13:00
  const ev3 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-23', '18:00'));
  assert.equal(ev3?.shortLabel, 'Discesa Napoli');
  assert.equal(ev3?.timeLabel, '13:00');
  assert.equal(ev3?.portId, 'napoli');

  // 4) Ashore in Napoli (24 Nov 15:00) -> A bordo Napoli 19:15
  const ev4 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-24', '15:00'));
  assert.equal(ev4?.shortLabel, 'A bordo Napoli');
  assert.equal(ev4?.timeLabel, '19:15');

  // 5) Between All Aboard and Departure in Napoli (24 Nov 19:30) -> Partenza Napoli 20:00
  const ev5 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-24', '19:30'));
  assert.equal(ev5?.shortLabel, 'Partenza Napoli');
  assert.equal(ev5?.timeLabel, '20:00');

  // 6) Sea Day (27 Nov 12:00) -> Discesa Barcellona 08:00
  const ev6 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-27', '12:00'));
  assert.equal(ev6?.shortLabel, 'Discesa Barcellona');
  assert.equal(ev6?.timeLabel, '08:00');
  assert.equal(ev6?.portId, 'barcellona');

  // 7) After Marsiglia departure (29 Nov 19:00) -> Arrivo Genova 09:00
  const ev7 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-29', '19:00'));
  assert.equal(ev7?.shortLabel, 'Arrivo Genova');
  assert.equal(ev7?.timeLabel, '09:00');
  assert.equal(ev7?.portId, 'genova-arrivo');

  // 8) After arrival (30 Nov 10:00) -> null
  const ev8 = getNextCruiseEvent(parseCruiseTimestamp('2026-11-30', '10:00'));
  assert.equal(ev8, null);
});
