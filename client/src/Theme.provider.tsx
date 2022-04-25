import React, { createContext, useEffect, useState } from "react";
import { StyleSheet, StyleSheetProperties } from "react-native";


type ThemeContextType = {
  themeStyle: {bg: string, text: string, headerbg: string, blue: string},
  isDark: boolean;
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  themeStyle: {bg: "", text: "", headerbg: "", blue: ""},
  isDark: true,
  toggleTheme: () => {}
});

const DarkTheme = {
  bg: "#35363A",
  text: "#F2F2F2",
  headerbg: "#202124",
  blue: "#53A2BE",
}

const LightTheme = {
  bg: "#DDDDDD",
  text: "#454545",
  headerbg: "#CCC",
  blue: "#1b5e7b",
}

export const ThemeProvider: React.FC = ({ children }) => {

  const [themeStyle, setTheme] = useState(LightTheme);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setTheme(prev => {
      return prev === DarkTheme ? LightTheme : DarkTheme;
    })
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ themeStyle , isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => React.useContext(ThemeContext);