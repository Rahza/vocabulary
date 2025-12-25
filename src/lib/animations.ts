import { Variants } from "framer-motion";

export const bouncyButton: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95, y: 2 },
};

export const slideTransition: Variants = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

export const juicyCorrect: Variants = {
  animate: { 
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.4 }
  },
};

export const juicyIncorrect: Variants = {
  animate: { 
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  },
};

export const containerReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  },
};

export const itemReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
