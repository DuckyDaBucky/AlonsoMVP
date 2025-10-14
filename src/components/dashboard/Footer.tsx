/**
 * Dashboard Footer Component
 * Displays the tagline with gradient styling
 */

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-3 text-center"
    >
      <p 
        className="bg-gradient-to-r from-[#00C39A] to-[#00B0A9] bg-clip-text text-transparent italic text-sm font-medium" 
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Your digital pit wall — wherever you are.
      </p>
    </motion.footer>
  );
}

