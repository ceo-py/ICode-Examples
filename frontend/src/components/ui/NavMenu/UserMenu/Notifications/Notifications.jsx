import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { linkIcons } from "../../../../utils/Icons/linkIcons";
import { DropDownMenuIcon } from "../../../DropDownMenuIcon/DropDownMenuIcon";

export function Notifications() {
  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      key="notifications"
      content="Notifications"
      color="primary"
      closeDelay="0"
    >
      <div className="cursor-pointer flex relative justify-center items-center">
        <Badge
          content="1"
          aria-label="more than 10 notifications"
          color="danger"
          shape="circle"
          placement="top-right"
          size="md"
        >
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                className="ring-default bg-"
                as="button"
                size="sm"
                showFallback
                src={linkIcons("notification")}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="notifications"
              variant="flat"
              hideSelectedIcon={false}
            >
              {/* <DropdownSection title="New Tasks" showDivider>
                <DropdownItem
                  key="Notifications"
                  endContent={
                    <DropDownMenuIcon
                      alt="Notifications"
                      src={linkIcons("settings")}
                    />
                  }
                >
                  Notifications
                </DropdownItem>
              </DropdownSection> */}
              {/* <DropdownSection title="New Tasks" showDivider>
                <DropdownItem
                  key="task id..."
                  className="h-14 gap-2"
                  //   textValue="Details"
                >
                  Някакъв лист с задачите
                </DropdownItem>
              </DropdownSection> */}
              {/* <DropdownSection title="Comments" aria-label="notifications" hideSelectedIcon={false}> */}
              <DropdownItem
                key="notifications"
                textValue="notifications"
                className="h-14 gap-2"
                hideSelectedIcon={false}
                //   textValue="Details"
              >
                Notifications
              </DropdownItem>
              <DropdownItem
                key="comment id ..."
                textValue="notifications"
                className="h-14 gap-2"
                hideSelectedIcon={false}
                //   textValue="Details"
              >
                Някакъв лист с задачите
              </DropdownItem>
              {/* </DropdownSection> */}
            </DropdownMenu>
          </Dropdown>
        </Badge>
      </div>
    </Tooltip>
  );
}
