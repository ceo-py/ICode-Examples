import { Input } from "@nextui-org/react";

export function SearchInput() {

  return (
    <>
      <Input
        key={"outside"}
        type="text"
        label="Search task"
        labelPlacement={"outside"}
      />
    </>
  );
}
