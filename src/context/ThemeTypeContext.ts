import { createContext } from "react";
import { ThemeType } from "../types/ThemeType";
interface IThemeTypeContext {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}
const ThemeTypeContext = createContext<IThemeTypeContext>({
  themeType: "light",
  setThemeType: () => {},
});

export default ThemeTypeContext;
