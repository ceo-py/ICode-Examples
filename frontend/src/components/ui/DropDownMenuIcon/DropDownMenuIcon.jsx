import { Avatar } from "@nextui-org/react";
import { selectedThemeSignal } from "../NavMenu/ThemeSwitch/ThemeSignal";

export function DropDownMenuIcon({ alt, src }) {
  return (
    <Avatar
      alt={alt}
      className={`${
        (alt === "code icon" ||
        alt === "C++") && selectedThemeSignal.value === "dark"
          ? "invert"
          : ""
      } w-4 h-4 bg- `}
      src={src}
    />
  );
}
