import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import ChatGlassScene from './ChatGlassScene';

const GlobalChat = () => {
  const { chatMessages, sendGlobalMessage, username } = useGame();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    sendGlobalMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getUserColor = (user) => {
    if (user === 'System') return 'text-doge-gold shadow-[0_0_5px_rgba(240,180,41,0.5)]';
    if (user === 'Admin') return 'text-doge-redstone shadow-[0_0_5px_rgba(224,64,64,0.5)]';
    if (user === username) return 'text-doge-emerald shadow-[0_0_5px_rgba(16,185,129,0.5)]';
    return 'text-doge-diamond shadow-[0_0_5px_rgba(56,178,172,0.5)]';
  };

  return (
    <div className="relative h-full flex flex-col rounded-2xl border-2 border-doge-gold/20 bg-doge-darker/60 backdrop-blur-lg overflow-hidden shadow-glow-gold/5">
      <ChatGlassScene color="#38b2ac" />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-doge-gold/10 bg-doge-darker/40 overflow-hidden">
        {/* Subtle Scanline */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-0 bg-[length:100%_2px]" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-2xl drop-shadow-[0_0_8px_rgba(240,180,41,0.4)]"
            >
                💬
            </motion.span>
            <div>
              <h3 className="text-sm font-bold text-doge-gold tracking-widest uppercase">Global Chat</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-doge-iron/60 font-mono">NODE_STATUS:</span>
                <span className="status-green-text text-[10px] font-mono animate-pulse">SYNCED</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-doge-gold/5 px-3 py-1 rounded-full border border-doge-gold/10">
            <div className="status-green-dot animate-ping" />
            <span className="status-green-text text-[10px] font-bold tracking-tighter uppercase">Live Network</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-hidden p-3 md:p-4 flex flex-col-reverse">
        <div className="space-y-3">
          <AnimatePresence>
            {chatMessages.slice(-8).map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -10, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-doge-gold/5 hover:bg-doge-gold/10 border-l-2 border-doge-gold/40 p-3 rounded-r-xl transition-colors group"
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className={`text-[11px] font-black uppercase tracking-wider ${getUserColor(message.username)}`}>
                  {message.username}
                </span>
                <span className="text-[9px] text-doge-iron/40 font-mono group-hover:text-doge-iron/80 transition-colors">
                  [{formatTime(message.timestamp)}]
                </span>
              </div>
              <p className="text-sm text-doge-stone/90 leading-tight font-medium break-words italic group-hover:not-italic transition-all">
                {message.message}
              </p>
            </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-3 border-t border-doge-gold/10 bg-doge-darker/80">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="BROADCAST_MESSAGE_"
            className="flex-1 bg-transparent border-b border-doge-gold/30 px-3 py-2 text-doge-gold placeholder:text-doge-gold/20 focus:border-doge-gold/60 focus:outline-none text-xs font-mono"
            maxLength={200}
          />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(240,180,41,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`bg-doge-gold/20 hover:bg-doge-gold/40 text-doge-gold border border-doge-gold/40 px-4 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
              !inputValue.trim() ? 'opacity-30 cursor-not-allowed grayscale' : ''
            }`}
          >
            Send
          </motion.button>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
            <span className="text-[9px] text-doge-iron/30 font-mono italic">BUFFER_LOAD: {inputValue.length}/200</span>
            <div className={`w-1 h-1 rounded-full ${inputValue.length > 150 ? 'bg-doge-redstone animate-pulse' : 'bg-doge-gold/20'}`} />
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
