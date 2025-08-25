import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { ServiceProvider } from './context/ServiceContext'
import Navbar from './components/Navbar'
import PageTitle from './components/PageTitle'
import Hero from './components/Hero'
import AvoidConfusion from './components/AvoidConfusion'
import Services from './components/Services'
import OfficeHoursLocations from './components/OfficeHoursLocations'
import GetStarted from './components/GetStarted'
import ServicesPage from './components/ServicesPage'
import SignIn from './components/SignIn'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const [showNavbar, setShowNavbar] = useState(!isHomePage)
  const navbarStateRef = useRef(showNavbar)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileWidth, setIsMobileWidth] = useState(typeof window !== 'undefined' ? window.matchMedia('(max-width: 680px)').matches : false)

  // Update ref when state changes
  useEffect(() => {
    navbarStateRef.current = showNavbar
  }, [showNavbar])
  
  // Track viewport width for mobile/desktop gating (<= 680px is mobile)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 680px)')
    const onChange = (e) => setIsMobileWidth(e.matches)
    setIsMobileWidth(mql.matches)
    if (mql.addEventListener) mql.addEventListener('change', onChange)
    else mql.addListener(onChange)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange)
      else mql.removeListener(onChange)
    }
  }, [])

  // Navbar visibility rules (desktop shows on all routes except when hero is in view on home)
  useEffect(() => {
    const path = location.pathname
    // Always visible on non-home routes
    if (path !== '/') {
      setShowNavbar(true)
      return
    }

    // Home route: on desktop, show when hero is not visible; on mobile, leave hidden unless menu opens
    let observer
    const heroEl = document.getElementById('hero')
    const updateFromHero = (inView) => {
      if (isMobileWidth) {
        // On mobile width, keep the previous behavior; do not force show here
        setShowNavbar(false)
      } else {
        setShowNavbar(!inView)
      }
    }

    if (heroEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        updateFromHero(!!(entry && entry.isIntersecting))
      }, { threshold: [0.01] })
      observer.observe(heroEl)
      // Initial calc in case observer fires late
      const rect = heroEl.getBoundingClientRect()
      updateFromHero(rect.bottom > 0 && rect.top < window.innerHeight)
    } else {
      // If no hero, default to shown on desktop
      setShowNavbar(!isMobileWidth)
    }

    return () => { if (observer) observer.disconnect() }
  }, [location.pathname, isMobileWidth])

  // If we land on home route with a hash (e.g., /#services), perform precise scroll
  useEffect(() => {
    if (!isHomePage) return
    const hash = window.location.hash
    if (!hash) return
    const targetId = hash.replace('#', '')
    const computeScrollTop = () => {
      // Fallback lookup if element lacks id
      let el = document.getElementById(targetId)
      if (!el && targetId === 'avoid-confusion') {
        el = document.querySelector('.avoid-confusion-section')
      }
      if (!el) return null
      const navbarEl = document.querySelector('.navbar')
      const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
      const rectTop = el.getBoundingClientRect().top + window.scrollY
      const styles = window.getComputedStyle(el)
      const marginTop = parseFloat(styles.marginTop) || 0
      const borderTop = parseFloat(styles.borderTopWidth) || 0
      // Special case: align the very top of AvoidConfusion to viewport top
      if (targetId === 'avoid-confusion') {
        return rectTop - marginTop - borderTop
      }
      // Special case: Meet the CEO (why-us) — scroll to bottom of social-proof so
      // the top of why-us (next section) is fully visible
      if (targetId === 'why-us') {
        const socialProofEl = document.getElementById('social-proof')
        if (socialProofEl) {
          const socialProofTop = socialProofEl.getBoundingClientRect().top + window.scrollY
          const socialProofBottom = socialProofTop + socialProofEl.offsetHeight
          return socialProofBottom - navbarHeight
        }
        // Fallback to bottom of why-us section itself
        const sectionHeight = el.offsetHeight
        return rectTop + sectionHeight - navbarHeight
      }
      // Special case: Business Entity Selector — scroll to bottom of
      // meet-the-owner so the widget starts visible
      if (targetId === 'entity-selector') {
        const entityEl = document.getElementById('entity-selector')
        if (entityEl) {
          const eTop = entityEl.getBoundingClientRect().top + window.scrollY
          const eStyles = window.getComputedStyle(entityEl)
          const eMarginTop = parseFloat(eStyles.marginTop) || 0
          const eBorderTop = parseFloat(eStyles.borderTopWidth) || 0
          return eTop - navbarHeight - eMarginTop - eBorderTop
        }
        // Fallback to bottom of meet-the-owner
        const meetEl = document.getElementById('meet-the-owner')
        if (meetEl) {
          const meetTop = meetEl.getBoundingClientRect().top + window.scrollY
          const meetBottom = meetTop + meetEl.offsetHeight
          return meetBottom - navbarHeight
        }
      }
      if (targetId === 'appointment-scheduler') {
        const schedulerEl = document.querySelector('.appointment-scheduler')
        if (schedulerEl) {
          const sTop = schedulerEl.getBoundingClientRect().top + window.scrollY
          const sStyles = window.getComputedStyle(schedulerEl)
          const sMarginTop = parseFloat(sStyles.marginTop) || 0
          const sBorderTop = parseFloat(sStyles.borderTopWidth) || 0
          return sTop - navbarHeight - sMarginTop - sBorderTop
        }
        const officeEl = document.getElementById('contact')
        if (officeEl) {
          const oTop = officeEl.getBoundingClientRect().top + window.scrollY
          const oBottom = oTop + officeEl.offsetHeight
          return oBottom - navbarHeight
        }
      }
      // Special case: Services — align to bottom of previous section (hero)
      if (targetId === 'services') {
        const sEl = document.getElementById('services')
        if (sEl) {
          const prev = sEl.previousElementSibling
          if (prev) {
            const prevTop = prev.getBoundingClientRect().top + window.scrollY
            const prevBottom = prevTop + prev.offsetHeight
            return Math.max(0, prevBottom - navbarHeight)
          }
        }
      }
      // Special case: Testimonials (social-proof) — same pattern as meet-the-owner
      if (targetId === 'social-proof') {
        const servicesEl = document.getElementById('services')
        if (servicesEl) {
          const servicesTop = servicesEl.getBoundingClientRect().top + window.scrollY
          const servicesBottom = servicesTop + servicesEl.offsetHeight
          return servicesBottom - navbarHeight
        }
      }
      return rectTop - navbarHeight - marginTop - borderTop
    }

    // Wait for navbar to mount this frame, then measure and scroll precisely
    requestAnimationFrame(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'smooth' })
    })

    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'auto' })
    }, 320)
    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'auto' })
    }, 650)
  }, [isHomePage, location.key])

  // If we navigate to home with a location.state.scrollTo, perform the same precise scroll
  useEffect(() => {
    if (!isHomePage) return
    const state = location.state
    if (!state || !state.scrollTo) return
    const targetId = state.scrollTo
    const computeScrollTop = () => {
      let el = document.getElementById(targetId)
      if (!el && targetId === 'avoid-confusion') {
        el = document.querySelector('.avoid-confusion-section')
      }
      if (!el && targetId === 'appointment-scheduler') {
        el = document.querySelector('.appointment-scheduler')
      }
      if (!el) return null
      const navbarEl = document.querySelector('.navbar')
      const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
      const rectTop = el.getBoundingClientRect().top + window.scrollY
      const styles = window.getComputedStyle(el)
      const marginTop = parseFloat(styles.marginTop) || 0
      const borderTop = parseFloat(styles.borderTopWidth) || 0
      if (targetId === 'appointment-scheduler') {
        return rectTop - navbarHeight - marginTop - borderTop
      }
      return rectTop - navbarHeight - marginTop - borderTop
    }

    requestAnimationFrame(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'smooth' })
    })
    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'auto' })
    }, 320)
    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'auto' })
    }, 650)

    // Clear the state to avoid sticky scrolling on back/forward
    navigate(location.pathname, { replace: true })
  }, [isHomePage, location.state])
  
  // Bridge hero hamburger → Navbar when navbar is hidden
  useEffect(() => {
    const handleHeroToggle = (e) => {
      console.log('[App] toggleMobileMenu intercepted; showNavbar?', navbarStateRef.current, 'detail:', e && e.detail)
      if (e?.detail?.rebroadcast) return; // ignore our own rebroadcasts
      if (!navbarStateRef.current) {
        // Force mount and mark menu as opening to prevent auto-hide during scroll
        setShowNavbar(true)
        setMobileMenuOpen(true)
        setTimeout(() => {
          console.log('[App] rebroadcasting toggleMobileMenu to Navbar')
          window.dispatchEvent(new CustomEvent('toggleMobileMenu', { detail: { source: 'app-rebroadcast', rebroadcast: true, ts: Date.now() } }));
        }, 120);
      }
    };
    window.addEventListener('toggleMobileMenu', handleHeroToggle);
    return () => window.removeEventListener('toggleMobileMenu', handleHeroToggle);
  }, []);
  
  // Hide navbar on mobile when menu closes and hero is in view
  useEffect(() => {
    const onMobileMenuState = (e) => {
      const open = !!(e && e.detail && e.detail.open)
      setMobileMenuOpen(open)
      if (open) {
        // Ensure navbar remains mounted while menu is open
        if (!navbarStateRef.current) setShowNavbar(true)
        return
      }
      if (!open && location.pathname === '/') {
        // check if we are near top/hero
        const hero = document.getElementById('hero')
        if (hero) {
          const rect = hero.getBoundingClientRect()
          const heroMostlyInView = rect.bottom > 0 && rect.top < window.innerHeight * 0.4
          if (heroMostlyInView) {
            setShowNavbar(false)
          }
        } else {
          // if no hero found, default to leaving navbar as-is
        }
      }
    }
    window.addEventListener('mobileMenuState', onMobileMenuState)
    return () => window.removeEventListener('mobileMenuState', onMobileMenuState)
  }, [location.pathname])

  // Safeguard: force-close mobile menu on route changes
  useEffect(() => {
    try { document.body.classList.remove('mobile-menu-opened') } catch {}
    try { window.dispatchEvent(new CustomEvent('mobileMenuState', { detail: { open: false, source: 'app-route-change', ts: Date.now() } })) } catch {}
  }, [location.key])

  // Global handler: ensure ALL Get Started + Schedule Consultation/Appointment go to consistent locations
  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      if (!target) return;
      const clickable = target.closest && target.closest('a,button');
      if (!clickable) return;
      const text = (clickable.textContent || '').toLowerCase();
      const classList = (clickable.className || '').toString();
      // Match Get Started buttons generically
      const isGetStarted = text.includes('get started');
      // Match Schedule Consultation or Schedule Appointment buttons generically
      const isSchedule = text.includes('schedule consultation') || text.includes('schedule appointment')
        || classList.includes('schedule-consultation-btn')
        || classList.includes('cta-button-primary');

      // If it's a Schedule action, route to home and scroll to the appointment scheduler section
      if (isSchedule) {
        e.preventDefault();
        if (location.pathname === '/') {
          // Scroll to appointment-scheduler with navbar offset
          const el = document.getElementById('appointment-scheduler') || document.querySelector('.appointment-scheduler');
          const navbarEl = document.querySelector('.navbar');
          const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0;
          if (el) {
            const rectTop = el.getBoundingClientRect().top + window.scrollY;
            const styles = window.getComputedStyle(el);
            const marginTop = parseFloat(styles.marginTop) || 0;
            const borderTop = parseFloat(styles.borderTopWidth) || 0;
            const pos = rectTop - navbarHeight - marginTop - borderTop;
            window.scrollTo({ top: pos, behavior: 'smooth' });
          }
        } else {
          navigate('/', { state: { scrollTo: 'appointment-scheduler' } });
        }
        return;
      }

      // If it's a Get Started action, normalize to /get-started top
      const anchor = clickable.tagName === 'A' ? clickable : (clickable.closest && clickable.closest('a'));
      let href = anchor && anchor.getAttribute && anchor.getAttribute('href');
      let url;
      try { url = href ? new URL(href, window.location.origin) : null } catch { url = null }
      const isGetStartedPath = url && url.pathname === '/get-started';
      if (!isGetStarted && !isGetStartedPath) return;
      e.preventDefault();
      if (location.pathname === '/get-started') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        try { sessionStorage.setItem('scrollToTopOnGetStarted', '1') } catch {}
        navigate('/get-started');
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname])

  // After navigation to /get-started, perform the top scroll if flagged
  useEffect(() => {
    if (location.pathname !== '/get-started') return;
    let shouldScroll = false;
    try { shouldScroll = sessionStorage.getItem('scrollToTopOnGetStarted') === '1' } catch {}
    if (!shouldScroll) return;
    try { sessionStorage.removeItem('scrollToTopOnGetStarted') } catch {}
    // Wait a frame so layout is ready, then scroll smoothly to the absolute top
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [location.pathname])
  
  return (
    <ServiceProvider>
      <div className={`App ${showNavbar ? '' : 'navbar-hidden'}`}>
        {/* Navbar is always mounted; visibility controlled by wrapper class */}
        <Navbar />
        <Routes>
        <Route path="/" element={
          <>
            <PageTitle />
            <Hero />
            <AvoidConfusion />
            <Services />
            <OfficeHoursLocations />
          </>
        } />

        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signin" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </div>
    </ServiceProvider>
  );
}

export default App
