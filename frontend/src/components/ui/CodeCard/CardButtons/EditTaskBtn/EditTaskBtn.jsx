import { Button, Tooltip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function EditTaskBtn({ navigateEditTask }) {
  const navigate = useNavigate();
  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      key={"Edit task"}
      content={"Edit task"}
      color="primary"
    >
      <Button
        className="hover:bg-default/40"
        color="primary"
        radius="full"
        size="sm"
        variant="bordered"
        onPress={() => navigateEditTask()}
      >
        Edit task
      </Button>
    </Tooltip>
  );
}
