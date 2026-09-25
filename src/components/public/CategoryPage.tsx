import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../lib/store';

export const CategoryPage: React.FC = () => {
  // Fetch real data from your Zustand store!
  const { categories, products, activeCategorySlug, setActivePage } = useAppStore();

  const heroRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

  // GSAP continuous smooth scroll state
  const targetY = useRef(0);
  const currentY = useRef(0);

  // ── 1. Dynamic Data ────────────────────────────────────────────────────────
  const activeCategories = categories.filter(c => c.status === 'active');
  const activeCategory = activeCategories.find(c => c.slug === activeCategorySlug) || activeCategories[0];
  const categoryProducts = products.filter(p => p.category === activeCategory?.name);
  
  // The complete portfolio of images from the authentic assets folder!
  const DESIGN_IMAGES = [
    '/assets/Bride and groom/12cf8cd3-2f11-48e2-b11a-32bad4b3192b.webp',
    '/assets/Bride and groom/IMG_0064.webp',
    '/assets/Bride and groom/IMG_0703.webp',
    '/assets/Bride and groom/IMG_0860.webp',
    '/assets/Bride and groom/IMG_0867.webp',
    '/assets/Bride and groom/IMG_3048.webp',
    '/assets/Bride and groom/IMG_3049.webp',
    '/assets/Bride and groom/IMG_3050.webp',
    '/assets/Bride and groom/IMG_3051.webp',
    '/assets/Bride and groom/IMG_3052.webp',
    '/assets/Bride and groom/IMG_3291.webp',
    '/assets/Bride and groom/IMG_3358.webp',
    '/assets/Bride and groom/IMG_3371.webp',
    '/assets/Bride and groom/IMG_3546.webp',
    '/assets/Bride and groom/IMG_3641.webp',
    '/assets/Bride and groom/IMG_4470.webp',
    '/assets/Bride and groom/IMG_4962.webp',
    '/assets/Bride and groom/IMG_5890.webp',
    '/assets/Bride and groom/IMG_6035.webp',
    '/assets/Bride and groom/IMG_7326.webp',
    '/assets/Bride and groom/IMG_8200.webp',
    '/assets/Bride and groom/IMG_9734.webp',
    '/assets/Brides/0efa0af2-5ea7-418d-ba87-310c31906121.webp',
    '/assets/Brides/IMG_0245.webp',
    '/assets/Brides/IMG_0325.webp',
    '/assets/Brides/IMG_0696.webp',
    '/assets/Brides/IMG_0864.webp',
    '/assets/Brides/IMG_1395.webp',
    '/assets/Brides/IMG_1456.webp',
    '/assets/Brides/IMG_1981.webp',
    '/assets/Brides/IMG_2913.webp',
    '/assets/Brides/IMG_3032.webp',
    '/assets/Brides/IMG_3054.webp',
    '/assets/Brides/IMG_4051.webp',
    '/assets/Brides/IMG_5012.webp',
    '/assets/Brides/IMG_5789.webp',
    '/assets/Brides/IMG_5880.webp',
    '/assets/Brides/IMG_6032.webp',
    '/assets/Brides/IMG_6106.webp',
    '/assets/Brides/IMG_6114.webp',
    '/assets/Brides/IMG_6824.webp',
    '/assets/Brides/IMG_7158.webp',
    '/assets/Brides/IMG_8201.webp',
    '/assets/Brides/IMG_8229.webp',
    '/assets/Brides/IMG_8458.webp',
    '/assets/Brides/IMG_9089.webp',
    '/assets/Bridesmaid/12cf8cd3-2f11-48e2-b11a-32bad4b3192b.webp',
    '/assets/Bridesmaid/3cc1a84b-517d-4f0f-8c27-73965c7961db.webp',
    '/assets/Bridesmaid/4e446d38-de19-41cf-be68-db2da51b6d3f.webp',
    '/assets/Bridesmaid/6AA675CA-F8B6-48C9-827B-469A8B350615.webp',
    '/assets/Bridesmaid/bfe06a41-1639-455f-8623-e2004b7b5ae1.webp',
    '/assets/Bridesmaid/DSC04677.webp',
    '/assets/Bridesmaid/HAR_1218.webp',
    '/assets/Bridesmaid/IMG_0079.webp',
    '/assets/Bridesmaid/IMG_0696.webp',
    '/assets/Bridesmaid/IMG_1603.webp',
    '/assets/Bridesmaid/IMG_1829.webp',
    '/assets/Bridesmaid/IMG_1830.webp',
    '/assets/Bridesmaid/IMG_1831.webp',
    '/assets/Bridesmaid/IMG_3905.webp',
    '/assets/Bridesmaid/IMG_4281.webp',
    '/assets/Bridesmaid/IMG_4411.webp',
    '/assets/Bridesmaid/IMG_5697.webp',
    '/assets/Bridesmaid/IMG_7331.webp',
    '/assets/Bridesmaid/IMG_7606.webp',
    '/assets/Bridesmaid/IMG_8203.webp',
    '/assets/Bridesmaid/IMG_9611.webp'
  ];

  const images = DESIGN_IMAGES;

  // ── 2. Animations ──────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.site-header', {
        y: -18, opacity: 0, duration: 0.9,
        ease: 'power3.out', delay: 0.1,
      });
      gsap.from(['.hero-label', '.scroll-cue'], {
        y: 12, opacity: 0, duration: 0.8,
        ease: 'power2.out', delay: 0.35, stagger: 0.08,
      });
      gsap.from('.project-side', {
        opacity: 0, duration: 0.7,
        ease: 'power2.out', delay: 0.5,
      });
    });
    return () => ctx.revert();
  }, []);

  // ── 3. Wave Scroll GSAP Ticker ───────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reset scroll when category changes so we start at the beginning
    targetY.current = 0;
    currentY.current = 0;

    const updateMaxScroll = () => {
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      return Math.max(0, trackWidth - windowWidth);
    };
    
    let maxScroll = updateMaxScroll();
    window.addEventListener('resize', () => { maxScroll = updateMaxScroll(); });

    // Re-calculate after a slight delay to ensure images have painted
    setTimeout(() => { maxScroll = updateMaxScroll(); }, 100);

    const tick = () => {
      currentY.current = gsap.utils.interpolate(currentY.current, targetY.current, 0.08);

      if (Math.abs(targetY.current - currentY.current) < 0.1) {
        currentY.current = targetY.current;
      }

      gsap.set(track, {
        x: -currentY.current, // Translate horizontally
        force3D: true
      });
      
      const centerPos = currentY.current + (window.innerWidth / 2);
      const cards = track.querySelectorAll('.project-card');
      
      cards.forEach((card, i) => {
        const cardCenter = (card as HTMLElement).offsetLeft + ((card as HTMLElement).offsetWidth / 2);
        const dist = centerPos - cardCenter;
        const absDist = Math.abs(dist);

        // WAVE MOTION (S-curve based on screen position)
        const waveY = Math.sin((dist / window.innerWidth) * Math.PI * 1.5) * 140;

        // Scaling & Saturation
        const scale = gsap.utils.mapRange(0, window.innerWidth / 1.5, 1.1, 0.8, absDist);
        const clampedScale = Math.max(0.8, Math.min(1.1, scale));
        
        const saturate = gsap.utils.mapRange(0, window.innerWidth / 1.5, 1.1, 0.3, absDist);
        const clampedSaturate = Math.max(0.3, Math.min(1.1, saturate));
        
        gsap.set(card, { y: waveY });
        gsap.set(card.querySelector('img'), {
          scale: clampedScale,
          filter: `saturate(${clampedSaturate}) contrast(1.02)`,
        });
      });
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY.current += e.deltaY;
      targetY.current = Math.max(0, Math.min(targetY.current, maxScroll));
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('wheel', onWheel);
    };
  }, [activeCategorySlug, categoryProducts.length]);

  // ── 4. Mouse Parallax ────────────────────────────────────────────────────
  useEffect(() => {
    const hero = heroRef.current;
    const wave = waveRef.current;
    if (!hero || !wave) return;

    const setX = gsap.quickTo(wave, '--mx', { duration: 1.4, ease: 'power1.out' });
    const setY = gsap.quickTo(wave, '--my', { duration: 1.4, ease: 'power1.out' });

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      setX(((e.clientX - r.left) / r.width - 0.5) * 24);
      setY(((e.clientY - r.top) / r.height - 0.5) * 16);
    };
    const onLeave = () => { setX(0); setY(0); };

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <main className="site-shell">
      {/* ── Header ──────────────────────────────────────────────────────── */}
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
          {/* Dynamically render categories from the store as navigation links */}
          {activeCategories.map(cat => (
            <a
              key={cat.id}
              className={`nav-link ${activeCategory?.id === cat.id ? 'is-active' : ''}`}
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

      {/* ── Hero / Gallery ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="hero" id="top">
        {/* Wave background */}
        <div className="wave-field" aria-hidden="true">
          <svg ref={waveRef} viewBox="0 0 1200 800" preserveAspectRatio="none">
            <g className="wave wave-a">
              <path d="M-80 160 C 120 80, 250 245, 470 155 S 820 75, 1280 175"/>
              <path d="M-80 240 C 140 160, 265 315, 500 230 S 835 155, 1280 255"/>
              <path d="M-80 320 C 120 245, 300 385, 530 305 S 880 235, 1280 335"/>
            </g>
            <g className="wave wave-b">
              <path d="M-80 510 C 150 420, 300 585, 530 500 S 900 420, 1280 530"/>
              <path d="M-80 590 C 120 500, 285 665, 500 575 S 860 500, 1280 610"/>
              <path d="M-80 670 C 140 580, 290 745, 540 650 S 880 580, 1280 690"/>
            </g>
          </svg>
        </div>

        <div className="hero-label label-left-top">RESHU VARMA LABEL ©2026</div>
        
        {/* Shows product count dynamically! */}
        <div className="hero-label label-right-top">{images.length} PRODUCTS</div>

        {/* Left Sidebar Info */}
        <div className="project-side side-left" aria-hidden="true">
          <span className="project-title">{activeCategory?.name}</span>
        </div>

        {/* Horizontal Slider with Wavy Motion */}
        <div className="gallery-wrap" id="work">
          <div className="gallery">
            <div className="gallery-track" ref={trackRef}>
              {images.map((src, i) => (
                <div key={i} className="project-card">
                  <img src={src} alt={`${activeCategory?.name} ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Info */}
        <div className="project-side side-right" aria-hidden="true">
          <span className="project-title">COLLECTION</span>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* Film grain */}
      <div className="grain" aria-hidden="true" />
    </main>
  );
};
