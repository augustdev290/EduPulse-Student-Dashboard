import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckSquare, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Plus, 
  FileText, 
  Video 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

interface DashboardProps {
  chartData: any[];
  distributionData: any[];
  projectStatusData: any[];
  skillsData: any[];
  setActiveTab: (tab: string) => void;
  theme: any;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  chartData, 
  distributionData, 
  projectStatusData, 
  skillsData,
  setActiveTab,
  theme
}) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Stats Section */}
      {[
        { label: 'GPA', value: '3.85', change: '+0.1', color: 'blue', icon: BarChart3 },
        { label: 'Attendance', value: '96%', change: '+2%', color: 'emerald', icon: Users },
        { label: 'Assignments', value: '8', change: '-2', color: 'purple', icon: CheckSquare },
        { label: 'Study Hours', value: '42h', change: '+5h', color: 'rose', icon: FolderKanban },
      ].map((stat, i) => {
        const colorMap: Record<string, string> = {
          blue: theme.mode === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600',
          purple: theme.mode === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600',
          emerald: theme.mode === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
          rose: theme.mode === 'dark' ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-600',
        };
        
        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${cardClass} p-6`}
            style={{ borderRadius: theme.borderRadius }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${colorMap[stat.color]}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') 
                  ? (theme.mode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600') 
                  : (theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400')
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h4 className={`text-2xl font-bold tracking-tight ${textMain}`}>{stat.value}</h4>
          </motion.div>
        );
      })}

      {/* Main Productivity Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className={`lg:col-span-3 p-8 ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className={`text-lg font-bold ${textMain}`}>Productivity Trends</h3>
            <p className="text-xs text-slate-400">Task completion vs planned work</p>
          </div>
          <div className="flex items-center gap-4">
            <select className={`${theme.mode === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-500'} border-none rounded-xl text-[10px] font-bold uppercase px-3 py-2 outline-none`}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.primaryColor} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={theme.primaryColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.mode === 'dark' ? '#1e293b' : '#f1f5f9'} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  backgroundColor: theme.mode === 'dark' ? '#1e293b' : '#ffffff',
                  color: theme.mode === 'dark' ? '#ffffff' : '#1e293b'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stroke={theme.primaryColor} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCompleted)" 
              />
              <Area 
                type="monotone" 
                dataKey="planned" 
                stroke={theme.mode === 'dark' ? '#334155' : '#e2e8f0'} 
                strokeWidth={2}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Task Distribution Donut */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-8 flex flex-col ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <h3 className={`text-lg font-bold ${textMain} mb-2`}>Task Distribution</h3>
        <p className="text-xs text-slate-400 mb-6">Allocation by category</p>
        
        <div className="flex-1 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {distributionData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 mt-4">
          {distributionData.map((item: any, i: number) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className={`text-[10px] font-bold uppercase ${theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{item.name}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{Math.round(item.value / 10)}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Project Status Stacked Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`lg:col-span-2 p-8 ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <h3 className={`text-lg font-bold ${textMain} mb-6`}>Project Status</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectStatusData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.mode === 'dark' ? '#1e293b' : '#f1f5f9'} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: theme.mode === 'dark' ? '#1e293b' : '#f8fafc' }} 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none',
                  backgroundColor: theme.mode === 'dark' ? '#1e293b' : '#ffffff',
                  color: theme.mode === 'dark' ? '#ffffff' : '#1e293b'
                }} 
              />
              <Bar dataKey="completed" stackId="a" fill={theme.primaryColor} radius={[0, 0, 0, 0]} />
              <Bar dataKey="pending" stackId="a" fill="#9333ea" radius={[0, 0, 0, 0]} />
              <Bar dataKey="delayed" stackId="a" fill="#f43f5e" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Team Skills Radar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className={`lg:col-span-2 p-8 ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <h3 className={`text-lg font-bold ${textMain} mb-6`}>Team Capabilities</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
              <PolarGrid stroke={theme.mode === 'dark' ? '#1e293b' : '#f1f5f9'} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Team A" dataKey="A" stroke={theme.primaryColor} fill={theme.primaryColor} fillOpacity={0.6} />
              <Radar name="Team B" dataKey="B" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Today's Classes */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`lg:col-span-2 p-8 ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <h3 className={`text-lg font-bold ${textMain} mb-6`}>Today's Classes</h3>
        <div className="space-y-6">
          {[
            { title: 'Advanced Mathematics', time: '08:00 AM', room: 'Room 302', color: 'blue' },
            { title: 'Computer Science', time: '10:30 AM', room: 'Lab 1', color: 'purple' },
            { title: 'World History', time: '01:00 PM', room: 'Hall A', color: 'emerald' },
          ].map((cls, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]`} style={{ backgroundColor: cls.color === 'blue' ? theme.primaryColor : cls.color === 'purple' ? '#9333ea' : '#10b981' }}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className={`text-sm font-bold ${textMain}`}>{cls.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{cls.time}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{cls.room}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className={`lg:col-span-2 p-8 ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <h3 className={`text-lg font-bold ${textMain} mb-6`}>Activity Feed</h3>
        <div className="space-y-6">
          {[
            { user: 'Prof. Smith', action: 'posted new assignment', time: '10m ago', color: 'blue' },
            { user: 'Sarah', action: 'shared notes for Biology', time: '1h ago', color: 'purple' },
            { user: 'Library', action: 'book return reminder', time: '3h ago', color: 'emerald' },
          ].map((item, i) => {
            const colorMap: Record<string, string> = {
              blue: theme.mode === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600',
              purple: theme.mode === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600',
              emerald: theme.mode === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
            };
            return (
              <div key={i} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full ${colorMap[item.color]} flex items-center justify-center font-bold text-[10px]`}>
                  {item.user[0]}
                </div>
                <div>
                  <p className={`text-xs ${theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    <span className={`font-bold ${textMain}`}>{item.user}</span> {item.action}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Academic Semester Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className={`lg:col-span-4 p-8 overflow-hidden ${cardClass}`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className={`text-lg font-bold ${textMain}`}>Semester Timeline</h3>
          <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>
        <div className="space-y-6 relative">
          <div className={`absolute top-0 bottom-0 left-[20%] border-l border-dashed ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}></div>
          <div className={`absolute top-0 bottom-0 left-[40%] border-l border-dashed ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}></div>
          <div className={`absolute top-0 bottom-0 left-[60%] border-l border-dashed ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}></div>
          <div className={`absolute top-0 bottom-0 left-[80%] border-l border-dashed ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}></div>
          
          {[
            { name: 'Midterm Exams', start: '35%', width: '15%', color: 'rose' },
            { name: 'Research Paper', start: '20%', width: '60%', color: 'blue' },
            { name: 'Group Project', start: '50%', width: '30%', color: 'purple' },
            { name: 'Final Exams', start: '85%', width: '15%', color: 'emerald' },
          ].map((item, i) => {
            const barColors: Record<string, string> = {
              blue: theme.mode === 'dark' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-blue-500/20 border-blue-500 text-blue-700',
              purple: theme.mode === 'dark' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-purple-500/20 border-purple-500 text-purple-700',
              emerald: theme.mode === 'dark' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-emerald-500/20 border-emerald-500 text-emerald-700',
              rose: theme.mode === 'dark' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-rose-500/20 border-rose-500 text-rose-700',
            };
            return (
              <div key={i} className="flex items-center gap-4">
                <span className="w-24 text-[10px] font-bold text-slate-500 uppercase truncate">{item.name}</span>
                <div className={`flex-1 h-8 rounded-xl relative overflow-hidden ${theme.mode === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: item.width, left: item.start }}
                    transition={{ duration: 1.5, delay: 1.2 + i * 0.1 }}
                    className={`absolute h-full ${barColors[item.color]} border-l-4 rounded-r-lg flex items-center px-3`}
                  >
                    <span className="text-[9px] font-bold uppercase">{item.width} progress</span>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions Bento */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Submit Assignment', icon: Plus, color: 'blue' },
          { label: 'Join Study Group', icon: Users, color: 'purple' },
          { label: 'Request Transcript', icon: FileText, color: 'emerald' },
          { label: 'Virtual Lecture', icon: Video, color: 'rose' },
        ].map((action, i) => {
          const iconColors: Record<string, string> = {
            blue: theme.mode === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600',
            purple: theme.mode === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600',
            emerald: theme.mode === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
            rose: theme.mode === 'dark' ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-600',
          };
          return (
            <button key={i} 
              className={`flex flex-col items-center justify-center p-6 transition-all group ${cardClass} hover:bg-opacity-50`}
              style={{ borderRadius: theme.borderRadius }}
            >
              <div className={`w-12 h-12 rounded-2xl ${iconColors[action.color]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon size={24} />
              </div>
              <span className={`text-xs font-bold ${theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{action.label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dashboard;
