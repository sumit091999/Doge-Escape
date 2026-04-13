import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import { useGame } from '../context/GameContext';
import ZkArenaScene from '../components/ZkArenaScene';

const LeaderboardPage = () => {
  const { leaderboard } = useGame();
  const [activeBoard, setActiveBoard] = useState('all');

  const allTimeRows = [
    ...leaderboard.map((player, index) => ({
      ...player,
      wins: [342, 310, 276, 241, 220][index] || 100,
      level: [87, 82, 75, 71, 68][index] || 50,
      delta: ['—', '▲', '▼', '—', '▲'][index] || '—',
    })),
    { rank: 6, username: 'GoldWake', score: 10900, avatar: '/images/doge_avatar.png', wins: 188, level: 59, delta: '▲' },
    { rank: 7, username: 'BoatByte', score: 9840, avatar: '/images/doge_avatar.png', wins: 161, level: 52, delta: '—' },
  ];

  const weeklyRows = allTimeRows
    .map((player, index) => ({
      ...player,
      score: Math.round(player.score * [0.32, 0.28, 0.24, 0.21, 0.2, 0.18, 0.16][index]),
      wins: Math.max(8, Math.round(player.wins * [0.28, 0.24, 0.22, 0.18, 0.16, 0.14, 0.12][index])),
      delta: ['▲', '—', '▲', '▼', '—', '▲', '▼'][index],
    }))
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  const dailyRows = allTimeRows
    .map((player, index) => ({
      ...player,
      score: Math.round(player.score * [0.08, 0.065, 0.075, 0.055, 0.05, 0.045, 0.04][index]),
      wins: Math.max(1, Math.round(player.wins * [0.06, 0.05, 0.055, 0.04, 0.035, 0.03, 0.025][index])),
      delta: ['▲', '▲', '—', '▼', '▲', '—', '▼'][index],
    }))
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  const boards = {
    daily: { label: 'Daily', rows: dailyRows, subtitle: 'Today’s fastest verified racers' },
    weekly: { label: 'Weekly', rows: weeklyRows, subtitle: 'This week’s race momentum' },
    all: { label: 'All Time', rows: allTimeRows, subtitle: 'Rankings verified on-chain with zero-knowledge proofs' },
  };

  const rows = boards[activeBoard].rows;
  const podium = rows.slice(0, 3);

  return (
    <div className="screen-page leaderboard-screen min-h-screen bg-doge-darker p-3 md:p-4 lg:p-6 relative overflow-x-hidden">
      <ZkArenaScene />
      <div className="max-w-[1920px] mx-auto w-full flex flex-col min-h-screen relative z-10">
        <ProfileHeader />

        <section className="leaderboard-hero-copy">
          <h1>ZK-Proof Leaderboard</h1>
          <p>{boards[activeBoard].subtitle}</p>
          <div className="leaderboard-filters">
            {Object.entries(boards).map(([key, board]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveBoard(key)}
                className={activeBoard === key ? 'active' : ''}
              >
                {board.label}
              </button>
            ))}
          </div>
        </section>

        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="leaderboard-page-body"
        >
          <section className="podium-stage">
            {[podium[1], podium[0], podium[2]].map((player, index) => {
              const place = [2, 1, 3][index];
              return (
                <div key={`${activeBoard}-${player.username}`} className={`podium-player podium-${place}`}>
                  <div className="podium-medal">🏅 {place}</div>
                  <div className="podium-avatar">
                    {player.avatar?.startsWith('/') ? <img src={player.avatar} alt={player.username} /> : player.avatar}
                  </div>
                  <strong>{player.username}</strong>
                  <span>{player.score.toLocaleString()} pts</span>
                  <div className="podium-block">#{place}</div>
                </div>
              );
            })}
          </section>

          <section className="rank-table">
            <div className="rank-table-head">
              <span>Rank</span>
              <span>Player</span>
              <span>Score</span>
              <span>Wins</span>
              <span>Level</span>
              <span>Δ</span>
            </div>
            <div className="rank-table-scroll scrollbar-minecraft">
              {rows.map((player) => (
                <div key={`${activeBoard}-${player.rank}-${player.username}`} className="rank-table-row">
                  <strong>#{player.rank}</strong>
                  <div>
                    {player.avatar?.startsWith('/') ? <img src={player.avatar} alt={player.username} /> : <span>{player.avatar}</span>}
                    <b>{player.username}</b>
                  </div>
                  <span>{player.score.toLocaleString()}</span>
                  <span>{player.wins}</span>
                  <span>Lv.{player.level}</span>
                  <span className={player.delta === '▲' ? 'up' : player.delta === '▼' ? 'down' : ''}>{player.delta}</span>
                </div>
              ))}
            </div>
          </section>
        </motion.main>
      </div>
    </div>
  );
};

export default LeaderboardPage;
