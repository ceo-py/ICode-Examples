import { CodeVideoButtons } from "./CodeVideoButtons/CodeVideoButtons";
import {
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import { SearchInput } from "./SearchInput/SearchInput";
import { UserMenu } from "./UserMenu/UserMenu";
import { LogoText } from "./LogoText/LogoText";
import { useAuth } from "../../../AuthContext/AuthContext";
import { LogIn } from "./LogoText/LogIn";



export function NavMenu() {
  const { state } = useAuth();


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
        {!state.isAuthenticated ? <LogIn/>: <UserMenu/>}
      </NavbarContent>
    </Navbar>
  );
}

