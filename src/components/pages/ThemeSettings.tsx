import React from 'react';
import { motion } from 'motion/react';
import { Palette, Type, Sun, Moon, Check, Layout, Square, Layers, GraduationCap } from 'lucide-react';

interface ThemeSettingsProps {
  theme: {
    primaryColor: string;
    fontFamily: string;
    mode: 'light' | 'dark';
  };
  setTheme: (theme: any) => void;
}

const colors = [
  { name: 'Blue', value: '#2563eb', class: 'bg-blue-600' },
  { name: 'Emerald', value: '#10b981', class: 'bg-emerald-600' },
  { name: 'Violet', value: '#7c3aed', class: 'bg-violet-600' },
  { name: 'Rose', value: '#e11d48', class: 'bg-rose-600' },
  { name: 'Amber', value: '#d97706', class: 'bg-amber-600' },
  { name: 'Indigo', value: '#4f46e5', class: 'bg-indigo-600' },
  { name: 'Cyan', value: '#0891b2', class: 'bg-cyan-600' },
  { name: 'Pink', value: '#db2777', class: 'bg-pink-600' },
];

const fonts = [
  { name: 'Sans', value: 'Inter, ui-sans-serif, system-ui, sans-serif' },
  { name: 'Serif', value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' },
  { name: 'Mono', value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
  { name: 'Display', value: '"Space Grotesk", sans-serif' },
];

const radiusOptions = [
  { name: 'Sharp', value: '0px' },
  { name: 'Rounded', value: '12px' },
  { name: 'Extra', value: '24px' },
  { name: 'Super', value: '40px' },
];

const sidebarStyles = [
  { name: 'Solid', value: 'solid' },
  { name: 'Glass', value: 'glass' },
  { name: 'Gradient', value: 'gradient' },
];

const cardStyles = [
  { name: 'Flat', value: 'flat' },
  { name: 'Bordered', value: 'bordered' },
  { name: 'Shadowed', value: 'shadowed' },
];

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ theme, setTheme }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 shadow-sm transition-all duration-300 border ${
          theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
            theme.mode === 'dark' ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-600'
          }`} style={theme.mode === 'dark' ? {} : { color: theme.primaryColor, backgroundColor: `${theme.primaryColor}1A` }}>
            <Palette size={28} />
          </div>
          <div>
            <h3 className={`text-2xl font-black transition-colors ${theme.mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>Theme Customization</h3>
            <p className="text-slate-500">Fine-tune every detail of your workspace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Color Selection */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Primary Accent</h4>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setTheme({ ...theme, primaryColor: color.value })}
                    className={`aspect-square rounded-xl ${color.class} flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg relative group`}
                  >
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      {color.name}
                    </span>
                    {theme.primaryColor === color.value && (
                      <motion.div layoutId="activeColor" className="text-white">
                        <Check size={18} strokeWidth={3} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Mode Selection */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Appearance Mode</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'light', icon: Sun, label: 'Light' },
                  { id: 'dark', icon: Moon, label: 'Dark' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setTheme({ ...theme, mode: mode.id as any })}
                    className={`p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      theme.mode === mode.id 
                        ? 'bg-opacity-10' 
                        : theme.mode === 'dark' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-100 hover:border-slate-200'
                    }`}
                    style={theme.mode === mode.id ? { borderColor: theme.primaryColor, backgroundColor: `${theme.primaryColor}1A` } : {}}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${theme.mode === mode.id ? 'text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}
                         style={theme.mode === mode.id ? { backgroundColor: theme.primaryColor } : {}}>
                      <mode.icon size={22} />
                    </div>
                    <span className={`text-base font-bold transition-colors ${theme.mode === mode.id ? '' : 'text-slate-500'}`}
                          style={theme.mode === mode.id ? { color: theme.primaryColor } : {}}>{mode.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Border Radius */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Corner Rounding</h4>
              <div className="grid grid-cols-4 gap-3">
                {radiusOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setTheme({ ...theme, borderRadius: opt.value })}
                    className={`p-4 border-2 transition-all flex flex-col items-center gap-2 ${
                      theme.borderRadius === opt.value 
                        ? 'bg-opacity-10' 
                        : theme.mode === 'dark' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-100 hover:border-slate-200'
                    }`}
                    style={{ 
                      borderRadius: opt.value,
                      ...(theme.borderRadius === opt.value ? { borderColor: theme.primaryColor, backgroundColor: `${theme.primaryColor}1A` } : {})
                    }}
                  >
                    <span className={`text-xs font-bold ${theme.borderRadius === opt.value ? '' : 'text-slate-500'}`}
                          style={theme.borderRadius === opt.value ? { color: theme.primaryColor } : {}}>{opt.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Sidebar Style */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Sidebar Aesthetic</h4>
              <div className="grid grid-cols-3 gap-3">
                {sidebarStyles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setTheme({ ...theme, sidebarStyle: style.value as any })}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      theme.sidebarStyle === style.value 
                        ? 'bg-opacity-10' 
                        : theme.mode === 'dark' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-100 hover:border-slate-200'
                    }`}
                    style={theme.sidebarStyle === style.value ? { borderColor: theme.primaryColor, backgroundColor: `${theme.primaryColor}1A` } : {}}
                  >
                    <span className={`text-xs font-bold ${theme.sidebarStyle === style.value ? '' : 'text-slate-500'}`}
                          style={theme.sidebarStyle === style.value ? { color: theme.primaryColor } : {}}>{style.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Card Style */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Card Presentation</h4>
              <div className="grid grid-cols-3 gap-3">
                {cardStyles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setTheme({ ...theme, cardStyle: style.value as any })}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      theme.cardStyle === style.value 
                        ? 'bg-opacity-10' 
                        : theme.mode === 'dark' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-100 hover:border-slate-200'
                    }`}
                    style={theme.cardStyle === style.value ? { borderColor: theme.primaryColor, backgroundColor: `${theme.primaryColor}1A` } : {}}
                  >
                    <span className={`text-xs font-bold ${theme.cardStyle === style.value ? '' : 'text-slate-500'}`}
                          style={theme.cardStyle === style.value ? { color: theme.primaryColor } : {}}>{style.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Font Selection */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Typography System</h4>
              <div className="space-y-3">
                {fonts.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => setTheme({ ...theme, fontFamily: font.value })}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                      theme.fontFamily === font.value 
                        ? 'bg-opacity-10' 
                        : theme.mode === 'dark' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-100 hover:border-slate-200'
                    }`}
                    style={{ 
                      fontFamily: font.value,
                      ...(theme.fontFamily === font.value ? { borderColor: theme.primaryColor, backgroundColor: `${theme.primaryColor}1A` } : {})
                    }}
                  >
                    <div className="flex flex-col">
                      <span className={`text-lg font-bold transition-colors ${theme.fontFamily === font.value ? '' : theme.mode === 'dark' ? 'text-white' : 'text-slate-800'}`}
                            style={theme.fontFamily === font.value ? { color: theme.primaryColor } : {}}>
                        {font.name}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">System Default</span>
                    </div>
                    {theme.fontFamily === font.value && <Check size={20} style={{ color: theme.primaryColor }} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>

      {/* Preview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-10 shadow-xl transition-all duration-300 border ${
          theme.mode === 'dark' ? 'bg-slate-900 border-slate-800 shadow-slate-950/50' : 'bg-white border-slate-100 shadow-slate-200/50'
        }`}
        style={{ borderRadius: theme.borderRadius }}
      >
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 px-1">Live Interface Preview</h4>
        <div className={`p-10 border transition-all duration-300 ${
          theme.mode === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'
        }`} style={{ fontFamily: theme.fontFamily, borderRadius: `calc(${theme.borderRadius} / 1.5)` }}>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: theme.primaryColor }}>
              <GraduationCap size={28} />
            </div>
            <div>
              <h5 className={`text-xl font-black transition-colors ${theme.mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>EduPulse Dashboard</h5>
              <p className="text-slate-500">Experience your personalized academic hub.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-xl text-sm font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: theme.primaryColor }}>
              Primary Action
            </button>
            <button className={`px-8 py-3 rounded-xl text-sm font-black border transition-all hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme.mode === 'dark' ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-700 border-slate-200'
            }`}>
              Secondary
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeSettings;
