import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

interface PlanetData {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  speed: number;
  tilt: number;
  hasRing?: boolean;
  moons?: number;
}

const PLANETS: PlanetData[] = [
  { name: "Python & ML", color: "#3776AB", size: 0.45, orbitRadius: 3.5, speed: 0.8, tilt: 0.18, moons: 2 },
  { name: "React & FastAPI", color: "#61DAFB", size: 0.5, orbitRadius: 5.2, speed: 0.5, tilt: -0.1 },
  { name: "Computer Vision", color: "#FF6B35", size: 0.42, orbitRadius: 7.0, speed: 0.35, tilt: 0.22, hasRing: true },
  { name: "LLMs & RAG", color: "#9B59B6", size: 0.48, orbitRadius: 8.8, speed: 0.25, tilt: -0.15 },
  { name: "C / C++", color: "#00599C", size: 0.38, orbitRadius: 10.5, speed: 0.18, tilt: 0.08 },
  { name: "Automation & n8n", color: "#F39C12", size: 0.55, orbitRadius: 12.0, speed: 0.12, tilt: -0.2 },
];

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.2;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          color="#6FFF00"
          emissive="#6FFF00"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} distance={40} color="#bfff80" />
    </group>
  );
}

function OrbitRing({ radius, tilt }: { radius: number; tilt: number }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial color="#EFF4FF" transparent opacity={0.15} />
    </mesh>
  );
}

function Moon({ parentSize, index }: { parentSize: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = index * Math.PI;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * (1.5 + index * 0.5) + offset;
    const r = parentSize + 0.35 + index * 0.15;
    ref.current.position.x = Math.cos(t) * r;
    ref.current.position.z = Math.sin(t) * r;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial color="#EFF4FF" emissive="#EFF4FF" emissiveIntensity={0.3} />
    </mesh>
  );
}

function Planet({
  data,
  onSelect,
}: {
  data: PlanetData;
  onSelect: (name: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  const { scale, emissive } = useSpring({
    scale: hovered ? 1.4 : 1,
    emissive: hovered ? 1.2 : 0.4,
    config: { tension: 200, friction: 18 },
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * data.speed * 0.4 + startAngle;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(t) * data.orbitRadius;
      groupRef.current.position.y = Math.sin(t) * data.orbitRadius * Math.sin(data.tilt);
    }
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <animated.mesh
        ref={meshRef}
        scale={scale as unknown as number}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data.name);
        }}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        {/* @ts-expect-error spring animated value */}
        <animated.meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={emissive}
          roughness={0.5}
          metalness={0.2}
        />
      </animated.mesh>

      {data.hasRing && (
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[data.size * 1.6, 0.04, 8, 64]} />
          <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.4} transparent opacity={0.7} />
        </mesh>
      )}

      {data.moons && Array.from({ length: data.moons }).map((_, i) => (
        <Moon key={i} parentSize={data.size} index={i} />
      ))}

      {hovered && (
        <Html position={[0, data.size + 0.6, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="font-anton uppercase text-[13px] tracking-[0.15em] text-neon whitespace-nowrap px-3 py-1.5 rounded-md liquid-glass">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function Astronaut() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.8) * 0.3 - 0.5;
    ref.current.rotation.y = (t * Math.PI * 2) / 20;
  });

  // Tether curve
  const tetherGeom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.6, 0),
      new THREE.Vector3(2, -1.5, 1),
      new THREE.Vector3(4, -1, 0.5),
      new THREE.Vector3(5.5, 0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.015, 6, false);
  }, []);

  return (
    <group ref={ref} position={[-6, 0, 2]}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
        <meshStandardMaterial color="#EFF4FF" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Helmet */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0}
          metalness={0.9}
        />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 0.75, 0.05]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial color="#0a2010" emissive="#6FFF00" emissiveIntensity={0.15} metalness={1} roughness={0.2} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.18, -0.75, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      <mesh position={[0.18, -0.75, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      {/* Tether */}
      <mesh geometry={tetherGeom}>
        <meshStandardMaterial color="#EFF4FF" emissive="#6FFF00" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

const PROJECTS_BY_PLANET: Record<string, string[]> = {
  "Python & ML": ["FraudLens — UPI Fraud Detection", "RAG Robustness Study"],
  "React & FastAPI": ["FraudLens Dashboard", "RailGuard AI Frontend"],
  "Computer Vision": ["RailGuard AI — YOLOv8 + ByteTrack"],
  "LLMs & RAG": ["When Retrieval Fails", "CrewAI Multi-Agent"],
  "C / C++": ["Systems coursework — GCE"],
  "Automation & n8n": ["YouTube Shorts Pipeline"],
};

export function SolarSystem() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="solar-system" className="relative w-full h-screen overflow-hidden" style={{ background: "#010828" }}>
      <Canvas camera={{ position: [0, 6, 18], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sun />
          {PLANETS.map((p) => (
            <OrbitRing key={`r-${p.name}`} radius={p.orbitRadius} tilt={p.tilt} />
          ))}
          {PLANETS.map((p) => (
            <Planet key={p.name} data={p} onSelect={setSelected} />
          ))}
          <Astronaut />
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={10}
            maxDistance={28}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>

      {/* Overlay text */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-10">
          <div
            className="font-anton uppercase leading-[0.9] text-cream"
            style={{ fontSize: "56px", opacity: 0.06 }}
          >
            SOLAR
            <br />
            SYSTEM
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div className="font-condiment text-neon" style={{ fontSize: "20px", opacity: 0.7 }}>
            explore my universe
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-2">
            hover planets • click to explore
          </div>
        </div>
      </div>

      {/* Project card slide-up */}
      {selected && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[min(92vw,720px)] z-20">
          <div className="liquid-glass rounded-[24px] p-6 animate-in">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon mb-1">
                  Domain
                </div>
                <div className="font-anton text-[22px] uppercase text-cream">{selected}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-cream/60 hover:text-neon font-anton text-sm uppercase"
              >
                Close ✕
              </button>
            </div>
            <ul className="space-y-2">
              {(PROJECTS_BY_PLANET[selected] ?? ["Coming soon"]).map((p) => (
                <li
                  key={p}
                  className="font-mono text-[12px] uppercase tracking-wider text-cream/80 border-l-2 border-neon pl-3"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
