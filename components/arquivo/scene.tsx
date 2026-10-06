"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  CanvasTexture,
  RepeatWrapping,
  SRGBColorSpace,
  Vector3,
  type Group,
  type Object3D,
} from "three";
import type { TaskStatus } from "@/lib/log";
import { Avatar, type AvatarHandle } from "./avatar";
import {
  BOARD,
  BOARD_KEY,
  CABINET,
  FOLDER,
  SHELVES,
  type Cabinet as CabinetData,
  type FolderSlot,
  type Command,
  type Layout,
  type Target,
} from "./layout";
import { PALETTE, POSTIT, STATUS_COLOR } from "./palette";
import { buildGrid, findPath, isFree } from "./path";


type SceneProps = {
  layout: Layout;
  missingImpact: Record<string, boolean>;
  pendingCount: number;
  openKey: string | null;
  command: Command | null;
  onOpen: (key: string) => void;
  onClose: () => void;
  /** Pasta sob o mouse, para o HUD mostrar o título. */
  onHover: (id: string | null) => void;
  /**
   * Rótulos em DOM por cima do canvas, cada um com `data-anchor`. A cena só
   * os reposiciona a cada quadro; o conteúdo é do HUD.
   */
  labels: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
};

/** Câmera isométrica: sempre do mesmo canto, sem rotação livre. */
const OFFSET = new Vector3(7, 9.5, 9);
const FORWARD = new Vector3(-OFFSET.x, 0, -OFFSET.z).normalize();
const RIGHT = { x: -FORWARD.z, z: FORWARD.x };
const FACE_CAMERA = Math.atan2(OFFSET.x, OFFSET.z);
const SPEED = 3;
const ZOOM = { min: 28, max: 140 };
/** Quanto o braço sobe para cada prateleira (de cima para baixo) e no quadro. */
const REACH = [-2.5, -1.75, -0.95];
const REACH_BOARD = -2.1;
const REACH_TIME = 0.45;

export default function Scene(props: SceneProps) {
  return (
    <Canvas
      orthographic
      shadows="percentage"
      flat
      dpr={[1, 2]}
      camera={{ position: OFFSET.toArray(), zoom: 60, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true }}
    >
      <hemisphereLight args={["#FFFFFF", "#D8C8B0", 1.6]} />
      <directionalLight
        position={[6, 12, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0006}
        shadow-radius={3}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <World {...props} />
    </Canvas>
  );
}

type Phase = "idle" | "walk" | "reach" | "read";

type PlayerState = {
  x: number;
  z: number;
  rot: number;
  phase: Phase;
  path: { x: number; z: number }[];
  goal: (Target & { face: number; reach: number }) | null;
  t: number;
  walk: number;
  step: number;
  leftArm: number;
  rightArm: number;
};

const turn = (from: number, to: number, k: number) =>
  from + Math.atan2(Math.sin(to - from), Math.cos(to - from)) * k;

const ease = (dt: number, rate: number) => 1 - Math.exp(-dt * rate);

function World({
  layout,
  missingImpact,
  pendingCount,
  openKey,
  command,
  onOpen,
  onClose,
  onHover,
  labels,
  reducedMotion,
}: SceneProps) {
  const grid = useMemo(() => buildGrid(layout), [layout]);
  const slots = useMemo(
    () => new Map(layout.cabinets.flatMap((c) => c.folders.map((f) => [f.id, f] as const))),
    [layout],
  );
  const avatar = useRef<AvatarHandle>(null);
  const [reading, setReading] = useState<{ id: string; status: TaskStatus } | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const keys = useRef(new Set<string>());
  const player = useRef<PlayerState>({
    x: layout.spawn.x,
    z: layout.spawn.z,
    rot: Math.PI,
    phase: "idle",
    path: [],
    goal: null,
    t: 0,
    walk: 0,
    step: 0,
    leftArm: 0,
    rightArm: 0,
  });
  const focus = useRef(new Vector3());

  const gl = useThree((state) => state.gl);
  const size = useThree((state) => state.size);
  // Enquadra a sala inteira na primeira vez; depois quem manda é o scroll.
  // A sala vista em isométrico: cada eixo do chão projetado na tela.
  const [fit] = useState(() => {
    const { width: w, depth: d } = layout;
    const across = w * Math.abs(RIGHT.x) + d * Math.abs(RIGHT.z) + 1;
    const tilt = OFFSET.y / OFFSET.length();
    const down = (w * Math.abs(FORWARD.x) + d * Math.abs(FORWARD.z)) * tilt + 3;
    return Math.min(ZOOM.max, Math.max(ZOOM.min, 0.92 * Math.min(size.width / across, size.height / down)));
  });
  const zoom = useRef(fit);

  useEffect(() => {
    const el = gl.domElement;
    function onWheel(event: WheelEvent) {
      event.preventDefault();
      zoom.current = Math.min(
        ZOOM.max,
        Math.max(ZOOM.min, zoom.current * Math.exp(-event.deltaY * 0.0015)),
      );
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [gl]);

  useEffect(() => {
    const MOVE = new Set(["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"]);
    const typing = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

    function down(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (!MOVE.has(key) || typing(event.target) || event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      keys.current.add(key);
    }
    function up(event: KeyboardEvent) {
      keys.current.delete(event.key.toLowerCase());
    }
    function clear() {
      keys.current.clear();
    }
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useEffect(() => {
    onHover(hovered === BOARD_KEY ? null : hovered);
  }, [hovered, onHover]);

  const anchors = useMemo(() => {
    const map = new Map<string, Vector3>();
    for (const c of layout.cabinets) {
      map.set(`cabinet:${c.slug}`, new Vector3(c.x, CABINET.height + 0.28, c.z));
    }
    const { board } = layout;
    map.set("board", new Vector3(board.x + 0.05, BOARD.y + BOARD.height / 2 + 0.25, board.z));
    return map;
  }, [layout]);
  const projected = useMemo(() => new Vector3(), []);

  // Painel fechado por fora (botão, Esc): o boneco devolve a pasta.
  useEffect(() => {
    const p = player.current;
    if (openKey === null && p.phase === "read") {
      p.phase = "idle";
      setReading(null);
    }
  }, [openKey]);

  function stopReading() {
    const p = player.current;
    if (p.phase === "read") {
      p.phase = "idle";
      setReading(null);
      onClose();
    }
  }

  function walkTo(point: { x: number; z: number }, goal: PlayerState["goal"] = null) {
    stopReading();
    const p = player.current;
    p.path = findPath(grid, p, point);
    p.goal = goal;
    p.phase = p.path.length ? "walk" : "idle";
  }

  function act(target: Target) {
    if (target.kind === "folder") {
      const slot = slots.get(target.id);
      if (!slot) return;
      walkTo(
        { x: slot.standX, z: slot.standZ },
        { ...target, face: Math.PI, reach: REACH[slot.shelf] },
      );
    } else {
      const { board } = layout;
      walkTo({ x: board.standX, z: board.standZ }, { ...target, face: -Math.PI / 2, reach: REACH_BOARD });
    }
  }

  // Pedido vindo do HUD (a lista de pastas).
  const lastCommand = useRef(0);
  useEffect(() => {
    if (!command || command.n === lastCommand.current) return;
    lastCommand.current = command.n;
    act(command.target);
    // `act` muda a cada render; o que importa é o número do pedido.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command]);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const p = player.current;
    let moving = false;
    let heading = p.rot;

    const k = keys.current;
    const ix = Number(k.has("d") || k.has("arrowright")) - Number(k.has("a") || k.has("arrowleft"));
    const iz = Number(k.has("w") || k.has("arrowup")) - Number(k.has("s") || k.has("arrowdown"));

    if (ix || iz) {
      stopReading();
      p.path = [];
      p.goal = null;
      p.phase = "walk";
      const len = Math.hypot(ix, iz);
      const dx = ((RIGHT.x * ix + FORWARD.x * iz) / len) * SPEED * dt;
      const dz = ((RIGHT.z * ix + FORWARD.z * iz) / len) * SPEED * dt;
      // Desliza na parede em vez de travar: tenta cada eixo separado.
      if (isFree(layout, p.x + dx, p.z)) p.x += dx;
      if (isFree(layout, p.x, p.z + dz)) p.z += dz;
      heading = Math.atan2(dx, dz);
      moving = true;
    } else if (p.phase === "walk" && p.path.length) {
      const next = p.path[0];
      const dx = next.x - p.x;
      const dz = next.z - p.z;
      const dist = Math.hypot(dx, dz);
      const step = SPEED * dt;
      if (dist <= step) {
        p.x = next.x;
        p.z = next.z;
        p.path.shift();
      } else {
        p.x += (dx / dist) * step;
        p.z += (dz / dist) * step;
      }
      if (dist > 0.001) heading = Math.atan2(dx, dz);
      moving = true;
    } else if (p.phase === "walk") {
      p.phase = p.goal ? "reach" : "idle";
      p.t = 0;
    }

    let left = 0;
    let right = 0;
    if (p.phase === "reach" && p.goal) {
      p.t += dt;
      heading = p.goal.face;
      right = p.goal.reach;
      if (p.t >= REACH_TIME) {
        const goal = p.goal;
        p.phase = "read";
        p.goal = null;
        if (goal.kind === "folder") {
          setReading({ id: goal.id, status: slots.get(goal.id)?.status ?? "andamento" });
          onOpen(goal.id);
        } else {
          onOpen(BOARD_KEY);
        }
        setHovered(null);
      }
    } else if (p.phase === "read") {
      heading = FACE_CAMERA;
      if (reading) left = right = -1.05;
    }

    p.rot = turn(p.rot, heading, ease(dt, p.phase === "reach" ? 14 : 10));
    p.walk += ((moving ? 1 : 0) - p.walk) * ease(dt, 10);
    if (moving) p.step += dt * 11;
    p.leftArm += (left - p.leftArm) * ease(dt, 10);
    p.rightArm += (right - p.rightArm) * ease(dt, p.phase === "reach" ? 16 : 10);

    const a = avatar.current;
    if (a) {
      a.root.position.set(p.x, 0, p.z);
      a.root.rotation.y = p.rot;
      a.apply({
        walk: reducedMotion ? 0 : p.walk,
        phase: p.step,
        leftArm: p.leftArm,
        rightArm: p.rightArm,
        breath: reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 2),
      });
    }

    const camera = state.camera;
    // Com a sala inteira na tela, a câmera fica no centro; quanto mais zoom,
    // mais ela acompanha o boneco.
    const follow = Math.min(1, Math.max(0, (zoom.current - fit) / fit));
    const target = new Vector3(p.x * follow, 0, p.z * follow);
    if (reducedMotion) focus.current.copy(target);
    else focus.current.lerp(target, ease(dt, 4));
    camera.position.copy(focus.current).add(OFFSET);
    camera.lookAt(focus.current);
    const z = reducedMotion ? zoom.current : camera.zoom + (zoom.current - camera.zoom) * ease(dt, 8);
    if (Math.abs(z - camera.zoom) > 0.001) {
      camera.zoom = z;
      camera.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();

    const root = labels.current;
    if (!root) return;
    for (const el of root.children as HTMLCollectionOf<HTMLElement>) {
      const key = el.dataset.anchor;
      const slot = key === "tip" && hovered ? slots.get(hovered) : undefined;
      const anchor = slot
        ? projected.set(slot.x, slot.y + 0.4, slot.z + 0.3)
        : key && anchors.has(key)
          ? projected.copy(anchors.get(key)!)
          : null;
      if (!anchor) continue;
      anchor.project(camera);
      const x = ((anchor.x + 1) / 2) * state.size.width;
      const y = ((1 - anchor.y) / 2) * state.size.height;
      el.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`);
    }
  });

  return (
    <>
      <Room layout={layout} onFloor={(e) => walkTo({ x: e.point.x, z: e.point.z })} />

      {layout.cabinets.map((cabinet) => (
        <Cabinet
          key={cabinet.slug}
          cabinet={cabinet}
          onClick={() => walkTo({ x: cabinet.x, z: cabinet.z + CABINET.depth / 2 + 0.5 })}
        />
      ))}

      {[...slots.values()].map((slot) => (
        <Folder
          key={slot.id}
          slot={slot}
          hidden={reading?.id === slot.id}
          hovered={hovered === slot.id}
          missingImpact={missingImpact[slot.id]}
          reducedMotion={reducedMotion}
          onHover={(on) => setHovered((h) => (on ? slot.id : h === slot.id ? null : h))}
          onPick={() => act({ kind: "folder", id: slot.id })}
        />
      ))}

      <Board
        layout={layout}
        count={pendingCount}
        onHover={(on) => setHovered((h) => (on ? BOARD_KEY : h === BOARD_KEY ? null : h))}
        onPick={() => act({ kind: "board" })}
      />

      <Avatar ref={avatar} color={PALETTE.avatar} reading={reading} />

    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sala                                                               */
/* ------------------------------------------------------------------ */

function usePlanks(width: number, depth: number) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = PALETTE.floor;
    ctx.fillRect(0, 0, 256, 256);
    const tones = ["#E3D2B6", "#EBDDC6", "#E6D6BC", "#EEE1CB"];
    for (let row = 0; row < 8; row++) {
      // Tábuas desencontradas, como piso de verdade.
      const shift = (row % 2) * 96;
      for (let col = -1; col < 2; col++) {
        ctx.fillStyle = tones[(row * 3 + col + 4) % tones.length];
        ctx.fillRect(shift + col * 192 + 1, row * 32 + 1, 190, 30);
      }
    }
    const texture = new CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(width / 3, depth / 3);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [width, depth]);
}

function Room({
  layout,
  onFloor,
}: {
  layout: Layout;
  onFloor: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const { width: w, depth: d } = layout;
  const planks = usePlanks(w, d);
  const wallH = 1.9;
  const t = 0.15;

  return (
    <group>
      {/* Base da maquete. */}
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <boxGeometry args={[w + 0.3, 0.3, d + 0.3]} />
        <meshStandardMaterial color={PALETTE.floorEdge} roughness={0.9} />
      </mesh>
      <mesh
        rotation-x={-Math.PI / 2}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onFloor(e);
        }}
      >
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial map={planks} roughness={0.85} />
      </mesh>

      {/* Paredes baixas só no fundo e à esquerda: o resto fica aberto para a câmera. */}
      <mesh position={[0, wallH / 2, -d / 2 - t / 2]} castShadow receiveShadow>
        <boxGeometry args={[w + 2 * t, wallH, t]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.9} />
      </mesh>
      <mesh position={[-w / 2 - t / 2, wallH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[t, wallH, d]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.9} />
      </mesh>
      <mesh position={[0, wallH + 0.015, -d / 2 - t / 2]}>
        <boxGeometry args={[w + 2 * t, 0.03, t + 0.02]} />
        <meshStandardMaterial color={PALETTE.wallTop} />
      </mesh>
      <mesh position={[-w / 2 - t / 2, wallH + 0.015, 0]}>
        <boxGeometry args={[t + 0.02, 0.03, d]} />
        <meshStandardMaterial color={PALETTE.wallTop} />
      </mesh>

      {/* Tapete da entrada. */}
      <mesh position={[layout.rug.x, 0.008, layout.rug.z]} receiveShadow>
        <boxGeometry args={[layout.rug.w, 0.016, layout.rug.d]} />
        <meshStandardMaterial color="#A9BBCB" roughness={1} />
      </mesh>

      <Desk x={layout.desk.x} z={layout.desk.z} />
      <Coffee x={layout.coffee.x} z={layout.coffee.z} />
      {layout.plants.map((p, i) => (
        <Plant key={i} x={p.x} z={p.z} tall={i % 2 === 0} />
      ))}
    </group>
  );
}

function Desk({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position-y={0.74} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 0.8]} />
        <meshStandardMaterial color={PALETTE.woodLight} roughness={0.7} />
      </mesh>
      {[
        [-0.74, -0.34],
        [0.74, -0.34],
        [-0.74, 0.34],
        [0.74, 0.34],
      ].map(([lx, lz]) => (
        <mesh key={`${lx}${lz}`} position={[lx, 0.36, lz]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color={PALETTE.wood} />
        </mesh>
      ))}
      {/* Monitor virado para a cadeira (e para a câmera). */}
      <mesh position={[0, 0.82, -0.15]}>
        <boxGeometry args={[0.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#5B6470" />
      </mesh>
      <mesh position={[0, 1.08, -0.18]} castShadow>
        <boxGeometry args={[0.7, 0.42, 0.04]} />
        <meshStandardMaterial color="#2E3440" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.08, -0.157]}>
        <planeGeometry args={[0.64, 0.36]} />
        <meshBasicMaterial color="#8FB3D9" />
      </mesh>
      <mesh position={[0, 0.775, 0.15]}>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#E5E7EB" />
      </mesh>
      <mesh position={[0.6, 0.82, 0.1]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.11, 16]} />
        <meshStandardMaterial color="#F4F1EA" />
      </mesh>

      {/* Cadeira. */}
      <group position={[0, 0, 0.7]}>
        <mesh position-y={0.46} castShadow>
          <boxGeometry args={[0.5, 0.07, 0.48]} />
          <meshStandardMaterial color="#4C566A" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.78, 0.22]} castShadow>
          <boxGeometry args={[0.48, 0.55, 0.06]} />
          <meshStandardMaterial color="#4C566A" roughness={0.8} />
        </mesh>
        <mesh position-y={0.22}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 10]} />
          <meshStandardMaterial color="#9AA1AB" />
        </mesh>
        <mesh position-y={0.03}>
          <cylinderGeometry args={[0.24, 0.24, 0.04, 20]} />
          <meshStandardMaterial color="#5B6470" />
        </mesh>
      </group>
    </group>
  );
}

function Coffee({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position-y={0.45} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.9, 1.4]} />
        <meshStandardMaterial color={PALETTE.woodLight} roughness={0.75} />
      </mesh>
      <mesh position-y={0.915}>
        <boxGeometry args={[0.64, 0.03, 1.44]} />
        <meshStandardMaterial color="#EDE6DA" roughness={0.5} />
      </mesh>
      {/* Cafeteira. */}
      <mesh position={[-0.05, 1.12, -0.35]} castShadow>
        <boxGeometry args={[0.32, 0.38, 0.3]} />
        <meshStandardMaterial color="#2E3440" roughness={0.5} />
      </mesh>
      <mesh position={[0.08, 1.02, -0.35]}>
        <cylinderGeometry args={[0.05, 0.045, 0.1, 14]} />
        <meshStandardMaterial color="#F4F1EA" />
      </mesh>
      {[0.1, 0.32].map((mz) => (
        <mesh key={mz} position={[0, 0.98, mz]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.1, 14]} />
          <meshStandardMaterial color={mz > 0.2 ? "#C9785A" : "#F4F1EA"} />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ x, z, tall }: { x: number; z: number; tall: boolean }) {
  const h = tall ? 0.9 : 0.55;
  return (
    <group position={[x, 0, z]}>
      <mesh position-y={0.2} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 16]} />
        <meshStandardMaterial color={PALETTE.pot} roughness={0.8} />
      </mesh>
      <mesh position-y={0.4 + h * 0.4} castShadow>
        <sphereGeometry args={[0.28, 14, 10]} />
        <meshStandardMaterial color={PALETTE.plant} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0.08, 0.4 + h * 0.85, 0.04]} castShadow>
        <sphereGeometry args={[0.2, 12, 8]} />
        <meshStandardMaterial color="#6E9E70" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Estantes, pastas e quadro                                          */
/* ------------------------------------------------------------------ */

function isFolder(object: Object3D | null): boolean {
  for (let o = object; o; o = o.parent) if (o.userData.folder) return true;
  return false;
}

function Cabinet({ cabinet, onClick }: { cabinet: CabinetData; onClick: () => void }) {
  const { width: w } = cabinet;
  const { depth: d, height: h } = CABINET;
  const wood = <meshStandardMaterial color={PALETTE.wood} roughness={0.75} />;

  return (
    <group
      position={[cabinet.x, 0, cabinet.z]}
      onClick={(e) => {
        // A prateleira fica na frente da pasta no raio do clique; se o raio
        // também acertou uma pasta, o clique é dela.
        if (e.intersections.some((hit) => isFolder(hit.object))) return;
        e.stopPropagation();
        onClick();
      }}
    >
      <mesh position={[0, h / 2, -d / 2 + 0.015]} castShadow receiveShadow>
        <boxGeometry args={[w, h, 0.03]} />
        {wood}
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * (w - 0.05)) / 2, h / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.05, h, d]} />
          {wood}
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[w, 0.1, d]} />
        {wood}
      </mesh>
      {SHELVES.slice(0, -1).map((y) => (
        <mesh key={y} position={[0, y - 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[w - 0.1, 0.04, d - 0.03]} />
          {wood}
        </mesh>
      ))}
      <mesh position={[0, h - 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, 0.04, d]} />
        {wood}
      </mesh>
    </group>
  );
}

function Folder({
  slot,
  hidden,
  hovered,
  missingImpact,
  reducedMotion,
  onHover,
  onPick,
}: {
  slot: FolderSlot;
  hidden: boolean;
  hovered: boolean;
  missingImpact: boolean;
  reducedMotion: boolean;
  onHover: (on: boolean) => void;
  onPick: () => void;
}) {
  const ref = useRef<Group>(null);
  const pull = hovered ? 0.12 : 0;

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const z = slot.z + pull;
    g.position.z = reducedMotion ? z : g.position.z + (z - g.position.z) * ease(dt, 14);
  });

  if (hidden) return null;

  return (
    <group
      ref={ref}
      position={[slot.x, slot.y, slot.z]}
      userData={{ folder: slot.id }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onPick();
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[FOLDER.thickness, FOLDER.height, FOLDER.depth]} />
        <meshStandardMaterial
          color={STATUS_COLOR[slot.status]}
          roughness={0.8}
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.18 : 0}
        />
      </mesh>
      {/* Etiqueta da lombada. */}
      <mesh position={[0, 0.07, FOLDER.depth / 2 + 0.002]}>
        <planeGeometry args={[FOLDER.thickness * 0.7, 0.11]} />
        <meshStandardMaterial color="#FBF8F2" roughness={1} />
      </mesh>
      {/* Post-it rosa: falta escrever o impacto. */}
      {missingImpact && (
        <mesh position={[0, FOLDER.height / 2 + 0.02, FOLDER.depth / 2 - 0.05]} rotation-z={0.15}>
          <boxGeometry args={[0.05, 0.06, 0.004]} />
          <meshStandardMaterial color={POSTIT[1]} roughness={1} />
        </mesh>
      )}
    </group>
  );
}

function Board({
  layout,
  count,
  onHover,
  onPick,
}: {
  layout: Layout;
  count: number;
  onHover: (on: boolean) => void;
  onPick: () => void;
}) {
  const { board } = layout;
  const notes = Math.min(count, 12);

  return (
    <group
      position={[board.x, BOARD.y, board.z]}
      rotation-y={Math.PI / 2}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onPick();
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[BOARD.width + 0.08, BOARD.height + 0.08, 0.04]} />
        <meshStandardMaterial color={PALETTE.wood} />
      </mesh>
      <mesh position-z={0.02}>
        <boxGeometry args={[BOARD.width, BOARD.height, 0.02]} />
        <meshStandardMaterial color={PALETTE.cork} roughness={1} />
      </mesh>
      {Array.from({ length: notes }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <mesh
            key={i}
            position={[-0.84 + col * 0.56, 0.36 - row * 0.36, 0.035]}
            rotation-z={(((i * 37) % 7) - 3) * 0.04}
          >
            <boxGeometry args={[0.28, 0.26, 0.006]} />
            <meshStandardMaterial color={POSTIT[i % POSTIT.length]} roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}
