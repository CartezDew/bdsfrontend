import React, { useEffect, useState, useRef } from 'react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import { ChevronUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const Navbar = (props) => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 680 : false)
    const [showBackToTop, setShowBackToTop] = useState(false)
    const autoScrollingRef = useRef(false)
    const location = useLocation()

    useEffect(() => {
        if (typeof window === 'undefined') return
        const mql = window.matchMedia('(max-width: 680px)')
        const handleChange = (e) => setIsMobile(e.matches)
        setIsMobile(mql.matches)
        if (mql.addEventListener) mql.addEventListener('change', handleChange)
        else mql.addListener(handleChange)
        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', handleChange)
            else mql.removeListener(handleChange)
        }
    }, [])

    useEffect(() => {
        // Special case: on Services and Get Started routes under 680px, always show
        const alwaysShow = isMobile && (location.pathname === '/services' || location.pathname === '/get-started')
        if (alwaysShow) {
            setShowBackToTop(true)
            return
        }
        
        // Hide back-to-top button on sign-in page
        if (location.pathname === '/sign-in') {
            setShowBackToTop(false)
            return
        }
        // Mobile rule (default): show everywhere except while hero is visible (on home) or footer is visible
        let observers = []
        let retryTimer = null
        let heroInView = false
        let footerInView = false

        const recalc = () => {
            if (autoScrollingRef.current) return
            const shouldShow = (!heroInView) && (!footerInView)
            setShowBackToTop(shouldShow)
        }

        const attach = () => {
            const heroEl = document.getElementById('hero')
            const footerEl = document.querySelector('footer.footer')
            let attachedAny = false

            if (heroEl && 'IntersectionObserver' in window) {
                const obsH = new IntersectionObserver((entries) => {
                    const entry = entries[0]
                    heroInView = !!(entry && entry.isIntersecting)
                    recalc()
                }, { threshold: [0.01] })
                obsH.observe(heroEl)
                observers.push(obsH)
                attachedAny = true
            } else {
                // If not on home page (no hero), treat as not in view
                heroInView = false
            }

            if (footerEl && 'IntersectionObserver' in window) {
                const obsF = new IntersectionObserver((entries) => {
                    const entry = entries[0]
                    footerInView = !!(entry && entry.isIntersecting)
                    recalc()
                }, { threshold: [0.01] })
                obsF.observe(footerEl)
                observers.push(obsF)
                attachedAny = true
            } else {
                footerInView = false
            }

            recalc()
            return attachedAny
        }

        if (!attach()) {
            retryTimer = setInterval(() => {
                if (attach()) {
                    clearInterval(retryTimer)
                }
            }, 250)
        }

        return () => {
            observers.forEach(o => o.disconnect())
            observers = []
            if (retryTimer) clearInterval(retryTimer)
        }
    }, [location.pathname])

    const scrollToTop = () => {
        setShowBackToTop(false)
        autoScrollingRef.current = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
            autoScrollingRef.current = false
            // Restore visibility on routes where it should always show on mobile
            if (isMobile && (location.pathname === '/services' || location.pathname === '/get-started')) {
                setShowBackToTop(true)
            }
        }, 900)
    }

    return (
        <>
            {isMobile ? (
                <div className="navbar-visible-mobile" aria-hidden="false">
                    <NavbarMobile {...props} />
                </div>
            ) : (
                <div className="navbar-visible-desktop" aria-hidden="false">
                    <NavbarDesktop {...props} />
                </div>
            )}
            {isMobile && (
                <button 
                    className="back-to-top-btn" 
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    style={{ 
                        opacity: showBackToTop ? 1 : 0, 
                        pointerEvents: showBackToTop ? 'auto' : 'none',
                        transition: 'opacity 420ms ease'
                    }}
                >
                    <ChevronUp />
                </button>
            )}
        </>
    )
}

export default Navbar