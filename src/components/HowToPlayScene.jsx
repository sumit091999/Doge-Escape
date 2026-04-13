import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingItem = ({ position, color, args }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
};

const HowToPlayScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f0b429" />
        
        {/* Floating Voxel Blocks */}
        <FloatingItem position={[-5, 2, -5]} color="#f0b429" args={[1, 1, 1]} />
        <FloatingItem position={[5, -2, -8]} color="#38b2ac" args={[1.5, 0.5, 0.5]} />
        <FloatingItem position={[-2, -4, -10]} color="#f0b429" args={[0.8, 0.8, 0.8]} />
        
        <Sparkles count={30} scale={10} size={2} speed={0.3} color="#f0b429" />
      </Canvas>
    </div>
  );
};

export default HowToPlayScene;
