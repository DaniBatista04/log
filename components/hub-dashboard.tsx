"use client";

import { useMemo, useState } from "react";

type Status = "backlog" | "andamento" | "feito";
type Task = { id: number; title: string; project: string; status: Status; priority: "Alta" | "Média" | "Baixa"; owner: string };

const initialTasks: Task[] = [
  { id: 1, title: "Revisar fluxo de onboarding", project: "Mural", status: "andamento", priority: "Alta", owner: "DB" },
  { id: 2, title: "Documentar nova API", project: "Mural", status: "backlog", priority: "Média", owner: "DB" },
  { id: 3, title: "Dashboard de resultados", project: "Operação", status: "feito", priority: "Alta", owner: "DB" },
  { id: 4, title: "Mapear demandas do time", project: "Operação", status: "andamento", priority: "Média", owner: "DB" },
  { id: 5, title: "Ajustar permissões", project: "Portal", status: "backlog", priority: "Baixa", owner: "DB" },
];

const columns: { key: Status; label: string; tone: string }[] = [
  { key: "backlog", label: "Backlog", tone: "bg-surface-2" },
  { key: "andamento", label: "Em andamento", tone: "bg-amber-500/10" },
  { key: "feito", label: "Feito", tone: "bg-emerald-500/10" },
];

export function HubDashboard({ projectFilter }: { projectFilter?: string }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState(projectFilter ?? "Todos");
  const projects = ["Todos", ...new Set(initialTasks.map((task) => task.project))];
  const visible = useMemo(() => tasks.filter((task) => filter === "Todos" || task.project === filter), [tasks, filter]);

  function addTask() {
    if (!newTask.trim()) return;
    setTasks((current) => [...current, { id: Date.now(), title: newTask.trim(), project: filter === "Todos" ? "Operação" : filter, status: "backlog", priority: "Média", owner: "DB" }]);
    setNewTask("");
  }

  function moveTask(id: number, status: Status) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-sm font-medium text-cliente">Semana 39 · 21 a 25 de setembro</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Seu hub de demandas</h1><p className="mt-2 max-w-xl text-sm leading-6 text-ink-2">Tudo que precisa ser acompanhado, organizado e apresentado em um só lugar.</p></div>
          <div className="rounded-2xl bg-surface-2 px-4 py-3 text-right"><p className="text-xs text-ink-2">Progresso da semana</p><p className="mt-1 text-2xl font-semibold">60%</p></div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row"><input value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing && event.keyCode !== 229) addTask(); }} placeholder="Adicionar uma nova demanda..." className="min-h-11 flex-1 rounded-xl border border-line bg-background px-4 text-sm outline-none ring-cliente/30 focus:ring-2" /><button onClick={addTask} className="rounded-xl bg-ink px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90">Adicionar demanda</button></div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Metric value={String(tasks.length)} label="Demandas totais" /><Metric value={String(tasks.filter((task) => task.status === "andamento").length)} label="Em andamento" /><Metric value={String(tasks.filter((task) => task.status === "feito").length)} label="Concluídas" /><Metric value="3" label="Projetos ativos" /></section>

      <section className="flex flex-col gap-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">Visão operacional</p><h2 className="mt-1 text-xl font-semibold">Kanban de demandas</h2></div><div className="flex gap-1 rounded-xl bg-surface-2 p-1">{projects.map((project) => <button key={project} onClick={() => setFilter(project)} className={`rounded-lg px-3 py-1.5 text-xs ${filter === project ? "bg-surface font-medium shadow-sm" : "text-ink-2"}`}>{project}</button>)}</div></div><div className="grid gap-4 lg:grid-cols-3">{columns.map((column) => <div key={column.key} className="min-h-64 rounded-2xl border border-line bg-surface p-3"><div className="mb-3 flex items-center justify-between px-2"><h3 className="text-sm font-semibold">{column.label}</h3><span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-ink-2">{visible.filter((task) => task.status === column.key).length}</span></div><div className="flex flex-col gap-2">{visible.filter((task) => task.status === column.key).map((task) => <article key={task.id} className="rounded-xl border border-line bg-background p-3"><div className="flex items-start justify-between gap-2"><p className="text-sm font-medium leading-5">{task.title}</p><button aria-label={`Excluir ${task.title}`} onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))} className="text-xs text-ink-3 hover:text-ink">×</button></div><div className="mt-3 flex items-center justify-between text-xs text-ink-2"><span>{task.project} · <span className="text-ink-3">{task.priority}</span></span><span className="rounded-full bg-surface-2 px-2 py-1">{task.owner}</span></div><select aria-label={`Mover ${task.title}`} value={task.status} onChange={(event) => moveTask(task.id, event.target.value as Status)} className="mt-3 w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-xs text-ink-2"><option value="backlog">Backlog</option><option value="andamento">Em andamento</option><option value="feito">Feito</option></select></article>)}</div></div>)}</div></section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) { return <div className="rounded-2xl border border-line bg-surface p-4"><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-ink-2">{label}</p></div>; }

export function ProjectBoard() { return <HubDashboard projectFilter="Mural" />; }

export function MetricsDashboard() { return <div className="flex flex-col gap-8"><div><p className="text-sm font-medium text-cliente">Visão executiva</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Métricas e resultados</h1><p className="mt-2 text-sm text-ink-2">Um resumo objetivo para acompanhar evolução e apresentar impacto.</p></div><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric value="24" label="Demandas entregues" /><Metric value="86%" label="Taxa de conclusão" /><Metric value="3" label="Projetos ativos" /><Metric value="12h" label="Tempo economizado" /></section><section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]"><div className="rounded-2xl border border-line bg-surface p-5"><h2 className="font-semibold">Entregas por semana</h2><div className="mt-8 flex h-48 items-end gap-3 border-b border-line px-2">{[35, 58, 48, 72, 64, 88, 100].map((height, index) => <div key={height} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-cliente/70" style={{ height: `${height}%` }} /><span className="text-[10px] text-ink-3">S{33 + index}</span></div>)}</div></div><div className="rounded-2xl border border-line bg-surface p-5"><h2 className="font-semibold">Distribuição por projeto</h2><div className="mt-6 flex flex-col gap-5">{[["Mural", 46], ["Operação", 32], ["Portal", 22]].map(([name, value]) => <div key={name as string}><div className="mb-2 flex justify-between text-sm"><span>{name}</span><span className="text-ink-2">{value}%</span></div><div className="h-2 rounded-full bg-surface-2"><div className="h-2 rounded-full bg-interno" style={{ width: `${value}%` }} /></div></div>)}</div></div></section></div>; }

export function ProjectList() { return <div className="flex flex-col gap-8"><div><p className="text-sm font-medium text-cliente">Portfólio</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Projetos</h1><p className="mt-2 text-sm text-ink-2">Cada projeto tem seu próprio contexto, status e histórico de alterações.</p></div><div className="grid gap-4 md:grid-cols-3">{[["Mural", "Organização das demandas e atualizações", "8 demandas"], ["Operação", "Processos internos e rotinas do time", "5 demandas"], ["Portal", "Experiência e melhorias do produto", "3 demandas"]].map(([name, description, count]) => <a href="/projetos/mural" key={name} className="rounded-2xl border border-line bg-surface p-5 transition-transform hover:-translate-y-0.5"><div className="flex items-center justify-between"><span className="size-3 rounded-full bg-cliente" /><span className="text-xs text-ink-2">{count}</span></div><h2 className="mt-8 font-semibold">{name}</h2><p className="mt-2 text-sm leading-5 text-ink-2">{description}</p><p className="mt-5 text-xs font-medium text-cliente">Abrir kanban →</p></a>)}</div></div>; }
