import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Importation de tes images
import mapBg from '../assets/map.png';
import subwayImg from '../assets/subway.jpeg';
import battantImg from '../assets/battant.png';
import mcdoValImg from '../assets/mcdoVal.png';
import BAPImg from '../assets/BAP.png';
import ufrslhs from '../assets/ufrslhs.png';
import Tuki from '../assets/tuki.png';


// Pense à ajouter ces images dans tes assets et les importer ici demain :
// import basicFitImg from '../assets/basicfit.png';
// import spaImg from '../assets/spa.png';

const memories = [
  {
    id: 1,
    title: "Le Choc Initial",
    location: "Fontaine & Place Pasteur",
    story: "On se connaissait à peine et tu m'as foudroyé avec ton 'C'est quoi cette dégaine de golmon ?'. Entre le burger à Papa mangé place Pasteur et ton rire, j'ai vite compris que ma dégaine c'était le cadet de mes soucis tant que t'étais là.",
    icon: "⛲",
    x: "52%", y: "48%", // Centre-ville
    image: BAPImg
  },
  {
    id: 2,
    title: "L'Usine à Frites",
    location: "McDo École-Valentin",
    story: "Le rush, l'odeur du gras et nos fous rires derrière le comptoir. C'était pas le spot le plus glamour de Besac, mais bosser avec toi c'était la seule raison qui me faisait pointer avec le sourire.",
    icon: "🍔",
    x: "48%", y: "15%", // Nord
    image: mcdoValImg
  },
  {
    id: 3,
    title: "Le T-shirt du Scandale",
    location: "Subway & Bubble Waffle",
    story: "Le mec qui me sort que mon t-shirt est 'trop stylé' au Subway... On sait tous les deux qu'il mentait. Mais ce jour-là, même avec un t-shirt ridicule, je me sentais comme un roi à tes côtés.",
    icon: "🧇",
    x: "65%", y: "55%", // Un peu décalé du centre
    image: subwayImg
  },
  {
    id: 4,
    title: "Souffrance & Co",
    location: "Basic Fit Chalezeule",
    story: "Nos premières séances... J'ai vite compris que la salle n'était pas forcément ton activité favorite, mais tu étais là, à galérer sur les machines juste pour passer une heure de plus avec moi. C'est là que j'ai compris que tu m'aimais vraiment.",
    icon: "💪",
    x: "82%", y: "30%", // Droite
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500" // Remplacer par ton image importée
  },
  {
    id: 5,
    title: "La Rencontre avec Tuki",
    location: "SPA de Chalezeule",
    story: "Le jour où j'ai adopté Tuki. On ne l'a pas adopté ensemble, mais quand je vois comment elle te regarde et comment elle te considère comme sa maman, je me dis qu'elle avait déjà tout captée bien avant nous.",
    icon: "🐱",
    x: "85%", y: "45%", // Droite
    image: Tuki
  },
  {
    id: 6,
    title: "La Complice de la BU",
    location: "Fac LLCER / Centre-Ville",
    story: "Je t'accompagnais à la Fac juste pour gratter quelques minutes avec toi. Pendant que tu étais en cours, moi je m'installais à la BU pour coder. J'aurais pu rester chez moi, mais c'était tellement mieux de t'attendre là-bas.",
    icon: "💻",
    x: "25%", y: "75%", // Bas Gauche
    image: ufrslhs
  },
  {
    id: 7,
    title: "Rue Battant",
    location: "Ton Cocon",
    story: "Ton appart, avec les chats qui y faisaient la loi. C'est ici que j'ai réalisé que 'chez moi', c'était pas une adresse, c'était juste là où tu étais.",
    icon: "🐈",
    x: "45%", y: "42%", // Proche centre
    image: battantImg
  }
];

const MemoryMap = ({ onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [visited, setVisited] = useState([]);

  const isUnlocked = (index) => index === 0 || visited.includes(memories[index - 1].id);

  const handleSelect = (memory) => {
    setSelected(memory);
    if (!visited.includes(memory.id)) setVisited([...visited, memory.id]);
  };

  const progress = (visited.length / memories.length) * 100;

  return (
    <div className="h-full w-full bg-slate-900 relative overflow-hidden flex flex-col font-sans">
      
      {/* HEADER TYPE MAPS */}
      <div className="bg-white/95 backdrop-blur-sm p-4 shadow-lg z-30 border-b border-gray-200">
        <div className="flex items-center gap-3 bg-gray-100 p-2.5 rounded-full mb-3 shadow-inner border border-gray-200">
          <span className="text-blue-500 ml-2">📍</span>
          <span className="text-sm font-bold text-gray-600">Besançon, France</span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <motion.div animate={{ width: `${progress}%` }} className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>
      </div>

      {/* LA VRAIE MAP EN FOND */}
      <div className="flex-1 relative overflow-hidden bg-slate-800">
        <img 
          src={mapBg} 
          alt="Besançon Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* MARQUEURS */}
        {memories.map((m, index) => {
          const unlocked = isUnlocked(index);
          const isDone = visited.includes(m.id);

          return (
            <motion.button
              key={m.id}
              disabled={!unlocked}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: m.x, top: m.y }}
              onClick={() => handleSelect(m)}
            >
              {/* Animation de saut groupée (Pin + Emoji) */}
              <motion.div 
                className={`relative w-12 h-14 ${unlocked ? 'opacity-100' : 'opacity-40 grayscale blur-[1px]'}`}
                animate={unlocked && !isDone ? { y: [0, -12, 0] } : { y: 0 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" className={`w-full h-full drop-shadow-lg ${isDone ? 'fill-green-500' : 'fill-red-500'}`}>
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                <div className="absolute top-2 left-0 right-0 text-center text-[14px]">
                  {unlocked ? m.icon : "🔒"}
                </div>
              </motion.div>
            </motion.button>
          );
        })}

        {/* BOUTON FINAL */}
        {visited.length === memories.length && (
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="absolute bottom-8 w-full px-8 z-30">
            <button onClick={onComplete} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-95 transition-all uppercase tracking-widest">
              Réparer son cœur ❤️
            </button>
          </motion.div>
        )}
      </div>

      {/* MODAL STORY (Slide up) */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end"
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] w-full p-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="w-full h-44 rounded-2xl mb-6 shadow-inner overflow-hidden bg-gray-100">
                 <img src={selected.image} className="w-full h-full object-cover" />
              </div>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-1">{selected.location}</p>
              <h2 className="text-2xl font-black text-gray-900 mb-3">{selected.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed italic font-serif border-l-4 border-blue-500/20 pl-4">
                "{selected.story}"
              </p>
              <button onClick={() => setSelected(null)} className="w-full mt-8 bg-gray-100 py-4 rounded-xl font-bold text-gray-400">
                Continuer l'itinéraire
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryMap;