// src/components/MeetTheOwner.jsx
import React from "react";
import "../styles/meet_the_owner.css";

export default function MeetTheOwner() {
  return (
    <section className="meet-owner-section">
      <div className="meet-owner-container">
        <div className="meet-owner">
          <div className="meet-owner__media">
            <img 
              src="/src/assets/Images/CEO.jpeg" 
              alt="Brandon Davis, CEO of BDS Talent Group" 
              className="meet-owner__img"
            />
            <div className="meet-owner__name">
              <h4 className="meet-owner__nameText">Brandon Davis</h4>
              <p className="meet-owner__title">Founder & CEO</p>
            </div>
          </div>
          
          <div className="meet-owner__text">
            <div className="meet-owner__header">
              Meet Brandon
            </div>
            <p>
              Brandon Davis, CEO of BDS Talent Group, is a seasoned accountant. He delivers transparent, accurate financials that enable leaders to make confident decisions. Equally important, he is committed to equity—expanding access to reliable, affordable accounting services for underserved entrepreneurs and the communities they power. 

            </p>
            <p className="meet-owner__bds">
              BDS stands for <strong>Business • Development • Solutions</strong>
              —we bring <em>peace of mind, accounted for</em> to life by
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
