import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handlePointerMove = (e) => {
      requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
        glow.style.opacity = '1';
      });
    };

    const handlePointerLeave = () => {
      glow.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 ease-out hidden sm:block"
      style={{
        willChange: 'transform',
        transform: 'translate3d(-400px, -400px, 0)',
      }}
    />
  );
};

export default CursorGlow;
