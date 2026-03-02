import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutProps {
  theme: any;
}

const Logout: React.FC<LogoutProps> = ({ theme }) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`${cardClass} p-12 text-center max-w-lg mx-auto mt-10`} style={{ borderRadius: theme.borderRadius }}>
      <div className={`w-20 h-20 ${theme.mode === 'dark' ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-50 text-rose-500'} rounded-full flex items-center justify-center mx-auto mb-6`}>
        <LogOut size={40} />
      </div>
      <h3 className={`text-2xl font-bold ${textMain} mb-2`}>Session Ended</h3>
      <p className={`${textMuted} mb-8`}>You have been securely logged out of the Student Portal. Remember to close your browser if you are on a public computer.</p>
      <button className="text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
              style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}>
        Return to Login
      </button>
    </div>
  );
};

export default Logout;
