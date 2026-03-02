import React from 'react';
import { motion } from 'motion/react';
import { Event } from '../types';

export const EventCard: React.FC<{ event: Event; theme: any }> = ({ event, theme }) => {
  const colorClasses = {
    meeting: theme.mode === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700',
    review: theme.mode === 'dark' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-700',
    demo: theme.mode === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700',
    deadline: theme.mode === 'dark' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-100 text-rose-700',
  };

  const dotColors = {
    meeting: theme.mode === 'dark' ? 'bg-blue-500' : 'bg-blue-600',
    review: theme.mode === 'dark' ? 'bg-purple-500' : 'bg-purple-600',
    demo: theme.mode === 'dark' ? 'bg-emerald-500' : 'bg-emerald-600',
    deadline: theme.mode === 'dark' ? 'bg-rose-500' : 'bg-rose-600',
  };

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl border ${colorClasses[event.type]} mb-4`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${dotColors[event.type]}`}>
          {event.time.split(' ')[0]}
          <br />
          {event.time.split(' ')[1]}
        </div>
        <div className="flex-1">
          <h4 className={`text-sm font-bold ${textMain}`}>{event.title}</h4>
          <p className={`text-xs mt-0.5 ${textMuted}`}>{event.time} - 10:30 AM</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex -space-x-2">
              {event.attendees.map((avatar, i) => (
                <img 
                  key={i}
                  src={avatar} 
                  alt="Attendee" 
                  className={`w-6 h-6 rounded-full border-2 ${theme.mode === 'dark' ? 'border-slate-800' : 'border-white'} object-cover`}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{event.attendees.length} attendees</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
