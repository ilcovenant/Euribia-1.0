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
  computePortCountdown
} from './countdownData';

test('PORT_RETURN_SCHEDULES covers all 5 MSC Euribia ports with valid taxi cards', () => {
  assert.equal(PORT_RETURN_SCHEDULES.length, 5);
  const ids = PORT_RETURN_SCHEDULES.map(p => p.portId);
  assert.deepEqual(ids, ['napoli', 'palermo', 'la-goletta', 'barcellona', 'marsiglia']);

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

test('findTodayPort detects cruise port days accurately in UTC+1 (CET)', () => {
  const napoliAfternoonMs = Date.parse('2026-11-24T15:30:00+01:00');
  assert.equal(getCruiseIsoDate(napoliAfternoonMs), '2026-11-24');
  assert.equal(findTodayPort(napoliAfternoonMs)?.portId, 'napoli');

  const barcelonaDayMs = Date.parse('2026-11-28T11:00:00+01:00');
  assert.equal(findTodayPort(barcelonaDayMs)?.portId, 'barcellona');

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

test('computePortCountdown handles live port day, offsets, and simulation accurately', () => {
  const barcellona = PORT_SCHEDULE_MAP['barcellona'];
  // 16:00 on 28 Nov -> 75 min left until 17:15 (caution)
  const nowLiveMs = parseCruiseTimestamp('2026-11-28', '16:00');
  const live = computePortCountdown(barcellona, nowLiveMs, 0);
  assert.equal(live.isLiveToday, true);
  assert.equal(live.urgency, 'caution');
  assert.equal(live.remainingMs, 75 * 60_000);

  // Applying -30 min Captain offset moves All Aboard to 16:45 -> 45 min left (critical)
  const shifted = computePortCountdown(barcellona, nowLiveMs, -30);
  assert.equal(shifted.adjustedAllAboardTime, '16:45');
  assert.equal(shifted.urgency, 'critical');
  assert.equal(shifted.remainingMs, 45 * 60_000);

  // Simulation mode overrides real date
  const preCruiseNow = Date.parse('2026-11-20T12:00:00+01:00');
  const sim = computePortCountdown(barcellona, preCruiseNow, 0, {
    portId: 'barcellona',
    targetMs: preCruiseNow + 25 * 60_000,
    windowMs: 6 * 3_600_000
  });
  assert.equal(sim.isSimulated, true);
  assert.equal(sim.urgency, 'critical');
  assert.equal(sim.remainingMs, 25 * 60_000);
});
