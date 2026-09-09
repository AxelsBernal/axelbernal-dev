import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { view } from "@/state/view";

const vertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* Ruido de valor con fbm: barato y suficiente para una aurora lenta. */
const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uBoost;
  uniform vec3 uBg;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  varying vec3 vPos;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vPos.xy * 0.3;
    float t = uTime * 0.045;
    float n1 = fbm(p + vec2(t, -t * 0.7));
    float n2 = fbm(p * 1.6 - vec2(t * 0.6, t * 0.9) + 3.1);
    float n3 = fbm(p * 0.9 + vec2(n1, n2) * 1.4 + 7.7);

    vec3 col = uBg;
    col = mix(col, uA, smoothstep(0.38, 0.86, n1));
    col = mix(col, uB, smoothstep(0.47, 0.92, n2) * 0.85);
    col = mix(col, uC, smoothstep(0.52, 0.95, n3) * 0.75);

    /* viñeta suave hacia los bordes del plano */
    float d = length(vPos.xy) * 0.06;
    float vig = smoothstep(1.4, 0.15, d);
    col *= 0.6 + 0.4 * vig;

    col += uBoost * vec3(0.85, 0.92, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function Aurora() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTime: { value: 0 },
          uBoost: { value: 0 },
          uBg: { value: new THREE.Color("#0b1020") },
          uA: { value: new THREE.Color("#2b4fd6") },
          uB: { value: new THREE.Color("#1d8f82") },
          uC: { value: new THREE.Color("#7a3fd4") },
        },
        depthWrite: false,
      }),
    [],
  );
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    material.uniforms.uTime.value += dt;
    material.uniforms.uBoost.value = view.boost;
  });

  return (
    <mesh ref={ref} position={[0, 0, -10]} material={material} frustumCulled={false}>
      <planeGeometry args={[80, 56]} />
    </mesh>
  );
}
