"use client";

import * as THREE from "three";
import { useRef } from "react";
import { Billboard } from "@react-three/drei";

type HotspotProps = {
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
};

export function Hotspot({
  position,
  isVisible,
  color = "#E6FC6A",
}: HotspotProps) {
  const hostspotRef = useRef<THREE.Mesh>(null);
  return (
    <Billboard position={position} follow>
      <mesh ref={hostspotRef} visible={isVisible}>
        <circleGeometry args={[0.02, 32]} />
        <meshStandardMaterial color={color} transparent opacity={1} />
      </mesh>

      <mesh
        visible={isVisible}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Billboard>
  );
}
