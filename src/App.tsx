import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';

// Placeholder — we'll replace this with real sections one by one
function ComingSoon({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border)',
        color: 'var(--muted-foreground)',
        fontSize: '1.2rem',
        letterSpacing: '0.05em',
      }}
    >
      {label} — coming soon
    </section>
  );
}

function MainApp() {
  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <main>
        <ComingSoon id="hero"       label="Hero" />
        <ComingSoon id="process"    label="Our Process" />
        <ComingSoon id="categories" label="Categories" />
        <ComingSoon id="bazar"      label="Smart Bazar" />
        <ComingSoon id="catering"   label="Catering" />
        <ComingSoon id="about"      label="About Us" />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
