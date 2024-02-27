import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import DOMPurify from "dompurify";
import { useShare } from "../../../../ContextGlobal/MenuContext";

export function SelectModule({ menu }) {
  const { setShare } = useShare();
  return (
    <>
      <Autocomplete
        className="flex-grow w-"
        label="Module"
        placeholder="Select Module"
        isRequired={true}
        onSelectionChange={(x) => {
          menu.value = { ...menu?.value, ...{ selectedModule: x } };
          setShare(false);
        }}
        defaultSelectedKey={
          menu?.value?.selectedModule ? menu.value.selectedModule : ""
        }
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
              <AutocompleteItem key={x}>
                {DOMPurify.sanitize(x)}
              </AutocompleteItem>
            ))
          : null}
      </Autocomplete>
    </>
  );
}
