import { Avatar } from "@nextui-org/react";
import Icon from "../../../../assets/Icon.svg";
import { useNavigate } from "react-router-dom";

export function LogoText({ size, hideDescription }) {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/");
  };

  return (
    <>
      <Avatar
        alt="search icon"
        src={Icon}
        classNames={{
          base: `bg- text-default- rounded- cursor-pointer ${size}`,
          img: "object-contain",
        }}
        onClick={() => navigateTo()}
      />
      {!hideDescription ? (
        <p
          className="flex hidden sm:block font-bold text-inherit cursor-pointer"
          onClick={() => navigateTo()}
        >
          ICode Example
        </p>
      ) : null}
    </>
  );
}
