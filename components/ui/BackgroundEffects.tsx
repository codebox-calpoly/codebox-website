"use client";

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] filter will-change-transform [background-image:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%),repeating-linear-gradient(100deg,#052e16_10%,#16a057_15%,#1bad63_20%,#22c55e_25%,#4ade80_30%)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] after:absolute after:inset-0 after:animate-aurora after:will-change-transform after:[background-image:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%),repeating-linear-gradient(100deg,#052e16_10%,#16a057_15%,#1bad63_20%,#22c55e_25%,#4ade80_30%)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[''] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"></div>
    </div>
  );
}
