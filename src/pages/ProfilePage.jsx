import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import { useGame } from '../context/GameContext';
import { useWallet } from '../context/WalletContext';
import ItemDetailsModal from '../components/ItemDetailsModal';
import PlayerHubScene from '../components/PlayerHubScene';
import { AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
  const {
    username,
    coins,
    highscore,
    avatar,
    boats,
    companions,
    guns,
    selectedBoat,
    selectedCompanion,
    selectedGun,
    setUsername,
  } = useGame();
  const { account, getShortAddress } = useWallet();
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(username);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
  const [selectedInventoryType, setSelectedInventoryType] = useState(null);

  useEffect(() => {
    setDraftName(username);
  }, [username]);

  const handleSaveName = () => {
    const nextName = draftName.trim();
    if (!nextName) return;

    setUsername(nextName);
    setIsEditingName(false);
  };

  const equippedItems = [
    { title: selectedBoat?.name || 'None', subtitle: 'Boat', icon: selectedBoat?.image || '🚤' },
    { title: selectedCompanion?.name || 'None', subtitle: 'Companion', icon: selectedCompanion?.image || '🧔' },
    { title: selectedGun?.name || 'None', subtitle: 'Weapon', icon: selectedGun?.image || '🔫' },
  ];

  const ownedBoats = boats.filter(b => b.owned);
  const ownedCompanions = companions.filter(c => c.owned);
  const ownedGuns = guns.filter(g => g.owned);
  const ownedCount = ownedBoats.length + ownedCompanions.length + ownedGuns.length;
  const stats = [
    { label: 'Speed', value: 72, color: '#f0b429' },
    { label: 'Attack', value: 58, color: '#e04040' },
    { label: 'Defense', value: 45, color: '#10b981' },
    { label: 'Luck', value: 83, color: '#f7c948' },
  ];

  const achievements = [
    { icon: '🗡️', title: 'First Blood', text: 'Win your first race', unlocked: true },
    { icon: '💎', title: 'Diamond Hands', text: 'Hold 1000 coins for 24h', unlocked: true },
    { icon: '⚡', title: 'Speed Demon', text: 'Reach max speed 3 times', unlocked: true },
    { icon: '📈', title: 'Trader Pro', text: 'Complete 50 trades', unlocked: false },
    { icon: '✷', title: 'Blockbuster', text: 'Destroy 500 blocks', unlocked: false },
    { icon: '👑', title: 'Legendary', text: 'Reach level 50', unlocked: false },
  ];

  const games = [
    { mode: 'Race', result: '🏆 1st', time: '3m ago', score: 2450, badge: 'R' },
    { mode: 'Survival', result: '💀 Died', time: '15m ago', score: 1200, badge: 'S' },
    { mode: 'Race', result: '🥈 2nd', time: '42m ago', score: 2100, badge: 'R' },
    { mode: 'Battle', result: '🏆 Won', time: '1h ago', score: 3200, badge: 'B' },
    { mode: 'Race', result: '🥉 3rd', time: '2h ago', score: 1800, badge: 'R' },
  ];

  return (
    <div className="screen-page profile-screen min-h-screen bg-doge-darker p-3 md:p-4 lg:p-6 relative overflow-x-hidden">
      <PlayerHubScene />
      <div className="max-w-[1920px] mx-auto w-full flex flex-col min-h-screen relative z-10">
        <ProfileHeader />

        <section className="profile-hero">
          <div className="profile-hero-avatar">
            {avatar?.startsWith('/') ? <img src={avatar} alt="Profile" /> : <span>{avatar}</span>}
          </div>
          <div className="min-w-0 flex-1">
            <div className="profile-name-row">
              {isEditingName ? (
                <>
                  <input
                    type="text"
                    value={draftName}
                    onChange={(event) => setDraftName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleSaveName();
                      if (event.key === 'Escape') {
                        setDraftName(username);
                        setIsEditingName(false);
                      }
                    }}
                    className="profile-name-input"
                    maxLength={16}
                    autoFocus
                  />
                  <button type="button" onClick={handleSaveName} className="profile-name-save">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h1>{username}</h1>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="profile-name-edit"
                    aria-label="Edit player name"
                    title="Edit player name"
                  >
                    ✏️
                  </button>
                </>
              )}
            </div>
            <p>Joined 14 days ago • Level 8 • {getShortAddress(account) || 'Guest Racer'}</p>
            <div className="profile-pills">
              <span>🏆 Rank #10</span>
              <span>12 Wins</span>
              <span>{ownedCount} Items</span>
            </div>
          </div>
          <div className="profile-score">
            <strong>{highscore.toLocaleString()}</strong>
            <span>Total Score</span>
          </div>
        </section>

        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-grid"
        >
          <section className="profile-column">
            <h2>Player Stats</h2>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="profile-stat-line">
                  <div>
                    <span>{stat.label}</span>
                    <strong>{stat.value} / 100</strong>
                  </div>
                  <div className="profile-stat-track">
                    <div style={{ width: `${stat.value}%`, background: stat.color }} />
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-8">Equipped Items</h2>
            <div className="equipped-grid">
              {equippedItems.map((item) => (
                <div key={item.title} className="equipped-tile">
                  <span>{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-column">
            <h2>Achievements <span>(3/6)</span></h2>
            <div className="achievement-grid">
              {achievements.map((item) => (
                <div key={item.title} className={`achievement-card ${item.unlocked ? 'unlocked' : 'locked'}`}>
                  <span>{item.icon}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                  {item.unlocked && <em>✓ Unlocked</em>}
                </div>
              ))}
            </div>
          </section>

          <section className="profile-column">
            <h2>Recent Games</h2>
            <div className="space-y-3">
              {games.map((game) => (
                <div key={`${game.mode}-${game.time}`} className="recent-game-row">
                  <span>{game.badge}</span>
                  <div>
                    <strong>{game.mode}</strong>
                    <p>{game.result}</p>
                  </div>
                  <div>
                    <small>{game.time}</small>
                    <strong>{game.score.toLocaleString()} pts</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="win-rate-card mt-6">
              <span>Win Rate</span>
              <strong>60%</strong>
              <div><i /></div>
            </div>
          </section>
        </motion.main>

        {/* New Inventory Section */}
        <section className="px-5 pb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-doge-gold font-bold text-shadow-pixel">My Collection ({ownedCount})</h2>
            <div className="h-0.5 flex-1 bg-doge-gold/10 mx-6"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Boats */}
            {ownedBoats.map(item => (
              <InventoryItemCard 
                key={`boat-${item.id}`} 
                item={item} 
                type="boats" 
                onClick={() => { setSelectedInventoryItem(item); setSelectedInventoryType('boats'); }}
              />
            ))}
            {/* Companions */}
            {ownedCompanions.map(item => (
              <InventoryItemCard 
                key={`comp-${item.id}`} 
                item={item} 
                type="companions" 
                onClick={() => { setSelectedInventoryItem(item); setSelectedInventoryType('companions'); }}
              />
            ))}
            {/* Guns */}
            {ownedGuns.map(item => (
              <InventoryItemCard 
                key={`gun-${item.id}`} 
                item={item} 
                type="guns" 
                onClick={() => { setSelectedInventoryItem(item); setSelectedInventoryType('guns'); }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Item Details Modal */}
      <AnimatePresence mode="wait">
        {selectedInventoryItem && (
          <ItemDetailsModal
            item={selectedInventoryItem}
            itemType={selectedInventoryType}
            onClose={() => {
              setSelectedInventoryItem(null);
              setSelectedInventoryType(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Subcomponent for Inventory Cards
const InventoryItemCard = ({ item, type, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="panel-dark p-4 flex items-center gap-4 cursor-pointer border-2 border-transparent hover:border-doge-gold/40 transition-all shadow-pixel"
  >
    <div className="hotbar-slot w-14 h-14 text-4xl shrink-0">
      {item.image}
    </div>
    <div className="min-w-0">
      <h3 className="text-sm font-bold text-doge-gold truncate">{item.name}</h3>
      <p className="text-[10px] text-doge-iron uppercase tracking-widest">
        {type.slice(0, -1)}
      </p>
    </div>
    <div className="ml-auto text-doge-gold opacity-30">ⓘ</div>
  </motion.div>
);

export default ProfilePage;
