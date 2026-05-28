import { Wallet, Droplets, Sparkles } from 'lucide-react';
import { useSuiWallet } from '../hooks/useSuiWallet';

function Header() {
  const { connected, connecting, account, mode, connectWallet, disconnectWallet } = useSuiWallet();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c1430]/92">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="gold-border premium-card flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b0f19]">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <Droplets className="h-6 w-6 text-gold-200" />
              <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-cyan-200" />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.42em] text-cyan-100/80">Sui Overflow 2026</p>
            <h1 className="text-sm font-semibold tracking-[0.24em] text-white">Programmable Money</h1>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-white/72 md:flex">
          <a href="#hero" className="transition hover:text-cyan-200">Overview</a>
          <a href="#composability" className="transition hover:text-cyan-200">Composability</a>
          <a href="#utilities" className="transition hover:text-cyan-200">Utilities</a>
        </nav>

        <button
          type="button"
          onClick={() => (connected ? disconnectWallet() : connectWallet('zkLogin'))}
          className="gold-border premium-card transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full bg-[#0b0f19] px-5 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(104,186,255,0.12)]"
        >
          <Wallet className="h-4 w-4 text-gold-200" />
          {connecting
            ? 'Connecting...'
            : connected
              ? `${mode || 'wallet'} · ${account}`
              : 'Connect Wallet / zkLogin'}
        </button>
      </div>
    </header>
  );
}

export default Header;
