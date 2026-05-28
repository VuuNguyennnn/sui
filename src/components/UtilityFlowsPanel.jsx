import { utilityFlows } from '../data/dashboardData';

function UtilityFlowsPanel() {
  return (
    <section className="glass-panel h-full rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Programmable Utilities</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Flagship Product Flows</h3>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {utilityFlows.map((flow) => (
          <div key={flow.title} className="rounded-[1.4rem] border border-white/10 bg-[#07121d]/70 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="break-words text-lg font-medium text-white">{flow.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/62">{flow.description}</p>
              </div>
              <span className="max-w-full self-start whitespace-normal rounded-full border border-[#4ca2ff]/25 bg-[#4ca2ff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#dff3ff] md:self-auto">
                {flow.status}
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-[#9fd4ff]">{flow.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UtilityFlowsPanel;
