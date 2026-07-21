import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gem, Medal, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ── Sponsor data model ──────────────────────────────────────────────────────
// Add {name, logo} objects to the arrays below as sponsors sign on — the
// matching seat automatically swaps its dashed placeholder for a logo card.
// No layout changes needed; empty seats keep rendering the placeholder.
interface Sponsor {
  name: string;
  logo: string;
}

const DIAMOND_SEATS = 4;
const GOLD_SEATS = 10;

const DIAMOND_SPONSORS: Sponsor[] = [];
const GOLD_SPONSORS: Sponsor[] = [];

const SPONSOR_MAILTO = `mailto:Sponsorship@setatbyot.com?subject=${encodeURIComponent('طلب رعاية - ستات بيوت')}`;

function IconBox({ children, color, size = 38 }: { children: React.ReactNode; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      border: `1px solid ${color}`,
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      border: `1px solid ${color}`,
      borderRadius: '999px',
      padding: '5px 14px',
      fontSize: '0.78rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
      color,
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function DiamondCard({ index, sponsor, fontAr }: { index: number; sponsor?: Sponsor; fontAr: string }) {
  const { t } = useLanguage();

  if (sponsor) {
    return (
      <div style={{
        minHeight: '140px',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        backgroundColor: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}>
        <img src={sponsor.logo} alt={sponsor.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    );
  }

  return (
    <div
      className="diamond-placeholder"
      style={{
        minHeight: '140px',
        borderRadius: '12px',
        border: '1.5px dashed var(--sponsor-diamond)',
        backgroundColor: 'var(--background)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '8px',
        padding: '20px',
        animationDelay: `${index * 0.6}s`,
      }}
    >
      <Gem size={26} strokeWidth={1.5} style={{ color: 'var(--sponsor-diamond-strong)' }} />
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)', fontFamily: fontAr, textAlign: 'center' }}>
        {t('sponsors.diamond.placeholder.title')}
      </span>
      <span style={{ fontSize: '0.72rem', color: 'var(--sponsor-diamond-strong)', fontFamily: fontAr, textAlign: 'center' }}>
        {t('sponsors.diamond.placeholder.sub')}
      </span>
    </div>
  );
}

function GoldCard({ sponsor, fontAr }: { sponsor?: Sponsor; fontAr: string }) {
  const { t } = useLanguage();

  if (sponsor) {
    return (
      <div style={{
        minHeight: '90px',
        borderRadius: '10px',
        border: '1px solid var(--border)',
        backgroundColor: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px',
      }}>
        <img src={sponsor.logo} alt={sponsor.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '90px',
      borderRadius: '10px',
      border: '1px dashed var(--accent-border)',
      backgroundColor: 'var(--background)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '6px',
      padding: '14px',
    }}>
      <Medal size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--foreground)', fontFamily: fontAr, textAlign: 'center' }}>
        {t('sponsors.gold.placeholder')}
      </span>
    </div>
  );
}

export default function Sponsors() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fontAr    = isArabic ? 'var(--font-arabic)' : 'var(--font-sans)';
  const fontTitle = isArabic ? 'var(--font-arabic)' : 'var(--font-serif)';
  const tAlign    = isArabic ? 'right' as const : 'left' as const;

  return (
    <section
      id="sponsors"
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
            {t('sponsors.eyebrow')}
          </p>

          <h2 style={{
            fontFamily: fontTitle,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '20px',
          }}>
            {t('sponsors.title')}
          </h2>

          <p style={{
            fontFamily: fontAr,
            fontSize: '1.05rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.7,
          }}>
            {t('sponsors.subtitle')}
          </p>
        </motion.div>

        {/* ── Diamond tier ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isArabic ? 'row' : 'row-reverse',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconBox color="var(--sponsor-diamond-strong)"><Gem size={17} strokeWidth={1.5} /></IconBox>
              <h3 style={{ fontFamily: fontTitle, fontSize: '1.2rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
                {t('sponsors.diamond.title')}
              </h3>
            </div>
            <Pill color="var(--sponsor-diamond-strong)">{t('sponsors.diamond.badge')}</Pill>
          </div>

          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: 'var(--muted-foreground)',
            fontFamily: fontAr,
            lineHeight: 1.6,
            marginBottom: '24px',
            textAlign: tAlign,
          }}>
            <Star size={14} strokeWidth={1.5} style={{ color: 'var(--sponsor-diamond-strong)', flexShrink: 0 }} />
            {t('sponsors.diamond.benefit')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="diamond-grid">
            {Array.from({ length: DIAMOND_SEATS }).map((_, i) => (
              <DiamondCard key={i} index={i} sponsor={DIAMOND_SPONSORS[i]} fontAr={fontAr} />
            ))}
          </div>
        </motion.div>

        {/* ── Gold tier ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isArabic ? 'row' : 'row-reverse',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconBox color="var(--accent)"><Medal size={17} strokeWidth={1.5} /></IconBox>
              <h3 style={{ fontFamily: fontTitle, fontSize: '1.2rem', fontWeight: isArabic ? 700 : 500, color: 'var(--foreground)', margin: 0 }}>
                {t('sponsors.gold.title')}
              </h3>
            </div>
            <Pill color="var(--accent)">{t('sponsors.gold.badge')}</Pill>
          </div>

          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            color: 'var(--muted-foreground)',
            fontFamily: fontAr,
            lineHeight: 1.6,
            marginBottom: '24px',
            textAlign: tAlign,
          }}>
            <Star size={14} strokeWidth={1.5} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            {t('sponsors.gold.benefit')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }} className="gold-grid">
            {Array.from({ length: GOLD_SEATS }).map((_, i) => (
              <GoldCard key={i} sponsor={GOLD_SPONSORS[i]} fontAr={fontAr} />
            ))}
          </div>
        </motion.div>

        {/* ── CTA ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '56px' }}
        >
          <a
            href={SPONSOR_MAILTO}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 44px',
              backgroundColor: 'var(--primary)',
              border: '1px solid var(--accent-border)',
              borderRadius: '4px',
              color: 'var(--accent)',
              fontFamily: fontAr,
              fontSize: isArabic ? '1.05rem' : '0.88rem',
              fontWeight: 600,
              letterSpacing: isArabic ? '0' : '0.08em',
              textTransform: isArabic ? 'none' : 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            className="sponsors-cta-btn"
          >
            <span style={{ fontSize: '0.9rem' }}>◆</span>
            {t('sponsors.cta')}
          </a>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '14px', fontFamily: 'var(--font-sans)' }}>
            Sponsorship@setatbyot.com
          </p>
        </motion.div>
      </div>

      <style>{`
        #sponsors {
          --sponsor-diamond: #85B7EB;
          --sponsor-diamond-strong: #378ADD;
        }

        @keyframes sponsorDiamondPulse {
          0%, 100% { border-color: var(--sponsor-diamond); }
          50% { border-color: var(--sponsor-diamond-strong); }
        }
        .diamond-placeholder {
          animation: sponsorDiamondPulse 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .diamond-placeholder { animation: none !important; }
        }

        .sponsors-cta-btn:hover {
          background: var(--primary-hover) !important;
          box-shadow: var(--accent-glow) !important;
        }

        @media (max-width: 768px) {
          .diamond-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gold-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #sponsors > div { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}
