
import React from 'react';

export const LoadingSpinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
    className={`animate-spin ${props.className || ''}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v3m0 12v3m9-9h-3m-12 0H3m16.65-4.95l-2.12 2.12M7.47 7.47l-2.12 2.12m14.14 0l-2.12-2.12M7.47 16.53l-2.12-2.12"
    />
  </svg>
);
