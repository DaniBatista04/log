"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { AnimationMixer, LoopOnce, type AnimationAction, type Group, type Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { FOLDER } from "./layout";
import { STATUS_COLOR } from "./palette";

/**
 * Personagens do pacote Mini Characters, do Kenney (CC0), em
 * `public/personagens`. Cada .glb já traz as animações; aqui só escolhemos
 * qual tocar.
 */
export const CHARACTERS = [
  "character-male-d",
  "character-female-d",
  "character-female-e",
  "character-male-e",
  "character-female-b",
  "character-male-a",
  "character-female-f",
  "character-male-f",
  "character-female-c",
  "character-male-b",
  "character-female-a",
  "character-male-c",
] as const;

export const characterUrl = (index: number) =>
  `/personagens/${CHARACTERS[index % CHARACTERS.length]}.glb`;

export type AvatarAction = "idle" | "walk" | "reach-high" | "reach-low" | "hold";

const CLIPS: Record<AvatarAction, string> = {
  idle: "idle",
  walk: "walk",
  "reach-high": "interact-right",
  "reach-low": "pick-up",
  hold: "holding-both",
};

/** O modelo tem 0,67 de altura; dobrado, fica da altura da estante. */
const SCALE = 2;
const FADE = 0.2;

export type AvatarHandle = {
  root: Group;
  play: (action: AvatarAction) => void;
};

export const Avatar = forwardRef<
  AvatarHandle,
  { url: string; walkSpeed: number; reading: { status: "entregue" | "andamento" } | null }
>(function Avatar({ url, walkSpeed, reading }, ref) {
  const gltf = useLoader(GLTFLoader, url);
  const root = useRef<Group>(null!);
  const current = useRef<AnimationAction | null>(null);

  const { model, mixer, actions } = useMemo(() => {
    const model = clone(gltf.scene);
    model.traverse((object) => {
      if ((object as Mesh).isMesh) object.castShadow = true;
    });
    const mixer = new AnimationMixer(model);
    const actions = new Map<string, AnimationAction>();
    for (const clip of gltf.animations) {
      const action = mixer.clipAction(clip);
      // Pegar a pasta acontece uma vez e fica na pose final até virar leitura.
      if (clip.name === CLIPS["reach-high"] || clip.name === CLIPS["reach-low"]) {
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;
      }
      if (clip.name === CLIPS.walk) action.setEffectiveTimeScale(walkSpeed);
      actions.set(clip.name, action);
    }
    return { model, mixer, actions };
  }, [gltf, walkSpeed]);

  useFrame((_, dt) => mixer.update(dt));

  useImperativeHandle(
    ref,
    () => ({
      get root() {
        return root.current;
      },
      play(action) {
        const next = actions.get(CLIPS[action]);
        if (!next || next === current.current) return;
        next.reset().fadeIn(current.current ? FADE : 0).play();
        current.current?.fadeOut(FADE);
        current.current = next;
      },
    }),
    [actions],
  );

  return (
    <group ref={root}>
      {/* Sombra de contato: dá chão ao boneco mesmo sem a sombra da luz. */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
        <circleGeometry args={[0.32, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.12} />
      </mesh>
      <primitive object={model} scale={SCALE} />
      {reading && <OpenFolder status={reading.status} />}
    </group>
  );
});

/** A pasta aberta nas mãos, inclinada para quem está olhando de cima. */
function OpenFolder({ status }: { status: "entregue" | "andamento" }) {
  const w = FOLDER.depth * 0.9;
  const h = FOLDER.height * 0.9;
  return (
    <group position={[0, 0.5, 0.42]} rotation-x={-0.8}>
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
