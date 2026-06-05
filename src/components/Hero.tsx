import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// ── Hero images ────────────────────────────────────────────────────────────
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.jpg';
import hero5 from '../assets/hero5.jpg';
import hero6 from '../assets/hero6.jpg';

const SLIDES = [hero1, hero2, hero3, hero4, hero5, hero6];

// How long each slide stays (ms)
const SLIDE_DURATION = 4500;

// ── Scroll helper ──────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Hero component ─────────────────────────────────────────────────────────
export default function Hero() {
  const { language, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const isArabic = language === 'ar';

  // Auto-advance slides unless user hovered over dots
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Slideshow background ──────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>

        {/* Images — crossfade using AnimatePresence */}
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={SLIDES[current]}
            alt={`Hero slide ${current + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
        </AnimatePresence>

        {/* Dark gradient overlay — bottom is fully dark, top is semi-transparent */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--background) 0%, rgba(19,19,19,0.65) 50%, rgba(19,19,19,0.25) 100%)',
        }} />
      </div>

      {/* ── Text + buttons ────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
        textAlign: 'center',
        marginTop: '80px', // offset for navbar height
      }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >

          {/* ── Title ─────────────────────────────────────── */}
          {isArabic ? (
            <h1 style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              color: 'var(--foreground)',
              lineHeight: 1.1,
              marginBottom: '24px',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}>
              {t('hero.title')}
            </h1>
          ) : (
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 500,
              color: 'var(--foreground)',
              lineHeight: 1.1,
              marginBottom: '24px',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}>
              Setat <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Byot</em>
            </h1>
          )}

          {/* ── Subtitle ──────────────────────────────────── */}
          <p style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'rgba(229,226,225,0.92)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
            fontWeight: 400,
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>
            {t('hero.subtitle')}
          </p>

          {/* ── Buttons ───────────────────────────────────── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>

            {/* Primary — Download App */}
            <button
              style={{
                backgroundColor: 'var(--primary)',
                border: '1px solid var(--accent-border)',
                borderRadius: '4px',
                padding: '14px 36px',
                color: 'var(--accent)',
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: isArabic ? '1.05rem' : '0.9rem',
                fontWeight: 600,
                letterSpacing: isArabic ? '0' : '0.06em',
                textTransform: isArabic ? 'none' : 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s',
                minWidth: '180px',
              }}
              className="hero-btn-primary"
            >
              {t('nav.download')}
            </button>

            {/* Secondary — Explore Platform */}
            <button
              onClick={() => scrollTo('process')}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--accent)',
                borderRadius: '4px',
                padding: '14px 36px',
                color: 'var(--accent)',
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: isArabic ? '1.05rem' : '0.9rem',
                fontWeight: 600,
                letterSpacing: isArabic ? '0' : '0.06em',
                textTransform: isArabic ? 'none' : 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s',
                minWidth: '180px',
              }}
              className="hero-btn-secondary"
            >
              {t('hero.explore')}
            </button>

          </div>
        </motion.div>
      </div>

      {/* ── Slide dot indicators ──────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
        // Pause auto-advance when hovering dots
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '28px' : '10px',
              height: '10px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              backgroundColor: i === current
                ? 'var(--accent)'
                : 'rgba(255,255,255,0.3)',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Scoped hover styles ───────────────────────────── */}
      <style>{`
        .hero-btn-primary:hover {
          background: var(--primary-hover) !important;
          box-shadow: var(--accent-glow) !important;
        }
        .hero-btn-secondary:hover {
          background: var(--accent-dim) !important;
          box-shadow: var(--accent-glow) !important;
        }

        /* Mobile: stack buttons full width */
        @media (max-width: 480px) {
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100% !important;
            min-width: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
