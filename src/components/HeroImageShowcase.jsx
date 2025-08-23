import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroImageShowcase({ base, grid = [] }) {
  const [currentState, setCurrentState] = useState('base'); // 'base' or 'grid'
  const reduced = useRef(false);
  const intervalRef = useRef(null);

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

  // Main animation sequence using setInterval instead of async loop
  useEffect(() => {
    if (reduced.current) {
      return;
    }

    if (!base || grid.length < 4) {
      return;
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start the animation sequence
    const startAnimation = () => {
      setCurrentState('base');
    };

    // First cycle: start immediately, then switch to grid after 3 seconds
    startAnimation();
    
    const firstTimer = setTimeout(() => {
      setCurrentState('grid');
    }, 6000);

    // Then set up the regular interval for subsequent cycles
    const regularTimer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentState(prevState => {
          const newState = prevState === 'base' ? 'grid' : 'base';
          return newState;
        });
      }, 21000); // Switch every 21 seconds (9s for base + 12s for grid)
    }, 18000); // Start regular interval after first cycle completes (3s base + 12s grid + 3s buffer)

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(regularTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [base, grid]);

  // If reduced motion, just show base image
  if (reduced.current) {
    return (
      <div className="hero-image-wrapper">
        <img 
          src={base} 
          alt="Hero image" 
          className="hero-base-image"
        />
      </div>
    );
  }

  return (
    <div className="hero-image-wrapper">
      <AnimatePresence mode="wait">
        {currentState === 'base' ? (
          <motion.img
            key="base"
            src={base}
            alt="Hero image"
            className="hero-base-image"
            style={{ transform: 'scaleX(-1)' }}
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
          >
            {/* First row: images 2 & 3 */}
            <motion.div
              className="hero-grid-item hero-grid-item-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 2.0, 
                ease: "easeIn",
                delay: 1.6 
              }}
              style={{ zIndex: 2 }}
            >
              <img src={grid[0]} alt="Service example 1" className="hero-grid-image" />
            </motion.div>
            
            <motion.div
              className="hero-grid-item hero-grid-item-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 2.0, 
                ease: "easeIn",
                delay: 0.0 
              }}
              style={{ zIndex: 1 }}
            >
              <img src={grid[1]} alt="Service example 2" className="hero-grid-image" />
            </motion.div>
            
            {/* Second row: images 4 & 5 */}
            <motion.div
              className="hero-grid-item hero-grid-item-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 2.0, 
                ease: "easeIn",
                delay: 0.8 
              }}
              style={{ zIndex: 1 }}
            >
              <img src={grid[2]} alt="Service example 3" className="hero-grid-image" />
            </motion.div>
            
            <motion.div
              className="hero-grid-item hero-grid-item-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 2.0, 
                ease: "easeIn",
                delay: 2.4 
              }}
              style={{ zIndex: 2 }}
            >
              <img src={grid[3]} alt="Service example 4" className="hero-grid-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
