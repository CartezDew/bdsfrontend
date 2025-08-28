import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroImageShowcase({ base, grid = [], onImagesReady }) {
  const [currentState, setCurrentState] = useState('base'); // 'base' or 'grid'
  const [firstGridReady, setFirstGridReady] = useState(false);
  const [baseLoaded, setBaseLoaded] = useState(false);
  const reduced = useRef(false);
  const intervalRef = useRef(null);
  const calledReadyRef = useRef(false);
  const startWithGridRef = useRef(Math.random() < 0.5);

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

  // Main animation sequence with randomized initial state
  useEffect(() => {
    if (reduced.current) return;
    if (!base || !Array.isArray(grid) || grid.length < 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startWithGrid = startWithGridRef.current;

    if (startWithGrid) {
      // Try to start in grid; if not ready yet, show base then flip to grid when ready (short cap)
      const startedAt = Date.now();
      if (firstGridReady) {
        setCurrentState('grid');
      } else {
        setCurrentState('base');
        const poll = setInterval(() => {
          if (firstGridReady || Date.now() - startedAt > 600) {
            clearInterval(poll);
            setCurrentState('grid');
          }
        }, 80);
      }

      // First switch after ~5s: grid -> base
      const firstTimer = setTimeout(() => {
        setCurrentState('base');
      }, 5000);

      const regularTimer = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentState(prev => (prev === 'base' ? 'grid' : 'base'));
        }, 21000);
      }, 18000);

      return () => {
        clearTimeout(firstTimer);
        clearTimeout(regularTimer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      // Start with base -> switch to grid after ~5s (briefly wait for grid readiness)
      setCurrentState('base');
      const startedAt = Date.now();
      const firstTimer = setTimeout(() => {
        if (firstGridReady) {
          setCurrentState('grid');
        } else {
          const poll = setInterval(() => {
            if (firstGridReady || Date.now() - startedAt > 800) {
              clearInterval(poll);
              setCurrentState('grid');
            }
          }, 80);
        }
      }, 5000);

      const regularTimer = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentState(prev => (prev === 'base' ? 'grid' : 'base'));
        }, 21000);
      }, 18000);

      return () => {
        clearTimeout(firstTimer);
        clearTimeout(regularTimer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
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
      {/* AnimatePresence: initial={false} avoids initial flicker; mode="wait" sequences exits/enters */}
      <AnimatePresence initial={false} mode="wait">
        {currentState === 'base' ? (
          <motion.img
            key="base"
            src={base}
            alt="Hero image"
            className="hero-base-image"
            style={{ transform: 'scaleX(-1)', willChange: 'opacity, transform' }}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onLoad={() => setBaseLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            key="grid"
            className="hero-grid-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ willChange: 'opacity, transform' }}
          >
            <motion.div
              className="hero-grid-item hero-grid-item-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeIn", delay: 1.6 }}
              style={{ zIndex: 2 }}
            >
              <img src={grid[0]} alt="Service example 1" className="hero-grid-image" loading="eager" decoding="async" fetchpriority="high" />
            </motion.div>
            
            <motion.div
              className="hero-grid-item hero-grid-item-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeIn", delay: 0.0 }}
              style={{ zIndex: 1 }}
            >
              <img src={grid[1]} alt="Service example 2" className="hero-grid-image" loading="auto" decoding="async" />
            </motion.div>
            
            <motion.div
              className="hero-grid-item hero-grid-item-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeIn", delay: 0.8 }}
              style={{ zIndex: 1 }}
            >
              <img src={grid[2]} alt="Service example 3" className="hero-grid-image" loading="auto" decoding="async" />
            </motion.div>
            
            <motion.div
              className="hero-grid-item hero-grid-item-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeIn", delay: 2.4 }}
              style={{ zIndex: 2 }}
            >
              <img src={grid[3]} alt="Service example 4" className="hero-grid-image" loading="auto" decoding="async" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
