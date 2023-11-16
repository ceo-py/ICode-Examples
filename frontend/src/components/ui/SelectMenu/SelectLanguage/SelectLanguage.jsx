import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { languages } from "./data";


export function SelectLanguage({ menu }) {
  return (
    <>
      <Autocomplete
        className="max-w-xs"
        label="Select Language"
        selectedKeys='test'
        onSelectionChange={(x) => {
          menu.value = Object.values(languages).filter(
            (y) => y?.name?.language === x
          )[0];
        }}
        defaultSelectedKey={menu?.value?.name ? menu.value.name.language: ''}
        startContent={
          <Avatar
            alt=""
            className="w-8 h-6"
            src={
              menu?.value?.name?.url
                ? menu.value.name.url
                : "https://www.svgrepo.com/show/418131/question.svg"
            }
          />
        }
      >
        {Object.values(languages).map((x) => (
          <AutocompleteItem
            key={x.name.language}
            startContent={
              <Avatar
                alt={x.name.language}
                className="w-6 h-6"
                src={x.name.url}
              />
            }
          >
            {x.name.language}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
