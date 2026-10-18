import React from 'react';

export const ProofMetrics: React.FC = () => {
  const metrics = [
    { value: '42,000+', label: 'Micro-Apps Deployed', sub: 'Across 120+ countries' },
    { value: '18 min', label: 'Average Build Turnaround', sub: 'From idea to live link' },
    { value: '< 24 KB', label: 'Average Gzip Bundle', sub: 'Instantaneous client render' },
    { value: '99.98%', label: 'Edge Availability', sub: 'Multi-region redundancy' },
  ];

  const testimonials = [
    {
      quote:
        'We spent 3 months debating Jira tickets for an internal commission calculator. I built it in 45 minutes on NanoForge with 120 lines of React. Our entire sales floor uses it every day.',
      name: 'Elena Rostova',
      role: 'Staff Software Engineer',
      company: 'Kinetix Logistics',
      initials: 'ER',
      color: 'from-indigo-600 to-purple-600',
    },
    {
      quote:
        'Instead of building another heavy SaaS monster, I launched three focused micro-tools for creators. They load instantaneously, require zero maintenance, and generate $2,100 MRR passively.',
      name: 'Marcus Vance',
      role: 'Independent Developer & Founder',
      company: 'TypoCraft Studio',
      initials: 'MV',
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-zinc-900/30 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Quantitative Proof Strip */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
              Empirical Performance
            </h3>
            <p className="mt-2 text-2xl font-bold text-white tracking-tight">
              Small apps yield massive engineering leverage.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-1"
              >
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-zinc-300">{m.label}</div>
                <div className="text-[11px] text-zinc-400">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Attributable Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between space-y-6"
            >
              <blockquote className="text-sm sm:text-base text-zinc-300 leading-relaxed italic">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-800/80">
                {/* Fallback resilient avatar with gradient and clean typography */}
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.color} flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm shrink-0`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-400">
                    <span>{t.role}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="text-zinc-300">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
