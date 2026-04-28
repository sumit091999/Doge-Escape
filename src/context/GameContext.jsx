import { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from './WalletContext';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

// Dummy data for development
const DUMMY_BOATS = [
  { id: 1, name: 'Speedster', health: 100, agility: 90, speed: 95, price: 500, rentPrice: 50, owned: true, image: '🚤' },
  { id: 2, name: 'Tank Cruiser', health: 150, agility: 60, speed: 70, price: 800, rentPrice: 80, owned: false, image: '⛵' },
  { id: 3, name: 'Ghost Rider', health: 80, agility: 100, speed: 100, price: 1200, rentPrice: 120, owned: false, image: '🛥️' },
];

const DUMMY_COMPANIONS = [
  { id: 1, name: 'DogeOS Captain', ability: 'Combat Kernel', damage: 85, defense: 70, price: 600, rentPrice: 60, owned: true, image: '/images/dogeos-captain.svg' },
  { id: 2, name: 'DogeOS Racer', ability: 'Speed Daemon', damage: 70, defense: 60, price: 550, rentPrice: 55, owned: false, image: '/images/dogeos-racer.svg' },
  { id: 3, name: 'DogeOS Oracle', ability: 'Warp Blink', damage: 95, defense: 50, price: 1000, rentPrice: 100, owned: false, image: '/images/dogeos-oracle.svg' },
];

const DUMMY_GUNS = [
  { id: 1, name: 'Pistol', damage: 50, fireRate: 90, accuracy: 80, price: 300, rentPrice: 30, owned: true, image: '🔫' },
  { id: 2, name: 'Shotgun', damage: 90, fireRate: 50, accuracy: 60, price: 650, rentPrice: 65, owned: false, image: '💣' },
  { id: 3, name: 'Sniper', damage: 100, fireRate: 40, accuracy: 100, price: 1500, rentPrice: 150, owned: false, image: '🎯' },
];

const DUMMY_LEADERBOARD = [
  { rank: 1, username: 'BlockMaster', score: 15420, avatar: '/images/doge_avatar.png' },
  { rank: 2, username: 'PixelPro', score: 14850, avatar: '/images/doge_avatar.png' },
  { rank: 3, username: 'CreeperKing', score: 13200, avatar: '/images/doge_avatar.png' },
  { rank: 4, username: 'DiamondHunter', score: 12500, avatar: '/images/doge_avatar.png' },
  { rank: 5, username: 'RedstoneGeek', score: 11800, avatar: '/images/doge_avatar.png' },
];

const DUMMY_TASKS = [
  { id: 1, title: 'Win 3 Races', progress: 2, target: 3, reward: '100 Coins', completed: false },
  { id: 2, title: 'Survive 5 Minutes', progress: 5, target: 5, reward: '150 Coins', completed: true },
  { id: 3, title: 'Collect 50 Blocks', progress: 35, target: 50, reward: '200 Coins', completed: false },
  { id: 4, title: 'Defeat 10 Enemies', progress: 7, target: 10, reward: '250 Coins', completed: false },
];

export const GameProvider = ({ children }) => {
  const { account } = useWallet();
  const [username, setUsernameState] = useState('Player_' + Math.floor(Math.random() * 9999));
  const [coins, setCoins] = useState(1500);
  const [highscore, setHighscore] = useState(8750);
  const [avatar, setAvatar] = useState('/images/doge_avatar.png');

  const [boats, setBoats] = useState(DUMMY_BOATS);
  const [companions, setCompanions] = useState(DUMMY_COMPANIONS);
  const [guns, setGuns] = useState(DUMMY_GUNS);

  const [selectedBoat, setSelectedBoat] = useState(DUMMY_BOATS[0]);
  const [selectedCompanion, setSelectedCompanion] = useState(DUMMY_COMPANIONS[0]);
  const [selectedGun, setSelectedGun] = useState(DUMMY_GUNS[0]);

  const [leaderboard, setLeaderboard] = useState(DUMMY_LEADERBOARD);
  const [dailyTasks, setDailyTasks] = useState(DUMMY_TASKS);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, username: 'System', message: 'Welcome to DogeEscape!', timestamp: new Date() },
    { id: 2, username: 'Admin', message: 'Good luck on your adventure!', timestamp: new Date() },
  ]);

  const getUsernameStorageKey = (walletAddress) => (
    walletAddress ? `dogeescape_username_${walletAddress.toLowerCase()}` : null
  );

  useEffect(() => {
    const storageKey = getUsernameStorageKey(account);

    if (!storageKey) return;

    const savedUsername = window.localStorage.getItem(storageKey);
    if (savedUsername) {
      setUsernameState(savedUsername);
    }
  }, [account]);

  const setUsername = (nextUsername) => {
    const cleanUsername = nextUsername.trim();
    if (!cleanUsername) return;

    setUsernameState(cleanUsername);

    const storageKey = getUsernameStorageKey(account);
    if (storageKey) {
      window.localStorage.setItem(storageKey, cleanUsername);
    }
  };

  const buyItem = (itemType, itemId) => {
    let item, setItems, items;

    switch (itemType) {
      case 'boat':
        items = boats;
        setItems = setBoats;
        item = boats.find(b => b.id === itemId);
        break;
      case 'companion':
        items = companions;
        setItems = setCompanions;
        item = companions.find(c => c.id === itemId);
        break;
      case 'gun':
        items = guns;
        setItems = setGuns;
        item = guns.find(g => g.id === itemId);
        break;
      default:
        return;
    }

    if (!item || item.owned) return;

    if (coins >= item.price) {
      setCoins(coins - item.price);
      setItems(items.map(i => i.id === itemId ? { ...i, owned: true } : i));
      return true;
    }

    return false;
  };

  const rentItem = (itemType, itemId) => {
    let item;

    switch (itemType) {
      case 'boat':
        item = boats.find(b => b.id === itemId);
        break;
      case 'companion':
        item = companions.find(c => c.id === itemId);
        break;
      case 'gun':
        item = guns.find(g => g.id === itemId);
        break;
      default:
        return;
    }

    if (!item) return;

    if (coins >= item.rentPrice) {
      setCoins(coins - item.rentPrice);
      return true;
    }

    return false;
  };

  const addCoins = (amount) => {
    setCoins(coins + amount);
  };

  const updateHighscore = (newScore) => {
    if (newScore > highscore) {
      setHighscore(newScore);
    }
  };

  const sendGlobalMessage = (message) => {
    const newMessage = {
      id: chatMessages.length + 1,
      username: username,
      message: message,
      timestamp: new Date(),
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  const completeTask = (taskId) => {
    setDailyTasks(dailyTasks.map(task =>
      task.id === taskId ? { ...task, completed: true, progress: task.target } : task
    ));
  };

  return (
    <GameContext.Provider
      value={{
        // User Data
        username,
        setUsername,
        coins,
        highscore,
        avatar,
        setAvatar,

        // Items
        boats,
        companions,
        guns,
        selectedBoat,
        selectedCompanion,
        selectedGun,
        setSelectedBoat,
        setSelectedCompanion,
        setSelectedGun,

        // Actions
        buyItem,
        rentItem,
        addCoins,
        updateHighscore,

        // Social
        leaderboard,
        dailyTasks,
        chatMessages,
        sendGlobalMessage,
        completeTask,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
