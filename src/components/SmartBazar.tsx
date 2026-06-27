import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// @ts-ignore
import imgBazar1  from '../assets/bazar1.jpg';
// @ts-ignore
import imgBazar2  from '../assets/bazar2.jpg';
// @ts-ignore
import imgBazar3  from '../assets/bazar3.jpg';
// @ts-ignore
import imgBazar4  from '../assets/bazar4.jpg';
// @ts-ignore
import imgBazar5  from '../assets/bazar5.jpg';
// @ts-ignore
import imgBazar6  from '../assets/bazar6.jpg';

const PRODUCTS = [
  { img: imgBazar1, label: 'cat.manoush',    style: { gridColumn: 'span 2', gridRow: 'span 2' } },
  { img: imgBazar2, label: 'cat.salads',     style: { gridColumn: 'span 1', gridRow: 'span 1' } },
  { img: imgBazar3, label: 'cat.handmade',   style: { gridColumn: 'span 1', gridRow: 'span 1' } },
  { img: imgBazar4, label: 'cat.jordanian',  style: { gridColumn: 'span 1', gridRow: 'span 2' } },
  { img: imgBazar5, label: 'cat.food',       style: { gridColumn: 'span 1', gridRow: 'span 1' } },
  { img: imgBazar6, label: 'cat.food',       style: { gridColumn: 'span 2', gridRow: 'span 1' } },
];

export default function SmartBazar() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="bazar"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--accent-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            {t('bazar.subtitle')}
          </p>

          <h2 style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '20px',
          }}>
            {t('bazar.title')}
          </h2>

          <p style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.7,
          }}>
            {t('bazar.desc')}
          </p>
        </motion.div>

        {/* ── Mosaic grid ────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '200px',
          gap: '12px',
        }} className="bazar-grid">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                transition: 'border-color 0.3s',
                cursor: 'pointer',
                ...p.style,
              }}
              className="bazar-card"
            >
              <img
                src={p.img}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                className="bazar-img"
              />
              <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: 'rgba(19,19,19,0.12)',
                transition: 'background-color 0.4s',
              }} className="bazar-overlay" />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '16px',
                opacity: 0,
                transition: 'opacity 0.3s',
              }} className="bazar-label">
                <span style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(19,19,19,0.85)',
                  border: '1px solid var(--accent-border)',
                  color: 'var(--accent)',
                  fontSize: '0.72rem',
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontWeight: 600,
                  letterSpacing: isArabic ? '0' : '0.1em',
                  textTransform: isArabic ? 'none' : 'uppercase',
                  padding: '4px 12px',
                  backdropFilter: 'blur(8px)',
                }}>
                  ◆ {t(p.label)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Partner button ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <a
            href="mailto:sponsorship@setatbyot.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 44px',
              backgroundColor: 'var(--primary)',
              border: '1px solid var(--accent-border)',
              borderRadius: '4px',
              color: 'var(--accent)',
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: isArabic ? '1.05rem' : '0.88rem',
              fontWeight: 600,
              letterSpacing: isArabic ? '0' : '0.08em',
              textTransform: isArabic ? 'none' : 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            className="bazar-btn"
          >
            <span>◆</span>
            {t('bazar.partnerBtn')}
          </a>
        </motion.div>
      </div>

      <style>{`
        .bazar-card:hover { border-color: rgba(230,195,100,0.6) !important; }
        .bazar-card:hover .bazar-img { transform: scale(1.06) !important; }
        .bazar-card:hover .bazar-overlay { background-color: transparent !important; }
        .bazar-card:hover .bazar-label { opacity: 1 !important; }
        .bazar-btn:hover { background: var(--primary-hover) !important; box-shadow: var(--accent-glow) !important; }
        @media (max-width: 768px) {
          .bazar-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 180px !important; }
          .bazar-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
        @media (max-width: 480px) {
          .bazar-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
