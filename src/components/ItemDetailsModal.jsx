import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const ItemDetailsModal = ({ item, itemType, onClose }) => {
  const { 
    coins, 
    buyItem, 
    rentItem, 
    setSelectedBoat, 
    setSelectedCompanion, 
    setSelectedGun 
  } = useGame();
  const [actionResult, setActionResult] = useState(null);

  const showActionResult = ({ type, title, message, icon, closeAfter = false }) => {
    setActionResult({ type, title, message, icon, closeAfter });
  };

  const closeActionResult = () => {
    const shouldClose = actionResult?.closeAfter;
    setActionResult(null);
    if (shouldClose) {
      onClose();
    }
  };

  const handleBuy = () => {
    if (item.owned) {
      showActionResult({
        type: 'error',
        title: 'Already Owned',
        message: `You already have ${item.name} in your collection.`,
        icon: '📦',
      });
      return;
    }

    if (coins < item.price) {
      showActionResult({
        type: 'error',
        title: 'Not Enough Coins',
        message: `You are short ${item.price - coins} coins to buy ${item.name}.`,
        icon: '🪙',
      });
      return;
    }

    const success = buyItem(itemType.slice(0, -1), item.id);
    if (success) {
      showActionResult({
        type: 'success',
        title: 'Purchase Complete',
        message: `${item.name} is now in your inventory.`,
        icon: '💰',
        closeAfter: true,
      });
    }
  };

  const handleRent = () => {
    if (coins < item.rentPrice) {
      showActionResult({
        type: 'error',
        title: 'Not Enough Coins',
        message: `You need ${item.rentPrice} coins to rent ${item.name}.`,
        icon: '🪙',
      });
      return;
    }

    const success = rentItem(itemType.slice(0, -1), item.id);
    if (success) {
      showActionResult({
        type: 'success',
        title: 'Rental Active',
        message: `${item.name} is ready for this session.`,
        icon: '⏱️',
        closeAfter: true,
      });
    }
  };

  const handleEquip = () => {
    const type = itemType.slice(0, -1); // Remove 's' from itemType
    
    switch(type) {
      case 'boat':
        setSelectedBoat(item);
        break;
      case 'companion':
        setSelectedCompanion(item);
        break;
      case 'gun':
        setSelectedGun(item);
        break;
    }
    
    showActionResult({
      type: 'success',
      title: 'Item Equipped',
      message: `${item.name} is locked in for your next escape.`,
      icon: '⚡',
      closeAfter: true,
    });
  };

  const getAllStats = () => {
    switch(itemType) {
      case 'boats':
        return [
          { label: 'Health', value: item.health, max: 150, color: 'redstone' },
          { label: 'Speed', value: item.speed, max: 100, color: 'gold' },
          { label: 'Agility', value: item.agility, max: 100, color: 'gold' },
        ];
      case 'companions':
        return [
          { label: 'Damage', value: item.damage, max: 100, color: 'redstone' },
          { label: 'Defense', value: item.defense, max: 100, color: 'iron' },
        ];
      case 'guns':
        return [
          { label: 'Damage', value: item.damage, max: 100, color: 'redstone' },
          { label: 'Fire Rate', value: item.fireRate, max: 100, color: 'gold' },
          { label: 'Accuracy', value: item.accuracy, max: 100, color: 'diamond' },
        ];
      default:
        return [];
    }
  };

  const stats = getAllStats();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="panel-wood p-6 max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-minecraft"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="hotbar-slot w-20 h-20 text-5xl">
              {item.image}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-doge-gold text-shadow-pixel">
                {item.name}
              </h2>
              {itemType === 'companions' && (
                <p className="text-sm text-doge-emerald">{item.ability}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-doge-iron hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Stats */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm text-doge-gold border-b-2 border-doge-coal pb-2">
            STATISTICS
          </h3>
          {stats.map((stat) => (
            <StatBar key={stat.label} {...stat} />
          ))}
        </div>

        {/* Pricing */}
        <div className="panel-dark p-4 mb-6 space-y-4 rounded-xl border-2 border-doge-coal shadow-inner">
          <h3 className="text-xs font-bold text-doge-gold tracking-widest uppercase opacity-80">PRICING</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-doge-iron">Buy (Permanent)</span>
            <span className="text-doge-gold font-bold text-lg">{item.price} 💰</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-doge-iron">Rent (Per Session)</span>
            <span className="text-white font-bold">{item.rentPrice} 💰</span>
          </div>
          <div className="border-t border-doge-stone/30 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-doge-iron italic">Your Coins</span>
              <span className="text-doge-gold font-bold">{coins} 💰</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {item.owned ? (
            <button
              onClick={handleEquip}
              className="btn-primary w-full text-sm"
            >
              ⚡ Equip This Item
            </button>
          ) : (
            <>
              <button
                onClick={handleBuy}
                className={`btn-primary w-full text-sm ${
                  coins < item.price ? 'opacity-70' : ''
                }`}
              >
                💰 Buy for {item.price} Coins
              </button>
              <button
                onClick={handleRent}
                className={`btn-secondary w-full text-sm ${
                  coins < item.rentPrice ? 'opacity-70' : ''
                }`}
              >
                ⏱️ Rent for {item.rentPrice} Coins
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="btn-danger w-full text-sm"
          >
            Close
          </button>
        </div>

        <AnimatePresence>
          {actionResult && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.78, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 12, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className={`item-action-modal panel-stone w-full max-w-sm p-5 text-center overflow-hidden ${
                  actionResult.type === 'error' ? 'item-action-modal-error' : ''
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="item-action-burst" />
                <motion.div
                  animate={{ y: [0, -7, 0], rotate: [-5, 5, -5] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className={`relative z-10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl border-2 bg-doge-darker text-4xl shadow-pixel ${
                    actionResult.type === 'error'
                      ? 'border-doge-redstone'
                      : 'border-doge-gold'
                  }`}
                >
                  {actionResult.icon}
                </motion.div>
                <div className="relative z-10 space-y-2">
                  <p className={`text-xs uppercase tracking-wider ${
                    actionResult.type === 'error' ? 'text-doge-redstone' : 'text-doge-emerald'
                  }`}>
                    {actionResult.type === 'error' ? 'Action Blocked' : 'Action Complete'}
                  </p>
                  <h3 className="text-xl text-doge-gold text-shadow-pixel">
                    {actionResult.title}
                  </h3>
                  <p className="text-sm text-doge-iron">
                    {actionResult.message}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={closeActionResult}
                  className={`relative z-10 mt-5 w-full text-sm ${
                    actionResult.type === 'error' ? 'btn-danger' : 'btn-primary'
                  }`}
                >
                  {actionResult.type === 'error' ? 'Got It' : 'Awesome'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Stat Bar Component (Enhanced)
const StatBar = ({ label, value, max, color }) => {
  const colors = {
    emerald: 'bg-doge-emerald',
    diamond: 'bg-doge-diamond',
    redstone: 'bg-doge-redstone',
    gold: 'bg-doge-gold',
    iron: 'bg-doge-iron',
  };

  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-doge-iron">{label}</span>
        <span className="text-white">{value} / {max}</span>
      </div>
      <div className="stat-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`stat-bar-fill ${colors[color] || colors.emerald}`}
        />
      </div>
    </div>
  );
};

export default ItemDetailsModal;
