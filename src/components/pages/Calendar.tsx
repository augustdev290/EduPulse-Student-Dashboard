import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Link as LinkIcon,
  Video
} from 'lucide-react';
import { EventCard } from '../EventCard';
import { Event } from '../../types';

interface CalendarProps {
  days: string[];
  events: Event[];
  onAddEvent: () => void;
  theme: any;
}

const Calendar: React.FC<CalendarProps> = ({ days, events, onAddEvent, theme }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026

  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const borderClass = theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100';
  const hoverClass = theme.mode === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50';

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Create an array for the calendar grid
  const calendarGrid = [];
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.push(null);
  }
  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarGrid.push(i);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-[2] flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardClass} p-6`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePrevMonth}
                className={`p-2 ${hoverClass} rounded-lg transition-colors`}
              >
                <ChevronLeft size={20} className="text-slate-400" />
              </button>
              <h3 className={`text-lg font-bold ${textMain} min-w-[150px] text-center`}>
                {monthNames[month]} {year}
              </h3>
              <button 
                onClick={handleNextMonth}
                className={`p-2 ${hoverClass} rounded-lg transition-colors`}
              >
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddEvent}
              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
              style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Event</span>
            </motion.button>
          </div>
          <div className={`grid grid-cols-7 gap-px ${theme.mode === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} rounded-2xl overflow-hidden border ${borderClass}`}>
            {days.map(day => (
              <div key={day} className={`${theme.mode === 'dark' ? 'bg-slate-900' : 'bg-white'} py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider`}>
                {day.substring(0, 3)}
              </div>
            ))}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${month}-${year}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="contents"
              >
                {calendarGrid.map((day, i) => (
                  <div 
                    key={day === null ? `empty-${i}` : `day-${day}`} 
                    className={`${theme.mode === 'dark' ? (day === null ? 'bg-slate-900/50' : 'bg-slate-900') : (day === null ? 'bg-slate-50/50' : 'bg-white')} h-20 sm:h-24 p-2 sm:p-3 relative group cursor-pointer ${hoverClass} transition-colors`}
                  >
                    {day !== null && (
                      <>
                        <span className={`text-xs sm:text-sm font-bold ${day === 10 && month === 1 && year === 2026 ? 'w-6 h-6 sm:w-7 sm:h-7 text-white rounded-full flex items-center justify-center' : (theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-700')}`}
                              style={day === 10 && month === 1 && year === 2026 ? { backgroundColor: theme.primaryColor } : {}}>
                          {day}
                        </span>
                        {day === 10 && month === 1 && year === 2026 && (
                          <div className="mt-1 sm:mt-2 space-y-1">
                            <div className={`text-[8px] sm:text-[9px] font-bold ${theme.mode === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-100'} px-1 sm:px-1.5 py-0.5 rounded border truncate`}>Sprint Pla...</div>
                            <div className={`text-[8px] sm:text-[9px] font-bold ${theme.mode === 'dark' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-600 border-purple-100'} px-1 sm:px-1.5 py-0.5 rounded border truncate`}>Design Re...</div>
                          </div>
                        )}
                        {day === 11 && month === 1 && year === 2026 && <div className="mt-1 sm:mt-2"><div className={`text-[8px] sm:text-[9px] font-bold ${theme.mode === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} px-1 sm:px-1.5 py-0.5 rounded border truncate`}>Team Sta...</div></div>}
                      </>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${cardClass} p-6 flex items-center gap-6`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <div className={`w-12 h-12 ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400'} rounded-2xl flex items-center justify-center`}>
            <MapPin size={24} />
          </div>
          <div>
            <h4 className={`font-bold ${textMain}`}>Location</h4>
            <p className={`text-sm ${textMuted}`}>Conference room A / Virtual</p>
          </div>
        </motion.div>
      </div>
      <div className="flex-1 flex flex-col gap-6 min-w-[320px]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`${cardClass} p-6`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <h3 className={`text-lg font-bold ${textMain} mb-6`}>Today's Events</h3>
          <div className="space-y-1">
            {events.map(event => <EventCard key={event.id} event={event} theme={theme} />)}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-[32px] p-6 shadow-lg relative overflow-hidden group"
          style={{ 
            borderRadius: theme.borderRadius,
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}CC)`,
            boxShadow: `0 20px 25px -5px ${theme.primaryColor}33`
          }}
        >
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-6">
              <LinkIcon size={20} />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Meeting Link</h4>
            <p className="text-xs text-white/80 mb-6">Add Google Meet / Zoom Link</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${theme.mode === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'} py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-colors shadow-xl`}
            >
              <Video size={18} /> Generate
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calendar;
