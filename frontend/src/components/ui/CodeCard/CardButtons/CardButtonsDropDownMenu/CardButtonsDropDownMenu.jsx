import { DropDownMenuIcon } from "../../../DropDownMenuIcon/DropDownMenuIcon";
import { buttons } from "../CardButtons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export function CardButtonsDropDownMenu({
  onOpen,
  follow,
  like,
  taskId,
  userToFollowId,
  likeCounter,
  canFollow,
  handleLikeTask,
  handleFollowUser,
}) {
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
            startContent={<DropDownMenuIcon alt={x.btnText} src={x.src} />}
            endContent={
              ((x.btnText === "Follow" && follow) ||
                (like && x.btnText === "Like")) && (
                <DropDownMenuIcon
                  alt={x.btnText}
                  src={"https://www.svgrepo.com/show/418145/check.svg"}
                />
              )
            }
            onClick={() => {
              if (x.btnText === "Follow" && !canFollow) {
                handleFollowUser(userToFollowId);
              } else if (x.btnText === "Like") {
                handleLikeTask(taskId);
              } else if (x.btnText === "Share") {
                x.onPress();
              } else if (x.btnText === "Report") {
                onOpen();
              }
            }}
          >
            {x.btnText === "Like" ? `${x.btnText} ${likeCounter}` : x.btnText}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
