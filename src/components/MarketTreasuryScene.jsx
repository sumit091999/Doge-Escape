import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const MarketCoin = ({ position, rotationSpeed }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={position}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial color="#f0b429" emissive="#f0b429" emissiveIntensity={0.5} />
        </mesh>
    </Float>
  );
};

const VaultRings = () => {
    const groupRef = useRef();
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.01;
            groupRef.current.rotation.x += 0.005;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <torusGeometry args={[8, 0.05, 16, 100]} />
                <meshStandardMaterial color="#f0b429" transparent opacity={0.1} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[10, 0.05, 16, 100]} />
                <meshStandardMaterial color="#38b2ac" transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

const MarketTreasuryScene = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#f0b429" />
                
                <VaultRings />
                <MarketCoin position={[-4, 2, -5]} rotationSpeed={0.02} />
                <MarketCoin position={[4, -2, -8]} rotationSpeed={0.015} />
                <MarketCoin position={[0, 3, -12]} rotationSpeed={0.01} />
                
                <Sparkles count={150} scale={15} size={3} speed={0.6} color="#f0b429" />
                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                
                <fog attach="fog" args={['#0a0805', 2, 20]} />
            </Canvas>
        </div>
    );
};

export default MarketTreasuryScene;
