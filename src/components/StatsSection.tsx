import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  isYear?: boolean;
}

const statsData: StatItem[] = [
  {
    target: 4,
    suffix: '+',
    label: 'Core Digital Disciplines',
    sublabel: 'Websites, Stores, SaaS UI & Kinetic UGC'
  },
  {
    target: 140,
    suffix: '+',
    label: 'Global Systems Shipped',
    sublabel: 'High-conversion frontend architectures'
  },
  {
    target: 2026,
    suffix: '',
    label: 'Autonomous Studio Practice',
    sublabel: 'AI-native workflows & modern web speed',
    isYear: true
  }
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 1980]);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          
          const duration = 1800;
          const startTime = performance.now();

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            setCounts([
              Math.floor(easeOutCubic * 4),
              Math.floor(easeOutCubic * 140),
              Math.floor(1980 + easeOutCubic * (2026 - 1980))
            ]);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-16 bg-black border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[1.5rem] liquid-glass flex flex-col justify-between"
            >
              <div className="font-heading italic text-5xl sm:text-6xl text-white tracking-[-2px]">
                {counts[idx]}
                {stat.suffix}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="font-body text-base text-white font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-white/70 font-body font-light mt-1">
                  {stat.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
