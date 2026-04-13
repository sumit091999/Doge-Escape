import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, MeshDistortMaterial, Float, Sky } from '@react-three/drei';
import * as THREE from 'three';

const WavySea = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2;
      meshRef.current.position.y = -2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <MeshDistortMaterial
        color="#0a0a0a"
        emissive="#f0b429"
        emissiveIntensity={0.15}
        wireframe={true}
        speed={1.5}
        distort={0.4}
        radius={1}
      />
    </mesh>
  );
};

const DigitalSun = () => {
  return (
    <group position={[0, 2, -20]}>
      {/* Sun Core */}
      <mesh>
        <circleGeometry args={[8, 64]} />
        <meshBasicMaterial color="#f0b429" transparent opacity={0.8} />
      </mesh>
      {/* Sun Glow */}
      <Sparkles count={50} scale={15} size={6} speed={0.5} color="#f0b429" />
    </group>
  );
};

const FlyingParticles = ({ count = 200 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.position.z += 0.2; // Move toward camera
      if (pointsRef.current.position.z > 20) {
        pointsRef.current.position.z = -30; // Reset
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#f0b429" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
};

const SceneContent = () => {
  const sceneGroup = useRef();

  useFrame((state) => {
    const { x, y } = state.mouse;
    if (sceneGroup.current) {
      sceneGroup.current.rotation.y = THREE.MathUtils.lerp(sceneGroup.current.rotation.y, x * 0.1, 0.05);
      sceneGroup.current.rotation.x = THREE.MathUtils.lerp(sceneGroup.current.rotation.x, -y * 0.1, 0.05);
    }
  });

  return (
    <group ref={sceneGroup}>
      <WavySea />
      <DigitalSun />
      <FlyingParticles />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const DogeHeroScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f0b429" />
        
        <SceneContent />
        
        <fog attach="fog" args={['#050505', 5, 30]} />
      </Canvas>
      {/* Overlay gradient for better blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-doge-darker opacity-60"></div>
    </div>
  );
};

export default DogeHeroScene;
