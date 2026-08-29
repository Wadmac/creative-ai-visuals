import { Suspense, useRef, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Archivist } from "@/components/Bot";

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

export function ArchivistScene({
  className,
}: {
  className?: string;
}) {
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
    return null;
  }

  return (
    <div
      className={className}
      onPointerMove={handleMouseMove}
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ArchivistSceneInner mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ArchivistSceneInner({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector2>;
}) {
  const botMouse = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    botMouse.current.copy(mouseRef.current);
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} color="#c8d8f0" />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#3a7cc6" />

      <MouseBridge mouseRef={mouseRef} />
      <Archivist mouseRef={botMouse} />
    </>
  );
}
