import { useEffect, useState } from "react";
import { ThemeMode } from "../types/ThemeMode";

const useThemeMode = (
  defaultThemeMode: ThemeMode
): [ThemeMode, (themeMode: ThemeMode) => void] => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultThemeMode);
  useEffect(() => {
    const persistedThemeMode = window.localStorage.getItem("theme_mode");
    if (
      persistedThemeMode &&
      (persistedThemeMode === "light" || persistedThemeMode === "dark")
    ) {
      setThemeMode(persistedThemeMode);
    }
  }, []);
  const setAndPersistThemeMode = (themeMode: ThemeMode) => {
    window.localStorage.setItem("theme_mode", themeMode);
    setThemeMode(themeMode);
  };
  return [themeMode, setAndPersistThemeMode];
};

export default useThemeMode;
