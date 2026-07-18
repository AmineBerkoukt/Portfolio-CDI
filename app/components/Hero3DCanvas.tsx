"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
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

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    // Gentle vertical float — rotation is now handled by OrbitControls.
    group.position.y = 0.9 + Math.sin(t * 1.2) * 0.03;
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
        autoRotateSpeed={1.0}
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
            // Force the renderer to adopt the container's actual pixel
            // dimensions right away.  This prevents the "blank until
            // scroll" bug caused by the canvas initializing with a
            // stale or zero size.
            gl.setSize(size.width, size.height, false);
          }}
        >
          <ForceInitialRender />
          <Suspense fallback={null}>
            <Scene pointerRef={pointerRef} />
          </Suspense>
        </Canvas>
        <LoadOverlay />
        {showBubble && <ChatBubble text={bubbleText} isDark={isDark} />}
      </div>
    </ErrorBoundary>
  );
}