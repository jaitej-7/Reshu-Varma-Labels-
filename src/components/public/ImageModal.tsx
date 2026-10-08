import React, { useEffect } from 'react';
import { useAppStore } from '../../lib/store';
import gsap from 'gsap';

export const ImageModal: React.FC = () => {
  const { selectedImageModal, setSelectedImageModal } = useAppStore();

  useEffect(() => {
    if (selectedImageModal) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.image-modal-overlay',
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(20px)', duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.image-modal-content',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedImageModal]);

  if (!selectedImageModal) return null;

  const handleClose = () => {
    gsap.to('.image-modal-overlay', { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3 });
    gsap.to('.image-modal-content', { 
      y: 30, opacity: 0, scale: 0.95, duration: 0.3, 
      onComplete: () => setSelectedImageModal(null) 
    });
  };

  return (
    <div 
      className="image-modal-overlay" 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(234, 225, 216, 0.85)', // EAE1D8 with opacity
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}
      onClick={handleClose}
    >
      <button 
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '30px',
          right: '40px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div 
        className="image-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          width: 'auto',
          maxWidth: '95vw',
          height: 'auto', 
          minHeight: '550px',
          maxHeight: '92vh',
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
        }}
      >
        {/* Left Side: Auto-sized Clear Image / Video */}
        <div style={{ alignSelf: 'stretch', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selectedImageModal.match(/\.(mp4|webm|mov|ogg)$/i) ? (
            <video 
              src={selectedImageModal} 
              autoPlay 
              loop 
              muted 
              playsInline
              controls
              style={{ width: 'auto', height: '100%', maxHeight: '92vh', objectFit: 'contain', display: 'block', outline: 'none' }} 
            />
          ) : (
            <img 
              src={selectedImageModal} 
              alt="Selected look" 
              style={{ width: 'auto', height: '100%', maxHeight: '92vh', objectFit: 'contain', display: 'block' }} 
            />
          )}
        </div>

        {/* Right Side: Inquiry Form */}
        <div 
          className="form-scroll-container"
          style={{ width: '450px', flexShrink: 0, padding: '40px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflowY: 'auto', backgroundColor: '#fff' }}
        >
          <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', letterSpacing: '0.08em', marginBottom: '10px', color: 'var(--ink)' }}>
            INQUIRE ABOUT THIS LOOK
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', marginBottom: '30px', lineHeight: '1.6' }}>
            Leave your details below and our bridal atelier team will get back to you with pricing, customization options, and availability.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! Our atelier team will contact you shortly.");
              handleClose();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--ink)' }}>FULL NAME *</label>
              <input required type="text" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px', backgroundColor: 'transparent' }} placeholder="Your Name" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--ink)' }}>EMAIL ADDRESS *</label>
              <input required type="email" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px', backgroundColor: 'transparent' }} placeholder="you@example.com" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--ink)' }}>PHONE NUMBER</label>
              <input type="tel" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px', backgroundColor: 'transparent' }} placeholder="+91 00000 00000" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--ink)' }}>ANY SPECIFIC REQUESTS?</label>
              <textarea style={{ width: '100%', boxSizing: 'border-box', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px', resize: 'none', height: '60px', backgroundColor: 'transparent' }} placeholder="Customizations, event date, etc." />
            </div>

            <button 
              type="submit"
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '16px',
                backgroundColor: 'var(--ink)',
                color: '#fff',
                border: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                letterSpacing: '0.2em',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A3D36'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ink)'}
            >
              SEND INQUIRY
            </button>
          </form>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for the form container */
        .form-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .form-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 900px) {
          .image-modal-content {
            flex-direction: column !important;
            overflow-y: auto !important;
            width: 100% !important;
            height: auto !important;
            max-height: 90vh !important;
          }
          .image-modal-content > div:first-child {
            height: 50vh !important;
            width: 100% !important;
          }
          .image-modal-content > div:last-child {
            width: 100% !important;
            padding: 40px 20px !important;
          }
          .image-modal-overlay {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

