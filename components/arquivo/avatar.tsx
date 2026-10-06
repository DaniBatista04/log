"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { forwardRef, Suspense, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
  AnimationMixer,
  LoopOnce,
  Matrix4,
  type AnimationAction,
  type Group,
  type Mesh,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { FOLDER } from "./layout";
import { characterUrl, type Glasses, type Hat, type Look } from "./look";
import { STATUS_COLOR } from "./palette";
import { analyze, applyColors } from "./recolor";

export type AvatarAction = "idle" | "walk" | "reach-high" | "reach-low" | "hold" | "nod";

const CLIPS: Record<AvatarAction, string> = {
  idle: "idle",
  walk: "walk",
  "reach-high": "interact-right",
  "reach-low": "pick-up",
  hold: "holding-both",
  nod: "emote-yes",
};
/** Gestos que acontecem uma vez e param na pose final. */
const ONCE = new Set([CLIPS["reach-high"], CLIPS["reach-low"], CLIPS.nod]);

/** O modelo tem 0,67 de altura; dobrado, fica da altura da estante. */
const SCALE = 2;
const FADE = 0.2;

export type AvatarHandle = {
  root: Group;
  play: (action: AvatarAction) => void;
};

export const Avatar = forwardRef<
  AvatarHandle,
  { look: Look; walkSpeed: number; reading: { status: "entregue" | "andamento" } | null }
>(function Avatar({ look, walkSpeed, reading }, ref) {
  const gltf = useLoader(GLTFLoader, characterUrl(look.base));
  const root = useRef<Group>(null!);
  const current = useRef<AnimationAction | null>(null);
  const hat = useRef<Group>(null);
  const inverse = useMemo(() => new Matrix4(), []);

  const { model, mixer, actions, recolor, head } = useMemo(() => {
    const model = clone(gltf.scene);
    model.traverse((object) => {
      if ((object as Mesh).isMesh) object.castShadow = true;
    });
    const mixer = new AnimationMixer(model);
    const actions = new Map<string, AnimationAction>();
    for (const clip of gltf.animations) {
      const action = mixer.clipAction(clip);
      if (ONCE.has(clip.name)) {
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = clip.name !== CLIPS.nod;
      }
      if (clip.name === CLIPS.walk) action.setEffectiveTimeScale(walkSpeed);
      actions.set(clip.name, action);
    }
    return {
      model,
      mixer,
      actions,
      recolor: analyze(model),
      head: model.getObjectByName("head") ?? null,
    };
  }, [gltf, walkSpeed]);

  useEffect(() => {
    if (!recolor) return;
    const texture = applyColors(recolor, look.colors);
    return () => texture.dispose();
  }, [recolor, look.colors]);

  useFrame((_, dt) => {
    mixer.update(dt);
    // Acessórios seguem o osso da cabeça: copia a pose dele, relativa ao boneco.
    const group = hat.current;
    if (!group || !head) return;
    root.current.updateWorldMatrix(true, false);
    head.updateWorldMatrix(true, false);
    group.matrix.copy(inverse.copy(root.current.matrixWorld).invert()).multiply(head.matrixWorld);
  });

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
      <group ref={hat} matrixAutoUpdate={false}>
        <Accessories glasses={look.glasses} hat={look.hat} hatColor={look.colors.shirt} />
      </group>
      {reading && <OpenFolder status={reading.status} />}
    </group>
  );
});

/* ------------------------------------------------------------------ */
/* Acessórios                                                         */
/* ------------------------------------------------------------------ */

/**
 * Desenhados no espaço do osso da cabeça, em unidades do modelo, com a origem
 * no pescoço: a cabeça vai de y 0 a 0,33 e o rosto fica em z 0,17.
 */
function Accessories({
  glasses,
  hat,
  hatColor,
}: {
  glasses: Glasses;
  hat: Hat;
  hatColor: string | null;
}) {
  return (
    <>
      {glasses !== "nenhum" && (
        <Suspense fallback={null}>
          <KenneyGlasses dark={glasses === "escuro"} />
        </Suspense>
      )}
      {hat === "bone" && <Cap color={hatColor ?? "#3E6FA8"} />}
      {hat === "fone" && <Headphones />}
    </>
  );
}

function KenneyGlasses({ dark }: { dark: boolean }) {
  const gltf = useLoader(GLTFLoader, `/personagens/aid-${dark ? "sunglasses" : "glasses"}.glb`);
  const object = useMemo(() => gltf.scene.clone(), [gltf]);
  return <primitive object={object} position={[0, 0.082, 0.082]} />;
}

function Cap({ color }: { color: string }) {
  return (
    <group position={[0, 0.27, -0.005]}>
      {/* Copa: meia esfera achatada, colada no alto da cabeça. */}
      <mesh scale={[1, 0.6, 0.85]} castShadow>
        <sphereGeometry args={[0.235, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.8} flatShading />
      </mesh>
      {/* Aba curta: de cima, uma aba longa esconde o rosto. */}
      <mesh position={[0, 0.005, 0.22]} rotation-x={0.08} castShadow>
        <boxGeometry args={[0.34, 0.02, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position-y={0.14}>
        <sphereGeometry args={[0.025, 8, 6]} />
        <meshStandardMaterial color="#F4F1EA" />
      </mesh>
    </group>
  );
}

function Headphones() {
  return (
    <group position={[0, 0.15, 0]}>
      <mesh>
        <torusGeometry args={[0.255, 0.024, 8, 28, Math.PI]} />
        <meshStandardMaterial color="#2E3440" roughness={0.5} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.245, -0.02, 0]} rotation-z={Math.PI / 2}>
          <mesh castShadow>
            <cylinderGeometry args={[0.075, 0.075, 0.07, 18]} />
            <meshStandardMaterial color="#2E3440" roughness={0.5} />
          </mesh>
          <mesh position-y={side * 0.04}>
            <cylinderGeometry args={[0.055, 0.055, 0.02, 18]} />
            <meshStandardMaterial color="#E0A43A" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

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
