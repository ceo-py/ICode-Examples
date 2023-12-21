import {
  Avatar,
  Badge,
  Dropdown,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { linkIcons } from "../../../../utils/Icons/linkIcons";

export function Notifications() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Badge
          content="1"
          aria-label="more than 10 notifications"
          color="danger"
          shape="circle"
          placement="top-right"
          size="md"
        >
          <Tooltip
            showArrow={true}
            placement="bottom"
            key="notifications"
            content="Notifications"
            color="primary"
          >
            <Avatar
              className="ring-default bg-"
              as="button"
              size="sm"
              showFallback
              src={linkIcons("notification")}
            />
          </Tooltip>
        </Badge>
      </DropdownTrigger>
    </Dropdown>
  );
}
