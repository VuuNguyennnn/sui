import { AlertTriangle, ShieldCheck, Waves } from 'lucide-react';
import { guardianChecks } from '../data/dashboardData';

const icons = {
  warning: AlertTriangle,
  neutral: Waves,
  positive: ShieldCheck,
};

function GuardianPanel() {
  return (
    <section className="glass-panel neon-outline rounded-[1.75rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#9fd4ff]">Guardian Layer</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Risk Checks Before Execution</h3>
      <div className="mt-6 space-y-4">
        {guardianChecks.map((item) => {
          const Icon = icons[item.severity];
          return (
            <div key={item.title} className="rounded-[1.35rem] border border-white/10 bg-[#07121d]/70 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-2">
                  <Icon className="h-4 w-4 text-[#9fd4ff]" />
                </div>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-white/62">{item.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GuardianPanel;
