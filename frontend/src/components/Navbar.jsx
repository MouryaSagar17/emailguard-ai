import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        setIsScrolled(window.scrollY > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <h2>EmailGuard AI</h2>
        <Link to="/analyze" className="btn">
          Analyze Email
        </Link>
      </nav>

      <h1 className="fade-in" style={{ animationDelay: '0s' }}>Email Phishing Detection System</h1>
      <p className="fade-in" style={{ animationDelay: '0.2s' }}>
        An AI-powered web application that detects phishing emails
        using machine learning and natural language processing.
      </p>
      <p className="fade-in" style={{ animationDelay: '0.4s' }}>Achieving 98.1% accuracy in phishing detection.</p>
      <Link to="/analyze" className="hero-btn">
        Get Started
      </Link>
    </section>
  );
};

export default Navbar;
