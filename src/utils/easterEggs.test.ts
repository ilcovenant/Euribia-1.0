/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PORT_ACHIEVEMENTS,
  PLATINUM_ACHIEVEMENT,
  CAPTAIN_ANNOUNCEMENTS,
  getConverterEasterEgg,
  getFooterTimeEasterEgg,
  isEmbarkationDayCelebration
} from './easterEggs';

test('All 5 cruise ports and Platinum achievement are properly defined', () => {
  for (const id of ['napoli', 'palermo', 'la-goletta', 'barcellona', 'marsiglia']) {
    assert.ok(PORT_ACHIEVEMENTS[id], `Missing achievement for ${id}`);
    assert.ok(PORT_ACHIEVEMENTS[id].title.length > 5);
  }
  assert.equal(PLATINUM_ACHIEVEMENT.isPlatinum, true);
  assert.ok(PLATINUM_ACHIEVEMENT.title.includes('PLATINATA'));
  assert.ok(CAPTAIN_ANNOUNCEMENTS.length >= 4);
});

test('Converter secret codes trigger only on expected geeky numbers', () => {
  assert.ok(getConverterEasterEgg('42', '140.70')?.includes('Bambalouni'));
  assert.ok(getConverterEasterEgg('1781', '5966.35')?.includes('Four des Navettes'));
  assert.ok(getConverterEasterEgg('10', '404')?.includes('404'));
  assert.equal(getConverterEasterEgg('10', '33.50'), null);
  assert.equal(getConverterEasterEgg('20', '67.00'), null);
});

test('Footer time easter eggs fire strictly between 01:30-04:29 and 04:30-06:29', () => {
  const makeTime = (h: number, m: number) => new Date(2026, 10, 25, h, m, 0);

  assert.equal(getFooterTimeEasterEgg(makeTime(1, 29)), null);
  assert.equal(getFooterTimeEasterEgg(makeTime(1, 30))?.kind, 'night-owl');
  assert.equal(getFooterTimeEasterEgg(makeTime(3, 45))?.kind, 'night-owl');
  assert.equal(getFooterTimeEasterEgg(makeTime(4, 29))?.kind, 'night-owl');

  assert.equal(getFooterTimeEasterEgg(makeTime(4, 30))?.kind, 'early-bird');
  assert.ok(getFooterTimeEasterEgg(makeTime(5, 15))?.text.includes('Già svegli'));
  assert.equal(getFooterTimeEasterEgg(makeTime(6, 29))?.kind, 'early-bird');

  assert.equal(getFooterTimeEasterEgg(makeTime(6, 30)), null);
  assert.equal(getFooterTimeEasterEgg(makeTime(14, 0)), null);
});

test('Embarkation day celebration activates only on 23 Nov 2026 daytime', () => {
  assert.equal(isEmbarkationDayCelebration(Date.parse('2026-11-23T12:00:00+01:00')), true);
  assert.equal(isEmbarkationDayCelebration(Date.parse('2026-11-22T12:00:00+01:00')), false);
  assert.equal(isEmbarkationDayCelebration(Date.parse('2026-11-24T12:00:00+01:00')), false);
});
