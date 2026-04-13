import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const LightBeam = ({ position, rotation }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.1, 2, 20, 32]} />
      <meshStandardMaterial 
        color="#f0b429" 
        transparent 
        opacity={0.1} 
        emissive="#f0b429" 
        emissiveIntensity={2} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const LeaderboardScene = ({ compact = false }) => {
  const ringPosition = compact ? [0, 1.5, -7] : [0, 5, -5];
  const ringRadius = compact ? 7.2 : 10;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={2} color="#f0b429" />
        
        <group position={[0, -5, -10]}>
          <LightBeam position={[-5, 0, 0]} rotation={[0.2, 0, 0.2]} />
          <LightBeam position={[0, 0, 0]} rotation={[0.4, 0, 0]} />
          <LightBeam position={[5, 0, 0]} rotation={[0.2, 0, -0.2]} />
        </group>

        <Sparkles count={100} scale={20} size={4} speed={0.5} color="#f0b429" opacity={0.3} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <mesh position={ringPosition}>
             <torusGeometry args={[ringRadius, 0.02, 16, 100]} />
             <meshBasicMaterial color="#f0b429" transparent opacity={0.2} />
           </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default LeaderboardScene;
