import React, { useState, useRef, useEffect } from 'react';

const OptimizedTestimonialImage = ({ src, alt, className, onLoad, onError }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded && !hasError) {
            const img = new Image();
            img.onload = () => {
              setIsLoaded(true);
              if (onLoad) onLoad();
            };
            img.onerror = () => {
              setHasError(true);
              if (onError) onError();
            };
            img.src = src;
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, isLoaded, hasError, onLoad, onError]);

  if (hasError) {
    return (
      <div className={`${className} image-placeholder`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`${className} image-container`}>
      {isLoaded ? (
        <img
          src={src}
          alt={alt}
          className="optimized-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'opacity 0.3s ease'
          }}
        />
      ) : (
        <div className="image-skeleton">
          <div className="skeleton-circle"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedTestimonialImage;
