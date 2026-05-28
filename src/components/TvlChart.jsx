import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { day: '01', price: 0.74 }, { day: '02', price: 0.76 }, { day: '03', price: 0.79 },
  { day: '04', price: 0.81 }, { day: '05', price: 0.78 }, { day: '06', price: 0.84 },
  { day: '07', price: 0.88 }, { day: '08', price: 0.86 }, { day: '09', price: 0.91 },
  { day: '10', price: 0.95 }, { day: '11', price: 0.93 }, { day: '12', price: 0.97 },
  { day: '13', price: 0.96 }, { day: '14', price: 0.99 }, { day: '15', price: 1.01 },
  { day: '16', price: 0.98 }, { day: '17', price: 0.94 }, { day: '18', price: 0.97 },
  { day: '19', price: 1.02 }, { day: '20', price: 1.04 }, { day: '21', price: 1.01 },
  { day: '22', price: 1.05 }, { day: '23', price: 1.07 }, { day: '24', price: 1.09 },
  { day: '25', price: 1.06 }, { day: '26', price: 1.12 }, { day: '27', price: 1.15 },
  { day: '28', price: 1.11 }, { day: '29', price: 1.16 }, { day: '30', price: 1.19 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-2xl px-4 py-3 text-sm text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <p className="mb-2 text-white/58">Day {label}</p>
      <p className="text-[#9fd4ff]">SUI Price: ${payload[0].value}</p>
    </div>
  );
}

function TvlChart() {
  return (
    <div className="glass-panel neon-outline rounded-[1.75rem] p-5 md:p-6">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#9fd4ff]">Market Pulse</p>
          <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">30-Day SUI Price Trend</h3>
        </div>
        <p className="text-sm text-white/55">Neon liquidity signal across the last 30 trading days</p>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ca2ff" stopOpacity={0.55} />
                <stop offset="50%" stopColor="#38b6ff" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#38b6ff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} domain={[0.7, 1.25]} />
            <Tooltip content={<CustomTooltip />} />
            <Area isAnimationActive={false} type="monotone" dataKey="price" stroke="#4ca2ff" strokeWidth={2.5} fill="url(#priceGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TvlChart;
