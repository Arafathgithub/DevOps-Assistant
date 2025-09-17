
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-3 bg-slate-800 border-b border-slate-700 flex-shrink-0">
      <div className="flex items-center gap-3">
        <LogoIcon className="w-8 h-8 text-sky-400" />
        <div>
          <h1 className="text-xl font-bold text-white">DevOps Assistant</h1>
          <p className="text-sm text-slate-400">Your copilot for Infrastructure as Code</p>
        </div>
      </div>
    </header>
  );
};
