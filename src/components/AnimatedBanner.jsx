import { motion } from 'framer-motion';

export default function AnimatedBanner() {
  return (
    <motion.div
      style={{
        display: 'inline-block',
        margin: '1rem auto',
        padding: '6px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02))',
        border: '1px solid var(--border-color)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)'
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -4 }}
    >
      <img
        src="/banner.jpg"
        alt="Kushal.dev Workspace"
        style={{
          width: '100%',
          maxWidth: '380px',
          maxHeight: '220px',
          objectFit: 'cover',
          borderRadius: '12px',
          display: 'block'
        }}
      />
    </motion.div>
  );
}
