export class MouseTracker {
  private targetX = 0.5;
  private targetY = 0.5;
  private currentX = 0.5;
  private currentY = 0.5;
  private springFactor = 3.0;
  private returnSpringFactor = 12.0;
  private snapThreshold = 0.0005;
  private isInside = false;

  update(dtSeconds: number): void {
    const dx = this.targetX - this.currentX;
    const dy = this.targetY - this.currentY;
    if (Math.abs(dx) < this.snapThreshold && Math.abs(dy) < this.snapThreshold) {
      this.currentX = this.targetX;
      this.currentY = this.targetY;
      return;
    }
    const spring = this.isInside ? this.springFactor : this.returnSpringFactor;
    const factor = 1 - Math.exp(-dtSeconds * spring);
    this.currentX += dx * factor;
    this.currentY += dy * factor;
  }

  setTarget(x: number, y: number): void {
    this.isInside = true;
    this.targetX = Math.max(0, Math.min(1, x));
    this.targetY = Math.max(0, Math.min(1, y));
  }

  resetToCenter(): void {
    this.isInside = false;
    this.targetX = 0.5;
    this.targetY = 0.5;
  }

  getX(): number {
    return this.currentX;
  }

  getY(): number {
    return this.currentY;
  }
}
