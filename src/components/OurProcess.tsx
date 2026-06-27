import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// ── Step icons as clean SVGs (no lucide dependency needed) ─────────────────
const ICONS = {
  join: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  ),
  training: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  production: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" y1="17" x2="18" y2="17"/>
    </svg>
  ),
  quality: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  publish: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
  delivery: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
};

const STEPS = [
  { id: 1, icon: 'join',       titleKey: 'process.step1.title', descKey: 'process.step1.desc' },
  { id: 2, icon: 'training',   titleKey: 'process.step2.title', descKey: 'process.step2.desc' },
  { id: 3, icon: 'production', titleKey: 'process.step3.title', descKey: 'process.step3.desc' },
  { id: 4, icon: 'quality',    titleKey: 'process.step4.title', descKey: 'process.step4.desc' },
  { id: 5, icon: 'publish',    titleKey: 'process.step5.title', descKey: 'process.step5.desc' },
  { id: 6, icon: 'delivery',   titleKey: 'process.step6.title', descKey: 'process.step6.desc' },
];

export default function OurProcess() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="process"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--accent-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gold line accent at top center */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '1px', height: '80px',
        background: 'linear-gradient(to bottom, var(--accent), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>
          <h2 style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '16px',
          }}>
            {t('process.title')}
          </h2>
          <div style={{ height: '1px', width: '96px', background: 'linear-gradient(to right, transparent, var(--accent), transparent)', margin: '0 auto' }} />
        </motion.div>

        {/* Steps grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="process-grid">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                position: 'relative',
                padding: '32px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              className="process-card"
            >
              {/* Corner accents (shown on hover via CSS) */}
              <div className="corner tl" style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)', opacity: 0, transition: 'opacity 0.3s' }} />
              <div className="corner tr" style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)', opacity: 0, transition: 'opacity 0.3s' }} />
              <div className="corner bl" style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)', opacity: 0, transition: 'opacity 0.3s' }} />
              <div className="corner br" style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)', opacity: 0, transition: 'opacity 0.3s' }} />

              {/* Icon + number */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: '56px', height: '56px',
                    border: '1px solid var(--accent-border)',
                    backgroundColor: 'var(--surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }} className="process-icon-box">
                    {ICONS[step.icon as keyof typeof ICONS]}
                  </div>
                  {/* Step number badge */}
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    width: '22px', height: '22px',
                    backgroundColor: 'var(--accent)',
                    color: '#003737',
                    fontSize: '0.7rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-sans)',
                  }}>
                    {step.id}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: isArabic ? '1.05rem' : '0.95rem',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  lineHeight: 1.4,
                  paddingTop: '8px',
                }}>
                  {t(step.titleKey)}
                </h3>
              </div>

              <p style={{
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                fontSize: '0.875rem',
                color: 'var(--muted-foreground)',
                lineHeight: 1.7,
              }}>
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .process-card:hover {
          border-color: rgba(230,195,100,0.4) !important;
          box-shadow: 0 0 20px rgba(230,195,100,0.08) !important;
        }
        .process-card:hover .corner { opacity: 1 !important; }
        .process-card:hover .process-icon-box {
          border-color: var(--accent) !important;
          box-shadow: 0 0 15px rgba(230,195,100,0.2) !important;
        }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
