import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageTitle = () => {
  const location = useLocation()

  useEffect(() => {
    const getRouteTitle = (pathname) => {
      switch (pathname) {
        case '/':
          return 'Home'
        case '/services':
          return 'Services'
        case '/contact':
          return 'Contact Us'
        default:
          return 'Home'
      }
    }

    const routeTitle = getRouteTitle(location.pathname)
    document.title = `BDS Talent Group | ${routeTitle}`
  }, [location.pathname])

  return null
}

export default PageTitle
