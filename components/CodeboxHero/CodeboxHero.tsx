'use client';

import { useRef, useEffect } from 'react';
import type { CodeboxHeroProps } from './types';
import { initWebGL2 } from './renderer/GLContext';
import { Pipeline } from './renderer/Pipeline';

export function CodeboxHero({
  imageSrc = '/codebox.png',
  width = '100%',
  height = '100%',
  dpi = 1.5,
  className,
  style,
  autoplay = true,
}: CodeboxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !autoplay) return;

    const gl = initWebGL2(canvas);
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    const pixelRatio = Math.min(dpi, window.devicePixelRatio);
    const pipeline = new Pipeline(gl);
    let rafId = 0;
    let lastTime = 0;
    let running = true;

    function updateCanvasSize() {
      const rect = container!.getBoundingClientRect();
      const w = Math.round(rect.width * pixelRatio);
      const h = Math.round(rect.height * pixelRatio);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        pipeline.resize(w, h);
      }
    }

    function frame(time: number) {
      if (!running) return;
      const dt = lastTime === 0 ? 16.667 : Math.min(time - lastTime, 100);
      lastTime = time;
      updateCanvasSize();
      pipeline.render(dt);
      rafId = requestAnimationFrame(frame);
    }

    const observer = new ResizeObserver(() => updateCanvasSize());
    observer.observe(container);

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pipeline.mouse.setTarget(x, y);
    }

    function onMouseLeave() {
      pipeline.mouse.resetToCenter();
    }

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    updateCanvasSize();
    pipeline.init(imageSrc).then(() => {
      if (running) {
        rafId = requestAnimationFrame(frame);
      }
    });

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      pipeline.destroy();
    };
  }, [imageSrc, dpi, autoplay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        background: '#0d0d0f',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
