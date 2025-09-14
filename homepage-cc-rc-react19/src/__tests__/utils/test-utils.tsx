import {
  render,
  RenderOptions,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { ReactElement } from "react";

// Custom render function for components that need providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { ...options });

export { customRender as render, screen, fireEvent, waitFor };
