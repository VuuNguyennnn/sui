import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useSuiWallet } from '../hooks/useSuiWallet';

function Hero() {
  const { connectWallet, connecting } = useSuiWallet();

  return (
    <section id="hero" className="pattern-code relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-300/20 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold-200/90">
            <Sparkles className="h-4 w-4" />
            DeFi & Payments on Sui
          </p>

          <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[0.12em] text-white md:text-7xl">
            SUI <span className="gold-text">PROGRAMMABLE</span> MONEY.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
            Intelligent Financial Flows & Capital Management on Sui.
            Orchestrate payments, swaps, yield routing, and escrow logic through atomic,
            object-native transaction flows with premium-grade clarity.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => connectWallet('zkLogin')}
              className="gold-border panel-sheen inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-gold transition hover:shadow-glow"
            >
              {connecting ? 'Launching...' : 'Launch App'}
              <ArrowRight className="h-4 w-4 text-gold-200" />
            </button>

            <a
              href="https://docs.sui.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/85 transition hover:border-gold-300/40 hover:text-gold-200"
            >
              View Documentation
              <BookOpen className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="gold-border panel-sheen relative rounded-[2rem] p-7 shadow-gold">
          <div className="absolute right-6 top-6 rounded-full border border-gold-300/20 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-gold-200/80">
            Live Flow State
          </div>

          <div className="space-y-6 pt-12">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-300/80">Programmable Cashflow</p>
              <p className="mt-3 text-2xl font-semibold text-white">Atomic treasury operations with PTBs</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Objects secured', '128'],
                ['Live routes', '24'],
                ['Policy guards', '8'],
                ['Capital efficiency', '+19.4%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/45">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-gold-200">{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-gold-300/15 bg-[linear-gradient(135deg,rgba(255,246,216,0.06),rgba(228,191,104,0.02),rgba(255,255,255,0.01))] p-5">
              <p className="text-sm leading-7 text-white/70">
                Translate intent into a controlled on-chain execution path:
                <span className="ml-2 text-gold-200">Pay → Swap → Deposit → Stream → Release</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
