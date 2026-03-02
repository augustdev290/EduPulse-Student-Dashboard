import React from 'react';
import { motion } from 'motion/react';

interface TeamMembersProps {
  members: any[];
  onAddMember: () => void;
  theme: any;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ members, onAddMember, theme }) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const borderClass = theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100';
  const divideClass = theme.mode === 'dark' ? 'divide-slate-800' : 'divide-slate-50';
  const hoverClass = theme.mode === 'dark' ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50';
  const headerBg = theme.mode === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50';

  return (
    <div className={`${cardClass} overflow-hidden`} style={{ borderRadius: theme.borderRadius }}>
      <div className={`p-6 border-b ${borderClass} flex items-center justify-between`}>
        <h3 className={`text-lg font-bold ${textMain}`}>Faculty & Students</h3>
        <button 
          onClick={onAddMember}
          className="text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg"
          style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
        >
          Add Member
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className={`${headerBg} border-b ${borderClass}`}>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${divideClass}`}>
            {members.map((member, i) => (
            <motion.tr 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${hoverClass} transition-colors`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/m${i}/100/100`} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  <span className={`text-sm font-bold ${textMain}`}>{member.name}</span>
                </div>
              </td>
              <td className={`px-6 py-4 text-sm ${textMuted}`}>{member.role}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  member.status === 'Available' || member.status === 'Online' ? (theme.mode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : 
                  member.status === 'In Class' ? (theme.mode === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600') : 
                  (theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400')
                }`}>
                  {member.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default TeamMembers;
