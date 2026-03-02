import React from 'react';
import { motion } from 'motion/react';
import { FolderKanban } from 'lucide-react';

interface ProjectsProps {
  projects: any[];
  onAddProject: () => void;
  theme: any;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onAddProject, theme }) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-bold ${textMain}`}>Study Groups</h3>
        <button 
          onClick={onAddProject}
          className="text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg"
          style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
        >
          New Group
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`${cardClass} p-6 group cursor-pointer hover:border-blue-200 transition-all`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <div className={`w-12 h-12 ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400'} rounded-2xl flex items-center justify-center mb-4 group-hover:bg-opacity-80 transition-colors`}
               style={theme.mode === 'dark' ? {} : {}}>
            <FolderKanban size={24} />
          </div>
          <h4 className={`font-bold mb-1 ${textMain}`}>{project.name}</h4>
          <p className="text-xs text-slate-400 mb-4">{project.topic}</p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(j => (
                <img key={j} src={`https://picsum.photos/seed/p${i}${j}/100/100`} className={`w-6 h-6 rounded-full border-2 ${theme.mode === 'dark' ? 'border-slate-900' : 'border-white'}`} referrerPolicy="no-referrer" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.members} Members</span>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

export default Projects;
