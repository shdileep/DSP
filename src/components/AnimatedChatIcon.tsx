import React, { useEffect, useRef } from 'react';

interface AnimatedChatIconProps {
  isAdvanced: boolean;
  color: string;
}

export default function AnimatedChatIcon({ isAdvanced, color }: AnimatedChatIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 64;
    let height = canvas.height = 64;

    // Fluid particles representing AI cognitive points
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: 1.2 + Math.random() * 1.8
      });
    }

    let pulse = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.045;

      // Draw background glow overlay
      const glow = ctx.createRadialGradient(width / 2, height / 2, 2, width / 2, height / 2, 26);
      glow.addColorStop(0, isAdvanced ? 'rgba(245, 158, 11, 0.25)' : 'rgba(79, 70, 229, 0.25)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Connect adjacent nodes with thin vector lines
      ctx.strokeStyle = isAdvanced ? 'rgba(245, 158, 11, 0.15)' : 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 22) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw floating nodes
      ctx.fillStyle = isAdvanced ? '#f59e0b' : color || '#4f46e5';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundary limits
        if (p.x < 6 || p.x > width - 6) p.vx *= -1;
        if (p.y < 6 || p.y > height - 6) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw active pulsing neural core
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 5 + Math.sin(pulse) * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = isAdvanced ? 'rgba(245, 158, 11, 0.85)' : 'rgba(79, 70, 229, 0.85)';
      ctx.fill();

      // Outer orbiting rings
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 14, pulse, pulse + Math.PI * 0.45);
      ctx.strokeStyle = isAdvanced ? '#f59e0b' : color || '#4f46e5';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 14, pulse + Math.PI, pulse + Math.PI * 1.45);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAdvanced, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full select-none pointer-events-none rounded-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
