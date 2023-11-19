import { Avatar, Link } from "@nextui-org/react";
import Icon from "../../../../assets/Icon.svg";

export function LogoText() {
  return (
    <Link href="/">
      <Avatar
        alt="search icon"
        src={Icon}
        classNames={{
          base: "bg- text-default- rounded-",
          img: "object-contain",
        }}
      />
      <p className="flex hidden sm:block font-bold text-inherit">
        ICode Example
      </p>
    </Link>
  );
}
