import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export default function ThemeSwitch() {

  return (
    <Switch
      defaultSelected
      size="sm"
      color="default"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    ></Switch>
  );
}
