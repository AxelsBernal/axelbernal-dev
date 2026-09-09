import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { clamp, easeInOutCubic, smoothstep, view } from "@/state/view";
import type { Phase } from "@/hooks/useSite";

const INTRO_Z = 8;
const SITE_Z = -3;
const ENTER_MS = 1500;

/**
 * La cámara en tres estados: mirando la esfera, atravesándola, y luego
 * paseando por el sitio con el scroll y el cursor.
 */
export function CameraRig({ phase, onEntered }: { phase: Phase; onEntered: () => void }) {
  const done = useRef(false);

  useFrame((state, dt) => {
    const cam = state.camera;
    const d = Math.min(dt, 0.05);

    if (phase === "intro") {
      cam.position.x = THREE.MathUtils.damp(cam.position.x, view.mx * 0.5, 2.5, d);
      cam.position.y = THREE.MathUtils.damp(cam.position.y, view.my * 0.35, 2.5, d);
      cam.position.z = INTRO_Z;
      cam.lookAt(0, 0, 0);
      return;
    }

    if (phase === "entering") {
      const e = easeInOutCubic(clamp((performance.now() - view.enterAt) / ENTER_MS));
      cam.position.z = INTRO_Z + (SITE_Z - INTRO_Z) * e;
      cam.position.x = THREE.MathUtils.damp(cam.position.x, 0, 4, d);
      cam.position.y = THREE.MathUtils.damp(cam.position.y, 0, 4, d);
      view.boost = smoothstep(0.35, 0.62, e) * (1 - smoothstep(0.62, 1, e)) * 0.45;
      cam.lookAt(0, 0, -30);
      if (e >= 1 && !done.current) {
        done.current = true;
        onEntered();
      }
      return;
    }

    /* sitio: la cámara baja con el scroll y se ladea con el cursor */
    const ty = -view.scroll * 3.2 + view.my * 0.22;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, SITE_Z, 4, d);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, ty, 5, d);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, view.mx * 0.32, 3, d);
    view.boost = THREE.MathUtils.damp(view.boost, 0, 3, d);
    cam.lookAt(cam.position.x * 0.35, cam.position.y, -30);
  });

  return null;
}
