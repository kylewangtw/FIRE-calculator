import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TOOLTIP_WIDTH = 288; // w-72
const MARGIN = 8;

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  const calcStyle = useCallback(() => {
    if (!wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Horizontal center of trigger, clamped to viewport
    const rawLeft = r.left + r.width / 2;
    const left = Math.max(
      TOOLTIP_WIDTH / 2 + MARGIN,
      Math.min(rawLeft, vw - TOOLTIP_WIDTH / 2 - MARGIN)
    );

    let s: React.CSSProperties = {
      position: 'fixed',
      left,
      transform: 'translateX(-50%)',
      zIndex: 9999,
      width: TOOLTIP_WIDTH,
    };

    if (position === 'top') {
      s.bottom = vh - r.top + MARGIN;
    } else if (position === 'bottom') {
      s.top = r.bottom + MARGIN;
    } else if (position === 'left') {
      s.top = r.top + r.height / 2;
      s.left = r.left - MARGIN;
      s.transform = 'translate(-100%, -50%)';
    } else {
      s.top = r.top + r.height / 2;
      s.left = r.right + MARGIN;
      s.transform = 'translateY(-50%)';
    }

    setStyle(s);
  }, [position]);

  useEffect(() => {
    if (isVisible) calcStyle();
  }, [isVisible, calcStyle]);

  const show = () => { calcStyle(); setIsVisible(true); };
  const hide = () => setIsVisible(false);

  const portal = isVisible
    ? ReactDOM.createPortal(
        <div style={style} className="px-4 py-3 text-sm text-white bg-gray-900 rounded-lg shadow-xl leading-relaxed pointer-events-none">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>,
        document.body
      )
    : null;

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onTouchStart={(e) => { e.preventDefault(); isVisible ? hide() : show(); }}
    >
      {children}
      {portal}
    </div>
  );
};

export default Tooltip;
