"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/themeSlice";

interface ThemeToggleProps {
  lightLabel: ReactNode;
  darkLabel: ReactNode;
  children?: ReactNode;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ lightLabel, darkLabel, children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="cursor-pointer"
    >
      {theme === "light" ? darkLabel : lightLabel}
      {children}
    </button>
  );
};

export default ThemeToggle;
