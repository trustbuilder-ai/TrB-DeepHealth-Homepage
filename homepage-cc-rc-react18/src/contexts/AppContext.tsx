import { useReducer, ReactNode } from "react";
import { AppContext, AppState, AppAction } from "./context";

const initialState: AppState = {
  theme: null,
  isLoading: false,
  notifications: [],
  modals: {
    isThemeOpen: false,
    isFontOpen: false,
    isHelpOpen: false,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };
    case "TOGGLE_THEME_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          isThemeOpen: !state.modals.isThemeOpen,
        },
      };
    case "TOGGLE_FONT_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          isFontOpen: !state.modals.isFontOpen,
        },
      };
    case "TOGGLE_HELP_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          isHelpOpen: !state.modals.isHelpOpen,
        },
      };
    case "CLOSE_ALL_MODALS":
      return {
        ...state,
        modals: {
          isThemeOpen: false,
          isFontOpen: false,
          isHelpOpen: false,
        },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
