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
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.doge) {
      try {
        const res = await window.doge.connect();
        if (res && res.address) {
          setAccount(res.address);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      } finally {
        setIsInitializing(false);
      }
    } else {
      setIsInitializing(false);
    }
  };

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
