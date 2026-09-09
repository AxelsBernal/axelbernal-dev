import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { view } from "@/state/view";

/**
 * Objetos suaves flotando detrás del vidrio, al estilo de una escena de
 * Spline: cápsulas, toros, cajas redondeadas y un par de piezas de vidrio.
 * Se apartan del cursor y vuelven a su sitio con un resorte.
 */

type Kind = "capsule" | "torus" | "box" | "ico" | "glass";

type Shape = {
  kind: Kind;
  home: THREE.Vector3;
  scale: number;
  color: string;
  spin: number;
  seed: number;
};

const PALETTE = ["#8fa8ff", "#5fe3d0", "#c99cff", "#ffc46b", "#ff8fb1", "#a5f3fc"];

function rnd(seed: number) {
  /* generador determinista para que la escena sea igual en cada carga */
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildShapes(count: number): Shape[] {
  const r = rnd(7);
  const kinds: Kind[] = ["capsule", "torus", "box", "ico", "glass", "capsule", "torus", "glass"];
  const out: Shape[] = [];
  for (let i = 0; i < count; i++) {
    const x = (r() - 0.5) * 11;
    const y = (r() - 0.5) * 9 - 1.5;
    const z = -3.8 - r() * 2.2;
    out.push({
      kind: kinds[i % kinds.length],
      home: new THREE.Vector3(x, y, z),
      scale: 0.28 + r() * 0.42,
      color: PALETTE[i % PALETTE.length],
      spin: (r() - 0.5) * 0.8,
      seed: r() * 100,
    });
  }
  return out;
}

const _pointer = new THREE.Vector3();
const _tmp = new THREE.Vector3();

function ShapeMesh({ s, low }: { s: Shape; low: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const pos = useMemo(() => s.home.clone(), [s]);
  const vel = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const step = Math.min(dt, 0.05);

    /* el cursor, llevado a la profundidad del objeto */
    const cam = state.camera;
    const vp = state.viewport.getCurrentViewport(cam, [0, 0, s.home.z]);
    _pointer.set(view.mx * vp.width * 0.5 + cam.position.x, view.my * vp.height * 0.5 + cam.position.y, s.home.z);

    /* flotación propia + regreso a casa + empujón del cursor */
    _tmp.copy(s.home);
    _tmp.y += Math.sin(t * 0.7 + s.seed) * 0.25;
    _tmp.x += Math.cos(t * 0.5 + s.seed) * 0.18;
    const toHome = _tmp.sub(pos).multiplyScalar(2.2);
    vel.addScaledVector(toHome, step);

    const away = pos.clone().sub(_pointer);
    const d = away.length();
    const radius = 2.2;
    if (d < radius && d > 0.0001) {
      away.normalize().multiplyScalar((radius - d) * 6);
      vel.addScaledVector(away, step);
    }
    vel.multiplyScalar(1 - 2.6 * step);
    pos.addScaledVector(vel, step);
    g.position.copy(pos);
    g.rotation.x += s.spin * step;
    g.rotation.y += s.spin * 0.7 * step;
  });

  const soft = low ? (
    <meshStandardMaterial color={s.color} roughness={0.45} metalness={0.1} />
  ) : (
    <meshPhysicalMaterial color={s.color} roughness={0.38} metalness={0.05} clearcoat={1} clearcoatRoughness={0.25} envMapIntensity={1.2} />
  );
  const glass = low ? (
    <meshStandardMaterial color="#cfe0ff" roughness={0.2} metalness={0.6} transparent opacity={0.4} />
  ) : (
    <meshPhysicalMaterial
      color="#ffffff"
      transmission={1}
      thickness={0.8}
      roughness={0.08}
      ior={1.45}
      attenuationColor="#8fa8ff"
      attenuationDistance={2.5}
      envMapIntensity={1.6}
    />
  );

  return (
    <group ref={ref} position={s.home} scale={s.scale}>
      {s.kind === "capsule" && (
        <mesh rotation={[0, 0, 0.6]}>
          <capsuleGeometry args={[0.55, 1.1, 8, 24]} />
          {soft}
        </mesh>
      )}
      {s.kind === "torus" && (
        <mesh>
          <torusGeometry args={[0.9, 0.36, 24, 64]} />
          {soft}
        </mesh>
      )}
      {s.kind === "box" && (
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.35} smoothness={6}>
          {soft}
        </RoundedBox>
      )}
      {s.kind === "ico" && (
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          {soft}
        </mesh>
      )}
      {s.kind === "glass" && (
        <mesh>
          <icosahedronGeometry args={[1.05, low ? 1 : 3]} />
          {glass}
        </mesh>
      )}
    </group>
  );
}

export function Shapes({ low }: { low: boolean }) {
  const shapes = useMemo(() => buildShapes(low ? 7 : 12), [low]);
  return (
    <group>
      {shapes.map((s, i) => (
        <ShapeMesh key={i} s={s} low={low} />
      ))}
    </group>
  );
}
