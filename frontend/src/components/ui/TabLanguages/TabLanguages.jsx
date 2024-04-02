import { Chip, Tab, Tabs } from "@nextui-org/react";
import { DropDownMenuIcon } from "../DropDownMenuIcon/DropDownMenuIcon";
import { languageIcons } from "../../utils/languageIcons/languageIcons";
import { selectedThemeSignal } from "../NavMenu/ThemeSwitch/ThemeSignal";

const tabs = [
  {
    text: "Python",
    key: "python",
    src: "Python",
    chip: "python",
  },
  {
    text: "JavaScript",
    key: "javascript",
    src: "JavaScript",
    chip: "javaScript",
  },
  {
    text: "C#",
    key: "csharp",
    src: "C#",
    chip: "cSharp",
  },
  {
    text: "Java",
    key: "java",
    src: "Java",
    chip: "java",
  },
  {
    text: "C++",
    key: "cpp",
    src: "C++",
    chip: "cpp",
  },
];
export default function TabLanguages({
  language,
  setLanguage,
  languageCount,
  setFilterValue,
}) {
  return (
    <Tabs
      classNames={{
        tabList: "gap-1 custom-sm:gap-2",
      }}
      key="Options"
      size="lg"
      aria-label="Options"
      color={`${selectedThemeSignal.value === "dark" ? "default" : "success"}`}
      variant="underlined"
      defaultSelectedKey={language}
      onSelectionChange={(e) => {
        setLanguage(e);
        setFilterValue ? setFilterValue("") : null;
      }}
    >
      {tabs.map((tab) => (
        <Tab
          className="px-0 py-0 custom-sm:px-2 py-2"
          key={tab.key}
          title={
            <div className="flex items-center space-x-2">
              <DropDownMenuIcon
                alt={`${tab.key} language icon`}
                src={languageIcons(tab.src)}
              />
              <span className="hidden sm:block">{tab.text}</span>
              {languageCount && (
                <Chip size="sm" variant="faded">
                  {languageCount[tab.chip]}
                </Chip>
              )}
            </div>
          }
        />
      ))}
    </Tabs>
  );
}
