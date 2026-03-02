import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Search } from 'lucide-react';

interface HelpSupportProps {
  theme: any;
}

const HelpSupport: React.FC<HelpSupportProps> = ({ theme }) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const inputBg = theme.mode === 'dark' ? 'bg-slate-800' : 'bg-slate-50';

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${cardClass} p-12 text-center`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className={`w-20 h-20 ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-300'} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          <HelpCircle size={40} />
        </motion.div>
        <h3 className={`text-xl font-bold ${textMain} mb-2`}>Student Support Center</h3>
        <p className={`${textMuted} mb-8`}>How can we help you with your academic journey today?</p>
        <div className="max-w-md mx-auto relative">
          <input type="text" placeholder="Search for help (e.g. 'how to submit assignment')" 
                 className={`w-full ${inputBg} border-none rounded-2xl py-4 px-6 pr-12 text-sm outline-none focus:ring-2 ${theme.mode === 'dark' ? 'focus:ring-slate-700' : 'focus:ring-blue-100'} shadow-inner ${textMain}`} />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Academic FAQ', desc: 'Common questions about grades, exams, and enrollment.' },
          { title: 'Technical Support', desc: 'Help with the student portal, email, and campus Wi-Fi.' },
          { title: 'Counseling Services', desc: 'Confidential support for your mental health and well-being.' },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`${cardClass} p-8 cursor-pointer`}
            style={{ borderRadius: theme.borderRadius }}
          >
            <h4 className={`font-bold ${textMain} mb-2`}>{item.title}</h4>
            <p className={`text-sm ${textMuted}`}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupport;
