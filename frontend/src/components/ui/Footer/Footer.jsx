import { LogoText } from "../NavMenu/LogoText/LogoText";

export function Footer() {
  return (
    <footer className="flex absolute bottom-0 h-6 gap-6 w-full h-auto items-center justify-center border-t border-divider backdrop-blur-lg backdrop-saturate-150 bg-white">
      <div className="flex max-w-[1534]">
        <ul className="flex list-none gap-2 items-center">
          <li>
          <LogoText size={"h-6"} hideDescription={true}/>
          </li>
          <li>&copy; 2023 Copyright ICode Example</li>
        </ul>
      </div>
    </footer>
  );
}
