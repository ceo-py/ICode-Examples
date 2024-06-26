import { Switch } from "@nextui-org/react";
import { selectedThemeSignal } from "../ThemeSwitch/ThemeSignal";

export function MenuSwitch({ selected, setSelected }) {
  return (
    <div className="flex gap-4">
      <Switch
        defaultSelected
        size="sm"
        color={`${selectedThemeSignal.value === "dark" ? "default" : ""}`}
        isSelected={selected}
        onChange={() => setSelected(!selected)}
      >
        <div className="hidden custom-sm:block">Smart Search Mode</div>
      </Switch>
    </div>
  );
}
