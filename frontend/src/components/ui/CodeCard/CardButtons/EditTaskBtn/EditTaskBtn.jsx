import { Button, Tooltip } from "@nextui-org/react";

export function EditTaskBtn({ navigateEditTask }) {
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
