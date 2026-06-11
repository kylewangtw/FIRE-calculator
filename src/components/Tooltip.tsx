import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [xOffset, setXOffset] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && (position === 'top' || position === 'bottom')) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const margin = 8;
      if (rect.left < margin) {
        setXOffset(margin - rect.left);
      } else if (rect.right > window.innerWidth - margin) {
        setXOffset(window.innerWidth - margin - rect.right);
      } else {
        setXOffset(0);
      }
    }
  }, [isVisible, position]);

  const basePositionClass = {
    top: 'bottom-full left-1/2 mb-2',
    bottom: 'top-full left-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }[position];

  const tooltipStyle =
    position === 'top' || position === 'bottom'
      ? { transform: `translateX(calc(-50% + ${xOffset}px))` }
      : undefined;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => { setXOffset(0); setIsVisible(true); }}
      onMouseLeave={() => setIsVisible(false)}
      onTouchStart={() => { setXOffset(0); setIsVisible((v) => !v); }}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyle}
          className={`absolute z-50 px-4 py-3 text-sm text-white bg-gray-900 rounded-lg shadow-lg w-72 sm:w-80 leading-relaxed ${basePositionClass}`}
        >
          <div className="whitespace-pre-wrap">{content}</div>
          <div
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
              position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
              'right-full top-1/2 -translate-y-1/2 -mr-1'
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip; 