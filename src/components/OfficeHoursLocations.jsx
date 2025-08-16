import React, { useState, useEffect, useRef } from "react";
import "../styles/officeHoursLocations.css";

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
      name: "Marietta Office",
      address: "2661 Windy Hill Rd SE, Marietta, GA 30067",
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
    {
      name: "Decatur Office",
      address: "105 E Trinity Pl, Decatur, GA 30030",
      coordinates: "33.7748,-84.2963", // Decatur coordinates
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
    }
  ];

  const getGoogleMapsUrl = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <section className="office-hours-locations">
      <div className="container">
        {/* Header */}
        <div className={`section-header ${animationsTriggered.header ? 'animate-header' : ''}`} ref={headerRef} data-animate="header">
          <h2 className={`section-title ${animationsTriggered.title ? 'animate-title' : ''}`} ref={titleRef} data-animate="title">Office Hours & Locations</h2>
          <p className={`section-subtitle ${animationsTriggered.subtitle ? 'animate-subtitle' : ''}`} ref={subtitleRef} data-animate="subtitle">We'd love to hear from you! Contact us to schedule your consultation.</p>
        </div>

        {/* Office Hours */}
        <div className={`office-hours-section ${animationsTriggered.officeHours ? 'animate-office-hours' : ''}`} ref={officeHoursRef} data-animate="officeHours">
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
        </div>

        {/* Locations */}
        <div className={`locations-section ${animationsTriggered.locations ? 'animate-locations' : ''}`} ref={locationsRef} data-animate="locations">
          <div className={`location-card ${animationsTriggered.locationsHeader ? 'animate-location-card' : ''}`} ref={locationsHeaderRef} data-animate="locationsHeader">
            <div className="locations-header">
              <h4>Our Office Locations</h4>
              <div className={`main-phone ${animationsTriggered.phone ? 'animate-phone' : ''}`} ref={phoneRef} data-animate="phone">
                <span className="phone-icon">📞</span>
                770-202-0098
              </div>
            </div>
            
            <div className={`locations-grid-simple ${animationsTriggered.locationItems ? 'animate-location-items' : ''}`} ref={locationItemsRef} data-animate="locationItems">
              <div className="location-item">
                <div className="location-name">
                  <span className="office-icon">🏢</span>
                  <h5>Marietta Office</h5>
                </div>
                <p className="location-address">{locations[0].address}</p>
              </div>
              
              <div className="location-item">
                <div className="location-name">
                  <span className="office-icon">🏬</span>
                  <h5>Decatur Office</h5>
                </div>
                <p className="location-address">{locations[1].address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeHoursLocations;
