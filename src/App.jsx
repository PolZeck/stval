import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatInterface from './components/ChatInterface'
import HeartBreak from './components/HeartBreak'
import MemoryMap from './components/MemoryMap'


// Pense à ajouter ton image dans assets
import photoReine from './assets/queen.jpg'

function App() {
  const [step, setStep] = useState('off'); // off, lock, home, chat, broken, map, final
  const [time, setTime] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showChessEgg, setShowChessEgg] = useState(false);
  
  // États de progression
  const [mapFinished, setMapFinished] = useState(false);
  const [hasFoundEgg, setHasFoundEgg] = useState(false);

  // Horloge temps réel
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
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4 font-sans select-none">
      <div className="w-full max-w-[380px] h-[750px] bg-black rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[10px] border-slate-800 overflow-hidden relative">
        
        <AnimatePresence mode="wait">
          
          {/* 1. ÉCRAN ÉTEINT */}
          {step === 'off' && (
            <motion.div 
              key="off"
              exit={{ opacity: 0 }}
              onClick={() => setStep('lock')}
              className="w-full h-full bg-black cursor-pointer flex items-center justify-center"
            />
          )}

          {/* 2. LOCKSCREEN */}
          {step === 'lock' && (
            <motion.div 
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStep('home')}
              className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center pt-20 cursor-pointer"
            >
              <h1 className="text-white text-7xl font-light tracking-tight">{time}</h1>
              <p className="text-white/80 text-lg mt-2 font-light">Samedi 14 février 2026</p>
              <div className="mt-auto mb-12 animate-bounce text-white/40 text-sm uppercase tracking-widest">Cliquer pour déverrouiller</div>
            </motion.div>
          )}

          {/* 3. HOMESCREEN */}
          {step === 'home' && (
            <motion.div 
              key="home"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center p-6 pt-12 relative"
            >
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Notification Maps */}
              <AnimatePresence>
                {showNotif && (
                  <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    onClick={() => setStep('map')}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl z-[100] cursor-pointer border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" className="w-10 h-10" />
                      <div className="flex-1 text-left">
                        <span className="font-bold text-gray-900 text-sm">Maps</span>
                        <p className="text-sm text-gray-800 leading-tight mt-1">Besançon : Récupère ces souvenirs... 📍</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GRILLE D'APPS */}
              <div className="grid grid-cols-4 gap-x-4 gap-y-8 relative z-10">
                
                {/* CONNECTED2ME */}
                <div 
                  onClick={() => {
                    if (mapFinished && !hasFoundEgg) {
                      alert("Accès verrouillé. La Reine doit d'abord reprendre sa place... 👑");
                    } else {
                      setStep('chat');
                    }
                  }} 
                  className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-90 transition-all"
                >
                  <div className={`w-14 h-14 bg-orange-500 rounded-2xl shadow-lg flex flex-col items-center justify-center border-2 border-white ${(!mapFinished || hasFoundEgg) ? 'animate-pulse' : 'grayscale opacity-50'}`}>
                    <span className="text-white font-black text-[9px] leading-none mb-0.5 tracking-tighter">CONNECTED</span>
                    <span className="text-white font-black text-xl leading-none">2ME</span>
                  </div>
                  <span className="text-[10px] text-white font-bold drop-shadow-md">C2Me</span>
                </div>

                {/* ÉCHECS (EASTER EGG) */}
                <div 
                  onClick={() => {
                    if (mapFinished) {
                      setShowChessEgg(true);
                    } else {
                      alert("L'accès aux échecs est désactivé pour le moment.");
                    }
                  }}
                  className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all active:scale-90 ${!mapFinished ? 'opacity-20 grayscale' : 'opacity-100'}`}
                >
                  <div className={`w-14 h-14 bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center text-2xl border border-white/10 ${mapFinished && !hasFoundEgg ? 'ring-4 ring-orange-500 animate-pulse' : ''}`}>
                    ♟️
                  </div>
                  <span className="text-[10px] text-white font-medium drop-shadow-md">Échecs</span>
                </div>

                {otherApps.map(app => (
                  <div key={app.name} className="flex flex-col items-center gap-1.5 opacity-80 scale-95">
                    <div className={`${app.color} w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-2xl`}>{app.icon}</div>
                    <span className="text-[10px] text-white font-medium drop-shadow-md">{app.name}</span>
                  </div>
                ))}
              </div>

              {/* MODALE EASTER EGG */}
              <AnimatePresence>
                {showChessEgg && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[110] bg-black/70 backdrop-blur-xl flex items-center justify-center p-6"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-sm"
                    >
                      <div className="h-64 bg-gray-200">
                        {/* Remplace l'URL par {photoReine} quand tu l'auras importée */}
                        <img src = {photoReine} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-8 text-center">
                        <p className="text-slate-800 font-medium leading-relaxed mb-6">
                          Pas besoin de lancer une partie...<br />
                          <span className="text-orange-500 font-black text-xl italic uppercase">C'est déjà toi la Reine. 😉</span>
                        </p>
                        <button 
                          onClick={() => {
                            setShowChessEgg(false);
                            setHasFoundEgg(true);
                          }}
                          className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase text-[10px] tracking-widest"
                        >
                          Reprendre mon trône
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* DOCK */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[92%] h-24 bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/30 flex items-center justify-around px-4" />
            </motion.div>
          )}

          {/* ÉTAPES SUIVANTES */}
          {step === 'chat' && <motion.div key="chat" className="w-full h-full"><ChatInterface onHeartBreak={() => setStep('broken')} /></motion.div>}
          
          {step === 'broken' && <motion.div key="broken" className="w-full h-full"><HeartBreak onFinished={() => { setStep('home'); setTimeout(() => setShowNotif(true), 1500); }} /></motion.div>}
          
          {step === 'map' && <motion.div key="map" initial={{ x: 300 }} animate={{ x: 0 }} className="w-full h-full"><MemoryMap onComplete={() => { setStep('home'); setMapFinished(true); setShowNotif(false); }} /></motion.div>}

        </AnimatePresence>
      </div>
    </div>
  )
}

export default App