import { Chip, Tab, Tabs } from "@nextui-org/react";
import { DropDownMenuIcon } from "../DropDownMenuIcon/DropDownMenuIcon";
import { languageIcons } from "../../utils/languageIcons/languageIcons";
import { selectedThemeSignal } from "../NavMenu/ThemeSwitch/ThemeSignal";

export default function TabLanguages({
  language,
  setLanguage,
  languageCount,
  setFilterValue,
}) {
  return (
    <Tabs
      classNames={{
        tabList: "grid-flow-dense flex-col sm:flex-row",
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
      <Tab
        key="python"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon
              alt="python language icon"
              src={languageIcons("Python")}
            />
            <span>Python</span>
            {languageCount && (
              <Chip size="sm" variant="faded">
                {languageCount.python}
              </Chip>
            )}
          </div>
        }
      />
      <Tab
        key="javascript"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon
              alt="javascript language icon"
              src={languageIcons("JavaScript")}
            />
            <span>JavaScript</span>
            {languageCount && (
              <Chip size="sm" variant="faded">
                {languageCount.javaScript}
              </Chip>
            )}
          </div>
        }
      />
      <Tab
        key="csharp"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon
              alt="csharp language icon"
              src={languageIcons("C#")}
            />
            <span>C#</span>
            {languageCount && (
              <Chip size="sm" variant="faded">
                {languageCount.cSharp}
              </Chip>
            )}
          </div>
        }
      />
      <Tab
        key="java"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon
              alt="java language icon"
              src={languageIcons("Java")}
            />
            <span>Java</span>
            {languageCount && (
              <Chip size="sm" variant="faded">
                {languageCount.java}
              </Chip>
            )}
          </div>
        }
      />
      <Tab
        key="cpp"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon
              alt="cpp language icon"
              src={languageIcons("C++")}
            />
            <span>C++</span>
            {languageCount && (
              <Chip size="sm" variant="faded">
                {languageCount.cpp}
              </Chip>
            )}
          </div>
        }
      />
    </Tabs>
  );
}
