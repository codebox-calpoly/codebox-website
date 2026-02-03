"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ImageData {
  src: string;
  alt: string;
}

interface AnimatedImageStackProps {
  images: ImageData[];
}

export function AnimatedImageStack({ images }: AnimatedImageStackProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Image 1 (top-left) - starts further up-left, moves to final position
  const img1X = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const img1Y = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const img1Rotate = useTransform(scrollYProgress, [0, 1], [12, 6]);
  const img1Scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Image 2 (middle) - starts further right, moves to final position
  const img2X = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const img2Rotate = useTransform(scrollYProgress, [0, 1], [-8, -3]);
  const img2Scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Image 3 (bottom) - starts further down, moves to final position
  const img3X = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const img3Y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const img3Rotate = useTransform(scrollYProgress, [0, 1], [8, 3]);
  const img3Scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[500px] w-full">
      {/* Image 1 - Top left */}
      <motion.div
        className="absolute top-4 left-28 w-56 h-56 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 cursor-pointer"
        style={{
          x: img1X,
          y: img1Y,
          rotate: img1Rotate,
          scale: img1Scale,
          opacity,
        }}
        whileHover={{ rotate: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
          src={images[0]?.src || "/codebox-groups.jpg"}
          alt={images[0]?.alt || "Team collaboration"}
          width={4000}
          height={3000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </motion.div>

      {/* Image 2 - Middle right */}
      <motion.div
        className="absolute top-40 left-72 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 cursor-pointer"
        style={{
          x: img2X,
          y: img2Y,
          rotate: img2Rotate,
          scale: img2Scale,
          opacity,
        }}
        whileHover={{ rotate: -7 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
          src={images[1]?.src || "/codebox-4.jpg"}
          alt={images[1]?.alt || "Coding session"}
          width={3000}
          height={2000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </motion.div>

      {/* Image 3 - Bottom */}
      <motion.div
        className="absolute bottom-4 left-44 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 cursor-pointer"
        style={{
          x: img3X,
          y: img3Y,
          rotate: img3Rotate,
          scale: img3Scale,
          opacity,
        }}
        whileHover={{ rotate: 7 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
          src={images[2]?.src || "/codebox-2.jpg"}
          alt={images[2]?.alt || "Team event"}
          width={1000}
          height={1500}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </div>
  );
}
