import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// @ts-ignore
import catFood       from '../assets/Creamy Cajun Sausage Pasta (One Pot).jpg';
// @ts-ignore
import catBeverages  from '../assets/milkshake.jpg';
import catHandmade   from '../assets/hero5.jpg';
// @ts-ignore
import catProcessing from '../assets/Harvesting many types of fermented gut healthy pickles in mason jars royalty free stock.jpg';

// Menu pages rendered from the current Setat Byot PDF menu.
import menu1 from '../assets/menu/setat-menu-page-1.png';
import menu2 from '../assets/menu/setat-menu-page-2.png';
import menu3 from '../assets/menu/setat-menu-page-3.png';
import menu4 from '../assets/menu/setat-menu-page-4.png';
import menu5 from '../assets/menu/setat-menu-page-5.png';
import menu6 from '../assets/menu/setat-menu-page-6.png';

const MENU_PAGES = [menu1, menu2, menu3, menu4, menu5, menu6];

const CUISINES = [
  { flag: '🇯🇴', key: 'cat.jordanian' },
  { flag: '🇵🇸', key: 'cat.palestinian' },
  { flag: '🇱🇧', key: 'cat.lebanese' },
  { flag: '🇸🇾', key: 'cat.syrian' },
  { flag: '🇲🇦', key: 'cat.moroccan' },
  { flag: '🇾🇪', key: 'cat.yemeni' },
  { flag: '🇮🇶', key: 'cat.iraqi' },
  { flag: '🇮🇹', key: 'cat.italian' },
  { flag: '🇲🇽', key: 'cat.mexican' },
  { flag: '🥗', key: 'cat.salads' },
  { flag: '🧆', key: 'cat.appetizers' },
  { flag: '🍰', key: 'cat.desserts' },
  { flag: '🧃', key: 'cat.drinks' },
  { flag: '🫓', key: 'cat.manoush' },
];

const CATEGORIES = [
  { id: 'food',       titleKey: 'cat.food',       descKey: 'cat.food.desc',       img: catFood       },
  { id: 'beverages',  titleKey: 'cat.beverages',   descKey: 'cat.beverages.desc',  img: catBeverages  },
  { id: 'handmade',   titleKey: 'cat.handmade',    descKey: 'cat.handmade.desc',   img: catHandmade   },
  { id: 'processing', titleKey: 'cat.processing',  descKey: 'cat.processing.desc', img: catProcessing },
];

function MenuModal({ onClose }: { onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '40px 16px',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%',
          color: '#fff',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        }}
        aria-label="Close menu"
      >
        <X size={20} />
      </button>

      {/* Menu images — click inside stops propagation so only backdrop closes */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {MENU_PAGES.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Menu page ${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            style={{
              width: '100%',
              borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              display: 'block',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Categories() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="categories"
      ref={ref}
      style={{
        padding: '100px 0',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--accent-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, var(--accent))' }} />
            <span style={{ color: 'var(--accent)' }}>◆</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, var(--accent))' }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '12px',
          }}>
            {t('categories.subtitle')}
          </p>
          <h2 style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: isArabic ? 700 : 500,
            color: 'var(--foreground)',
            marginBottom: '16px',
          }}>
            {t('categories.title')}
          </h2>
          <p style={{
            fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--muted-foreground)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            {t('categories.desc')}
          </p>
        </motion.div>

        {/* Cuisine tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '48px' }}
        >
          {CUISINES.map((c, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                fontSize: '0.78rem',
                color: 'var(--muted-foreground)',
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                cursor: 'default',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              className="cuisine-tag"
            >
              <span>{c.flag}</span>
              <span>{t(c.key)}</span>
            </span>
          ))}
        </motion.div>

        {/* Category cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="categories-grid">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--surface)',
              }}
              className="cat-card"
            >
              <img
                src={cat.img}
                alt={t(cat.titleKey)}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                }}
                className="cat-img"
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, var(--background) 0%, rgba(19,19,19,0.5) 50%, transparent 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid transparent',
                transition: 'border-color 0.3s',
                zIndex: 2,
                pointerEvents: 'none',
              }} className="cat-border" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 3 }}>
                <h3 style={{
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: isArabic ? 700 : 400,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                }}>
                  {t(cat.titleKey)}
                </h3>
                <p style={{
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.5,
                  opacity: 0,
                  transition: 'opacity 0.3s 0.05s',
                }} className="cat-desc">
                  {t(cat.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Menu button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 40px',
              border: '1px solid var(--accent-border)',
              backgroundColor: 'var(--primary)',
              color: 'var(--accent)',
              fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
              fontSize: isArabic ? '1.05rem' : '0.88rem',
              fontWeight: 600,
              letterSpacing: isArabic ? '0' : '0.08em',
              textTransform: isArabic ? 'none' : 'uppercase',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            className="menu-btn"
          >
            <span style={{ fontSize: '1rem' }}>◆</span>
            {t('categories.viewMenu')}
          </button>
        </motion.div>
      </div>

      {/* Menu modal */}
      <AnimatePresence>
        {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>

      <style>{`
        .cuisine-tag:hover { border-color: rgba(230,195,100,0.4) !important; color: var(--foreground) !important; }
        .cat-card:hover .cat-img { transform: scale(1.08) !important; }
        .cat-card:hover .cat-border { border-color: rgba(230,195,100,0.7) !important; }
        .cat-card:hover .cat-desc { opacity: 1 !important; }
        .menu-btn:hover { background: var(--primary-hover) !important; box-shadow: var(--accent-glow) !important; }
        @media (max-width: 900px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .categories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
