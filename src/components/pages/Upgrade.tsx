import React, { useState } from 'react';
import { Check, Zap, HelpCircle, Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface UpgradeProps {
  theme: any;
}

const Upgrade: React.FC<UpgradeProps> = ({ theme }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'semester'>('semester');

  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  const features = [
    { name: 'Course Enrollment', free: true, pro: true },
    { name: 'Assignment Tracking', free: 'Basic', pro: 'Unlimited' },
    { name: 'Cloud Storage', free: '5GB', pro: '100GB' },
    { name: 'AI Study Assistant', free: false, pro: true },
    { name: 'Priority Support', free: false, pro: true },
    { name: 'Offline Access', free: false, pro: true },
    { name: 'Advanced Analytics', free: false, pro: true },
    { name: 'Custom Themes', free: 'Limited', pro: 'Full Access' },
  ];

  const faqs = [
    { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time from your account settings.' },
    { q: 'Is there a student discount?', a: 'Our pricing is already optimized for students, but we offer group discounts for clubs.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay.' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-6"
        >
          <Star size={14} className="fill-blue-500" />
          <span>JOIN 10,000+ HIGH-ACHIEVING STUDENTS</span>
        </motion.div>
        <h2 className={`text-4xl md:text-5xl font-black ${textMain} mb-6 tracking-tight`}>
          Master Your Studies with <span style={{ color: theme.primaryColor }}>EduPulse Pro</span>
        </h2>
        <p className={`${textMuted} text-lg max-w-2xl mx-auto mb-10`}>
          Unlock the full potential of your academic journey with advanced AI tools, unlimited storage, and priority support.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? textMain : textMuted}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'semester' : 'monthly')}
            className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 relative p-1 transition-colors"
          >
            <motion.div 
              animate={{ x: billingCycle === 'semester' ? 24 : 0 }}
              className="w-4 h-4 rounded-full bg-white shadow-sm"
              style={{ backgroundColor: billingCycle === 'semester' ? theme.primaryColor : '#fff' }}
            />
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'semester' ? textMain : textMuted}`}>
            Semester <span className="text-emerald-500 text-xs font-bold ml-1">SAVE 20%</span>
          </span>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Free Plan */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${cardClass} p-10 flex flex-col`} 
          style={{ borderRadius: theme.borderRadius }}
        >
          <div className="mb-8">
            <h3 className={`text-2xl font-bold ${textMain} mb-2`}>Basic Student</h3>
            <p className={`${textMuted} text-sm`}>Perfect for getting started with your studies.</p>
          </div>
          <div className="mb-8">
            <span className={`text-5xl font-black ${textMain}`}>$0</span>
            <span className="text-slate-400 ml-2">/forever</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            {['Course enrollment', 'Basic assignment tracking', '5GB Cloud storage', 'Email support'].map((feature, i) => (
              <li key={i} className={`flex items-center gap-3 text-sm ${theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className={`w-6 h-6 rounded-full ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400'} flex items-center justify-center flex-shrink-0`}>
                  <Check size={14} />
                </div>
                {feature}
              </li>
            ))}
          </ul>
          <button className={`w-full py-4 rounded-2xl border font-bold transition-all ${
            theme.mode === 'dark' ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}>
            Current Plan
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${cardClass} p-10 flex flex-col relative overflow-hidden border-2`} 
          style={{ 
            borderRadius: theme.borderRadius, 
            borderColor: theme.primaryColor, 
            boxShadow: theme.cardStyle === 'shadowed' ? `0 20px 40px -10px ${theme.primaryColor}33` : 'none' 
          }}
        >
          <div className="absolute top-0 right-0 text-white text-[10px] font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-widest"
               style={{ backgroundColor: theme.primaryColor }}>
            Most Popular
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={24} style={{ color: theme.primaryColor, fill: theme.primaryColor }} />
              <h3 className={`text-2xl font-bold ${textMain}`}>Premium Student</h3>
            </div>
            <p className={`${textMuted} text-sm`}>The ultimate toolkit for academic excellence.</p>
          </div>
          <div className="mb-8">
            <span className={`text-5xl font-black ${textMain}`}>
              ${billingCycle === 'monthly' ? '4.99' : '19'}
            </span>
            <span className="text-slate-400 ml-2">/{billingCycle === 'monthly' ? 'month' : 'semester'}</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            {['AI Study Assistant', 'Unlimited assignment history', '100GB Cloud storage', 'Priority tutor support', 'Offline access', 'Advanced Analytics'].map((feature, i) => (
              <li key={i} className={`flex items-center gap-3 text-sm ${theme.mode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: `${theme.primaryColor}1A`, color: theme.primaryColor }}>
                  <Check size={14} />
                </div>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-2xl text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 group"
                  style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 20px -5px ${theme.primaryColor}4D` }}>
            Upgrade Now
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Feature Comparison */}
      <div className="mb-24">
        <h3 className={`text-2xl font-bold ${textMain} mb-8 text-center`}>Detailed Comparison</h3>
        <div className={`${cardClass} overflow-hidden`} style={{ borderRadius: theme.borderRadius }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={theme.mode === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'}>
                <th className={`p-6 text-sm font-bold ${textMain}`}>Feature</th>
                <th className={`p-6 text-sm font-bold ${textMain} text-center`}>Basic</th>
                <th className={`p-6 text-sm font-bold ${textMain} text-center`}>Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {features.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className={`p-6 text-sm ${textMain}`}>{f.name}</td>
                  <td className={`p-6 text-sm text-center ${textMuted}`}>
                    {typeof f.free === 'boolean' ? (f.free ? <Check size={16} className="mx-auto text-emerald-500" /> : '—') : f.free}
                  </td>
                  <td className={`p-6 text-sm text-center font-bold`} style={{ color: theme.primaryColor }}>
                    {typeof f.pro === 'boolean' ? (f.pro ? <Check size={16} className="mx-auto" /> : '—') : f.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: ShieldCheck, title: 'Secure Payments', desc: '256-bit SSL encrypted payments.' },
          { icon: Clock, title: 'Instant Access', desc: 'Get pro features immediately after upgrade.' },
          { icon: HelpCircle, title: '24/7 Support', desc: 'Our team is here to help you anytime.' },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className={`w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
              <item.icon size={24} />
            </div>
            <h4 className={`font-bold ${textMain} mb-2`}>{item.title}</h4>
            <p className={`${textMuted} text-sm`}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h3 className={`text-2xl font-bold ${textMain} mb-8 text-center`}>Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`${cardClass} p-6`} style={{ borderRadius: theme.borderRadius }}>
              <h4 className={`font-bold ${textMain} mb-2`}>{faq.q}</h4>
              <p className={`${textMuted} text-sm`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
