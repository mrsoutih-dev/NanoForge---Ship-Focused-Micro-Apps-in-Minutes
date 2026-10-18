/**
 * Decoupled calculation and estimation logic for small apps.
 * Covered by unit tests using node:test.
 */

export interface MicroAppSpec {
  archetype: 'calculator' | 'dashboard' | 'converter' | 'form_workflow' | 'generator';
  hasStorage: boolean;
  hasAuth: boolean;
  hasExport: boolean;
  customFieldsCount: number;
}

export interface MicroAppEstimate {
  linesOfCode: number;
  buildTimeMinutes: number;
  bundleSizeKb: number;
  recommendedStack: string;
  architectureTier: 'Nano' | 'Micro' | 'Compact';
}

export interface PricingPlan {
  id: 'starter' | 'pro' | 'team';
  name: string;
  monthlyBasePrice: number;
  annualMonthlyPrice: number;
  appLimit: number | 'Unlimited';
}

export interface PricingCalculation {
  monthlyRate: number;
  annualTotal: number;
  savingsPerYear: number;
  effectiveMonthlyRate: number;
  billingPeriodLabel: string;
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  starter: {
    id: 'starter',
    name: 'Hobbyist',
    monthlyBasePrice: 0,
    annualMonthlyPrice: 0,
    appLimit: 3,
  },
  pro: {
    id: 'pro',
    name: 'Independent Builder',
    monthlyBasePrice: 19,
    annualMonthlyPrice: 15,
    appLimit: 25,
  },
  team: {
    id: 'team',
    name: 'Studio Team',
    monthlyBasePrice: 49,
    annualMonthlyPrice: 39,
    appLimit: 'Unlimited',
  },
};

/**
 * Calculates estimation metrics for a small app specification.
 */
export function estimateMicroApp(spec: MicroAppSpec): MicroAppEstimate {
  let baseLoc = 60;
  let baseMinutes = 10;
  let baseKb = 14;

  switch (spec.archetype) {
    case 'calculator':
      baseLoc = 90;
      baseMinutes = 15;
      baseKb = 18;
      break;
    case 'converter':
      baseLoc = 110;
      baseMinutes = 18;
      baseKb = 20;
      break;
    case 'generator':
      baseLoc = 140;
      baseMinutes = 22;
      baseKb = 24;
      break;
    case 'form_workflow':
      baseLoc = 180;
      baseMinutes = 28;
      baseKb = 28;
      break;
    case 'dashboard':
      baseLoc = 240;
      baseMinutes = 35;
      baseKb = 34;
      break;
  }

  // Additions for capabilities
  if (spec.hasStorage) {
    baseLoc += 45;
    baseMinutes += 8;
    baseKb += 6;
  }

  if (spec.hasAuth) {
    baseLoc += 80;
    baseMinutes += 14;
    baseKb += 12;
  }

  if (spec.hasExport) {
    baseLoc += 35;
    baseMinutes += 6;
    baseKb += 8;
  }

  const fieldAdd = Math.max(0, spec.customFieldsCount) * 8;
  baseLoc += fieldAdd;
  baseMinutes += Math.round(fieldAdd / 4);

  let architectureTier: 'Nano' | 'Micro' | 'Compact' = 'Nano';
  let recommendedStack = 'Vite + React + LocalStorage';

  if (baseLoc > 280 || spec.hasAuth) {
    architectureTier = 'Compact';
    recommendedStack = 'React + Edge Functions + KV Store';
  } else if (baseLoc > 150 || spec.hasStorage) {
    architectureTier = 'Micro';
    recommendedStack = 'Vite + React + Persistent State Sync';
  }

  return {
    linesOfCode: baseLoc,
    buildTimeMinutes: baseMinutes,
    bundleSizeKb: baseKb,
    recommendedStack,
    architectureTier,
  };
}

/**
 * Calculates pricing rates and annual savings.
 */
export function calculatePricing(
  planId: 'starter' | 'pro' | 'team',
  isAnnual: boolean,
  seats: number = 1
): PricingCalculation {
  const plan = PRICING_PLANS[planId] || PRICING_PLANS.pro;
  const safeSeats = Math.max(1, seats);

  if (plan.monthlyBasePrice === 0) {
    return {
      monthlyRate: 0,
      annualTotal: 0,
      savingsPerYear: 0,
      effectiveMonthlyRate: 0,
      billingPeriodLabel: 'Free forever',
    };
  }

  const baseRate = plan.monthlyBasePrice * safeSeats;
  const annualDiscountedRate = plan.annualMonthlyPrice * safeSeats;

  if (isAnnual) {
    const annualTotal = annualDiscountedRate * 12;
    const regularAnnual = baseRate * 12;
    const savings = regularAnnual - annualTotal;

    return {
      monthlyRate: annualDiscountedRate,
      annualTotal,
      savingsPerYear: savings,
      effectiveMonthlyRate: annualDiscountedRate,
      billingPeriodLabel: 'Billed annually',
    };
  }

  return {
    monthlyRate: baseRate,
    annualTotal: baseRate * 12,
    savingsPerYear: 0,
    effectiveMonthlyRate: baseRate,
    billingPeriodLabel: 'Billed monthly',
  };
}

/**
 * Form validation helper for early access waitlist / inquiries.
 */
export interface LeadFormInput {
  fullName: string;
  email: string;
  appIdea: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLeadForm(input: LeadFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!input.appIdea || input.appIdea.trim().length < 5) {
    errors.appIdea = 'Please describe your small app idea in at least 5 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
