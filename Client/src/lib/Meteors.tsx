"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  const meteors = Array.from({ length: meteorCount });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((_, idx) => {
        // Evenly distribute meteors across the container width
        const position = idx * (800 / meteorCount) - 400;

        return (
          <span
            key={`meteor-${idx}`}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px", // Start above the container
              left: `${position}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.floor(Math.random() * (10 - 5) + 5)}s`,
            }}
          />
        );
      })}
    </motion.div>
  );
};
