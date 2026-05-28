import { Eye, Shield, Workflow } from 'lucide-react';
import { usePtbBuilder } from '../hooks/usePtbBuilder';

function Primitives() {
  const { preview } = usePtbBuilder();

  return (
    <section id="composability" className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold-300/80">Native Composability</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[0.08em] text-white md:text-5xl">
            Move objects and PTBs make finance feel native.
          </h3>

          <div className="mt-8 space-y-6 text-white/72">
            <div className="flex gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold-300/25 bg-white/[0.03]">
                <Workflow className="h-5 w-5 text-gold-200" />
              </div>
              <p className="leading-8">
                On Sui Move, assets exist as independent objects rather than opaque balances. This unlocks
                fine-grained ownership, safer transfer semantics, and composable financial state for every flow.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold-300/25 bg-white/[0.03]">
                <Shield className="h-5 w-5 text-gold-200" />
              </div>
              <p className="leading-8">
                Programmable Transaction Blocks bundle actions atomically — for example
                <span className="text-gold-200"> Pay → Swap → Deposit</span> — reducing user friction while preserving
                deterministic execution and capital safety.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold-300/25 bg-white/[0.03]">
                <Eye className="h-5 w-5 text-gold-200" />
              </div>
              <p className="leading-8">
                Before signing, the PTB Previewer Layer turns natural-language intent into a human-readable
                execution graph so users understand exactly what capital transformations will occur.
              </p>
            </div>
          </div>
        </div>

        <div className="gold-border panel-sheen rounded-[2rem] p-6 shadow-gold md:p-8">
          <div className="flex flex-col gap-3 border-b border-white/8 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-300/80">PTB Previewer Layer</p>
              <h4 className="mt-2 text-2xl font-semibold text-white">Intent → Action Graph</h4>
            </div>
            <p className="text-sm text-white/50">Natural language compiled into atomic execution blocks</p>
          </div>

          <div className="mt-8 space-y-4">
            {preview.map((step, index) => (
              <div key={step.id} className="relative rounded-3xl border border-white/8 bg-white/[0.025] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-300/20 bg-[linear-gradient(135deg,rgba(255,246,216,0.12),rgba(228,191,104,0.06))] text-sm font-semibold text-gold-200">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Action Block</p>
                      <p className="mt-1 text-xl font-medium text-white">{step.label}</p>
                    </div>
                  </div>

                  <span className="rounded-full border border-gold-300/20 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-gold-200/85">
                    Risk {step.risk}
                  </span>
                </div>

                <p className="mt-4 max-w-2xl leading-7 text-white/68">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Primitives;
