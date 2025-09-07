import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: "homepage" | "platform" | "minimal";
  className?: string;
}

export function AnimatedBackground({ 
  children, 
  variant = "minimal",
  className = "" 
}: AnimatedBackgroundProps) {
  const getBackgroundClasses = () => {
    switch (variant) {
      case "homepage":
        return "natural-bg animate-mesh";
      case "platform":
        return "dot-grid ambient-bg animate-ambient";
      default:
        return "bg-gradient-to-br from-background via-background to-muted/10";
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Animated Background Layer */}
      <div className={`absolute inset-0 ${getBackgroundClasses()}`} />
      
      {/* Floating Orbs for Natural Movement */}
      {variant === "homepage" && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/5 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </>
      )}
      
      {/* Grid Pattern Overlay for Platform */}
      {variant === "platform" && (
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary/20"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}