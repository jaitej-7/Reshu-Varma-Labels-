import React, { useEffect } from 'react';
import { useAppStore } from '../../lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const { categories, setActivePage } = useAppStore();
  const activeCategories = categories.filter(c => c.status === 'active');
  const [isScrolled, setIsScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.85); // Toggle color when 85% down the hero video
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // ── Initial Loader Reveal Animation ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const progress = { val: 0 };

      // Ensure the page doesn't scroll while loading
      document.body.style.overflow = 'hidden';

      // Fade in text and counter
      tl.to(['.loader-text', '.loader-counter'], { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
        
        // Start counting to 100 while spacing out the text
        .to(progress, {
          val: 100,
          duration: 2,
          ease: 'power3.inOut',
          onUpdate: () => {
            const el = document.querySelector('.loader-counter');
            if (el) el.innerHTML = Math.round(progress.val) + '%';
          }
        }, "-=1.2")
        .to('.loader-text', { letterSpacing: '0.4em', duration: 2, ease: 'power1.out' }, "<")
        
        // Fade the text and counter out completely
        .to(['.loader-text', '.loader-counter'], { opacity: 0, duration: 0.8, ease: 'power2.out' }, "+=0.3")
        
        // Single grand sweep up of the pastel curtain
        .to('.initial-loader', { yPercent: -100, duration: 1.5, ease: 'power4.inOut' }, "+=0.1")
        
        // Massive cinematic zoom-out of the video underneath
        .from('.hero-video', { scale: 1.25, duration: 2.2, ease: 'power3.out' }, "-=1.5")
        
        // Header floats down gently
        .from('.site-header', { y: -30, opacity: 0, duration: 1.5, ease: 'power3.out' }, "-=1.5")

        // Hero text falls from the Z-axis with a cinematic blur!
        .from(['.hero-overlay > h1', '.hero-overlay > p', '.scroll-indicator'], 
          { 
            scale: 1.8, 
            filter: 'blur(15px)', 
            opacity: 0, 
            duration: 2, 
            stagger: 0.2, 
            ease: 'power3.out' 
          }, 
          "-=1.8"
        )
        .add(() => {
          // Re-enable scrolling after animation finishes
          document.body.style.overflow = 'visible';
          // Hide loader to prevent it from blocking clicks
          gsap.set('.initial-loader', { display: 'none' });
        });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = 'visible';
    };
  }, []);

  // ── Lazy Loading Reveal Animations ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Mask Reveal (Slides up from an invisible line)
      gsap.utils.toArray('.reveal-mask-wrapper').forEach((wrapper: any) => {
        const inner = wrapper.querySelector('.reveal-mask-inner');
        if (!inner) return;
        
        gsap.from(inner, {
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 85%',
          },
          y: '110%',
          rotation: 3, // Slight rotation for elegance
          duration: 1.4,
          ease: 'power4.out'
        });
      });

      // 2. Animate Category Cards
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

      // 3. Apple-Style Word Scrub Reveal for About Text
      gsap.to('.scrub-word', {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 50%',
          end: 'top 10%',
          scrub: 1, // Adds a buttery smooth 1-second momentum delay to the scrub
        }
      });

      // 4. Animate Contact Info and Button
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

      // 5. Animate massive Footer text
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
      {/* ── Initial Loader Overlay ────────────────────────────────────── */}
      <div 
        className="initial-loader" 
        style={{ 
          position: 'fixed', inset: 0, zIndex: 9999, background: '#E8E0D5', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' 
        }}
      >
        <h1 
          className="loader-text" 
          style={{ 
            fontFamily: 'Cormorant Garamond, serif', fontSize: '4vw', 
            letterSpacing: '0.1em', opacity: 0, color: 'var(--ink)', fontWeight: 400 
          }}
        >
          RESHU VARMA
        </h1>
        <div 
          className="loader-counter" 
          style={{ 
            position: 'absolute', bottom: '5vh', right: '5vw', 
            fontFamily: 'Manrope, sans-serif', fontSize: '13px', 
            letterSpacing: '0.1em', opacity: 0, color: 'var(--ink)' 
          }}
        >
          0%
        </div>
      </div>

      {/* ── Fixed Navigation Bar ────────────────────────────────────────── */}
      <header className={`site-header home-header ${!isScrolled ? 'hero-dark-mode' : ''}`}>
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
          <a
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('videos');
            }}
            href="#videos"
            style={{ paddingLeft: 10 }}
          >
            <i aria-hidden="true" />
            VIDEOS
          </a>
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

      {/* ── 1. Hero Video Section (Warm Champagne) ──────────────────────── */}
      <section className="overlap-section hero-video-section" style={{ background: '#E8E0D5' }}>
        <video 
          src="/assets/Vedios/hero-compressed.webm" 
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

      {/* ── 2. Categories Section (Soft Pistachio) ──────────────────────── */}
      <section className="overlap-section categories-section" style={{ background: '#DFE4DE' }}>
        <div className="section-content" style={{ maxWidth: '100vw', padding: '0 2vw' }}>
          <h2 className="section-title">
            <span className="reveal-mask-wrapper"><span className="reveal-mask-inner">COLLECTIONS</span></span>
          </h2>
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5vw' }}>
            {activeCategories.slice(0, 5).map((cat, i) => {
              const catImages = [
                '/assets/Brides/IMG_0245.webp',
                '/assets/Bridesmaid/IMG_1829.webp',
                '/assets/Bride and groom/IMG_3048.webp',
                '/assets/Brides/IMG_0245.webp',
                '/assets/Bride and groom/IMG_3048.webp'
              ];
              return (
                <div 
                  key={cat.id} 
                  className="category-card"
                  onClick={() => setActivePage('category', cat.slug)}
                >
                  <div className="cat-img-wrapper" style={{ marginBottom: '1rem' }}>
                    <img src={catImages[i]} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 className="cat-name" style={{ fontSize: '1.1rem' }}>{cat.name}</h3>
                  <p className="cat-explore" style={{ fontSize: '10px' }}>EXPLORE</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. About Section (Dusty Rose / Cashmere) ────────────────────── */}
      <section className="overlap-section about-section" style={{ background: '#E6DAD8' }}>
        <div className="section-content about-content">
          <h2 className="section-title">
            <span className="reveal-mask-wrapper"><span className="reveal-mask-inner">THE ATELIER</span></span>
          </h2>
          
          <div className="about-text-container" style={{ width: '100%' }}>
            <p className="about-text scrub-paragraph">
              {"Based in the heart of Hyderabad, Reshu Varma Label is a sanctuary for the modern bride.".split(" ").map((word, i) => (
                <React.Fragment key={'w1'+i}>
                  <span className="scrub-word" style={{ opacity: 0.15 }}>{word}</span>{' '}
                </React.Fragment>
              ))}
            </p>
            <p className="about-text scrub-paragraph">
              {"We weave heritage craftsmanship with contemporary silhouettes, creating heirloom pieces that tell a story of timeless luxury. From pure gold zari Kanchipuram silks to handcrafted couture lehengas, every garment is a testament to India's finest artisans.".split(" ").map((word, i) => (
                <React.Fragment key={'w2'+i}>
                  <span className="scrub-word" style={{ opacity: 0.15 }}>{word}</span>{' '}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Contact Section (Muted Stone) ────────────────────────────── */}
      <section className="overlap-section contact-section" style={{ background: '#DCDAD5' }}>
        <div className="section-content contact-content">
          <h2 className="section-title">
            <span className="reveal-mask-wrapper"><span className="reveal-mask-inner">VISIT US</span></span>
          </h2>
          <div className="contact-grid">
            <div>
              <h4 className="contact-label">STUDIO</h4>
              <p className="contact-detail">Road No. 36, Jubilee Hills</p>
              <p className="contact-detail">Hyderabad, India</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', fontSize: '12px', marginTop: '1rem', display: 'inline-block', opacity: 0.7 }}>Get Directions</a>
            </div>
            <div>
              <h4 className="contact-label">CONTACT</h4>
              <p className="contact-detail" style={{ opacity: 0.7 }}>reshmavarma7000@gmail.com</p>
              <p className="contact-detail" style={{ opacity: 0.7 }}>Call: +91 7893405600</p>
              <p className="contact-detail" style={{ opacity: 0.7 }}>WA: +91 9933334489</p>
            </div>
            <div>
              <h4 className="contact-label">APPOINTMENTS</h4>
              <p className="contact-detail" style={{ maxWidth: '100%', margin: '0 auto' }}>To ensure personalized attention, bridal consultations and studio visits are strictly by private appointment only.</p>
            </div>
          </div>
          <button 
            className="book-btn"
            onClick={() => window.open('https://wa.me/919933334489?text=Hello%20Reshu%20Varma%20Label!%20I%20would%20like%20to%20book%20a%20bridal%20consultation.', '_blank')}
          >
            BOOK CONSULTATION
          </button>
        </div>
      </section>

      {/* ── 5. Footer Section ───────────────────────────────────────────── */}
      <section className="overlap-section footer-section" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
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


