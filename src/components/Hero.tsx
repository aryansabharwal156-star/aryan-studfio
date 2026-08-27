import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Play, Pause } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export default function Hero({ onExploreWork, onStartProject }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Initialize HLS video stream safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().then(() => {
          setVideoLoaded(true);
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay fallback
        });
      });

      hls.on(Hls.Events.ERROR, () => {
        // Fallback gracefully without breaking UI
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS support
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().then(() => {
          setVideoLoaded(true);
          setIsPlaying(true);
        }).catch(() => {});
      });
    }
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden border-b border-[#2C2C36]/50"
    >
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-b from-[#B3521F]/12 via-[#3D5A95]/8 to-transparent blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-[#2F6F5E]/10 blur-[140px]" />

        {/* Video Canvas Layer */}
        <div className="absolute inset-0 opacity-20 transition-opacity duration-1000">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale brightness-75 contrast-125"
          />
        </div>

        {/* Cinematic Grid & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141A] via-[#14141A]/70 to-[#14141A]/90" />
        <div className="absolute inset-0 noise-bg opacity-30" />
      </div>

      <div className="max-w-[1180px] mx-auto w-full flex flex-col justify-between flex-1 relative z-10">
        {/* Eyebrow and Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="font-mono-code text-[10px] uppercase tracking-[0.3em] text-[#B3521F] flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-[#2C2C36]">
            <span className="w-2 h-2 rounded-full bg-[#B3521F] animate-pulse"></span>
            <span className="font-semibold">Digital Creator — Built by Aryan Sabharwal</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-mono-code text-[#A9A49B]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F5E]" />
              Available for Q1/Q2 Projects
            </span>
            {videoLoaded && (
              <button
                onClick={toggleVideo}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-[#2C2C36] hover:text-[#ECE8E0] transition-colors"
                title={isPlaying ? "Pause cinematic background" : "Play cinematic background"}
              >
                {isPlaying ? <Pause className="w-3 h-3 text-[#B3521F]" /> : <Play className="w-3 h-3 text-[#2F6F5E]" />}
                <span className="text-[9px] uppercase tracking-wider">{isPlaying ? 'Ambience Active' : 'Ambience Paused'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Center Headline */}
        <div className="space-y-6 sm:space-y-8 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-light tracking-tight text-[#ECE8E0] leading-[0.96]">
            I build{' '}
            <span className="font-display italic text-[#ECE8E0] font-normal tracking-normal relative inline-block">
              digital experiences
            </span>{' '}
            that make businesses look and work better.
          </h1>

          {/* Subtitle / Supporting copy */}
          <p className="text-base sm:text-lg md:text-xl text-[#A9A49B] max-w-2xl font-body leading-relaxed font-normal">
            I design and build <span className="text-[#ECE8E0] font-medium">websites</span>,{' '}
            <span className="text-[#ECE8E0] font-medium">online stores</span>,{' '}
            <span className="text-[#ECE8E0] font-medium">SaaS interfaces</span>, and{' '}
            <span className="text-[#ECE8E0] font-medium">UGC ads</span> — combining design, technology, and AI to turn ideas into polished digital products.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreWork}
              id="hero-explore-work-btn"
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-mono-code text-xs uppercase tracking-widest bg-[#B3521F] text-white hover:bg-[#c95e26] transition-all duration-300 shadow-xl shadow-[#B3521F]/20"
            >
              <span>Explore my work</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onStartProject}
              id="hero-start-project-btn"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-mono-code text-xs uppercase tracking-widest bg-[#ECE8E0] text-[#14141A] hover:bg-transparent hover:text-[#ECE8E0] border border-[#ECE8E0] transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B3521F] group-hover:rotate-12 transition-transform" />
              <span>Start a project</span>
            </button>

            {/* Social Proof Avatars Pill */}
            <div className="hidden md:flex items-center gap-3 pl-2 py-1">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14141A] bg-[#3D5A95] flex items-center justify-center text-[10px] font-mono-code font-bold text-white">
                  SA
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14141A] bg-[#2F6F5E] flex items-center justify-center text-[10px] font-mono-code font-bold text-white">
                  UP
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#14141A] bg-[#AD3A61] flex items-center justify-center text-[10px] font-mono-code font-bold text-white">
                  AI
                </div>
              </div>
              <div className="font-mono-code text-[10px] uppercase tracking-wider text-[#A9A49B]">
                <span className="text-[#ECE8E0] font-semibold">15+ Audits</span> Completed
              </div>
            </div>
          </div>
        </div>

        {/* Hero Footer Strip */}
        <div className="pt-12 sm:pt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#2C2C36]/50 text-xs font-mono-code text-[#A9A49B]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#B3521F]" />
              <span>REACT 19 • TYPESCRIPT • GSAP • AI-NATIVE</span>
            </div>
          </div>

          <a
            href="#services"
            className="flex items-center gap-2 text-[#A9A49B] hover:text-[#ECE8E0] transition-colors"
          >
            <span>DISCOVER CRAFTS</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
