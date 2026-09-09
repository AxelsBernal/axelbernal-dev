import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { clamp, easeInOutCubic, smoothstep, view } from "@/state/view";
import type { Phase } from "@/hooks/useSite";

/**
 * La esfera de vidrio de la entrada, con el logo AB dentro. Refracta la
 * aurora, sigue al cursor y, cuando la cámara la atraviesa, implosiona.
 */
export function GlassSphere({ low, phase }: { low: boolean; phase: Phase }) {
  const group = useRef<THREE.Group>(null);
  const logo = useTexture("/img/logo-ab.png");
  /* En vertical (teléfono) la esfera se encoge para caber con su halo. */
  const aspect = useThree((s) => s.viewport.aspect);
  const base = aspect < 0.8 ? 0.58 : aspect < 1.2 ? 0.78 : 1;

  useEffect(() => {
    logo.colorSpace = THREE.SRGBColorSpace;
    logo.anisotropy = 4;
    logo.needsUpdate = true;
  }, [logo]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = Math.sin(t * 0.8) * 0.12;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, view.mx * 0.55 + t * 0.05, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -view.my * 0.4, 3, dt);

    let s = base;
    if (phase === "entering") {
      const e = easeInOutCubic(clamp((performance.now() - view.enterAt) / 1500));
      s = base * (1 - smoothstep(0.4, 0.68, e));
    }
    g.scale.setScalar(Math.max(0.0001, s));
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.55, low ? 48 : 96, low ? 48 : 96]} />
        {low ? (
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.6}
            roughness={0.08}
            ior={1.4}
            envMapIntensity={1.4}
            color="#ffffff"
          />
        ) : (
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.35}
            thickness={1.15}
            samples={8}
            resolution={640}
            chromaticAberration={0.08}
            anisotropicBlur={0.12}
            distortion={0.32}
            distortionScale={0.35}
            temporalDistortion={0.06}
            ior={1.32}
            roughness={0.03}
            envMapIntensity={1.6}
            color="#ffffff"
          />
        )}
      </mesh>
      {/* El logo flota en el centro; la refracción lo agranda. Va con
          alphaTest y sin `transparent` para que entre en el pase opaco: los
          materiales con transmisión sólo ven lo opaco a través del vidrio. */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.3, 1.15]} />
        <meshBasicMaterial map={logo} alphaTest={0.5} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Anillo fino de vidrio, como un halo */}
      <mesh rotation={[Math.PI / 2.6, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.035, 16, 160]} />
        <meshPhysicalMaterial
          color="#dfe7ff"
          roughness={0.15}
          metalness={0.2}
          transmission={0.6}
          thickness={0.2}
          envMapIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
