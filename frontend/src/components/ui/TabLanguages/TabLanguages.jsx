import { Chip, Tab, Tabs } from "@nextui-org/react";
import { DropDownMenuIcon } from "../DropDownMenuIcon/DropDownMenuIcon";
import { languageIcons } from "../../utils/languageIcons/languageIcons";

export default function TabLanguages({
  language,
  setLanguage,
  languageCount,
  setFilterValue,
}) {
  return (
    <Tabs
      classNames={{
        // tabList: "flex-wrap sm:flex-nowrap",
        tabList: "grid-flow-dense flex-col sm:flex-row",
        // tab:"flex flex-col w-auto"
      }}
      key="Options"
      size="lg"
      aria-label="Options"
      color="success"
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
            <DropDownMenuIcon alt="python" src={languageIcons("Python")} />
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
              alt="javascript"
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
            <DropDownMenuIcon alt="csharp" src={languageIcons("C#")} />
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
            <DropDownMenuIcon alt="java" src={languageIcons("Java")} />
            <span>Java</span>
            {languageCount && (
              <Chip size="sm" variant="faded">
                {languageCount.java}
              </Chip>
            )}
          </div>
        }
      />
    </Tabs>
  );
}
