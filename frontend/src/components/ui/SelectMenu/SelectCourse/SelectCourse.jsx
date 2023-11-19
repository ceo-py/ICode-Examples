import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";

export function SelectCourse({ menu }) {
  return (
    <>
      <Autocomplete
        className="max-w-[290px]"
        label="Select Course"
        onSelectionChange={(x) => {
          menu.value = { ...menu?.value, ...{module: menu?.value?.modules[x]}, ...{selectedCourse: x} };
        }}
        inputValue = {menu?.value?.selectedCourse? menu.value.selectedCourse: ''}
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
              <AutocompleteItem key={x}>{x}</AutocompleteItem>
            ))
          : null}
      </Autocomplete>
    </>
  );
}
