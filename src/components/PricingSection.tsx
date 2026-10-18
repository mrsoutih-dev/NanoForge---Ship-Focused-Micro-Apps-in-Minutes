import React, { useState } from 'react';
import { calculatePricing, PRICING_PLANS } from '../utils/calculator';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'starter' as const,
      name: 'Hobbyist',
      desc: 'Perfect for tinkering and personal single-purpose utilities.',
      calc: calculatePricing('starter', isAnnual),
      highlight: false,
      features: [
        'Up to 3 active micro-apps',
        'Single-file React & TypeScript sandbox',
        'Automatic HTTPS subdomains',
        'LocalStorage client-state sync',
        'Community discord support',
      ],
      cta: 'Start with Hobbyist',
    },
    {
      id: 'pro' as const,
      name: 'Independent Builder',
      desc: 'For indie creators, freelancers, and utility builders.',
      calc: calculatePricing('pro', isAnnual),
      highlight: true,
      features: [
        'Up to 25 live micro-apps',
        'Custom domain support with SSL',
        'Edge Key-Value persistent database',
        'Passwordless auth & magic links',
        'One-click standalone bundle export',
        'No NanoForge watermark',
      ],
      cta: 'Choose Independent Plan',
    },
    {
      id: 'team' as const,
      name: 'Studio Team',
      desc: 'For development agencies and internal corporate tooling.',
      calc: calculatePricing('team', isAnnual),
      highlight: false,
      features: [
        'Unlimited live micro-apps',
        'Granular team workspaces & roles',
        'Private internal IP & SSO whitelist',
        'Custom iframe embedding analytics',
        'Shared snippet and component library',
        'Dedicated Slack support channel',
      ],
      cta: 'Get Studio License',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-400">
            <span className="text-indigo-400 font-mono">Simple Transparent Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Ingress Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Predictable pricing designed for small footprints
          </h2>
          <p className="text-base text-zinc-300">
            Micro-apps shouldn't require enterprise cloud budgets. Choose the right tier for your tools.
          </p>

          {/* Billing Toggle (Functional Segmented Control) */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-medium ${!isAnnual ? 'text-white' : 'text-zinc-400'}`}>
              Billed Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing discount"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-indigo-500 shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5 bg-indigo-400' : 'translate-x-0 bg-zinc-400'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`font-medium ${isAnnual ? 'text-white' : 'text-zinc-400'}`}>
                Annual Billing
              </span>
              <span className="font-mono text-[11px] text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-xl p-8 flex flex-col justify-between transition-all ${
                p.highlight
                  ? 'bg-zinc-900 border-2 border-indigo-500 shadow-xl shadow-indigo-950/40 relative'
                  : 'bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-semibold tracking-wide uppercase">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed min-h-[32px]">{p.desc}</p>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-zinc-800/80">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-extrabold text-white tabular-nums">
                      ${p.calc.monthlyRate}
                    </span>
                    {p.calc.monthlyRate > 0 && (
                      <span className="text-xs text-zinc-400">/month</span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-1">
                    {p.calc.billingPeriodLabel}
                    {p.calc.savingsPerYear > 0 && (
                      <span className="text-emerald-400 ml-1">· saves ${p.calc.savingsPerYear}/yr</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 pt-2 text-xs text-zinc-300">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => onSelectPlan(p.name)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 ${
                    p.highlight
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950 focus-visible:ring-indigo-400'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 focus-visible:ring-zinc-500'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
