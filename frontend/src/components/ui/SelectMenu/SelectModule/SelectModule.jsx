import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import DOMPurify from "dompurify";


export function SelectModule({menu}) {
  return (
    <>
    <Autocomplete
      className="flex-grow w-"
      label="Select Module"
      isRequired={true}
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
            <AutocompleteItem key={x}>{DOMPurify.sanitize(x)}</AutocompleteItem>
          ))
        : null}
    </Autocomplete>
    </>
  );
}
