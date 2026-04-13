import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const GridPlane = () => {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = -Math.PI / 2.2;
            meshRef.current.position.y = -2;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[100, 100, 50, 50]} />
            <meshStandardMaterial 
                color="#f0b429" 
                wireframe 
                transparent 
                opacity={0.08} 
            />
        </mesh>
    );
};

const LightScan = () => {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 10;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[100, 0.2]} />
            <meshStandardMaterial color="#f0b429" transparent opacity={0.2} emissive="#f0b429" emissiveIntensity={2} />
        </mesh>
    );
};

const FloatingCubes = ({ count = 20 }) => {
    const groupRef = useRef();
    const cubes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15],
                size: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.01
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {cubes.map((cube, i) => (
                <mesh key={i} position={cube.position}>
                    <boxGeometry args={[cube.size, cube.size, cube.size]} />
                    <meshStandardMaterial color="#f0b429" wireframe transparent opacity={0.15} />
                </mesh>
            ))}
        </group>
    );
};

const DashboardScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
        <color attach="background" args={['#0a0805']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f0b429" />
        
        <GridPlane />
        <LightScan />
        <FloatingCubes />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={['#0a0805', 5, 25]} />
      </Canvas>
    </div>
  );
};

export default DashboardScene;
