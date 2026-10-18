import React, { useState } from 'react';
import { estimateMicroApp, MicroAppSpec } from '../utils/calculator';

interface AppScoperProps {
  onStartBuilding: () => void;
}

export const AppScoper: React.FC<AppScoperProps> = ({ onStartBuilding }) => {
  const [spec, setSpec] = useState<MicroAppSpec>({
    archetype: 'calculator',
    hasStorage: true,
    hasAuth: false,
    hasExport: true,
    customFieldsCount: 3,
  });

  const [copied, setCopied] = useState(false);

  const estimate = estimateMicroApp(spec);

  const archetypes = [
    { id: 'calculator', label: 'Pricing / Financial Calc', desc: 'Real-time parameter computation' },
    { id: 'converter', label: 'Unit / Format Converter', desc: 'Two-way conversion logic' },
    { id: 'generator', label: 'Config & Asset Generator', desc: 'Generates exports & style tokens' },
    { id: 'form_workflow', label: 'Intake / Audit Workflow', desc: 'Multi-step validation & triage' },
    { id: 'dashboard', label: 'Single-Screen Metric View', desc: 'Edge metrics with persistent state' },
  ] as const;

  const generateStarterSnippet = () => {
    return `// ⚡️ NanoForge Generated Spec: ${spec.archetype}.tsx (~${estimate.linesOfCode} LOC)
// Architecture Tier: ${estimate.architectureTier} · Bundle: ~${estimate.bundleSizeKb} KB
import React, { useState${spec.hasStorage ? ', useEffect' : ''} } from 'react';

export default function MicroApp() {
  ${
    spec.hasStorage
      ? `// Persistent state in 2 lines with localStorage fallback
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('nano_state');
    return saved ? JSON.parse(saved) : { fieldCount: ${spec.customFieldsCount} };
  });

  useEffect(() => {
    localStorage.setItem('nano_state', JSON.stringify(state));
  }, [state]);`
      : `const [state, setState] = useState({ fieldCount: ${spec.customFieldsCount} });`
  }

  ${
    spec.hasExport
      ? `const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '${spec.archetype}-data.json';
    a.click();
  };`
      : ''
  }

  return (
    <main className="max-w-md mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <h1 className="text-lg font-bold text-white capitalize">${spec.archetype.replace('_', ' ')}</h1>
      <p className="text-xs text-zinc-400">Built in ${estimate.buildTimeMinutes} minutes on NanoForge</p>
      ${
        spec.hasExport
          ? `<button onClick={handleExport} className="mt-4 px-3 py-1.5 text-xs bg-indigo-600 rounded">Export Data</button>`
          : ''
      }
    </main>
  );
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateStarterSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="scoper" className="py-20 bg-zinc-900/40 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2">
            <span className="text-indigo-400 font-mono">Architecture Calculator</span>
            <span aria-hidden="true">·</span>
            <span>Accurate Complexity Estimator</span>
            <span aria-hidden="true">·</span>
            <span>Instant Boilerplate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Scope your small app before you write a single line
          </h2>
          <p className="mt-3 text-base text-zinc-300">
            Select your app archetype and primitives. We will calculate estimated lines of code,
            optimal architectural tier, and generate a tailored starter template.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Archetype Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                1. Select App Archetype
              </label>
              <div className="space-y-2">
                {archetypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSpec({ ...spec, archetype: item.id })}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                      spec.archetype === item.id
                        ? 'bg-zinc-800/90 border-indigo-500/70 shadow-sm'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">{item.label}</div>
                      <div className="text-xs text-zinc-400">{item.desc}</div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        spec.archetype === item.id
                          ? 'border-indigo-400 bg-indigo-600'
                          : 'border-zinc-700'
                      }`}
                    >
                      {spec.archetype === item.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primitive Capability Toggles */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                2. Integrated Primitives
              </label>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-colors">
                  <div className="text-xs">
                    <div className="font-medium text-zinc-200">Persistent State</div>
                    <div className="text-zinc-400 text-[11px]">Sync data to LocalStorage or Cloud KV</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={spec.hasStorage}
                    onChange={(e) => setSpec({ ...spec, hasStorage: e.target.checked })}
                    className="w-4 h-4 rounded accent-indigo-600 bg-zinc-800 border-zinc-700"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-colors">
                  <div className="text-xs">
                    <div className="font-medium text-zinc-200">Passkey / Magic Auth</div>
                    <div className="text-zinc-400 text-[11px]">Passwordless single-user or team access</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={spec.hasAuth}
                    onChange={(e) => setSpec({ ...spec, hasAuth: e.target.checked })}
                    className="w-4 h-4 rounded accent-indigo-600 bg-zinc-800 border-zinc-700"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-colors">
                  <div className="text-xs">
                    <div className="font-medium text-zinc-200">Data Export (CSV / JSON)</div>
                    <div className="text-zinc-400 text-[11px]">Client-side download without server roundtrips</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={spec.hasExport}
                    onChange={(e) => setSpec({ ...spec, hasExport: e.target.checked })}
                    className="w-4 h-4 rounded accent-indigo-600 bg-zinc-800 border-zinc-700"
                  />
                </label>
              </div>
            </div>

            {/* Input Field Slider */}
            <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="fields-count-slider" className="text-zinc-300 font-medium">Interactive Inputs / Controls</label>
                <span className="font-mono text-indigo-400 font-semibold">{spec.customFieldsCount} fields</span>
              </div>
              <input
                id="fields-count-slider"
                type="range"
                min="1"
                max="8"
                value={spec.customFieldsCount}
                onChange={(e) => setSpec({ ...spec, customFieldsCount: Number(e.target.value) })}
                className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results & Template Preview Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Computed Metrics Dashboard */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div>
                  <div className="text-xs text-zinc-400">Architecture Tier</div>
                  <div className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{estimate.architectureTier} App</span>
                    <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
                      Zero Bloat
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Recommended Runtime</div>
                  <div className="font-mono text-xs text-zinc-200 mt-1">{estimate.recommendedStack}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-zinc-400">Est. Codebase</div>
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">
                    ~{estimate.linesOfCode} <span className="text-xs font-normal text-zinc-400">LOC</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Turnaround</div>
                  <div className="font-mono text-2xl font-bold text-indigo-400 tabular-nums">
                    ~{estimate.buildTimeMinutes} <span className="text-xs font-normal text-zinc-400">min</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Bundle Size</div>
                  <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                    &lt; {estimate.bundleSizeKb} <span className="text-xs font-normal text-zinc-400">KB</span>
                  </div>
                </div>
              </div>

              {/* Starter Snippet Window */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">generated-boilerplate.tsx</span>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition-colors"
                  >
                    {copied ? 'Copied Boilerplate!' : 'Copy Boilerplate'}
                  </button>
                </div>
                <pre className="font-mono text-xs text-zinc-300 p-4 rounded-lg bg-zinc-900 border border-zinc-800 overflow-x-auto max-h-64 leading-relaxed">
                  {generateStarterSnippet()}
                </pre>
              </div>

              <div className="pt-2">
                <button
                  onClick={onStartBuilding}
                  className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg transition-colors text-center shadow-md shadow-indigo-950"
                >
                  Spin Up This Sandbox on NanoForge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
