import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, Sparkles, Box, Torus, Points, PointMaterial, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// 1. Hero: Stars and a subtle distorting sphere (like a sun/coin)
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1.5, 64, 64]} position={[-5, 2, -5]}>
            <MeshDistortMaterial color="#ffcc00" emissive="#aa6600" emissiveIntensity={0.5} distort={0.3} speed={2} roughness={0.2} metalness={0.3} />
          </Sphere>
        </Float>
        <Sparkles count={150} scale={12} size={3} speed={0.4} opacity={0.8} color="#ffcc00" />
      </Canvas>
    </div>
  );
}

// 2. Features: Floating Geometry
function GeometryNodes() {
  const group = useRef(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
      group.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Box args={[1.2, 1.2, 1.2]} position={[4, 1, -3]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial color="#a855f7" emissive="#4c1d95" emissiveIntensity={0.5} roughness={0.2} metalness={0.3} />
        </Box>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Torus args={[1.2, 0.4, 16, 32]} position={[-4, -2, -4]} rotation={[-0.5, 0.5, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0369a1" emissiveIntensity={0.5} roughness={0.2} metalness={0.3} />
        </Torus>
      </Float>
      <Float speed={1} rotationIntensity={1} floatIntensity={3}>
        <Sphere args={[1, 32, 32]} position={[3, -3, -5]}>
           <meshStandardMaterial color="#4ade80" emissive="#166534" emissiveIntensity={0.5} roughness={0.1} metalness={0.3} />
        </Sphere>
      </Float>
    </group>
  );
}

export function FeaturesBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 5]} intensity={2} />
        <GeometryNodes />
        <Sparkles count={100} scale={15} size={4} speed={0.3} color="#ffffff" />
      </Canvas>
    </div>
  );
}

// 3. AI Section: Neural Network / Particles
function ParticleSwarm() {
  const ref = useRef(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    const color = new THREE.Color();
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const mixedColor = color.setHex(Math.random() > 0.5 ? 0xa855f7 : 0x38bdf8);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial transparent vertexColors size={0.1} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

export function AIBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}

// 4. Leaderboard Section: Ascending Pillars and Crystal
function LeaderboardScene() {
  const group = useRef(null);
  
  const count = 25;
  const pillars = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 25,
      z: (Math.random() - 0.5) * 15 - 5,
      speed: 0.5 + Math.random() * 1.5,
      height: 1 + Math.random() * 5,
      offset: Math.random() * 20,
    }));
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const pillar = pillars[i];
        let y = ((state.clock.elapsedTime * pillar.speed + pillar.offset) % 15) - 7.5;
        child.position.y = y;
      });
    }
  });

  return (
    <group ref={group}>
      {pillars.map((p, i) => (
        <Box key={i} args={[0.3, p.height, 0.3]} position={[p.x, 0, p.z]}>
          <meshStandardMaterial color="#ffcc00" emissive="#aa6600" emissiveIntensity={1} transparent opacity={0.5} />
        </Box>
      ))}
    </group>
  );
}

export function LeaderboardBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={3} color="#ffb400" />
        <LeaderboardScene />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
           <Octahedron args={[1.5, 0]} position={[0, 1, -2]}>
             <meshStandardMaterial color="#fffbe6" emissive="#ffaa00" emissiveIntensity={0.8} wireframe={true} />
           </Octahedron>
        </Float>
        <Sparkles count={150} scale={20} size={3} speed={1} color="#ffcc00" />
      </Canvas>
    </div>
  );
}

// 5. Community Footer: Wavy Net and moving stars
function WavyNet() {
  const meshRef = useRef(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      // Combine multiple sine waves for a liquid/wavy net effect
      const z = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time * 0.8) * 0.5;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.4, 0, 0]} position={[0, -1.5, -4]}>
      <planeGeometry args={[30, 15, 60, 30]} />
      <meshBasicMaterial color="#ffb400" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

export function CommunityBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
        <WavyNet />
        <Stars radius={50} depth={20} count={3000} factor={4} saturation={1} fade speed={3} />
        <Sparkles count={150} scale={15} size={3} speed={0.4} color="#ffcc00" />
      </Canvas>
    </div>
  );
}
