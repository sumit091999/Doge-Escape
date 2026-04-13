import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 30 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return p;
  }, [count]);

  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#f0b429" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
};

const ChatGlassScene = ({ color = "#f0b429" }) => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden rounded-2xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={color} />
        
        <ParticleField />
        <Sparkles count={20} scale={5} size={2} speed={0.3} color={color} />
        
        <fog attach="fog" args={['#0f0c08', 0, 8]} />
      </Canvas>
    </div>
  );
};

export default ChatGlassScene;
