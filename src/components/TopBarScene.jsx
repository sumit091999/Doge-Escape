import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const DogeCoin = ({ position }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.04;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={0.5}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#f0b429" emissive="#f0b429" emissiveIntensity={0.5} />
    </mesh>
  );
};

const TopBarScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f0b429" />
        
        {/* Horizontal Mist / Particles */}
        <Sparkles 
            count={30} 
            scale={[15, 2, 5]} 
            size={2} 
            speed={0.2} 
            color="#f0b429" 
            opacity={0.3} 
        />
        
        {/* Small coin in the right section - matched to ProfileHeader layout */}
        <group position={[4.5, 0, 0]}>
            <DogeCoin position={[0, 0, 0]} />
        </group>

        <fog attach="fog" args={['#0f0c08', 0, 10]} />
      </Canvas>
    </div>
  );
};

export default TopBarScene;
