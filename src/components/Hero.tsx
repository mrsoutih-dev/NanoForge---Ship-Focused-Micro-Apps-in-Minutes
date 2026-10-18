import React, { useState } from 'react';

interface HeroProps {
  onOpenWaitlist: () => void;
  onScrollToScoper: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist, onScrollToScoper }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  // Quick live interactive mini widget in hero
  const [taxRate, setTaxRate] = useState<number>(15);
  const [subtotal, setSubtotal] = useState<number>(240);

  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const sampleSnippet = `// ⚡️ Single-File Micro-App: QuickInvoice.tsx (54 lines)
import React, { useState } from 'react';

export default function QuickInvoice() {
  const [subtotal, setSubtotal] = useState(240);
  const [taxRate, setTaxRate] = useState(15);
  const tax = (subtotal * taxRate) / 100;

  return (
    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100">
      <h3 className="font-semibold text-sm">Invoice Calculator</h3>
      <input type="range" min="50" max="1000" value={subtotal} 
             onChange={e => setSubtotal(+e.target.value)} />
      <div className="font-mono text-lg font-bold">\${(subtotal + tax).toFixed(2)}</div>
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <span className="text-indigo-400 font-mono">0.1s Deploys</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Config Sandboxes</span>
              <span aria-hidden="true">·</span>
              <span>Single-File Architecture</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Code small apps <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-indigo-200 to-indigo-400">
                Ship in minutes, not quarters
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Stop scaffolding 400 boilerplate files for a single form, converter, or internal tool. 
              NanoForge gives developers a pristine, single-purpose workbench with instant state, 
              lightweight components, and zero-latency edge deploys.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenWaitlist}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-900/30 transition-all text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Start Building Free
              </button>
              <button
                onClick={onScrollToScoper}
                className="px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
              >
                Estimate App Scope
              </button>
            </div>

            {/* Adjacent Trust Proof */}
            <div className="pt-4 flex items-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/80">
              <div>
                <span className="font-mono font-semibold text-zinc-200">TypeScript & React</span>
                <span className="ml-1.5 text-zinc-400">Native</span>
              </div>
              <span aria-hidden="true">·</span>
              <div>
                <span className="font-mono font-semibold text-zinc-200">&lt; 30 KB</span>
                <span className="ml-1.5 text-zinc-400">Gzipped Bundle</span>
              </div>
              <span aria-hidden="true">·</span>
              <div>
                <span className="font-mono font-semibold text-zinc-200">100%</span>
                <span className="ml-1.5 text-zinc-400">Self-Hostable</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Micro-App Code/Preview Terminal */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur-sm overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="ml-2 font-mono text-xs text-zinc-400">micro-app-preview.tsx</span>
                </div>

                {/* View switcher tabs */}
                <div className="flex items-center gap-1 p-0.5 bg-zinc-900 border border-zinc-800 rounded-md">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      activeTab === 'preview'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Live App
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      activeTab === 'code'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Raw Code
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-5">
                {activeTab === 'preview' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-100">Live Interactive Micro-App</h4>
                        <p className="text-xs text-zinc-400">Try dragging the sliders below</p>
                      </div>
                      <span className="font-mono text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                        Active Sandbox
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-4">
                      {/* Subtotal slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <label htmlFor="hero-subtotal" className="text-zinc-400 font-medium">Subtotal Amount</label>
                          <span className="font-mono text-zinc-200 tabular-nums">${subtotal}</span>
                        </div>
                        <input
                          id="hero-subtotal"
                          type="range"
                          min="50"
                          max="1000"
                          step="10"
                          value={subtotal}
                          onChange={(e) => setSubtotal(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                        />
                      </div>

                      {/* Tax slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <label htmlFor="hero-tax" className="text-zinc-400 font-medium">Applied Tax Rate</label>
                          <span className="font-mono text-zinc-200 tabular-nums">{taxRate}%</span>
                        </div>
                        <input
                          id="hero-tax"
                          type="range"
                          min="0"
                          max="30"
                          step="1"
                          value={taxRate}
                          onChange={(e) => setTaxRate(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                        />
                      </div>

                      {/* Result Output Card */}
                      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-zinc-400">Computed Output</div>
                          <div className="font-mono text-2xl font-bold text-white tabular-nums">
                            ${total.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-right text-xs text-zinc-400">
                          <div>Tax: ${taxAmount.toFixed(2)}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">0 dependencies</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Compiled: 0.14s</span>
                      <span className="font-mono">Payload: 18.2 KB</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="font-mono text-xs text-zinc-300 overflow-x-auto p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 leading-relaxed max-h-[260px]">
                      {sampleSnippet}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 px-2.5 py-1 text-[11px] font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
