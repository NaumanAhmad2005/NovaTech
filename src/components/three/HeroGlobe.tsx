"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current || !wireRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.08 + mouse.x * 0.3;
    meshRef.current.rotation.x = mouse.y * 0.15;
    wireRef.current.rotation.y = t * 0.05;
    wireRef.current.rotation.x = t * 0.03;
  });

  // Create lat/long lines on a sphere
  const globePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let lat = -90; lat <= 90; lat += 15) {
      for (let lon = 0; lon < 360; lon += 5) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        const r = 1.52;
        points.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ));
      }
    }
    return points;
  }, []);

  return (
    <group>
      {/* Core glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#0a1628"
          emissive="#1d4ed8"
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.2}
          distort={0.08}
          speed={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.52, 24, 24]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.3} />
      </mesh>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.9, 0.01, 8, 100]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} />
      </mesh>

      {/* Points on globe */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(globePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#38BDF8" size={0.018} transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Ambient light for globe */}
      <pointLight position={[3, 3, 3]} color="#3B82F6" intensity={2} />
      <pointLight position={[-3, -3, -3]} color="#38BDF8" intensity={1} />
    </group>
  );
}

function Particles() {
  const count = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#38BDF8" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.1} />
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <Particles />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <GlobeMesh />
      </Float>
    </Canvas>
  );
}
