import { motion } from 'framer-motion';

function PtbPreviewPanel({ previewData, lastExecution }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.04 }}
      className="glass-panel neon-outline rounded-[1.75rem] p-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">PTB Preview</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Atomic Action Graph</h3>
        </div>
        {lastExecution && (
          <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-300">
            Last digest: {lastExecution.digest}
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-7 text-white/62">{previewData.summary}</p>

      <div className="mt-6 space-y-4">
        {previewData.actions.map((step, index) => (
          <div key={step.id} className="rounded-[1.4rem] border border-white/10 bg-[#07121d]/70 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#4ca2ff]/20 bg-[#4ca2ff]/10 text-sm font-semibold text-[#9fd4ff]">
                  0{index + 1}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Action Block</p>
                  <p className="mt-1 text-lg font-medium text-white">{step.label}</p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/65">
                Risk {step.risk}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/62">{step.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default PtbPreviewPanel;
