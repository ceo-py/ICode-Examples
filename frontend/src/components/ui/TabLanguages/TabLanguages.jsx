import { Tab, Tabs } from "@nextui-org/react";
import { DropDownMenuIcon } from "../DropDownMenuIcon/DropDownMenuIcon";
import { languageIcons } from "../../utils/languageIcons/languageIcons";

export default function TabLanguages({ language, setLanguage }) {
  return (
    <Tabs
      key="Options"
      size="lg"
      aria-label="Options"
      color="success"
      variant="underlined"
      defaultSelectedKey={language}
      onSelectionChange={(e) => setLanguage(e)}
    >
      <Tab
        key="python"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon alt="python" src={languageIcons("Python")} />
            <span>Python</span>
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
          </div>
        }
      />
      <Tab
        key="csharp"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon alt="csharp" src={languageIcons("C#")} />
            <span>C#</span>
          </div>
        }
      />
      <Tab
        key="java"
        title={
          <div className="flex items-center space-x-2">
            <DropDownMenuIcon alt="java" src={languageIcons("Java")} />
            <span>Java</span>
          </div>
        }
      />
    </Tabs>
  );
}
