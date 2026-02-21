/**
 * CheckConfetti Component
 * 
 * Renders a burst of confetti particles around the checkmark circle
 * when a task is completed. Uses pure CSS animations for performance.
 * Particles radiate outward from center and fade out.
 */

import { useEffect, useState, memo } from 'react';

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
  delay: number;
  shape: 'circle' | 'square' | 'star';
}

const COLORS = [
  '#008948', // primary accent
  '#00a85a', // lighter accent
  '#66c89a', // light accent
  '#f59e0b', // amber-500
  '#fbbf24', // amber-400
  '#006634', // darker accent
  '#a78bfa', // violet-400
  '#f472b6', // pink-400
];

const PARTICLE_COUNT = 12;

function generateParticles(): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (360 / PARTICLE_COUNT) * i + (Math.random() * 20 - 10);
    particles.push({
      id: i,
      angle,
      distance: 14 + Math.random() * 10, // 14-24px travel distance
      color: COLORS[i % COLORS.length],
      size: 2.5 + Math.random() * 2, // 2.5-4.5px
      delay: Math.random() * 60, // 0-60ms stagger
      shape: (['circle', 'square', 'star'] as const)[i % 3],
    });
  }
  return particles;
}

interface CheckConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const CheckConfetti = memo(function CheckConfetti({ trigger, onComplete }: CheckConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger) {
      setParticles(generateParticles());
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setParticles([]);
        onComplete?.();
      }, 600); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isAnimating || particles.length === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 10 }}
    >
      {particles.map((particle) => {
        const radians = (particle.angle * Math.PI) / 180;
        const endX = Math.cos(radians) * particle.distance;
        const endY = Math.sin(radians) * particle.distance;

        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              marginLeft: `-${particle.size / 2}px`,
              marginTop: `-${particle.size / 2}px`,
              backgroundColor: particle.color,
              borderRadius: particle.shape === 'circle' ? '50%' : particle.shape === 'star' ? '1px' : '1px',
              transform: particle.shape === 'square' ? 'rotate(45deg)' : undefined,
              animation: `confetti-burst 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${particle.delay}ms forwards`,
              // CSS custom properties for the animation endpoint
              '--confetti-x': `${endX}px`,
              '--confetti-y': `${endY}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
});
