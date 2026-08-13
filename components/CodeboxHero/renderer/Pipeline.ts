import type { RenderTarget, CompiledPass } from '../types';
import {
  compileProgram,
  createFullscreenQuad,
  createRenderTarget,
  resizeRenderTarget,
  loadTexture,
  drawQuad,
  deleteRenderTarget,
} from './GLContext';
import { AnimationTimeline } from './AnimationTimeline';
import { MouseTracker } from './MouseTracker';

import * as gradient from '../shaders/gradient';
import * as image from '../shaders/image';
import * as projection from '../shaders/projection';
import * as noiseFill from '../shaders/noiseFill';
import * as bokeh from '../shaders/bokeh';
import * as bloom from '../shaders/bloom';
import * as godrays from '../shaders/godrays';
import * as coloration from '../shaders/coloration';
import * as vignette from '../shaders/vignette';
import * as ninetiesVideo from '../shaders/ninetiesVideo';

export class Pipeline {
  private gl: WebGL2RenderingContext;
  private vao!: WebGLVertexArrayObject;

  private gradientPass!: CompiledPass;
  private imagePass!: CompiledPass;
  private projectionPass!: CompiledPass;
  private noiseFillPass!: CompiledPass;
  private bokehPass0!: CompiledPass;
  private bokehPass1!: CompiledPass;
  private bloomPass0!: CompiledPass;
  private bloomPass1!: CompiledPass;
  private bloomPass2!: CompiledPass;
  private godraysPass!: CompiledPass;
  private colorationPass!: CompiledPass;
  private vignettePass!: CompiledPass;
  private vhsPass0!: CompiledPass;
  private vhsPass1!: CompiledPass;

  private rtA!: RenderTarget;
  private rtB!: RenderTarget;
  private rtHalfA!: RenderTarget;
  private rtHalfB!: RenderTarget;
  private rtQuarter!: RenderTarget;

  private codeboxTexture!: WebGLTexture;
  private blueNoiseTexture!: WebGLTexture;

  private timeline = new AnimationTimeline();
  readonly mouse = new MouseTracker();

  private elapsedTime = 0;
  private width = 0;
  private height = 0;
  private destroyed = false;
  private initialized = false;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  async init(imageSrc: string): Promise<void> {
    const gl = this.gl;

    this.vao = createFullscreenQuad(gl);

    this.gradientPass = compileProgram(gl, gradient.vertexShader, gradient.fragmentShader);
    this.imagePass = compileProgram(gl, image.vertexShader, image.fragmentShader);
    this.projectionPass = compileProgram(gl, projection.vertexShader, projection.fragmentShader);
    this.noiseFillPass = compileProgram(gl, noiseFill.vertexShader, noiseFill.fragmentShader);
    this.bokehPass0 = compileProgram(gl, bokeh.vertexShader, bokeh.fragmentShaderPass0);
    this.bokehPass1 = compileProgram(gl, bokeh.vertexShader, bokeh.fragmentShaderPass1);
    this.bloomPass0 = compileProgram(gl, bloom.vertexShader, bloom.fragmentShaderPass0);
    this.bloomPass1 = compileProgram(gl, bloom.vertexShader, bloom.fragmentShaderPass1);
    this.bloomPass2 = compileProgram(gl, bloom.vertexShader, bloom.fragmentShaderPass2);
    this.godraysPass = compileProgram(gl, godrays.vertexShader, godrays.fragmentShader);
    this.colorationPass = compileProgram(gl, coloration.vertexShader, coloration.fragmentShader);
    this.vignettePass = compileProgram(gl, vignette.vertexShader, vignette.fragmentShader);
    this.vhsPass0 = compileProgram(gl, ninetiesVideo.vertexShader, ninetiesVideo.fragmentShaderPass0);
    this.vhsPass1 = compileProgram(gl, ninetiesVideo.vertexShader, ninetiesVideo.fragmentShaderPass1);

    const w = gl.drawingBufferWidth;
    const h = gl.drawingBufferHeight;
    this.width = w;
    this.height = h;

    this.rtA = createRenderTarget(gl, w, h);
    this.rtB = createRenderTarget(gl, w, h);
    this.rtHalfA = createRenderTarget(gl, Math.max(1, w >> 1), Math.max(1, h >> 1));
    this.rtHalfB = createRenderTarget(gl, Math.max(1, w >> 1), Math.max(1, h >> 1));
    this.rtQuarter = createRenderTarget(gl, Math.max(1, w >> 2), Math.max(1, h >> 2));

    const [codeboxTex, blueNoiseTex] = await Promise.all([
      loadTexture(gl, imageSrc),
      loadTexture(gl, '/blue_noise_med.png'),
    ]);

    if (this.destroyed) return;

    this.codeboxTexture = codeboxTex;
    this.blueNoiseTexture = blueNoiseTex;
    this.initialized = true;
  }

  resize(width: number, height: number): void {
    if (!this.initialized) return;
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;

    const gl = this.gl;
    resizeRenderTarget(gl, this.rtA, width, height);
    resizeRenderTarget(gl, this.rtB, width, height);
    resizeRenderTarget(gl, this.rtHalfA, Math.max(1, width >> 1), Math.max(1, height >> 1));
    resizeRenderTarget(gl, this.rtHalfB, Math.max(1, width >> 1), Math.max(1, height >> 1));
    resizeRenderTarget(gl, this.rtQuarter, Math.max(1, width >> 2), Math.max(1, height >> 2));
  }

  render(dtMs: number): void {
    if (this.destroyed || !this.initialized) return;

    const gl = this.gl;
    const dtSec = dtMs / 1000;
    this.elapsedTime += dtSec;

    this.timeline.update(dtMs);
    this.mouse.update(dtSec);

    const mouseX = this.mouse.getX();
    const mouseY = this.mouse.getY();
    const w = this.width;
    const h = this.height;

    const noiseTime = this.elapsedTime * 0.42;
    const projTime = this.elapsedTime * 1.0;
    const vhsTime = this.elapsedTime * 0.5;

    const noiseOpacity = this.timeline.getFloat('noiseOpacity');
    const bokehPos = this.timeline.getVec2('bokehPos');
    const godraysIntensity = this.timeline.getFloat('godraysIntensity');
    const vhsMix = this.timeline.getFloat('vhsMix');

    // 1. Gradient → rtA
    drawQuad(gl, this.vao, {
      pass: this.gradientPass,
      target: this.rtA,
      textures: [],
      uniforms2f: [{ name: 'uMousePos', x: 0.5, y: 0.5 }],
    });

    // 2. Image → rtB (reads rtA as uBgTexture + codebox as uSourceImage)
    drawQuad(gl, this.vao, {
      pass: this.imagePass,
      target: this.rtB,
      textures: [
        { uniform: 'uSourceImage', texture: this.codeboxTexture },
        { uniform: 'uBgTexture', texture: this.rtA.texture },
      ],
      uniforms2f: [
        { name: 'uArtboardResolution', x: w, y: h },
        { name: 'uMousePos', x: mouseX, y: mouseY },
      ],
    });

    // 3. Projection → rtA (reads rtB as uTexture)
    drawQuad(gl, this.vao, {
      pass: this.projectionPass,
      target: this.rtA,
      textures: [{ uniform: 'uTexture', texture: this.rtB.texture }],
      uniforms1f: [{ name: 'uTime', value: projTime }],
      uniforms2f: [{ name: 'uMousePos', x: mouseX, y: mouseY }],
    });

    // 4. NoiseFill → rtB (reads rtA as uTexture)
    drawQuad(gl, this.vao, {
      pass: this.noiseFillPass,
      target: this.rtB,
      textures: [{ uniform: 'uTexture', texture: this.rtA.texture }],
      uniforms1f: [
        { name: 'uTime', value: noiseTime },
        { name: 'uOpacity', value: noiseOpacity },
      ],
      uniforms2f: [
        { name: 'uMousePos', x: mouseX, y: mouseY },
        { name: 'uResolution', x: w, y: h },
      ],
    });

    // 5. Bokeh Pass0 → rtHalfA (reads rtB, downsampled)
    drawQuad(gl, this.vao, {
      pass: this.bokehPass0,
      target: this.rtHalfA,
      textures: [{ uniform: 'uTexture', texture: this.rtB.texture }],
      uniforms2f: [
        { name: 'uPos', x: bokehPos[0], y: bokehPos[1] },
        { name: 'uMousePos', x: mouseX, y: mouseY },
        { name: 'uResolution', x: this.rtHalfA.width, y: this.rtHalfA.height },
      ],
    });

    // 6. Bokeh Pass1 → rtA (reads rtHalfA + rtB as uBgTexture + blue noise)
    drawQuad(gl, this.vao, {
      pass: this.bokehPass1,
      target: this.rtA,
      textures: [
        { uniform: 'uTexture', texture: this.rtHalfA.texture },
        { uniform: 'uBgTexture', texture: this.rtB.texture },
        { uniform: 'uBlueNoise', texture: this.blueNoiseTexture },
      ],
      uniforms2f: [
        { name: 'uPos', x: bokehPos[0], y: bokehPos[1] },
        { name: 'uMousePos', x: mouseX, y: mouseY },
        { name: 'uResolution', x: w, y: h },
      ],
    });

    // rtA now holds post-bokeh scene
    // 7. Bloom Pass0 → rtHalfA (reads rtA, threshold + H blur)
    drawQuad(gl, this.vao, {
      pass: this.bloomPass0,
      target: this.rtHalfA,
      textures: [{ uniform: 'uTexture', texture: this.rtA.texture }],
      uniforms2f: [{ name: 'uResolution', x: this.rtHalfA.width, y: this.rtHalfA.height }],
    });

    // 8. Bloom Pass1 → rtHalfB (reads rtHalfA, V blur)
    drawQuad(gl, this.vao, {
      pass: this.bloomPass1,
      target: this.rtHalfB,
      textures: [{ uniform: 'uTexture', texture: this.rtHalfA.texture }],
      uniforms2f: [{ name: 'uResolution', x: this.rtHalfB.width, y: this.rtHalfB.height }],
    });

    // 9. Bloom Pass2 → rtB (reads rtHalfB + rtA as uBgTexture)
    drawQuad(gl, this.vao, {
      pass: this.bloomPass2,
      target: this.rtB,
      textures: [
        { uniform: 'uTexture', texture: this.rtHalfB.texture },
        { uniform: 'uBgTexture', texture: this.rtA.texture },
      ],
    });

    // 10. Godrays → rtA (reads rtB)
    drawQuad(gl, this.vao, {
      pass: this.godraysPass,
      target: this.rtA,
      textures: [{ uniform: 'uTexture', texture: this.rtB.texture }],
      uniforms1f: [{ name: 'uIntensity', value: godraysIntensity }],
      uniforms2f: [
        { name: 'uMousePos', x: mouseX, y: mouseY },
        { name: 'uResolution', x: w, y: h },
      ],
    });

    // 11. Coloration → rtB (reads rtA)
    drawQuad(gl, this.vao, {
      pass: this.colorationPass,
      target: this.rtB,
      textures: [{ uniform: 'uTexture', texture: this.rtA.texture }],
    });

    // 12. Vignette → rtA (reads rtB)
    drawQuad(gl, this.vao, {
      pass: this.vignettePass,
      target: this.rtA,
      textures: [{ uniform: 'uTexture', texture: this.rtB.texture }],
      uniforms2f: [{ name: 'uResolution', x: w, y: h }],
    });

    // rtA now holds post-vignette scene
    // 13. VHS Pass0 → rtQuarter (reads rtA, downsampled)
    drawQuad(gl, this.vao, {
      pass: this.vhsPass0,
      target: this.rtQuarter,
      textures: [{ uniform: 'uTexture', texture: this.rtA.texture }],
      uniforms1f: [
        { name: 'uTime', value: vhsTime },
        { name: 'uMix', value: vhsMix },
      ],
      uniforms2f: [{ name: 'uResolution', x: this.rtQuarter.width, y: this.rtQuarter.height }],
    });

    // 14. VHS Pass1 → screen (reads rtQuarter + rtA as uBgTexture)
    drawQuad(gl, this.vao, {
      pass: this.vhsPass1,
      target: null,
      textures: [
        { uniform: 'uTexture', texture: this.rtQuarter.texture },
        { uniform: 'uBgTexture', texture: this.rtA.texture },
      ],
      uniforms1f: [
        { name: 'uTime', value: vhsTime },
        { name: 'uMix', value: vhsMix },
      ],
      uniforms2f: [{ name: 'uResolution', x: w, y: h }],
    });
  }

  destroy(): void {
    this.destroyed = true;
    const gl = this.gl;

    const passes = [
      this.gradientPass, this.imagePass, this.projectionPass, this.noiseFillPass,
      this.bokehPass0, this.bokehPass1, this.bloomPass0, this.bloomPass1, this.bloomPass2,
      this.godraysPass, this.colorationPass, this.vignettePass, this.vhsPass0, this.vhsPass1,
    ];
    for (const p of passes) {
      if (p?.program) gl.deleteProgram(p.program);
    }

    const rts = [this.rtA, this.rtB, this.rtHalfA, this.rtHalfB, this.rtQuarter];
    for (const rt of rts) {
      if (rt) deleteRenderTarget(gl, rt);
    }

    if (this.codeboxTexture) gl.deleteTexture(this.codeboxTexture);
    if (this.blueNoiseTexture) gl.deleteTexture(this.blueNoiseTexture);
    if (this.vao) gl.deleteVertexArray(this.vao);
  }
}
