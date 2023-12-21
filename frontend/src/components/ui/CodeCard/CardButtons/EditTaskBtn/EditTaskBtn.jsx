import { Button, Tooltip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function EditTaskBtn() {
  const navigate = useNavigate()
  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      key={"Edit task"}
      content={"Edit task"}
      color="primary"
    >
      <Button
        color="primary"
        radius="full"
        size="sm"
        variant="bordered"
        onPress={() => navigate("/edit")}
      >
        Edit task
      </Button>
    </Tooltip>
  );
}
