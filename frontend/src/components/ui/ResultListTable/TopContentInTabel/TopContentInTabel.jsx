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
  "C#",
  "Java",
  "C++",
  "MS SQL",
  "HTML & CSS",
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
  showDropDownMenu,
  filterValue,
  setFilterValue,
}) {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [filterValueLocal, setFilterValueLocal] = useState("");

  const filterFromSearchBar = (filter) => {
    return results.filter((x) =>
      x.taskName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const dynamicFilterAllChoices = ({
    inputField,
    pickedLanguages,
    selectedTypes,
  }) => {
    
    const searchBarFilter = inputField
      ? filterFromSearchBar(inputField)
      : filterValue
      ? filterFromSearchBar(filterValue)
      : filterValueLocal
      ? filterFromSearchBar(filterValueLocal)
      : results;

    pickedLanguages = pickedLanguages ? pickedLanguages : selectedLanguages;
    selectedTypes = selectedTypes ? selectedTypes : selectedType;

    const searchFilterLanguage =
      pickedLanguages.length > 0 && searchBarFilter.length > 0
        ? searchBarFilter.filter((x) => pickedLanguages.includes(x.language))
        : searchBarFilter;

    const searchFilterType =
      searchFilterLanguage.length > 0 && selectedTypes.length > 0
        ? searchFilterLanguage.filter((x) =>
            selectedTypes.some((k) => x[checkTypes[k]])
          )
        : searchFilterLanguage;

    return searchFilterType;
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
          placeholder="Filter by name..."
          startContent={<SearchIcon />}
          value={filterValue ? filterValue : filterValueLocal}
          onValueChange={(v) => {
            setFilterValue ? setFilterValue(v) : setFilterValueLocal(v);
            setSearchResults(
              filterValue || filterValueLocal
                ? filterFromSearchBar(v)
                : dynamicFilterAllChoices({ inputField: v })
            );
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
                  setSearchResults(
                    dynamicFilterAllChoices({ pickedLanguages })
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
                  setSearchResults(dynamicFilterAllChoices({ selectedTypes }));
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
            className="bg-content1 cursor-pointer outline-none text-default-400 text-small"
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
