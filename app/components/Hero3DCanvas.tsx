"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  OrbitControls,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import ErrorBoundary from "./ErrorBoundary";
import HeroCanvasLoader from "./HeroCanvasLoader";
import { useI18n } from "./I18nProvider";
import { useTheme } from "./ThemeProvider";

export type HeroPointer = { x: number; y: number };

/**
 * Inserted inside <Canvas> to force the renderer to resize and paint
 * immediately after mount.  Without this the WebGL context may report
 * a 0×0 (or stale) viewport until the browser fires a resize / scroll
 * event, which is why the model only appeared after scrolling.
 */
function ForceInitialRender() {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    // Give the browser one frame to finish layout so the canvas element
    // has its final CSS dimensions, then tell the renderer to re-read
    // them and paint.
    const raf = requestAnimationFrame(() => {
      gl.getSize(new THREE.Vector2());     // re-read actual element size
      gl.setSize(
        gl.domElement.clientWidth,
        gl.domElement.clientHeight,
        false,                              // don't update CSS style
      );
      invalidate();                         // schedule a new frame
    });
    return () => cancelAnimationFrame(raf);
  }, [gl, invalidate]);

  return null;
}

/** The avatar GLTF, auto-centered and normalized so it fits at any native scale. */
function AvatarModel({
  pointerRef,
  animTriggerRef,
}: {
  pointerRef: React.MutableRefObject<HeroPointer>;
  animTriggerRef: React.MutableRefObject<number>;
}) {
  const { scene, animations } = useGLTF("/avatar3d.glb");
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Clone so the shared GLTF cache isn't mutated, and skinned meshes stay intact.
  const avatar = useMemo(() => cloneSkinned(scene), [scene]);

  // Bind clips to the skinned model root (not the outer motion group).
  const { actions, names, mixer } = useAnimations(animations, modelRef);

  // Normalize to a consistent on-screen size regardless of the model's native units.
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(avatar);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.6 / maxDim;
  }, [avatar]);

  // Track which animation is currently playing.
  const currentClipIndex = useRef(0);
  const lastTrigger = useRef(0);
  // Programmatic "excited" animation state (double-click).
  const excitedState = useRef<{ active: boolean; startTime: number }>({ active: false, startTime: 0 });

  // Find the idle clip name.
  const idleName = useMemo(
    () => names.find((name) => /idle/i.test(name)) ?? names[0],
    [names],
  );

  // Play the idle clip so the avatar leaves its bind (T) pose.
  useEffect(() => {
    console.log("Available animations:", names);
    console.log("Playing animation:", idleName);

    const action = idleName ? actions?.[idleName] : undefined;
    if (!action) {
      console.warn("No animation action found!");
      return;
    }

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.fadeIn(0.4).play();

    // Set the idle index.
    currentClipIndex.current = idleName ? names.indexOf(idleName) : 0;

    return () => {
      action.fadeOut(0.2);
      action.stop();
    };
  }, [actions, names, idleName]);

  // React to double-click triggers.
  useEffect(() => {
    if (names.length === 0 || !actions) return;

    // Crossfade to the next clip, or play "excited" if only one clip.
    const handleTrigger = () => {
      if (names.length <= 1) {
        // Only one clip — trigger the programmatic excited animation.
        excitedState.current = { active: true, startTime: -1 }; // startTime set in useFrame
        return;
      }

      // Cycle to next animation.
      const prevIndex = currentClipIndex.current;
      const nextIndex = (prevIndex + 1) % names.length;
      currentClipIndex.current = nextIndex;

      const prevAction = actions[names[prevIndex]];
      const nextAction = actions[names[nextIndex]];

      if (prevAction && nextAction) {
        // If the next clip is the idle, loop it; otherwise play once then return to idle.
        const isIdle = names[nextIndex] === idleName;

        nextAction.reset();
        nextAction.setLoop(
          isIdle ? THREE.LoopRepeat : THREE.LoopOnce,
          isIdle ? Infinity : 1,
        );
        nextAction.clampWhenFinished = !isIdle;
        nextAction.fadeIn(0.35).play();
        prevAction.fadeOut(0.35);

        // If it's a one-shot clip, return to idle when it finishes.
        if (!isIdle) {
          const onFinished = (e: { action: THREE.AnimationAction }) => {
            if (e.action === nextAction) {
              mixer.removeEventListener("finished", onFinished);
              const idleAction = idleName ? actions[idleName] : undefined;
              if (idleAction) {
                currentClipIndex.current = names.indexOf(idleName!);
                idleAction.reset();
                idleAction.setLoop(THREE.LoopRepeat, Infinity);
                idleAction.fadeIn(0.35).play();
                nextAction.fadeOut(0.35);
              }
            }
          };
          mixer.addEventListener("finished", onFinished);
        }
      }
    };

    // Poll the trigger ref (lightweight — just a number comparison).
    const interval = setInterval(() => {
      if (animTriggerRef.current !== lastTrigger.current) {
        lastTrigger.current = animTriggerRef.current;
        handleTrigger();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [actions, names, idleName, mixer, animTriggerRef]);


  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    const excited = excitedState.current;

    if (excited.active) {
      // Initialize start time on first frame.
      if (excited.startTime < 0) excited.startTime = t;
      const elapsed = t - excited.startTime;
      const duration = 1.2;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const jumpHeight = Math.sin(progress * Math.PI) * 0.5;
        const spin = progress * Math.PI * 2;
        const scaleBounce = 1 + Math.sin(progress * Math.PI) * 0.12;

        group.position.y = 0.9 + jumpHeight;
        group.rotation.y = spin;
        group.scale.setScalar(scaleBounce);
      } else {
        excited.active = false;
        group.rotation.y = 0;
        group.scale.setScalar(1);
      }
    } else {
      // Normal float — gentle bob + subtle breathing sway.
      group.position.y = 0.9 + Math.sin(t * 1.2) * 0.04 + Math.sin(t * 0.5) * 0.015;
      // Smoothly return rotation/scale to identity if they were offset.
      group.rotation.y *= 0.92;
      group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive ref={modelRef} object={avatar} scale={scale} />
      </Center>
    </group>
  );
}

// ─── Floating sparkle particles ────────────────────────────────────────
const PARTICLE_COUNT = 60;

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Pre-compute random offsets for each particle.
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 1.6;        // 0.8 – 2.4 distance from center
      const height = -0.5 + Math.random() * 2.8;       // vertical spread
      const speed = 0.15 + Math.random() * 0.35;        // orbit speed
      const phaseY = Math.random() * Math.PI * 2;       // vertical bobbing phase
      const scaleBase = 0.008 + Math.random() * 0.018;  // tiny sparkle size
      data.push({ angle, radius, height, speed, phaseY, scaleBase });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particleData[i];
      const currentAngle = p.angle + t * p.speed;

      dummy.position.set(
        Math.cos(currentAngle) * p.radius,
        p.height + Math.sin(t * 0.8 + p.phaseY) * 0.25,
        Math.sin(currentAngle) * p.radius,
      );

      // Pulse scale for twinkling.
      const pulse = 0.7 + 0.3 * Math.sin(t * 3 + i);
      const s = p.scaleBase * pulse;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
    </instancedMesh>
  );
}

// ─── Glowing platform ring beneath the avatar ──────────────────────────
function GlowRing({ isDark }: { isDark: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ringColor = isDark ? "#a855f7" : "#1a6fe0";

  useFrame((state) => {
    const ring = ringRef.current;
    if (!ring) return;
    const t = state.clock.elapsedTime;

    ring.rotation.z = t * 0.15;

    // Pulsing emissive intensity.
    const mat = ring.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.2 + Math.sin(t * 1.5) * 0.4;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.1, 0.025, 16, 100]} />
      <meshStandardMaterial
        color={ringColor}
        emissive={ringColor}
        emissiveIntensity={1.2}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
}

// ─── Second, larger, faded ring ─────────────────────────────────────────
function OuterGlowRing({ isDark }: { isDark: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ringColor = isDark ? "#22d3ee" : "#5aa2ff";

  useFrame((state) => {
    const ring = ringRef.current;
    if (!ring) return;
    const t = state.clock.elapsedTime;

    ring.rotation.z = -t * 0.1;
    const mat = ring.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.8 + Math.sin(t * 1.0 + 1) * 0.3;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.5, 0.015, 16, 120]} />
      <meshStandardMaterial
        color={ringColor}
        emissive={ringColor}
        emissiveIntensity={0.8}
        transparent
        opacity={0.35}
        toneMapped={false}
      />
    </mesh>
  );
}

// ─── Orbiting light orbs that cast dynamic highlights ──────────────────
function OrbitingOrbs({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const color1 = isDark ? "#a855f7" : "#1a6fe0";
  const color2 = isDark ? "#22d3ee" : "#5aa2ff";

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <group ref={groupRef}>
      {/* Orb 1 — higher, slower orbit */}
      <group position={[2.0, 0.8, 0]}>
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={color1} toneMapped={false} />
        </mesh>
        <pointLight color={color1} intensity={6} distance={5} />
      </group>

      {/* Orb 2 — lower, offset orbit */}
      <group position={[-1.6, -0.1, 1.2]}>
        <mesh>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={color2} toneMapped={false} />
        </mesh>
        <pointLight color={color2} intensity={4} distance={4} />
      </group>
    </group>
  );
}

/**
 * Always-visible scene elements: lighting, effects, controls.
 * Rendered outside Suspense so they appear even while the GLB loads.
 */
function SceneEffects({ isDark }: { isDark: boolean }) {
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

      {/* ── Fancy effects (always visible) ── */}
      <FloatingParticles />
      <GlowRing isDark={isDark} />
      <OuterGlowRing isDark={isDark} />
      <OrbitingOrbs isDark={isDark} />

      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.45}
        scale={12}
        blur={2.6}
        far={4}
        color="#000000"
      />

      {/* Orbit controls — rotation only, constrained so the model
          can't be flipped upside-down. Damping gives a smooth feel.
          Auto-rotate provides a gentle spin when the user isn't
          interacting, drawing attention to the 3D nature. */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        minPolarAngle={Math.PI / 3}       // ~60° — prevent looking from above
        maxPolarAngle={Math.PI / 1.8}     // ~100° — prevent looking from below
        minAzimuthAngle={-Infinity}       // full 360° horizontal rotation
        maxAzimuthAngle={Infinity}
        enableDamping={true}
        dampingFactor={0.08}
        rotateSpeed={0.5}
        autoRotate={true}
        autoRotateSpeed={3.4}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.ROTATE,
        }}
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

/** Animated speech-bubble that pops up near the avatar's head. */
function ChatBubble({ text, isDark }: { text: string; isDark: boolean }) {
  // Dark  → purple / cyan neon gradient  (matches the point-light accents)
  // Light → azure / ivory warm gradient  (matches the cream/azure UI tones)
  const bg = isDark
    ? "linear-gradient(135deg, rgba(168,85,247,0.92), rgba(34,211,238,0.88))"
    : "linear-gradient(135deg, rgba(26,111,224,0.88), rgba(90,162,255,0.80))";

  const tailColor = isDark
    ? "rgba(168,85,247,0.92)"
    : "rgba(26,111,224,0.88)";

  const textColor = isDark ? "#ffffff" : "#ffffff";

  const shadow = isDark
    ? "0 8px 32px rgba(168,85,247,0.3), 0 2px 8px rgba(0,0,0,0.4)"
    : "0 8px 32px rgba(26,111,224,0.25), 0 2px 8px rgba(0,0,0,0.10)";

  const border = isDark
    ? "1px solid rgba(168,85,247,0.35)"
    : "1px solid rgba(26,111,224,0.30)";

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        top: "8%",
        right: "5%",
        animation: "bubblePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <div
        className="relative rounded-2xl px-5 py-3"
        style={{
          background: bg,
          backdropFilter: "blur(8px)",
          maxWidth: "220px",
          boxShadow: shadow,
          border,
        }}
      >
        <span
          className="block text-sm font-semibold leading-snug drop-shadow-sm"
          style={{ color: textColor }}
        >
          {text}
        </span>
        {/* Tail pointing down-left toward the avatar */}
        <div
          className="absolute"
          style={{
            bottom: "-10px",
            left: "24px",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: `12px solid ${tailColor}`,
          }}
        />
      </div>

      {/* Keyframes injected inline so no external CSS file is needed */}
      <style>{`
        @keyframes bubblePop {
          0%   { opacity: 0; transform: scale(0.5) translateY(12px); }
          100% { opacity: 1; transform: scale(1)   translateY(0);    }
        }
      `}</style>
    </div>
  );
}

export default function Hero3DCanvas({
  pointerRef,
  showBubble = false,
}: {
  pointerRef: React.MutableRefObject<HeroPointer>;
  showBubble?: boolean;
}) {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bubbleText = t("hero.chatBubble") as string;

  // Shared trigger counter — incremented on double-click, watched by AvatarModel.
  const animTriggerRef = useRef(0);

  // Double-tap detection for mobile.
  const lastTapRef = useRef(0);
  const handlePointerDown = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      animTriggerRef.current += 1;
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative h-full w-full" style={{ touchAction: "none" }}>
        <Canvas
          shadows
          frameloop="always"
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0.35, 6.0], fov: 42 }}
          className="!h-full !w-full"
          resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
          onCreated={({ gl, size }) => {
            gl.setSize(size.width, size.height, false);
          }}
          onPointerDown={handlePointerDown}
        >
          <ForceInitialRender />

          {/* Effects render immediately — visible even while the GLB loads. */}
          <SceneEffects isDark={isDark} />

          {/* The avatar model loads asynchronously inside Suspense. */}
          <Suspense fallback={null}>
            <AvatarModel
              pointerRef={pointerRef}
              animTriggerRef={animTriggerRef}
            />
          </Suspense>
        </Canvas>
        <LoadOverlay />
        {showBubble && <ChatBubble text={bubbleText} isDark={isDark} />}
      </div>
    </ErrorBoundary>
  );
}