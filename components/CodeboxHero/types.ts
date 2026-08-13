import type { CSSProperties } from 'react';

export interface CodeboxHeroProps {
  imageSrc?: string;
  width?: number | string;
  height?: number | string;
  dpi?: number;
  className?: string;
  style?: CSSProperties;
  autoplay?: boolean;
}

export interface RenderTarget {
  fbo: WebGLFramebuffer;
  texture: WebGLTexture;
  width: number;
  height: number;
}

export interface CompiledPass {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}
