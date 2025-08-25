import React, { useState, useEffect, useRef } from "react";
import "../styles/socialProof.css";
import businessHandshake from "../assets/Images/business-people-shaking-hands-together.png";
import image_1 from "../assets/Images/Frame_1.png";
import image_2 from "../assets/Images/Frame_2.png";
import OptimizedTestimonialImage from "./OptimizedTestimonialImage.jsx";

// Import testimonial images (optimized thumbnails)
import T_1 from "../assets/Testimonials/thumbnails/thumb_T_1.jpeg";
import T_2 from "../assets/Testimonials/thumbnails/thumb_T_2.jpg";
import T_3 from "../assets/Testimonials/thumbnails/thumb_T_3.jpg";
import T_4 from "../assets/Testimonials/thumbnails/thumb_T_4.jpg";
import T_5 from "../assets/Testimonials/thumbnails/thumb_T_5.jpg";
import T_6 from "../assets/Testimonials/thumbnails/thumb_T_6.jpg";
import T_8 from "../assets/Testimonials/thumbnails/thumb_T_8.jpg";
import T_9 from "../assets/Testimonials/thumbnails/thumb_T_9.jpg";
import girlCafe from "../assets/Testimonials/thumbnails/thumb_girl-cafe.jpg";


const testimonials = [
  {
    quote: "I was out of the country during tax season, but BDS filed both my business and personal taxes before the deadline. They even found business savings with truck repair costs and purchases.",
    author: "Cartez D.",
    role: "Founder & CEO",
    company: "Marc'd Group LLC",
    yearOfService: "2025",
    rating: 5.0,
    image: T_1
  },
  {
    quote: "BDS Talent Group made tax season painless. Clear pricing, fast responses, and real guidance when I needed it most.",
    author: "Jordan M.",
    role: "Freelance Designer",
    company: "Atlanta, GA",
    yearOfService: "2025",
    rating: 5.0,
    image: T_2
  },
  {
    quote: "They found deductions I missed and set up a comprehensive plan for next year. Definitely worth the investment.",
    author: "Marcus L.",
    role: "1099 Contractor",
    company: "Cobb County, GA",
    yearOfService: "2024",
    rating: 4.7,
    image: T_3
  },
  {
    quote: "BDS Talent Group helped me get a deadline extension when I needed it most. Their expertise saved me from penalties.",
    author: "Alex R.",
    role: "Small Business Owner",
    company: "Fulton County, GA",
    yearOfService: "2023",
    rating: 4.5,
    image: T_4
  },
  {
    quote: "We moved our bookkeeping here and immediately shaved hours off month-end close. The team is incredibly efficient.",
    author: "Priya S.",
    role: "Owner",
    company: "Oak & Ivy Boutique",
    yearOfService: "2022",
    rating: 5,
    image: T_5
  },
  {
    quote: "Proactive advice, not just filings. They helped me understand payroll and cash flow management.",
    author: "Elena R.",
    role: "Founder",
    company: "Café Roble",
    yearOfService: "2022",
    rating: 4.9,
    image: T_6
  },
  {
    quote: "When I got an audit notice, they handled everything professionally. Communication was on point throughout.",
    author: "Sam K.",
    role: "Managing Member",
    company: "Kline Properties LLC",
    yearOfService: "2023",
    rating: 5,
    image: T_8
  },
  {
    quote: "Simple, honest pricing and great follow-through. I highly recommend BDS Talent Group for all tax needs.",
    author: "Danielle T.",
    role: "Solo Realtor",
    company: "DeKalb County, GA",
    yearOfService: "2022",
    rating: 4.9,
    image: girlCafe
  },
  {
    quote: "As a college student filing taxes for the first time, I was completely lost. BDS guided me through everything step by step. They made filing my cashier job taxes so simple and even found education credits I didn't know about!",
    author: "Sarah T.",
    role: "College Student",
    company: "Part-time Cashier",
    yearOfService: "2024",
    rating: 5,
    image: T_9
  }
];

export default function SocialProof() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allCardsExpanded, setAllCardsExpanded] = useState(false);
  const [isNarrow800, setIsNarrow800] = useState(typeof window !== 'undefined' ? window.innerWidth <= 800 : false);
  const [isNarrow600, setIsNarrow600] = useState(typeof window !== 'undefined' ? window.innerWidth <= 600 : false);
  const [expandedIndexSmall, setExpandedIndexSmall] = useState(null); // 0..2 per page when <=600px
  const [animationsTriggered, setAnimationsTriggered] = useState({
    header: false,
    leftImage: false,
    rightImage: false,
    nav: false,
    cards: false
  });
  
  const [cardAnimations, setCardAnimations] = useState(Array(3).fill(false)); // 3 cards per page

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="star-icon full" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }
    
    // Add partial star if there's a decimal
    if (decimalPart > 0) {
      const partialWidth = Math.round(decimalPart * 24); // 24 is the SVG width
      const maskId = `partial-star-${Math.random()}`;
      
      stars.push(
        <svg key="partial" className="star-icon partial" viewBox="0 0 24 24" fill="currentColor">
          <defs>
            <mask id={maskId}>
              <rect x="0" y="0" width="24" height="24" fill="white"/>
              <rect x={partialWidth} y="0" width={24 - partialWidth} height="24" fill="black"/>
            </mask>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" mask={`url(#${maskId})`}/>
        </svg>
      );
    }
    
    // Add empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="star-icon empty" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }
    
    return (
      <div className="star-rating">
        {stars}
        <span className="rating-number">{rating}</span>
      </div>
    );
  };
  
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  // Refs for animation triggers
  const headerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const navRef = useRef(null);
  const cardsRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05, // 5% visibility
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.dataset.animate;
          
          if (elementId === 'cards') {
            // Trigger staggered card animations
            setAnimationsTriggered(prev => ({ ...prev, cards: true }));
            
            // Use the same smooth animation logic as page changes
            setCardAnimations(Array(3).fill(false));
            
            // Stagger the animations with the same timing as page changes
            for (let i = 0; i < cardsPerPage; i++) {
              setTimeout(() => {
                setCardAnimations(prev => 
                  prev.map((_, index) => index === i ? true : prev[index])
                );
              }, i * 300); // 300ms delay between each card
            }
          } else {
            setAnimationsTriggered(prev => ({
              ...prev,
              [elementId]: true
            }));
          }
        }
      });
    }, observerOptions);

    // Observe all animation elements individually
    if (headerRef.current) observer.observe(headerRef.current);
    if (leftImageRef.current) observer.observe(leftImageRef.current);
    if (rightImageRef.current) observer.observe(rightImageRef.current);
    if (navRef.current) observer.observe(navRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  // Track viewport width to control full-width card behavior (<= 800px) and unify at <= 600px
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => {
      const w = window.innerWidth;
      setIsNarrow800(w <= 800);
      setIsNarrow600(w <= 600);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    // Reset expanded state when changing pages
    setAllCardsExpanded(false);
    setExpandedIndexSmall(null);
    // Reset card animations for new page and trigger them immediately
    setCardAnimations(Array(3).fill(false));
    
    // Trigger card animations for the new page after a brief delay
    setTimeout(() => {
      for (let i = 0; i < cardsPerPage; i++) {
        setTimeout(() => {
          setCardAnimations(prev => 
            prev.map((_, index) => index === i ? true : prev[index])
          );
        }, i * 300); // 300ms delay between each card
      }
    }, 100);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    // Reset expanded state when changing pages
    setAllCardsExpanded(false);
    setExpandedIndexSmall(null);
    // Reset card animations for new page and trigger them immediately
    setCardAnimations(Array(3).fill(false));
    
    // Trigger card animations for the new page after a brief delay
    setTimeout(() => {
      for (let i = 0; i < cardsPerPage; i++) {
        setTimeout(() => {
          setCardAnimations(prev => 
            prev.map((_, index) => index === i ? true : prev[index])
          );
        }, i * 300); // 300ms delay between each card
      }
    }, 100);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    // Reset expanded state when changing pages
    setAllCardsExpanded(false);
    setExpandedIndexSmall(null);
    // Reset card animations for new page and trigger them immediately
    setCardAnimations(Array(3).fill(false));
    
    // Trigger card animations for the new page after a brief delay
    setTimeout(() => {
      for (let i = 0; i < cardsPerPage; i++) {
        setTimeout(() => {
          setCardAnimations(prev => 
            prev.map((_, index) => index === i ? true : prev[index])
          );
        }, i * 300); // 300ms delay between each card
      }
    }, 100);
  };

  const toggleAllCardsExpansion = () => {
    setAllCardsExpanded(!allCardsExpanded);
  };

  // Get current page testimonials
  const currentTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <section id="social-proof" className="social-proof-section">
      <div className="social-proof-container">
      <div className="testimonial-grid">
      {/* Section header */}
      <div className={`grid-header ${animationsTriggered.header ? 'animate-header' : ''}`} ref={headerRef} data-animate="header">
        <h2>What our clients say</h2>
        <p>Real success stories from clients who trusted BDS Talent Group with their financial needs.</p>
      </div>

      {/* Navigation and Images Container */}
      <div className="nav-images-container">
        {/* Left Image */}
        <div className={`left-image ${animationsTriggered.leftImage ? 'animate-left-image' : ''}`} ref={leftImageRef} data-animate="leftImage">
          <img 
            src={image_1} 
            alt="Professional business team collaboration"
            className="business-meeting-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        </div>

        {/* Navigation Controls */}
        <div className={`nav-controls-section ${animationsTriggered.nav ? 'animate-nav' : ''}`} ref={navRef} data-animate="nav">
          <div className="pagination-controls">
            <button
              onClick={prevPage}
              className="nav-button"
              data-tooltip="Previous page"
            >
              ←
            </button>
            
            <div className="page-indicator">
              {currentPage + 1} of {totalPages}
            </div>
            
            <button
              onClick={nextPage}
              className="nav-button"
              aria-label="Next page"
              data-tooltip="Next page"
            >
              →
            </button>
          </div>

          {/* Page dots */}
          <div className="page-dots">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`page-dot ${index === currentPage ? "active" : ""}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className={`right-image ${animationsTriggered.rightImage ? 'animate-right-image' : ''}`} ref={rightImageRef} data-animate="rightImage">
          <img 
            src={image_2} 
            alt="Small business owners collaboration"
            className="business-meeting-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        </div>
      </div>

      {/* Testimonials grid - 3 cards per page */}
      <div className={`testimonials-grid ${animationsTriggered.cards ? 'animate-cards' : ''}`} ref={cardsRef} data-animate="cards">
        {currentTestimonials.map((testimonial, index) => {
          const globalIndex = currentPage * cardsPerPage + index;
          const isWideCard = isNarrow800 && !isNarrow600 && ((index + 1) % 3 === 0); // only at <=800 and >600
          const showFullQuote = isNarrow600 ? (expandedIndexSmall === index) : (allCardsExpanded || isWideCard);
          
          return (
            <article 
              key={globalIndex} 
              className={`testimonial-card ${allCardsExpanded ? 'expanded' : ''} ${isWideCard ? 'full-quote' : ''}`}
              style={{
                opacity: cardAnimations[index] ? 1 : 0,
                transform: cardAnimations[index] ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease-out ${index * 0.2}s`
              }}
            >
              <div className="card-header">
                <div className="author-info">
                  <h3 className="author-name">{testimonial.author}</h3>
                  <p className="author-role">{testimonial.role}</p>
                  <p className="author-company">{testimonial.company}</p>
                </div>
                <div className="image-year-container">
                  <OptimizedTestimonialImage
                    src={testimonial.image}
                    alt={`${testimonial.author} testimonial`}
                    className="testimonial-image"
                    onLoad={() => {
                      console.log(`Successfully loaded image for ${testimonial.author}`);
                    }}
                    onError={() => {
                      console.error(`Failed to load image for ${testimonial.author}`);
                    }}
                  />
                  <div className="year-badge">{testimonial.yearOfService}</div>
                </div>
              </div>
              
              <div className="card-content">
                <p className="testimonial-quote">
                  "{showFullQuote ? testimonial.quote : (testimonial.quote.slice(0, 100) + '...')}"
                </p>
              </div>
              
              <div className="card-footer">
                {renderStars(testimonial.rating)}
                <button 
                  className="expand-btn" 
                  onClick={() => {
                    if (isNarrow600) {
                      setExpandedIndexSmall(prev => prev === index ? null : index)
                    } else {
                      toggleAllCardsExpansion()
                    }
                  }}
                  aria-label={(isNarrow600 ? (expandedIndexSmall === index) : allCardsExpanded) ? "Show less" : "Read more"}
                  title={(isNarrow600 ? (expandedIndexSmall === index) : allCardsExpanded) ? "Collapse" : "Expand"}
                >
                  {(isNarrow600 ? (expandedIndexSmall === index) : allCardsExpanded) ? '←' : '→'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      </div>
      </div>
    </section>
  );
}
