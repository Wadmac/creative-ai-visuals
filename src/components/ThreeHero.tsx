import { Suspense, useRef, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { Bot } from "@/components/Bot";

/**
 * Detects reduced-motion preference. Reads the initial value synchronously
 * so there is no extra render from a setState inside an effect body.
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/** Bridges the mouse position from DOM → Three.js */
function MouseBridge({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector2>;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const ndcX = (mouseRef.current.x * 0.5 + 0.5) * 2 - 1;
    const ndcY = -(mouseRef.current.y * 0.5 + 0.5) * 2 + 1;

    const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();

    mouseRef.current.x = ndcX;
    mouseRef.current.y = ndcY;
  });

  return null;
}

export function ThreeHero() {
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  const handleMouseMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    },
    [],
  );

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-32 w-32 rounded-full border border-accent/30 bg-accent/10" />
          <p className="text-sm text-muted-foreground">
            3D experience paused for reduced-motion preference
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handleMouseMove}
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const botMouse = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    botMouse.current.copy(mouseRef.current);
  });

  return (
    <>
      {/* Lighting — cinematic and premium */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.2}
        color="#e8f0fe"
        castShadow
      />
      <pointLight position={[-2, 2, 3]} intensity={0.8} color="#4da8da" />
      <pointLight position={[2, -1, 2]} intensity={0.4} color="#6ec6ff" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.6}
        color="#ffffff"
      />

      <MouseBridge mouseRef={mouseRef} />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <Bot mouseRef={botMouse} />
      </Float>

      <Environment preset="night" environmentIntensity={0.4} />
    </>
  );
}
