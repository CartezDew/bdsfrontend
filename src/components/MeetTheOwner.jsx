// src/components/MeetTheOwner.jsx
import React, { useState, useRef, useEffect } from "react";
import "../styles/meet_the_owner.css";

export default function MeetTheOwner() {
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const meetOwnerRef = useRef(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationsTriggered) {
            setAnimationsTriggered(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (meetOwnerRef.current) {
      observer.observe(meetOwnerRef.current);
    }

    return () => observer.disconnect();
  }, [animationsTriggered]);

  return (
    <section 
      ref={meetOwnerRef}
      className={`meet-owner-section ${animationsTriggered ? 'meet-owner-section-animated' : ''}`}
    >
      <div className={`meet-owner-container ${animationsTriggered ? 'meet-owner-container-animated' : ''}`}>
        <div className={`meet-owner ${animationsTriggered ? 'meet-owner-animated' : ''}`}>
          <div className={`meet-owner__media ${animationsTriggered ? 'meet-owner__media-animated' : ''}`}>
            <img 
              src="/src/assets/Images/CEO.jpeg" 
              alt="Brandon Davis, CEO of BDS Talent Group" 
              className={`meet-owner__img ${animationsTriggered ? 'meet-owner__img-animated' : ''}`}
            />
            <div className={`meet-owner__name ${animationsTriggered ? 'meet-owner__name-animated' : ''}`}>
              <h4 className="meet-owner__nameText">Brandon Davis</h4>
              <p className={`meet-owner__title ${animationsTriggered ? 'meet-owner__title-animated' : ''}`}>Founder & CEO</p>
              <div className={`meet-owner__social ${animationsTriggered ? 'meet-owner__social-animated' : ''}`}>
                <a 
                  href="https://www.linkedin.com/in/bdavis0890/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="meet-owner__linkedin"
                >
                  <svg 
                    className="meet-owner__linkedin-icon" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="meet-owner__linkedin-text">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className={`meet-owner__text ${animationsTriggered ? 'meet-owner__text-animated' : ''}`}>
            <div className={`meet-owner__header ${animationsTriggered ? 'meet-owner__header-animated' : ''}`}>
              Meet Brandon
            </div>
            <p className={animationsTriggered ? 'meet-owner__paragraph-animated' : ''}>
              Brandon Davis, CEO of BDS Talent Group, is a seasoned accountant. He delivers transparent, accurate financials that enable leaders to make confident decisions. Equally important, he is committed to equity— expanding access to reliable, affordable accounting services for underserved entrepreneurs and the communities they power. 

            </p>
            <p className={`meet-owner__bds ${animationsTriggered ? 'meet-owner__bds-animated' : ''}`}>
              BDS stands for <strong>Business • Development • Solutions</strong>
              — we bring <em>peace of mind, accounted for</em> to life by
              delivering <strong>Business clarity</strong>,{" "}
              <strong>Development of systems</strong>, and{" "}
              <strong>Solutions that scale</strong>. That's how we keep
              businesses compliant and growing—and how we help individuals get
              their finances organized, stress-free, and on track.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
