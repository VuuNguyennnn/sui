import { useState } from 'react';
import { Menu, X, LayoutDashboard, Droplets, ArrowLeftRight, Wallet, Workflow, TrendingUp } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import ToastViewport from '../components/ToastViewport';
import WalletModal from '../components/WalletModal';

const navItems = [
  { label: 'Overview', to: '/overview', icon: LayoutDashboard },
  { label: 'Pools', to: '/pools', icon: Droplets },
  { label: 'Swap', to: '/swap', icon: ArrowLeftRight },
  { label: 'Flow Studio', to: '/flow-studio', icon: Workflow },
  { label: 'Markets', to: '/markets', icon: TrendingUp },
];

function SuiLogo() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4ca2ff] drop-shadow-[0_0_10px_rgba(76,162,255,0.6)]">
      <path d="M50 12C31.5 30.5 19 46.5 19 62C19 77.5 32.5 88 50 88C67.5 88 81 77.5 81 62C81 46.5 68.5 30.5 50 12ZM50 78C39.5 78 31 71.5 31 62C31 52.5 40 37.5 50 25.5C60 37.5 69 52.5 69 62C69 71.5 60.5 78 50 78Z" fill="currentColor"/>
      <path d="M50 35C44 44.5 37 54.5 37 62C37 69 42.5 74 50 74C57.5 74 63 69 63 62C63 54.5 56 44.5 50 35Z" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletState, setWalletState] = useState({
    address: null,
    online: false,
    walletName: null,
  });
  const [toasts, setToasts] = useState([]);
  const [logs, setLogs] = useState([]);

  const addToast = (title, description) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((current) => [...current, { id, title, description }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const addLog = (title, detail) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setLogs((current) => [{ id, time, title, detail }, ...current].slice(0, 12));
  };

  return (
    <div className="cyber-bg min-h-screen bg-[#010a15] text-white">
      <div className="bg-blob left-[8%] top-[8%] h-56 w-56 bg-[#4ca2ff]/18" />
      <div className="bg-blob right-[6%] top-[28%] h-[18rem] w-[18rem] bg-[#f43f5e]/12 [animation-delay:2s]" />
      <div className="bg-blob bottom-[4%] left-[28%] h-[16rem] w-[16rem] bg-[#38b6ff]/14 [animation-delay:5s]" />
    
      <aside className="glass-panel hidden w-80 border-r border-white/10 md:fixed md:inset-y-0 md:flex md:flex-col">
        <div className="flex items-center gap-4 border-b border-white/10 px-6 py-7">
          <div className="glass-panel flex h-14 w-14 items-center justify-center rounded-2xl">
            <SuiLogo />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-[#9fd4ff]">SUI NETWORK</p>
            <h1 className="mt-1 text-sm font-semibold tracking-[0.22em] text-white/95">Programmable Money</h1>
          </div>
        </div>

        <nav className="flex-1 space-y-3 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-300 ${
                    isActive
                      ? 'active-nav-text border-l-4 border-[#4ca2ff] border-white/10 bg-[#4ca2ff]/10 text-white'
                      : 'border-transparent bg-white/5 text-white/78 hover:border-white/10 hover:bg-white/8 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4 text-[#8dd7ff]" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => {
              addToast('Wallet Modal Opened', 'Choose a Sui-compatible wallet to continue.');
              addLog('Wallet modal opened', 'User requested wallet management panel.');
              setWalletModalOpen(true);
            }}
            className="wallet-glow flex w-full items-center justify-center gap-2 rounded-2xl border border-[#4ca2ff]/50 bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-3 text-sm font-medium text-[#dff3ff] transition duration-300 hover:shadow-[0_0_28px_rgba(76,162,255,0.42)]"
          >
            {walletState.address ? (
              <>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                {walletState.address}
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </>
            )}
          </button>
          {walletState.address && (
            <p className="mt-3 text-xs text-white/50">
              Connected via {walletState.walletName}
            </p>
          )}
        </div>
      </aside>

      <header className="glass-panel sticky top-0 z-40 border-b border-white/10 md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="glass-panel flex h-11 w-11 items-center justify-center rounded-2xl">
              <SuiLogo />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9fd4ff]">SUI NETWORK</p>
              <p className="text-sm font-semibold">Programmable Money</p>
            </div>
          </div>

          <button type="button" onClick={() => setOpen((v) => !v)} className="glass-panel rounded-xl p-2 text-white">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="glass-panel absolute right-0 top-0 h-full w-72 border-l border-white/10 p-5">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SuiLogo />
                <p className="text-sm font-semibold text-[#dff3ff]">Navigation</p>
              </div>
              <button onClick={() => setOpen(false)} className="glass-panel rounded-xl p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-300 ${
                        isActive
                          ? 'active-nav-text border-l-4 border-[#4ca2ff] border-white/10 bg-[#4ca2ff]/10 text-white'
                          : 'border-transparent bg-white/5 text-white/78 hover:border-white/10 hover:bg-white/8 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4 text-[#8dd7ff]" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <button
              onClick={() => {
                addToast('Wallet Modal Opened', 'Manage wallet connection on mobile.');
                addLog('Wallet modal opened', 'Mobile navigation launched wallet panel.');
                setWalletModalOpen(true);
              }}
              className="mt-6 wallet-glow flex w-full items-center justify-center gap-2 rounded-2xl border border-[#4ca2ff]/50 bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-3 text-sm font-medium text-[#dff3ff]"
            >
              {walletState.address ? (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                  {walletState.address}
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="md:ml-80">
        <main className="px-4 py-6 md:px-8 md:py-8">
          <Outlet context={{ addToast, addLog, logs }} />
        </main>
      </div>

      <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnected={(wallet) => {
          setWalletState(wallet);
          addToast('Wallet Connected', `${wallet.walletName} connected successfully.`);
          addLog('Wallet connected', `${wallet.address} is now active.`);
        }}
      />
      <ToastViewport toasts={toasts} />
    </div>
  );
}

export default DashboardLayout;
