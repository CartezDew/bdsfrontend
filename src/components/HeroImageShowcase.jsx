import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EMPTY_GRID = [];
const GRID_DELAYS = [0, 2, 3, 1];

function HeroImageShowcase({ base, grid = EMPTY_GRID }) {
  const [baseStatus, setBaseStatus] = useState('loading');
  const [baseRevealed, setBaseRevealed] = useState(false);
  const [readyImages, setReadyImages] = useState(() => new Set());
  const [showGrid, setShowGrid] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => {
      setReducedMotion(event.matches);
      setShowGrid(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Hidden photos never compete with the first image, or load for reduced motion.
  const loadGrid = baseStatus !== 'loading' && !reducedMotion;
  const gridReady = grid.length > 0 && grid.every((image) => readyImages.has(image.src));
  const gridVisible = !reducedMotion && gridReady && (showGrid || baseStatus === 'error');

  useEffect(() => {
    if (!loadGrid || !gridReady || !baseRevealed || baseStatus === 'error') return;

    let timer;
    const cycle = (visible) => {
      setShowGrid(visible);
      timer = window.setTimeout(() => cycle(!visible), visible ? 14000 : 15000);
    };
    // Finish the opening fade, then hold the main photo before revealing the collage.
    timer = window.setTimeout(() => cycle(true), 3000);
    return () => window.clearTimeout(timer);
  }, [baseStatus, baseRevealed, loadGrid, gridReady]);

  const handleGridLoad = async (event, src) => {
    const image = event.currentTarget;
    // A decoded collage can crossfade without a flash of empty image tiles.
    try {
      await image.decode();
    } catch {
      return;
    }
    setReadyImages((previous) => new Set(previous).add(src));
  };

  return (
    <div className="hero-image-wrapper">
      {baseStatus === 'error' ? (
        <div style={{ padding: '1.5rem', color: '#fff', visibility: gridVisible ? 'hidden' : 'visible' }}>
          Supporting your business at every stage.
        </div>
      ) : (
        <motion.img
          {...base}
          className="hero-base-image"
          style={{ transform: 'scaleX(-1)', position: 'absolute', inset: 0, willChange: 'opacity' }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          aria-hidden={gridVisible}
          onLoad={() => setBaseStatus('loaded')}
          onError={() => setBaseStatus('error')}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: baseStatus === 'loaded' ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 4.5, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={() => {
            if (baseStatus === 'loaded') setBaseRevealed(true);
          }}
        />
      )}

      {loadGrid && (
        <div
          className="hero-grid-overlay"
          aria-hidden={!gridVisible}
        >
          {grid.map((image, index) => (
            <motion.div
              key={image.src}
              className={`hero-grid-item hero-grid-item-${index + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: gridVisible ? 1 : 0 }}
              transition={{ duration: 3.2, ease: 'easeInOut', delay: GRID_DELAYS[index] ?? 0 }}
              style={{ zIndex: index === 0 ? 2 : 1 }}
            >
              <img
                {...image}
                className="hero-grid-image"
                loading="eager"
                decoding="async"
                fetchPriority="low"
                onLoad={(event) => handleGridLoad(event, image.src)}
                onError={() => setReadyImages((previous) => {
                  const next = new Set(previous);
                  next.delete(image.src);
                  return next;
                })}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// The hero ticker updates frequently; it should not restart image animation work.
export default memo(HeroImageShowcase);
