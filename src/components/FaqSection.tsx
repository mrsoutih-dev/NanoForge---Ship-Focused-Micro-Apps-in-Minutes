import React, { useState } from 'react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What qualifies as a "small app" or micro-tool?',
      a: 'A small app is a single-screen or focused-purpose web tool designed to do one job with zero friction: calculators, unit converters, prompt formatters, intake workflows, internal audit tools, or client portals. They are self-contained and typically have under 300 lines of component code.',
    },
    {
      q: 'Can I export clean, standard React and TypeScript code?',
      a: 'Yes, 100%. NanoForge compiles standard React 19 and TypeScript. You are never locked in. You can download the pristine standalone source file at any time and run it in Vite, Next.js, or plain HTML.',
    },
    {
      q: 'How does state persistence work without managing a database?',
      a: 'We provide two built-in persistence primitives: browser LocalStorage for client-isolated utilities, and our zero-config Edge Key-Value store for multi-user or cross-device tools. You save and retrieve state using standard React useState-like hooks without writing SQL migrations.',
    },
    {
      q: 'Can I embed micro-apps into existing websites or internal tools?',
      a: 'Absolutely. Every published micro-app generates a zero-latency embed code and a standard iframe snippet. It embeds flawlessly inside Notion pages, WordPress, Webflow, Retool, Zendesk, or your corporate intranet.',
    },
    {
      q: 'What happens if one of my micro-apps gets thousands of visits?',
      a: 'All static assets and edge workers are distributed across our global CDN. Because the average micro-app bundle is under 25KB and utilizes edge caching, handling 100,000 visitors costs practically nothing and requires zero manual infrastructure scaling.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-zinc-900/30 border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-400">
            <span className="text-indigo-400 font-mono">Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span>Technical Clarity</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white [text-wrap:balance]">
            Everything you need to know about micro-apps.
          </h2>
          <p className="text-sm text-zinc-300">
            Have questions about architectural boundaries or deployment? Here are straightforward answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <span
                    className={`font-mono text-base text-zinc-400 transform transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-45 text-indigo-400' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
