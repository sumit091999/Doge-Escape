import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useWallet } from '../context/WalletContext';
import TopBarScene from './TopBarScene';
import ThemeToggle from './ThemeToggle';

const ProfileHeader = ({ showBack }) => {
  const { coins, avatar, username } = useGame();
  const { disconnect } = useWallet();
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/Home', icon: '🏠' },
    { label: 'Game', path: '/play', icon: '🎮' },
    { label: 'Market', path: '/market', icon: '🛒' },
    { label: 'Ranks', path: '/leaderboard', icon: '🏆' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ];

  const confirmDisconnect = () => {
    setShowDisconnectModal(false);
    disconnect();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -42, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="game-nav-shell relative"
    >
      <TopBarScene />
      <div className="game-nav-brand relative z-10">
        {showBack && (
          <button type="button" onClick={() => navigate('/Home')} className="game-nav-back">
            ←
          </button>
        )}
        <button type="button" onClick={() => navigate('/profile')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="game-nav-avatar">
            {avatar?.startsWith('/') ? <img src={avatar} alt="Profile" /> : <span>{avatar}</span>}
          </div>
          <span className="game-nav-logo">
            {username}
          </span>
        </button>
      </div>

      <nav className="game-nav-links relative z-10" aria-label="Game navigation">
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`game-nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="game-nav-actions relative z-10">
        <ThemeToggle compact />
        <div className="game-nav-currency">
          <span>💰</span>
          <strong>{coins.toLocaleString()}</strong>
        </div>
        <div className="game-nav-currency">
          <span>💎</span>
          <strong>42</strong>
        </div>
        <button type="button" onClick={() => setShowDisconnectModal(true)} className="game-nav-disconnect">
          Disconnect
        </button>
      </div>

      <AnimatePresence>
        {showDisconnectModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.86, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className="disconnect-modal panel-dark w-full max-w-md p-5 text-center"
            >
              <motion.div
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-doge-redstone bg-doge-darker text-3xl shadow-pixel"
              >
                🛡️
              </motion.div>
              <h3 className="text-xl text-doge-gold text-shadow-pixel">Disconnect Wallet?</h3>
              <p className="mt-2 text-sm text-doge-iron">
                Your session will end and you will return to the landing page.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowDisconnectModal(false)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Stay Connected
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={confirmDisconnect}
                  className="btn-danger flex-1 text-sm"
                >
                  Disconnect
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default ProfileHeader;
