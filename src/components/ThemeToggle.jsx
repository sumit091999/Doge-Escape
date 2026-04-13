import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ compact = false, className = '' }) => {
  const { activeTheme, nextTheme } = useTheme();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={nextTheme}
      className={`theme-toggle ${compact ? 'theme-toggle-compact' : ''} ${className}`}
      aria-label={`Current theme: ${activeTheme.name}. Switch theme`}
      title={`Theme: ${activeTheme.name}`}
    >
      <span className="theme-toggle-mark">{activeTheme.icon}</span>
    </motion.button>
  );
};

export default ThemeToggle;
