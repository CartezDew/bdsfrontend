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
          <h3>Business Hours</h3>
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
          <h3>Our Locations</h3>
          <div className="locations-grid">
            {locations.map((location, index) => (
              <div key={index} className="location-card">
                <div className="location-header">
                  <h4>{location.name}</h4>
                  <div className="location-phone">
                    <span className="phone-icon">📞</span>
                    {location.phone}
                  </div>
                </div>
                
                <div className="location-address">
                  <span className="address-icon">📍</span>
                  <p>{location.address}</p>
                </div>

                <div className="location-map">
                  <iframe
                    title={`${location.name} Map`}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(location.address)}`}
                    allowFullScreen
                  />
                </div>

                <div className="location-actions">
                  <a
                    href={getGoogleMapsUrl(location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link-btn"
                  >
                    <span className="map-icon">🗺️</span>
                    View on Google Maps
                  </a>
                  <a
                    href={`tel:${location.phone}`}
                    className="call-btn"
                  >
                    <span className="phone-icon">📞</span>
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeHoursLocations;
