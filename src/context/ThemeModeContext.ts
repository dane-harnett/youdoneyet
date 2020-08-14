import { createContext } from "react";
import { ThemeMode } from "../types/ThemeMode";
interface IThemeModeContext {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}
const ThemeModeContext = createContext<IThemeModeContext>({
  themeMode: "light",
  setThemeMode: () => {},
});

export default ThemeModeContext;
