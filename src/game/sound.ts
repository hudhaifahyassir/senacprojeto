let ctx: AudioContext | null = null;
const KEY = "wm_muted";
export const isMuted = () => typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
export const setMuted = (m: boolean) => localStorage.setItem(KEY, m ? "1" : "0");

function tone(freq: number, dur: number, delay = 0, type: OscillatorType = "sine", vol = 0.06) {
  if (typeof window === "undefined" || isMuted()) return;
  ctx ??= new AudioContext();
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t); o.stop(t + dur + 0.02);
}

export const sfx = {
  click: () => tone(880, 0.06, 0, "sine", 0.035),
  correct: () => { tone(660, 0.12); tone(990, 0.18, 0.09); },
  wrong: () => { tone(220, 0.18, 0, "triangle", 0.07); tone(165, 0.25, 0.12, "triangle", 0.07); },
  tick: () => tone(1200, 0.04, 0, "square", 0.015),
  start: () => { [440, 554, 659, 880].forEach((f, i) => tone(f, 0.14, i * 0.08)); },
  victory: () => { [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.2, i * 0.11, "triangle", 0.05)); },
  defeat: () => { [392, 330, 262].forEach((f, i) => tone(f, 0.35, i * 0.2, "sine", 0.05)); },
};
