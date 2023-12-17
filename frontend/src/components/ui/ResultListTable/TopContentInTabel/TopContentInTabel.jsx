import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { ScrollDown } from "../ScrollDown/ScrollDown";

const languageOptions = [
  "Python",
  "JavaScript",
  "MS SQL",
  "HTML & CSS",
  "Java",
  "C#",
];

const types = ["Code", "Video"];

export function TopContentInTable({
  totalTasks,
  setResultsPerPage,
  results,
  setSearchResults,
}) {
  const [filterValue, setFilterValue] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by task name..."
          //   startContent={<SearchIcon />}
          value={filterValue}
          onValueChange={(v) => {
            setFilterValue(v);
            setSearchResults(
              results.filter((x) =>
                x.taskName.toLowerCase().includes(v.toLowerCase())
              )
            );
          }}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
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
                setSearchResults(
                  results.filter((x) => pickedLanguages.includes(x.language))
                );
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
            <DropdownTrigger className="hidden sm:flex">
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
                setSearchResults(
                  results.filter((x) => selectedTypes.includes(x.language))
                );
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
