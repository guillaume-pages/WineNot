"use client";
import { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (value: string) => void;
  changeTheme: (value: string) => void; // Add this line
};

// Provide a default value for the context
const defaultThemeContextValue: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
  changeTheme: () => {}, // And this line
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

export const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme)

  }, [])

  if(!isMounted) {
    return <>Veuillez patienter...</>
  }

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <ThemeContext.Provider value={{theme, changeTheme, setTheme}}>{children}</ThemeContext.Provider>
  )
} 