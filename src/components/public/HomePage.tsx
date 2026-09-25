import React, { useEffect } from 'react';
import { useAppStore } from '../../lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const { categories, setActivePage } = useAppStore();
  const activeCategories = categories.filter(c => c.status === 'active');

  // ── Smooth Scroll Integration (Lenis) ────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // Controls the smoothness of the momentum scroll
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // ── Lazy Loading Reveal Animations ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Categories when they slide in
      gsap.from('.category-card', {
        scrollTrigger: {
          trigger: '.categories-section',
          start: 'top 70%',
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Animate About text fading up
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Animate Contact Info and Button
      gsap.from(['.contact-grid > div', '.book-btn'], {
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Animate massive Footer text
      gsap.from('.footer-logo', {
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container">
      {/* ── Fixed Navigation Bar ────────────────────────────────────────── */}
      <header className="site-header">
        <a 
          className="brand" 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          RESHU VARMA LABEL
        </a>
        <div className="header-meta">
          <span>BRIDAL ATELIER</span>
          <i aria-hidden="true" />
          <span>HYDERABAD, INDIA</span>
        </div>
        <nav className="main-nav">
          {activeCategories.map(cat => (
            <a
              key={cat.id}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('category', cat.slug);
              }}
              href={`#${cat.slug}`}
              style={{ paddingLeft: 10 }}
            >
              <i aria-hidden="true" />
              {cat.name.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>

      {/* ── 1. Hero Video Section ───────────────────────────────────────── */}
      <section className="overlap-section hero-video-section">
        <video 
          src="/assets/Vedios/IMG_9723.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">RESHU VARMA LABEL</h1>
          <p className="hero-subtitle">LUXURY BRIDAL ATELIER</p>
          <div className="scroll-indicator">
            <span>SCROLL TO DISCOVER</span>
            <div className="line"></div>
          </div>
        </div>
      </section>

      {/* ── 2. Categories Section ───────────────────────────────────────── */}
      <section className="overlap-section categories-section">
        <div className="section-content">
          <h2 className="section-title">COLLECTIONS</h2>
          <div className="category-grid">
            {activeCategories.slice(0, 3).map((cat, i) => {
              const catImages = [
                '/assets/Brides/IMG_0245.webp',
                '/assets/Bridesmaid/IMG_1829.webp',
                '/assets/Bride and groom/IMG_3048.webp'
              ];
              return (
                <div 
                  key={cat.id} 
                  className="category-card"
                  onClick={() => setActivePage('category', cat.slug)}
                >
                  <div className="cat-img-wrapper">
                    <img src={catImages[i]} alt={cat.name} />
                  </div>
                  <h3 className="cat-name">{cat.name}</h3>
                  <p className="cat-explore">EXPLORE</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. About Section ────────────────────────────────────────────── */}
      <section className="overlap-section about-section">
        <div className="section-content about-content">
          <h2 className="section-title">THE ATELIER</h2>
          <p className="about-text">
            Based in the heart of Hyderabad, Reshu Varma Label is a sanctuary for the modern bride. 
            We weave heritage craftsmanship with contemporary silhouettes, creating heirloom 
            pieces that tell a story of timeless luxury. 
          </p>
          <p className="about-text">
            From pure gold zari Kanchipuram silks to handcrafted couture lehengas, every garment 
            is a testament to India's finest artisans.
          </p>
        </div>
      </section>

      {/* ── 4. Contact Section ──────────────────────────────────────────── */}
      <section className="overlap-section contact-section">
        <div className="section-content contact-content">
          <h2 className="section-title">VISIT US</h2>
          <div className="contact-grid">
            <div>
              <h4 className="contact-label">STUDIO</h4>
              <p className="contact-detail">Road No. 36, Jubilee Hills</p>
              <p className="contact-detail">Hyderabad, India</p>
            </div>
            <div>
              <h4 className="contact-label">APPOINTMENTS</h4>
              <p className="contact-detail">By private appointment only.</p>
              <p className="contact-detail">+91 9933334489</p>
            </div>
          </div>
          <button className="book-btn">BOOK CONSULTATION</button>
        </div>
      </section>

      {/* ── 5. Footer Section ───────────────────────────────────────────── */}
      <section className="overlap-section footer-section" style={{ background: '#1A1A1A', color: '#FDFBF7' }}>
        <div className="section-content footer-content" style={{ padding: '8vh 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <h1 className="footer-logo" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '8vw', fontWeight: 400, letterSpacing: '0.02em', margin: '0 0 2rem 0' }}>
            RESHU VARMA
          </h1>
          
          <div style={{ display: 'flex', gap: '4vw', fontFamily: 'Manrope, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4rem', opacity: 0.8 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pinterest</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>WhatsApp</a>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(253, 251, 247, 0.1)', marginBottom: '2rem' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'Manrope, sans-serif', fontSize: '10px', letterSpacing: '0.05em', opacity: 0.5 }}>
            <p>© 2026 RESHU VARMA LABEL. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED IN HYDERABAD</p>
          </div>
        </div>
      </section>
    </div>
  );
};
