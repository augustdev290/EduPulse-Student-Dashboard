/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Menu,
  X,
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  BarChart3, 
  Calendar as CalendarIcon, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  Bell, 
  ChevronRight, 
  Plus, 
  GraduationCap,
  Palette as PaletteIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

// --- Pages ---
import Dashboard from './components/pages/Dashboard';
import Tasks from './components/pages/Tasks';
import Projects from './components/pages/Projects';
import Analytics from './components/pages/Analytics';
import Calendar from './components/pages/Calendar';
import TeamMembers from './components/pages/TeamMembers';
import Reports from './components/pages/Reports';
import Messages from './components/pages/Messages';
import SettingsPage from './components/pages/Settings';
import HelpSupport from './components/pages/HelpSupport';
import ThemeSettings from './components/pages/ThemeSettings';
import Logout from './components/pages/Logout';
import Upgrade from './components/pages/Upgrade';

// --- Constants ---
import { 
  chartData, 
  distributionData, 
  skillsData, 
  projectStatusData, 
  days, 
  calendarDays, 
  events, 
  pageInfo 
} from './constants';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, badge, onClick, primaryColor }: { icon: any, label: string, active?: boolean, badge?: string, onClick?: () => void, primaryColor?: string }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-opacity-10' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
    style={active ? { backgroundColor: `${primaryColor}1A`, color: primaryColor } : {}}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
      <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
        {badge}
      </span>
    )}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // --- Theme Management ---
  const [theme, setTheme] = useState({
    primaryColor: '#2563eb',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    mode: 'light' as 'light' | 'dark',
    borderRadius: '32px',
    sidebarStyle: 'solid' as 'solid' | 'glass' | 'gradient',
    cardStyle: 'bordered' as 'flat' | 'bordered' | 'shadowed'
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--font-family', theme.fontFamily);
    document.documentElement.style.setProperty('--border-radius', theme.borderRadius);
    
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--bg-main', '#020617');
      document.documentElement.style.setProperty('--bg-card', '#0f172a');
      document.documentElement.style.setProperty('--text-main', '#ffffff');
      document.documentElement.style.setProperty('--text-muted', '#94a3b8');
      document.documentElement.style.setProperty('--border-color', '#1e293b');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-main', '#F0F2F5');
      document.documentElement.style.setProperty('--bg-card', '#ffffff');
      document.documentElement.style.setProperty('--text-main', '#1e293b');
      document.documentElement.style.setProperty('--text-muted', '#64748b');
      document.documentElement.style.setProperty('--border-color', '#f1f5f9');
    }
  }, [theme]);

  // --- State Management ---
  const [tasks, setTasks] = useState([
    { name: 'Calculus Homework', subject: 'Mathematics', due: 'Tomorrow', status: 'Pending' },
    { name: 'History Essay', subject: 'History', due: 'In 2 days', status: 'In Progress' },
    { name: 'Physics Lab Report', subject: 'Physics', due: 'Next Week', status: 'Pending' },
    { name: 'Biology Quiz Prep', subject: 'Biology', due: 'Today', status: 'Completed' },
    { name: 'Literature Review', subject: 'English', due: 'Next Monday', status: 'Pending' },
    { name: 'Chemistry Lab', subject: 'Chemistry', due: 'Friday', status: 'In Progress' },
    { name: 'Art Portfolio', subject: 'Fine Arts', due: 'Next Month', status: 'Pending' },
  ]);

  const [projects, setProjects] = useState([
    { name: 'Math Study Group', members: 5, topic: 'Calculus III' },
    { name: 'History Debate Club', members: 8, topic: 'Modern History' },
    { name: 'CS Project Team', members: 4, topic: 'React Dashboard' },
    { name: 'Science Lab Partners', members: 2, topic: 'Organic Chemistry' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Dr. Emily Watson', role: 'Mathematics Professor', status: 'In Class' },
    { name: 'John Doe', role: 'Student (CS)', status: 'Online' },
    { name: 'Sarah Miller', role: 'History Teacher', status: 'Available' },
    { name: 'Alex Rivera', role: 'Student (Arts)', status: 'Offline' },
  ]);

  const [reports, setReports] = useState([
    { title: 'Semester Transcript', desc: 'Official record of all grades for the current semester.', icon: FileText },
    { title: 'Attendance Report', desc: 'Detailed breakdown of class attendance by subject.', icon: Users },
    { title: 'Assignment Summary', desc: 'Overview of submitted and pending assignments.', icon: CheckSquare },
    { title: 'Performance Forecast', desc: 'AI-driven prediction of final grades based on current trends.', icon: BarChart3 },
  ]);

  const [showCreateModal, setShowCreateModal] = useState<{ type: 'Task' | 'Project' | 'Member' | 'Report' | 'Event' | null }>({ type: null });

  const handleCreate = (data: any) => {
    if (showCreateModal.type === 'Task') {
      setTasks([{ ...data, status: 'Pending' }, ...tasks]);
    } else if (showCreateModal.type === 'Project') {
      setProjects([{ ...data, members: 1 }, ...projects]);
    } else if (showCreateModal.type === 'Member') {
      setTeamMembers([{ ...data, status: 'Online' }, ...teamMembers]);
    } else if (showCreateModal.type === 'Report') {
      setReports([{ ...data, icon: FileText }, ...reports]);
    } else if (showCreateModal.type === 'Event') {
      // For now we just alert as events are complex, or we could add to a local events state if we had one
      alert(`Event Created: ${data.name}`);
    }
    setShowCreateModal({ type: null });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <Dashboard 
            chartData={chartData}
            distributionData={distributionData}
            projectStatusData={projectStatusData}
            skillsData={skillsData}
            setActiveTab={setActiveTab}
            theme={theme}
          />
        );
      case 'Tasks':
        return <Tasks tasks={tasks} onAddTask={() => setShowCreateModal({ type: 'Task' })} theme={theme} />;
      case 'Projects':
        return <Projects projects={projects} onAddProject={() => setShowCreateModal({ type: 'Project' })} theme={theme} />;
      case 'Analytics':
        return <Analytics theme={theme} />;
      case 'Calendar':
        return <Calendar days={days} events={events} onAddEvent={() => setShowCreateModal({ type: 'Event' })} theme={theme} />;
      case 'Team Members':
        return <TeamMembers members={teamMembers} onAddMember={() => setShowCreateModal({ type: 'Member' })} theme={theme} />;
      case 'Reports':
        return <Reports reports={reports} onAddReport={() => setShowCreateModal({ type: 'Report' })} theme={theme} />;
      case 'Messages':
        return <Messages theme={theme} />;
      case 'Settings':
        return <SettingsPage theme={theme} />;
      case 'Help & Support':
        return <HelpSupport theme={theme} />;
      case 'Theme':
        return <ThemeSettings theme={theme} setTheme={setTheme} />;
      case 'Logout':
        return <Logout theme={theme} />;
      case 'Upgrade':
        return <Upgrade theme={theme} />;
      default:
        return (
          <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
              <LayoutDashboard size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{activeTab} Page</h3>
            <p className="text-slate-500">This section is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen md:p-6 transition-colors duration-300 ${theme.mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-[#F0F2F5] text-slate-900'}`} style={{ fontFamily: theme.fontFamily }}>
      <div className={`max-w-[1440px] mx-auto overflow-hidden flex h-screen md:h-[calc(100vh-48px)] relative transition-all duration-300 ${
        theme.mode === 'dark' ? 'bg-slate-900 shadow-slate-950/50' : 'bg-white shadow-slate-200/50'
      }`} style={{ borderRadius: theme.borderRadius }}>
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* --- Sidebar --- */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 w-64 border-r flex flex-col p-6 z-50 transition-all duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}
          ${theme.sidebarStyle === 'glass' ? 'backdrop-blur-xl bg-opacity-80' : ''}
          ${theme.sidebarStyle === 'gradient' ? (theme.mode === 'dark' ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-white to-slate-50') : ''}
        `}>
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: theme.primaryColor }}>
                <GraduationCap className="text-white" size={20} />
              </div>
              <h1 className={`text-xl font-bold tracking-tight ${theme.mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>EduPulse</h1>
            </div>
            <button className="md:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-8 overflow-y-auto pr-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Menu</p>
              <div className="space-y-1">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => { setActiveTab('Dashboard'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={CheckSquare} label="Tasks" active={activeTab === 'Tasks'} onClick={() => { setActiveTab('Tasks'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={FolderKanban} label="Projects" active={activeTab === 'Projects'} onClick={() => { setActiveTab('Projects'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'Analytics'} onClick={() => { setActiveTab('Analytics'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={CalendarIcon} label="Calendar" active={activeTab === 'Calendar'} onClick={() => { setActiveTab('Calendar'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={Users} label="Team Members" active={activeTab === 'Team Members'} onClick={() => { setActiveTab('Team Members'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={FileText} label="Reports" active={activeTab === 'Reports'} onClick={() => { setActiveTab('Reports'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={MessageSquare} label="Messages" badge="5" active={activeTab === 'Messages'} onClick={() => { setActiveTab('Messages'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">General</p>
              <div className="space-y-1">
                <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => { setActiveTab('Settings'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={HelpCircle} label="Help & Support" active={activeTab === 'Help & Support'} onClick={() => { setActiveTab('Help & Support'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={PaletteIcon} label="Theme" active={activeTab === 'Theme'} onClick={() => { setActiveTab('Theme'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
                <SidebarItem icon={LogOut} label="Logout" active={activeTab === 'Logout'} onClick={() => { setActiveTab('Logout'); setIsSidebarOpen(false); }} primaryColor={theme.primaryColor} />
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6">
            <div className={`rounded-3xl p-5 relative overflow-hidden ${theme.mode === 'dark' ? 'bg-slate-800' : 'bg-blue-50'}`}>
              <div className="relative z-10">
                <h4 className={`font-bold text-sm mb-1 ${theme.mode === 'dark' ? 'text-white' : 'text-slate-800'}`}>Upgrade to Pro</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
                  Unlock advanced analytics and manage unlimited properties
                </p>
                <button 
                  onClick={() => { setActiveTab('Upgrade'); setIsSidebarOpen(false); }}
                  className="w-full text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-lg"
                  style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
                >
                  Upgrade Now
                </button>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl ${theme.mode === 'dark' ? 'bg-slate-700/50' : 'bg-blue-100/50'}`}></div>
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* Header */}
          <header className={`px-4 md:px-8 py-4 md:py-6 border-b flex items-center justify-between transition-colors duration-300 ${
            theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className={`md:hidden p-2 rounded-xl transition-colors ${
                theme.mode === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50'
              }`} onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <div className="flex flex-col">
                <h2 className={`text-base md:text-xl font-bold truncate max-w-[120px] sm:max-w-none ${
                  theme.mode === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {pageInfo[activeTab]?.title || activeTab}
                </h2>
                <p className="hidden sm:block text-[9px] md:text-xs text-slate-400 mt-0.5 truncate max-w-[150px] sm:max-w-none">
                  {pageInfo[activeTab]?.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search here..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`border-none rounded-xl py-2.5 pl-10 pr-4 text-sm w-64 transition-all outline-none focus:ring-2 ${
                    theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                  }`}
                />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2.5 rounded-xl transition-colors ${
                    showNotifications 
                      ? (theme.mode === 'dark' ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600') 
                      : (theme.mode === 'dark' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100')
                  }`}
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-20 sm:top-full mt-2 sm:w-80 rounded-2xl shadow-2xl border p-4 z-50 origin-top sm:origin-top-right ${
                        theme.mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-sm font-bold ${theme.mode === 'dark' ? 'text-white' : 'text-slate-800'}`}>Notifications</h4>
                        <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.primaryColor }}>2 New</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: 'New event added', desc: 'Sprint planning starts in 1h', icon: Plus, color: 'blue' },
                          { title: 'Assignment Due', desc: 'Math Homework due tomorrow', icon: CheckSquare, color: 'purple' },
                        ].map((n, i) => (
                          <div key={i} className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                            theme.mode === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                          }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              n.color === 'blue' ? (theme.mode === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') : (theme.mode === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600')
                            }`}>
                              <n.icon size={14} />
                            </div>
                            <div>
                              <p className={`text-[11px] font-bold ${theme.mode === 'dark' ? 'text-white' : 'text-slate-800'}`}>{n.title}</p>
                              <p className="text-[10px] text-slate-400">{n.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">View All Notifications</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`relative flex items-center gap-3 pl-4 border-l ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 group"
                >
                  <div className="text-right hidden sm:block">
                    <p className={`text-sm font-bold transition-colors ${theme.mode === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>Be Confidency</p>
                    <p className="text-[10px] text-slate-400">helloconfidenc@gmail.com</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                    Be
                  </div>
                  <ChevronRight className={`text-slate-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-[-90deg]' : 'rotate-90'}`} size={16} />
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl border p-2 z-50 origin-top-right ${
                        theme.mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                      }`}
                    >
                      <button className={`w-full text-left px-4 py-2 text-sm rounded-xl transition-colors ${theme.mode === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50'}`}>My Profile</button>
                      <button className={`w-full text-left px-4 py-2 text-sm rounded-xl transition-colors ${theme.mode === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50'}`}>Account Settings</button>
                      <div className={`h-px my-1 ${theme.mode === 'dark' ? 'bg-slate-700' : 'bg-slate-50'}`}></div>
                      <button className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">Sign Out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Create Modal */}
        <AnimatePresence>
          {showCreateModal.type && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCreateModal({ type: null })}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`relative w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden ${
                  theme.mode === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white'
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${theme.mode === 'dark' ? 'text-white' : 'text-slate-800'}`}>Create New {showCreateModal.type}</h3>
                    <button onClick={() => setShowCreateModal({ type: null })} className={`p-2 rounded-xl transition-colors ${
                      theme.mode === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'
                    }`}>
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData.entries());
                    handleCreate(data);
                  }} className="space-y-4">
                    {showCreateModal.type === 'Task' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Task Name</label>
                          <input name="name" required placeholder="e.g. Finish Math Homework" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Subject</label>
                          <input name="subject" required placeholder="e.g. Mathematics" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Due Date</label>
                          <input name="due" required placeholder="e.g. Tomorrow" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                      </>
                    )}
                    {showCreateModal.type === 'Project' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Project Name</label>
                          <input name="name" required placeholder="e.g. Science Fair" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Topic</label>
                          <input name="topic" required placeholder="e.g. Renewable Energy" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                      </>
                    )}
                    {showCreateModal.type === 'Member' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                          <input name="name" required placeholder="e.g. Jane Smith" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Role</label>
                          <input name="role" required placeholder="e.g. Student Assistant" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                      </>
                    )}
                    {showCreateModal.type === 'Report' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Report Title</label>
                          <input name="title" required placeholder="e.g. Monthly Progress" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Description</label>
                          <textarea name="desc" required placeholder="Brief description..." className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 h-24 resize-none ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                      </>
                    )}
                    {showCreateModal.type === 'Event' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Event Name</label>
                          <input name="name" required placeholder="e.g. Workshop" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Time</label>
                          <input name="time" required placeholder="e.g. 10:00 AM" className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                            theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                          }`} />
                        </div>
                      </>
                    )}
                    <button type="submit" className="w-full text-white font-bold py-4 rounded-2xl transition-all shadow-lg mt-4"
                            style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}>
                      Create {showCreateModal.type}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
