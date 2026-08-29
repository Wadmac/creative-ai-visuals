import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * THE ARCHIVIST — a minimal, mysterious geometric form.
 * A single eye/lens suspended inside thin wireframe rings.
 * No cartoon. No humanoid. No excessive glow.
 */
export function Archivist({
  mouseRef,
}: {
  mouseRef: React.RefObject<THREE.Vector2>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const eyeRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  // Materials — restrained, dark, minimal
  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0f1a"),
        metalness: 0.95,
        roughness: 0.2,
      }),
    [],
  );

  const wireMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a2030"),
        metalness: 0.8,
        roughness: 0.3,
      }),
    [],
  );

  // The single eye — very subtle electric blue
  const eyeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3a7cc6"),
        emissive: new THREE.Color("#3a7cc6"),
        emissiveIntensity: 1.8,
        toneMapped: false,
      }),
    [],
  );

  const irisRingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3a7cc6"),
        emissive: new THREE.Color("#3a7cc6"),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Very slow drift
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.03;

      // Subtle mouse-follow
      const ry = mouseRef.current.x * 0.15;
      const rx = -mouseRef.current.y * 0.08;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        ry,
        0.02,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rx,
        0.02,
      );
    }

    // Inner ring slow spin
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.06;
      innerRingRef.current.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.05;
    }

    // Outer ring counter-spin
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.04;
      outerRingRef.current.rotation.y = 0.3 + Math.cos(t * 0.15) * 0.04;
    }

    // Eye subtle pulse
    if (eyeRef.current) {
      const s = 0.12 + Math.sin(t * 1.5) * 0.008;
      eyeRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Central body — dark, minimal sphere */}
      <mesh material={darkMat}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>

      {/* Single eye */}
      <mesh ref={eyeRef} position={[0, 0, 0.22]} material={eyeMat}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Iris ring */}
      <mesh position={[0, 0, 0.21]} material={irisRingMat}>
        <ringGeometry args={[0.13, 0.16, 32]} />
      </mesh>

      {/* Inner wireframe ring */}
      <mesh ref={innerRingRef} rotation={[0.4, 0, 0]} material={wireMat}>
        <torusGeometry args={[0.4, 0.006, 8, 60]} />
      </mesh>

      {/* Outer wireframe ring */}
      <mesh ref={outerRingRef} rotation={[0.3, 0, 0]} material={wireMat}>
        <torusGeometry args={[0.55, 0.004, 8, 60]} />
      </mesh>

      {/* Thin antenna line — vertical */}
      <mesh position={[0, 0.45, 0]} material={wireMat}>
        <cylinderGeometry args={[0.003, 0.003, 0.4, 6]} />
      </mesh>

      {/* Small tip at antenna top */}
      <mesh position={[0, 0.66, 0]} material={eyeMat}>
        <sphereGeometry args={[0.015, 8, 8]} />
      </mesh>
    </group>
  );
}
