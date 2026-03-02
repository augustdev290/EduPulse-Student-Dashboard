import React from 'react';
import { motion } from 'motion/react';
import { FileText, Users, CheckSquare, BarChart3 } from 'lucide-react';

interface ReportsProps {
  reports: any[];
  onAddReport: () => void;
  theme: any;
}

const Reports: React.FC<ReportsProps> = ({ reports, onAddReport, theme }) => {
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
        <h3 className={`text-lg font-bold ${textMain}`}>Academic Reports</h3>
        <button 
          onClick={onAddReport}
          className="text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg"
          style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
        >
          Add Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`${cardClass} p-8 group cursor-pointer hover:border-blue-200 transition-all`}
            style={{ borderRadius: theme.borderRadius }}
          >
            <div className={`w-12 h-12 ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400'} rounded-2xl flex items-center justify-center mb-4 group-hover:bg-opacity-80 transition-colors`}>
              <report.icon size={24} />
            </div>
            <h4 className={`font-bold mb-2 ${textMain}`}>{report.title}</h4>
            <p className={`text-sm mb-6 ${textMuted}`}>{report.desc}</p>
            <button className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity" style={{ color: theme.primaryColor }}>Download PDF</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
