import React, { useEffect, useState } from 'react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const Navbar = (props) => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 680 : false)

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

    return isMobile ? (
        <div className="navbar-visible-mobile" aria-hidden="false">
            <NavbarMobile {...props} />
        </div>
    ) : (
        <div className="navbar-visible-desktop" aria-hidden="false">
            <NavbarDesktop {...props} />
        </div>
    )
}

export default Navbar