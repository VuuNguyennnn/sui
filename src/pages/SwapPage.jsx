import { ArrowDownUp, ChevronDown, Info, Settings2, ShieldCheck, TimerReset } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { SuiTokenIcon, UsdcTokenIcon } from '../components/TokenIcons';

const tokens = {
  SUI: { symbol: 'SUI', name: 'Sui', price: 1.19, balance: 2540.45, color: 'bg-[#4ca2ff]' },
  USDC: { symbol: 'USDC', name: 'USD Coin', price: 1, balance: 1820.18, color: 'bg-[#38b6ff]' },
  vSUI: { symbol: 'vSUI', name: 'Vested SUI', price: 1.16, balance: 642.2, color: 'bg-[#7dd3fc]' },
};

function TokenIcon({ token }) {
  if (token === 'USDC') return <UsdcTokenIcon className="h-6 w-6" />;
  return <SuiTokenIcon className={`h-6 w-6 ${token === 'vSUI' ? 'text-[#7dd3fc]' : ''}`} />;
}

function TokenSelect({ label, token, amount, onAmountChange, onTokenChange, loading, readOnly = false }) {
  const tokenData = tokens[token];
  return (
    <div className="glass-panel rounded-3xl p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-white/55">
        <span>{label}</span>
        <span>Balance: {tokenData.balance.toLocaleString()}</span>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {loading ? (
          <div className="h-10 w-36 animate-pulse rounded-xl bg-white/10" />
        ) : (
          <input
            value={amount}
            readOnly={readOnly}
            onChange={(event) => onAmountChange(event.target.value)}
            className="w-full bg-transparent text-3xl font-semibold text-white outline-none"
          />
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#08111c]">
            <TokenIcon token={token} />
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-white">{tokenData.symbol}</p>
            <p className="text-xs text-white/45">{tokenData.name}</p>
          </div>
          <select value={token} onChange={(event) => onTokenChange(event.target.value)} className="rounded-2xl border border-white/10 bg-[#102133] px-4 py-3 text-sm text-white outline-none">
            {Object.keys(tokens).map((symbol) => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
          <ChevronDown className="-ml-9 h-4 w-4 text-white/60 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function SwapPage() {
  const { addToast, addLog } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [fromToken, setFromToken] = useState('SUI');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('125');
  const [slippage, setSlippage] = useState('0.5');
  const [deadline, setDeadline] = useState('20');
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [toAmount, setToAmount] = useState('148.75');

  useEffect(() => {
    const nextFrom = searchParams.get('from');
    const nextTo = searchParams.get('to');
    if (nextFrom && tokens[nextFrom]) setFromToken(nextFrom);
    if (nextTo && tokens[nextTo]) setToToken(nextTo);
    if (nextFrom || nextTo) {
      addToast('Route Loaded', `Swap terminal prefilled for ${nextFrom || fromToken} to ${nextTo || toToken}.`);
      addLog('Swap route preselected', 'Navigation from pools table injected token pair into terminal.');
    }
  }, [searchParams]);

  useEffect(() => {
    setLoadingQuote(true);
    const input = Number(fromAmount || 0);
    const fromPrice = tokens[fromToken].price;
    const toPrice = tokens[toToken].price;
    const timer = setTimeout(() => {
      if (!input || !fromPrice || !toPrice) {
        setToAmount('0.00');
      } else {
        const rateVariance = fromToken === 'SUI' && toToken === 'USDC' ? 1 : 0.996;
        setToAmount((((input * fromPrice) / toPrice) * rateVariance).toFixed(2));
      }
      setLoadingQuote(false);
    }, 240);
    return () => clearTimeout(timer);
  }, [fromAmount, fromToken, toToken]);

  const priceImpact = useMemo(() => {
    const amount = Number(fromAmount || 0);
    return `${Math.min(0.08 + amount / 5000, 1.9).toFixed(2)}%`;
  }, [fromAmount]);

  const minimumReceived = useMemo(() => {
    const output = Number(toAmount || 0);
    const tolerance = Number(slippage || 0) / 100;
    return (output * (1 - tolerance)).toFixed(2);
  }, [toAmount, slippage]);

  const route = useMemo(() => {
    if (fromToken === 'SUI' && toToken === 'USDC') return 'DeepBook -> Stable Route';
    if (fromToken === 'vSUI' && toToken === 'USDC') return 'Cetus -> Stable Route';
    return 'Smart Aggregated Route';
  }, [fromToken, toToken]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="glass-panel neon-outline rounded-[2rem] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-[#9fd4ff]">Swap</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Advanced Swap Terminal</h2>
        <p className="mt-3 max-w-2xl text-white/65">
          Route assets through premium Sui liquidity with live slippage controls, token metadata,
          and execution-aware price impact monitoring.
        </p>
      </section>

      <div className="glass-panel neon-outline rounded-[2rem] p-5 md:p-6">
        <div className="space-y-4">
          <TokenSelect label="From" token={fromToken} amount={fromAmount} onAmountChange={setFromAmount} onTokenChange={setFromToken} loading={false} />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
                addLog('Assets flipped', 'From/To assets swapped in terminal.');
              }}
              className="rounded-2xl border border-[#4ca2ff]/30 bg-[#4ca2ff]/10 p-3 text-[#dff3ff] transition hover:bg-[#4ca2ff]/18 hover:shadow-[0_0_26px_rgba(76,162,255,0.22)]"
            >
              <ArrowDownUp className="h-5 w-5" />
            </button>
          </div>

          <TokenSelect label="To" token={toToken} amount={toAmount} onAmountChange={() => {}} onTokenChange={setToToken} loading={loadingQuote} readOnly />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="glass-panel rounded-2xl p-4 text-sm text-white/68">
            <div className="mb-3 flex items-center gap-2 text-[#9fd4ff]">
              <Settings2 className="h-4 w-4" />
              Slippage Tolerance
            </div>
            <div className="flex gap-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSlippage(value)}
                  className={`rounded-xl px-4 py-2 transition ${slippage === value ? 'bg-[#4ca2ff]/16 text-white border border-[#4ca2ff]/30' : 'bg-white/5 text-white/70 border border-white/10'}`}
                >
                  {value}%
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 text-white/60">
              <TimerReset className="h-4 w-4 text-[#9fd4ff]" />
              <span>Deadline</span>
              <input
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="ml-auto w-20 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right text-white outline-none"
              />
              <span>min</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4 text-sm text-white/68">
            <div className="mb-2 flex items-center gap-2 text-[#9fd4ff]">
              <Info className="h-4 w-4" />
              Execution Details
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Rate</span><span>1 {fromToken} = {(tokens[fromToken].price / tokens[toToken].price).toFixed(4)} {toToken}</span></div>
              <div className="flex justify-between"><span>Route</span><span>{route}</span></div>
              <div className="flex justify-between"><span>Quote status</span><span>{loadingQuote ? 'Refreshing...' : 'Live'}</span></div>
              <div className="flex justify-between"><span>Slippage</span><span>{slippage}%</span></div>
              <div className="flex justify-between"><span>Minimum received</span><span>{minimumReceived} {toToken}</span></div>
              <div className="flex justify-between"><span>Price Impact</span><span>{priceImpact}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-4 glass-panel rounded-2xl p-4 text-sm text-white/65">
          <div className="flex items-center gap-2 text-[#9fd4ff]">
            <ShieldCheck className="h-4 w-4" />
            Guardian checks passed: low slippage, stable route health, sufficient liquidity depth.
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-4 text-sm text-white/65">
            <p className="text-white/45">Execution path</p>
            <p className="mt-2 font-medium text-white">{fromToken} {'->'} Aggregator {'->'} {toToken}</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-sm text-white/65">
            <p className="text-white/45">Estimated fee</p>
            <p className="mt-2 font-medium text-white">0.24 SUI</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-sm text-white/65">
            <p className="text-white/45">Settlement mode</p>
            <p className="mt-2 font-medium text-white">Single PTB Atomic Swap</p>
          </div>
        </div>

        <button
          onClick={() => {
            addToast('Swap Simulated', `${fromAmount} ${fromToken} routed into ${toAmount} ${toToken}.`);
            addLog('Swap simulated', `Atomic swap preview executed using ${route}.`);
          }}
          className="swap-button-hover mt-6 w-full rounded-2xl border border-[#4ca2ff]/40 bg-gradient-to-r from-[#16314e] via-[#15486c] to-[#0f2033] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#e7f8ff] shadow-[0_0_18px_rgba(76,162,255,0.20)] transition duration-300 hover:scale-[1.01] hover:border-[#4ca2ff]/70"
        >
          Swap {fromToken} for {toToken}
        </button>
      </div>
    </div>
  );
}

export default SwapPage;
