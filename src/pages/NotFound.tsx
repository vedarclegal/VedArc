import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { MagneticButton } from '../components/primitives/MagneticButton';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { Seal } from '../components/primitives/Seal';
import { editorial } from '../lib/motion';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found — VedArc Legal</title>
      </Helmet>
      <section className="container-editorial flex min-h-[80vh] flex-col justify-center py-32 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 0.18, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: editorial }}
          className="pointer-events-none absolute right-6 top-12 lg:right-20 lg:top-32"
        >
          <Seal size={420} animated />
        </motion.div>

        <div className="relative">
          <Eyebrow>404</Eyebrow>
          <div className="mt-8 max-w-3xl">
            <SplitHeading
              as="h1"
              text="The page you sought"
              className="text-display-lg leading-[0.95]"
            />
            <SplitHeading
              as="h1"
              text="is not in our brief."
              className="text-display-lg leading-[0.95] italic text-text/85"
              delay={0.18}
              italic
            />
          </div>
          <p className="mt-8 max-w-xl text-text/80">
            The link may be outdated, or the page has been moved. Let us help you find your way back.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <MagneticButton to="/" variant="primary">Return Home</MagneticButton>
            <MagneticButton to="/programs" variant="ghost">Browse Programs</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
