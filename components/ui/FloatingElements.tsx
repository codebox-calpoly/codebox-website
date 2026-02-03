"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Sparkles, Rocket, Globe, Cpu, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function FloatingElements() {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  // Force re-render when navigating to home page
  useEffect(() => {
    if (pathname === "/") {
      setKey((prev) => prev + 1);
    }
  }, [pathname]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for shrinking into center on scroll
  const scrollScale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Different positions moving toward center
  const topLeftX = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const topLeftY = useTransform(scrollYProgress, [0, 0.5], [0, 120]);

  const topRightX = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const topRightY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const bottomLeftX = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const bottomLeftY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const bottomRightX = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  const bottomRightY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);

  const midLeftX = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const midRightX = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  const floatingIcons = [
    {
      Icon: Code2,
      position: "top-[25%] left-[18%]",
      size: "w-10 h-10 lg:w-14 lg:h-14",
      x: topLeftX,
      y: topLeftY,
      delay: 0,
    },
    {
      Icon: Sparkles,
      position: "top-[22%] right-[18%]",
      size: "w-9 h-9 lg:w-12 lg:h-12",
      x: topRightX,
      y: topRightY,
      delay: 0.1,
    },
    {
      Icon: Rocket,
      position: "bottom-[28%] left-[20%]",
      size: "w-10 h-10 lg:w-12 lg:h-12",
      x: bottomLeftX,
      y: bottomLeftY,
      delay: 0.2,
    },
    {
      Icon: Globe,
      position: "bottom-[25%] right-[18%]",
      size: "w-9 h-9 lg:w-11 lg:h-11",
      x: bottomRightX,
      y: bottomRightY,
      delay: 0.3,
    },
    {
      Icon: Cpu,
      position: "top-[48%] left-[12%]",
      size: "w-8 h-8 lg:w-10 lg:h-10",
      x: midLeftX,
      y: topLeftY,
      delay: 0.15,
    },
    {
      Icon: Zap,
      position: "top-[45%] right-[12%]",
      size: "w-8 h-8 lg:w-10 lg:h-10",
      x: midRightX,
      y: topRightY,
      delay: 0.25,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block"
    >
      {floatingIcons.map(({ Icon, position, size, x, y, delay }, index) => (
        <motion.div
          key={`${index}-${key}`}
          className={`absolute ${position}`}
          style={{ x, y, scale: scrollScale }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 + delay }}
        >
          <motion.div
            style={{ opacity: scrollOpacity }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              y: {
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Icon
              className={`${size} text-[#1bad63] drop-shadow-[0_0_15px_rgba(27,173,99,0.4)]`}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Ambient glow spots */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-48 h-48 bg-[#1bad63]/10 rounded-full blur-[80px]"
        style={{ scale: scrollScale, opacity: scrollOpacity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-[#22c55e]/10 rounded-full blur-[100px]"
        style={{ scale: scrollScale, opacity: scrollOpacity }}
      />
    </div>
  );
}
