import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity, BookOpen, Play as PlayIcon, HelpCircle, Trophy, Heart, Flame, Timer, Lock, CheckCircle2,
  XCircle, ArrowLeft, ArrowRight, Medal as MedalIcon, Stethoscope, RotateCcw, Star, Zap, Target, Crown,
} from "lucide-react";
import { PHASES, SCIENCE, type Phase } from "@/game/data";
import {
  scoreAnswer, medalFor, levelFromXp, store, MAX_LIVES, QUESTION_TIME, CORRECT_POINTS, WRONG_PENALTY,
  COMBO_BONUS, type Medal, type Progress, type RankEntry,
} from "@/game/engine";

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

  const refresh = () => {
    setBest(store.best()); setXp(store.xp()); setProgress(store.progress()); setRank(store.rank());
    setName(localStorage.getItem("wm_name") ?? "");
  };
  useEffect(refresh, []);

  const startPhase = (p: Phase) => {
    setRun({ phase: p, idx: 0, score: 0, xp: 0, lives: MAX_LIVES, combo: 0, maxCombo: 0, correct: 0, failed: false });
    setScreen("briefing");
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
    refresh();
    setRun(r);
    setScreen("result");
  };

  return (
    <div className="min-h-screen grid-bg">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        {screen !== "menu" && (
          <TopBar xp={xp} best={best} session={session} onHome={() => setScreen("menu")} />
        )}
        <div key={screen + (run?.idx ?? "")} className="animate-rise">
          {screen === "menu" && <Menu best={best} xp={xp} name={name} setName={(n) => { setName(n); localStorage.setItem("wm_name", n); }} go={setScreen} />}
          {screen === "howto" && <HowTo back={() => setScreen("menu")} />}
          {screen === "science" && <Science back={() => setScreen("menu")} />}
          {screen === "ranking" && <Ranking rank={rank} back={() => setScreen("menu")} onReset={() => { store.reset(); setSession(0); refresh(); }} />}
          {screen === "map" && <PhaseMap progress={progress} onPick={startPhase} back={() => setScreen("menu")} />}
          {screen === "briefing" && run && <Briefing phase={run.phase} onStart={() => setScreen("play")} back={() => setScreen("map")} />}
          {screen === "play" && run && <Play run={run} setRun={setRun} onFinish={finishPhase} />}
          {screen === "result" && run && (
            <Result run={run} onMap={() => setScreen("map")} onRetry={() => startPhase(run.phase)}
              onNext={run.failed || run.phase.id === PHASES.length ? undefined : () => startPhase(PHASES[run.phase.id])}
              onRanking={() => setScreen("ranking")} onRestart={() => { setSession(0); setScreen("menu"); }} />
          )}
        </div>
      </div>
    </div>
  );
}

function Logo({ big }: { big?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative grid place-items-center rounded-xl btn-primary ${big ? "h-16 w-16" : "h-10 w-10"}`}>
        {big && <span className="absolute inset-0 rounded-xl border-2 border-primary animate-pulse-ring" />}
        <Activity className={big ? "h-9 w-9" : "h-5 w-5"} />
      </div>
      {!big && <span className="font-display text-lg font-bold tracking-widest">WOUND<span className="text-primary">MASTER</span></span>}
    </div>
  );
}

function TopBar({ xp, best, session, onHome }: { xp: number; best: number; session: number; onHome: () => void }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <button onClick={onHome} aria-label="Menu inicial"><Logo /></button>
      <div className="flex flex-wrap gap-2 text-sm">
        <Chip icon={<Star className="h-4 w-4 text-primary" />} label={`Nível ${levelFromXp(xp)} · ${xp} XP`} />
        <Chip icon={<Target className="h-4 w-4 text-primary" />} label={`Sessão ${session}`} />
        <Chip icon={<Crown className="h-4 w-4 text-gold" />} label={`Recorde ${best}`} />
      </div>
    </div>
  );
}
function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <span className="panel flex items-center gap-2 rounded-full px-3 py-1.5 font-medium">{icon}{label}</span>;
}

function BtnPrimary(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-display font-bold tracking-wider transition disabled:opacity-40 disabled:pointer-events-none ${props.className ?? ""}`} />;
}
function BtnGhost(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/60 px-6 py-3 font-display font-semibold tracking-wider transition hover:border-primary hover:text-primary ${props.className ?? ""}`} />;
}

function Menu({ best, xp, name, setName, go }: { best: number; xp: number; name: string; setName: (s: string) => void; go: (s: Screen) => void }) {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center text-center">
      <Logo big />
      <p className="mt-6 font-display text-sm tracking-[0.4em] text-primary">SIMULADOR CLÍNICO</p>
      <h1 className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-7xl">
        WOUND <span className="text-gradient">MASTER</span>
      </h1>
      <p className="mt-3 text-lg text-muted-foreground sm:text-xl">Academia de Tratamento de Feridas</p>

      <div className="mt-8 flex gap-3">
        <div className="panel px-5 py-3"><p className="text-xs text-muted-foreground">PONTUAÇÃO MÁXIMA</p><p className="font-display text-2xl font-bold text-gold">{best}</p></div>
        <div className="panel px-5 py-3"><p className="text-xs text-muted-foreground">EXPERIÊNCIA</p><p className="font-display text-2xl font-bold text-primary">{xp} XP</p></div>
      </div>

      <input value={name} onChange={(e) => setName(e.target.value.slice(0, 24))} placeholder="Nome do jogador"
        className="mt-8 w-full max-w-sm rounded-lg border border-input bg-card px-4 py-3 text-center outline-none focus:border-primary" />

      <div className="mt-4 flex w-full max-w-sm flex-col gap-3">
        <BtnPrimary onClick={() => go("map")}><PlayIcon className="h-5 w-5" />INICIAR SIMULAÇÃO</BtnPrimary>
        <BtnGhost onClick={() => go("howto")}><HelpCircle className="h-5 w-5" />COMO JOGAR</BtnGhost>
        <BtnGhost onClick={() => go("science")}><BookOpen className="h-5 w-5" />CONTEÚDO CIENTÍFICO</BtnGhost>
        <BtnGhost onClick={() => go("ranking")}><Trophy className="h-5 w-5" />RANKING</BtnGhost>
      </div>
    </div>
  );
}

function Header({ title, back }: { title: string; back: () => void }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button onClick={back} className="panel grid h-10 w-10 place-items-center hover:text-primary" aria-label="Voltar"><ArrowLeft className="h-5 w-5" /></button>
      <h2 className="font-display text-3xl font-bold">{title}</h2>
    </div>
  );
}

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
      <Header title="Como jogar" back={back} />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(([icon, t, d]) => (
          <div key={t} className="panel flex gap-4 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent text-primary">{icon}</div>
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
      <Header title="Conteúdo científico" back={back} />
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {SCIENCE.map((s, i) => (
            <button key={s.title} onClick={() => setOpen(i)}
              className={`shrink-0 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${open === i ? "border-primary bg-accent text-primary" : "border-border bg-card hover:border-primary"}`}>
              {s.title}
            </button>
          ))}
        </div>
        <article key={open} className="panel animate-rise p-6 sm:p-8">
          <p className="font-display text-xs tracking-[0.3em] text-primary">MÓDULO {String(open + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-display text-3xl font-bold">{SCIENCE[open].title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{SCIENCE[open].text}</p>
          <div className="mt-8 flex justify-between">
            <BtnGhost disabled={open === 0} onClick={() => setOpen(open - 1)} className="disabled:opacity-40"><ArrowLeft className="h-4 w-4" />Anterior</BtnGhost>
            <BtnGhost disabled={open === SCIENCE.length - 1} onClick={() => setOpen(open + 1)} className="disabled:opacity-40">Próximo<ArrowRight className="h-4 w-4" /></BtnGhost>
          </div>
        </article>
      </div>
    </div>
  );
}

function MedalBadge({ m }: { m: Medal }) {
  if (!m) return null;
  const cls = m === "ouro" ? "text-gold border-gold" : m === "prata" ? "text-silver border-silver" : "text-bronze border-bronze";
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold uppercase ${cls}`}><MedalIcon className="h-3.5 w-3.5" />{m}</span>;
}

function PhaseMap({ progress, onPick, back }: { progress: Progress; onPick: (p: Phase) => void; back: () => void }) {
  const done = Object.keys(progress.medals).length;
  return (
    <div>
      <Header title="Mapa de fases" back={back} />
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Progresso da academia</span><span>{progress.unlocked}/6 desbloqueadas</span></div>
        <Bar value={((progress.unlocked - 1 + (done === 6 ? 1 : 0)) / 6) * 100} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PHASES.map((p) => {
          const locked = p.id > progress.unlocked;
          return (
            <button key={p.id} disabled={locked} onClick={() => onPick(p)}
              className="panel group overflow-hidden text-left transition hover:-translate-y-1 hover:border-primary disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-border">
              <div className="relative h-40 overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" width={1024} height={640} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${locked ? "opacity-25 grayscale" : ""}`} />
                <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 font-display text-xs font-bold tracking-widest text-primary">FASE {p.id}</span>
                {locked && <Lock className="absolute inset-0 m-auto h-10 w-10 text-muted-foreground" />}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2"><h3 className="font-display text-xl font-bold">{p.title}</h3><MedalBadge m={progress.medals[p.id] ?? null} /></div>
                <p className="mt-1 text-sm text-muted-foreground">{p.subtitle} · {p.questions.length} desafios</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "destructive" }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full transition-all duration-500 ${tone === "primary" ? "btn-primary" : "bg-destructive"}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Briefing({ phase, onStart, back }: { phase: Phase; onStart: () => void; back: () => void }) {
  return (
    <div>
      <Header title={`Fase ${phase.id} — ${phase.title}`} back={back} />
      <div className="panel grid overflow-hidden lg:grid-cols-2">
        <img src={phase.image} alt={phase.title} width={1024} height={640} className="h-64 w-full object-cover lg:h-full" />
        <div className="p-6 sm:p-8">
          <p className="flex items-center gap-2 font-display text-xs tracking-[0.3em] text-primary"><Target className="h-4 w-4" />OBJETIVO CLÍNICO</p>
          <p className="mt-2 text-lg">{phase.objective}</p>
          <p className="mt-6 flex items-center gap-2 font-display text-xs tracking-[0.3em] text-primary"><Stethoscope className="h-4 w-4" />CASO CLÍNICO</p>
          <p className="mt-2 leading-relaxed text-muted-foreground">{phase.caseText}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <Chip icon={<Zap className="h-4 w-4 text-primary" />} label={`${phase.questions.length} desafios`} />
            <Chip icon={<Heart className="h-4 w-4 text-destructive" />} label={`${MAX_LIVES} vidas`} />
            <Chip icon={<Timer className="h-4 w-4 text-primary" />} label={`${QUESTION_TIME}s cada`} />
          </div>
          <BtnPrimary onClick={onStart} className="mt-8 w-full">INICIAR FASE<ArrowRight className="h-5 w-5" /></BtnPrimary>
        </div>
      </div>
    </div>
  );
}

function Play({ run, setRun, onFinish }: { run: Run; setRun: (r: Run) => void; onFinish: (r: Run) => void }) {
  const raw = run.phase.questions[run.idx]!;
  const q = useMemo(() => {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    return { ...raw, options: order.map((i) => raw.options[i]!), correct: order.indexOf(raw.correct) };
  }, [raw]);
  const [time, setTime] = useState(QUESTION_TIME);
  const [picked, setPicked] = useState<number | null>(null);
  const [gain, setGain] = useState(0);
  const answered = picked !== null;

  useEffect(() => {
    if (answered) return;
    if (time <= 0) { answer(-1); return; }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, answered]);

  function answer(i: number) {
    if (answered) return;
    const ok = i === q.correct;
    const s = scoreAnswer(ok, run.combo, time);
    setPicked(i);
    setGain(s.points);
    setRun({
      ...run, score: run.score + s.points, xp: run.xp + s.xp, combo: s.combo,
      maxCombo: Math.max(run.maxCombo, s.combo), correct: run.correct + (ok ? 1 : 0),
      lives: ok ? run.lives : run.lives - 1,
    });
  }

  const next = () => {
    if (run.lives <= 0) return onFinish({ ...run, failed: true });
    if (run.idx + 1 >= run.phase.questions.length) return onFinish(run);
    setRun({ ...run, idx: run.idx + 1 });
  };

  const isCorrect = picked === q.correct;
  const letters = "ABCD";
  return (
    <div>
      <div className="panel mb-5 grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="mb-2 flex justify-between text-sm"><span className="font-display font-semibold text-primary">FASE {run.phase.id} · {run.phase.title}</span><span className="text-muted-foreground">Desafio {run.idx + 1}/{run.phase.questions.length}</span></div>
          <Bar value={((run.idx + (answered ? 1 : 0)) / run.phase.questions.length) * 100} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="flex gap-0.5" aria-label={`${run.lives} vidas`}>{Array.from({ length: MAX_LIVES }, (_, i) => <Heart key={i} className={`h-5 w-5 ${i < run.lives ? "fill-destructive text-destructive" : "text-muted"}`} />)}</span>
          <Chip icon={<Trophy className="h-4 w-4 text-gold" />} label={`${run.score}`} />
          <Chip icon={<Flame className={`h-4 w-4 ${run.combo > 1 ? "text-warning" : "text-muted-foreground"}`} />} label={`x${run.combo}`} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="panel p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <Timer className={`h-5 w-5 ${time <= 10 && !answered ? "text-destructive" : "text-primary"}`} />
            <div className="flex-1"><Bar value={(time / QUESTION_TIME) * 100} tone={time <= 10 ? "destructive" : "primary"} /></div>
            <span className="w-10 text-right font-display font-bold">{time}s</span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">{q.q}</h3>
          <div className="mt-6 grid gap-3">
            {q.options.map((o, i) => {
              const state = !answered ? "idle" : i === q.correct ? "right" : i === picked ? "wrong" : "dim";
              const cls = { idle: "border-border bg-secondary/40 hover:border-primary hover:bg-accent", right: "border-success bg-success/15", wrong: "border-destructive bg-destructive/15 animate-shake", dim: "border-border opacity-50" }[state];
              return (
                <button key={i} disabled={answered} onClick={() => answer(i)} className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${cls}`}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-background font-display text-sm font-bold text-primary">{letters[i]}</span>
                  <span className="flex-1">{o}</span>
                  {state === "right" && <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />}
                  {state === "wrong" && <XCircle className="h-5 w-5 shrink-0 text-destructive" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`mt-6 animate-rise rounded-lg border p-5 ${isCorrect ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}`}>
              <p className={`flex items-center gap-2 font-display text-lg font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? <CheckCircle2 /> : <XCircle />}
                {isCorrect ? `Correto! +${gain} pontos` : picked === -1 ? `Tempo esgotado! ${gain} pontos` : `Incorreto. ${gain} pontos`}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Resposta correta: <strong className="text-foreground">{letters[q.correct]}</strong></p>
              <p className="mt-3 leading-relaxed"><span className="font-semibold text-primary">Explicação científica: </span>{q.explanation}</p>
              <BtnPrimary onClick={next} className="mt-5 w-full sm:w-auto">
                {run.lives <= 0 ? "VER RESULTADO" : run.idx + 1 >= run.phase.questions.length ? "CONCLUIR FASE" : "PRÓXIMO DESAFIO"}<ArrowRight className="h-5 w-5" />
              </BtnPrimary>
            </div>
          )}
        </div>

        <aside className="panel h-fit overflow-hidden">
          <img src={run.phase.image} alt={run.phase.title} width={1024} height={640} className="h-40 w-full object-cover" />
          <div className="p-5">
            <p className="flex items-center gap-2 font-display text-xs tracking-[0.3em] text-primary"><Stethoscope className="h-4 w-4" />CASO CLÍNICO</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{run.phase.caseText}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Result({ run, onMap, onRetry, onNext, onRanking, onRestart }: { run: Run; onMap: () => void; onRetry: () => void; onNext?: () => void; onRanking: () => void; onRestart: () => void }) {
  const total = run.phase.questions.length;
  const medal = run.failed ? null : medalFor(run.correct, total);
  const acc = Math.round((run.correct / total) * 100);
  const final = !run.failed && run.phase.id === PHASES.length;
  const stats = useMemo(() => [
    ["Pontuação", run.score], ["XP ganho", run.xp], ["Acertos", `${run.correct}/${total}`], ["Precisão", `${acc}%`], ["Maior combo", `x${run.maxCombo}`], ["Vidas restantes", Math.max(0, run.lives)],
  ], [run, total, acc]);
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full border-4 ${medal === "ouro" ? "border-gold text-gold" : medal === "prata" ? "border-silver text-silver" : medal === "bronze" ? "border-bronze text-bronze" : "border-destructive text-destructive"} glow`}>
        {run.failed ? <XCircle className="h-12 w-12" /> : <MedalIcon className="h-12 w-12" />}
      </div>
      <p className="mt-5 font-display text-sm tracking-[0.3em] text-primary">FASE {run.phase.id} · {run.phase.title.toUpperCase()}</p>
      <h2 className="mt-2 font-display text-4xl font-bold">
        {run.failed ? "Fase reprovada" : final ? "Academia concluída!" : "Fase concluída!"}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {run.failed ? "Suas vidas acabaram. Revise o conteúdo científico e tente novamente." : medal ? `Você conquistou a medalha de ${medal.toUpperCase()}.` : "Fase concluída sem medalha. Tente alcançar 50% de acertos."}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map(([l, v]) => (
          <div key={l as string} className="panel p-4"><p className="text-xs uppercase text-muted-foreground">{l}</p><p className="font-display text-2xl font-bold text-primary">{v}</p></div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {onNext && <BtnPrimary onClick={onNext}>PRÓXIMA FASE<ArrowRight className="h-5 w-5" /></BtnPrimary>}
        <BtnGhost onClick={onRetry}><RotateCcw className="h-4 w-4" />Repetir fase</BtnGhost>
        <BtnGhost onClick={onMap}>Mapa de fases</BtnGhost>
        <BtnGhost onClick={onRanking}><Trophy className="h-4 w-4" />Ranking</BtnGhost>
        <BtnGhost onClick={onRestart}><RotateCcw className="h-4 w-4" />Reiniciar jogo</BtnGhost>
      </div>
    </div>
  );
}

function Ranking({ rank, back, onReset }: { rank: RankEntry[]; back: () => void; onReset: () => void }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div>
      <Header title="Ranking local" back={back} />
      <div className="panel overflow-hidden">
        {rank.length === 0 ? (
          <p className="p-10 text-center text-muted-foreground">Nenhuma partida registrada ainda. Inicie a simulação para entrar no ranking.</p>
        ) : (
          <ol>
            {rank.map((r, i) => (
              <li key={i} className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-0">
                <span className={`w-8 font-display text-xl font-bold ${i === 0 ? "text-gold" : i === 1 ? "text-silver" : i === 2 ? "text-bronze" : "text-muted-foreground"}`}>{i + 1}º</span>
                <div className="flex-1"><p className="font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">{r.phase} · {r.accuracy}% de acertos · {r.date}</p></div>
                <span className="font-display text-xl font-bold text-primary">{r.score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
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
