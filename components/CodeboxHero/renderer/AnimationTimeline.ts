function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function linear(t: number): number {
  return t;
}

interface Animation {
  startValue: number | [number, number];
  endValue: number | [number, number];
  duration: number;
  delay: number;
  easing: (t: number) => number;
  currentValue: number | [number, number];
  complete: boolean;
}

export class AnimationTimeline {
  private animations = new Map<string, Animation>();
  private elapsed = 0;

  constructor() {
    this.animations.set('noiseOpacity', {
      startValue: 1.0,
      endValue: 0.2,
      duration: 1000,
      delay: 1000,
      easing: easeInOutQuad,
      currentValue: 1.0,
      complete: false,
    });

    this.animations.set('bokehPos', {
      startValue: [0.4982578397212543, 0.49581881533101047],
      endValue: [0.5, 1.5],
      duration: 1025,
      delay: 500,
      easing: easeInOutQuad,
      currentValue: [0.4982578397212543, 0.49581881533101047],
      complete: false,
    });

    this.animations.set('godraysIntensity', {
      startValue: 0,
      endValue: 0.25,
      duration: 500,
      delay: 1500,
      easing: easeInOutQuad,
      currentValue: 0,
      complete: false,
    });

    this.animations.set('vhsMix', {
      startValue: 1.0,
      endValue: 0.0,
      duration: 1250,
      delay: 3250,
      easing: linear,
      currentValue: 1.0,
      complete: false,
    });
  }

  update(dtMs: number): void {
    this.elapsed += dtMs;

    for (const anim of this.animations.values()) {
      if (anim.complete) continue;

      const localTime = this.elapsed - anim.delay;
      if (localTime < 0) continue;

      const t = Math.min(localTime / anim.duration, 1);
      const eased = anim.easing(t);

      if (typeof anim.startValue === 'number' && typeof anim.endValue === 'number') {
        anim.currentValue = anim.startValue + (anim.endValue - anim.startValue) * eased;
      } else if (Array.isArray(anim.startValue) && Array.isArray(anim.endValue)) {
        anim.currentValue = [
          anim.startValue[0] + (anim.endValue[0] - anim.startValue[0]) * eased,
          anim.startValue[1] + (anim.endValue[1] - anim.startValue[1]) * eased,
        ];
      }

      if (t >= 1) anim.complete = true;
    }
  }

  get(name: string): number | [number, number] {
    return this.animations.get(name)!.currentValue;
  }

  getFloat(name: string): number {
    return this.get(name) as number;
  }

  getVec2(name: string): [number, number] {
    return this.get(name) as [number, number];
  }

  reset(): void {
    this.elapsed = 0;
    for (const anim of this.animations.values()) {
      anim.currentValue = anim.startValue;
      anim.complete = false;
    }
  }
}
