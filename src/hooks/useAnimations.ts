import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return {
    ref,
    variants: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    transition: { duration: 0.6, ease: "easeOut" }
  };
}

export function useStaggeredReveal(delay = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return {
    ref,
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: delay
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    initial: "hidden",
    animate: isInView ? "visible" : "hidden"
  };
}

export function useHoverAnimation() {
  return {
    whileHover: { 
      scale: 1.02, 
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };
}

export function useFloatingAnimation(duration = 6) {
  return {
    animate: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
    },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
}

export function useCardAnimation() {
  return {
    whileHover: {
      scale: 1.03,
      y: -4,
      boxShadow: "0 20px 50px rgba(0, 92, 101, 0.15)",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  };
}

export function usePulseAnimation(intensity = 1.05) {
  return {
    animate: {
      scale: [1, intensity, 1],
      opacity: [0.8, 1, 0.8],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
}

export function useBreathingAnimation(duration = 4) {
  return {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.9, 1, 0.9],
    },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
}

export function useStaggerChildren(staggerDelay = 0.1) {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }
    }
  };
}

export function useParallax(speed = 0.5) {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return {
    transform: `translateY(${offsetY * speed}px)`
  };
}

export function useMouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}