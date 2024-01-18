import { Link } from "@nextui-org/react";
import { LogoText } from "../NavMenu/LogoText/LogoText";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/about");
  };
  const year = new Date();
  return (
    <footer className="flex absolute bottom-0 h-6 gap-6 w-full h-auto items-center justify-center border-t border-divider backdrop-blur-lg backdrop-saturate-150 bg-white">
      <div className="flex max-w-[1534]">
        <ul className="flex gap-6 list-none gap-2 items-center">
          <li className="flex">
            <LogoText size={"h-6"} hideDescription={true} />
            <div>&copy; {year.getFullYear()} Copyright ICode Example</div>
          </li>
          <li>
            <Link
              isExternal
              href="https://www.ceo-py.eu/DiscordBot/"
              showAnchorIcon
            >
              ITask Discord Bot
            </Link>
          </li>
          <li className="cursor-pointer" onClick={() => navigateTo()}>
            About
          </li>
        </ul>
      </div>
    </footer>
  );
}
