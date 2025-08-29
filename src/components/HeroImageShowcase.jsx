import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroImageShowcase({ base, grid = [], onImagesReady }) {
  const [currentState, setCurrentState] = useState('base'); // 'base' or 'grid'
  const [firstGridReady, setFirstGridReady] = useState(false);
  const [baseLoaded, setBaseLoaded] = useState(false);
  const reduced = useRef(false);
  const animationTimerRef = useRef(null);
  const calledReadyRef = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mediaQuery.matches;
    
    const handleChange = (e) => {
      reduced.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Preload only the first grid image at high priority to ensure instant paint
  useEffect(() => {
    let cancelled = false;
    const first = grid && grid[0];
    if (!first) { setFirstGridReady(false); return () => {}; }
    const img = new Image();
    try { img.fetchPriority = 'high'; } catch {}
    img.src = first;
    const finish = () => { if (!cancelled) setFirstGridReady(true); };
    if (img.decode) { img.decode().then(finish).catch(finish); }
    else { img.onload = finish; img.onerror = finish; }
    return () => { cancelled = true; };
  }, [grid]);

  // After first grid is ready, prefetch remaining grid images in the background (sequentially)
  useEffect(() => {
    if (!firstGridReady || !Array.isArray(grid)) return;
    const rest = grid.slice(1, 4).filter(Boolean);
    let cancelled = false;
    (async () => {
      for (const src of rest) {
        if (cancelled) break;
        await new Promise((resolve) => {
          const img = new Image();
          try { img.fetchPriority = 'low'; } catch {}
          img.src = src;
          const done = () => resolve();
          if (img.decode) { img.decode().then(done).catch(done); }
          else { img.onload = done; img.onerror = done; }
        });
      }
    })();
    return () => { cancelled = true; };
  }, [firstGridReady, grid]);

  // Notify parent once when visible content is ready (either base or grid)
  useEffect(() => {
    if (calledReadyRef.current) return;
    if (reduced.current) {
      if (baseLoaded) {
        calledReadyRef.current = true;
        if (typeof onImagesReady === 'function') onImagesReady();
      }
      return;
    }
    const visibleReady = baseLoaded || firstGridReady;
    if (visibleReady) {
      calledReadyRef.current = true;
      if (typeof onImagesReady === 'function') onImagesReady();
    }
  }, [baseLoaded, firstGridReady, onImagesReady]);

  // Clean, simple animation sequence
  useEffect(() => {
    if (reduced.current) return;
    if (!base || !Array.isArray(grid) || grid.length < 1) return;

    // Clear any existing timers
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    
    // Start with base image
    setCurrentState('base');
    
    // After 3 seconds, switch to grid
    const initialTimer = setTimeout(() => {
      setCurrentState('grid');
      
      // After grid animation + 6s hold, switch back to base
      const gridTotalTime = 14000; // 3.0s delay + 3.2s fade + 6s hold
      const gridTimer = setTimeout(() => {
        setCurrentState('base');
        
        // After 10 seconds, start the regular cycle
        const baseTimer = setTimeout(() => {
          startRegularCycle();
        }, 10000);
      }, gridTotalTime);
    }, 3000);

    // Function to start the regular repeating cycle
    const startRegularCycle = () => {
      setCurrentState('grid');
      
      const gridCycleTimer = setTimeout(() => {
        setCurrentState('base');
        
        const baseCycleTimer = setTimeout(() => {
          startRegularCycle();
        }, 15000);
      }, 14000); // Same grid timing
    };

    return () => {
      clearTimeout(initialTimer);
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [base, grid, firstGridReady]);

  // If reduced motion, just show base image
  if (reduced.current) {
    return (
      <div className="hero-image-wrapper">
        <img 
          src={base} 
          alt="Hero image" 
          className="hero-base-image"
          onLoad={() => setBaseLoaded(true)}
        />
      </div>
    );
  }

  return (
    <div className="hero-image-wrapper">
      {/* Always-mounted layers to prevent glitching - use opacity instead of mounting/unmounting */}
      <motion.img
        key="base-layer"
        src={base}
        alt="Hero image"
        className="hero-base-image"
        style={{ transform: 'scaleX(-1)', position: 'absolute', inset: 0, willChange: 'opacity' }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setBaseLoaded(true)}
        initial={{ opacity: 1 }}
        animate={{ opacity: currentState === 'base' ? 1 : 0 }}
        transition={{ duration: 3.5, ease: [0.4, 0.0, 0.2, 1] }}
      />

      <motion.div
        key="grid-layer"
        className="hero-grid-overlay"
        style={{ position: 'absolute', inset: 0, willChange: 'opacity' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: currentState === 'grid' ? 1 : 0 }}
        transition={{ duration: 3.5, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <motion.div
          className="hero-grid-item hero-grid-item-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentState === 'grid' ? 1 : 0 }}
          transition={{ duration: 3.2, ease: "easeInOut", delay: 0.0 }}
          style={{ zIndex: 2 }}
        >
          <img src={grid[0]} alt="Service example 1" className="hero-grid-image" loading="eager" decoding="async" fetchPriority="high" />
        </motion.div>
        
        <motion.div
          className="hero-grid-item hero-grid-item-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentState === 'grid' ? 1 : 0 }}
          transition={{ duration: 3.2, ease: "easeInOut", delay: 2.0 }}
          style={{ zIndex: 1 }}
        >
          <img src={grid[1]} alt="Service example 2" className="hero-grid-image" loading="auto" decoding="async" />
        </motion.div>
        
        <motion.div
          className="hero-grid-item hero-grid-item-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentState === 'grid' ? 1 : 0 }}
          transition={{ duration: 3.2, ease: "easeInOut", delay: 3.0 }}
          style={{ zIndex: 1 }}
        >
          <img src={grid[2]} alt="Service example 3" className="hero-grid-image" loading="auto" decoding="async" />
        </motion.div>
        
        <motion.div
          className="hero-grid-item hero-grid-item-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentState === 'grid' ? 1 : 0 }}
          transition={{ duration: 3.2, ease: "easeInOut", delay: 1.0 }}
          style={{ zIndex: 1 }}
        >
          <img src={grid[3]} alt="Service example 4" className="hero-grid-image" loading="auto" decoding="async" />
        </motion.div>
      </motion.div>
    </div>
  );
}
