"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import type { Group, Mesh } from "three";
import { FOLDER } from "./layout";
import { STATUS_COLOR } from "./palette";

export type AvatarPose = {
  /** 0 parado … 1 andando: controla o balanço das pernas. */
  walk: number;
  phase: number;
  /** Ângulo de cada braço em torno do ombro; negativo levanta para a frente. */
  leftArm: number;
  rightArm: number;
  breath: number;
};

export type AvatarHandle = {
  root: Group;
  apply: (pose: AvatarPose) => void;
};

const SKIN = "#F2D4B7";
const PANTS = "#3B4252";

/**
 * Boneco só de primitivas: cápsula de corpo, esfera de cabeça, olhinhos.
 * Quem anima é o Player, que chama `apply` a cada quadro — o componente não
 * re-renderiza para se mexer.
 */
export const Avatar = forwardRef<
  AvatarHandle,
  { color: string; reading: { status: "entregue" | "andamento" } | null }
>(function Avatar({ color, reading }, ref) {
  const root = useRef<Group>(null!);
  const body = useRef<Group>(null!);
  const leftLeg = useRef<Group>(null!);
  const rightLeg = useRef<Group>(null!);
  const leftArm = useRef<Group>(null!);
  const rightArm = useRef<Group>(null!);
  const torso = useRef<Mesh>(null!);

  useImperativeHandle(ref, () => ({
    get root() {
      return root.current;
    },
    apply(pose) {
      const swing = Math.sin(pose.phase) * 0.6 * pose.walk;
      leftLeg.current.rotation.x = swing;
      rightLeg.current.rotation.x = -swing;
      body.current.position.y = Math.abs(Math.sin(pose.phase)) * 0.04 * pose.walk;
      torso.current.scale.set(1, 1 + pose.breath * 0.02, 1);
      leftArm.current.rotation.x = pose.leftArm - swing * 0.6;
      rightArm.current.rotation.x = pose.rightArm + swing * 0.6;
    },
  }));

  return (
    <group ref={root}>
      {/* Sombra de contato: dá chão ao boneco mesmo sem a sombra da luz. */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
        <circleGeometry args={[0.3, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.12} />
      </mesh>

      <group ref={leftLeg} position={[-0.1, 0.4, 0]}>
        <Leg />
      </group>
      <group ref={rightLeg} position={[0.1, 0.4, 0]}>
        <Leg />
      </group>

      <group ref={body}>
        <mesh ref={torso} position-y={0.7} castShadow>
          <capsuleGeometry args={[0.22, 0.3, 6, 20]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>

        <group position-y={1.2}>
          <mesh castShadow>
            <sphereGeometry args={[0.21, 24, 16]} />
            <meshStandardMaterial color={SKIN} roughness={0.75} />
          </mesh>
          {/* Cabelo: uma calota levemente achatada. */}
          <mesh position={[0, 0.05, -0.02]} scale={[1.04, 0.85, 1.04]}>
            <sphereGeometry args={[0.21, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
            <meshStandardMaterial color="#4A3428" roughness={0.9} />
          </mesh>
          {[-0.075, 0.075].map((x) => (
            <mesh key={x} position={[x, 0.01, 0.195]}>
              <sphereGeometry args={[0.026, 10, 8]} />
              <meshStandardMaterial color="#1F1A17" roughness={0.4} />
            </mesh>
          ))}
        </group>

        <group ref={leftArm} position={[-0.27, 0.92, 0]}>
          <Arm color={color} />
        </group>
        <group ref={rightArm} position={[0.27, 0.92, 0]}>
          <Arm color={color} />
        </group>

        {reading && <OpenFolder status={reading.status} />}
      </group>
    </group>
  );
});

function Leg() {
  return (
    <mesh position-y={-0.19} castShadow>
      <capsuleGeometry args={[0.075, 0.22, 4, 12]} />
      <meshStandardMaterial color={PANTS} roughness={0.8} />
    </mesh>
  );
}

/** Pendurado no ombro: o grupo de fora gira e o braço acompanha. */
function Arm({ color }: { color: string }) {
  return (
    <>
      <mesh position-y={-0.17} castShadow>
        <capsuleGeometry args={[0.06, 0.26, 4, 10]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position-y={-0.36}>
        <sphereGeometry args={[0.06, 12, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
    </>
  );
}

/** A pasta aberta nas mãos, inclinada para quem está olhando de cima. */
function OpenFolder({ status }: { status: "entregue" | "andamento" }) {
  const w = FOLDER.depth;
  const h = FOLDER.height;
  return (
    <group position={[0, 0.82, 0.36]} rotation-x={-0.9}>
      {[-1, 1].map((side) => (
        <group key={side} rotation-y={side * -0.25}>
          <mesh position={[(side * w) / 2, 0, 0]} castShadow>
            <boxGeometry args={[w, h, 0.012]} />
            <meshStandardMaterial color={STATUS_COLOR[status]} roughness={0.85} />
          </mesh>
          <mesh position={[(side * w) / 2, 0, 0.012]}>
            <boxGeometry args={[w * 0.82, h * 0.86, 0.004]} />
            <meshStandardMaterial color="#FBF8F2" roughness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
