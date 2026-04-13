import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import InAppItemsPanel from '../components/InAppItemsPanel';
import AICompanionChat from '../components/AICompanionChat';
import GlobalChat from '../components/GlobalChat';
import DashboardScene from '../components/DashboardScene';

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col p-3 md:p-6 lg:h-screen lg:overflow-hidden relative">
      <DashboardScene />
      <div className="max-w-[1920px] mx-auto w-full flex flex-col min-h-screen lg:h-full lg:min-h-0 relative z-10">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Main Content - 2 Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 mt-6 overflow-visible lg:overflow-hidden pb-8 lg:pb-6"
        >
          {/* Left Column - AI Companion */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-6 h-auto min-h-[520px] lg:h-full lg:min-h-0 relative group"
          >
            <div className="absolute inset-0 bg-doge-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <AICompanionChat />
          </motion.div>

          {/* Right Column - Global Chat */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-6 h-auto min-h-[440px] lg:h-full lg:min-h-0 relative group"
          >
            <div className="absolute inset-0 bg-doge-diamond/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <GlobalChat />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
