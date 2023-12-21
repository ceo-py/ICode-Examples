import { Button, Tooltip } from "@nextui-org/react";

export function EditTask() {
  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      key={"Edit Task"}
      content={"Edit Task"}
      color="primary"
    >
      <Button
        color="primary"
        radius="full"
        size="sm"
        variant="bordered"
        onPress={() => console.log("bav to edit page")}
      >
        Edit Task
      </Button>
    </Tooltip>
  );
}
