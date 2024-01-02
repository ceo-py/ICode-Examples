import { linkIcons } from "../../../../utils/Icons/linkIcons";
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
  handleReportUser,
  follow,
  like,
  taskId,
  userToFollowId,
  likeCounter,
  canFollow,
  handleLikeTask,
  handleFollowUser,
  navigateEditTask,
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
        {canFollow && (
          <DropdownItem
            textValue={"Edit task"}
            key={"Edit task"}
            startContent={
              <DropDownMenuIcon alt={"Edit task"} src={linkIcons("edit")} />
            }
            onClick={() => navigateEditTask()}
          >
            Edit task
          </DropdownItem>
        )}
        {buttons.slice(!canFollow ? 0 : 1).map((x) => (
          <DropdownItem
            textValue={x.btnText}
            key={x.btnText}
            startContent={<DropDownMenuIcon alt={x.btnText} src={x.src} />}
            endContent={
              ((x.btnText === "Follow" && follow) ||
                (like && x.btnText === "Like")) && (
                <DropDownMenuIcon alt={x.btnText} src={linkIcons("check")} />
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
                handleReportUser();
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
