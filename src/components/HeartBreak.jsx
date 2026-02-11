import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const HeartBreak = ({ onFinished }) => {
  const [isBroken, setIsBroken] = useState(false);

  // On pré-calcule les trajectoires pour une explosion stable au rendu
  const fragments = useMemo(() => 
    Array.from({ length: 20 }).map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.3) * 700,
      rotate: Math.random() * 1000 - 500,
    })), []);

  const handleExplosion = () => {
    if (isBroken) return;
    setIsBroken(true);
    
    setTimeout(() => {
      onFinished();
    }, 3000);
  };

  // Tracé d'un coeur parfaitement symétrique
  const heartPath = "M50 88.42L42.75 81.84C16.75 58.27 0 43.1 0 24.5C0 9.35 11.85 0 25 0C32.4 0 39.5 3.45 45 8.86C50.5 3.45 57.6 0 65 0C78.15 0 90 9.35 90 24.5C90 43.1 73.25 58.27 47.25 81.86L50 88.42Z";

  return (
    <div 
      className="flex flex-col items-center justify-center h-full bg-black p-6 overflow-hidden relative cursor-pointer" 
      onClick={handleExplosion}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        
        {!isBroken ? (
          /* LE COEUR PARFAIT AVANT EXPLOSION */
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d={heartPath}
              fill="#FF4B2B"
            />
          </motion.svg>
        ) : (
          /* L'EXPLOSION EN MORCEAUX */
          fragments.map((dest, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{ 
                x: dest.x, 
                y: dest.y, 
                rotate: dest.rotate, 
                opacity: 0,
                scale: 0.2
              }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <path
                d={heartPath}
                fill="#FF4B2B"
                style={{
                  clipPath: `polygon(${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%)`
                }}
              />
            </motion.svg>
          ))
        )}

        {isBroken && (
          <motion.div 
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 6 }}
            className="absolute w-10 h-10 bg-white rounded-full z-50"
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 text-center"
      >
        <p className="text-white/60 font-serif italic text-base tracking-widest">
          {!isBroken ? "Touchez son cœur..." : "L'histoire vole en éclats..."}
        </p>
      </motion.div>
    </div>
  );
};

export default HeartBreak;