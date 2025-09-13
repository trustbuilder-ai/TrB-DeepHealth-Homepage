import { createContext } from "react";
import { Theme } from "../types";

interface AppState {
  theme: Theme | null;
  isLoading: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
  }>;
  modals: {
    isThemeOpen: boolean;
    isFontOpen: boolean;
    isHelpOpen: boolean;
  };
}

type AppAction =
  | { type: "SET_THEME"; payload: Theme | null }
  | { type: "SET_LOADING"; payload: boolean }
  | {
      type: "ADD_NOTIFICATION";
      payload: {
        id: string;
        message: string;
        type: "success" | "error" | "warning" | "info";
        duration?: number;
      };
    }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "TOGGLE_THEME_MODAL" }
  | { type: "TOGGLE_FONT_MODAL" }
  | { type: "TOGGLE_HELP_MODAL" }
  | { type: "CLOSE_ALL_MODALS" };

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export type { AppState, AppAction };
