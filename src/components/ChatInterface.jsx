import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = ({ onHeartBreak, isUnlocked }) => {
  // --- ÉTATS PHASE 1 (DRAME) ---
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSeen, setShowSeen] = useState(false);
  const [status, setStatus] = useState("En ligne");
  const [focus, setFocus] = useState("full");
  const initialMessage = "Coucou Paulo, c’est Ines à l’appareil !!";

  // --- ÉTATS PHASE 2 (RÉCONCILIATION) ---
  const [showFinalDeclaration, setShowFinalDeclaration] = useState(false);
  const [showValentine, setShowValentine] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [accepted, setAccepted] = useState(false);

  // Séquence automatique pour la Phase Finale
  useEffect(() => {
    if (isUnlocked) {
      const startFinalSequence = async () => {
        setStatus("En ligne");
        await new Promise(r => setTimeout(r, 1500));
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 4000));
        setIsTyping(false);
        setShowFinalDeclaration(true);
        await new Promise(r => setTimeout(r, 5000));
        setShowValentine(true);
      };
      startFinalSequence();
    }
  }, [isUnlocked]);

  const handleSequence = () => {
    setMessages([{ id: 1, text: initialMessage, sender: 'ines' }]);
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setFocus("status");
          setStatus("Hors ligne");
          setTimeout(() => {
            setFocus("full");
            setShowSeen(true);
            setTimeout(() => {
              onHeartBreak();
            }, 2500);
          }, 2000);
        }, 800);
      }, 6000);
    }, 1000);
  };

  const getCameraStyle = () => {
    if (focus === "status") return { scale: 2.2, y: 10, x: "10%", originY: 0, originX: 0 };
    return { scale: 1, y: 0, x: 0, originY: 0.5, originX: 0.5 };
  };

  // --- LOGIQUE BOUTONS VALENTINE ---
  const handleNo = () => {
    setNoScale(prev => prev * 0.7);
    setYesScale(prev => prev + 0.6);
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#f0f2f5] relative font-sans text-slate-900">
      <motion.div 
        className="flex flex-col h-full w-full"
        animate={getCameraStyle()}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="bg-orange-500 p-4 text-white flex items-center gap-4 shadow-md z-20">
          <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xl">P</div>
          <div>
            <h1 className="font-bold text-lg leading-none">Paul</h1>
            <span className="text-xs opacity-90 flex items-center gap-1">
              {(status === "En ligne" || isUnlocked) && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
              {isUnlocked ? "En ligne" : status}
            </span>
          </div>
        </div>

        {/* Zone de messages */}
        <div className="flex-1 p-4 flex flex-col gap-4 relative overflow-y-auto">
          <div className="text-center my-2">
            <span className="bg-gray-300/40 text-gray-500 text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold">Aujourd'hui</span>
          </div>

          {/* Message de base d'Inès (Phase 1) */}
          {(messages.length > 0 || isUnlocked) && (
            <div className="flex flex-col items-end gap-1 self-end w-full">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-orange-500 text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm text-sm">
                {initialMessage}
              </motion.div>
              {showSeen && !isUnlocked && (
                <div className="flex items-center gap-1 mt-1 mr-1">
                  <span className="text-[11px] text-blue-600 font-black uppercase tracking-tight">Vu il y a 1 min</span>
                  <span className="text-blue-600 text-lg font-black tracking-tighter leading-none">✓✓</span>
                </div>
              )}
            </div>
          )}

          {/* Déclaration Finale de Paul (Phase 2) */}
          <AnimatePresence>
            {showFinalDeclaration && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="self-start bg-white border-2 border-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm text-sm text-slate-700"
              >
                Inès... me replonger dans tous ces souvenirs avec toi m'a fait réaliser une chose simple : ma vie est tellement plus belle quand tu es là. ❤️
                <br/><br/>
                On a vécu Besançon, on vit le présent, et je me languis de vivre notre futur : Lyon, nos familles, et cette fameuse Fatiha en Juillet. Je t'aime plus que tout.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          <div className="mt-auto pb-2">
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-2 border-gray-100 px-5 py-3 rounded-3xl rounded-tl-none self-start flex gap-2 shadow-md items-center w-fit">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Paul écrit...</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Phase 1 / Valentine Phase 2 */}
        {!isUnlocked ? (
          <div className={`p-4 bg-white border-t border-gray-100 flex gap-3 items-center transition-all ${focus !== 'full' ? 'opacity-20 blur-[1px]' : 'opacity-100'}`}>
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-xs text-gray-400 italic">
               {messages.length > 0 ? "" : initialMessage}
            </div>
            <button onClick={handleSequence} disabled={messages.length > 0} className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90"><path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" /></svg>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {showValentine && !accepted && (
              <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="p-6 bg-white border-t border-gray-100 flex flex-col items-center gap-4 z-50">
                <p className="font-black text-slate-800 uppercase tracking-tight">Veux-tu être ma Valentine ? 🌹</p>
                <div className="flex gap-4 w-full">
                  <motion.button 
                    style={{ scale: yesScale }}
                    onClick={() => setAccepted(true)}
                    className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold shadow-lg"
                  >
                    OUI !
                  </motion.button>
                  <motion.button 
                    style={{ scale: noScale }}
                    onClick={handleNo}
                    className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-xl font-bold"
                  >
                    Non
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>

      {/* ÉCRAN FINAL */}
      <AnimatePresence>
        {accepted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-orange-500 z-[100] flex flex-col items-center justify-center text-white p-10 text-center">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="text-8xl mb-6">❤️</motion.span>
            <h2 className="text-3xl font-black uppercase mb-2">C'est le plus beau "Oui"</h2>
            <p className="opacity-80">Je t'aime, Inès. Prête pour la suite ?</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;