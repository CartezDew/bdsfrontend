import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NavbarMenu } from '../mockData/data'
import '../styles/navbar.css'

const NavbarMobile = ({ customConfig }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = customConfig || NavbarMenu
    const menuRef = useRef(null)
    const openAtRef = useRef(0)

    useLayoutEffect(() => {
        const setVar = () => {
            const nav = document.querySelector('.navbar-container') || document.querySelector('.navbar')
            const h = nav ? Math.round(nav.getBoundingClientRect().height) : 48
            document.documentElement.style.setProperty('--navbar-height', `${h}px`)
        }
        setVar()
        window.addEventListener('resize', setVar)
        return () => window.removeEventListener('resize', setVar)
    }, [])

    // Mount / unmount logs
    useEffect(() => {
        try { console.log('[NavbarMobile] mounted at', Date.now()) } catch {}
        return () => { try { console.log('[NavbarMobile] unmounted at', Date.now()) } catch {} }
    }, [])

    // Listen for global toggleMobileMenu events (from Hero/App)
    useEffect(() => {
        const handleExternalToggle = (e) => {
            try { console.log('[NavbarMobile] toggle received', e && e.type, e && e.detail) } catch {}
            setIsOpen(true)
        }
        try { console.log('[NavbarMobile] mounting, attaching toggle listeners') } catch {}
        window.addEventListener('toggleMobileMenu', handleExternalToggle)
        window.addEventListener('toggleMobileMenuFromHero', handleExternalToggle)
        return () => {
            window.removeEventListener('toggleMobileMenu', handleExternalToggle)
            window.removeEventListener('toggleMobileMenuFromHero', handleExternalToggle)
        }
    }, [])

    // Observe external class changes that might hide things
    useEffect(() => {
        const bodyObserver = new MutationObserver(() => {
            try { console.log('[NavbarMobile] body.classList =', document.body.className) } catch {}
        })
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
        const appEl = document.querySelector('.App')
        let appObserver
        if (appEl) {
            appObserver = new MutationObserver(() => {
                try { console.log('[NavbarMobile] .App classList =', appEl.className) } catch {}
            })
            appObserver.observe(appEl, { attributes: true, attributeFilter: ['class'] })
        }
        return () => { bodyObserver.disconnect(); if (appObserver) appObserver.disconnect() }
    }, [])

    // Publish state changes + duration tracking
    useEffect(() => {
        try { window.dispatchEvent(new CustomEvent('mobileMenuState', { detail: { open: isOpen, source: 'navbar-mobile', ts: Date.now() } })) } catch {}
        if (isOpen) {
            openAtRef.current = performance.now()
            document.body.classList.add('mobile-menu-opened')
            try { console.log('[NavbarMobile] open → true at', openAtRef.current) } catch {}
        } else {
            const dt = openAtRef.current ? (performance.now() - openAtRef.current).toFixed(1) : 'n/a'
            // Defer body class removal to exit-complete for smooth slide-up
            try { console.log('[NavbarMobile] open → false, duration ms =', dt) } catch {}
        }
    }, [isOpen])

    const onHashClick = (hash) => {
        const targetId = hash.substring(1)
        if (location.pathname !== '/') { navigate(`/#${targetId}`); setIsOpen(false); try { console.log('[NavbarMobile] closing reason: nav hash link') } catch {}; return }
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
            const navbarEl = document.querySelector('.navbar')
            const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
            const rectTop = targetElement.getBoundingClientRect().top + window.scrollY
            const styles = window.getComputedStyle(targetElement)
            const marginTop = parseFloat(styles.marginTop) || 0
            const borderTop = parseFloat(styles.borderTopWidth) || 0
            const scrollPosition = rectTop - navbarHeight - marginTop - borderTop
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
        }
        try { console.log('[NavbarMobile] closing reason: nav hash link (same page)') } catch {}
        setIsOpen(false)
    }

    return (
        <nav className="navbar navbar-mobile">
            <div className="navbar-container">
                <div className="logo-section">
                    <img src="/favicon.svg" alt="BDS Accounting Logo" className="logo-image" />
                    <h1 className="logo-text">Talent Group</h1>
                </div>
                <button className={`mobile-nav-toggle ${isOpen ? 'open' : ''}`} onClick={() => { try { console.log('[NavbarMobile] toggle button clicked') } catch {}; setIsOpen(v => !v) }} aria-label="Toggle mobile menu">
                    <span className="mobile-nav-line"></span>
                    <span className="mobile-nav-line"></span>
                </button>
                <div className="icon-section">
                    <Link to="/get-started" className="get-started-btn" onClick={() => { try { console.log('[NavbarMobile] closing reason: Get Started click') } catch {}; setIsOpen(false) }}>Get Started</Link>
                </div>
            </div>

            <AnimatePresence initial={false} mode="wait" onExitComplete={() => { 
              try { document.body.classList.remove('mobile-menu-opened') } catch {}
              try { window.dispatchEvent(new CustomEvent('mobileMenuCloseAnimationEnd', { detail: { open: false, ts: Date.now() } })) } catch {}
            }}>
                {isOpen && (
                    <motion.div
                        key="mobileMenu"
                        className="mobile-nav-menu"
                        ref={menuRef}
                        initial={{ y: '-110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 } }}
                        exit={{ y: '-100%', opacity: 0.98, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } }}
                        onAnimationStart={() => { try { console.log('[NavbarMobile] motion animation start. isOpen=', isOpen) } catch {} }}
                        onAnimationComplete={() => { 
                          try { console.log('[NavbarMobile] motion animation complete. isOpen=', isOpen) } catch {} 
                          if (isOpen) { try { window.dispatchEvent(new CustomEvent('mobileMenuOpenAnimationEnd', { detail: { open: true, ts: Date.now() } })) } catch {} }
                        }}
                        style={{ left: 0, right: 'auto' }}
                    >
                        <div className="mobile-nav-items">
                            {menuItems.map((item) => {
                                if (item.path === '#services' && location.pathname === '/services') return null
                                const isHash = item.path.startsWith('#')
                                if (isHash) {
                                    return (
                                        <button key={item.id} className="mobile-nav-item" onClick={() => onHashClick(item.path)}>
                                            {item.name}
                                        </button>
                                    )
                                }
                                return (
                                    <Link key={item.id} to={item.path} className="mobile-nav-item" onClick={() => { try { console.log('[NavbarMobile] closing reason: route link') } catch {}; setIsOpen(false) }}>
                                        {item.name}
                                    </Link>
                                )
                            })}
                            <Link to="/signin" className="mobile-nav-item" onClick={() => { try { console.log('[NavbarMobile] closing reason: Sign In link') } catch {}; setIsOpen(false) }}>Sign In</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default NavbarMobile
