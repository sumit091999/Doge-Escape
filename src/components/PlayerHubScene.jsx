import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PlayerCore = () => {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.z += 0.005;
        }
    });

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                <dodecahedronGeometry args={[3, 0]} />
                <meshStandardMaterial color="#f0b429" wireframe transparent opacity={0.15} />
            </mesh>
            <mesh scale={0.8}>
                <dodecahedronGeometry args={[3, 0]} />
                <meshStandardMaterial color="#38b2ac" wireframe transparent opacity={0.1} />
            </mesh>
        </Float>
    );
};

const PlayerHubScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-25">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f0b429" />
        
        <PlayerCore />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={['#0a0805', 5, 25]} />
      </Canvas>
    </div>
  );
};

export default PlayerHubScene;
