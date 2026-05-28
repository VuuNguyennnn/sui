import { useMemo, useState } from 'react';

const mockAccount = '0x9f3c...7a21';

export function useSuiWallet() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [mode, setMode] = useState(null);

  const account = useMemo(() => (connected ? mockAccount : null), [connected]);

  const connectWallet = async (preferredMode = 'wallet') => {
    setConnecting(true);
    setMode(preferredMode);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setConnected(true);
    setConnecting(false);
    return {
      success: true,
      account: mockAccount,
      mode: preferredMode,
    };
  };

  const disconnectWallet = () => {
    setConnected(false);
    setMode(null);
  };

  return {
    connected,
    connecting,
    account,
    mode,
    connectWallet,
    disconnectWallet,
  };
}
