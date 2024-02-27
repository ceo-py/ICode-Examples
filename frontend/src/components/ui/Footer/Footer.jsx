import { Link } from "@nextui-org/react";
import { LogoText } from "../NavMenu/LogoText/LogoText";
import { useNavigate } from "react-router-dom";
import { selectedThemeSignal } from "../NavMenu/ThemeSwitch/ThemeSignal";

export function Footer() {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/about");
  };
  const year = new Date();
  return (
    <footer
      className={`${
        selectedThemeSignal.value === "dark" ? "dark" : "light"
      } hidden custom-sm:flex absolute bottom-0 h-6 gap-6 w-full h-auto items-center justify-center border-t border-divider backdrop-blur-lg backdrop-saturate-150`}
    >
      <div className="flex max-w-[1534]">
        <ul className="flex gap-6 list-none gap-2 items-center">
          <li className="flex">
            <LogoText size={"h-6"} hideDescription={true} />
            <div className="text-center">
              &copy; {year.getFullYear()} Copyright iCode Example
            </div>
          </li>
          <li>
            <Link
              className="text-center"
              isExternal
              href="https://www.ceo-py.eu/DiscordBot/"
              showAnchorIcon
            >
              iTask Discord Bot
            </Link>
          </li>
          <li
            className="cursor-pointer text-center"
            onClick={() => navigateTo()}
          >
            About
          </li>
        </ul>
      </div>
    </footer>
  );
}
