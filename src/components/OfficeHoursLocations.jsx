import React, { useState, useEffect, useRef } from "react";
import "../styles/officeHoursLocations.css";
import AppointmentScheduler from "./appointment_scheduler";
import Footer from "./Footer";

const OfficeHoursLocations = () => {
  const [animationsTriggered, setAnimationsTriggered] = useState({
    header: false,
    title: false,
    subtitle: false,
    officeHours: false,
    businessHours: false,
    email: false,
    hoursGrid: false,
    locations: false,
    locationsHeader: false,
    phone: false,
    locationItems: false
  });

  // Refs for animation triggers
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const officeHoursRef = useRef(null);
  const businessHoursRef = useRef(null);
  const emailRef = useRef(null);
  const hoursGridRef = useRef(null);
  const locationsRef = useRef(null);
  const locationsHeaderRef = useRef(null);
  const phoneRef = useRef(null);
  const locationItemsRef = useRef(null);

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
          setAnimationsTriggered(prev => ({
            ...prev,
            [elementId]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all animation elements individually
    if (headerRef.current) observer.observe(headerRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (officeHoursRef.current) observer.observe(officeHoursRef.current);
    if (businessHoursRef.current) observer.observe(businessHoursRef.current);
    if (emailRef.current) observer.observe(emailRef.current);
    if (hoursGridRef.current) observer.observe(hoursGridRef.current);
    if (locationsRef.current) observer.observe(locationsRef.current);
    if (locationsHeaderRef.current) observer.observe(locationsHeaderRef.current);
    if (phoneRef.current) observer.observe(phoneRef.current);
    if (locationItemsRef.current) observer.observe(locationItemsRef.current);

    return () => observer.disconnect();
  }, []);

  const locations = [
    {
      name: "Atlanta Office",
      address: "2700 Cumberland Pkwy SE Suite 410, Atlanta, GA 30339",
      coordinates: "33.8762,-84.5023", // Marietta coordinates
      phone: "770-202-0098",
      hours: {
        mon: "09:00 AM - 06:00 PM",
        tue: "09:00 AM - 06:00 PM",
        wed: "09:00 AM - 06:00 PM",
        thu: "09:00 AM - 06:00 PM",
        fri: "09:00 AM - 06:00 PM",
        sat: "Closed",
        sun: "Closed"
      }
    },
  ];

  const getGoogleMapsUrl = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <>
      <section id="office-hours" className="office-hours-locations">
        <div className="container">
          {/* Header */}
          <div className={`section-header ${animationsTriggered.header ? 'animate-header' : ''}`} ref={headerRef} data-animate="header">
            <h2 className={`section-title ${animationsTriggered.title ? 'animate-title' : ''}`} ref={titleRef} data-animate="title">Office Hours & Locations</h2>
            <p className={`section-subtitle ${animationsTriggered.subtitle ? 'animate-subtitle' : ''}`} ref={subtitleRef} data-animate="subtitle">We'd love to hear from you! Contact us to schedule your consultation.</p>
            <button className="schedule-consultation-btn">Schedule Consultation</button>
          </div>

          {/* Social Media Section */}
          <div className="social-media-section">
            <p className="follow-us-text">Follow us:</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/bdavis0890/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Office Hours & Location */}
          <div className={`office-hours-location-combined ${animationsTriggered.officeHours ? 'animate-office-hours' : ''}`} ref={officeHoursRef} data-animate="officeHours">
            <div className={`office-hours-header ${animationsTriggered.businessHours ? 'animate-business-hours' : ''}`} ref={businessHoursRef} data-animate="businessHours">
              <h3>Business Hours</h3>
              <div className={`main-email ${animationsTriggered.email ? 'animate-email' : ''}`} ref={emailRef} data-animate="email">
                <span className="email-icon">✉️</span>
                info@bdstalentgroup.com
              </div>
            </div>
            
            <div className={`hours-grid ${animationsTriggered.hoursGrid ? 'animate-hours-grid' : ''}`} ref={hoursGridRef} data-animate="hoursGrid">
              <div className="hours-row">
                <span className="day">Mon</span>
                <span className="time">09:00 AM - 06:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="day">Tue</span>
                <span className="time">09:00 AM - 06:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="day">Wed</span>
                <span className="time">09:00 AM - 06:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="day">Thu</span>
                <span className="time">09:00 AM - 06:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="day">Fri</span>
                <span className="time">09:00 AM - 06:00 PM</span>
              </div>
              <div className="hours-row weekend">
                <span className="day">Sat - Sun</span>
                <span className="time closed">Closed</span>
              </div>
            </div>
            
            {/* Location Section Below Office Hours */}
            <div className={`location-section-below ${animationsTriggered.locations ? 'animate-locations' : ''}`} ref={locationsRef} data-animate="locations">
              <div className={`location-header ${animationsTriggered.locationsHeader ? 'animate-location-card' : ''}`} ref={locationsHeaderRef} data-animate="locationsHeader">
                <h4>Office Location</h4>
                <div className={`main-phone ${animationsTriggered.phone ? 'animate-phone' : ''}`} ref={phoneRef} data-animate="phone">
                  <span className="phone-icon">📞</span>
                  770-202-0098
                </div>
              </div>
              
              <div className={`location-details ${animationsTriggered.locationItems ? 'animate-location-items' : ''}`} ref={locationItemsRef} data-animate="locationItems">
                <div className="location-item-combined">
                  <div className="location-name">
                    <span className="office-icon">🏢</span>
                    <h5>Atlanta Office</h5>
                  </div>
                  <p className="location-address">{locations[0].address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Scheduler */}
          <AppointmentScheduler />
        </div>
      </section>
      
             {/* Footer */}
       <Footer />
     </>
   );
 };
 
 export default OfficeHoursLocations;
