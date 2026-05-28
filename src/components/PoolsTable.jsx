import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SuiTokenIcon, TokenPairIcon, UsdcTokenIcon } from './TokenIcons';

const pools = [
  { name: 'SUI/USDC', price: '$1.19', change: '+4.2%', tvl: '$12.4M', volume: '$3.2M', from: 'SUI', to: 'USDC' },
  { name: 'SUI/vSUI', price: '$1.16', change: '+2.8%', tvl: '$8.9M', volume: '$2.1M', from: 'SUI', to: 'vSUI' },
  { name: 'CETUS/SUI', price: '$0.18', change: '-1.9%', tvl: '$6.2M', volume: '$1.3M', from: 'SUI', to: 'USDC' },
];

function PairVisual({ pair }) {
  if (pair === 'SUI/USDC') {
    return <TokenPairIcon left={<SuiTokenIcon className="h-5 w-5" />} right={<UsdcTokenIcon className="h-5 w-5" />} />;
  }
  if (pair === 'SUI/vSUI') {
    return <TokenPairIcon left={<SuiTokenIcon className="h-5 w-5" />} right={<SuiTokenIcon className="h-5 w-5 text-[#7dd3fc]" />} />;
  }
  return <TokenPairIcon left={<UsdcTokenIcon className="h-5 w-5" />} right={<SuiTokenIcon className="h-5 w-5" />} />;
}

function PoolsTable({ search = '' }) {
  const navigate = useNavigate();
  const filtered = pools.filter((pool) => pool.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="glass-panel neon-outline overflow-x-auto rounded-[1.75rem]">
      <table className="min-w-full text-left text-sm text-white/80">
        <thead className="border-b border-white/10 bg-white/[0.02] text-white/55">
          <tr>
            <th className="px-5 py-4 font-medium">Pool</th>
            <th className="px-5 py-4 font-medium">Token Price</th>
            <th className="px-5 py-4 font-medium">24h Change</th>
            <th className="px-5 py-4 font-medium">TVL</th>
            <th className="px-5 py-4 font-medium">24h Volume</th>
            <th className="px-5 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((pool, index) => {
            const positive = pool.change.startsWith('+');
            return (
              <motion.tr
                key={pool.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="border-b border-white/5 transition hover:bg-white/[0.03]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <PairVisual pair={pool.name} />
                    <div>
                      <p className="font-medium text-white">{pool.name}</p>
                      <p className="text-xs text-white/45">Concentrated liquidity</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">{pool.price}</td>
                <td className={`px-5 py-4 ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>{pool.change}</td>
                <td className="px-5 py-4">{pool.tvl}</td>
                <td className="px-5 py-4">{pool.volume}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => navigate(`/swap?from=${pool.from}&to=${pool.to}`)}
                    className="rounded-full border border-[#4ca2ff]/30 bg-[#4ca2ff]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#dff3ff] transition hover:bg-[#4ca2ff]/20 hover:shadow-[0_0_24px_rgba(76,162,255,0.18)]"
                  >
                    Swap
                  </button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PoolsTable;
