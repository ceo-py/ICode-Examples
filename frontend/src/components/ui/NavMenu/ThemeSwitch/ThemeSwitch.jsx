import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { selectedThemeSignal } from "./ThemeSignal";

export default function ThemeSwitch() {
  const changeThemeMode = (mode) => {
    document.documentElement.setAttribute("class", mode ? "dark" : "light");
    selectedThemeSignal.value = mode ? "dark" : "light";
  };

  return (
    <Switch
      defaultSelected={() => selectedThemeSignal.value === "dark"}
      size="sm"
      color="default"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={(x) => changeThemeMode(x)}
    ></Switch>
  );
}
