import React from 'react';
import { Bot, Cpu, Layers, Wifi, WifiOff } from 'lucide-react';
import type { ProfileInfo } from '../types';

interface HeaderProps {
  profiles: ProfileInfo[];
  selectedProfile: string;
  onSelectProfile: (profileKey: string) => void;
  isOnline: boolean;
  isLoadingProfiles: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profiles,
  selectedProfile,
  onSelectProfile,
  isOnline,
  isLoadingProfiles,
}) => {
  const currentProfile = profiles.find((p) => p.key === selectedProfile);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-100 tracking-tight">GenAI Toolkit</h1>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              AUIP / AG-UI
            </span>
          </div>
          <p className="text-xs text-slate-400">Agent-User Interaction Protocol Web Client</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Profile Selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 focus-within:border-indigo-500 transition-colors">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-slate-400 font-medium">Profile:</span>
          {isLoadingProfiles ? (
            <span className="text-xs text-slate-500 animate-pulse">Loading profiles...</span>
          ) : (
            <select
              value={selectedProfile}
              onChange={(e) => onSelectProfile(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer font-medium pr-2"
            >
              {profiles.map((p) => (
                <option key={p.key} value={p.key} className="bg-slate-900 text-slate-200">
                  {p.name} ({p.kind || p.harness})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Selected Profile Badge */}
        {currentProfile && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-mono">{currentProfile.harness}</span>
          </div>
        )}

        {/* Server Status Indicator */}
        <div
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border ${
            isOnline
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}
          title={isOnline ? 'Server connected on localhost:8000' : 'Cannot reach localhost:8000'}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Server Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Server Offline</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
