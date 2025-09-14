import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the app without crashing", () => {
    render(<App />);

    // Check if the main heading is present
    expect(screen.getByText(/Mental Wellness/i)).toBeInTheDocument();
  });

  it("has proper accessibility structure", () => {
    render(<App />);

    // Check for main landmark
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Check for navigation
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
