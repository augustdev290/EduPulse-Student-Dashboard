import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const gpaData = [
  { semester: 'Sem 1', gpa: 3.2 },
  { semester: 'Sem 2', gpa: 3.4 },
  { semester: 'Sem 3', gpa: 3.5 },
  { semester: 'Sem 4', gpa: 3.7 },
  { semester: 'Sem 5', gpa: 3.85 },
];

const subjectData = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'CS', A: 150, B: 130, fullMark: 150 },
  { subject: 'History', A: 86, B: 130, fullMark: 150 },
  { subject: 'Physics', A: 99, B: 100, fullMark: 150 },
  { subject: 'Art', A: 85, B: 90, fullMark: 150 },
  { subject: 'English', A: 65, B: 85, fullMark: 150 },
];

const gradeDistribution = [
  { name: 'A', value: 45, color: '#2563eb' },
  { name: 'B', value: 30, color: '#9333ea' },
  { name: 'C', value: 15, color: '#10b981' },
  { name: 'D', value: 10, color: '#f43f5e' },
];

interface AnalyticsProps {
  theme: any;
}

const Analytics: React.FC<AnalyticsProps> = ({ theme }) => {
  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Current GPA', value: '3.85', color: 'blue', trend: '+0.15' },
          { label: 'Credits Earned', value: '42', color: 'purple', trend: '+12' },
          { label: 'Class Rank', value: '12/120', color: 'emerald', trend: 'Top 10%' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${cardClass} p-8`}
            style={{ borderRadius: theme.borderRadius }}
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h4 className={`text-3xl font-bold ${textMain}`}>{stat.value}</h4>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                stat.color === 'blue' ? (theme.mode === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600') :
                stat.color === 'purple' ? (theme.mode === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600') : 
                (theme.mode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
              }`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GPA Progress Line Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`${cardClass} p-8`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <h3 className={`text-lg font-bold ${textMain} mb-8`}>GPA Progress</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaData}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.primaryColor} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={theme.primaryColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.mode === 'dark' ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis domain={[0, 4]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: theme.mode === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme.mode === 'dark' ? '#ffffff' : '#1e293b'
                  }}
                />
                <Area type="monotone" dataKey="gpa" stroke={theme.primaryColor} strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject Strengths Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`${cardClass} p-8`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <h3 className={`text-lg font-bold ${textMain} mb-8`}>Subject Strengths</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                <PolarGrid stroke={theme.mode === 'dark' ? '#1e293b' : '#f1f5f9'} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="A" stroke={theme.primaryColor} fill={theme.primaryColor} fillOpacity={0.6} />
                <Radar name="Average" dataKey="B" stroke="#9333ea" fill="#9333ea" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Grade Distribution Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={`${cardClass} p-8`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <h3 className={`text-lg font-bold ${textMain} mb-8`}>Grade Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {gradeDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className={`text-xs font-bold ${theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Semester Comparison Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`${cardClass} p-8`}
          style={{ borderRadius: theme.borderRadius }}
        >
          <h3 className={`text-lg font-bold ${textMain} mb-8`}>Study Hours vs Performance</h3>
          <div className="h-72 flex items-end gap-6">
            {[
              { label: 'Math', hours: 80, grade: 92 },
              { label: 'CS', hours: 95, grade: 98 },
              { label: 'Hist', hours: 45, grade: 85 },
              { label: 'Phys', hours: 70, grade: 88 },
              { label: 'Art', hours: 30, grade: 95 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end gap-1 h-48">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.hours}%` }}
                    className={`flex-1 ${theme.mode === 'dark' ? 'bg-slate-800' : 'bg-blue-100'} rounded-t-lg`}
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.grade}%` }}
                    className="flex-1 rounded-t-lg"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${theme.mode === 'dark' ? 'bg-slate-800' : 'bg-blue-100'}`}></div>
              <span className={`text-xs font-bold ${theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Study Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
              <span className={`text-xs font-bold ${theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Grade %</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
