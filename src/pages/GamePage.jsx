import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import UnityGameFrame from '../components/UnityGameFrame';
import LeaderboardPanel from '../components/LeaderboardPanel';
import DailyTasksPanel from '../components/DailyTasksPanel';

const GamePage = () => {
  const [isGameExpanded, setIsGameExpanded] = useState(false);

  return (
    <div
      className={`game-stage-bg min-h-screen overflow-x-hidden flex flex-col bg-doge-darker lg:h-screen lg:overflow-hidden ${
        isGameExpanded ? 'p-0 overflow-hidden' : 'p-3 md:p-4'
      }`}
    >
      <div
        className={`mx-auto w-full flex flex-col min-h-screen lg:h-full lg:min-h-0 ${
          isGameExpanded ? 'max-w-none' : 'max-w-[1600px]'
        }`}
      >
        {/* Profile Header */}
        {!isGameExpanded && <ProfileHeader />}

        {/* Game Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 min-h-0 relative z-30 ${
            isGameExpanded
              ? 'game-main-stage flex'
              : 'flex flex-col lg:grid lg:grid-cols-[260px_1fr_260px] gap-3 mt-3 md:mt-4 pb-6 lg:pb-0'
          }`}
        >
          {/* Left: Leaderboard */}
          {!isGameExpanded && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block min-h-0"
            >
              <LeaderboardPanel />
            </motion.div>
          )}

          {/* Center: Game Canvas */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`flex items-center justify-center min-h-0 ${
              isGameExpanded ? 'h-screen w-full flex-1' : 'flex-none lg:flex-1'
            }`}
          >
            <UnityGameFrame
              isExpanded={isGameExpanded}
              onToggleExpanded={() => setIsGameExpanded((current) => !current)}
            />
          </motion.div>

          {/* Right: Daily Tasks */}
          {!isGameExpanded && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block min-h-0"
            >
              <DailyTasksPanel />
            </motion.div>
          )}

          {/* Mobile: Show panels below game */}
          {!isGameExpanded && (
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="min-h-[280px]">
                <LeaderboardPanel />
              </div>
              <div className="min-h-[280px]">
                <DailyTasksPanel />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GamePage;
