import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_LIST = [
  "3000d55b-c7f3-4e73-9027-1c9dfde3d384.mp4",
  "IMG_2187.mp4",
  "IMG_6688.mp4",
  "IMG_6714.mp4",
  "IMG_7228.mp4",
  "IMG_7631.mp4",
  "IMG_7676.mp4",
  "IMG_7744.mp4",
  "insta_video_99115.mp4",
  "Megha.mp4",
  "Video-566.mp4",
  "video-output-54052EC5-E234-4E60-874D-1E7959F50EF3-1.mp4"
];

export const VideosPage: React.FC = () => {
  const { setActivePage, categories, setSelectedImageModal } = useAppStore();
  const activeCategories = categories.filter(c => c.status === 'active');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scroll for this specific page
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000); gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Staggered entry animation for grid items
      const items = gsap.utils.toArray('.video-item');
      gsap.fromTo(items, 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: 'power2.out'
        }
      );
    }, containerRef);

    return () => {
      lenis.destroy(); gsap.ticker.remove(raf);
      ctx.revert();
    };
  }, []);

  return (
    <main className="site-shell" ref={containerRef}>
      {/* -- Fixed Navigation Bar -- */}
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
            className="nav-link is-active"
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
              href={`#${cat.slug}`}
              style={{ paddingLeft: 10 }}
            >
              <i aria-hidden="true" />
              {cat.name.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>

      {/* -- Background SVG Graphic -- */}
      <div className="bg-graphic" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <svg
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

      <div className="videos-container" style={{ position: 'relative', zIndex: 1, padding: '160px 2rem 100px 2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh' }}>
        <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '24px', letterSpacing: '0.1em', marginBottom: '4rem', color: 'var(--ink)', textAlign: 'center', opacity: 0.8 }}>
          VIDEOS
        </h2>
        
        {/* Instagram Grid (3 columns, 1:1 aspect ratio) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', width: '100%' }}>
          {VIDEO_LIST.map((video, idx) => (
            <div 
              key={idx} 
              className="video-item" 
              onClick={() => setSelectedImageModal("/assets/Vedios/" + video)}
              style={{ 
                aspectRatio: '1 / 1',
                borderRadius: '4px', 
                overflow: 'hidden', 
                backgroundColor: 'rgba(0,0,0,0.02)',
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) vid.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                const vid = e.currentTarget.querySelector('video');
                if (vid) vid.style.transform = 'scale(1)';
              }}
            >
              <video 
                src={"/assets/Vedios/" + video} 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'block', 
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transformOrigin: 'center center'
                }} 
              />
            </div>
          ))}
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




