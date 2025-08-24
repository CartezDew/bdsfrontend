import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { NavbarMenu } from '../mockData/data'
import { Home, Calculator, Users, Phone, HelpCircle } from 'lucide-react'
import '../styles/navbar.css'

const NavbarDesktop = ({ customConfig }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = customConfig || NavbarMenu

    const getIconForMenuItem = (itemName) => {
        switch (itemName) {
            case 'Home':
                return <Home className="menu-icon" size={18} />
            case 'Services':
                return <Calculator className="menu-icon" size={18} />
            case 'Why Us':
                return <Users className="menu-icon" size={18} />
            case 'Contact Us':
                return <Phone className="menu-icon" size={18} />
            case 'FAQ':
                return <HelpCircle className="menu-icon" size={18} />
            default:
                return null
        }
    }

    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    return (
        <nav className="navbar navbar-desktop">
            <div className="navbar-container">
                <div className="logo-section">
                    <button className="logo-link" onClick={handleLogoClick}>
                        <img src="/favicon.svg" alt="BDS Accounting Logo" className="logo-image" />
                        <h1 className="logo-text">Talent Group</h1>
                    </button>
                </div>
                <div className="menu-section">
                    {menuItems.map((item) => {
                        if (item.path === '#services' && location.pathname === '/services') return null
                        const isHashLink = item.path.startsWith('#')
                        const icon = getIconForMenuItem(item.name)
                        
                        if (isHashLink) {
                            return (
                                <button key={item.id} className="menu-link" onClick={() => {
                                    const targetId = item.path.substring(1)
                                    if (location.pathname !== '/') { navigate(`/#${targetId}`); return }
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
                                }}>
                                    {icon && icon}
                                    <span className="menu-text">{item.name}</span>
                                </button>
                            )
                        }
                        return (
                            <Link key={item.id} to={item.path} className="menu-link">
                                {icon && icon}
                                <span className="menu-text">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>
                <div className="icon-section">
                    <Link to="/get-started" className="get-started-btn">Get Started</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDesktop
