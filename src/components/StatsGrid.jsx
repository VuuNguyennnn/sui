import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, WalletCards, Zap } from 'lucide-react';

const metrics = [
  { label: 'Total Value Locked', value: 45.2, suffix: 'M SUI', change: '+12.4%', icon: WalletCards, decimals: 1, tone: 'positive' },
  { label: '24h Volume', value: 3.8, suffix: 'M', change: '+1.7%', icon: BarChart3, decimals: 1, tone: 'neutral' },
  { label: 'Active Wallets', value: 14205, suffix: '', change: '+6.8%', icon: Activity, decimals: 0, tone: 'neutral' },
  { label: 'PTBs Executed', value: 128492, suffix: '', change: '+18.2%', icon: Zap, decimals: 0, tone: 'neutral' },
];

function CounterValue({ value, decimals = 0, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const frame = 16;
    const steps = Math.max(1, Math.round(duration / frame));
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, frame);
    return () => clearInterval(timer);
  }, [value]);

  const formatted = useMemo(() => {
    return decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
  }, [count, decimals]);

  return <span>{prefix}{formatted}{suffix ? ` ${suffix}` : ''}</span>;
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`glass-panel rounded-[1.75rem] p-5 ${item.tone === 'positive' ? 'metric-positive' : 'metric-neutral'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/58">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white md:text-[2rem]">
                  <CounterValue
                    value={item.value}
                    decimals={item.decimals}
                    prefix={item.label === 'Total Value Locked' || item.label === '24h Volume' ? '$' : ''}
                    suffix={item.suffix}
                  />
                </p>
                <p className="mt-2 text-sm text-emerald-400">{item.change}</p>
              </div>

              <div className="token-badge rounded-2xl p-3">
                <Icon className="h-5 w-5 text-[#4ca2ff]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsGrid;
