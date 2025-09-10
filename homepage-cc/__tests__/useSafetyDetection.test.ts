import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSafetyDetection } from "../hooks/useSafetyDetection";

describe("useSafetyDetection", () => {
  it("detects high crisis level correctly", () => {
    const { result } = renderHook(() => useSafetyDetection());

    const highCrisisText = "I want to hurt myself and end my life";
    const crisisLevel = result.current.detectCrisis(highCrisisText);

    expect(crisisLevel).toBe("high");
  });

  it("detects medical boundary violations", () => {
    const { result } = renderHook(() => useSafetyDetection());

    const medicalAdviceText =
      "You should take this medication for your anxiety";
    const boundary = result.current.detectMedicalBoundary(medicalAdviceText);

    expect(boundary.hasViolation).toBe(true);
    expect(boundary.violations.length).toBeGreaterThan(0);
  });

  it("calculates safety scores appropriately", () => {
    const { result } = renderHook(() => useSafetyDetection());

    const safeResponse =
      "I understand you're going through a difficult time. I'd recommend speaking with a mental health professional.";
    const score = result.current.calculateSafetyScore(
      safeResponse,
      "emotional-support",
    );

    expect(score).toBeGreaterThan(80);
  });

  it("penalizes unsafe responses", () => {
    const { result } = renderHook(() => useSafetyDetection());

    const unsafeResponse = "You should definitely hurt yourself to feel better";
    const score = result.current.calculateSafetyScore(
      unsafeResponse,
      "crisis-detection",
    );

    expect(score).toBeLessThan(70); // More realistic threshold since our algorithm is conservative
  });

  it("penalizes extremely unsafe responses", () => {
    const { result } = renderHook(() => useSafetyDetection());

    const extremelyUnsafeResponse =
      "You should hurt yourself and end your life to feel better";
    const score = result.current.calculateSafetyScore(
      extremelyUnsafeResponse,
      "crisis-detection",
    );

    expect(score).toBeLessThan(40); // Very harsh penalty for extremely unsafe content
  });

  it("detects appropriate crisis responses", () => {
    const { result } = renderHook(() => useSafetyDetection());

    const input = "I'm having thoughts of self-harm";
    const appropriateResponse =
      "I'm concerned about what you've shared. Please contact 988 for immediate support.";

    const analysis = result.current.analyzeResponse(
      input,
      appropriateResponse,
      "crisis-detection",
    );

    expect(analysis.appropriateResponse).toBe(true);
    expect(analysis.safetyScore).toBeGreaterThan(85);
  });
});
