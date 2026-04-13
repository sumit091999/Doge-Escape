import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ZkBlock = ({ position, color }) => {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
    );
};

const RisingBlocks = ({ count = 15 }) => {
    const cubes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [(Math.random() - 0.5) * 30, Math.random() * -20, (Math.random() - 0.5) * 10],
                speed: Math.random() * 0.02 + 0.01,
                size: Math.random() * 0.3 + 0.1
            });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {cubes.map((cube, i) => (
                <RisingBlock key={i} {...cube} />
            ))}
        </group>
    );
};

const RisingBlock = ({ position, speed, size }) => {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y += speed;
            if (meshRef.current.position.y > 15) {
                meshRef.current.position.y = -5;
            }
            meshRef.current.rotation.x += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color="#f0b429" transparent opacity={0.3} />
        </mesh>
    );
};

const SealOfProof = () => {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.02;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
        }
    });

    return (
        <group position={[0, 0, -10]}>
            <mesh ref={meshRef}>
                <torusGeometry args={[4, 0.1, 16, 100]} />
                <meshStandardMaterial color="#f0b429" emissive="#f0b429" emissiveIntensity={0.5} />
            </mesh>
            <Sparkles count={40} scale={5} size={6} speed={0.3} color="#f0b429" />
        </group>
    );
};

const ZkArenaScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#f0b429" />
        
        <SealOfProof />
        <RisingBlocks />
        <group position={[0, -5, 0]}>
            <ZkBlock position={[-8, 0, -5]} color="#f0b429" />
            <ZkBlock position={[8, 4, -8]} color="#38b2ac" />
            <ZkBlock position={[-3, 8, -12]} color="#f0b429" />
            <ZkBlock position={[5, 10, -6]} color="#ffffff" />
        </group>

        <Sparkles count={150} scale={20} size={5} speed={0.5} color="#f0b429" opacity={0.6} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={['#0a0805', 5, 35]} />
      </Canvas>
    </div>
  );
};

export default ZkArenaScene;
