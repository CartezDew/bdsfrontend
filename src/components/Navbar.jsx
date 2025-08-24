import React from 'react'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const Navbar = (props) => {
    return (
        <>
            <div className="navbar-visible-desktop" aria-hidden={typeof window !== 'undefined' && window.innerWidth <= 680 ? 'true' : 'false'}>
                <NavbarDesktop {...props} />
            </div>
            <div className="navbar-visible-mobile" aria-hidden={typeof window !== 'undefined' && window.innerWidth <= 680 ? 'false' : 'true'}>
                <NavbarMobile {...props} />
            </div>
        </>
    )
}

export default Navbar