import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />);

    const heading = screen.getByText("TrB-DeepHealth");
    expect(heading).toBeInTheDocument();
  });

  it("displays the platform tagline", () => {
    render(<App />);

    const tagline = screen.getByText(
      /Testing LLMs for Safe Mental Health Product Development/i,
    );
    expect(tagline).toBeInTheDocument();
  });

  it("shows crisis resources banner", () => {
    render(<App />);

    const crisisInfo = screen.getByText(/Crisis Resources/i);
    expect(crisisInfo).toBeInTheDocument();

    const lifelines = screen.getAllByText(/Call 988|Text 988/i);
    expect(lifelines.length).toBeGreaterThan(0);
    expect(lifelines[0]).toBeInTheDocument();
  });

  it("renders scenario panel", () => {
    render(<App />);

    const scenarioHeading = screen.getByText("Test Scenarios");
    expect(scenarioHeading).toBeInTheDocument();
  });
});
