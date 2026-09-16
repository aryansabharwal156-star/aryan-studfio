import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const videoSources = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
];

interface CinematicVideoPlayerProps {
  className?: string;
  style?: React.CSSProperties;
  scale?: any;
  y?: any;
}

export default function CinematicVideoPlayer({
  className = '',
  scale,
  y,
}: CinematicVideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const fadeVideo = (video: HTMLVideoElement, targetOpacity: number, duration = 1000) => {
    return new Promise<void>((resolve) => {
      const startTime = performance.now();
      const startOpacity = parseFloat(video.style.opacity || '1');

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth cubic easing
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        const newOpacity = startOpacity + (targetOpacity - startOpacity) * eased;
        video.style.opacity = String(newOpacity);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    });
  };

  const transitionToNextVideo = async (targetIndex?: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentVideo = videoRefs.current[currentVideoIndex];
    const nextIndex =
      targetIndex !== undefined
        ? targetIndex
        : (currentVideoIndex + 1) % videoSources.length;
    const nextVideo = videoRefs.current[nextIndex];

    if (nextVideo) {
      // Prepare next video
      nextVideo.currentTime = 0;
      nextVideo.style.opacity = '0';

      try {
        await nextVideo.play();
      } catch (error) {
        // Autoplay may trigger error on some browser policies
      }

      // Wait for next video to be ready
      await new Promise<void>((resolve) => {
        if (nextVideo.readyState >= 2) {
          resolve();
        } else {
          nextVideo.addEventListener('canplay', () => resolve(), { once: true });
        }
      });

      // Fade out current video
      if (currentVideo) {
        await fadeVideo(currentVideo, 0, 1000);
        currentVideo.pause();
      }

      // Fade in next video
      await fadeVideo(nextVideo, 1, 1000);

      setCurrentVideoIndex(nextIndex);
    }

    setIsTransitioning(false);
  };

  useEffect(() => {
    // Initialize all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.style.opacity = index === 0 ? '1' : '0';

        if (index === 0) {
          video.play().catch(() => {});
        }
      }
    });

    // Set up video ended event listeners
    const handlers: { [key: number]: () => void } = {};

    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handleEnded = () => {
          if (index === currentVideoIndex && !isTransitioning) {
            transitionToNextVideo();
          }
        };
        handlers[index] = handleEnded;
        video.addEventListener('ended', handleEnded);
      }
    });

    // Set up interval for automatic smooth transition every 12 seconds
    const interval = setInterval(() => {
      if (!isTransitioning) {
        transitionToNextVideo();
      }
    }, 12000);

    return () => {
      clearInterval(interval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      videoRefs.current.forEach((video, index) => {
        if (video && handlers[index]) {
          video.removeEventListener('ended', handlers[index]);
        }
      });
    };
  }, [currentVideoIndex, isTransitioning]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Video Layers */}
      <motion.div
        style={{ scale, y }}
        className="w-full h-full absolute inset-0"
      >
        {videoSources.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            style={{
              opacity: index === 0 ? 0.95 : 0,
              transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            muted
            autoPlay={index === 0}
            loop={false}
            playsInline
            preload="auto"
            src={src}
          />
        ))}
      </motion.div>

      {/* Subtle Bottom Grounding Line */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

      {/* Subtle inner border glow */}
      <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

      {/* Discreet Cinematic Shot Switcher Dots */}
      <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 z-20 flex items-center gap-1.5 pointer-events-auto bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
        <span className="text-[10px] text-white/50 font-body uppercase tracking-wider mr-1 hidden sm:inline">
          Cinematic Reel
        </span>
        {videoSources.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => transitionToNextVideo(idx)}
            className={`transition-all rounded-full cursor-pointer ${
              idx === currentVideoIndex
                ? 'w-4 h-1.5 bg-white shadow-sm'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
            title={`Switch to Cinematic Shot ${idx + 1}`}
            aria-label={`Cinematic Reel ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
