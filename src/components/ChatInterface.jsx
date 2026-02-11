import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = ({ onHeartBreak }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSeen, setShowSeen] = useState(false);
  const [status, setStatus] = useState("En ligne");
  const [focus, setFocus] = useState("full");

  const initialMessage = "Coucou Paulo, c’est Ines à l’appareil !!";

  const handleSequence = () => {
    // 1. Inès envoie le message
    setMessages([{ id: 1, text: initialMessage, sender: 'ines' }]);
    
    setTimeout(() => {
      // 2. Paulo commence à écrire (pendant 6 secondes pour créer l'attente)
      setIsTyping(true);
      
      setTimeout(() => {
        // 3. Paulo s'arrête d'écrire brutalement
        setIsTyping(false);
        
        setTimeout(() => {
          // 4. Zoom sur le status et passage Hors Ligne
          setFocus("status");
          setStatus("Hors ligne");
          
          setTimeout(() => {
            // 5. Dézoom et affichage du "Vu il y a 1 min"
            setFocus("full");
            setShowSeen(true);
            
            setTimeout(() => {
              // 6. Fin de la séquence -> Coeur brisé
              onHeartBreak();
            }, 2500);
          }, 2000);
        }, 800);
      }, 6000); // 6 secondes de "Typing..." pour bien la faire attendre
    }, 1000);
  };

  const getCameraStyle = () => {
    if (focus === "status") return { 
        scale: 2.2, 
        y: 10, 
        x: "10%", // En poussant l'interface vers la droite, l'oeil (le centre) va vers la gauche
        originY: 0,
        originX: 0 // On définit l'origine du zoom en haut à gauche
    };
    return { scale: 1, y: 0, x: 0, originY: 0.5, originX: 0.5 };
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#f0f2f5] relative font-sans text-slate-900">
      <motion.div 
        className="flex flex-col h-full w-full"
        animate={getCameraStyle()}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="bg-c2m-orange p-4 text-white flex items-center gap-4 shadow-md z-20">
          <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xl">P</div>
          <div>
            <h1 className="font-bold text-lg leading-none">Paul</h1>
            <span className="text-xs opacity-90 flex items-center gap-1">
              {status === "En ligne" && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
              {status}
            </span>
          </div>
        </div>

        {/* Zone de messages */}
		<div className="flex-1 p-4 flex flex-col gap-4 relative">
		<div className="text-center my-4">
			<span className="bg-gray-300/40 text-gray-500 text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold">Aujourd'hui</span>
		</div>

		<AnimatePresence>
			{messages.map((m) => (
			<div key={m.id} className="flex flex-col items-end gap-1">
				{/* La bulle de message */}
				<motion.div
				initial={{ opacity: 0, scale: 0.8, x: 20 }}
				animate={{ opacity: 1, scale: 1, x: 0 }}
				className="bg-c2m-orange text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm text-sm"
				>
				{m.text}
				</motion.div>

				{/* Le VU placé juste en dessous de la bulle */}
				{showSeen && (
				<motion.div 
					initial={{ opacity: 0, y: -5 }} 
					animate={{ opacity: 1, y: 0 }} 
					className="flex flex-col items-end mt-1 mr-1"
				>
					<div className="flex items-center gap-1">
						<span className="text-[11px] text-blue-600 font-black uppercase tracking-tight">
							Vu il y a 1 min
						</span>
						<span className="text-blue-600 text-lg font-black tracking-tighter leading-none">✓✓</span>
					</div>
				</motion.div>
				)}
			</div>
			))}
		</AnimatePresence>

		<div className="mt-auto flex flex-col items-start pb-2">
			{isTyping && (
				<motion.div 
					initial={{ opacity: 0, scale: 0.5, y: 10 }} 
					animate={{ opacity: 1, scale: 1, y: 0 }} 
					className="bg-white border-2 border-gray-100 px-5 py-3 rounded-3xl rounded-tl-none self-start flex gap-2 shadow-md items-center"
				>
					<span className="w-2.5 h-2.5 bg-c2m-orange rounded-full animate-[bounce_1s_infinite] [animation-delay:-0.3s]"></span>
					<span className="w-2.5 h-2.5 bg-c2m-orange rounded-full animate-[bounce_1s_infinite] [animation-delay:-0.15s]"></span>
					<span className="w-2.5 h-2.5 bg-c2m-orange rounded-full animate-[bounce_1s_infinite]"></span>
					
					<span className="ml-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
						Paul écrit...
					</span>
				</motion.div>
			)}
		</div>
		</div>

        {/* Input */}
        <div className={`p-4 bg-white border-t border-gray-100 flex gap-3 items-center transition-all duration-700 ${focus !== 'full' ? 'opacity-20 blur-[1px]' : 'opacity-100'}`}>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-xs text-gray-400 italic">
             {messages.length > 0 ? "" : initialMessage}
          </div>
          <button 
            onClick={handleSequence}
            disabled={messages.length > 0}
            className="bg-c2m-orange text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90"><path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" /></svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;