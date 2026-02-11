import { motion } from 'framer-motion';
import inesAvatar from '../assets/ines_sucre.png';
// Import des images des chats
import sanjiImg from '../assets/sanji.png';
import tukiImg from '../assets/tukias.png';

const GameStart = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-[#FFDEE9] bg-gradient-to-b from-[#FFDEE9] to-[#B5FFFC] flex flex-col items-center justify-center overflow-hidden font-sans text-center">
      
      {/* PSEUDO TOUT EN HAUT */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-6 z-20 bg-[#318CE7] text-white px-6 py-1 rounded-full shadow-md border-2 border-white font-bold text-sm"
      >
        inesdz5768
      </motion.div>

      {/* Cœurs flottants */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0.2 }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
            className="text-pink-300 text-4xl"
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* TITRE DE L'ÉPISODE */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-xl border-4 border-pink-400 z-10 mb-6 mt-12"
      >
        <h2 className="text-pink-500 font-black italic text-xl uppercase tracking-tighter text-center">
          Épisode Spécial : Un nouveau au Lycée Sweet Amoris
        </h2>
      </motion.div>

      {/* ILLUSTRATION CENTRALE */}
      <div className="relative flex items-center justify-center w-full max-w-2xl h-[50vh]">
        
        {/* Sanji (Gauche) */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="absolute left-4 bottom-0 z-10 w-32 sm:w-40"
        >
          <img src={sanjiImg} alt="Sanji" className="w-full h-auto drop-shadow-lg" />
        </motion.div>

        {/* Tuki (Droite) */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="absolute right-4 bottom-0 z-10 w-32 sm:w-40"
        >
          <img src={tukiImg} alt="Tuki" className="w-full h-auto drop-shadow-lg" />
        </motion.div>

        {/* INÈS VERSION AMOUR SUCRÉ */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-20 h-full"
        >
          <img 
            src={inesAvatar} 
            alt="Inès Amour Sucré" 
            className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
          />
        </motion.div>
      </div>

      {/* BOUTON JOUER */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
        className="mt-4 mb-28 bg-pink-500 text-white text-4xl font-black px-16 py-6 rounded-full shadow-[0_10px_0_rgb(190,24,93)] border-4 border-white z-10 hover:bg-pink-400 transition-colors uppercase italic"
      >
        Jouer
      </motion.button>

      {/* FOOTER TEXTE */}
      <div className="absolute bottom-6 px-6 w-full max-w-lg">
        <p className="text-pink-600 font-bold bg-white/70 backdrop-blur-sm p-4 rounded-2xl border-2 border-pink-200 shadow-lg text-sm sm:text-base">
          "Paul vient d'arriver au lycée... Va-t-il réussir à conquérir le cœur de la plus belle fille de Sweet Amoris ?"
        </p>
      </div>
    </div>
  );
};

export default GameStart;