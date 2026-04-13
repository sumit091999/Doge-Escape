import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

const RacingGate = ({ index }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    meshRef.current.position.z = ((time * 2.8 + index * 4) % 24) - 18;
    meshRef.current.rotation.z = time * 0.22 + index * 0.55;
    meshRef.current.scale.setScalar(1 + Math.sin(time + index) * 0.05);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -index * 4]}>
      <torusGeometry args={[3.5 + index * 0.08, 0.045, 12, 72]} />
      <meshStandardMaterial color={index % 2 ? '#38b2ac' : '#f0b429'} emissive={index % 2 ? '#38b2ac' : '#f0b429'} emissiveIntensity={0.85} transparent opacity={0.42} />
    </mesh>
  );
};

const RacingBoat = ({ position, color, speed }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    groupRef.current.position.x = position[0] + Math.sin(time * speed) * 0.45;
    groupRef.current.position.y = position[1] + Math.cos(time * speed * 1.2) * 0.18;
    groupRef.current.rotation.z = Math.sin(time * speed) * 0.16;
  });

  return (
    <Float speed={2.4} rotationIntensity={0.35} floatIntensity={0.7}>
      <group ref={groupRef} position={position}>
        <mesh scale={[0.9, 0.22, 0.42]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0.52, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[0.36, 0.36, 0.36]}>
          <coneGeometry args={[0.55, 0.9, 4]} />
          <meshStandardMaterial color="#e8dcc8" emissive="#f0b429" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const SpeedLines = ({ count = 90 }) => {
  const pointsRef = useRef();
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = -Math.random() * 24;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.position.z = (state.clock.elapsedTime * 6) % 8;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#f0b429" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
};

export const GamePreviewScene = () => (
  <div className="absolute inset-0 pointer-events-none opacity-40">
    <Canvas camera={{ position: [0, 0, 8], fov: 58 }}>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, 5]} intensity={1.8} color="#f0b429" />
      <pointLight position={[-5, -2, 4]} intensity={1.1} color="#38b2ac" />

      {Array.from({ length: 7 }, (_, index) => (
        <RacingGate key={index} index={index} />
      ))}
      <RacingBoat position={[-3.8, -1.55, -3]} color="#f0b429" speed={1.4} />
      <RacingBoat position={[3.5, 1.4, -6]} color="#38b2ac" speed={1.1} />
      <SpeedLines />
      <Sparkles count={80} scale={[11, 6, 16]} size={3} speed={0.65} color="#f0b429" />
      <Stars radius={60} depth={35} count={900} factor={3} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#0f0c08', 4, 22]} />
    </Canvas>
  </div>
);

const CompanionCore = () => {
  const groupRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.45;
      groupRef.current.rotation.x = Math.sin(time * 0.45) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * -0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.2} rotationIntensity={0.45} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial color="#f0b429" emissive="#f0b429" emissiveIntensity={0.42} wireframe />
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.15, 0.035, 12, 96]} />
          <meshStandardMaterial color="#38b2ac" emissive="#38b2ac" emissiveIntensity={0.6} transparent opacity={0.65} />
        </mesh>
      </Float>
    </group>
  );
};

const CompanionSatellite = ({ angle, radius, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * 0.7 + angle;
    meshRef.current.position.x = Math.cos(time) * radius;
    meshRef.current.position.y = Math.sin(time * 1.3) * 0.9;
    meshRef.current.position.z = Math.sin(time) * radius - 2;
    meshRef.current.rotation.x += 0.018;
    meshRef.current.rotation.y += 0.024;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.34, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

export const CompanionShowcaseScene = () => (
  <div className="absolute inset-0 pointer-events-none opacity-32">
    <Canvas camera={{ position: [0, 0, 9], fov: 58 }}>
      <ambientLight intensity={0.42} />
      <pointLight position={[4, 4, 5]} intensity={1.5} color="#f0b429" />
      <pointLight position={[-4, -3, 4]} intensity={1.2} color="#38b2ac" />

      <CompanionCore />
      {Array.from({ length: 8 }, (_, index) => (
        <CompanionSatellite
          key={index}
          angle={(index / 8) * Math.PI * 2}
          radius={3.2 + (index % 2) * 0.8}
          color={index % 2 ? '#38b2ac' : '#f0b429'}
        />
      ))}
      <Sparkles count={120} scale={[12, 7, 12]} size={2.4} speed={0.45} color="#f0b429" />
      <Stars radius={70} depth={40} count={1200} factor={4} saturation={0} fade speed={0.8} />
      <fog attach="fog" args={['#0a0805', 3, 20]} />
    </Canvas>
  </div>
);
