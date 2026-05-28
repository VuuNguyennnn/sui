import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PoolsTable from '../components/PoolsTable';

function PoolsPage() {
  const [search, setSearch] = useState('');
  const summary = useMemo(() => {
    return search ? `Searching liquidity routes for: ${search}` : 'Track premium Sui liquidity venues and route capital across top pools.';
  }, [search]);

  return (
    <div className="space-y-6">
      <section className="glass-panel neon-outline rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#9fd4ff]">Liquidity Pools</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Sui DeFi Venues</h2>
            <p className="mt-3 max-w-2xl text-white/65">{summary}</p>
          </div>

          <div className="glass-panel flex w-full items-center gap-3 rounded-2xl px-4 py-3 md:max-w-sm">
            <Search className="h-4 w-4 text-[#8dd7ff]" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by pair name..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/50">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Best execution</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Stable routes</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Atomic settlement</span>
        </div>
      </section>

      <PoolsTable search={search} />
    </div>
  );
}

export default PoolsPage;
