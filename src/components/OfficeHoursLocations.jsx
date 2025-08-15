import React from "react";
import "../styles/officeHoursLocations.css";

const OfficeHoursLocations = () => {
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
        <div className="section-header">
          <h2>Office Hours & Locations</h2>
          <p>We'd love to hear from you! Contact us to schedule your consultation.</p>
        </div>

        {/* Office Hours */}
        <div className="office-hours-section">
          <div className="office-hours-header">
            <h3>Business Hours</h3>
            <div className="main-email">
              <span className="email-icon">✉️</span>
              info@bdstalentgroup.com
            </div>
          </div>
          <div className="hours-grid">
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
        <div className="locations-section">
          <div className="location-card">
            <div className="locations-header">
              <h4>Our Office Locations</h4>
              <div className="main-phone">
                <span className="phone-icon">📞</span>
                770-202-0098
              </div>
            </div>
            
            <div className="locations-grid-simple">
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
