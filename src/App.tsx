import { Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Cursor } from './components/primitives/Cursor';
import { SealOverture } from './components/primitives/SealOverture';
import { ScrollProgress } from './components/primitives/ScrollProgress';
import { EasterEgg } from './components/primitives/EasterEgg';
import { useLenis } from './hooks/useLenis';
import { useTheme } from './hooks/useTheme';
import { orgJsonLd } from './lib/seo';

import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Partnerships from './pages/Partnerships';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Legal from './pages/legal/Legal';

export default function App() {
  useLenis();
  useTheme();
  const loc = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [loc.pathname]);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Helmet>
      <SealOverture />
      <Cursor />
      <EasterEgg />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/:slug" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
