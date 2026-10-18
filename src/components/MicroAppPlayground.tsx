import React, { useState } from 'react';

export const MicroAppPlayground: React.FC = () => {
  const [activeApp, setActiveApp] = useState<'gradient' | 'text' | 'margin'>('gradient');
  const [showSource, setShowSource] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // App 1: Gradient Generator State
  const [color1, setColor1] = useState('#4f46e5');
  const [color2, setColor2] = useState('#06b6d4');
  const [angle, setAngle] = useState(135);

  const presets = [
    { c1: '#4f46e5', c2: '#06b6d4', a: 135, name: 'Oceanic' },
    { c1: '#7c3aed', c2: '#f43f5e', a: 90, name: 'Sunset' },
    { c1: '#059669', c2: '#10b981', a: 45, name: 'Emerald' },
    { c1: '#d97706', c2: '#dc2626', a: 120, name: 'Solar' },
  ];

  const gradientCss = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  // App 2: Text / Slugifier State
  const [inputText, setInputText] = useState('How to ship small apps without technical debt in 2026');
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;
  const estimatedTokens = Math.ceil(charCount / 3.8);
  const readingTimeSec = Math.max(1, Math.round((wordCount / 200) * 60));
  const slugified = inputText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // App 3: Margin & Unit Economics State
  const [mrr, setMrr] = useState(2400);
  const [infraCost, setInfraCost] = useState(180);
  const [customerCount, setCustomerCount] = useState(48);

  const grossProfit = Math.max(0, mrr - infraCost);
  const grossMargin = mrr > 0 ? ((grossProfit / mrr) * 100).toFixed(1) : '0';
  const arpu = customerCount > 0 ? (mrr / customerCount).toFixed(2) : '0';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getSourceCode = () => {
    switch (activeApp) {
      case 'gradient':
        return `// Micro-App: MeshGradient.tsx (~38 lines)
import React, { useState } from 'react';

export function MeshGradient() {
  const [c1, setC1] = useState('${color1}');
  const [c2, setC2] = useState('${color2}');
  const [angle, setAngle] = useState(${angle});
  const bg = \`linear-gradient(\${angle}deg, \${c1}, \${c2})\`;

  return (
    <div className="p-4 rounded-lg" style={{ background: bg }}>
      <input type="color" value={c1} onChange={e => setC1(e.target.value)} />
      <input type="color" value={c2} onChange={e => setC2(e.target.value)} />
      <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)} />
    </div>
  );
}`;
      case 'text':
        return `// Micro-App: TextAnalyzer.tsx (~42 lines)
import React, { useState } from 'react';

export function TextAnalyzer() {
  const [text, setText] = useState('${inputText}');
  const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
  const slug = text.toLowerCase().replace(/[^\\w\\s-]/g, '').replace(/[\\s_-]+/g, '-');

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <div>Words: {words} · Slug: /{slug}</div>
    </div>
  );
}`;
      case 'margin':
        return `// Micro-App: RunwayCalc.tsx (~40 lines)
import React, { useState } from 'react';

export function RunwayCalc() {
  const [mrr, setMrr] = useState(${mrr});
  const [cost, setCost] = useState(${infraCost});
  const margin = (((mrr - cost) / mrr) * 100).toFixed(1);

  return (
    <div>
      <input type="range" min="100" max="10000" value={mrr} onChange={e => setMrr(+e.target.value)} />
      <div className="font-mono">Gross Margin: {margin}%</div>
    </div>
  );
}`;
    }
  };

  return (
    <section id="playground" className="py-20 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2">
            <span className="text-indigo-400 font-mono">Live Demo</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Switchboard</span>
            <span aria-hidden="true">·</span>
            <span>Zero Server Latency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Experience genuine micro-apps in action
          </h2>
          <p className="mt-3 text-base text-zinc-300">
            Each app below is a fully functional, self-contained single-screen utility. 
            No backend databases to provision, no 500-megabyte node_modules folders.
          </p>
        </div>

        {/* Micro-App Switcher & Frame */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-xl">
          {/* Top Bar Navigation for Apps */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-zinc-800 bg-zinc-950/80">
            {/* App Choice Segmented Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto">
              <button
                onClick={() => {
                  setActiveApp('gradient');
                  setShowSource(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeApp === 'gradient'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1. Gradient Generator
              </button>
              <button
                onClick={() => {
                  setActiveApp('text');
                  setShowSource(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeApp === 'text'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                2. Slug & Token Counter
              </button>
              <button
                onClick={() => {
                  setActiveApp('margin');
                  setShowSource(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeApp === 'margin'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                3. Micro-SaaS Runway
              </button>
            </div>

            {/* View Source Code / App View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSource(!showSource)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                  showSource
                    ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                }`}
              >
                {showSource ? '← Return to Live App' : 'View Source Code (< 50 lines)'}
              </button>
            </div>
          </div>

          {/* App Body Content */}
          <div className="p-6 lg:p-8">
            {showSource ? (
              <div className="relative">
                <div className="flex items-center justify-between pb-3 text-xs text-zinc-400 border-b border-zinc-800 mb-3">
                  <span className="font-mono">Clean standard React & TypeScript</span>
                  <button
                    onClick={() => copyToClipboard(getSourceCode(), 'source')}
                    className="px-3 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition-colors"
                  >
                    {copiedKey === 'source' ? 'Copied to Clipboard!' : 'Copy Code Snippet'}
                  </button>
                </div>
                <pre className="font-mono text-xs text-zinc-200 p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 overflow-x-auto leading-relaxed">
                  {getSourceCode()}
                </pre>
              </div>
            ) : (
              <div>
                {/* APP 1: Gradient Generator */}
                {activeApp === 'gradient' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">CSS Mesh & Gradient Staged Preview</h3>
                        <p className="text-xs text-zinc-400">
                          Adjust color stops and rotational angle. Instantly grab the clean CSS or Tailwind configuration.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-zinc-300">Start Color Stop</label>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                            <input
                              type="color"
                              value={color1}
                              onChange={(e) => setColor1(e.target.value)}
                              className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={color1}
                              onChange={(e) => setColor1(e.target.value)}
                              className="w-full bg-transparent font-mono text-xs text-zinc-200 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-zinc-300">End Color Stop</label>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                            <input
                              type="color"
                              value={color2}
                              onChange={(e) => setColor2(e.target.value)}
                              className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                            />
                            <input
                              type="text"
                              value={color2}
                              onChange={(e) => setColor2(e.target.value)}
                              className="w-full bg-transparent font-mono text-xs text-zinc-200 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-400">Rotation Angle</span>
                          <span className="font-mono text-zinc-200">{angle}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={angle}
                          onChange={(e) => setAngle(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Quick Presets */}
                      <div className="space-y-1.5">
                        <span className="text-xs text-zinc-400">Curated Presets</span>
                        <div className="flex flex-wrap gap-2">
                          {presets.map((p) => (
                            <button
                              key={p.name}
                              onClick={() => {
                                setColor1(p.c1);
                                setColor2(p.c2);
                                setAngle(p.a);
                              }}
                              className="px-2.5 py-1 text-xs font-medium bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-300 transition-colors"
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Output and Copy */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => copyToClipboard(`background: ${gradientCss};`, 'css')}
                          className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm"
                        >
                          {copiedKey === 'css' ? 'Copied CSS!' : 'Copy CSS Rule'}
                        </button>
                        <button
                          onClick={() => copyToClipboard(`${color1} → ${color2}`, 'tokens')}
                          className="px-4 py-2 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 transition-colors"
                        >
                          {copiedKey === 'tokens' ? 'Copied Hex!' : 'Copy Hex Values'}
                        </button>
                      </div>
                    </div>

                    {/* Preview Canvas */}
                    <div className="lg:col-span-5">
                      <div
                        className="h-64 sm:h-72 rounded-xl border border-zinc-700/60 shadow-inner flex flex-col justify-end p-6 transition-all duration-200"
                        style={{ background: gradientCss }}
                      >
                        <div className="p-3 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/10 text-xs space-y-1">
                          <div className="text-[11px] text-zinc-400">Generated Style</div>
                          <code className="text-zinc-200 font-mono block break-all text-[11px]">
                            linear-gradient({angle}deg, {color1}, {color2})
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* APP 2: Text Slugifier & Token Counter */}
                {activeApp === 'text' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Live Text Analyzer & URL Slugifier</h3>
                      <p className="text-xs text-zinc-400">
                        Type or paste blog drafts, changelogs, or docs. Calculates live token counts and clean SEO slugs.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="text-analyzer-input" className="text-xs font-medium text-zinc-300">Input Content</label>
                      <textarea
                        id="text-analyzer-input"
                        rows={3}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Type or paste any text..."
                      />
                    </div>

                    {/* Metric Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs text-zinc-400">Words</div>
                        <div className="font-mono text-xl font-bold text-white tabular-nums">{wordCount}</div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs text-zinc-400">Characters</div>
                        <div className="font-mono text-xl font-bold text-white tabular-nums">{charCount}</div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs text-zinc-400">Est. LLM Tokens</div>
                        <div className="font-mono text-xl font-bold text-indigo-400 tabular-nums">~{estimatedTokens}</div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs text-zinc-400">Reading Time</div>
                        <div className="font-mono text-xl font-bold text-white tabular-nums">{readingTimeSec}s</div>
                      </div>
                    </div>

                    {/* Generated Slug */}
                    <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5 overflow-hidden">
                        <div className="text-[11px] text-zinc-400">Generated URL Slug</div>
                        <div className="font-mono text-xs text-indigo-300 truncate">
                          /{slugified || 'empty-slug'}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(slugified, 'slug')}
                        className="px-3.5 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg border border-zinc-700 transition-colors whitespace-nowrap self-start sm:self-auto"
                      >
                        {copiedKey === 'slug' ? 'Copied Slug!' : 'Copy Slug'}
                      </button>
                    </div>
                  </div>
                )}

                {/* APP 3: Micro-SaaS Runway & Margin Calculator */}
                {activeApp === 'margin' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Unit Economics & Gross Margin Calculator</h3>
                      <p className="text-xs text-zinc-400">
                        Real-time financial modeling for small software products and micro-SaaS tools.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <label htmlFor="mrr-input" className="text-zinc-400">Monthly Revenue (MRR)</label>
                          <span className="font-mono text-white tabular-nums">${mrr}</span>
                        </div>
                        <input
                          id="mrr-input"
                          type="range"
                          min="100"
                          max="15000"
                          step="100"
                          value={mrr}
                          onChange={(e) => setMrr(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <label htmlFor="infra-input" className="text-zinc-400">Hosting & Tool Costs</label>
                          <span className="font-mono text-white tabular-nums">${infraCost}</span>
                        </div>
                        <input
                          id="infra-input"
                          type="range"
                          min="0"
                          max="2000"
                          step="20"
                          value={infraCost}
                          onChange={(e) => setInfraCost(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <label htmlFor="customers-input" className="text-zinc-400">Active Subscribers</label>
                          <span className="font-mono text-white tabular-nums">{customerCount}</span>
                        </div>
                        <input
                          id="customers-input"
                          type="range"
                          min="1"
                          max="500"
                          step="1"
                          value={customerCount}
                          onChange={(e) => setCustomerCount(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Computed Output Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-lg bg-zinc-950 border border-indigo-900/40">
                        <div className="text-xs text-zinc-400">Gross Margin</div>
                        <div className="font-mono text-2xl font-bold text-indigo-400 tabular-nums">
                          {grossMargin}%
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-1">High software leverage</div>
                      </div>

                      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs text-zinc-400">Net Monthly Profit</div>
                        <div className="font-mono text-2xl font-bold text-white tabular-nums">
                          ${grossProfit}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-1">After direct infrastructure</div>
                      </div>

                      <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs text-zinc-400">Avg. Revenue Per User</div>
                        <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                          ${arpu}/mo
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-1">Blended seat rate</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
