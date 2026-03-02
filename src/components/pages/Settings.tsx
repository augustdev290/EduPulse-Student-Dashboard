import React from 'react';
import { motion } from 'motion/react';

interface SettingsProps {
  theme: any;
}

const Settings: React.FC<SettingsProps> = ({ theme }) => {
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`max-w-2xl ${cardClass} p-8`}
      style={{ borderRadius: theme.borderRadius }}
    >
      <h3 className={`text-lg font-bold ${textMain} mb-6`}>Account Settings</h3>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
          <input type="text" defaultValue="Be Confidency" className={`w-full ${inputBg} border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${theme.mode === 'dark' ? 'focus:ring-slate-700' : 'focus:ring-blue-100'} ${textMain}`} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
          <input type="email" defaultValue="helloconfidenc@gmail.com" className={`w-full ${inputBg} border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${theme.mode === 'dark' ? 'focus:ring-slate-700' : 'focus:ring-blue-100'} ${textMain}`} />
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Student ID</label>
            <input type="text" defaultValue="STU-2026-001" readOnly className={`w-full ${theme.mode === 'dark' ? 'bg-slate-900/50' : 'bg-slate-100'} border-none rounded-xl p-3 text-sm outline-none cursor-not-allowed ${textMuted}`} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Semester</label>
            <select className={`w-full ${inputBg} border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${theme.mode === 'dark' ? 'focus:ring-slate-700' : 'focus:ring-blue-100'} ${textMain}`}>
              <option>Semester 2 - 2026</option>
              <option>Semester 1 - 2026</option>
            </select>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Major / Department</label>
          <input type="text" defaultValue="Computer Science & Engineering" className={`w-full ${inputBg} border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${theme.mode === 'dark' ? 'focus:ring-slate-700' : 'focus:ring-blue-100'} ${textMain}`} />
        </motion.div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg"
          style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Settings;
