import React from 'react';

export const CapabilitiesGrid: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2">
            <span className="text-indigo-400 font-mono">Engineered for Micro-Apps</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Primitives</span>
            <span aria-hidden="true">·</span>
            <span>No Heavy Runtimes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Everything needed for micro-apps. Nothing more.
          </h2>
          <p className="mt-3 text-base text-zinc-300">
            Traditional web frameworks were designed for million-line multi-tenant monoliths. 
            NanoForge is purpose-built for atomic utilities that solve exactly one problem with surgical precision.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 2-column wide */}
          <div className="md:col-span-2 p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-indigo-400 font-semibold">
                  01. Zero-Ceremony Single-File Architecture
                </span>
                <span className="text-xs text-zinc-400">Pure React & TypeScript</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Say goodbye to 800-file project scaffolding
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                Every micro-app lives in a clean, self-contained module. Component logic, layout, 
                and styling live together without context switching across twenty configuration files, 
                Webpack rules, and routing hierarchies.
              </p>
            </div>

            {/* Visual representation */}
            <div className="mt-8 p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-1.5">
              <div className="text-zinc-400">Legacy Framework vs NanoForge Single-File</div>
              <div className="text-rose-400/80 line-through">42 files · 18 configs · 480MB node_modules · 14s build</div>
              <div className="text-emerald-400 font-semibold">1 file · 0 config · 18KB bundle · 0.1s instant preview</div>
            </div>
          </div>

          {/* Card 2: 1-column */}
          <div className="p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-indigo-400 font-semibold">
                  02. Edge-Ready Persistence
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Key-Value sync without DB migrations
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Small apps don’t need an ORM or complex schema migrations. Save user state to LocalStorage 
                or sync with edge KV storage using simple React hooks.
              </p>
            </div>

            <div className="mt-8 p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-indigo-300">
              const [val, setVal] = useNanoStore('key');
            </div>
          </div>

          {/* Card 3: 1-column */}
          <div className="p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-indigo-400 font-semibold">
                  03. Sub-Second Cold Starts
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Instant first-paint worldwide
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Because micro-app bundles average under 25KB, your users never stare at blank loading screens 
                or progressive dehydration spinners.
              </p>
            </div>

            <div className="mt-8 flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-bold text-emerald-400">99.8ms</span>
              <span className="text-xs text-zinc-400">global TTFB</span>
            </div>
          </div>

          {/* Card 4: 2-column wide */}
          <div className="md:col-span-2 p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-indigo-400 font-semibold">
                  04. Frictionless Embedding & Shareable URLs
                </span>
                <span className="text-xs text-zinc-400">Multi-Channel Distribution</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Embed anywhere or host on custom subdomains.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                Every compiled micro-app yields an embeddable iframe tag, a production link, and 
                a stand-alone HTML bundle. Drop your mini calculator or intake form right inside Notion, 
                WordPress, internal company wikis, or client portals.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
              <div className="px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800">
                &lt;iframe src="https://nanoforge.io/app/tax-calc" /&gt;
              </div>
              <div className="px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800">
                npm i @nanoforge/embed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
