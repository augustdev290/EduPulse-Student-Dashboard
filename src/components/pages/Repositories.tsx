import React, { useState, useEffect } from 'react';
import { Github, Plus, ExternalLink, Lock, Globe, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  private: boolean;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface RepositoriesProps {
  theme: any;
}

const Repositories: React.FC<RepositoriesProps> = ({ theme }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const cardClass = `transition-all duration-300 ${
    theme.mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
  } ${
    theme.cardStyle === 'bordered' ? 'border' : 
    theme.cardStyle === 'shadowed' ? 'shadow-xl' : 'border-none'
  }`;

  const textMain = theme.mode === 'dark' ? 'text-white' : 'text-slate-800';
  const textMuted = theme.mode === 'dark' ? 'text-slate-400' : 'text-slate-500';

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/github/status');
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated) {
        fetchRepos();
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/github/repos');
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const data = await res.json();
      setRepos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const res = await fetch('/api/auth/github/url');
      const { url } = await res.json();
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        url,
        'github_oauth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (err) {
      alert('Failed to initiate GitHub connection');
    }
  };

  const handleCreateRepo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      private: formData.get('visibility') === 'private'
    };

    try {
      const res = await fetch('/api/github/repos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to create repository');
      }
      setShowCreateModal(false);
      fetchRepos();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setRepos([]);
  };

  useEffect(() => {
    checkAuthStatus();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data?.provider === 'github') {
        setIsAuthenticated(true);
        fetchRepos();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (loading && !repos.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <div className={`p-12 ${cardClass}`} style={{ borderRadius: theme.borderRadius }}>
          <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Github size={40} />
          </div>
          <h2 className={`text-2xl font-bold ${textMain} mb-4`}>Connect to GitHub</h2>
          <p className={`${textMuted} mb-8`}>
            Securely connect your GitHub account to manage your repositories directly from EduPulse.
          </p>
          <button 
            onClick={handleConnect}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg mx-auto"
          >
            <Github size={20} />
            Connect GitHub Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${textMain}`}>GitHub Repositories</h2>
          <p className={textMuted}>Manage and create your project repositories.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchRepos}
            className={`p-2.5 rounded-xl transition-colors ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-white rounded-xl font-bold transition-all shadow-lg"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Plus size={18} />
            New Repository
          </button>
          <button 
            onClick={handleLogout}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${theme.mode === 'dark' ? 'text-rose-400 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50'}`}
          >
            Disconnect
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardClass} p-6 flex flex-col h-full`}
            style={{ borderRadius: theme.borderRadius }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${theme.mode === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <Github size={20} className={textMain} />
              </div>
              <div className="flex items-center gap-2">
                {repo.private ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    <Lock size={10} /> Private
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Globe size={10} /> Public
                  </span>
                )}
              </div>
            </div>

            <h3 className={`text-lg font-bold ${textMain} mb-2 truncate`}>{repo.name}</h3>
            <p className={`${textMuted} text-sm mb-6 line-clamp-2 flex-1`}>
              {repo.description || 'No description provided.'}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                    {repo.language}
                  </span>
                )}
              </div>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                className={`p-2 rounded-lg transition-colors ${theme.mode === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500'}`}
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Repo Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
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
                <h3 className={`text-xl font-bold ${textMain} mb-6`}>Create New Repository</h3>
                <form onSubmit={handleCreateRepo} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Repository Name</label>
                    <input 
                      name="name" 
                      required 
                      placeholder="e.g. my-awesome-project" 
                      className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 ${
                        theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                      }`} 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Description (Optional)</label>
                    <textarea 
                      name="description" 
                      placeholder="What is this project about?" 
                      className={`w-full border-none rounded-xl p-3 text-sm outline-none focus:ring-2 h-24 resize-none ${
                        theme.mode === 'dark' ? 'bg-slate-800 text-white focus:ring-slate-700' : 'bg-slate-50 text-slate-900 focus:ring-blue-100'
                      }`} 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Visibility</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                        <input type="radio" name="visibility" value="public" defaultChecked className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all"></div>
                        <span className={`text-sm font-medium ${textMain}`}>Public</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${theme.mode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                        <input type="radio" name="visibility" value="private" className="hidden peer" />
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all"></div>
                        <span className={`text-sm font-medium ${textMain}`}>Private</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button 
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className={`flex-1 py-4 rounded-2xl font-bold transition-all ${theme.mode === 'dark' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isCreating}
                      className="flex-1 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                      style={{ backgroundColor: theme.primaryColor, boxShadow: `0 10px 15px -3px ${theme.primaryColor}33` }}
                    >
                      {isCreating ? <Loader2 className="animate-spin" size={18} /> : 'Create Repo'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Repositories;
