import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Tunnel = () => {
  const meshRef = useRef();
  const count = 100;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
            t: Math.random() * 100,
            factor: 20 + Math.random() * 100,
            speed: 0.01 + Math.random() / 200,
            xFactor: -50 + Math.random() * 100,
            yFactor: -50 + Math.random() * 100,
            zFactor: -50 + Math.random() * 100
        });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[10, 10, 100, 32, 1, true]} />
            <meshStandardMaterial color="#f0b429" wireframe transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
    </group>
  );
};

const StarStream = ({ count = 500 }) => {
    const pointsRef = useRef();
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 40;
            p[i * 3 + 1] = (Math.random() - 0.5) * 40;
            p[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return p;
    }, [count]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.position.z += 1.5;
            if (pointsRef.current.position.z > 50) {
                pointsRef.current.position.z = -50;
            }
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#f0b429" transparent opacity={0.8} />
        </points>
    );
};

const WarpSpeedScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#f0b429" />
        
        <Tunnel />
        <StarStream />
        
        <fog attach="fog" args={['#000', 10, 60]} />
      </Canvas>
      {/* Overlay gradient for better blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-doge-darker opacity-80"></div>
    </div>
  );
};

export default WarpSpeedScene;
