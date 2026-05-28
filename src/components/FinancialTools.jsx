import { ArrowRight, BanknoteArrowDown, Landmark, ShieldEllipsis, Waves } from 'lucide-react';
import { usePtbBuilder } from '../hooks/usePtbBuilder';

const utilities = [
  {
    title: 'Automated Salary Streaming',
    description:
      'Real-time payroll streaming with programmable allocation into yield-bearing strategies and dynamic treasury policies.',
    icon: Waves,
    flow: 'salary-streaming',
  },
  {
    title: 'Intelligent Routing Vault',
    description:
      'A capital vault that atomically routes assets across swaps, deposits, and reserve tranches for optimized utilization.',
    icon: Landmark,
    flow: 'routing-vault',
  },
  {
    title: 'Payment-Linked Credit',
    description:
      'Trust-minimized credit primitives derived from verifiable payment history, recurring inflows, and programmable controls.',
    icon: BanknoteArrowDown,
    flow: 'payment-credit',
  },
  {
    title: 'Milestone-Based Escrow',
    description:
      'Smart escrow that protects capital and automatically releases funds upon verifiable milestone completion states.',
    icon: ShieldEllipsis,
    flow: 'milestone-escrow',
  },
];

function FinancialTools() {
  const { executeFlow, submitting, lastExecution } = usePtbBuilder();

  return (
    <section id="utilities" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-300/80">Programmable Financial Utilities</p>
            <h3 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[0.08em] text-white md:text-5xl">
              Four premium execution layers for modern programmable finance.
            </h3>
          </div>

          {lastExecution && (
            <div className="gold-border panel-sheen rounded-2xl px-5 py-4 text-sm text-white/75 shadow-gold">
              Last flow: <span className="text-gold-200">{lastExecution.flowName}</span>
              <span className="mx-2 text-white/30">•</span>
              {lastExecution.digest}
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {utilities.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="gold-border panel-sheen group flex h-full flex-col rounded-[1.75rem] p-6 shadow-gold transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-300/20 bg-[linear-gradient(135deg,rgba(255,246,216,0.12),rgba(228,191,104,0.06))]">
                  <Icon className="h-6 w-6 text-gold-200" />
                </div>

                <h4 className="mt-6 text-2xl font-semibold leading-tight text-white">{item.title}</h4>
                <p className="mt-4 flex-1 leading-7 text-white/68">{item.description}</p>

                <button
                  type="button"
                  onClick={() => executeFlow(item.flow)}
                  disabled={submitting}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold-300/35 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-100 transition hover:bg-white/[0.03] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Executing...' : 'Execute Flow'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FinancialTools;
