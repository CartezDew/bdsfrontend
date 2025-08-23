import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to scroll to sections on current page
  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to the home page with hash
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId)
    if (element) {
      const navbarEl = document.querySelector('.navbar')
      const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
      const rectTop = element.getBoundingClientRect().top + window.scrollY
      const styles = window.getComputedStyle(element)
      const marginTop = parseFloat(styles.marginTop) || 0
      const borderTop = parseFloat(styles.borderTopWidth) || 0

      let scrollPosition
      if (sectionId === 'avoid-confusion') {
        // Align the very top of AvoidConfusion with viewport top
        scrollPosition = rectTop - marginTop - borderTop
      } else if (sectionId === 'why-us') {
        // Scroll to the bottom of the previous section (hero/services) so that
        // the top of MeetTheOwner (next section) is visible. We approximate by
        // aligning why-us bottom to viewport top using its height.
        const sectionHeight = element.offsetHeight
        scrollPosition = rectTop + sectionHeight - navbarHeight
      } else if (sectionId === 'social-proof') {
        // Same style as Meet the CEO logic: align the bottom of the preceding
        // section (services) so the testimonials are fully visible.
        const servicesEl = document.getElementById('services')
        if (servicesEl) {
          const servicesTop = servicesEl.getBoundingClientRect().top + window.scrollY
          const servicesStyles = window.getComputedStyle(servicesEl)
          const marginBottom = parseFloat(servicesStyles.marginBottom) || 0
          const servicesBottom = servicesTop + servicesEl.offsetHeight + marginBottom
          scrollPosition = servicesBottom - navbarHeight
        } else {
          // Fallback
          scrollPosition = rectTop - navbarHeight - marginTop - borderTop
        }
      } else if (sectionId === 'entity-selector') {
        // Prefer precise alignment: navbar bottom flush with top of entity selector
        const targetEl = document.getElementById('entity-selector')
        const computeEntityTop = () => {
          const navbar = document.querySelector('.navbar')
          const navH = navbar ? navbar.getBoundingClientRect().height : 0
          if (targetEl) {
            const tTop = targetEl.getBoundingClientRect().top + window.scrollY
            const tStyles = window.getComputedStyle(targetEl)
            const tMarginTop = parseFloat(tStyles.marginTop) || 0
            const tBorderTop = parseFloat(tStyles.borderTopWidth) || 0
            return tTop - navH - tMarginTop - tBorderTop
          }
          // Fallback: bottom of meet-the-owner
          const meet = document.getElementById('meet-the-owner')
          if (meet) {
            const mTop = meet.getBoundingClientRect().top + window.scrollY
            const mBottom = mTop + meet.offsetHeight
            return mBottom - navH
          }
          return rectTop - navbarHeight - marginTop - borderTop
        }
        scrollPosition = computeEntityTop()
        // post-adjust in case navbar size changes during scroll
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
        setTimeout(() => {
          window.scrollTo({ top: computeEntityTop(), behavior: 'auto' })
        }, 300)
        setTimeout(() => {
          window.scrollTo({ top: computeEntityTop(), behavior: 'auto' })
        }, 700)
        return
      } else if (sectionId === 'appointment-scheduler') {
        // Scroll to the bottom of the OfficeHoursLocations section so the
        // scheduler is fully visible; fallback to aligning its own top if mounted.
        const officeEl = document.getElementById('contact')
        const schedulerEl = document.querySelector('.appointment-scheduler')
        const computeSchedulerTop = () => {
          const navbar = document.querySelector('.navbar')
          const navH = navbar ? navbar.getBoundingClientRect().height : 0
          if (schedulerEl) {
            const sTop = schedulerEl.getBoundingClientRect().top + window.scrollY
            const sStyles = window.getComputedStyle(schedulerEl)
            const sMarginTop = parseFloat(sStyles.marginTop) || 0
            const sBorderTop = parseFloat(sStyles.borderTopWidth) || 0
            return sTop - navH - sMarginTop - sBorderTop
          }
          if (officeEl) {
            const oTop = officeEl.getBoundingClientRect().top + window.scrollY
            const oBottom = oTop + officeEl.offsetHeight
            return oBottom - navH
          }
          return rectTop - navbarHeight - marginTop - borderTop
        }
        const pos = computeSchedulerTop()
        window.scrollTo({ top: pos, behavior: 'smooth' })
        setTimeout(() => window.scrollTo({ top: computeSchedulerTop(), behavior: 'auto' }), 300)
        setTimeout(() => window.scrollTo({ top: computeSchedulerTop(), behavior: 'auto' }), 700)
        return
      } else {
        scrollPosition = rectTop - navbarHeight - marginTop - borderTop
      }

      window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-nav">
            <button 
                className="footer-nav-btn"
                onClick={() => scrollToSection('avoid-confusion')}
            >
                Where to Start
            </button>
            <span className="footer-separator">|</span>
            <button 
                className="footer-nav-btn"
                onClick={() => {
                    if (location.pathname === '/services') {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                        navigate('/services')
                    }
                }}
            >
                All Services
            </button>
            <span className="footer-separator">|</span>
            <button 
                className="footer-nav-btn"
                onClick={() => scrollToSection('social-proof')}
            >
                Testimonials
            </button>
            <span className="footer-separator">|</span>
            <button 
                className="footer-nav-btn"
                onClick={() => scrollToSection('appointment-scheduler')}
            >
                Schedule Appointment
            </button>
            <span className="footer-separator">|</span>
            <button 
                className="footer-nav-btn"
                onClick={() => scrollToSection('entity-selector')}
            >
                Business Entity Selector
            </button>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          <p>&copy; 2025 The BDS Talent Group LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
