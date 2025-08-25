import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from './Footer'
import '../styles/signin.css'

const SignIn = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <main className="signin-page" aria-labelledby="signin-title">
        <motion.section 
          className="signin-container"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.header className="signin-header">
            <motion.h1 
              id="signin-title" 
              className="signin-title"
              variants={itemVariants}
            >
              Welcome
            </motion.h1>
            <motion.p 
              className="signin-to"
              variants={itemVariants}
            >
              to
            </motion.p>
            <motion.h2 
              className="signin-brand"
              variants={itemVariants}
            >
              BDS Talent Group
            </motion.h2>
            <motion.div 
              className="signin-logo-divider"
              variants={itemVariants}
            />
            <motion.p 
              className="signin-subtitle"
              variants={itemVariants}
            >
              Sign in to continue or create an account to get started
            </motion.p>
          </motion.header>

          <motion.form 
            className="signin-form" 
            onSubmit={(e) => e.preventDefault()}
            variants={formVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <label className="signin-label" htmlFor="email">Email</label>
            <input className="signin-input" id="email" name="email" type="email" placeholder="you@example.com" required />

            <label className="signin-label" htmlFor="password">Password</label>
            <input className="signin-input" id="password" name="password" type="password" placeholder="••••••••" required />

            <button className="signin-btn" type="submit">Sign In</button>
          </motion.form>

          <motion.div 
            className="signin-actions"
            variants={formVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <span className="signin-divider" aria-hidden="true">or</span>
            <Link to="/get-started" className="signin-create-btn">Create an account</Link>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  )
}

export default SignIn


