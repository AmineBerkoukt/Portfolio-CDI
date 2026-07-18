"use client";

import { useGLTF } from "@react-three/drei";

// Start the avatar GLB download at the very first client render — before the
// Hero (and its canvas) even mounts — so the model is decoded and ready the
// instant the canvas appears at the top of the page, instead of popping in
// later once the heavy page has finished rendering.
useGLTF.preload("/avatar3d.glb");

export default function ModelPreloader() {
  return null;
}
