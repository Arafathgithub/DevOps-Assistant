
import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20.5v-2.5m0-12V3.5m-8.25 12.5L5.6 17m12.8 1.1-1.85-1.1M5.6 7l-1.85-1.1M18.4 7l1.85-1.1M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M12 17.5c-2.834 0-5.32-1.953-5.967-4.625m11.934 0C17.32 15.547 14.834 17.5 12 17.5Z" />
    <path d="M12 6.5C14.834 6.5 17.32 8.453 17.967 11.125m-11.934 0C6.68 8.453 9.166 6.5 12 6.5Z" />
    <path d="m9.5 12.5 2-1-2-1" strokeWidth="2" />
  </svg>
);
