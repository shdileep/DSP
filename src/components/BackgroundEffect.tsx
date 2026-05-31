import { useEffect, useRef } from 'react';
import { ThemeStyle } from '../types';

interface BackgroundEffectProps {
  theme: ThemeStyle;
}

export default function BackgroundEffect({ theme }: BackgroundEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles array
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    let particles: Particle[] = [];
    const particleCount = theme === 'cyber-synth' ? 80 : theme === 'neo-ai' ? 60 : theme === 'terminal-os' ? 30 : 15;

    // Initialize particles based on theme
    const initParticles = () => {
      particles = [];
      const colors = {
        'neo-ai': ['rgba(56, 189, 248, 0.4)', 'rgba(139, 92, 246, 0.4)', 'rgba(34, 211, 238, 0.4)'],
        'cyber-synth': ['rgba(244, 63, 94, 0.5)', 'rgba(217, 70, 239, 0.5)', 'rgba(6, 182, 212, 0.5)'],
        'terminal-os': ['rgba(34, 197, 94, 0.3)', 'rgba(22, 163, 74, 0.2)', 'rgba(234, 179, 8, 0.1)'],
        'minimal-linear': ['rgba(148, 163, 184, 0.15)', 'rgba(100, 116, 139, 0.1)', 'rgba(71, 85, 105, 0.05)'],
      }[theme] || ['rgba(56, 189, 248, 0.3)'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (theme === 'cyber-synth' ? 1.5 : 0.6),
          vy: (Math.random() - 0.5) * (theme === 'cyber-synth' ? 1.5 : 0.6),
          radius: Math.random() * (theme === 'minimal-linear' ? 1.5 : 3) + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initParticles();

    // Mouse tracker
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Theme Background Grids / Textures
      if (theme === 'neo-ai') {
        // Draw elegant grid
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 64;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (theme === 'cyber-synth') {
        // Futuristic retro-synth horizontal perspective lines representing 3D horizon
        ctx.strokeStyle = 'rgba(217, 70, 239, 0.08)';
        ctx.lineWidth = 2;
        const horizon = height * 0.65;
        
        // Draw horizontal grid lines gets narrower near horizon
        let step = 4;
        for (let y = height; y > horizon; y -= step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
          step *= 1.25; // Increase spacing as we go down
        }

        // Draw radial perspective lines going to horizon center
        const centerX = width / 2;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
        for (let x = -width; x < width * 2; x += 120) {
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(centerX, horizon);
          ctx.stroke();
        }
      } else if (theme === 'terminal-os') {
        // CRT Raster scanlines
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.03)';
        ctx.lineWidth = 1.5;
        for (let y = 0; y < height; y += 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Radar circle in background representing sonar sweep
        const sweepAngle = (Date.now() / 4000) % (Math.PI * 2);
        const radarX = width - 150;
        const radarY = 150;
        ctx.beginPath();
        ctx.arc(radarX, radarY, 80, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(radarX, radarY);
        ctx.lineTo(
          radarX + Math.cos(sweepAngle) * 80,
          radarY + Math.sin(sweepAngle) * 80
        );
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.25)';
        ctx.stroke();
      } else if (theme === 'minimal-linear') {
        // Clean linear mesh dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        const dotSpacing = 40;
        for (let x = 0; x < width; x += dotSpacing) {
          for (let y = 0; y < height; y += dotSpacing) {
            ctx.fillRect(x, y, 1.5, 1.5);
          }
        }
      }

      // 2. Draw and connect particles
      particles.forEach((p, index) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Attract marginally to mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200) {
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.15;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Check distance to other particles and draw lines (Neural Network lines requested for AI themes)
        if (theme === 'neo-ai' || theme === 'cyber-synth' || theme === 'terminal-os') {
          for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            const connectDist = theme === 'neo-ai' ? 120 : theme === 'cyber-synth' ? 100 : 80;
            if (dist < connectDist) {
              const alpha = (1 - dist / connectDist) * (theme === 'terminal-os' ? 0.08 : 0.15);
              ctx.strokeStyle = theme === 'terminal-os' 
                ? `rgba(34, 197, 94, ${alpha})` 
                : theme === 'cyber-synth'
                ? `rgba(217, 70, 239, ${alpha})`
                : `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      // Ambient blur lighting underneath
      if (theme === 'neo-ai') {
        const time = Date.now() / 3000;
        const glowX1 = width * 0.25 + Math.cos(time) * 100;
        const glowY1 = height * 0.3 + Math.sin(time) * 80;
        const glowX2 = width * 0.75 + Math.sin(time * 0.8) * 120;
        const glowY2 = height * 0.7 + Math.cos(time * 0.8) * 90;

        // Draw Ambient Blue blur
        const grad1 = ctx.createRadialGradient(glowX1, glowY1, 0, glowX1, glowY1, 350);
        grad1.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
        grad1.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.arc(glowX1, glowY1, 350, 0, Math.PI * 2);
        ctx.fill();

        // Draw Ambient Purple blur
        const grad2 = ctx.createRadialGradient(glowX2, glowY2, 0, glowX2, glowY2, 350);
        grad2.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
        grad2.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(glowX2, glowY2, 350, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Gradient bg colors matching themes
  const bgColors = {
    'neo-ai': 'bg-[#050814] text-slate-100',
    'cyber-synth': 'bg-[#0a0016] text-[#ff61d5]',
    'terminal-os': 'bg-[#020502] text-green-500 font-mono',
    'minimal-linear': 'bg-[#0a0f1d] text-slate-300',
  }[theme];

  return (
    <div className={`fixed inset-0 -z-50 pointer-events-none transition-all duration-700 ease-in-out ${bgColors}`}>
      <canvas id="bg-canvas" ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {theme === 'cyber-synth' && (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#25003c]/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
