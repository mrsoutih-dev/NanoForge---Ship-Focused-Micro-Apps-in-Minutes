import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono text-xs font-semibold">
              μ
            </div>
            <span className="font-bold text-white text-sm">NanoForge</span>
            <span className="text-zinc-500 text-xs">· The Micro-App Workbench</span>
          </div>

          {/* Nav links mirror */}
          <nav className="flex flex-wrap justify-center gap-6 text-zinc-400">
            <a href="#capabilities" className="hover:text-zinc-200 transition-colors">
              Capabilities
            </a>
            <a href="#playground" className="hover:text-zinc-200 transition-colors">
              Live Mini-Apps
            </a>
            <a href="#scoper" className="hover:text-zinc-200 transition-colors">
              App Scoper
            </a>
            <a href="#pricing" className="hover:text-zinc-200 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-zinc-200 transition-colors">
              FAQ
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div>
            © {new Date().getFullYear()} NanoForge Labs Inc. Built with clean single-file discipline.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Notice</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Open Source Boilerplates</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
