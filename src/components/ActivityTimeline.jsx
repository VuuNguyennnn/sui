import { timelineEntries } from '../data/dashboardData';

function ActivityTimeline() {
  return (
    <section className="glass-panel rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Activity Timeline</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Operational Feed</h3>
      <div className="mt-6 space-y-5">
        {timelineEntries.map((item) => (
          <div key={`${item.time}-${item.title}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-[#4ca2ff] shadow-[0_0_14px_rgba(76,162,255,0.45)]" />
              <div className="mt-2 h-full w-px bg-white/10" />
            </div>
            <div className="pb-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">{item.time}</p>
              <p className="mt-1 font-medium text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-white/62">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityTimeline;
