import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const DailyTasksPanel = () => {
  const { dailyTasks, completeTask } = useGame();
  const [claimedReward, setClaimedReward] = useState(null);
  const celebrationBits = ['💰', '💎', '⭐', '⚡', '🎉', '🏆', '✨', '🪙'];

  const handleClaimReward = (taskId) => {
    const task = dailyTasks.find((dailyTask) => dailyTask.id === taskId);
    completeTask(taskId);
    setClaimedReward(task);
  };

  return (
    <div className="panel-wood h-full flex flex-col relative">
      {/* Header */}
      <div className="border-b-2 border-doge-coal p-2 bg-doge-wood bg-opacity-40 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <div>
            <h3 className="text-sm font-bold text-doge-gold">Daily Tasks</h3>
            <p className="text-xs text-doge-iron">
              {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-hidden p-2 flex flex-col gap-2">
        {dailyTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`panel-stone p-2 relative ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            {/* Completion Badge */}
            {task.completed && (
              <div className="absolute -right-1 -top-1 bg-doge-gold text-doge-darker px-2 py-0.5 rounded-lg text-xs font-bold">
                ✓
              </div>
            )}

            {/* Task Content */}
            <div className="flex items-start gap-2 mb-2">
              <div className="text-lg">{task.completed ? '✅' : '📌'}</div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-xs font-bold mb-1 ${
                  task.completed ? 'text-doge-iron line-through' : 'text-doge-gold'
                }`}>
                  {task.title}
                </h4>
                <div className="text-xs text-doge-emerald">
                  {task.reward}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-doge-iron">Progress</span>
                <span className={task.completed ? 'text-doge-gold' : 'text-white'}>
                  {task.progress}/{task.target}
                </span>
              </div>
              <div className="stat-bar h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(task.progress / task.target) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`stat-bar-fill ${
                    task.completed ? 'bg-doge-gold' : 'bg-doge-emerald'
                  }`}
                />
              </div>
            </div>

            {/* Claim Button - Only show if completed */}
            {task.completed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClaimReward(task.id)}
                className="btn-primary w-full mt-2 text-xs py-1"
              >
                🎁 Claim
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t-2 border-doge-coal p-2 bg-doge-wood bg-opacity-30 rounded-b-2xl">
        <div className="text-xs text-center text-doge-iron">
          Resets: 23:45:12
        </div>
      </div>

      <AnimatePresence>
        {claimedReward && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="reward-confetti" aria-hidden="true">
              {celebrationBits.map((bit, index) => (
                <span
                  key={`${bit}-${index}`}
                  style={{
                    left: `${10 + index * 11}%`,
                    animationDelay: `${index * 0.12}s`,
                  }}
                >
                  {bit}
                </span>
              ))}
            </div>
            <motion.div
              initial={{ scale: 0.75, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="reward-modal panel-stone w-full max-w-sm p-5 text-center overflow-hidden"
            >
              <div className="reward-burst" />
              <div className="reward-sparkles" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-doge-gold bg-doge-darker text-4xl shadow-pixel"
              >
                🎁
              </motion.div>
              <div className="relative z-10 space-y-2">
                <p className="text-xs uppercase tracking-wider text-doge-emerald">
                  Quest Complete
                </p>
                <h3 className="text-xl text-doge-gold text-shadow-pixel">
                  Reward Claimed
                </h3>
                <p className="text-sm text-doge-iron">
                  {claimedReward.title}
                </p>
                <div className="mx-auto inline-flex items-center gap-2 rounded-lg border-2 border-doge-gold bg-doge-gold px-4 py-2 text-doge-darker shadow-pixel">
                  <span>💰</span>
                  <span className="font-bold">{claimedReward.reward}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setClaimedReward(null)}
                className="btn-primary relative z-10 mt-5 w-full text-sm"
              >
                Awesome
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyTasksPanel;
