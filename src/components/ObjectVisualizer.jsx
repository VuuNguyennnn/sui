const objects = [
  { id: 'OBJ-001', type: 'Treasury Vault', owner: 'DAO Treasury', state: 'Active' },
  { id: 'OBJ-014', type: 'Escrow Contract', owner: 'Freelance Ops', state: 'Locked' },
  { id: 'OBJ-031', type: 'Credit Policy', owner: 'Risk Engine', state: 'Monitoring' },
];

function ObjectVisualizer() {
  return (
    <section className="glass-panel h-full rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Move Object Visualizer</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Composable Financial Objects</h3>
      <div className="mt-6 space-y-4">
        {objects.map((item) => (
          <div key={item.id} className="rounded-[1.35rem] border border-white/10 bg-[#07121d]/70 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="text-sm text-white/45">{item.id}</p>
                <p className="mt-1 break-words text-lg font-medium text-white">{item.type}</p>
              </div>
              <span className="max-w-full self-start whitespace-normal rounded-full border border-[#4ca2ff]/25 bg-[#4ca2ff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#dff3ff] md:self-auto">
                {item.state}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/60">Owner: {item.owner}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ObjectVisualizer;
