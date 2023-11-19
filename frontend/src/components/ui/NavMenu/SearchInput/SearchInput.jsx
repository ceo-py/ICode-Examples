import { Avatar, Input } from "@nextui-org/react";

export function SearchInput() {

  return (
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[50rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Search Task..."
        size="sm"
        startContent={
          <Avatar
            alt="search icon"
            className="w-8 h-8 bg-"
            src="https://www.svgrepo.com/show/418086/search.svg"
          />
        }
        type="search"
      />
  );
}
