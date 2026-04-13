import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { useGame } from '../context/GameContext';
import DogeHeroScene from '../components/DogeHeroScene';
import HowToPlayScene from '../components/HowToPlayScene';
import LeaderboardScene from '../components/LeaderboardScene';
import FeaturesScene from '../components/FeaturesScene';
import WarpSpeedScene from '../components/WarpSpeedScene';
import ThemeToggle from '../components/ThemeToggle';
import MarketTreasuryScene from '../components/MarketTreasuryScene';
import { CompanionShowcaseScene, GamePreviewScene } from '../components/LandingPreviewScenes';


const LandingPage = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnecting } = useWallet();
  const { leaderboard, boats, companions, guns } = useGame();
  const [particles, setParticles] = useState([]);
  const marketplacePreviewItems = [
    ...boats.slice(0, 2).map((item) => ({ ...item, type: 'Boat', stat: `${item.speed} Speed` })),
    ...guns.slice(0, 1).map((item) => ({ ...item, type: 'Weapon', stat: `${item.damage} Damage` })),
  ];
  const companionPreviewItems = companions.slice(0, 3);
  const floatingLoot = [
    { icon: '💰', className: 'left-[8%] top-[24%]', delay: 0 },
    { icon: '💎', className: 'right-[10%] top-[30%]', delay: 0.8 },
    { icon: '🚤', className: 'left-[16%] bottom-[28%]', delay: 1.4 },
    { icon: '⚡', className: 'right-[18%] bottom-[24%]', delay: 2.1 },
  ];

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  // Removed automatic redirection to allow landing on this page even if connected
  // users can manually click "Play" or "Connect" to go to Home.
  /*
  useEffect(() => {
    if (isConnected) {
      navigate('/Home');
    }
  }, [isConnected, navigate]);
  */

  const handleConnect = async () => {
    const account = await connectWallet();
    if (account) {
      navigate('/Home');
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [-1, 1, -1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-doge-darker overflow-x-hidden text-white font-pixel pb-0">
      <ThemeToggle className="landing-theme-toggle" />
      {/* 1. Hero Section */}
      <div className="py-12 px-4 bg-doge-coal bg-opacity-40 border-b-2 border-doge-dark shadow-inset relative mt-10 overflow-hidden">
        {/* Three.js 3D Background */}
        <DogeHeroScene />

        {/* Animated Sparkles */}
        <div className="absolute top-10 left-10 torch"></div>
        <div className="absolute top-10 right-10 torch"></div>
        <div className="absolute bottom-10 left-1/4 torch"></div>
        <div className="absolute bottom-10 right-1/4 torch"></div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-8"
          >
            {/* Game Title */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotate: -1 }}
              className="landing-logo-stack cursor-default"
            >
              <h1 className="landing-title-main">
                <span>DOGE</span>
                <span>ESCAPE</span>
              </h1>
              <p className="landing-title-kicker">Gaming dapp built for much wow</p>
            </motion.div>

            {/* Icons Row */}
            <motion.div variants={itemVariants} className="flex gap-4">
               {['🚤', '💎', '⚡'].map((emoji, i) => (
                 <motion.div 
                   key={i} 
                   variants={floatingVariants}
                   animate="animate"
                   className="w-14 h-14 panel-stone flex items-center justify-center text-3xl rounded-xl shadow-pixel"
                 >
                   <span>{emoji}</span>
                 </motion.div>
               ))}
            </motion.div>

            {/* Tagline */}
            <motion.div 
              variants={itemVariants}
              className="panel-dark p-4 rounded-xl border-2 border-doge-coal shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] inline-block text-doge-iron text-sm md:text-base font-bold w-full md:w-auto"
            >
              Race through blocky waters, collect diamonds, and escape the chaos!
            </motion.div>

            <motion.div variants={itemVariants} className="landing-partner-strip">
              <img src="/images/mydoge-assets/Square_Logo.png" alt="DogeEscape square logo" />
              <div>
                <span>MyDoge-ready visual set</span>
                <strong>Clean logo, simple cards, readable banners</strong>
              </div>
              <small>Gaming</small>
            </motion.div>

            {/* Features list */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {[
                "Connect Wallet & Play",
                "On-Chain Marketplace",
                "AI Companions",
                "On-Chain Global Chat",
                "ZK Proof Leaderboard"
              ].map((text, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="panel-wood py-2 px-4 rounded-full border-2 border-[#1a1510] flex items-center gap-2 shadow-pixel text-xs sm:text-sm text-doge-stone font-bold hover:border-doge-gold transition-colors cursor-default"
                >
                  <span className="text-doge-emerald drop-shadow-md">✔️</span> {text}
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full pt-2">
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="btn-primary flex-1 shadow-pixel flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                {isConnecting ? (
                  <span className="animate-pulse">Connecting...</span>
                ) : (
                  <>
                    <motion.span 
                      whileHover={{ scale: 1.2, rotate: 360 }} 
                      transition={{ duration: 0.5 }} 
                      className="inline-block"
                    >
                      🎮
                    </motion.span> 
                    Connect Wallet & Play
                  </>
                )}
              </button>
              <button 
                className="btn-secondary flex-1 shadow-pixel flex items-center justify-center gap-2 text-sm sm:text-base group"
                onClick={() => document.getElementById('gameplay-preview')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Watch Trailer</span>
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block"
                >
                  ▶
                </motion.span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Logo Image */}
          <motion.div
            initial={{ x: 50, opacity: 0, rotate: 2 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="landing-hero-logo-wrap w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
          >
            <motion.img 
              animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              src="/images/DogeEscape-logo.png" 
              alt="DogeEscape logo" 
              className="landing-hero-logo w-full max-w-md md:max-w-xl h-auto"
            />
          </motion.div>
        </div>
      </div>
      {/* End Hero Section */}

      {/* 2. How to Play Section */}
      <div className="pt-7 pb-10 px-4 md:px-8 max-w-6xl mx-auto relative overflow-hidden">
        {/* 3D Background */}
        <HowToPlayScene />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl text-doge-gold font-bold mb-4 text-shadow-pixel">How to Play? 🎮</h2>
          <p className="text-doge-iron md:text-lg max-w-2xl mx-auto">Fast, simple, and rewarding. Get into the race and claim your loot.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {[
            { icon: '🦊', title: '1. Connect', text: 'Link your MetaMask wallet to access your NFTs, coins, and stats automatically.' },
            { icon: '🚤', title: '2. Equip', text: 'Choose your Boat to race and your AI Companion to give you combat buffs, weapons to kill enemies.' },
            { icon: '💎', title: '3. Escape', text: 'Dodge obstacles, kill enemies, grab rewards, and secure the highest score to dominate.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-6 rounded-2xl shadow-pixel relative cursor-default ${i % 2 === 0 ? 'panel-wood' : 'panel-stone'}`}
            >
              <div className="w-16 h-16 bg-doge-darker border-2 border-doge-coal rounded-xl flex items-center justify-center text-3xl mb-4 shadow-pixel">
                {item.icon}
              </div>
              <h3 className="text-xl text-doge-gold font-bold mb-2">{item.title}</h3>
              <p className="text-doge-stone text-sm">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marketplace Preview Section */}
      <div className="pt-12 pb-12 px-4 md:px-8 max-w-6xl mx-auto relative overflow-hidden">
        <MarketTreasuryScene />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 relative z-10"
        >
          <p className="text-doge-gold font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">Marketplace Preview</p>
          <h2 className="text-3xl md:text-5xl text-white font-bold text-shadow-pixel mb-4">Gear Up Before The Run</h2>
          <p className="text-doge-iron md:text-lg max-w-2xl mx-auto">Preview boats and weapons built for speed, survival, and clean leaderboard climbs.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          {marketplacePreviewItems.map((item) => (
            <motion.div
              key={`${item.type}-${item.id}`}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="landing-showcase-card panel-dark p-5 rounded-2xl shadow-pixel border-2 border-doge-coal cursor-default"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-16 h-16 bg-doge-darker border-2 border-doge-gold rounded-xl flex items-center justify-center text-4xl shadow-pixel">
                  {item.image}
                </div>
                <span className="bg-doge-gold text-doge-darker text-xs font-bold px-3 py-1 rounded-lg">{item.type}</span>
              </div>
              <h3 className="mt-5 text-xl text-doge-gold font-bold">{item.name}</h3>
              <p className="mt-2 text-sm text-doge-iron">{item.stat}</p>
              <div className="mt-5 flex items-center justify-between border-t border-doge-coal pt-4">
                <span className="text-doge-stone text-xs uppercase tracking-wider">Unlock</span>
                <strong className="text-doge-gold flex items-center gap-2">
                  <span>💰</span>
                  {item.price.toLocaleString()}
                </strong>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* AI Companion Showcase Section */}
      <div className="pt-12 pb-14 px-4 bg-doge-coal bg-opacity-40 border-y-2 border-doge-dark shadow-inset relative overflow-hidden">
        <CompanionShowcaseScene />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-doge-gold font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">AI Companion Showcase</p>
            <h2 className="text-3xl md:text-5xl text-white font-bold text-shadow-pixel mb-4">Pick Your Ride-Or-Die Buddy</h2>
            <p className="text-doge-iron md:text-lg max-w-2xl mx-auto">Each companion brings a different edge into the chaos, from combat pressure to clutch movement.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {companionPreviewItems.map((companion) => (
              <motion.div
                key={companion.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="landing-showcase-card panel-wood p-5 rounded-2xl shadow-pixel border-2 border-doge-coal text-center cursor-default"
              >
                <div className="mx-auto w-20 h-20 bg-doge-darker border-2 border-doge-gold rounded-xl flex items-center justify-center text-5xl shadow-pixel">
                  {companion.image}
                </div>
                <h3 className="mt-5 text-xl text-doge-gold font-bold">{companion.name}</h3>
                <p className="mt-2 text-doge-iron text-sm font-bold">{companion.ability}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-doge-darker/70 border border-doge-coal rounded-lg p-3">
                    <span className="block text-doge-stone text-xs">Damage</span>
                    <strong className="text-doge-gold">{companion.damage}</strong>
                  </div>
                  <div className="bg-doge-darker/70 border border-doge-coal rounded-lg p-3">
                    <span className="block text-doge-stone text-xs">Defense</span>
                    <strong className="text-doge-gold">{companion.defense}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gameplay Trailer Section */}
      <div id="gameplay-preview" className="pt-12 pb-8 px-4 w-full relative overflow-hidden">
        <GamePreviewScene />
        <div className="text-center mb-8 relative z-10 max-w-5xl mx-auto">
          <p className="text-doge-gold font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">Gameplay Preview</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-shadow-pixel flex flex-wrap items-center justify-center gap-3">
            See It <span className="text-doge-gold bg-doge-coal/60 border-2 border-doge-dark px-4 py-1 rounded-xl">In Action</span>
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gameplay-video-frame w-full max-w-5xl mx-auto relative z-10 rounded-3xl overflow-hidden border-4 border-doge-stone shadow-pixel-lg bg-doge-darker"
        >
          <video
            src="/videos/gameplay.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="gameplay-video"
          />
          {/* Subtle inner shadow overlay */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none rounded-3xl"></div>
        </motion.div>
      </div>

      {/* 3. Top Scorers Section */}
      <div className="pt-20 pb-28 px-4 bg-doge-coal bg-opacity-40 border-y-2 border-doge-dark shadow-inset relative overflow-x-hidden overflow-y-visible">
        {/* 3D Background */}
        <LeaderboardScene compact />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl text-doge-gold font-bold mb-4 text-shadow-pixel">🏆 Weekly Topers</h2>
            <p className="text-doge-iron">The legendary Doges dominating the blocky waters.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row flex-wrap items-end justify-center gap-10 md:gap-6 mt-10">
            {/* 2nd Place */}
            {leaderboard.length >= 2 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="w-full md:w-[30%] order-2 md:order-1 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-doge-dark border-4 border-doge-iron rounded-full shadow-[0_0_20px_rgba(160,160,160,0.4)] overflow-hidden mb-4 z-10 bg-white">
                  {leaderboard[1].avatar.startsWith('/') ? <img src={leaderboard[1].avatar} alt="avatar" /> : <span className="text-4xl flex items-center justify-center w-full h-full">{leaderboard[1].avatar}</span>}
                </div>
                <div className="panel-stone w-full pt-12 pb-6 px-4 rounded-t-2xl border-t-4 border-doge-iron text-center -mt-16 h-40 flex flex-col justify-end relative shadow-pixel-lg">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl">🥈</div>
                  <h3 className="text-lg font-bold text-doge-iron truncate">{leaderboard[1].username}</h3>
                  <p className="text-doge-emerald font-bold">{leaderboard[1].score.toLocaleString()}</p>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {leaderboard.length >= 1 && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="w-full md:w-[30%] order-1 md:order-2 flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-doge-dark border-4 border-doge-gold rounded-full shadow-[0_0_30px_rgba(240,180,41,0.6)] overflow-hidden mb-4 z-10 bg-white">
                  {leaderboard[0].avatar.startsWith('/') ? <img src={leaderboard[0].avatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-5xl flex items-center justify-center w-full h-full">{leaderboard[0].avatar}</span>}
                </div>
                <div className="panel-wood w-full pt-14 pb-8 px-4 rounded-t-2xl border-t-4 border-doge-gold text-center -mt-20 h-48 flex flex-col justify-end relative shadow-pixel-lg" style={{ boxShadow: '0 -10px 30px rgba(240,180,41,0.3)' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-2 left-1/2 -translate-x-1/2 text-3xl"
                  >
                    🥇
                  </motion.div>
                  <h3 className="text-xl font-bold text-doge-gold truncate">{leaderboard[0].username}</h3>
                  <p className="text-xl text-doge-emerald font-bold">{leaderboard[0].score.toLocaleString()}</p>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {leaderboard.length >= 3 && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="w-full md:w-[30%] order-3 md:order-3 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-doge-dark border-4 border-doge-stone rounded-full shadow-[0_0_15px_rgba(139,115,85,0.4)] overflow-hidden mb-4 z-10 bg-white">
                  {leaderboard[2].avatar.startsWith('/') ? <img src={leaderboard[2].avatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-3xl flex items-center justify-center w-full h-full">{leaderboard[2].avatar}</span>}
                </div>
                <div className="panel-minecraft w-full pt-10 pb-6 px-4 rounded-t-2xl border-t-4 border-doge-stone text-center -mt-12 h-32 flex flex-col justify-end relative shadow-pixel">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xl">🥉</div>
                  <h3 className="text-base font-bold text-doge-stone truncate">{leaderboard[2].username}</h3>
                  <p className="text-doge-emerald font-bold">{leaderboard[2].score.toLocaleString()}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Features Section */}
      <div className="pt-12 pb-20 px-4 max-w-6xl mx-auto relative overflow-hidden">
        {/* 3D Background */}
        <FeaturesScene />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl text-doge-gold font-bold mb-4 text-shadow-pixel">Game Features 🚀</h2>
          <p className="text-doge-iron md:text-lg max-w-2xl mx-auto">Fully integrated with the Doge Blockchain for true ownership.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            { icon: '🛒', title: 'On-Chain Marketplace', text: 'Buy, sell, and trade boats and AI companions with other players securely using your connected wallet.' },
            { iconImage: '/images/Icon-Logo.png', iconAlt: 'Doge icon', title: 'AI Companions', text: 'Unlock unique AI companions that chat with you during the race and provide specific combat boosts.' },
            { icon: '💬', title: 'Global Comm Link', text: 'Chat with players around the world in real-time. Show off your loot and strategize with top racers.' },
            { icon: '🔐', title: 'ZK Proof Leaderboards', text: 'Zero-Knowledge proofs ensure every high score is verified without exposing sensitive gameplay data.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01, borderColor: '#f0b429' }}
              className="panel-dark p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 shadow-pixel border-2 border-transparent transition-all duration-300 cursor-default"
            >
              <div className="landing-feature-icon text-5xl md:text-4xl shrink-0 drop-shadow-lg">
                {feature.iconImage ? (
                  <img src={feature.iconImage} alt={feature.iconAlt} />
                ) : (
                  feature.icon
                )}
              </div>
              <div>
                <h4 className="text-xl md:text-lg text-doge-gold font-bold">{feature.title}</h4>
                <p className="text-sm text-doge-stone mt-2">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 5. Final CTA */}
      <div className="pt-24 pb-24 px-4 text-center relative overflow-hidden">
        {/* 3D Background */}
        <WarpSpeedScene />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-8 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl text-doge-gold font-bold text-shadow-pixel">Ready to Escape?</h2>
          <p className="text-doge-iron md:text-lg">Your boat is waiting. The Doges are coming. Connect your wallet now.</p>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="btn-primary cta-play-now text-lg md:text-2xl px-10 py-5 animate-glow inline-block"
          >
            <span className="cta-spark cta-spark-one"></span>
            <span className="cta-spark cta-spark-two"></span>
            <span className="cta-spark cta-spark-three"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isConnecting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Connecting</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              ) : (
                <>
                  <span>🎮</span>
                  <span>Connect Wallet & Play</span>
                </>
              )}
            </span>
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="py-8 w-full px-4 text-center border-t-2 border-doge-coal bg-[#0a0805]">
        <p className="text-xs sm:text-sm md:text-lg text-doge-stone">
          Powered by DogeOS
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
