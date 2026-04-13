import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import ChatGlassScene from './ChatGlassScene';

const AICompanionChat = () => {
  const navigate = useNavigate();
  const { selectedCompanion } = useGame();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Greetings! I'm ${selectedCompanion?.name || 'your companion'}. Ready for an adventure?`,
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: 'ai',
      text: 'Type "start game" to begin your escape, or ask me anything about the game!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('start') && lowerMessage.includes('game')) {
      setTimeout(() => navigate('/play'), 1000);
      return "Let's go! Launching the game... 🚀";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello there! Ready to escape through the blocky waters? 🌊";
    }

    if (lowerMessage.includes('help')) {
      return "Here's what you can do: Navigate treacherous waters, collect diamonds, avoid obstacles, and compete on the leaderboard! Type 'start game' when you're ready!";
    }

    if (lowerMessage.includes('tip') || lowerMessage.includes('tips')) {
      const tips = [
        "Collect power-ups to boost your boat! ⚡",
        "Watch out for obstacles - they'll slow you down! 🚧",
        "Diamonds give you bonus points! 💎",
        "Use your companion's special ability strategically! 🎮",
        "Higher agility means better turning! 🔄",
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }

    if (lowerMessage.includes('boat') || lowerMessage.includes('ship')) {
      return `You're currently using ${selectedCompanion?.name}! Want to upgrade? Check the Items panel! 🚤`;
    }

    if (lowerMessage.includes('score') || lowerMessage.includes('leaderboard')) {
      return "Climb the leaderboard by surviving longer and collecting more diamonds! Check your ranking after each game! 🏆";
    }

    // Default responses
    const defaultResponses = [
      "Interesting question! Ready to test your skills in the game? 🎮",
      "I'm here to help! Type 'start game' to begin your adventure! 🌊",
      "The blocky waters await! Ask me for 'tips' or 'help' anytime! ⚡",
      "Every decision matters out there! Want to know more? 🤔",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative h-full flex flex-col rounded-2xl border-2 border-doge-gold/30 bg-doge-dark/40 backdrop-blur-md overflow-hidden shadow-glow-gold/10">
      <ChatGlassScene color="#f0b429" />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-doge-gold/20 bg-gradient-to-r from-doge-gold/10 to-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-0 bg-[length:100%_2px,3px_100%]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            animate={{ 
              y: [0, -4, 0],
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl drop-shadow-[0_0_10px_rgba(240,180,41,0.5)]"
          >
            {selectedCompanion?.image}
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-doge-gold tracking-tight">
              {selectedCompanion?.name}
            </h3>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-doge-emerald rounded-full animate-pulse shadow-[0_0_5px_#10b981]" />
                <p className="text-[10px] text-doge-emerald uppercase tracking-widest font-bold">{selectedCompanion?.ability}</p>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="text-[10px] text-doge-iron/60 font-mono">AI Companion</span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-doge-gold/40 mt-1" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-hidden p-3 md:p-4 flex flex-col-reverse">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.slice(-6).map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2 rounded-2xl border shadow-pixel transition-all ${
                  message.sender === 'user'
                    ? 'bg-doge-gold/90 text-doge-dark border-doge-gold'
                    : 'bg-doge-darker/60 text-white border-doge-gold/30 backdrop-blur-sm'
                }`}
              >
                <div className={`text-[10px] mb-1 font-bold uppercase tracking-wider ${message.sender === 'user' ? 'text-doge-dark/70' : 'text-doge-gold'}`}>
                  {message.sender === 'user' ? 'Operator' : 'Companion'}
                </div>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 border-t border-doge-gold/20 bg-doge-darker/40 backdrop-blur-md">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-2 border-doge-gold/20 rounded-xl px-4 py-2 text-doge-gold placeholder:text-doge-gold/30 focus:border-doge-gold/50 focus:outline-none text-sm font-mono shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(240,180,41,1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendMessage}
            className="bg-doge-gold/80 text-doge-darker px-6 rounded-xl font-bold text-sm shadow-pixel border-b-4 border-doge-gold active:border-b-0 transition-all font-mono"
          >
            SEND
          </motion.button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => navigate('/play')}
            className="bg-doge-gold/10 hover:bg-doge-gold/20 border border-doge-gold/30 text-doge-gold text-[10px] px-3 py-1.5 rounded-lg font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <span>🎮</span> LAUNCH_APP
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => setInputValue('tips')}
            className="bg-doge-gold/5 hover:bg-doge-gold/15 border border-doge-gold/20 text-doge-iron text-[10px] px-3 py-1.5 rounded-lg font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <span>💡</span> SRC_TIPS
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AICompanionChat;
