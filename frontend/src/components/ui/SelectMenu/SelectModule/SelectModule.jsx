import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";


export function SelectModule({menu}) {
  return (
    <>
    <Autocomplete
      className="max-w-xs"
      label="Select Module"
      onSelectionChange={(x) => {
        menu.value = {...menu?.value, ...{selectedModule: x}}
      }}
      defaultSelectedKey={menu?.value?.selectedModule ? menu.value.selectedModule : ""}
      startContent={
        <Avatar
          alt=""
          className="w-8 h-6"
          src="https://www.svgrepo.com/show/418011/marking.svg"
        />
      }
    >
      {menu?.value?.module
        ? Object.keys(menu.value.module).map((x) => (
            <AutocompleteItem key={x}>{x}</AutocompleteItem>
          ))
        : null}
    </Autocomplete>
    </>
  );
}
