import { motion } from 'framer-motion';

const ItemCard = ({ item, itemType, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`panel-dark p-3 md:p-4 cursor-pointer relative overflow-hidden ${
        item.owned ? 'border-doge-gold' : 'border-doge-stone'
      }`}
    >
      {/* Owned Badge */}
      {item.owned && (
        <div className="absolute top-2 right-2">
          <span className="bg-doge-gold text-doge-darker text-xs px-2 py-1 rounded-lg font-bold">
            OWNED
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Item Image/Icon */}
        <div className="hotbar-slot w-12 h-12 md:w-14 md:h-14 text-3xl md:text-4xl shrink-0">
          {item.image}
        </div>

        {/* Item Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-bold text-doge-gold truncate">
            {item.name}
          </h3>
          
          {/* Stats Preview */}
          <div className="mt-2 space-y-1">
            {itemType === 'boats' && (
              <>
                <StatBar label="Speed" value={item.speed} color="emerald" />
                <StatBar label="Agility" value={item.agility} color="diamond" />
              </>
            )}
            
            {itemType === 'companions' && (
              <>
                <p className="text-xs text-doge-iron">{item.ability}</p>
                <StatBar label="DMG" value={item.damage} color="redstone" />
              </>
            )}
            
            {itemType === 'guns' && (
              <>
                <StatBar label="Damage" value={item.damage} color="redstone" />
                <StatBar label="Accuracy" value={item.accuracy} color="diamond" />
              </>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right space-y-1 shrink-0">
          <div className="text-doge-gold">
            <p className="text-xs">Buy</p>
            <p className="text-sm font-bold">{item.price}💰</p>
          </div>
          <div className="text-doge-iron">
            <p className="text-xs">Rent</p>
            <p className="text-sm">{item.rentPrice}💰</p>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(240, 180, 41, 0.5), transparent)',
        }}
      />
    </motion.div>
  );
};

// Stat Bar Component
const StatBar = ({ label, value, color }) => {
  const colors = {
    emerald: 'bg-doge-emerald',
    diamond: 'bg-doge-diamond',
    redstone: 'bg-doge-redstone',
    gold: 'bg-doge-gold',
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-doge-iron w-16">{label}</span>
      <div className="flex-1 stat-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`stat-bar-fill ${colors[color] || colors.emerald}`}
        />
      </div>
      <span className="text-xs text-white w-8 text-right">{value}</span>
    </div>
  );
};

export default ItemCard;
