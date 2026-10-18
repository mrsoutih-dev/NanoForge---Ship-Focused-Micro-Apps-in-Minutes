import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateMicroApp,
  calculatePricing,
  validateLeadForm,
  PRICING_PLANS,
} from './calculator.ts';

test('estimateMicroApp calculates appropriate lines of code and build times', () => {
  const nanoEstimate = estimateMicroApp({
    archetype: 'calculator',
    hasStorage: false,
    hasAuth: false,
    hasExport: false,
    customFieldsCount: 2,
  });

  assert.equal(nanoEstimate.architectureTier, 'Nano');
  assert.equal(nanoEstimate.linesOfCode, 90 + 16);
  assert.equal(nanoEstimate.recommendedStack, 'Vite + React + LocalStorage');

  const compactEstimate = estimateMicroApp({
    archetype: 'dashboard',
    hasStorage: true,
    hasAuth: true,
    hasExport: true,
    customFieldsCount: 4,
  });

  assert.equal(compactEstimate.architectureTier, 'Compact');
  assert.ok(compactEstimate.linesOfCode > 300);
  assert.equal(compactEstimate.recommendedStack, 'React + Edge Functions + KV Store');
});

test('calculatePricing applies annual discounts accurately', () => {
  const proMonthly = calculatePricing('pro', false, 1);
  assert.equal(proMonthly.monthlyRate, 19);
  assert.equal(proMonthly.savingsPerYear, 0);

  const proAnnual = calculatePricing('pro', true, 1);
  assert.equal(proAnnual.monthlyRate, 15);
  assert.equal(proAnnual.annualTotal, 180);
  assert.equal(proAnnual.savingsPerYear, 48); // (19 * 12) - (15 * 12) = 228 - 180 = 48

  const starterPlan = calculatePricing('starter', true, 2);
  assert.equal(starterPlan.monthlyRate, 0);
  assert.equal(starterPlan.annualTotal, 0);
  assert.equal(starterPlan.savingsPerYear, 0);
});

test('validateLeadForm verifies required inputs accurately', () => {
  const invalid = validateLeadForm({
    fullName: '',
    email: 'not-an-email',
    appIdea: '',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.appIdea);

  const valid = validateLeadForm({
    fullName: 'Alex Rivera',
    email: 'alex@example.com',
    appIdea: 'A markdown cheatsheet with live token counter',
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
