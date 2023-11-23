import { buttons } from "../CardButtons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export function CardButtonsDropDownMenu({onOpen}) {

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button
          className="min-w-unit-10 h-unit-10 border-default-200 items-center"
          variant="bordered"
          radius="full"
        >
          ...
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Static Actions">
        {buttons.map((x) => (
          <DropdownItem
            textValue="choice"
            key={x.btnText}
            onClick={
              x.btnText !== "Report" ? x.onPress : onOpen
            }
          >
            {x.btnText}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
