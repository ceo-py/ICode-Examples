import { CodeVideoButtons } from "./CodeVideoButtons/CodeVideoButtons";
import { Navbar, NavbarContent } from "@nextui-org/react";
import { SearchInput } from "./SearchInput/SearchInput";
import { UserMenu } from "./UserMenu/UserMenu";
import { LogoText } from "./LogoText/LogoText";
import { useAuth } from "../../../AuthContext/AuthContext";
import { LogIn } from "./LogoText/LogIn";
import { MenuSwitch } from "./MenuSwitch.jsx/MenuSwitch";
import { useState } from "react";
import { MenuModule } from "./MenuSwitch.jsx/MenuModule";

export function NavMenu() {
  const { state } = useAuth();
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Navbar isBordered maxWidth="2xl" className="bg-white">
        <NavbarContent data-justify="between" className="gap- hidden sm:flex">
          <LogoText />
        </NavbarContent>
        <NavbarContent>
          <SearchInput />
          <MenuSwitch selected={selected} setSelected={setSelected} />
          {/* <CodeVideoButtons /> */}
        </NavbarContent>
        <NavbarContent data-justify="between">
          {!state.isAuthenticated ? <LogIn /> : <UserMenu />}
        </NavbarContent>
      </Navbar>
      {selected && <MenuModule />}
    </>
  );
}
