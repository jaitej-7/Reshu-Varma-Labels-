import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { useAppStore } from '../../lib/store';

gsap.registerPlugin(ScrollTrigger);

export const CategoryPage: React.FC = () => {
  const { categories, activeCategorySlug, setActivePage, setSelectedImageModal } = useAppStore();

  const waveRef = useRef<SVGSVGElement>(null);
  const shellRef = useRef<HTMLElement>(null);

  const activeCategories = categories.filter(c => c.status === 'active');

  const categorizedImages = useMemo(() => [
    {
      slug: 'kanchi-silk-sarees',
      name: 'Kanchi Silk Sarees',
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
      name: 'Bridal Lehengas',
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
      name: 'Designer Blouses',
      images: [
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
      ]
    },
    {
      slug: 'bridal-veils',
      name: 'Bridal Veils',
      images: [
        '/assets/Bridesmaid/IMG_1829.webp',
        '/assets/Bridesmaid/IMG_1830.webp',
        '/assets/Bridesmaid/IMG_1831.webp',
        '/assets/Bridesmaid/IMG_3905.webp',
        '/assets/Bridesmaid/IMG_4281.webp',
        '/assets/Bridesmaid/IMG_4411.webp',
        '/assets/Bridesmaid/IMG_5697.webp',
        '/assets/Bridesmaid/IMG_7331.webp',
        '/assets/Bridesmaid/IMG_7606.webp',
        '/assets/Bridesmaid/IMG_0696.webp',
      ]
    },
    {
      slug: 'mens-wear',
      name: "Men's Wear",
      images: [
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
      ]
    }
  ], []);

  const currentCategory = categorizedImages.find(c => c.slug === activeCategorySlug) || categorizedImages[0];

  useEffect(() => {
    // Smooth scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000); gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.grid-item');
      gsap.fromTo(items, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
      );
    }, shellRef);

    return () => {
      lenis.destroy(); gsap.ticker.remove(raf);
      ctx.revert();
    };
  }, [currentCategory.slug]);

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

  return (
    <main className="site-shell" ref={shellRef}>
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
          {activeCategories.map((cat) => {
            const count = categorizedImages.find(c => c.slug === cat.slug)?.images.length || 0;
            return (
              <a
                key={cat.id}
                data-nav-slug={cat.slug}
                className={"nav-link " + (currentCategory.slug === cat.slug ? 'is-active' : '')}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage('category', cat.slug);
                }}
                href={"#" + cat.slug}
              >
                <i aria-hidden="true" />
                <span>{cat.name.toUpperCase()} <span>({count})</span></span>
              </a>
            );
          })}
        </nav>
      </header>

      <div className="bg-graphic" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <svg
          ref={waveRef}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
        >
          <path d="M0,200 C300,300 700,100 1000,200 L1000,1000 L0,1000 Z" fill="none" stroke="var(--muted)" strokeWidth="0.5" opacity="0.2" />
          <path d="M0,400 C300,500 700,300 1000,400 L1000,1000 L0,1000 Z" fill="none" stroke="var(--muted)" strokeWidth="0.5" opacity="0.15" />
          <path d="M0,600 C300,700 700,500 1000,600 L1000,1000 L0,1000 Z" fill="none" stroke="var(--muted)" strokeWidth="0.5" opacity="0.1" />
        </svg>
      </div>

      <div className="vertical-gallery-wrap" style={{ position: 'relative', zIndex: 1, padding: '160px 2rem 100px 2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh' }}>
        <section id={currentCategory.slug} className="category-section" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '24px', letterSpacing: '0.1em', marginBottom: '4rem', color: 'var(--ink)', textAlign: 'center', opacity: 0.8 }}>
            {currentCategory.name.toUpperCase()}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', width: '100%' }}>
            {currentCategory.images.map((imgSrc, idx) => (
              <div 
                key={currentCategory.slug + "-" + idx} 
                className="grid-item"
                onClick={() => setSelectedImageModal(imgSrc)}
                style={{ 
                  aspectRatio: '1 / 1',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={imgSrc} 
                  alt={currentCategory.name + " " + (idx + 1)} 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transformOrigin: 'center center'
                  }} 
                />
              </div>
            ))}
          </div>
        </section>
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

      <div className="grain" aria-hidden="true" style={{ position: 'fixed' }} />
    </main>
  );
};


