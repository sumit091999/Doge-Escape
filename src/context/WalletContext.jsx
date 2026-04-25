import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    // Restore saved address immediately so ProtectedRoute doesn't redirect
    if (typeof window !== 'undefined') {
      return localStorage.getItem('doge_wallet_address') || null;
    }
    return null;
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // On mount, just trust localStorage — don't call window.doge.connect()
  // which opens the wallet popup. connect() is only called on explicit user action.
  useEffect(() => {
    setIsInitializing(false);
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.doge) {
      const wantToDownload = window.confirm('Install doge wallet to play. Click OK to download.');
      if (wantToDownload) {
        window.open('https://v3.mydoge.com/', '_blank');
      }
      return;
    }

    setIsConnecting(true);
    try {
      const res = await window.doge.connect();
      if (res && res.address) {
        setAccount(res.address);
        localStorage.setItem('doge_wallet_address', res.address);
        return res.address;
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect Doge wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    localStorage.removeItem('doge_wallet_address');
  };

  const getShortAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnecting,
        isInitializing,
        connectWallet,
        disconnect,
        getShortAddress,
        isConnected: !!account,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
