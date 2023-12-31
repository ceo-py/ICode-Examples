import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../../utils/Icons/SearchIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchInput() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const taskSearch = (e) => {
    if (value.trim() != "" && (e.key === "Enter" || e.type == "click")) {
      const encodedQuery = encodeURIComponent(value.trim());
      navigate(`/result?query=${encodedQuery}`);
    }
  };

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
      placeholder={"Search for Task"}
      size="sm"
      startContent={
        <div className="cursor-pointer" onClick={(e) => taskSearch(e)}>
          <SearchIcon />
        </div>
      }
      value={value}
      onValueChange={setValue}
      type="search"
      onKeyDown={taskSearch}
    />
  );
}
