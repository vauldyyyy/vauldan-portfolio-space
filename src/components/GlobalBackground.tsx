import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── Glitter Sparkle Burst Component ─── */
function SparkleBurst({ position, onComplete }: { position: THREE.Vector3; onComplete: () => void }) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, velocities, colors] = useMemo(() => {
    const count = 45;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    // Theme colors: Neon Green, Neon Purple, Light Blue, White
    const palette = [
      new THREE.Color("#6FFF00"),
      new THREE.Color("#b724ff"),
      new THREE.Color("#61DAFB"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = position.x;
      pos[i * 3 + 1] = position.y;
      pos[i * 3 + 2] = position.z;
      
      // Random spherical outward velocity
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.08 + Math.random() * 0.15;
      vel[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      vel[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      vel[i * 3 + 2] = speed * Math.cos(phi);
      
      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, vel, col];
  }, [position]);

  const age = useRef(0);

  useFrame((_, delta) => {
    age.current += delta;
    if (age.current > 1.2) {
      onComplete();
      return;
    }
    
    if (ref.current && ref.current.geometry) {
      const posAttr = ref.current.geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < 45; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Slight gravity effect
        velocities[i * 3 + 1] -= delta * 0.12; 
      }
      posAttr.needsUpdate = true;
      
      // Fade out
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = 1.0 - (age.current / 1.2);
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        transparent
        vertexColors
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Main Rotating Star Field ─── */
function StarField() {
  const ref = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (ref.current) {
      // Base steady rotation to match Project Universe
      ref.current.rotation.y -= delta * 0.04;
      ref.current.rotation.x -= delta * 0.01;
      
      // Keep it responsive to mouse movement
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 8;
      
      targetRotation.current.y = mouseX;
      targetRotation.current.x = -mouseY;
      
      ref.current.rotation.y += (targetRotation.current.y - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (targetRotation.current.x - ref.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {/* Same settings as Project Universe stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
    </group>
  );
}

/* ─── Interactive Scene orchestrator ─── */
function InteractiveScene() {
  const [bursts, setBursts] = useState<{ id: number; pos: THREE.Vector3 }[]>([]);
  const { camera } = useThree();

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      // Calculate normalized device coordinates (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Project into 3D space at a fixed depth (z=0)
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z; 
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Add a new sparkle burst
      setBursts((prev) => [...prev, { id: Date.now() + Math.random(), pos }]);
    };

    // Listen globally so clicks on DOM elements also trigger the background effect
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [camera]);

  return (
    <>
      <StarField />
      {bursts.map((b) => (
        <SparkleBurst 
          key={b.id} 
          position={b.pos} 
          onComplete={() => setBursts((prev) => prev.filter((burst) => burst.id !== b.id))} 
        />
      ))}
    </>
  );
}

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1]" style={{ background: "#010828" }}>
      <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
        <InteractiveScene />
      </Canvas>
    </div>
  );
}
