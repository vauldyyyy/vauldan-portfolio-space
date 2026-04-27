import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

/* ─── Project data ─── */
interface ProjectData {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  speed: number;
  tilt: number;
  desc: string;
  tags: string[];
  shape: "shield" | "train" | "capsule" | "document";
}

const PROJECTS: ProjectData[] = [
  {
    name: "FraudLens",
    color: "#3776AB",
    size: 0.5,
    orbitRadius: 4.0,
    speed: 0.6,
    tilt: 0.15,
    desc: "Real-time UPI fraud detection with 5-model stacking ensemble and SHAP explainability.",
    tags: ["Python", "FastAPI", "React", "SHAP"],
    shape: "shield",
  },
  {
    name: "RailGuard AI",
    color: "#FF6B35",
    size: 0.55,
    orbitRadius: 6.5,
    speed: 0.4,
    tilt: -0.12,
    desc: "Railway surveillance — YOLOv8, ByteTrack, LSTM crowd forecasting & CrewAI orchestration.",
    tags: ["YOLOv8", "LSTM", "CrewAI", "FastAPI"],
    shape: "train",
  },
  {
    name: "MedTrack",
    color: "#2ECC71",
    size: 0.45,
    orbitRadius: 8.8,
    speed: 0.28,
    tilt: 0.2,
    desc: "Smart medicine management with AI prescription scanning, dose reminders & Supabase sync.",
    tags: ["Flutter", "Gemini API", "Supabase"],
    shape: "capsule",
  },
  {
    name: "RAG Research",
    color: "#9B59B6",
    size: 0.48,
    orbitRadius: 11.0,
    speed: 0.18,
    tilt: -0.18,
    desc: "Research study on RAG failure modes across Gemini API, chunking strategies & query corruption.",
    tags: ["RAG", "Gemini API", "LangChain", "Python"],
    shape: "document",
  },
];

/* ─── Central Sun (represents Vauldan) ─── */
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
      {/* "W" label on hover area */}
      <Html position={[0, 2, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="font-anton uppercase text-[11px] tracking-[0.2em] text-neon/50 whitespace-nowrap">
          Vauldan D'Souza
        </div>
      </Html>
    </group>
  );
}

/* ─── Orbit rings ─── */
function OrbitRing({ radius, tilt }: { radius: number; tilt: number }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial color="#EFF4FF" transparent opacity={0.12} />
    </mesh>
  );
}

/* ─── Shield shape (FraudLens) ─── */
function ShieldShape({ color, size }: { color: string; size: number }) {
  return (
    <group>
      {/* Main body — rounded box */}
      <mesh>
        <boxGeometry args={[size * 1.2, size * 1.5, size * 0.3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Top accent */}
      <mesh position={[0, size * 0.85, 0]}>
        <sphereGeometry args={[size * 0.25, 16, 16]} />
        <meshStandardMaterial color="#6FFF00" emissive="#6FFF00" emissiveIntensity={0.6} />
      </mesh>
      {/* Scanning beam ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, size * 0.2]}>
        <torusGeometry args={[size * 0.8, 0.02, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Train shape (RailGuard) ─── */
function TrainShape({ color, size }: { color: string; size: number }) {
  return (
    <group>
      {/* Body */}
      <mesh>
        <boxGeometry args={[size * 1.8, size * 0.9, size * 0.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Cabin top */}
      <mesh position={[size * 0.3, size * 0.65, 0]}>
        <boxGeometry args={[size * 0.9, size * 0.5, size * 0.7]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Chimney */}
      <mesh position={[-size * 0.5, size * 0.7, 0]}>
        <cylinderGeometry args={[size * 0.12, size * 0.15, size * 0.5, 12]} />
        <meshStandardMaterial color="#333" emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Wheels */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x * size, -size * 0.55, size * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[size * 0.18, size * 0.18, size * 0.08, 16]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Capsule/Pill shape (MedTrack) ─── */
function CapsuleShape({ color, size }: { color: string; size: number }) {
  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <mesh>
        <capsuleGeometry args={[size * 0.35, size * 0.8, 12, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} />
      </mesh>
      {/* Divider line */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[size * 0.36, 0.015, 8, 32]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Document shape (RAG Research) ─── */
function DocumentShape({ color, size }: { color: string; size: number }) {
  return (
    <group>
      {/* Page */}
      <mesh>
        <boxGeometry args={[size * 1.0, size * 1.4, size * 0.08]} />
        <meshStandardMaterial color="#EFF4FF" emissive="#EFF4FF" emissiveIntensity={0.15} roughness={0.6} />
      </mesh>
      {/* Text lines */}
      {[-0.3, -0.05, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y * size, size * 0.05]}>
          <boxGeometry args={[size * 0.65, size * 0.06, size * 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Magnifying glass */}
      <group position={[size * 0.45, -size * 0.5, size * 0.15]}>
        <mesh>
          <torusGeometry args={[size * 0.2, 0.025, 8, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[size * 0.15, -size * 0.15, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.025, 0.025, size * 0.25, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Project object with orbit + bounce ─── */
function ProjectObject({
  data,
  onSelect,
}: {
  data: ProjectData;
  onSelect: (name: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  const { scale } = useSpring({
    scale: hovered ? 1.35 : 1,
    config: { tension: 200, friction: 18 },
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * data.speed * 0.4 + startAngle;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(t) * data.orbitRadius;
      groupRef.current.position.y = Math.sin(t) * data.orbitRadius * Math.sin(data.tilt);
    }
    // Bounce + spin
    if (innerRef.current) {
      innerRef.current.rotation.y += 0.008;
      innerRef.current.position.y = Math.sin(clock.getElapsedTime() * 2 + startAngle) * 0.15;
    }
  });

  const ShapeComponent = {
    shield: ShieldShape,
    train: TrainShape,
    capsule: CapsuleShape,
    document: DocumentShape,
  }[data.shape];

  return (
    <group ref={groupRef}>
      <animated.group
        ref={innerRef}
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
        <ShapeComponent color={data.color} size={data.size} />
      </animated.group>

      {hovered && (
        <Html position={[0, data.size + 0.8, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="font-anton uppercase text-[13px] tracking-[0.15em] text-neon whitespace-nowrap px-3 py-1.5 rounded-md liquid-glass">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ─── Floating Astronaut ─── */
function Astronaut() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.8) * 0.3 - 0.5;
    ref.current.rotation.y = (t * Math.PI * 2) / 20;
  });

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
      <mesh>
        <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
        <meshStandardMaterial color="#EFF4FF" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.75, 0.05]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial color="#0a2010" emissive="#6FFF00" emissiveIntensity={0.15} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      <mesh position={[-0.18, -0.75, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      <mesh position={[0.18, -0.75, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.6, 12]} />
        <meshStandardMaterial color="#EFF4FF" />
      </mesh>
      <mesh geometry={tetherGeom}>
        <meshStandardMaterial color="#EFF4FF" emissive="#6FFF00" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

/* ─── Main Section ─── */
export function ProjectUniverse() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedProject = PROJECTS.find((p) => p.name === selected);

  return (
    <section id="projects" className="relative w-full h-screen overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 6, 18], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sun />
          {PROJECTS.map((p) => (
            <OrbitRing key={`r-${p.name}`} radius={p.orbitRadius} tilt={p.tilt} />
          ))}
          {PROJECTS.map((p) => (
            <ProjectObject key={p.name} data={p} onSelect={setSelected} />
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
            style={{ fontSize: "clamp(40px, 8vw, 56px)", opacity: 0.06 }}
          >
            PROJECT
            <br />
            UNIVERSE
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div className="font-condiment text-neon" style={{ fontSize: "20px", opacity: 0.7 }}>
            explore my work
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-2">
            hover objects • click to see details
          </div>
        </div>
      </div>

      {/* Project detail card */}
      {selected && selectedProject && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[min(92vw,720px)] z-20">
          <div className="liquid-glass rounded-[24px] p-6 animate-in">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon mb-1">
                  Project
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
            <p className="font-mono text-[11px] uppercase tracking-wider text-cream/70 leading-[1.7] mb-3">
              {selectedProject.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-[0.15em] text-cream/70 border border-cream/15 rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
