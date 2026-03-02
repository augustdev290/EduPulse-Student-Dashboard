import React from 'react';
import { motion } from 'motion/react';

interface TasksProps {
  tasks: any[];
  onAddTask: () => void;
  theme: any;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onAddTask, theme }) => {
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

  return (
    <div className={`${cardClass} overflow-hidden`} style={{ borderRadius: theme.borderRadius }}>
      <div className={`p-6 border-b ${borderClass} flex items-center justify-between`}>
        <h3 className={`text-lg font-bold ${textMain}`}>My Tasks</h3>
        <button 
          onClick={onAddTask}
          className="text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          style={{ backgroundColor: theme.primaryColor }}
        >
          New Task
        </button>
      </div>
      <div className={`divide-y ${divideClass}`}>
        {tasks.map((task, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 flex items-center justify-between ${hoverClass} transition-colors cursor-pointer`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-5 h-5 border-2 rounded-md ${task.status === 'Completed' ? 'border-transparent' : theme.mode === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
                   style={task.status === 'Completed' ? { backgroundColor: theme.primaryColor } : {}}>
                {task.status === 'Completed' && (
                  <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <span className={`text-sm font-bold block ${task.status === 'Completed' ? 'text-slate-500 line-through' : textMain}`}>{task.name}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{task.subject} • Due {task.due}</span>
              </div>
            </div>
            <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${
              task.status === 'Completed' ? (theme.mode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : 
              task.status === 'In Progress' ? (theme.mode === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600') : 
              (theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400')
            }`}>
              {task.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
