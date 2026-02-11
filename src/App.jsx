import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatInterface from './components/ChatInterface'
import HeartBreak from './components/HeartBreak'
import MemoryMap from './components/MemoryMap'
import GameStart from './components/GameStart'

import photoReine from './assets/queen.jpg'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState('off');
  const [time, setTime] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showChessEgg, setShowChessEgg] = useState(false);
  const [mapFinished, setMapFinished] = useState(false);
  const [hasFoundEgg, setHasFoundEgg] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const otherApps = [
    { name: 'Photos', icon: '🖼️', color: 'bg-white' },
    { name: 'Météo', icon: '☀️', color: 'bg-sky-400' },
    { name: 'Notes', icon: '📝', color: 'bg-yellow-400' },
    { name: 'Musique', icon: '🎵', color: 'bg-pink-500' },
    { name: 'Safari', icon: '🌐', color: 'bg-white' },
    { name: 'Instagram', icon: '📸', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
    { name: 'WhatsApp', icon: '📞', color: 'bg-green-500' },
  ];

  return (
    /* Utilisation de min-h-[100dvh] pour mieux gérer les navigateurs mobiles */
    <div className="flex items-center justify-center min-h-[100dvh] bg-slate-900 p-2 sm:p-4 font-sans select-none relative overflow-hidden">
      
      <AnimatePresence>
        {!gameStarted && (
          <GameStart onStart={() => { setStep('lock'); setGameStarted(true); }} />
        )}
      </AnimatePresence>

      {gameStarted && (
        /* Adaptation de la taille : plus petit sur mobile, taille fixe max sur iPad/Desktop */
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[380px] aspect-[9/19] max-h-[90dvh] bg-black rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[6px] sm:border-[10px] border-slate-800 overflow-hidden relative"
        >
          <AnimatePresence mode="wait">
            {step === 'off' && (
              <motion.div key="off" exit={{ opacity: 0 }} onClick={() => setStep('lock')} className="w-full h-full bg-black cursor-pointer" />
            )}

            {step === 'lock' && (
              <motion.div 
                key="lock"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setStep('home')}
                className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center cursor-pointer px-4"
              >
                <h1 className="text-white text-6xl sm:text-7xl font-light tracking-tight">{time}</h1>
                <p className="text-white/80 text-base sm:text-lg mt-2 font-light text-center">Samedi 14 février 2026</p>
                <div className="absolute bottom-12 animate-bounce text-white/40 text-[10px] uppercase tracking-widest">Cliquer pour déverrouiller</div>
              </motion.div>
            )}

            {step === 'home' && (
              <motion.div 
                key="home"
                initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center p-4 sm:p-6 pt-10 sm:pt-12 relative"
              >
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                <AnimatePresence>
                  {showNotif && (
                    <motion.div 
                      initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
                      onClick={() => setStep('map')}
                      className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] bg-white/95 backdrop-blur-lg rounded-2xl p-3 sm:p-4 shadow-2xl z-[100] cursor-pointer border border-gray-200"
                    >
                      <div className="flex items-start gap-3 text-left">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" className="w-8 h-8 sm:w-10 sm:h-10" alt="Maps" />
                        <div className="flex-1">
                          <span className="font-bold text-gray-900 text-xs sm:text-sm">Maps</span>
                          <p className="text-xs sm:text-sm text-gray-800 leading-tight mt-0.5">Besançon : Récupère ces souvenirs... 📍</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-6 sm:gap-y-8 relative z-10 text-center">
                  <div 
                    onClick={() => {
                      if (mapFinished && !hasFoundEgg) {
                        alert("Accès verrouillé. La Reine doit d'abord reprendre sa place... 👑");
                      } else { setStep('chat'); }
                    }} 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-90 transition-all"
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 rounded-2xl shadow-lg flex flex-col items-center justify-center border-2 border-white ${(!mapFinished || hasFoundEgg) ? 'animate-pulse' : 'grayscale opacity-50'}`}>
                      <span className="text-white font-black text-[7px] sm:text-[9px] leading-none mb-0.5 tracking-tighter uppercase">Connected</span>
                      <span className="text-white font-black text-lg sm:text-xl leading-none uppercase tracking-tighter">2Me</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-white font-bold drop-shadow-md">C2Me</span>
                  </div>

                  <div 
                    onClick={() => { if (mapFinished) { setShowChessEgg(true); } else { alert("Désactivé pour le moment."); } }}
                    className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all active:scale-90 ${!mapFinished ? 'opacity-20 grayscale' : 'opacity-100'}`}
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center text-xl sm:text-2xl border border-white/10 ${mapFinished && !hasFoundEgg ? 'ring-4 ring-orange-500 animate-pulse' : ''}`}>
                      ♟️
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-white font-medium drop-shadow-md">Échecs</span>
                  </div>

                  {otherApps.map(app => (
                    <div key={app.name} className="flex flex-col items-center gap-1.5 opacity-80 scale-95">
                      <div className={`${app.color} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-lg flex items-center justify-center text-xl sm:text-2xl`}>{app.icon}</div>
                      <span className="text-[9px] sm:text-[10px] text-white font-medium drop-shadow-md">{app.name}</span>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {showChessEgg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[110] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4">
                      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl w-full">
                        <div className="h-48 sm:h-64 bg-gray-200">
                          <img src={photoReine} className="w-full h-full object-cover" alt="Reine" />
                        </div>
                        <div className="p-6 sm:p-8 text-center">
                          <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed mb-6 italic">
                            Pas besoin de lancer une partie...<br />
                            <span className="text-orange-500 font-black text-lg sm:text-xl uppercase">C'est déjà toi la Reine. 😉</span>
                          </p>
                          <button onClick={() => { setShowChessEgg(false); setHasFoundEgg(true); }} className="w-full py-3 sm:py-4 bg-black text-white rounded-xl font-bold uppercase text-[10px] tracking-widest">Reprendre mon trône</button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-20 sm:h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/30" />
              </motion.div>
            )}

            {step === 'chat' && (
              <motion.div key="chat" className="w-full h-full">
                <ChatInterface onHeartBreak={() => setStep('broken')} isUnlocked={hasFoundEgg} />
              </motion.div>
            )}
            
            {step === 'broken' && (
              <motion.div key="broken" className="w-full h-full">
                <HeartBreak onFinished={() => { setStep('home'); setTimeout(() => setShowNotif(true), 1500); }} />
              </motion.div>
            )}
            
            {step === 'map' && (
              <motion.div key="map" initial={{ x: 300 }} animate={{ x: 0 }} className="w-full h-full">
                <MemoryMap onComplete={() => { setStep('home'); setMapFinished(true); setShowNotif(false); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default App