import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const LegalPage: React.FC = () => {
  const { activePage, setActivePage, categories } = useAppStore();
  const shellRef = useRef<HTMLElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

  const activeCategories = categories.filter(c => c.status === 'active');

  useEffect(() => {
    // Smooth scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000); 
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [activePage]);

  // Mouse Parallax for SVG background
  useEffect(() => {
    const shell = shellRef.current;
    const wave = waveRef.current;
    if (!shell || !wave) return;

    const setX = gsap.quickTo(wave, '--mx', { duration: 1.4, ease: 'power1.out' });
    const setY = gsap.quickTo(wave, '--my', { duration: 1.4, ease: 'power1.out' });

    const onMove = (e: PointerEvent) => {
      const r = shell.getBoundingClientRect();
      setX(((e.clientX - r.left) / r.width - 0.5) * 24);
      setY(((e.clientY - r.top) / r.height - 0.5) * 16);
    };
    const onLeave = () => { setX(0); setY(0); };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const contentMap = {
    terms: {
      title: 'TERMS & CONDITIONS',
      content: (
        <>
          <p>Welcome to Reshu Varma Label. By accessing this website, you agree to be bound by these Terms and Conditions.</p>
          <h3>1. Custom Orders & Bridal Atelier</h3>
          <p>All bespoke and customized bridal orders require a non-refundable 50% advance payment. Lead times for handcrafted pieces range between 45 to 90 days depending on the embroidery and weaving complexity.</p>
          <h3>2. Intellectual Property</h3>
          <p>All designs, patterns, embroidery layouts, imagery, and text on this website are the exclusive intellectual property of Reshu Varma Label. Unauthorized reproduction will result in legal action.</p>
          <h3>3. Returns & Exchanges</h3>
          <p>Due to the bespoke nature of our garments and handcrafted pure silk sarees, we do not offer returns, exchanges, or refunds once an order is placed and production has commenced.</p>
          <h3>4. Fabric & Color Variations</h3>
          <p>Since our fabrics are hand-dyed and hand-woven, slight variations in color, texture, and zari shading are inherent to the craftsmanship and are not considered defects.</p>
        </>
      )
    },
    privacy: {
      title: 'PRIVACY POLICY',
      content: (
        <>
          <p>At Reshu Varma Label, your privacy is our utmost priority. This policy outlines how we handle your personal data.</p>
          <h3>1. Information We Collect</h3>
          <p>We may collect personal details such as your name, contact number, email address, shipping address, and body measurements when you place an order, book a consultation, or fill out our bridal inquiry forms.</p>
          <h3>2. Use of Information</h3>
          <p>Your data is exclusively used to process your orders, tailor your bespoke garments, communicate shipping updates, and occasionally send you exclusive updates about new collections or bridal campaigns.</p>
          <h3>3. Data Protection</h3>
          <p>We do not sell, trade, or otherwise transfer your personal identifiable information to outside parties, except trusted logistics partners who require it for order delivery.</p>
          <h3>4. Cookies</h3>
          <p>Our website may use "cookies" to enhance your user experience and maintain your session across the platform.</p>
        </>
      )
    },
    disclaimer: {
      title: 'DISCLAIMER',
      content: (
        <>
          <p>The information contained on this website is for general information purposes only. The information is provided by Reshu Varma Label and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind.</p>
          <h3>1. Product Imagery</h3>
          <p>Every effort is made to display our garments and sarees as accurately as possible. However, the actual colors you see will depend on your monitor, screen brightness, and display settings. We cannot guarantee that your monitor's display of any color will accurately reflect the actual color of the delivered product.</p>
          <h3>2. External Links</h3>
          <p>Through this website, you may be able to link to other websites which are not under the control of Reshu Varma Label. We have no control over the nature, content, and availability of those sites.</p>
          <h3>3. Pricing</h3>
          <p>Prices for our products are subject to change without notice. We reserve the right to modify or discontinue a product at any time.</p>
        </>
      )
    }
  };

  const currentContent = contentMap[activePage as 'terms' | 'privacy' | 'disclaimer'] || contentMap.terms;

  return (
    <main className="site-shell" ref={shellRef}>
      {/* -- Header -- */}
      <header className="site-header">
        <a 
          className="brand" 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActivePage('home');
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
          {activeCategories.map((cat) => (
            <a
              key={cat.id}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('category', cat.slug);
              }}
              href={"#" + cat.slug}
              style={{ paddingLeft: 10 }}
            >
              <i aria-hidden="true" />
              {cat.name.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>

      {/* -- Background SVG Graphic -- */}
      <div className="bg-graphic" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <svg
          ref={waveRef}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
        >
          <path 
            d="M0,200 C300,300 700,100 1000,200 L1000,1000 L0,1000 Z" 
            fill="none" 
            stroke="var(--muted)" 
            strokeWidth="0.5" 
            opacity="0.2"
          />
          <path 
            d="M0,400 C300,500 700,300 1000,400 L1000,1000 L0,1000 Z" 
            fill="none" 
            stroke="var(--muted)" 
            strokeWidth="0.5" 
            opacity="0.15"
          />
          <path 
            d="M0,600 C300,700 700,500 1000,600 L1000,1000 L0,1000 Z" 
            fill="none" 
            stroke="var(--muted)" 
            strokeWidth="0.5" 
            opacity="0.1"
          />
        </svg>
      </div>

      <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: '24px', letterSpacing: '0.1em', marginBottom: '3rem', color: 'var(--ink)' }}>
          {currentContent.title}
        </h1>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: '1.8', color: 'rgba(0,0,0,0.7)' }}>
          {currentContent.content}
        </div>
      </div>

      <footer style={{ position: 'relative', width: '100%', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="hero-label" style={{ display: 'flex', gap: '30px', fontSize: '10px', letterSpacing: '0.1em', opacity: 0.8 }}>
          <span>RESHU VARMA LABEL &copy; 2026</span>
          <a href="https://instagram.com/reshuvarmalabel" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>IG: @reshuvarmalabel</a>
          <a href="https://facebook.com/reshuvarmalabel" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>FB: @reshuvarmalabel</a>
        </div>
        <div className="hero-label label-right-top" style={{ display: 'flex', gap: '20px', fontSize: '10px', letterSpacing: '0.1em', opacity: 0.8 }}>
          <span style={{ cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} onClick={() => setActivePage('terms')}>TERMS</span>
          <span style={{ cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} onClick={() => setActivePage('privacy')}>PRIVACY</span>
          <span style={{ cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} onClick={() => setActivePage('disclaimer')}>DISCLAIMER</span>
        </div>
      </footer>

      {/* Film grain */}
      <div className="grain" aria-hidden="true" style={{ position: 'fixed' }} />
    </main>
  );
};
