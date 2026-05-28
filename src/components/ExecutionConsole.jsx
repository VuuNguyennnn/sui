function ExecutionConsole({ logs = [] }) {
  return (
    <section className="glass-panel rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Execution Console</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Runtime Events</h3>
      <div className="mt-5 space-y-3 rounded-[1.35rem] border border-white/10 bg-[#050c16]/90 p-4 font-mono text-sm text-white/75">
        {logs.length === 0 ? (
          <p className="text-white/40">No runtime events yet.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-3 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
              <span className="text-[#9fd4ff]">[{log.time}]</span>
              <div>
                <p className="text-white">{log.title}</p>
                <p className="mt-1 text-white/50">{log.detail}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ExecutionConsole;
