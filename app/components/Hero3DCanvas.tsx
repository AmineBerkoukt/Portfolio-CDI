"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import ErrorBoundary from "./ErrorBoundary";
import HeroCanvasLoader from "./HeroCanvasLoader";

export type HeroPointer = { x: number; y: number };

/** The avatar GLTF, auto-centered and normalized so it fits at any native scale. */
function AvatarModel({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<HeroPointer>;
}) {
  const { scene, animations } = useGLTF("/avatar3d.glb");
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Clone so the shared GLTF cache isn't mutated, and skinned meshes stay intact.
  const avatar = useMemo(() => cloneSkinned(scene), [scene]);

  // Bind clips to the skinned model root (not the outer motion group).
  const { actions, names } = useAnimations(animations, modelRef);

  // Normalize to a consistent on-screen size regardless of the model's native units.
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(avatar);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.6 / maxDim;
  }, [avatar]);

  // Play the idle clip so the avatar leaves its bind (T) pose.
  useEffect(() => {
    console.log("Available animations:", names);

    const idleName = names.find((name) => /idle/i.test(name)) ?? names[0];
    console.log("Playing animation:", idleName);

    const action = idleName ? actions?.[idleName] : undefined;
    if (!action) {
      console.warn("No animation action found!");
      return;
    }

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.fadeIn(0.4).play();

    return () => {
      action.fadeOut(0.2);
      action.stop();
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    
    // Baseline float — shifted up so the avatar sits higher in the hero panel.
    group.position.y = 0.9 + Math.sin(t * 1.2) * 0.03;

    // Subtly rotate toward the cursor, blended with a slow idle sway for life.
    const targetY = pointerRef.current.x * 0.55 + Math.sin(t * 0.4) * 0.08;
    const targetX = -pointerRef.current.y * 0.3;

    // Frame-rate independent smoothing.
    const k = 1 - Math.pow(0.0015, delta);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, k);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, k);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive ref={modelRef} object={avatar} scale={scale} />
      </Center>
    </group>
  );
}

/** Studio lighting + model. */
function Scene({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<HeroPointer>;
}) {
  return (
    <>
      {/* Soft fill so the model is always readable. */}
      <ambientLight intensity={0.7} />

      {/* Key light for clean directional shading + self shadows. */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Subtle neon accents for a tech-portfolio vibe. */}
      <pointLight
        position={[-5, 2, 4]}
        intensity={28}
        distance={18}
        color="#a855f7"
      />
      <pointLight
        position={[5, -1, 3]}
        intensity={20}
        distance={18}
        color="#22d3ee"
      />

      <AvatarModel pointerRef={pointerRef} />

      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.45}
        scale={12}
        blur={2.6}
        far={4}
        color="#000000"
      />
    </>
  );
}

/** Shared loader for the dynamic import fallback and GLTF download progress. */
function LoadOverlay() {
  const { active } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-10">
      <HeroCanvasLoader />
    </div>
  );
}

export default function Hero3DCanvas({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<HeroPointer>;
}) {
  return (
    <ErrorBoundary>
      <div className="relative h-full w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0.35, 6.0], fov: 42 }}
          className="!h-full !w-full"
        >
          <Suspense fallback={null}>
            <Scene pointerRef={pointerRef} />
          </Suspense>
        </Canvas>
        <LoadOverlay />
      </div>
    </ErrorBoundary>
  );
}

useGLTF.preload("/avatar3d.glb");