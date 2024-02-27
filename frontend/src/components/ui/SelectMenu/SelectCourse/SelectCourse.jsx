import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import DOMPurify from "dompurify";

export function SelectCourse({ menu }) {
  return (
    <>
      <Autocomplete
        className="flex-grow w-"
        label="Course"
        placeholder="Select Course"
        isRequired={true}
        onSelectionChange={(x) => {
          menu.value = {
            ...menu?.value,
            ...{ module: menu?.value?.modules[x] },
            ...{ selectedCourse: x },
            ...{ selectedModule: "" },
          };
        }}
        inputValue={
          menu?.value?.selectedCourse ? menu.value.selectedCourse : ""
        }
        startContent={
          <Avatar
            alt=""
            className="w-8 h-6"
            src="https://www.svgrepo.com/show/418102/todo.svg"
          />
        }
      >
        {menu?.value?.modules
          ? Object.keys(menu.value.modules).map((x) => (
              <AutocompleteItem
                key={x}
              >
                {DOMPurify.sanitize(x)}
              </AutocompleteItem>
            ))
          : null}
      </Autocomplete>
    </>
  );
}
