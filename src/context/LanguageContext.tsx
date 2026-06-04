import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Translations = Record<string, Record<Language, string>>;


const translations: Translations = {
  // ── Navigation ──────────────────────────────────────
  'nav.home':       { en: 'Home',           ar: 'الرئيسية' },
  'nav.process':    { en: 'Our Process',    ar: 'كيف نعمل' },
  'nav.categories': { en: 'Categories',     ar: 'التصنيفات' },
  'nav.smartBazar': { en: 'Smart Bazar',    ar: 'السوق الذكي' },
  'nav.catering':   { en: 'Catering',       ar: 'خدمات الكيترينج' },
  'nav.about':      { en: 'About Us',       ar: 'من نحن' },
  'nav.download':   { en: 'Download App',   ar: 'حمل التطبيق' },

  // ── Hero ────────────────────────────────────────────
  'hero.title':    { en: 'Setat Byot', ar: 'ستات بيوت' },
  'hero.subtitle': {
    en: "The World's First Jordanian Smart Ecosystem for Home Kitchens, Handmade Businesses & Digital Food Services",
    ar: 'المنصة الأردنية الذكية الأولى عالميًا للمطابخ المنزلية والحرف اليدوية والخدمات الغذائية الرقمية',
  },
  'hero.desc': {
    en: 'Where innovation meets technology, and home-based ideas transform into successful entrepreneurial stories.',
    ar: 'حيث يلتقي الإبداع بالتكنولوجيا، وتتحول الأفكار المنزلية إلى قصص نجاح حقيقية.',
  },
  'hero.explore':  { en: 'Explore Platform', ar: 'استكشف المنصة' },

  // ── Platform Intro ───────────────────────────────────
  'intro.title': { en: 'Where Heritage Meets Technology', ar: 'حيث يلتقي التراث بالتكنولوجيا' },
  'intro.desc': {
    en: 'Setat Byot is a complete smart business environment connecting home kitchens, handmade businesses, food production services, and digital commerce into one seamless experience.',
    ar: 'ستات بيوت منظومة اقتصادية رقمية متكاملة تهدف إلى دعم الاقتصاد المحلي وتمكين المرأة وخلق فرص عمل حقيقية.',
  },
  'intro.stat1.val': { en: '500K+', ar: '+500K' },
  'intro.stat1.lbl': { en: 'Monthly Digital Reach',        ar: 'وصول رقمي شهري' },
  'intro.stat2.val': { en: '10,000+', ar: '+10,000' },
  'intro.stat2.lbl': { en: 'Targeted Home Businesses',     ar: 'مشروع منزلي مستهدف' },
  'intro.stat3.val': { en: '100+', ar: '+100' },
  'intro.stat3.lbl': { en: 'Commercial & Food Categories', ar: 'تصنيف غذائي وتجاري' },
  'intro.stat4.val': { en: '98%', ar: '98%' },
  'intro.stat4.lbl': { en: 'Customer Satisfaction Rate',   ar: 'معدل رضا العملاء' },

  // ── Services ────────────────────────────────────────
  'services.title': { en: 'Smart Digital Services',   ar: 'الخدمات الرقمية الذكية' },
  'services.desc': {
    en: 'A complete suite of smart digital services designed for home businesses, food establishments, and modern e-commerce.',
    ar: 'مجموعة متكاملة من الخدمات الرقمية الذكية المصممة لدعم المشاريع المنزلية والمنشآت الغذائية.',
  },
  'services.1':  { en: 'Home Kitchen Management',     ar: 'إدارة المطابخ المنزلية' },
  'services.2':  { en: 'Online Ordering Systems',     ar: 'أنظمة الطلب الإلكتروني' },
  'services.3':  { en: 'Product & Store Management',  ar: 'إدارة المنتجات والمتاجر' },
  'services.4':  { en: 'Delivery & Logistics',        ar: 'إدارة التوصيل واللوجستيات' },
  'services.5':  { en: 'Smart Payment Integration',   ar: 'أنظمة الدفع الإلكتروني' },
  'services.6':  { en: 'Virtual Exhibition',          ar: 'إدارة المعارض الافتراضية' },
  'services.7':  { en: 'Digital Marketing',           ar: 'التسويق الرقمي والإعلانات' },
  'services.8':  { en: 'Brand Identity Design',       ar: 'تصميم الهوية التجارية' },
  'services.9':  { en: 'Startup Support',             ar: 'دعم المشاريع الناشئة' },
  'services.10': { en: 'Analytics & Dashboards',      ar: 'أنظمة التحليل والإحصائيات' },
  'services.11': { en: 'UX/UI Optimization',          ar: 'إدارة تجربة المستخدم' },
  'services.12': { en: 'Security & Protection',       ar: 'أنظمة الحماية والأمان' },
  'services.13': { en: 'Technical Support',           ar: 'الدعم الفني والتشغيلي' },

  // ── Process ─────────────────────────────────────────
  'process.title': { en: 'How It Works',          ar: 'كيف تعمل المنصة' },
  'process.step1.title': { en: 'Join the Platform',          ar: 'الانضمام للمنصة' },
  'process.step1.desc':  { en: 'Register your home kitchen or handmade business and create your digital storefront.', ar: 'سجّلي مطبخك المنزلي أو مشروعك وأنشئي متجرك الرقمي.' },
  'process.step2.title': { en: 'Training & Onboarding',      ar: 'التدريب والتأهيل' },
  'process.step2.desc':  { en: 'Receive professional training and onboarding support to grow your business.', ar: 'احصلي على تدريب احترافي ودعم كامل للانطلاق بمشروعك.' },
  'process.step3.title': { en: 'Homemade Production',        ar: 'الإنتاج المنزلي' },
  'process.step3.desc':  { en: 'Produce your homemade dishes and handcrafted products with pride and passion.', ar: 'اصنعي منتجاتك المنزلية بشغف واحترافية.' },
  'process.step4.title': { en: 'Quality Checking',           ar: 'فحص الجودة' },
  'process.step4.desc':  { en: 'Every product goes through our ISO-certified quality assurance process.', ar: 'تخضع كل المنتجات لضمان جودة معتمد وفق معايير أيزو.' },
  'process.step5.title': { en: 'Product Publishing',         ar: 'نشر المنتجات' },
  'process.step5.desc':  { en: 'Publish your products and reach thousands of customers.', ar: 'انشري منتجاتك وصلي لآلاف العملاء.' },
  'process.step6.title': { en: 'Order & Delivery',           ar: 'الطلب والتوصيل' },
  'process.step6.desc':  { en: 'Customers order seamlessly and receive items through our smart logistics network.', ar: 'يطلب العملاء بسهولة عبر شبكة لوجستية ذكية.' },

  // ── Categories ──────────────────────────────────────
  'categories.title':    { en: 'Explore Categories',        ar: 'استكشف التصنيفات' },
  'categories.subtitle': { en: 'Discover World Cuisines',   ar: 'اكتشف مطابخ العالم' },
  'categories.desc': {
    en: 'Browse dozens of Arabic and international kitchens within a premium digital experience.',
    ar: 'تصفح عشرات المطابخ العربية والعالمية ضمن تجربة رقمية احترافية.',
  },
  'cat.food':        { en: 'Food',             ar: 'مأكولات' },
  'cat.beverages':   { en: 'Beverages & Desserts', ar: 'مشروبات وحلويات' },
  'cat.handmade':    { en: 'Handmade Products', ar: 'حرف يدوية' },
  'cat.processing':  { en: 'Food Processing',  ar: 'تصنيع غذائي' },
  'cat.jordanian':   { en: 'Jordanian',        ar: 'أردني' },
  'cat.palestinian': { en: 'Palestinian',      ar: 'فلسطيني' },
  'cat.lebanese':    { en: 'Lebanese',         ar: 'لبناني' },
  'cat.syrian':      { en: 'Syrian',           ar: 'سوري' },
  'cat.moroccan':    { en: 'Moroccan',         ar: 'مغربي' },
  'cat.yemeni':      { en: 'Yemeni',           ar: 'يمني' },
  'cat.iraqi':       { en: 'Iraqi',            ar: 'عراقي' },
  'cat.italian':     { en: 'Italian',          ar: 'إيطالي' },
  'cat.desserts':    { en: 'Arabic Desserts',  ar: 'حلويات عربية' },
  'cat.manoush':     { en: 'Manoush',          ar: 'مناقيش' },

  // ── Smart Bazar ─────────────────────────────────────
  'bazar.title':    { en: 'Smart Bazar',        ar: 'السوق الذكي' },
  'bazar.subtitle': { en: 'Virtual Exhibition', ar: 'المعرض الافتراضي' },
  'bazar.desc': {
    en: 'A virtual exhibition connecting buyers directly with artisans and home kitchen sellers across Jordan.',
    ar: 'معرض افتراضي يربط المشترين مباشرة بالحرفيين وأصحاب المطابخ المنزلية من أنحاء الأردن.',
  },
  'bazar.explore': { en: 'Browse Marketplace', ar: 'تصفح السوق' },

  // ── Catering ────────────────────────────────────────
  'catering.title':    { en: 'Catering Services',    ar: 'خدمات الكيترينج' },
  'catering.subtitle': { en: 'Professional Catering', ar: 'خدمة احترافية' },
  'catering.desc': {
    en: 'Professional catering for events, corporate meetings, weddings, and private gatherings with custom menus.',
    ar: 'خدمات تقديم طعام احترافية للفعاليات والشركات وحفلات الزفاف والمناسبات الخاصة.',
  },
  'catering.feature1': { en: 'Corporate Events & Meetings', ar: 'فعاليات الشركات' },
  'catering.feature2': { en: 'Weddings & Celebrations',     ar: 'حفلات الزفاف' },
  'catering.feature3': { en: 'Private Gatherings',          ar: 'مناسبات خاصة' },
  'catering.feature4': { en: 'Custom Menus & Trays',        ar: 'قوائم مخصصة' },
  'catering.feature5': { en: 'Authentic Arabic Cuisine',    ar: 'مطبخ عربي أصيل' },
  'catering.feature6': { en: 'Nationwide Delivery',         ar: 'توصيل على مستوى المملكة' },
  'catering.cta':      { en: 'Request Catering',            ar: 'طلب خدمة الكيترينج' },

  // ── About ────────────────────────────────────────────
  'about.title': { en: 'About Us', ar: 'من نحن' },
  'about.company.name': { en: 'Creativity & More Business Management', ar: 'مؤسسة Creativity & More لإدارة الأعمال' },
  'about.company': {
    en: "One of Jordan's leading companies in integrated solutions for food establishments, smart applications, and digital operational systems.",
    ar: 'من الشركات الأردنية الرائدة في تقديم حلول متكاملة لإدارة المنشآت الغذائية والتطبيقات الذكية.',
  },
  'about.exp1': { en: 'Operations & Management',        ar: 'الإدارة والتشغيل' },
  'about.exp2': { en: 'Engineering & Design',           ar: 'الهندسة والتصميم' },
  'about.exp3': { en: 'Food Safety & Health',           ar: 'الصحة والسلامة الغذائية' },
  'about.exp4': { en: 'Software & Smart Apps',          ar: 'التطوير التقني' },
  'about.exp5': { en: 'Digital Marketing',              ar: 'التسويق الرقمي' },
  'about.exp6': { en: 'Project Management',             ar: 'إدارة المشاريع' },
  'about.exp7': { en: 'Quality & Governance',           ar: 'الجودة والحوكمة' },
  'about.exp8': { en: 'Digital Transformation',         ar: 'التحول الرقمي' },
  'about.exp9': { en: 'Smart Logistics & Technology',   ar: 'التطبيقات الذكية' },

  // ── Download CTA ─────────────────────────────────────
  'cta.title':    { en: 'Start Your Journey',   ar: 'ابدأ رحلتك' },
  'cta.subtitle': { en: 'Download the App Now', ar: 'حمّل التطبيق الآن' },
  'cta.desc': {
    en: 'Join thousands of home businesses already thriving on Setat Byot.',
    ar: 'انضمي إلى آلاف المشاريع المنزلية التي تزدهر على منصة ستات بيوت.',
  },
  'cta.appstore':   { en: 'App Store',    ar: 'App Store' },
  'cta.googleplay': { en: 'Google Play',  ar: 'Google Play' },
};

// ── Context ──────────────────────────────────────────
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('setat-lang');
    if (stored === 'ar' || stored === 'en') return stored;
    return 'ar';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('setat-lang', language);
  }, [language]);

  const toggleLanguage = () =>
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));

  const t = (key: string): string =>
    translations[key]?.[language] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
