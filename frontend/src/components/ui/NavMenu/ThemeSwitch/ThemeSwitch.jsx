import { Button } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { selectedThemeSignal } from "./ThemeSignal";

export default function ThemeSwitch() {
  const isDark = selectedThemeSignal.value === "dark";
  const changeThemeMode = () => {
    document.documentElement.setAttribute("class", isDark ? "light" : "dark");
    selectedThemeSignal.value = isDark ? "light" : "dark";
  };

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
