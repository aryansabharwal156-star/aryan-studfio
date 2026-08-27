import React, { useEffect, useRef, useState } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const isFadingOutRef = useRef(false);
  const fadeAnimRef = useRef<number | null>(null);

  const sources = Array.isArray(src) ? src : [src];
  const currentSource = sources[currentIndex % sources.length];

  const animateOpacity = (from: number, to: number, duration: number, onComplete?: () => void) => {
    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
    }
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = from + (to - from) * progress;
      setOpacity(currentOpacity);

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        fadeAnimRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimRef.current = requestAnimationFrame(step);
  };

  const handleLoadedData = () => {
    isFadingOutRef.current = false;
    // Fade in over 500ms
    animateOpacity(0, 1, 500);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay may need to be silent/handled
      });
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && !isFadingOutRef.current) {
      isFadingOutRef.current = true;
      // Fade out over 550ms
      animateOpacity(1, 0, 550);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (sources.length === 1) {
      video.currentTime = 0;
      isFadingOutRef.current = false;
      video.play().then(() => {
        animateOpacity(0, 1, 500);
      }).catch(() => {
        animateOpacity(0, 1, 500);
      });
    } else {
      isFadingOutRef.current = false;
      setCurrentIndex((prev) => (prev + 1) % sources.length);
    }
  };

  useEffect(() => {
    return () => {
      if (fadeAnimRef.current) {
        cancelAnimationFrame(fadeAnimRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      key={currentSource}
      src={currentSource}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      className={className}
      style={{
        ...style,
        opacity,
        transition: 'none',
      }}
    />
  );
}
