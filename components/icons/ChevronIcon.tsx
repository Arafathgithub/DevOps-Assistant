import React from 'react';

export const ChevronIcon: React.FC<{ isOpen: boolean; className?: string }> = ({ isOpen, className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 text-slate-400`}
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);