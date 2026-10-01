import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../lib/store';

export const CategoryPage: React.FC = () => {
  const { categories, setActivePage, setSelectedImageModal } = useAppStore();

  const heroRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);
  const lastActiveSlug = useRef<string | null>(null);

  // GSAP continuous smooth scroll state
  const targetY = useRef(0);
  const currentY = useRef(0);

  const activeCategories = categories.filter(c => c.status === 'active');

  // Categorize images manually to match the 5 slugs
  const categorizedImages = [
    {
      slug: 'kanchi-silk-sarees',
      images: [
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
      ]
    },
    {
      slug: 'bridal-lehengas',
      images: [
        '/assets/Bridesmaid/12cf8cd3-2f11-48e2-b11a-32bad4b3192b.webp',
        '/assets/Bridesmaid/3cc1a84b-517d-4f0f-8c27-73965c7961db.webp',
        '/assets/Bridesmaid/DSC04677.webp',
        '/assets/Bridesmaid/HAR_1218.webp',
        '/assets/Bridesmaid/IMG_0079.webp',
        '/assets/Bridesmaid/IMG_0696.webp',
        '/assets/Bridesmaid/IMG_1603.webp',
        '/assets/Bridesmaid/IMG_1829.webp',
        '/assets/Bridesmaid/IMG_1830.webp',
        '/assets/Bridesmaid/IMG_1831.webp',
      ]
    },
    {
      slug: 'designer-blouses',
      images: [
        '/assets/Bride and groom/12cf8cd3-2f11-48e2-b11a-32bad4b3192b.webp',
        '/assets/Bride and groom/IMG_0064.webp',
        '/assets/Bride and groom/IMG_0703.webp',
        '/assets/Bride and groom/IMG_0860.webp',
        '/assets/Bride and groom/IMG_0867.webp',
        '/assets/Bride and groom/IMG_3048.webp',
        '/assets/Bride and groom/IMG_3049.webp',
        '/assets/Bride and groom/IMG_3050.webp',
      ]
    },
    {
      slug: 'bridal-veils',
      images: [
        '/assets/Brides/IMG_3054.webp',
        '/assets/Brides/IMG_4051.webp',
        '/assets/Brides/IMG_5012.webp',
        '/assets/Brides/IMG_5789.webp',
        '/assets/Brides/IMG_5880.webp',
        '/assets/Brides/IMG_6032.webp',
        '/assets/Brides/IMG_6106.webp',
      ]
    },
    {
      slug: 'mens-wear',
      images: [
        '/assets/Bride and groom/IMG_3051.webp',
        '/assets/Bride and groom/IMG_3052.webp',
        '/assets/Bride and groom/IMG_3291.webp',
        '/assets/Bride and groom/IMG_3358.webp',
        '/assets/Bride and groom/IMG_3371.webp',
        '/assets/Bride and groom/IMG_3546.webp',
        '/assets/Bride and groom/IMG_3641.webp',
        '/assets/Bride and groom/IMG_4470.webp',
      ]
    }
  ];

  const allImages = categorizedImages.flatMap(cat => 
    cat.images.map(src => ({ src, slug: cat.slug }))
  );

  // -- 2. Animations ------------------------------------------------
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

  // -- 3. Wave Scroll GSAP Ticker & Scrollspy -------------------------
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reset scroll when mounted
    targetY.current = 0;
    currentY.current = 0;

    let maxScroll = 0;
    const updateMaxScroll = () => {
      maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.4);
    };
    
    window.addEventListener('resize', updateMaxScroll);
    setTimeout(updateMaxScroll, 100);

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
      
      let minAbsDist = Infinity;
      let closestSlug = lastActiveSlug.current;

      cards.forEach((card, i) => {
        const cardCenter = (card as HTMLElement).offsetLeft + ((card as HTMLElement).offsetWidth / 2);
        const dist = centerPos - cardCenter;
        const absDist = Math.abs(dist);

        // Find the category of the card closest to the center for scrollspy
        if (absDist < minAbsDist) {
          minAbsDist = absDist;
          const slug = card.getAttribute('data-slug');
          if (slug) closestSlug = slug;
        }

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

      // Directly update navbar classes for performance (avoiding React re-renders in ticker)
      if (closestSlug && closestSlug !== lastActiveSlug.current) {
        lastActiveSlug.current = closestSlug;
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('data-nav-slug') === closestSlug) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
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
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, []);

  // -- 4. Mouse Parallax --------------------------------------------
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
      {/* -- Header ------------------------------------------ */}
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
          >
            <i aria-hidden="true" />
            FILMS
          </a>
          {activeCategories.map((cat, i) => {
            const count = categorizedImages.find(c => c.slug === cat.slug)?.images.length || 0;
            return (
              <a
                key={cat.id}
                data-nav-slug={cat.slug}
                className={`nav-link ${i === 0 ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  // Find the first image of this category and scroll to it
                  const track = trackRef.current;
                  const firstCard = track?.querySelector(`.project-card[data-slug="${cat.slug}"]`) as HTMLElement;
                  if (track && firstCard) {
                    const centerOffset = window.innerWidth / 2 - firstCard.offsetWidth / 2;
                    targetY.current = Math.max(0, firstCard.offsetLeft - centerOffset);
                  }
                }}
                href={`#${cat.slug}`}
              >
                <i aria-hidden="true" />
                <span>{cat.name.toUpperCase()} <span>({count})</span></span>
              </a>
            );
          })}
        </nav>
      </header>

      {/* -- Background SVG Graphic --------------------------------- */}
      <div className="bg-graphic" aria-hidden="true">
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

      <section className="hero" ref={heroRef}>
        {/* Horizontal Slider with Wavy Motion */}
        <div className="gallery-wrap" id="work">
          <div className="gallery">
            <div className="gallery-track" ref={trackRef}>
              {allImages.map((img, i) => (
                <div 
                  key={i} 
                  className="project-card" 
                  data-slug={img.slug}
                  onClick={() => setSelectedImageModal(img.src)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={img.src} alt={img.slug} style={{ pointerEvents: 'none' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue" aria-hidden="true"><span /></div>
        
        {/* Bottom Labels (Matching Design) */}
        <div className="hero-label" style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '30px', fontSize: '10px', letterSpacing: '0.1em', opacity: 0.8 }}><span>RESHU VARMA LABEL &copy; 2026</span><a href="https://instagram.com/reshuvarmalabel" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>IG: @reshuvarmalabel</a><a href="https://facebook.com/reshuvarmalabel" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>FB: @reshuvarmalabel</a></div>
        <div className="hero-label label-right-top" style={{ bottom: '2rem', right: '2rem', fontSize: '10px', letterSpacing: '0.1em', opacity: 0.8 }}>
          {allImages.length} PRODUCTS
        </div>
      </section>

      {/* Film grain */}
      <div className="grain" aria-hidden="true" />
    </main>
  );
};
