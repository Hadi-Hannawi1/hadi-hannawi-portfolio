import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Augment JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      [elemName: string]: any;
    }
  }
}

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { viewport } = useThree();

  // Responsive scale based on viewport width
  const isMobile = viewport.width < 5;
  const baseScale = isMobile ? 1.2 : 1.8;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      
      // Subtle scale breathing
      const s = baseScale + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Sphere args={[1, 64, 64]} scale={baseScale} ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <MeshDistortMaterial
        color={hovered ? "#ffffff" : "#e5e5e5"} 
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={1}
        envMapIntensity={1.5}
      />
    </Sphere>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 2]}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        
        {/* Simple lighting setup for metallic look */}
        {/* @ts-ignore */}
        <ambientLight intensity={0.2} />
        {/* @ts-ignore */}
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        {/* @ts-ignore */}
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#404040" />
        
        {/* Studio environment for reflections */}
        <Environment preset="studio" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <AnimatedShape />
        </Float>
      </Canvas>
    </div>
  );
};

export default Hero3D;