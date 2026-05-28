import { motion } from 'framer-motion';
import { Sparkles, PlayCircle, WandSparkles } from 'lucide-react';

function IntentEngine({ intentText, onIntentChange, onBuildIntent, onRunDemo, building }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-panel neon-outline rounded-[1.75rem] p-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Intent Engine</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Plain English {'->'} PTB Preview</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/62">
            Describe a financial goal in natural language. The engine translates it into an atomic,
            reviewable programmable transaction flow before execution.
          </p>
        </div>

        <button
          type="button"
          onClick={onRunDemo}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4ca2ff]/30 bg-[#4ca2ff]/10 px-5 py-3 text-sm font-medium text-[#e5f7ff] transition hover:bg-[#4ca2ff]/18"
        >
          <PlayCircle className="h-4 w-4" />
          Run Demo Mode
        </button>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#07121d]/70 p-4">
        <div className="mb-3 inline-flex items-center gap-2 text-sm text-[#9fd4ff]">
          <Sparkles className="h-4 w-4" />
          Financial intent input
        </div>
        <textarea
          value={intentText}
          onChange={(event) => onIntentChange(event.target.value)}
          rows={4}
          className="w-full resize-none rounded-2xl border border-white/10 bg-[#020b14]/80 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/35 focus:border-[#4ca2ff]/35"
          placeholder="Example: Convert 500 SUI to USDC, keep slippage under 0.5%, then deposit into treasury vault and schedule payroll stream."
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBuildIntent}
            disabled={building}
            className="swap-button-hover inline-flex items-center justify-center gap-2 rounded-2xl border border-[#4ca2ff]/40 bg-gradient-to-r from-[#15314c] via-[#15486c] to-[#0f2033] px-5 py-3 text-sm font-semibold text-[#ecfbff] transition hover:border-[#4ca2ff]/65 disabled:opacity-60"
          >
            <WandSparkles className="h-4 w-4" />
            {building ? 'Compiling intent...' : 'Compile PTB'}
          </button>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/55">
            Optimized for composable Sui flows, treasury automation, escrow, and payment routing.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default IntentEngine;
