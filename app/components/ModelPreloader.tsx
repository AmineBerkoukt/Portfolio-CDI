"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

// Kick off the avatar GLB download on the client as early as possible —
// before the Hero canvas mounts — so it's decoded and ready by the time the
// model renders. Runs in an effect (not at module scope) so it never
// executes during SSR.
export default function ModelPreloader() {
  useEffect(() => {
    useGLTF.preload("/avatar3d.glb");
  }, []);
  return null;
}
