# 🚤 DogeEscape - Play Now

> Every Frame Matters

A blockchain-integrated Minecraft-themed endless runner game where players escape through blocky waters, collect diamonds, upgrade boats, and climb the global leaderboard!

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://dogeescape.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![Unity](https://img.shields.io/badge/Unity-WebGL-black?logo=unity)](https://unity.com/)

---

## 🎮 Features

### 🎯 Core Gameplay
- **Endless Runner**: Navigate through challenging blocky waters
- **Dynamic Obstacles**: Avoid rocks, collect diamonds, survive the chaos
- **Power-ups**: Speed boosts, shields, and special abilities
- **Progressive Difficulty**: The longer you survive, the harder it gets

### 🛒 In-App Shop
- **Boats**: Unlock faster, more agile vessels
- **Companions**: Get AI buddies with special abilities (coin magnets, shields, etc.)
- **Guns**: Upgrade your firepower to blast obstacles
- **Blockchain Purchases**: Buy items with crypto (Web3 integrated)

### 🌐 Social Features
- **Live Leaderboard**: Compete globally in real-time
- **AI Companion Chat**: Get tips, tricks, and game advice from your AI buddy
- **Global Chat**: Connect with players worldwide
- **Daily Tasks**: Complete challenges for bonus rewards

### 🎨 Global Themes
- **Icon Theme Switcher**: Cycle themes from the landing page and connected top bar
- **Persistent Preference**: The selected theme is saved in `localStorage`
- **App-Wide Styling**: Theme colors carry across landing, dashboard, market, game, leaderboard, profile, chat, cards, and buttons
- **DogeOS-Inspired Palettes**: DogeOS Classic, Such Wow Arcade, and Doge Network State

### 🔗 Web3 Integration
- **Wallet Connect**: Zerion, MetaMask, and more
- **On-Chain Items**: NFT-based boats and companions
- **Smart Contracts**: Secure in-game purchases
- **Multi-Chain Support**: EVM compatible

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

### Game Engine
- **Unity WebGL** - Game build (960x600)
- **C# Scripts** - Game logic

### Blockchain
- **Web3.js / Ethers.js** - Wallet integration
- **Smart Contracts** - Solidity (Boats, Companions, Guns)
- **IPFS** - Metadata storage

### Deployment
- **Vercel** - Frontend hosting
- **Cloudflare R2** - Unity build storage (CDN)
- **MongoDB** - User data & leaderboard

---

## 📁 Project Structure

```
dogeescape-webapp/
├── public/
│   ├── Build/               # Unity WebGL build files (loaded from R2)
│   └── TemplateData/        # Unity template assets
├── src/
│   ├── components/
│   │   ├── ProfileHeader.jsx
│   │   ├── UnityGameFrame.jsx
│   │   ├── InAppItemsPanel.jsx
│   │   ├── AICompanionChat.jsx
│   │   ├── GlobalChat.jsx
│   │   ├── LeaderboardPanel.jsx
│   │   ├── DailyTasksPanel.jsx
│   │   └── ItemCard.jsx
│   ├── context/
│   │   ├── GameContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── WalletContext.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Home.jsx
│   │   └── GamePage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .env.production
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20 recommended and npm
- Git
- Web3 wallet (MetaMask, Zerion, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/sumit091999/Doge-Escape.git
cd Doge-Escape

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:3000` 🎮

If you use NVM:

```bash
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh" && nvm use 20 && npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Unity Build URL (Cloudflare R2 bucket)
VITE_UNITY_BUILD_URL=https://your-r2-bucket.r2.dev

# Backend API (if applicable)
VITE_API_URL=https://your-backend-api.com

# Blockchain Network
VITE_CHAIN_ID=1
VITE_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY

# Smart Contract Addresses
VITE_BOAT_CONTRACT=0x...
VITE_COMPANION_CONTRACT=0x...
VITE_GUN_CONTRACT=0x...
```

### Production (.env.production)

```env
VITE_UNITY_BUILD_URL=https://pub-xxxxx.r2.dev
VITE_API_URL=https://api.dogeescape.xyz
VITE_CHAIN_ID=1
```

---

## 📦 Deployment

### 1️⃣ Deploy Unity Build to Cloudflare R2

```bash
# Upload your Unity WebGL build to R2
# Structure:
# your-bucket/
# ├── Build/
# │   ├── Game.loader.js
# │   ├── Game.data
# │   ├── Game.framework.js
# │   └── Game.wasm
# └── StreamingAssets/

# Enable CORS on R2:
# AllowedOrigins: ["https://dogeescape.vercel.app"]
# AllowedMethods: ["GET", "HEAD"]
```

### 2️⃣ Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Or connect GitHub repo for auto-deploy
```

### 3️⃣ Set Environment Variables in Vercel

1. Go to Vercel Home → Project → Settings → Environment Variables
2. Add `VITE_UNITY_BUILD_URL` with your R2 bucket URL
3. Add other variables as needed
4. Redeploy

---

## 🎨 UI Themes

The app has a global theme system powered by `ThemeContext`.

### Available Themes
- **DogeOS Classic**: Warm Doge gold, brown, and dark arcade tones
- **Such Wow Arcade**: Neon game-cabinet palette with yellow, cyan, and pink accents
- **Doge Network State**: Dark Web3 platform palette with Doge yellow and electric blue accents

### Theme Switcher
- On the landing page, the icon-only theme button is fixed near the top-right
- After wallet connection, the same theme button appears in the shared top bar
- The theme cycles with icons like `☀️`, `🌙`, and `✨`
- The selected theme is saved under `dogeescape_theme` in `localStorage`

### Implementation Notes
- Theme state lives in `src/context/ThemeContext.jsx`
- The reusable button lives in `src/components/ThemeToggle.jsx`
- Theme palettes are CSS variables applied through `:root[data-theme="..."]`
- Existing `bg-doge-*`, `text-doge-*`, and `border-doge-*` utilities are remapped to the active theme

---

## 🐕 Doge & MyDoge Branding

DogeEscape uses Doge-first visual branding across the landing page, feature cards, profile imagery, and marketplace previews.

### Brand Assets
- **Main Logo**: `public/images/DogeEscape-logo.png`
- **Feature Icon**: `public/images/Icon-Logo.png`
- **MyDoge Square Logo**: `public/images/mydoge-assets/Square_Logo.png` (`125x125`)

### MyDoge Partner Guidelines Applied
- Keep app icons simple and readable at small sizes
- Avoid text-heavy images and cluttered backgrounds
- Use strong contrast for catalogue and banner placements
- Leave clean space for category tags and UI overlays
- Use friendly Doge-themed visuals without competing with product copy

---

## 🎯 Game Mechanics

### Controls
- **WASD** or **Arrow Keys**: Move boat
- **Mouse Click**: Shoot (if gun equipped)
- **Space**: Use companion ability

### Scoring
- **Distance**: +1 point per meter
- **Diamonds**: +50 points each
- **Enemies Destroyed**: +100 points
- **Survival Bonus**: +10 points per second

### Power-ups
- **Shield**: 5-second invincibility
- **Speed Boost**: 2x speed for 3 seconds
- **Coin Magnet**: Auto-collect nearby coins

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Development with NVM / Node 20
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh" && nvm use 20 && npm run dev

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Lint
npm run lint         # ESLint check
```

### Adding New Items

1. **Add to GameContext**:
```javascript
// src/context/GameContext.jsx
const newBoat = {
  id: 5,
  name: "Speedster",
  image: "🚀",
  price: 500,
  speed: 8,
  owned: false
};
```

2. **Update Smart Contract** (if blockchain item)
3. **Add UI in InAppItemsPanel**

### Connecting to Backend

```javascript
// Example API call
const updateLeaderboard = async (score) => {
  await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: wallet, score })
  });
};
```

---

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Test Unity build locally
# Copy Unity build to public/Build/ folder
# Then run: npm run dev
```

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Mobile browsers (limited Unity WebGL support)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Write clean, commented code
- Test before submitting

---

## 🐛 Known Issues

- [ ] Unity WebGL audio may not work on iOS Safari
- [ ] Wallet connection may require page refresh
- [ ] Leaderboard updates every 30 seconds (not real-time WebSocket yet)

---

## 📝 Roadmap

- [ ] **Phase 1**: Launch MVP (✅ Complete)
- [ ] **Phase 2**: Add multiplayer mode
- [ ] **Phase 3**: Tournament system
- [ ] **Phase 4**: NFT marketplace integration
- [ ] **Phase 5**: Mobile app (React Native)
- [ ] **Phase 6**: DAO governance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Galacticos Labs**
- Founded by: Sidhanth
- Location: Bangkok, Thailand
- Tagline: *Every Frame Matters*

---

## 🔗 Links

- **Live Game**: [https://dogeescape.vercel.app](https://dogeescape.vercel.app)
- **Unity Build CDN**: [https://pub-xxxxx.r2.dev](https://your-r2-bucket.r2.dev)
- **Documentation**: [View Docs](./docs)
- **Smart Contracts**: [Etherscan](https://etherscan.io/address/0x...)

---

## 📧 Contact & Support

- **Email**: contact@Galacticos.com
- **Twitter**: [@DogeEscapeGame](https://twitter.com/DogeEscapeGame)
- **Discord**: [Join Community](https://discord.gg/yourserver)
- **Issues**: [GitHub Issues](https://github.com/sumit091999/Doge-Escape/issues)

---

## 🙏 Acknowledgments

- Unity Technologies for WebGL support
- Cloudflare for R2 hosting
- Vercel for frontend hosting
- Anthropic Claude for development assistance
- Minecraft for visual inspiration

---


<div align="center">

**Made with ❤️ by Galacticos Corporation**

*Every Frame Matters* 🎮

[⬆ Back to Top](#-dogeescape---play-now)

</div>
