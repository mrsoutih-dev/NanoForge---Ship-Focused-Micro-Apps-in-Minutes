import React, { useState } from 'react';
import { validateLeadForm, LeadFormInput } from '../utils/calculator';

interface LeadCaptureProps {
  initialPlan?: string;
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({
  initialPlan = 'Hobbyist',
  isOpen = true,
  onClose,
  isModal = false,
}) => {
  const [form, setForm] = useState<LeadFormInput>({
    fullName: '',
    email: '',
    appIdea: '',
  });

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateLeadForm(form);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable persistence
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('nanoforge_signups');
        const list = stored ? JSON.parse(stored) : [];
        list.push({
          ...form,
          plan: selectedPlan,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('nanoforge_signups', JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setForm({ fullName: '', email: '', appIdea: '' });
    setIsSubmitted(false);
    if (onClose) onClose();
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1">
          <span className="text-indigo-400 font-mono">Early Developer Access</span>
          <span aria-hidden="true">·</span>
          <span>CLI & Web Workbench</span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Start building micro-apps today.
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-zinc-300">
          Join 8,400+ developers shipping lean web utilities. Instant invite to the CLI beta and private repository templates.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 rounded-xl bg-zinc-950 border border-emerald-800/60 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold">Access Approved & Saved!</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Thank you, <strong className="text-white">{form.fullName}</strong>. We've reserved your sandbox on the{' '}
            <strong className="text-indigo-300">{selectedPlan}</strong> tier. An invitation link has been dispatched to{' '}
            <span className="font-mono text-zinc-200">{form.email}</span>.
          </p>
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300">
            $ npm install -g @nanoforge/cli<br />
            $ nanoforge init "{form.appIdea || 'my-micro-app'}"
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors"
          >
            Submit Another Micro-App Idea
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plan Selector */}
          <div className="space-y-1.5">
            <label htmlFor="plan-selector" className="text-xs font-medium text-zinc-300">Target Plan Tier</label>
            <select
              id="plan-selector"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Hobbyist">Hobbyist ($0 / free forever)</option>
              <option value="Independent Builder">Independent Builder ($15/mo)</option>
              <option value="Studio Team">Studio Team ($39/mo)</option>
            </select>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="lead-name" className="text-xs font-medium text-zinc-300">Full Name</label>
            <input
              id="lead-name"
              type="text"
              placeholder="e.g. Alex Rivera"
              value={form.fullName}
              onChange={(e) => {
                setForm({ ...form, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              className={`w-full px-3.5 py-2.5 text-xs rounded-lg bg-zinc-950 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 ${
                errors.fullName
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-zinc-800 focus:ring-indigo-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="lead-email" className="text-xs font-medium text-zinc-300">Work or Personal Email</label>
            <input
              id="lead-email"
              type="email"
              placeholder="alex@company.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-3.5 py-2.5 text-xs rounded-lg bg-zinc-950 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 ${
                errors.email
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-zinc-800 focus:ring-indigo-500'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
            )}
          </div>

          {/* App Idea */}
          <div className="space-y-1">
            <label htmlFor="lead-idea" className="text-xs font-medium text-zinc-300">What small app do you plan to build?</label>
            <textarea
              id="lead-idea"
              rows={2}
              placeholder="e.g. A real-time token estimator for our markdown documentation"
              value={form.appIdea}
              onChange={(e) => {
                setForm({ ...form, appIdea: e.target.value });
                if (errors.appIdea) setErrors({ ...errors, appIdea: '' });
              }}
              className={`w-full px-3.5 py-2 text-xs rounded-lg bg-zinc-950 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 ${
                errors.appIdea
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-zinc-800 focus:ring-indigo-500'
              }`}
            />
            {errors.appIdea && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.appIdea}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg transition-colors shadow-md shadow-indigo-950 disabled:opacity-50 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {isSubmitting ? 'Reserving Sandbox...' : 'Request Early Access'}
            </button>
          </div>
          <div className="text-center text-[11px] text-zinc-400">
            No credit card required · Instant access to starter templates
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Close early access modal"
          >
            ✕
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="access" className="py-20 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
          {content}
        </div>
      </div>
    </section>
  );
};
