"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beams = [
    { initialX: 10, translateX: 10, duration: 7, delay: 0, repeatDelay: 5 },
    { initialX: 600, translateX: 600, duration: 3, delay: 2, repeatDelay: 3 },
    { initialX: 100, translateX: 100, duration: 7, delay: 4, repeatDelay: 7 },
    { initialX: 400, translateX: 400, duration: 5, delay: 6, repeatDelay: 5 },
    { initialX: 800, translateX: 800, duration: 11, delay: 8, repeatDelay: 11 },
    { initialX: 1000, translateX: 1000, duration: 4, delay: 10, repeatDelay: 4 },
    { initialX: 200, translateX: 200, duration: 6, delay: 12, repeatDelay: 6 },
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden bg-slate-950",
        className
      )}
    >
      {beams.map((beam, index) => (
        <motion.div
          key={`beam-${index}`}
          initial={{
            translateX: beam.initialX,
            translateY: "-200px",
          }}
          animate={{
            translateX: beam.translateX,
            translateY: "1800px",
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            repeatDelay: beam.repeatDelay,
            delay: beam.delay,
            ease: "linear",
          }}
          className="absolute left-0 top-20 h-[400px] w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
        />
      ))}
      
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
};
