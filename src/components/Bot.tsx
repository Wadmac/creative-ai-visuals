import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A premium geometric AI bot — built from Three.js primitives so we don't
 * need any external 3D model files. The bot sits at the origin, floating and
 * rotating gently, with subtle idle animation.
 */
export function Bot({ mouse }: { mouse: THREE.Vector2 }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const eyeLRef = useRef<THREE.Mesh>(null);
  const eyeRRef = useRef<THREE.Mesh>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Shared metallic material
  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0d1b2a"),
        metalness: 0.92,
        roughness: 0.15,
        envMapIntensity: 1.5,
      }),
    [],
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1b2838"),
        metalness: 0.85,
        roughness: 0.2,
      }),
    [],
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#4da8da"),
        emissive: new THREE.Color("#4da8da"),
        emissiveIntensity: 2.5,
        toneMapped: false,
      }),
    [],
  );

  const eyeGlowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6ec6ff"),
        emissive: new THREE.Color("#6ec6ff"),
        emissiveIntensity: 3,
        toneMapped: false,
      }),
    [],
  );

  // Floating particles around the bot
  const particlePositions = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    return geo;
  }, [particlePositions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;

      // Mouse-follow rotation (subtle)
      const targetRotY = mouse.x * 0.3;
      const targetRotX = -mouse.y * 0.15 + 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.03,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.03,
      );
    }

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + 0.2;
    }

    if (glowRingRef.current) {
      glowRingRef.current.rotation.z = -t * 0.1;
      glowRingRef.current.rotation.y = t * 0.08;
    }

    // Eye pulse
    if (eyeLRef.current && eyeRRef.current) {
      const pulse = 0.08 + Math.sin(t * 2) * 0.015;
      eyeLRef.current.scale.setScalar(pulse);
      eyeRRef.current.scale.setScalar(pulse);
    }

    // Particles drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.04;
      particlesRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* === Head — elongated rounded box feel === */}
      <mesh ref={headRef} material={metalMat} castShadow>
        <sphereGeometry args={[0.55, 64, 64]} />
      </mesh>

      {/* Visor / face plate */}
      <mesh position={[0, 0.02, 0.35]} material={accentMat}>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* === Eyes === */}
      <mesh ref={eyeLRef} position={[-0.17, 0.06, 0.48]} material={eyeGlowMat}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      <mesh ref={eyeRRef} position={[0.17, 0.06, 0.48]} material={eyeGlowMat}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Eye glow halos */}
      <mesh position={[-0.17, 0.06, 0.47]}>
        <ringGeometry args={[0.09, 0.12, 32]} />
        <meshStandardMaterial
          color="#4da8da"
          emissive="#4da8da"
          emissiveIntensity={1.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.17, 0.06, 0.47]}>
        <ringGeometry args={[0.09, 0.12, 32]} />
        <meshStandardMaterial
          color="#4da8da"
          emissive="#4da8da"
          emissiveIntensity={1.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Mouth line */}
      <mesh position={[0, -0.12, 0.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.008, 0.01]} />
        <meshStandardMaterial
          color="#4da8da"
          emissive="#4da8da"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* === Orbital ring === */}
      <mesh ref={ringRef} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.75, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#4da8da"
          emissive="#4da8da"
          emissiveIntensity={1.2}
          toneMapped={false}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Second ring */}
      <mesh ref={glowRingRef} rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[0.9, 0.008, 16, 80]} />
        <meshStandardMaterial
          color="#6ec6ff"
          emissive="#6ec6ff"
          emissiveIntensity={0.8}
          toneMapped={false}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Holographic "data panels" — small floating planes */}
      {[
        { pos: [0.65, 0.2, 0] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], size: [0.18, 0.12] as [number, number] },
        { pos: [-0.6, 0.35, -0.1] as [number, number, number], rot: [0, 0.5, 0] as [number, number, number], size: [0.14, 0.1] as [number, number] },
        { pos: [0.45, -0.3, 0.2] as [number, number, number], rot: [0.1, -0.3, 0] as [number, number, number], size: [0.12, 0.08] as [number, number] },
      ].map((panel, i) => (
        <HoloPanel key={i} {...panel} />
      ))}

      {/* === Particles === */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          color="#4da8da"
          size={0.015}
          transparent
          opacity={0.5}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
    </group>
  );
}

function HoloPanel({
  pos,
  rot,
  size,
}: {
  pos: [number, number, number];
  rot: [number, number, number];
  size: [number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={ref} position={pos} rotation={rot}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color="#4da8da"
        emissive="#4da8da"
        emissiveIntensity={0.6}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
