"use client";

import { useMemo, useState } from "react";
import type { Demand, DemandStatus, Project } from "@/lib/log";

type View = "overview" | "kanban" | "metrics";

const statusLabels: Record<DemandStatus, string> = {
  todo: "A fazer",
  doing: "Em andamento",
  done: "Concluído",
};

const statusColors: Record<DemandStatus, string> = {
  todo: "bg-slate-400",
  doing: "bg-amber-400",
  done: "bg-emerald-500",
};

export function DemandHub({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]?.id ?? "");
  const [view, setView] = useState<View>("overview");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Demand | null>(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" as Demand["priority"] });

  const project = projects.find((item) => item.id === selectedProject) ?? projects[0];
  const allDemands = useMemo(() => projects.flatMap((item) => item.demands), [projects]);
  const visibleDemands = project?.demands.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())) ?? [];
  const completed = allDemands.filter((item) => item.status === "done").length;
  const inProgress = allDemands.filter((item) => item.status === "doing").length;
  const completion = allDemands.length ? Math.round((completed / allDemands.length) * 100) : 0;

  function moveDemand(id: string, status: DemandStatus) {
    setProjects((current) => current.map((item) => ({ ...item, demands: item.demands.map((demand) => demand.id === id ? { ...demand, status, updatedAt: new Date().toISOString() } : demand) })));
  }

  function saveDemand(event: React.FormEvent) {
    event.preventDefault();
    if (!project || !form.title.trim()) return;
    if (editing) {
      setProjects((current) => current.map((item) => ({ ...item, demands: item.demands.map((demand) => demand.id === editing.id ? { ...demand, ...form, updatedAt: new Date().toISOString() } : demand) })));
    } else {
      const newDemand: Demand = { id: `dem-${Date.now()}`, ...form, project: project.id, status: "todo", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setProjects((current) => current.map((item) => item.id === project.id ? { ...item, demands: [newDemand, ...item.demands] } : item));
    }
    setShowForm(false); setEditing(null); setForm({ title: "", description: "", priority: "medium" });
  }

  function openEdit(demand: Demand) {
    setEditing(demand); setForm({ title: demand.title, description: demand.description ?? "", priority: demand.priority }); setShowForm(true);
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-3">Workspace pessoal</p><h1 className="text-3xl font-semibold tracking-tight">Seu hub de demandas</h1><p className="mt-2 max-w-xl text-sm text-ink-2">Tudo o que precisa ser feito, em um só lugar. Acompanhe o progresso dos seus projetos e não perca nenhum contexto.</p></div>
        <button onClick={() => { setEditing(null); setForm({ title: "", description: "", priority: "medium" }); setShowForm(true); }} className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85">+ Nova demanda</button>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Demandas totais" value={allDemands.length} detail="em todos os projetos" />
        <Metric label="Em andamento" value={inProgress} detail="foco desta semana" tone="amber" />
        <Metric label="Taxa de conclusão" value={`${completion}%`} detail={`${completed} entregas realizadas`} tone="green" />
      </section>

      <div className="flex flex-col gap-5 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-60"><div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">Projetos</h2><span className="text-xs text-ink-3">{projects.length}</span></div><div className="flex gap-2 overflow-x-auto lg:flex-col">{projects.map((item) => <button key={item.id} onClick={() => setSelectedProject(item.id)} className={`flex min-w-[190px] items-center gap-3 rounded-xl border p-3 text-left transition-colors lg:min-w-0 ${selectedProject === item.id ? "border-ink bg-surface" : "border-transparent hover:bg-surface-2"}`}><span className={`size-2.5 shrink-0 rounded-full ${item.color}`} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{item.name}</span><span className="mt-0.5 block text-xs text-ink-3">{item.demands.length} demandas</span></span>{selectedProject === item.id && <span className="text-ink-3">›</span>}</button>)}</div><button className="mt-3 hidden w-full rounded-lg border border-dashed border-line px-3 py-2 text-left text-xs text-ink-3 hover:bg-surface-2 lg:block">+ Adicionar projeto</button></aside>

        <main className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2"><span className={`size-2.5 rounded-full ${project?.color}`} /><h2 className="text-xl font-semibold">{project?.name}</h2></div><p className="mt-1 text-sm text-ink-2">{project?.description}</p></div><div className="flex items-center gap-2"><input aria-label="Buscar demandas" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar..." className="w-36 rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none placeholder:text-ink-3 focus:border-ink-2" /><div className="flex rounded-lg border border-line bg-surface p-1 text-xs"><button onClick={() => setView("overview")} className={`rounded-md px-2.5 py-1.5 ${view === "overview" ? "bg-surface-2 font-medium" : "text-ink-2"}`}>Lista</button><button onClick={() => setView("kanban")} className={`rounded-md px-2.5 py-1.5 ${view === "kanban" ? "bg-surface-2 font-medium" : "text-ink-2"}`}>Kanban</button><button onClick={() => setView("metrics")} className={`rounded-md px-2.5 py-1.5 ${view === "metrics" ? "bg-surface-2 font-medium" : "text-ink-2"}`}>Métricas</button></div></div></div>

          {view === "metrics" ? <ProjectMetrics demands={project?.demands ?? []} /> : view === "kanban" ? <Kanban demands={visibleDemands} moveDemand={moveDemand} openEdit={openEdit} /> : <DemandList demands={visibleDemands} openEdit={openEdit} moveDemand={moveDemand} />}
        </main>
      </div>

      {showForm && <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-5" onClick={() => setShowForm(false)}><form onSubmit={saveDemand} onClick={(event) => event.stopPropagation()} className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h2 className="text-lg font-semibold">{editing ? "Editar demanda" : "Nova demanda"}</h2><p className="mt-1 text-sm text-ink-2">{project?.name}</p></div><button type="button" onClick={() => setShowForm(false)} className="text-xl text-ink-3 hover:text-ink">×</button></div><div className="flex flex-col gap-4"><label className="flex flex-col gap-1.5 text-sm font-medium">Título<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-lg border border-line bg-background px-3 py-2 font-normal outline-none focus:border-ink-2" placeholder="Ex: Revisar documentação" /></label><label className="flex flex-col gap-1.5 text-sm font-medium">Descrição<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-24 resize-y rounded-lg border border-line bg-background px-3 py-2 font-normal outline-none focus:border-ink-2" placeholder="Contexto e próximos passos" /></label><label className="flex flex-col gap-1.5 text-sm font-medium">Prioridade<select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as Demand["priority"] })} className="rounded-lg border border-line bg-background px-3 py-2 font-normal outline-none"><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option></select></label></div><button className="mt-6 w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-background">Salvar demanda</button></form></div>}
    </div>
  );
}

function Metric({ label, value, detail, tone }: { label: string; value: string | number; detail: string; tone?: "amber" | "green" }) { return <div className="rounded-xl border border-line bg-surface p-4"><p className="text-xs text-ink-2">{label}</p><p className={`mt-2 text-2xl font-semibold tracking-tight ${tone === "amber" ? "text-amber-500" : tone === "green" ? "text-emerald-500" : ""}`}>{value}</p><p className="mt-1 text-xs text-ink-3">{detail}</p></div>; }

function DemandList({ demands, openEdit, moveDemand }: { demands: Demand[]; openEdit: (d: Demand) => void; moveDemand: (id: string, status: DemandStatus) => void }) { return <div className="flex flex-col gap-2">{demands.map((demand) => <article key={demand.id} className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4"><span className={`size-2 rounded-full ${statusColors[demand.status]}`} /><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-medium">{demand.title}</h3><p className="mt-1 truncate text-xs text-ink-2">{demand.description}</p></div><span className="hidden rounded-full bg-surface-2 px-2 py-1 text-[11px] text-ink-2 sm:block">{statusLabels[demand.status]}</span><span className="rounded-full px-2 py-1 text-[11px] text-ink-3">{demand.priority === "high" ? "Alta" : demand.priority === "medium" ? "Média" : "Baixa"}</span><select aria-label={`Status de ${demand.title}`} value={demand.status} onChange={(event) => moveDemand(demand.id, event.target.value as DemandStatus)} className="sr-only"><option value="todo">A fazer</option><option value="doing">Em andamento</option><option value="done">Concluído</option></select><button onClick={() => openEdit(demand)} className="text-xs text-ink-3 opacity-0 transition-opacity hover:text-ink group-hover:opacity-100">Editar</button></article>)}{demands.length === 0 && <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-ink-2">Nenhuma demanda encontrada.</p>}</div>; }

function Kanban({ demands, moveDemand, openEdit }: { demands: Demand[]; moveDemand: (id: string, status: DemandStatus) => void; openEdit: (d: Demand) => void }) { return <div className="grid gap-4 md:grid-cols-3">{(["todo", "doing", "done"] as DemandStatus[]).map((status) => <section key={status} className="min-h-72 rounded-xl bg-surface-2 p-3"><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className={`size-2 rounded-full ${statusColors[status]}`} /><h3 className="text-sm font-medium">{statusLabels[status]}</h3></div><span className="text-xs text-ink-3">{demands.filter((demand) => demand.status === status).length}</span></div><div className="flex flex-col gap-2">{demands.filter((demand) => demand.status === status).map((demand) => <button key={demand.id} onClick={() => openEdit(demand)} draggable onDragStart={(event) => event.dataTransfer.setData("demand", demand.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const id = event.dataTransfer.getData("demand"); if (id) moveDemand(id, status); }} className="rounded-lg border border-line bg-surface p-3 text-left shadow-sm transition-shadow hover:shadow-md"><p className="text-sm font-medium">{demand.title}</p><p className="mt-1 text-xs leading-relaxed text-ink-2">{demand.description}</p><span className="mt-3 inline-block text-[11px] text-ink-3">Prioridade {demand.priority === "high" ? "alta" : demand.priority === "medium" ? "média" : "baixa"}</span></button>)}</div></section>)}</div>; }

function ProjectMetrics({ demands }: { demands: Demand[] }) { const counts = ["todo", "doing", "done"].map((status) => ({ status: status as DemandStatus, count: demands.filter((demand) => demand.status === status).length })); return <div className="grid gap-4 sm:grid-cols-3">{counts.map((item) => <div key={item.status} className="rounded-xl border border-line bg-surface p-5"><div className="flex items-center gap-2"><span className={`size-2 rounded-full ${statusColors[item.status]}`} /><span className="text-sm font-medium">{statusLabels[item.status]}</span></div><p className="mt-5 text-4xl font-semibold tracking-tight">{item.count}</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className={`h-full rounded-full ${statusColors[item.status]}`} style={{ width: `${demands.length ? (item.count / demands.length) * 100 : 0}%` }} /></div></div>)}</div>; }

export function HubNavigation({ onChange }: { onChange: (view: View) => void }) { return <div className="hidden" onClick={() => onChange("overview")} />; }

export type { View };

export default DemandHub;
