import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const TechGadget = ({ position, rotationSpeed, color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
};

const FeaturesScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 10, 5]} intensity={1} color="#38b2ac" />
        <pointLight position={[10, -10, 5]} intensity={1} color="#f0b429" />
        
        <TechGadget position={[-6, 3, -5]} rotationSpeed={0.01} color="#38b2ac" />
        <TechGadget position={[6, -3, -5]} rotationSpeed={0.015} color="#f0b429" />
        <TechGadget position={[0, 0, -8]} rotationSpeed={0.005} color="#ffffff" />
        
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default FeaturesScene;
