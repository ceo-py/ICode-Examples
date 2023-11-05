import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { languages } from "./data";

export function SelectLanguage() {
  return (
    <Autocomplete
      className="max-w-xs"
      label="Select Language"
      startContent={
        <Avatar
          alt=""
          className="w-8 h-6"
          src="https://www.svgrepo.com/show/529520/code-square.svg"
        />
      }
    >
      {languages.map((x) => (
        <AutocompleteItem
          key={x.name}
          startContent={<Avatar alt={x.name} className="w-6 h-6" src={x.url} />}
        >
          {x.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
