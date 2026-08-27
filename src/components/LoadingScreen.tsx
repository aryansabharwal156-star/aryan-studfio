import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ['Create', 'Design', 'Build', 'Experiment'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Counter animation using requestAnimationFrame
  useEffect(() => {
    const duration = 2700; // 2.7s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for natural acceleration
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * 100);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 400);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#14141A] text-[#ECE8E0] select-none"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-1"
            >
              <div className="font-mono-code text-xs uppercase tracking-[0.25em] text-[#ECE8E0] font-semibold">
                ARYAN SABHARWAL
              </div>
              <div className="font-mono-code text-[10px] tracking-[0.2em] text-[#A9A49B]">
                DIGITAL STUDIO — 2026
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 font-mono-code text-xs text-[#A9A49B]"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B3521F] animate-pulse" />
              <span>INITIALIZING SYSTEM</span>
            </motion.div>
          </div>

          {/* Center Display Word Cycling */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <div className="font-mono-code text-xs uppercase tracking-[0.3em] text-[#A9A49B] mb-4">
              PHILOSOPHY & CRAFT
            </div>
            <div className="h-28 sm:h-36 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display italic text-6xl sm:text-8xl md:text-9xl text-[#ECE8E0] tracking-tight"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-xs sm:text-sm text-[#A9A49B] max-w-sm mt-2 font-body">
              Websites • Online Stores • SaaS Design • UGC Ads
            </p>
          </div>

          {/* Bottom Row */}
          <div className="flex items-end justify-between">
            <div className="font-mono-code text-xs text-[#A9A49B] space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#B3521F]">●</span>
                <span>AI-NATIVE ENGINE</span>
              </div>
              <div className="text-[11px] text-[#A9A49B]/70">PORTFOLIO v2.6</div>
            </div>

            {/* Editorial Counter (000 -> 100) */}
            <div className="text-right">
              <div className="font-display text-7xl sm:text-8xl md:text-9xl tracking-tighter text-[#ECE8E0] leading-none font-normal">
                {count.toString().padStart(3, '0')}
              </div>
              <div className="font-mono-code text-[10px] uppercase tracking-widest text-[#A9A49B] text-right mt-1">
                INDEX READY
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar: Rust -> Indigo */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1B1B23]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B3521F] via-[#AD3A61] to-[#3D5A95]"
              style={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
