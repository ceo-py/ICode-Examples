import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { ScrollDown } from "../ScrollDown/ScrollDown";
import { SearchIcon } from "../../../utils/Icons/SearchIcon";

const languageOptions = [
  "Python",
  "JavaScript",
  "MS SQL",
  "HTML & CSS",
  "Java",
  "C#",
];

const types = ["Code", "Video"];
const checkTypes = {
  Code: "githubLink",
  Video: "videoLink",
};

export function TopContentInTable({
  totalTasks,
  setResultsPerPage,
  results,
  setSearchResults,
  searchResults,
  showDropDownMenu,
  // filterValue,
  // setFilterValue,
  filter
}) {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const filterFromSearchBar = (filter) => {
    return searchResults.filter((x) =>
      x.taskName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const typeSearch = (selectedTypes) => {
    return results.filter((x) => selectedTypes.some((k) => x[checkTypes[k]]));
  };

  const languageSearch = (pickedLanguages) => {
    return results.filter((x) => pickedLanguages.includes(x.language));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-3 items-end">
        <Input
          isClearable={false}
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search by task name..."
          startContent={<SearchIcon />}
          type="search"
          value={filter.filterValue}
          onValueChange={(v) => {
            filter.setFilterValue(v);
            setSearchResults(filterFromSearchBar(v));
          }}
        />
        {!showDropDownMenu && (
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" endContent={<ScrollDown />}>
                  Languages
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Languages"
                closeOnSelect={false}
                selectedKeys={selectedLanguages}
                selectionMode="multiple"
                onSelectionChange={(v) => {
                  const pickedLanguages = Array.from(v);
                  setSelectedLanguages(pickedLanguages);
                  setSearchResults(languageSearch(pickedLanguages));
                }}
              >
                {languageOptions.map((x) => (
                  <DropdownItem key={x} className="capitalize">
                    {x}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ScrollDown />} variant="flat">
                  Type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={selectedType}
                selectionMode="multiple"
                onSelectionChange={(v) => {
                  const selectedTypes = Array.from(v);
                  setSelectedType(selectedTypes);
                  setSearchResults(typeSearch(selectedTypes));
                }}
              >
                {types.map((x) => (
                  <DropdownItem key={x} className="capitalize">
                    {x}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {totalTasks} tasks
        </span>
        <label className="flex items-center text-default-400 text-small">
          Results per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(v) => setResultsPerPage(Number(v.target.value))}
          >
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
    </div>
  );
}