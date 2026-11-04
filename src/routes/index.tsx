import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, BookOpen, Play as PlayIcon, HelpCircle, Trophy, Heart, Flame, Timer, Lock, CheckCircle2,
  XCircle, ArrowLeft, ArrowRight, Medal as MedalIcon, Stethoscope, RotateCcw, Star, Zap, Target, Crown,
  Volume2, VolumeX, ShieldAlert, HeartPulse,
} from "lucide-react";
import heroImg from "@/assets/fase6.jpg";
import { PHASES, SCIENCE, type Phase } from "@/game/data";
import {
  scoreAnswer, medalFor, levelFromXp, store, MAX_LIVES, QUESTION_TIME, CORRECT_POINTS, WRONG_PENALTY,
  COMBO_BONUS, type Medal, type Progress, type RankEntry,
} from "@/game/engine";
import { sfx, isMuted, setMuted } from "@/game/sound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wound Master — Academia de Tratamento de Feridas" },
      { name: "description", content: "Simulador educacional com 6 fases e 32 desafios sobre avaliação e tratamento de feridas." },
      { property: "og:title", content: "Wound Master — Academia de Tratamento de Feridas" },
      { property: "og:description", content: "Jogo educacional de tratamento de feridas para o curso Técnico de Enfermagem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Screen = "menu" | "howto" | "science" | "map" | "briefing" | "play" | "result" | "ranking";
type Run = { phase: Phase; idx: number; score: number; xp: number; lives: number; combo: number; maxCombo: number; correct: number; failed: boolean };

function Game() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [best, setBest] = useState(0);
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState<Progress>({ unlocked: 1, medals: {} });
  const [rank, setRank] = useState<RankEntry[]>([]);
  const [name, setName] = useState("");
  const [session, setSession] = useState(0);
  const [run, setRun] = useState<Run | null>(null);
  const [muted, setMute] = useState(false);
  const [transition, setTransition] = useState<Phase | null>(null);

  const refresh = () => {
    setBest(store.best()); setXp(store.xp()); setProgress(store.progress()); setRank(store.rank());
    setName(localStorage.getItem("wm_name") ?? ""); setMute(isMuted());
  };
  useEffect(refresh, []);

  const go = (s: Screen) => { sfx.click(); setScreen(s); };
  const toggleMute = () => { setMuted(!muted); setMute(!muted); if (muted) sfx.click(); };

  const startPhase = (p: Phase) => {
    sfx.click();
    setRun({ phase: p, idx: 0, score: 0, xp: 0, lives: MAX_LIVES, combo: 0, maxCombo: 0, correct: 0, failed: false });
    setScreen("briefing");
  };
  const beginPlay = () => {
    if (!run) return;
    sfx.start();
    setTransition(run.phase);
    setTimeout(() => setScreen("play"), 700);
    setTimeout(() => setTransition(null), 1600);
  };

  const finishPhase = (r: Run) => {
    const total = session + r.score;
    setSession(total);
    store.setBest(total);
    store.addXp(r.xp);
    const medal = r.failed ? null : medalFor(r.correct, r.phase.questions.length);
    const p = store.progress();
    if (!r.failed) {
      p.unlocked = Math.max(p.unlocked, Math.min(PHASES.length, r.phase.id + 1));
      const prev = p.medals[r.phase.id];
      const order = { ouro: 3, prata: 2, bronze: 1 } as const;
      if (medal && (!prev || order[medal] > order[prev])) p.medals[r.phase.id] = medal;
      store.setProgress(p);
    }
    store.addRank({
      name: name || "Jogador", score: r.score, date: new Date().toLocaleDateString("pt-BR"),
      phase: `Fase ${r.phase.id}`, accuracy: Math.round((r.correct / r.phase.questions.length) * 100),
    });
    if (r.failed) sfx.defeat(); else sfx.victory();
    refresh();
    setRun(r);
    setScreen("result");
  };

  return (
    <div className="relative min-h-screen grid-bg scan-beam overflow-x-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-5 sm:py-8">
        {screen !== "menu" && (
          <TopBar xp={xp} best={best} session={session} muted={muted} onMute={toggleMute} onHome={() => go("menu")} />
        )}
        <div key={screen + (run?.idx ?? "")} className="animate-rise">
          {screen === "menu" && <Menu best={best} xp={xp} name={name} muted={muted} onMute={toggleMute} topRank={rank[0]} setName={(n) => { setName(n); localStorage.setItem("wm_name", n); }} go={go} />}
          {screen === "howto" && <HowTo back={() => go("menu")} />}
          {screen === "science" && <Science back={() => go("menu")} />}
          {screen === "ranking" && <Ranking rank={rank} back={() => go("menu")} onReset={() => { store.reset(); setSession(0); refresh(); }} />}
          {screen === "map" && <PhaseMap progress={progress} onPick={startPhase} back={() => go("menu")} />}
          {screen === "briefing" && run && <Briefing phase={run.phase} onStart={beginPlay} back={() => go("map")} />}
          {screen === "play" && run && <Play run={run} setRun={setRun} onFinish={finishPhase} />}
          {screen === "result" && run && (
            <Result run={run} onMap={() => go("map")} onRetry={() => startPhase(run.phase)}
              onNext={run.failed || run.phase.id === PHASES.length ? undefined : () => startPhase(PHASES[run.phase.id]!)}
              onRanking={() => go("ranking")} onRestart={() => { setSession(0); go("menu"); }} />
          )}
        </div>
      </div>
      {transition && <PhaseTransition phase={transition} />}
    </div>
  );
}

/* ---------- Shared visual pieces ---------- */

function Ecg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 80" preserveAspectRatio="none" className={className} aria-hidden>
      <path className="ecg-line" fill="none" stroke="var(--color-primary)" strokeWidth="2"
        d="M0 40 H120 L135 40 L145 20 L155 60 L165 5 L178 75 L190 40 H300 L315 40 L325 20 L335 60 L345 5 L358 75 L370 40 H480 L495 40 L505 20 L515 60 L525 5 L538 75 L550 40 H600" />
    </svg>
  );
}

function Logo({ big }: { big?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative grid place-items-center rounded-xl btn-primary ${big ? "h-20 w-20" : "h-10 w-10"}`}>
        {big && <span className="absolute inset-0 rounded-xl border-2 border-primary animate-pulse-ring" />}
        <Activity className={big ? "h-11 w-11" : "h-5 w-5"} />
      </div>
      {!big && <span className="hidden font-display text-lg font-bold tracking-widest sm:inline">WOUND<span className="text-primary">MASTER</span></span>}
    </div>
  );
}

function MuteBtn({ muted, onMute }: { muted: boolean; onMute: () => void }) {
  return (
    <button onClick={onMute} aria-label={muted ? "Ativar sons" : "Silenciar sons"} title={muted ? "Ativar sons" : "Silenciar"}
      className="panel grid h-9 w-9 place-items-center rounded-full hover:text-primary">
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary" />}
    </button>
  );
}

function XpMeter({ xp }: { xp: number }) {
  const lvl = levelFromXp(xp);
  const pct = ((xp % 500) / 500) * 100;
  return (
    <div className="panel flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3">
      <span className="grid h-6 w-6 place-items-center rounded-full btn-primary font-display text-xs font-bold">{lvl}</span>
      <div className="w-16 sm:w-24">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bar-shimmer transition-all duration-700" style={{ width: `${pct}%` }} /></div>
        <p className="mt-0.5 text-[10px] leading-none text-muted-foreground">{xp} XP</p>
      </div>
    </div>
  );
}

function TopBar({ xp, best, session, muted, onMute, onHome }: { xp: number; best: number; session: number; muted: boolean; onMute: () => void; onHome: () => void }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <button onClick={onHome} aria-label="Menu inicial"><Logo /></button>
      <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
        <XpMeter xp={xp} />
        <Chip icon={<Target className="h-4 w-4 text-primary" />} label={`${session}`} title="Pontos da sessão" />
        <Chip icon={<Crown className="h-4 w-4 text-gold" />} label={`${best}`} title="Recorde" />
        <MuteBtn muted={muted} onMute={onMute} />
      </div>
    </div>
  );
}
function Chip({ icon, label, title }: { icon: React.ReactNode; label: string; title?: string }) {
  return <span title={title} className="panel flex items-center gap-2 rounded-full px-3 py-1.5 font-medium tabular-nums">{icon}{label}</span>;
}

function BtnPrimary(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-display font-bold tracking-wider transition disabled:opacity-40 disabled:pointer-events-none ${props.className ?? ""}`} />;
}
function BtnGhost(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/60 px-6 py-3 font-display font-semibold tracking-wider transition hover:border-primary hover:text-primary hover:glow disabled:opacity-40 disabled:pointer-events-none ${props.className ?? ""}`} />;
}

function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "destructive" }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full transition-all duration-700 ${tone === "primary" ? "bar-shimmer" : "bg-destructive"}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

/** Segmented progress: one cell per challenge, coloured by result */
function SegmentBar({ results, total, current }: { results: boolean[]; total: number; current: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const r = results[i];
        const cls = r === true ? "bg-success shadow-glow-success" : r === false ? "bg-destructive shadow-glow-danger" : i === current ? "bar-shimmer" : "bg-muted";
        return <div key={i} className={`h-2.5 flex-1 rounded-full transition-all duration-500 ${cls}`} />;
      })}
    </div>
  );
}

function Header({ title, kicker, back }: { title: string; kicker?: string; back: () => void }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button onClick={back} className="panel grid h-10 w-10 shrink-0 place-items-center hover:text-primary" aria-label="Voltar"><ArrowLeft className="h-5 w-5" /></button>
      <div>
        {kicker && <p className="font-display text-[11px] tracking-[0.3em] text-primary">{kicker}</p>}
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>
    </div>
  );
}

/* ---------- Menu ---------- */

function Vital({ label, value, unit, tone }: { label: string; value: string; unit: string; tone: string }) {
  return (
    <div className="monitor px-3 py-2 text-left">
      <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
      <p className={`font-display text-xl font-bold tabular-nums ${tone}`}>{value}<span className="ml-1 text-xs text-muted-foreground">{unit}</span></p>
    </div>
  );
}

function Menu({ best, xp, name, muted, onMute, topRank, setName, go }: { best: number; xp: number; name: string; muted: boolean; onMute: () => void; topRank?: RankEntry | undefined; setName: (s: string) => void; go: (s: Screen) => void }) {
  return (
    <div className="relative -mx-4 -my-5 min-h-screen overflow-hidden sm:-my-8">
      <img src={heroImg} alt="" width={1024} height={640} className="absolute inset-0 h-full w-full object-cover opacity-30 animate-zoom-slow" />
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 scanlines" />
      <div className="absolute right-4 top-4 z-10"><MuteBtn muted={muted} onMute={onMute} /></div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        <div className="animate-pop"><Logo big /></div>
        <p className="mt-6 flex items-center gap-2 font-display text-xs tracking-[0.45em] text-primary animate-rise">
          <span className="h-2 w-2 rounded-full bg-success animate-blink" /> SIMULADOR CLÍNICO ONLINE
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight animate-rise sm:text-7xl lg:text-8xl" style={{ animationDelay: ".15s" }}>
          WOUND <span className="text-gradient">MASTER</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground animate-rise sm:text-xl" style={{ animationDelay: ".3s" }}>Academia de Tratamento de Feridas</p>
        <Ecg className="mt-6 h-14 w-full max-w-xl" />

        <div className="mt-6 grid w-full max-w-xl grid-cols-3 gap-2 animate-rise" style={{ animationDelay: ".45s" }}>
          <Vital label="RECORDE" value={String(best)} unit="pts" tone="text-gold" />
          <Vital label="NÍVEL" value={String(levelFromXp(xp))} unit={`${xp} XP`} tone="text-primary" />
          <Vital label="DESAFIOS" value="32" unit="casos" tone="text-success" />
        </div>

        <div className="mt-6 w-full max-w-sm animate-rise" style={{ animationDelay: ".6s" }}>
          <input value={name} onChange={(e) => setName(e.target.value.slice(0, 24))} placeholder="Nome do jogador"
            className="w-full rounded-lg border border-input bg-card/80 px-4 py-3 text-center outline-none backdrop-blur focus:border-primary focus:glow" />
          <div className="mt-3 flex flex-col gap-3">
            <BtnPrimary onClick={() => go("map")} className="py-4 text-lg"><PlayIcon className="h-5 w-5" />INICIAR SIMULAÇÃO</BtnPrimary>
            <div className="grid grid-cols-2 gap-3">
              <BtnGhost onClick={() => go("howto")} className="px-3 text-sm"><HelpCircle className="h-4 w-4" />COMO JOGAR</BtnGhost>
              <BtnGhost onClick={() => go("ranking")} className="px-3 text-sm"><Trophy className="h-4 w-4" />RANKING</BtnGhost>
            </div>
            <BtnGhost onClick={() => go("science")} className="text-sm"><BookOpen className="h-4 w-4" />CONTEÚDO CIENTÍFICO</BtnGhost>
          </div>
          {topRank && (
            <p className="mt-4 text-sm text-muted-foreground"><Crown className="mr-1 inline h-4 w-4 text-gold" />Líder: <strong className="text-foreground">{topRank.name}</strong> · {topRank.score} pts</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Info screens ---------- */

function HowTo({ back }: { back: () => void }) {
  const items = [
    [<Target key="a" />, "Seis fases", "Complete cada fase para desbloquear a próxima. A Fase 6 é o desafio final."],
    [<CheckCircle2 key="b" />, `+${CORRECT_POINTS} pontos`, "Por resposta correta, com explicação científica imediata."],
    [<XCircle key="c" />, `−${WRONG_PENALTY} pontos`, "Por resposta incorreta ou tempo esgotado. Você também perde uma vida."],
    [<Heart key="d" />, `${MAX_LIVES} vidas por fase`, "Se as vidas acabarem, a fase é reprovada e precisa ser refeita."],
    [<Timer key="e" />, `${QUESTION_TIME} segundos`, "Por desafio. O tempo restante vira XP bônus."],
    [<Flame key="f" />, "Combos", `Acertos seguidos somam +${COMBO_BONUS} pontos por nível de combo.`],
    [<MedalIcon key="g" />, "Medalhas", "Ouro ≥ 90%, Prata ≥ 70%, Bronze ≥ 50% de acertos na fase."],
    [<Trophy key="h" />, "Ranking local", "Seu desempenho fica salvo neste navegador."],
  ] as const;
  return (
    <div>
      <Header kicker="MANUAL DO OPERADOR" title="Como jogar" back={back} />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(([icon, t, d], i) => (
          <div key={t} className="panel flex gap-4 p-5 animate-rise" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent text-primary glow">{icon}</div>
            <div><h3 className="font-display text-lg font-semibold">{t}</h3><p className="text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">Você só avança após responder cada desafio. Leia a explicação antes de prosseguir: ela é parte do aprendizado.</p>
    </div>
  );
}

function Science({ back }: { back: () => void }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <Header kicker="BIBLIOTECA CLÍNICA" title="Conteúdo científico" back={back} />
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
          {SCIENCE.map((s, i) => (
            <button key={s.title} onClick={() => { sfx.click(); setOpen(i); }}
              className={`shrink-0 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${open === i ? "border-primary bg-accent text-primary glow" : "border-border bg-card hover:border-primary"}`}>
              <span className="mr-2 font-display text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{s.title}
            </button>
          ))}
        </div>
        <article key={open} className="monitor relative overflow-hidden p-6 animate-rise sm:p-8">
          <Ecg className="absolute right-0 top-0 h-10 w-48 opacity-40" />
          <p className="font-display text-xs tracking-[0.3em] text-primary">MÓDULO {String(open + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-display text-3xl font-bold">{SCIENCE[open]!.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{SCIENCE[open]!.text}</p>
          <div className="mt-8 flex justify-between gap-2">
            <BtnGhost disabled={open === 0} onClick={() => setOpen(open - 1)}><ArrowLeft className="h-4 w-4" />Anterior</BtnGhost>
            <BtnGhost disabled={open === SCIENCE.length - 1} onClick={() => setOpen(open + 1)}>Próximo<ArrowRight className="h-4 w-4" /></BtnGhost>
          </div>
        </article>
      </div>
    </div>
  );
}

function MedalBadge({ m }: { m: Medal }) {
  if (!m) return null;
  const cls = m === "ouro" ? "text-gold border-gold" : m === "prata" ? "text-silver border-silver" : "text-bronze border-bronze";
  return <span className={`inline-flex items-center gap-1 rounded-full border bg-background/70 px-2 py-0.5 text-xs font-bold uppercase ${cls}`}><MedalIcon className="h-3.5 w-3.5" />{m}</span>;
}

/* ---------- Map & briefing ---------- */

function PhaseMap({ progress, onPick, back }: { progress: Progress; onPick: (p: Phase) => void; back: () => void }) {
  const done = Object.keys(progress.medals).length;
  return (
    <div>
      <Header kicker="CENTRO DE OPERAÇÕES" title="Mapa de fases" back={back} />
      <div className="monitor mb-6 p-4">
        <div className="mb-3 flex justify-between text-sm"><span className="font-display tracking-widest text-primary">PROGRESSO DA ACADEMIA</span><span className="tabular-nums text-muted-foreground">{done}/6 medalhas · {progress.unlocked}/6 liberadas</span></div>
        <div className="flex items-center gap-1">
          {PHASES.map((p) => {
            const m = progress.medals[p.id];
            const st = m ? "bg-success shadow-glow-success" : p.id <= progress.unlocked ? "bar-shimmer" : "bg-muted";
            return <div key={p.id} className={`h-2.5 flex-1 rounded-full ${st}`} />;
          })}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PHASES.map((p, i) => {
          const locked = p.id > progress.unlocked;
          return (
            <button key={p.id} disabled={locked} onClick={() => onPick(p)} style={{ animationDelay: `${i * 0.07}s` }}
              className="panel group relative overflow-hidden text-left transition duration-300 animate-rise hover:-translate-y-1 hover:border-primary hover:glow disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-border disabled:hover:shadow-none">
              <div className="relative h-40 overflow-hidden scanlines">
                <img src={p.image} alt={p.title} loading="lazy" width={1024} height={640} className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${locked ? "opacity-20 grayscale" : ""}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md border border-primary/40 bg-background/80 px-2 py-1 font-display text-xs font-bold tracking-widest text-primary">FASE {p.id}</span>
                <span className="absolute right-3 top-3"><MedalBadge m={progress.medals[p.id] ?? null} /></span>
                {locked && <div className="absolute inset-0 grid place-items-center"><div className="grid h-14 w-14 place-items-center rounded-full border border-border bg-background/80"><Lock className="h-6 w-6 text-muted-foreground" /></div></div>}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.subtitle} · {p.questions.length} desafios</p>
                {!locked && <p className="mt-3 flex items-center gap-1 font-display text-xs tracking-widest text-primary opacity-70 transition group-hover:opacity-100">ACESSAR <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></p>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Briefing({ phase, onStart, back }: { phase: Phase; onStart: () => void; back: () => void }) {
  return (
    <div>
      <Header kicker={`FASE ${phase.id} · BRIEFING`} title={phase.title} back={back} />
      <div className="panel grid overflow-hidden lg:grid-cols-2">
        <div className="relative scanlines">
          <img src={phase.image} alt={phase.title} width={1024} height={640} className="h-56 w-full object-cover sm:h-72 lg:h-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4">
            <Ecg className="h-8 w-full opacity-70" />
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="flex items-center gap-2 font-display text-xs tracking-[0.3em] text-primary"><Target className="h-4 w-4" />OBJETIVO CLÍNICO</p>
          <p className="mt-2 text-lg">{phase.objective}</p>
          <div className="monitor mt-6 p-4">
            <p className="flex items-center gap-2 font-display text-xs tracking-[0.3em] text-primary"><Stethoscope className="h-4 w-4" />CASO CLÍNICO</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{phase.caseText}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <Chip icon={<Zap className="h-4 w-4 text-primary" />} label={`${phase.questions.length} desafios`} />
            <Chip icon={<Heart className="h-4 w-4 text-destructive" />} label={`${MAX_LIVES} vidas`} />
            <Chip icon={<Timer className="h-4 w-4 text-primary" />} label={`${QUESTION_TIME}s cada`} />
          </div>
          <BtnPrimary onClick={onStart} className="mt-8 w-full py-4">INICIAR FASE<ArrowRight className="h-5 w-5" /></BtnPrimary>
        </div>
      </div>
    </div>
  );
}

function PhaseTransition({ phase }: { phase: Phase }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background animate-warp">
      <img src={phase.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 vignette" />
      <div className="relative px-6 text-center">
        <p className="font-display text-sm tracking-[0.5em] text-primary">INICIANDO SIMULAÇÃO</p>
        <h2 className="mt-3 font-display text-5xl font-bold sm:text-7xl">FASE <span className="text-gradient">{phase.id}</span></h2>
        <p className="mt-2 text-xl text-muted-foreground">{phase.title}</p>
        <Ecg className="mx-auto mt-6 h-12 w-72" />
      </div>
    </div>
  );
}

/* ---------- Play ---------- */

function Play({ run, setRun, onFinish }: { run: Run; setRun: (r: Run) => void; onFinish: (r: Run) => void }) {
  const raw = run.phase.questions[run.idx]!;
  const q = useMemo(() => {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    return { ...raw, options: order.map((i) => raw.options[i]!), correct: order.indexOf(raw.correct) };
  }, [raw]);
  const [time, setTime] = useState(QUESTION_TIME);
  const [picked, setPicked] = useState<number | null>(null);
  const [gain, setGain] = useState({ points: 0, xp: 0 });
  const results = useRef<boolean[]>([]);
  const answered = picked !== null;

  useEffect(() => {
    if (answered) return;
    if (time <= 0) { answer(-1); return; }
    if (time <= 5) sfx.tick();
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, answered]);

  function answer(i: number) {
    if (answered) return;
    const ok = i === q.correct;
    const s = scoreAnswer(ok, run.combo, time);
    if (ok) sfx.correct(); else sfx.wrong();
    setPicked(i);
    setGain({ points: s.points, xp: s.xp });
    results.current[run.idx] = ok;
    setRun({
      ...run, score: run.score + s.points, xp: run.xp + s.xp, combo: s.combo,
      maxCombo: Math.max(run.maxCombo, s.combo), correct: run.correct + (ok ? 1 : 0),
      lives: ok ? run.lives : run.lives - 1,
    });
  }

  const next = () => {
    sfx.click();
    if (run.lives <= 0) return onFinish({ ...run, failed: true });
    if (run.idx + 1 >= run.phase.questions.length) return onFinish(run);
    setRun({ ...run, idx: run.idx + 1 });
  };

  const isCorrect = picked === q.correct;
  const letters = "ABCD";
  const pastResults = useResultsHistory(run, results.current);
  const lowTime = time <= 10 && !answered;
  return (
    <div className="relative">
      {answered && <div key={run.idx} className={`pointer-events-none fixed inset-0 z-40 animate-flash ${isCorrect ? "bg-success/25" : "bg-destructive/30"}`} />}

      <div className="monitor mb-5 grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="mb-2 flex justify-between gap-2 text-sm"><span className="truncate font-display font-semibold text-primary">FASE {run.phase.id} · {run.phase.title}</span><span className="shrink-0 tabular-nums text-muted-foreground">{run.idx + 1}/{run.phase.questions.length}</span></div>
          <SegmentBar results={pastResults} total={run.phase.questions.length} current={run.idx} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="flex gap-0.5" aria-label={`${run.lives} vidas`}>
            {Array.from({ length: MAX_LIVES }, (_, i) => <Heart key={i} className={`h-5 w-5 transition ${i < run.lives ? "fill-destructive text-destructive" : "text-muted scale-75"}`} />)}
          </span>
          <span className="relative">
            <Chip icon={<Trophy className="h-4 w-4 text-gold" />} label={`${run.score}`} />
            {answered && <span key={`p${run.idx}`} className={`absolute left-1/2 top-0 whitespace-nowrap font-display text-lg font-bold animate-float-up ${gain.points > 0 ? "text-success" : "text-destructive"}`}>{gain.points > 0 ? "+" : ""}{gain.points}</span>}
          </span>
          <span className="relative">
            <Chip icon={<Star className="h-4 w-4 text-primary" />} label={`${run.xp} XP`} />
            {answered && <span key={`x${run.idx}`} className="absolute left-1/2 top-0 whitespace-nowrap font-display text-sm font-bold text-primary animate-float-up" style={{ animationDelay: ".2s" }}>+{gain.xp} XP</span>}
          </span>
          <Chip icon={<Flame className={`h-4 w-4 ${run.combo > 1 ? "text-warning" : "text-muted-foreground"}`} />} label={`x${run.combo}`} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className={`panel relative overflow-hidden p-5 transition-shadow duration-500 sm:p-8 ${answered ? (isCorrect ? "shadow-glow-success" : "shadow-glow-danger") : ""}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 font-display text-lg font-bold tabular-nums ${lowTime ? "border-destructive text-destructive animate-blink" : "border-primary text-primary"}`}>
              {time}
            </div>
            <div className="flex-1"><Bar value={(time / QUESTION_TIME) * 100} tone={lowTime ? "destructive" : "primary"} /></div>
            {run.combo > 1 && <span key={run.combo} className="rounded-full bg-warning/15 px-3 py-1 font-display text-sm font-bold text-warning animate-pop">COMBO x{run.combo}</span>}
          </div>
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">DESAFIO {String(run.idx + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-snug sm:text-2xl">{q.q}</h3>
          <div className="mt-6 grid gap-3">
            {q.options.map((o, i) => {
              const state = !answered ? "idle" : i === q.correct ? "right" : i === picked ? "wrong" : "dim";
              const cls = {
                idle: "border-border bg-secondary/40 hover:border-primary hover:bg-accent hover:translate-x-1",
                right: "border-success bg-success/15 shadow-glow-success",
                wrong: "border-destructive bg-destructive/15 animate-shake",
                dim: "border-border opacity-40",
              }[state];
              return (
                <button key={i} disabled={answered} onClick={() => answer(i)} style={{ animationDelay: `${i * 0.06}s` }}
                  className={`flex items-start gap-3 rounded-lg border p-4 text-left transition duration-200 animate-rise ${cls}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md font-display text-sm font-bold ${state === "right" ? "bg-success text-primary-foreground" : state === "wrong" ? "bg-destructive text-destructive-foreground" : "bg-background text-primary"}`}>{letters[i]}</span>
                  <span className="flex-1">{o}</span>
                  {state === "right" && <CheckCircle2 className="h-5 w-5 shrink-0 text-success animate-pop" />}
                  {state === "wrong" && <XCircle className="h-5 w-5 shrink-0 text-destructive animate-pop" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`mt-6 animate-rise rounded-lg border p-5 ${isCorrect ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}`}>
              <p className={`flex items-center gap-2 font-display text-lg font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? <CheckCircle2 /> : <XCircle />}
                {isCorrect ? `Correto! +${gain.points} pontos` : picked === -1 ? `Tempo esgotado! ${gain.points} pontos` : `Incorreto. ${gain.points} pontos`}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Resposta correta: <strong className="text-foreground">{letters[q.correct]}</strong></p>
              <p className="mt-3 leading-relaxed"><span className="font-semibold text-primary">Explicação científica: </span>{q.explanation}</p>
              <BtnPrimary onClick={next} className="mt-5 w-full sm:w-auto">
                {run.lives <= 0 ? "VER RESULTADO" : run.idx + 1 >= run.phase.questions.length ? "CONCLUIR FASE" : "PRÓXIMO DESAFIO"}<ArrowRight className="h-5 w-5" />
              </BtnPrimary>
            </div>
          )}
        </div>

        <aside className="panel h-fit overflow-hidden lg:sticky lg:top-4">
          <div className="relative scanlines">
            <img src={run.phase.image} alt={run.phase.title} width={1024} height={640} className="h-40 w-full object-cover" />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 font-display text-[10px] tracking-widest text-success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-blink" />AO VIVO</span>
          </div>
          <div className="p-5">
            <p className="flex items-center gap-2 font-display text-xs tracking-[0.3em] text-primary"><Stethoscope className="h-4 w-4" />CASO CLÍNICO</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{run.phase.caseText}</p>
            <div className="monitor mt-4 flex items-center gap-3 p-3">
              <HeartPulse className="h-5 w-5 text-success" />
              <Ecg className="h-8 flex-1" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Keeps per-question results across remounts of Play (it remounts per question via parent key).
const history = new Map<string, boolean[]>();
function useResultsHistory(run: Run, current: boolean[]) {
  const key = `${run.phase.id}`;
  if (run.idx === 0 && !current.length && run.correct === 0 && run.lives === MAX_LIVES) history.set(key, []);
  const h = history.get(key) ?? [];
  current.forEach((v, i) => { if (v !== undefined) h[i] = v; });
  history.set(key, h);
  return h;
}

/* ---------- Results ---------- */

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 1.5, dur: 2.5 + Math.random() * 2,
    color: ["var(--color-primary)", "var(--color-gold)", "var(--color-success)", "var(--color-foreground)"][i % 4], size: 6 + Math.random() * 6,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span key={i} className="absolute top-0 rounded-sm" style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.5, background: p.color, animation: `confetti ${p.dur}s ${p.delay}s ease-in forwards` }} />
      ))}
    </div>
  );
}

function Result({ run, onMap, onRetry, onNext, onRanking, onRestart }: { run: Run; onMap: () => void; onRetry: () => void; onNext?: (() => void) | undefined; onRanking: () => void; onRestart: () => void }) {
  const total = run.phase.questions.length;
  const medal = run.failed ? null : medalFor(run.correct, total);
  const acc = Math.round((run.correct / total) * 100);
  const final = !run.failed && run.phase.id === PHASES.length;
  const stats = [
    ["Pontuação", run.score], ["XP ganho", `+${run.xp}`], ["Acertos", `${run.correct}/${total}`], ["Precisão", `${acc}%`], ["Maior combo", `x${run.maxCombo}`], ["Vidas restantes", Math.max(0, run.lives)],
  ] as const;
  const ring = medal === "ouro" ? "border-gold text-gold" : medal === "prata" ? "border-silver text-silver" : medal === "bronze" ? "border-bronze text-bronze" : run.failed ? "border-destructive text-destructive" : "border-primary text-primary";

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      {!run.failed && <Confetti />}
      <div className="relative mx-auto h-32 w-32">
        {!run.failed && <span className={`absolute inset-0 rounded-full border-2 animate-pulse-ring ${ring}`} />}
        <div className={`relative grid h-32 w-32 place-items-center rounded-full border-4 bg-card animate-pop ${ring} ${run.failed ? "shadow-glow-danger" : "glow"}`}>
          {run.failed ? <ShieldAlert className="h-14 w-14" /> : final ? <Crown className="h-14 w-14" /> : <MedalIcon className="h-14 w-14" />}
        </div>
      </div>
      <p className="mt-6 font-display text-sm tracking-[0.3em] text-primary">FASE {run.phase.id} · {run.phase.title.toUpperCase()}</p>
      <h2 className={`mt-2 font-display text-4xl font-bold sm:text-5xl ${run.failed ? "" : "text-gradient"}`}>
        {run.failed ? "Simulação interrompida" : final ? "Academia concluída!" : "Fase concluída!"}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
        {run.failed
          ? "Suas vidas acabaram. Todo profissional revisa seus protocolos — consulte o conteúdo científico e tente novamente."
          : medal ? `Excelente desempenho clínico. Você conquistou a medalha de ${medal.toUpperCase()}.` : "Fase concluída sem medalha. Alcance 50% de acertos para conquistar o bronze."}
      </p>
      {medal && (
        <div className="mt-5 flex justify-center gap-3">
          {(["bronze", "prata", "ouro"] as const).map((m) => {
            const got = { bronze: 1, prata: 2, ouro: 3 }[m] <= { bronze: 1, prata: 2, ouro: 3 }[medal];
            return <span key={m} className={`grid h-12 w-12 place-items-center rounded-full border-2 ${got ? (m === "ouro" ? "border-gold text-gold" : m === "prata" ? "border-silver text-silver" : "border-bronze text-bronze") + " animate-pop" : "border-border text-muted"}`}><MedalIcon className="h-6 w-6" /></span>;
          })}
        </div>
      )}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map(([l, v], i) => (
          <div key={l} className="monitor p-4 animate-rise" style={{ animationDelay: `${0.2 + i * 0.07}s` }}>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{l}</p>
            <p className="font-display text-2xl font-bold tabular-nums text-primary">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {onNext && <BtnPrimary onClick={onNext}>PRÓXIMA FASE<ArrowRight className="h-5 w-5" /></BtnPrimary>}
        {run.failed && <BtnPrimary onClick={onRetry}><RotateCcw className="h-4 w-4" />TENTAR NOVAMENTE</BtnPrimary>}
        {!run.failed && <BtnGhost onClick={onRetry}><RotateCcw className="h-4 w-4" />Repetir fase</BtnGhost>}
        <BtnGhost onClick={onMap}>Mapa de fases</BtnGhost>
        <BtnGhost onClick={onRanking}><Trophy className="h-4 w-4" />Ranking</BtnGhost>
        <BtnGhost onClick={onRestart}><RotateCcw className="h-4 w-4" />Reiniciar jogo</BtnGhost>
      </div>
    </div>
  );
}

/* ---------- Ranking ---------- */

function Ranking({ rank, back, onReset }: { rank: RankEntry[]; back: () => void; onReset: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const podium = [rank[1], rank[0], rank[2]];
  const heights = ["h-24", "h-32", "h-20"];
  const tones = ["text-silver border-silver", "text-gold border-gold", "text-bronze border-bronze"];
  const places = [2, 1, 3];
  return (
    <div>
      <Header kicker="HALL DA FAMA" title="Ranking local" back={back} />
      {rank.length === 0 ? (
        <div className="panel p-10 text-center text-muted-foreground">Nenhuma partida registrada ainda. Inicie a simulação para entrar no ranking.</div>
      ) : (
        <>
          <div className="mx-auto mb-8 grid max-w-2xl grid-cols-3 items-end gap-3">
            {podium.map((r, i) => (
              <div key={i} className="flex flex-col items-center text-center animate-rise" style={{ animationDelay: `${i * 0.1}s` }}>
                {r ? (
                  <>
                    <div className={`grid h-14 w-14 place-items-center rounded-full border-2 bg-card font-display text-xl font-bold sm:h-16 sm:w-16 ${tones[i]} ${places[i] === 1 ? "glow" : ""}`}>
                      {places[i] === 1 ? <Crown className="h-7 w-7" /> : places[i]}
                    </div>
                    <p className="mt-2 w-full truncate text-sm font-semibold">{r.name}</p>
                    <p className="font-display text-lg font-bold text-primary tabular-nums">{r.score}</p>
                  </>
                ) : <div className="h-24" />}
                <div className={`monitor mt-2 w-full ${heights[i]} grid place-items-center font-display text-3xl font-bold ${tones[i]?.split(" ")[0]}`}>{places[i]}º</div>
              </div>
            ))}
          </div>
          <div className="panel overflow-hidden">
            <ol>
              {rank.map((r, i) => (
                <li key={i} className="flex items-center gap-4 border-b border-border px-5 py-3.5 transition last:border-0 hover:bg-accent/40">
                  <span className={`w-8 font-display text-lg font-bold ${i === 0 ? "text-gold" : i === 1 ? "text-silver" : i === 2 ? "text-bronze" : "text-muted-foreground"}`}>{i + 1}º</span>
                  <div className="min-w-0 flex-1"><p className="truncate font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">{r.phase} · {r.accuracy}% de acertos · {r.date}</p></div>
                  <div className="hidden w-24 sm:block"><Bar value={r.accuracy} /></div>
                  <span className="font-display text-xl font-bold tabular-nums text-primary">{r.score}</span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
      <div className="mt-6 flex justify-end">
        {confirm ? (
          <div className="flex gap-2"><BtnGhost onClick={() => setConfirm(false)}>Cancelar</BtnGhost><BtnPrimary onClick={() => { onReset(); setConfirm(false); }}>Confirmar</BtnPrimary></div>
        ) : (
          <BtnGhost onClick={() => setConfirm(true)}><RotateCcw className="h-4 w-4" />Apagar progresso e ranking</BtnGhost>
        )}
      </div>
    </div>
  );
}
