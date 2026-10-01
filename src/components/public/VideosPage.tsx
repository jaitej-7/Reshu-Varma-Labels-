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
  const { setActivePage } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Smooth, subtle reveal for EACH video as it scrolls into view
      const items = gsap.utils.toArray('.video-item');
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <main className="site-shell" ref={containerRef}>
      {/* ── Fixed Navigation Bar ── */}
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
              setActivePage('home');
            }}
            href="#home"
          >
            <i aria-hidden="true" />
            BACK TO HOME
          </a>
        </nav>
      </header>

      {/* ── Background SVG Graphic ── */}
      <div className="bg-graphic" aria-hidden="true">
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

      <div className="videos-container" style={{ position: 'relative', zIndex: 1, padding: '160px 5vw 100px', display: 'flex', flexDirection: 'column', gap: '100px', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: '24px', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: '20px' }}>
          CAMPAIGNS & FILMS
        </h1>
        
        {VIDEO_LIST.map((video, idx) => (
          <div key={idx} className="video-item" style={{ 
            width: '100%', 
            maxWidth: '420px', // Perfect editorial phone-ratio width
            aspectRatio: '4/5', // Beautiful subtle vertical ratio
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)' 
          }}>
            <video 
              src={`/assets/Vedios/${video}`} 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};
