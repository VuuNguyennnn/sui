const positions = [
  { label: 'Treasury Cash', value: '$12.8M', detail: 'Ready for routing' },
  { label: 'Yield Positions', value: '$6.4M', detail: 'Across 4 vaults' },
  { label: 'Escrow Locked', value: '$1.1M', detail: '3 active deals' },
  { label: 'Credit Exposure', value: '$840k', detail: 'Healthy utilization' },
];

function PortfolioPanel() {
  return (
    <section className="glass-panel h-full rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Portfolio Command</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Capital Distribution</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {positions.map((item) => (
          <div key={item.label} className="rounded-[1.35rem] border border-white/10 bg-[#07121d]/70 p-4">
            <p className="text-sm text-white/50">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-white/60">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PortfolioPanel;
