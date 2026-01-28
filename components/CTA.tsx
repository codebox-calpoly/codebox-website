"use client";

import { motion } from "framer-motion";
import { SlideInButton } from "./ui/SlideInButton";

export function CTA() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <motion.h2
        className="text-5xl lg:text-6xl text-foreground mb-10 font-bold leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80">
          Ready to start
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#22c55e]">
          building?
        </span>
      </motion.h2>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SlideInButton
          variant="large"
          buttonText="Apply Now"
          useGradient={true}
          gradientFrom="#1bad63"
          gradientTo="#16a057"
          hoverGradientFrom="#16a057"
          defaultTextColor="#ffffff"
          hoverTextColor="#ffffff"
          iconName="Rocket"
          onClick={() => window.open("#", "_blank")}
        />
        <SlideInButton
          variant="large"
          buttonText="Join Discord"
          defaultBackgroundColor="transparent"
          hoverBackgroundColor="#ffffff"
          defaultTextColor="#ffffff"
          hoverTextColor="#000000"
          borderColor="rgba(255,255,255,0.3)"
          hoverBorderColor="transparent"
          iconName="ExternalLink"
          link="https://discord.gg/etH8DFQQwk"
          newTab={true}
        />
      </motion.div>
    </div>
  );
}
