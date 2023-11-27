import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../../utils/Icons/SearchIcon";

export function SearchInput({
  value,
  onValueChange,
  placeholder,
}) {

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[50rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      isClearable={false}
      placeholder={placeholder}
      size="sm"
      startContent={<SearchIcon />}
      value={value}
      onValueChange={onValueChange}
      type="search"
    />
  );
}
