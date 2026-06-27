import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UtensilsCrossed, Heart, Users, ScrollText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
// @ts-ignore
import cateringImg from '../assets/10 Party Food Platters Ideas That Instantly Upgrade Any Celebration.jpg';

const FEATURES = [
  { icon: UtensilsCrossed, key: 'catering.feature1' },
  { icon: Heart,           key: 'catering.feature2' },
  { icon: Users,           key: 'catering.feature3' },
  { icon: ScrollText,      key: 'catering.feature4' },
];

export default function Catering() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="catering"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--accent-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '-160px', right: '-160px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(230,195,100,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-160px', left: '-160px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(10,74,74,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            {t('catering.subtitle')}
          </p>

          <h2 style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '20px',
          }}>
            {t('catering.title')}
          </h2>

          <p style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--muted-foreground)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            {t('catering.desc')}
          </p>
        </motion.div>

        {/* ── Body: features left, image right ───────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '56px',
          alignItems: 'center',
        }} className="catering-body">

          {/* Feature grid — 2 columns of 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {FEATURES.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '20px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                className="catering-feature"
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--accent-border)',
                  backgroundColor: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span style={{
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: isArabic ? '0.95rem' : '0.82rem',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  lineHeight: 1.4,
                }}>
                  {t(key)}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              {/* Gold frame */}
              <div style={{
                position: 'absolute', inset: '-8px',
                border: '1px solid var(--accent-border)',
                pointerEvents: 'none', zIndex: 2,
              }} />
              <img
                src={cateringImg}
                alt="Catering Services"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(19,19,19,0.5) 0%, transparent 60%)',
              }} />
              {/* ISO badge */}
              <div style={{
                position: 'absolute', bottom: '24px',
                left: isArabic ? 'auto' : '24px',
                right: isArabic ? '24px' : 'auto',
                backgroundColor: 'rgba(19,19,19,0.92)',
                border: '1px solid var(--accent-border)',
                padding: '12px 20px',
                backdropFilter: 'blur(8px)',
                zIndex: 3,
              }}>
                <p style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '4px' }}>
                  ◆ ISO Certified
                </p>
                <p style={{ color: 'rgba(229,226,225,0.85)', fontSize: '0.85rem', fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)' }}>
                  {t('catering.title')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CTA ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '56px' }}
        >
          <a
            href="mailto:catering@setatbyot.com"
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
            className="catering-btn"
          >
            <span style={{ fontSize: '0.9rem' }}>◆</span>
            {t('catering.cta')}
          </a>
        </motion.div>

      </div>

      <style>{`
        .catering-feature:hover {
          border-color: var(--accent-border) !important;
          box-shadow: 0 4px 20px rgba(230,195,100,0.07) !important;
        }
        .catering-btn:hover {
          background: var(--primary-hover) !important;
          box-shadow: var(--accent-glow) !important;
        }
        @media (max-width: 900px) {
          .catering-body { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #catering > div > div { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}
