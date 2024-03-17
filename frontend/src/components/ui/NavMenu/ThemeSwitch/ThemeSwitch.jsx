import { Button } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { selectedThemeSignal } from "./ThemeSignal";
import { useEffect } from "react";

const highLightSyntax = (theme) => {
  const modes = {
    light: "stackoverflow-light",
    dark: "github-dark",
  };
  return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${modes[theme]}.min.css`;
};
const siteTheme = document.documentElement;
const highlightCode = document.querySelector("#highlight");

export default function ThemeSwitch() {
  const isDark = selectedThemeSignal.value === "dark";

  const changeThemeMode = () => {
    siteTheme.setAttribute("class", isDark ? "light" : "dark");
    const theme = isDark ? "light" : "dark";
    selectedThemeSignal.value = theme;
    highlightCode.href = highLightSyntax(theme);
  };

  useEffect(() => {
    siteTheme.setAttribute("class", !isDark ? "light" : "dark");
    highlightCode.href = highLightSyntax(
      selectedThemeSignal.value === "dark" ? "dark" : "light"
    );
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <Button
        onPress={() => changeThemeMode(selectedThemeSignal.value)}
        className="bg-"
        isIconOnly
        aria-label="Like"
      >
        {!isDark ? <MoonIcon /> : <SunIcon />}
      </Button>
    </div>
  );
}
