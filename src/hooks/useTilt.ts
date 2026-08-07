"use client";

import type { MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";

const SPRING = { stiffness: 300, damping: 20, mass: 0.4 };


export function useTilt(maxTilt = 8) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);
  const springScale = useSpring(scale, SPRING);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * maxTilt);
    rotateY.set(px * maxTilt);
    scale.set(1.02);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return {
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      transformPerspective: 800,
    },
    onMouseMove,
    onMouseLeave,
  };
}
