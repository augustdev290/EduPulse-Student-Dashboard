import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface MessagesProps {
  theme: any;
}

const Messages: React.FC<MessagesProps> = ({ theme }) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const borderClass = theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100';
  const inputBg = theme.mode === 'dark' ? 'bg-slate-800' : 'bg-slate-50';
  const bubbleBg = theme.mode === 'dark' ? 'bg-slate-800' : 'bg-slate-100';

  return (
    <div className={`${cardClass} h-full flex flex-col overflow-hidden`} style={{ borderRadius: theme.borderRadius }}>
      <div className={`p-6 border-b ${borderClass}`}>
        <h3 className={`text-lg font-bold ${textMain}`}>Campus Communication</h3>
      </div>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/prof1/100/100" alt="Prof" referrerPolicy="no-referrer" />
          </div>
          <div className={`${bubbleBg} p-4 rounded-2xl rounded-tl-none max-w-[70%]`}>
            <p className="text-[10px] font-bold uppercase mb-1" style={{ color: theme.primaryColor }}>Prof. Emily Watson</p>
            <p className={`text-sm leading-relaxed ${theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Don't forget to submit your math assignments by Friday! The portal will close at midnight.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 flex-row-reverse"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden" style={{ backgroundColor: theme.primaryColor }}>
            <img src="https://picsum.photos/seed/student1/100/100" alt="Me" referrerPolicy="no-referrer" />
          </div>
          <div className="p-4 rounded-2xl rounded-tr-none max-w-[70%] shadow-lg"
               style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}>
            <p className="text-sm text-white leading-relaxed">Thanks Professor! I'm almost finished with the last problem set. I'll upload it tonight.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/prof1/100/100" alt="Prof" referrerPolicy="no-referrer" />
          </div>
          <div className={`${bubbleBg} p-4 rounded-2xl rounded-tl-none max-w-[70%]`}>
            <p className="text-[10px] font-bold uppercase mb-1" style={{ color: theme.primaryColor }}>Prof. Emily Watson</p>
            <p className={`text-sm leading-relaxed ${theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Great to hear. Let me know if you have any questions about the final chapter.</p>
          </div>
        </motion.div>
      </div>
      <div className={`p-6 border-t ${borderClass}`}>
        <div className={`${inputBg} rounded-2xl p-2 flex items-center gap-2`}>
          <input type="text" placeholder="Type a message..." className={`flex-1 bg-transparent border-none outline-none px-4 text-sm ${textMain}`} />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white p-2.5 rounded-xl shadow-lg"
            style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
