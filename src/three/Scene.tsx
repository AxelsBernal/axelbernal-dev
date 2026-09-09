import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Aurora } from "./Aurora";
import { Shapes } from "./Shapes";
import { GlassSphere } from "./GlassSphere";
import { CameraRig } from "./CameraRig";
import { useSite } from "@/hooks/useSite";

/** El lienzo 3D fijo detrás de toda la página. */
export function Scene() {
  const { phase, low, finish } = useSite();
  const startZ = phase === "site" ? -3 : 8;

  return (
    <div className="scene-root" aria-hidden="true">
      <Canvas
        dpr={low ? [1, 1] : [1, 1.6]}
        camera={{ position: [0, 0, startZ], fov: 38, near: 0.1, far: 80 }}
        gl={{ antialias: !low, powerPreference: "high-performance", alpha: false, stencil: false }}
        onCreated={({ gl }) => gl.setClearColor("#0b1020")}
      >
        <Suspense fallback={null}>
          <Aurora />
          <Shapes low={low} />
          {phase !== "site" && <GlassSphere low={low} phase={phase} />}
          <Environment resolution={low ? 64 : 128} frames={1}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="ring" color="#8fa8ff" intensity={4} position={[-5, 2, 2]} scale={3} />
              <Lightformer form="rect" color="#5fe3d0" intensity={3} position={[5, -2, -2]} scale={[4, 1, 1]} />
              <Lightformer form="rect" color="#c99cff" intensity={2.5} position={[0, -4, 5]} scale={[6, 2, 1]} />
              <Lightformer form="rect" color="#ffffff" intensity={1.5} position={[0, 6, 2]} scale={[8, 0.6, 1]} />
            </group>
          </Environment>
          <ambientLight intensity={0.25} />
        </Suspense>
        <CameraRig phase={phase} onEntered={finish} />
      </Canvas>
    </div>
  );
}
