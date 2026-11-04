import { describe, it, expect } from "vitest";
import { scoreAnswer, medalFor } from "./engine";
import { TOTAL_QUESTIONS, PHASES } from "./data";

describe("engine", () => {
  it("correct answer gives 100 points", () => expect(scoreAnswer(true, 0, 10).points).toBe(100));
  it("wrong answer loses points and resets combo", () => {
    const r = scoreAnswer(false, 3, 10);
    expect(r.points).toBeLessThan(0);
    expect(r.combo).toBe(0);
  });
  it("combo adds bonus", () => expect(scoreAnswer(true, 2, 0).points).toBe(150));
  it("medals", () => {
    expect(medalFor(5, 5)).toBe("ouro");
    expect(medalFor(1, 5)).toBe(null);
  });
  it("has at least 20 challenges in 6 phases", () => {
    expect(PHASES.length).toBe(6);
    expect(TOTAL_QUESTIONS).toBeGreaterThanOrEqual(20);
  });
});
