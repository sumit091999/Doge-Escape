import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import ItemCard from './ItemCard';
import ItemDetailsModal from './ItemDetailsModal';

const InAppItemsPanel = () => {
  const { boats, companions, guns } = useGame();
  const [activeTab, setActiveTab] = useState('boats');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);

  const tabs = [
    { id: 'boats', label: 'Boats', icon: '', data: boats },
    { id: 'companions', label: 'AI Companions', icon: '', data: companions },
    { id: 'guns', label: 'Guns', icon: '', data: guns },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  return (
    <div className="panel-wood h-full flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b-2 border-doge-coal">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-2 py-3 border-r-2 border-doge-coal relative transition-colors ${
              activeTab === tab.id
                ? 'bg-doge-gold text-doge-darker'
                : 'bg-doge-wood bg-opacity-20 hover:bg-opacity-40'
            } ${tab.id === tabs[0].id ? 'rounded-tl-2xl' : ''} ${tab.id === tabs[tabs.length-1].id ? 'rounded-tr-2xl border-r-0' : ''}`}
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs font-bold">{tab.label}</span>
            </div>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-doge-emerald rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden p-3 md:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col gap-3"
          >
            {activeTabData?.data.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                itemType={activeTab}
                onClick={() => handleItemClick(item, activeTab)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailsModal
            item={selectedItem}
            itemType={selectedItemType}
            onClose={() => {
              setSelectedItem(null);
              setSelectedItemType(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InAppItemsPanel;
