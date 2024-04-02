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
      classNames={
        {
          // tabList: "grid-flow-dense flex-col sm:flex-row",
          // tabList: "grid-flow-dense flex-col sm:flex-row",
        }
      }
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
          key={tab.key}
          title={
            <div className="flex items-center space-x-2">
              <DropDownMenuIcon
                alt={`${tab.text} language icon`}
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
