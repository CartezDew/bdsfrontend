import React from 'react';
import { motion } from 'framer-motion';

const AppLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--color-timberwolf)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Loading BDS Talent Group"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        {/* Logo + Wordmark (matches hero) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/favicon.svg" alt="BDS Logo" style={{ width: 56, height: 56 }} />
          <h1 style={{
            margin: 0,
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-eerie-black)'
          }}>
            Talent Group
          </h1>
        </div>

        {/* Spinner */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '4px solid rgba(0,0,0,0.08)',
            borderTopColor: 'var(--color-accent)',
            animation: 'bds-spin 1s linear infinite'
          }}
          aria-hidden
        />

        {/* Message */}
        <p style={{
          margin: 0,
          color: 'var(--color-eerie-black)',
          opacity: 0.8,
          fontSize: '1rem'
        }}>
          Getting everything ready for you...
        </p>

        {/* Local keyframes */}
        <style>{`@keyframes bds-spin { from { transform: rotate(0turn); } to { transform: rotate(1turn); } }`}</style>
      </div>
    </motion.div>
  );
};

export default AppLoading;
