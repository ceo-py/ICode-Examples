import { CodeVideoButtons } from "./CodeVideoButtons/CodeVideoButtons";
import {
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import { SearchInput } from "./SearchInput/SearchInput";
import { UserMenu } from "./UserMenu/User.Menu";
import { LogoText } from "./LogoText/LogoText";
import { useAuth } from "../../../AuthContext/AuthContext";



export function NavMenu() {
  const { state, dispatch } = useAuth();


  return (
    <Navbar isBordered maxWidth="2xl" className="bg-white">
      <NavbarContent data-justify="between" className="gap- hidden sm:flex">
      <LogoText/>
      </NavbarContent>
      <NavbarContent>
        <SearchInput {...{placeholder: "Search for Task"}}/>
        <CodeVideoButtons/>
      </NavbarContent>
      <NavbarContent data-justify="between">
        {state.isAuthenticated && <UserMenu/>}
      </NavbarContent>
    </Navbar>
  );
}

