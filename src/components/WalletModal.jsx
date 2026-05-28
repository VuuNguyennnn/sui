import { useState } from 'react';
import { X, Wallet, LoaderCircle } from 'lucide-react';

function WalletModal({ open, onClose, onConnected }) {
  const [connectingWallet, setConnectingWallet] = useState(null);

  if (!open) return null;

  const handleConnect = (walletName) => {
    setConnectingWallet(walletName);

    setTimeout(() => {
      setConnectingWallet(null);
      onConnected({
        address: '0x3a9c...8b2f',
        online: true,
        walletName,
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <button className="absolute inset-0" onClick={onClose} aria-label="Close modal" />

      <div className="relative z-10 w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#020b14]/90 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#9fd4ff]">Wallet Access</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Connect a Wallet</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Select a Sui-compatible wallet to access swaps, pools, and programmable flows.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleConnect('Sui Wallet')}
            disabled={!!connectingWallet}
            className="w-full rounded-2xl border border-white/10 bg-[#07121d] p-6 text-left transition hover:border-[#4ca2ff]/35 hover:bg-[#0b1724] disabled:opacity-60"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  {connectingWallet === 'Sui Wallet' ? (
                    <LoaderCircle className="h-5 w-5 animate-spin text-[#4ca2ff]" />
                  ) : (
                    <Wallet className="h-5 w-5 text-[#4ca2ff]" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">Sui Wallet</p>
                  <p className="text-xs leading-5 text-slate-400">
                    Install Wallet Extension or connect your Sui browser wallet.
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-[#4ca2ff]/30 bg-[#4ca2ff]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#dff3ff]">
                {connectingWallet === 'Sui Wallet' ? 'Connecting' : 'Connect'}
              </span>
            </div>
          </button>

          <button
            disabled
            className="w-full rounded-2xl border border-white/10 bg-[#07121d] p-6 text-left opacity-70"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">Install Wallet Extension</p>
              <p className="text-xs leading-5 text-slate-400">
                No other compatible wallet extension detected in this browser session.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletModal;
